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
  "shopee.com.br",
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

// ─── Store detection ────────────────────────────────────────────────
function detectStore(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes("amazon")) return "Amazon";
    if (hostname.includes("mercadolivre")) return "Mercado Livre";
    if (hostname.includes("magazineluiza") || hostname.includes("magalu"))
      return "Magalu";
    if (hostname.includes("shopee")) return "Shopee";
    return hostname.replace("www.", "");
  } catch {
    return null;
  }
}

// ─── CSS selector extraction (per-store fallback) ───────────────────
function extractBySelectors(
  $: cheerio.CheerioAPI,
  store: string | null,
): { title: string | null; image: string | null; price: number | null } {
  let title: string | null = null;
  let image: string | null = null;
  let price: number | null = null;

  if (store === "Amazon") {
    title =
      $("#productTitle").text()?.trim() ||
      $("#title").text()?.trim() ||
      $('[data-feature-name="title"] h1').text()?.trim() ||
      null;

    image =
      $("#landingImage").attr("src") ||
      $("#imgTagWrapper img").attr("src") ||
      $(".imgTagWrapper img").attr("src") ||
      null;

    // Amazon hides structured price in screen-reader spans
    const priceText =
      $(".a-price .a-offscreen").first().text()?.trim() ||
      $("#priceblock_ourprice").text()?.trim() ||
      $("#priceblock_dealprice").text()?.trim() ||
      $('[data-a-color="price"] .a-offscreen').text()?.trim() ||
      null;

    if (priceText) {
      const cleaned = priceText.replace(/[^\d,.]/g, "").replace(",", ".");
      price = parseFloat(cleaned) || null;
    }
  }

  if (store === "Mercado Livre") {
    title =
      $(".ui-pdp-title").first().text()?.trim() ||
      $("h1.ui-pdp-title").text()?.trim() ||
      $(".item-title__primary").text()?.trim() ||
      null;

    image =
      $(".ui-pdp-image img").attr("src") ||
      $(".ui-pdp-gallery__figure img").attr("data-zoom") ||
      $(".ui-pdp-gallery__figure img").attr("src") ||
      $(".ui-pdp-gallery img").attr("src") ||
      null;

    // ML uses andes-money-amount with fraction + cents components
    const fractionEl = $(".andes-money-amount__fraction").first();
    const centsEl = $(".andes-money-amount__cents--superscript").first();
    if (fractionEl.length) {
      let priceStr = fractionEl.text()?.trim()?.replace(/\./g, "") || "0";
      const cents = centsEl.text()?.trim() || "00";
      price = parseFloat(`${priceStr}.${cents}`) || null;
    }

    if (!price) {
      const altPrice = $(
        ".ui-pdp-price__second-line .andes-money-amount__fraction",
      )
        .first()
        .text()
        ?.trim()
        ?.replace(/\./g, "");
      if (altPrice) {
        const altCents =
          $(
            ".ui-pdp-price__second-line .andes-money-amount__cents--superscript",
          )
            .first()
            .text()
            ?.trim() || "00";
        price = parseFloat(`${altPrice}.${altCents}`) || null;
      }
    }
  }

  if (store === "Magalu") {
    title =
      $('[data-testid="heading-product-title"]').first().text()?.trim() ||
      $("h1[data-testid='heading-product-title']").text()?.trim() ||
      null;

    image =
      $('[data-testid="product-image"]').attr("src") ||
      $(".product-image img").attr("src") ||
      null;

    const priceStr =
      $('[data-testid="price-value"]').first().text()?.trim() ||
      $(".product-price-value").first().text()?.trim() ||
      null;

    if (priceStr) {
      const cleaned = priceStr.replace(/[^\d,.]/g, "").replace(",", ".");
      price = parseFloat(cleaned) || null;
    }
  }

  if (store === "Shopee") {
    title =
      $("div.attM6y").first().text()?.trim() ||
      $("h1").first().text()?.trim() ||
      null;

    image =
      $("div._8H_VXs img").attr("src") ||
      $("img._3-PxHk").attr("src") ||
      $("img.stkPov").attr("src") ||
      null;

    const priceText =
      $("div.pqTWkA").first().text()?.trim() ||
      $("div.YBrn-Z").text()?.trim() ||
      $("div.vioxXd").text()?.trim() ||
      null;

    if (priceText) {
      const cleaned = priceText.replace(/[^\d,.]/g, "").replace(",", ".");
      price = parseFloat(cleaned) || null;
    }
  }

  return { title, image, price };
}

