import * as cheerio from "cheerio";

export interface ProductInfo {
  url: string;
  title: string | null;
  image: string | null;
  price: number | null;
  store: string | null;
}

const ALLOWED_DOMAINS = [
  "amazon.com.br",
  "mercadolivre.com.br",
  "magazineluiza.com.br",
  "magazinevoce.com.br",
];

function validateProductUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    return ALLOWED_DOMAINS.some(
      (domain) =>
        parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

export async function scrapeProduct(url: string): Promise<ProductInfo> {
  const result: ProductInfo = {
    url,
    title: null,
    image: null,
    price: null,
    store: null,
  };

  try {
    if (!validateProductUrl(url)) return result;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      },
    });

    clearTimeout(timeout);

    if (!response.ok) return result;

    const html = await response.text();
    const $ = cheerio.load(html);

    // 1. Try JSON-LD (structured data — most reliable)
    const jsonLd = $('script[type="application/ld+json"]')
      .map((_, el) => {
        try {
          return JSON.parse($(el).html() || "");
        } catch {
          return null;
        }
      })
      .get()
      .filter(Boolean);

    for (const ld of jsonLd) {
      const product = ld["@type"] === "Product" ? ld : ld?.mainEntity;
      if (product && product["@type"] === "Product") {
        result.title = product.name || null;
        result.image =
          (Array.isArray(product.image)
            ? product.image[0]
            : product.image) || null;

        if (product.offers) {
          const offer = Array.isArray(product.offers)
            ? product.offers[0]
            : product.offers;
          if (offer.price) {
            result.price = parseFloat(offer.price);
          }
        }
        if (result.title && result.image) break;
      }
    }

    // 2. Open Graph fallback
    if (!result.title) {
      result.title =
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="og:title"]').attr("content") ||
        $("title").text()?.trim() ||
        null;
    }

    if (!result.image) {
      result.image =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="og:image"]').attr("content") ||
        null;
    }

    // 3. Price: try meta tags
    if (!result.price) {
      const priceMeta =
        $('meta[property="product:price:amount"]').attr("content") ||
        $('meta[name="twitter:data1"]').attr("content") ||
        null;
      if (priceMeta) {
        result.price = parseFloat(priceMeta);
      }
    }

    // 4. Detect store from domain
    const hostname = new URL(url).hostname;
    if (hostname.includes("amazon")) result.store = "Amazon";
    else if (hostname.includes("mercadolivre")) result.store = "Mercado Livre";
    else if (hostname.includes("magazineluiza") || hostname.includes("magalu"))
      result.store = "Magalu";
    else result.store = hostname.replace("www.", "");

    // Clean up title (remove store suffixes and generic domain-only titles)
    if (result.title) {
      result.title = result.title
        .replace(/\s*\|.*$/, "")
        .replace(/\s*- Mercado Livre.*$/, "")
        .replace(/\s*na Amazon.*$/, "")
        .replace(/\s*– Mercado Livre.*$/, "")
        .replace(/\s*— Amazon.*$/, "")
        .trim();

      // If the title ended up as just a domain name, discard it
      const domainOnlyPatterns = [
        /^amazon\.com(\.br)?$/i,
        /^mercadolivre\.com(\.br)?$/i,
        /^magazineluiza\.com(\.br)?$/i,
        /^www\..+\.com(\.br)?$/i,
      ];
      if (domainOnlyPatterns.some((p) => p.test(result.title!))) {
        result.title = null;
      }
    }

    return result;
  } catch {
    return result;
  }
}

export async function scrapeProducts(
  urls: string[],
): Promise<ProductInfo[]> {
  const results = await Promise.allSettled(urls.map(scrapeProduct));
  return results.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : { url: urls[i], title: null, image: null, price: null, store: null },
  );
}