// ─── Title cleanup ──────────────────────────────────────────────────
function cleanTitle(raw: string | null): string | null {
  if (!raw) return null;

  const cleaned = raw
    .replace(/\s*\|.*$/, "")
    .replace(/\s*- Mercado Livre.*$/, "")
    .replace(/\s*na Amazon.*$/, "")
    .replace(/\s*– Mercado Livre.*$/, "")
    .replace(/\s*— Amazon.*$/, "")
    .replace(/\s*- Amazon.*$/, "")
    .replace(/\s*\|\s*Amazon.*$/i, "")
    .replace(/\s*\|\s*Magalu.*$/i, "")
    .replace(/\s*\|\s*Shopee.*$/i, "")
    .trim();

  // Discard domain-only titles
  const domainOnlyPatterns = [
    /^amazon\.com(\.br)?$/i,
    /^mercadolivre\.com(\.br)?$/i,
    /^magazineluiza\.com(\.br)?$/i,
    /^www\..+\.com(\.br)?$/i,
  ];
  if (domainOnlyPatterns.some((p) => p.test(cleaned))) {
    return null;
  }

  return cleaned;
}

// ─── Main scrape function ───────────────────────────────────────────
export async function scrapeProduct(url: string): Promise<ProductInfo> {
  const store = detectStore(url);

  const result: ProductInfo = {
    url,
    title: null,
    image: null,
    price: null,
    store,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Sec-Ch-Ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    clearTimeout(timeout);

    if (!response.ok) return result;

    const html = await response.text();
    const $ = cheerio.load(html);

    // ── 1. JSON-LD structured data ──────────────────────────────────
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
      // Direct Product node
      const product = ld["@type"] === "Product" ? ld : ld?.mainEntity;
      if (product && product["@type"] === "Product") {
        result.title = result.title || product.name || null;
        result.image =
          result.image ||
          (Array.isArray(product.image)
            ? product.image[0]
            : product.image) ||
          null;

        if (product.offers) {
          const offer = Array.isArray(product.offers)
            ? product.offers[0]
            : product.offers;
          if (offer.price && !result.price) {
            result.price = parseFloat(offer.price);
          }
        }
      }
      // Also try graph-style JSON-LD (common on Amazon)
      if (ld["@graph"] && Array.isArray(ld["@graph"])) {
        for (const node of ld["@graph"]) {
          if (node["@type"] === "Product") {
            result.title = result.title || node.name || null;
            result.image =
              result.image ||
              (Array.isArray(node.image) ? node.image[0] : node.image) ||
              null;
            if (node.offers && !result.price) {
              const offer = Array.isArray(node.offers)
                ? node.offers[0]
                : node.offers;
              if (offer.price) result.price = parseFloat(offer.price);
            }
          }
        }
      }
    }

    // ── 2. Open Graph / meta tags ───────────────────────────────────
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

    if (!result.price) {
      const priceMeta =
        $('meta[property="product:price:amount"]').attr("content") ||
        $('meta[name="twitter:data1"]').attr("content") ||
        null;
      if (priceMeta) result.price = parseFloat(priceMeta);
    }

    // ── 3. CSS selector fallbacks (per-store) ───────────────────────
    const cssResult = extractBySelectors($, store);

    if (!result.title) result.title = cssResult.title;
    if (!result.image) result.image = cssResult.image;
    if (!result.price) result.price = cssResult.price;

    // ── 4. Clean title ──────────────────────────────────────────────
    result.title = cleanTitle(result.title);

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
      : {
          url: urls[i],
          title: null,
          image: null,
          price: null,
          store: detectStore(urls[i]),
        },
  );
}
