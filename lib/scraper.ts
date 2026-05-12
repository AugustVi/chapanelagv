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

// ─── URL ID extraction ──────────────────────────────────────────────
function extractMLId(url: string): string | null {
  const match = url.match(/\/(ML[BC])\/?[-]?\s*(\d{6,})/i);
  if (match) return `${match[1].toUpperCase()}${match[2]}`;
  // Alternative: site_id in path segment (produto.mercadolivre.com.br/MLB-123)
  const altMatch = url.match(/(ML[BC])[-_]?(\d{6,})/i);
  if (altMatch) return `${altMatch[1].toUpperCase()}${altMatch[2]}`;
  return null;
}

function extractShopeeIds(
  url: string,
): { shopId: string; itemId: string } | null {
  // Format: /product/{shop_id}/{item_id}
  let match = url.match(/\/product\/(\d+)\/(\d+)/);
  if (match) return { shopId: match[1], itemId: match[2] };
  // Format: i.{shop_id}.{item_id}
  match = url.match(/i\.(\d+)\.(\d+)/);
  if (match) return { shopId: match[1], itemId: match[2] };
  // Format: query params
  try {
    const p = new URL(url).searchParams;
    const shopId =
      p.get("shopid") || p.get("shop_id") || p.get("seller_id");
    const itemId = p.get("itemid") || p.get("item_id");
    if (shopId && itemId) return { shopId, itemId };
  } catch { /* ignore */ }
  return null;
}

// ─── API-based scrapers ────────────────────────────────────────────

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  Accept:
    "application/json, text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
};

function proxyUrl(target: string): string {
  const base = process.env.SCRAPING_PROXY_URL;
  if (!base) return target;
  // Supports formats like:
  //   https://api.scrapingbee.com/v1/?api_key=KEY&url=
  //   https://api.zenrows.com/v1/?apikey=KEY&url=
  return base.endsWith("=") ? `${base}${encodeURIComponent(target)}` : `${base}${encodeURIComponent(target)}`;
}

async function scrapeMLApi(url: string): Promise<Partial<ProductInfo>> {
  const itemId = extractMLId(url);
  if (!itemId) return {};

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`https://api.mercadolibre.com/items/${itemId}`, {
      signal: controller.signal,
      headers: { ...FETCH_HEADERS, Accept: "application/json" },
    });

    clearTimeout(timeout);
    if (!res.ok) return {};

    const data = await res.json();
    return {
      title: data.title || null,
      image:
        data.pictures?.[0]?.secure_url ||
        data.pictures?.[0]?.url ||
        data.thumbnail ||
        null,
      price: typeof data.price === "number" ? data.price : null,
    };
  } catch {
    return {};
  }
}

async function scrapeShopeeApi(
  url: string,
): Promise<Partial<ProductInfo>> {
  const ids = extractShopeeIds(url);
  if (!ids) return {};

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const apiUrl = `https://shopee.com.br/api/v4/item/get?itemid=${ids.itemId}&shopid=${ids.shopId}`;
    const res = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        ...FETCH_HEADERS,
        Referer: "https://shopee.com.br/",
        Accept: "application/json",
      },
    });

    clearTimeout(timeout);
    if (!res.ok) return {};

    const json = await res.json();
    const item = json?.data;
    if (!item || item.error) return {};

    return {
      title: item.name || null,
      image: item.image
        ? `https://cf.shopee.com.br/file/${item.image}`
        : null,
      price: item.price ? item.price / 100_000 : null,
    };
  } catch {
    return {};
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
    // Shopee CSS classes are auto-generated hashes that change every deploy.
    // CSS selectors are a last resort; prefer the API path in scrapeProduct.
    title =
      $('meta[property="og:title"]').attr("content") ||
      $("h1").first().text()?.trim() ||
      $('[class*="product-title"]').first().text()?.trim() ||
      null;

    image =
      $('meta[property="og:image"]').attr("content") ||
      $("img[src*='cf.shopee']").first().attr("src") ||
      $("img[src*='img.shopee']").first().attr("src") ||
      $("img[src*='shopee']").first().attr("src") ||
      null;

    const priceText =
      $('meta[property="product:price:amount"]').attr("content") ||
      $("div").filter((_, el) =>
        /R\$\s*[\d.,]+/.test($(el).text()),
      ).first().text()?.trim() ||
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

  // ── 0. API-based extraction (fast + reliable for ML, best shot for Shopee)
  if (store === "Mercado Livre") {
    const api = await scrapeMLApi(url);
    if (api.title) {
      result.title = cleanTitle(api.title);
      result.image = api.image ?? null;
      result.price = api.price ?? null;
      // ML API is very reliable — return early if we have all fields
      if (result.title && result.image && result.price) return result;
    }
  }

  if (store === "Shopee") {
    const api = await scrapeShopeeApi(url);
    if (api.title) {
      result.title = cleanTitle(api.title);
      result.image = api.image ?? null;
      result.price = api.price ?? null;
      if (result.title && result.image && result.price) return result;
    }
  }

  // ── 1. HTML scraping ──────────────────────────────────────────────
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    // For ML, use produto.mercadolivre.com.br which is more permissive
    let fetchUrl = url;
    if (store === "Mercado Livre") {
      const mlId = extractMLId(url);
      if (mlId) fetchUrl = `https://produto.mercadolivre.com.br/${mlId}`;
    }

    const response = await fetch(proxyUrl(fetchUrl), {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        ...FETCH_HEADERS,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
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

    // ── 2. JSON-LD structured data ──────────────────────────────────
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

    // ── 3. Embedded JSON in script tags (Magalu, other SPAs) ───────────
    const scripts = $("script")
      .map((_, el) => $(el).html() || "")
      .get();

    const statePatterns = [
      /window\.__NEXT_DATA__\s*=\s*(\{.+?\});\s*$/m,
      /window\.__STORE__\s*=\s*(\{.+?\});?\s*$/m,
      /window\.__INITIAL_STATE__\s*=\s*(\{.+?\});?\s*$/m,
      /window\.__PRELOADED_STATE__\s*=\s*(\{.+?\});?\s*$/m,
      /window\.__NUXT__\s*=\s*(\{.+?\});?\s*$/m,
    ];

    for (const script of scripts) {
      for (const pattern of statePatterns) {
        const match = script.match(pattern);
        if (!match) continue;
        try {
          const data = JSON.parse(match[1]);
          // Walk common paths for product data
          const paths = [
            data?.props?.pageProps?.product,
            data?.props?.pageProps?.initialData?.product,
            data?.state?.product,
            data?.product,
          ];
          for (const prod of paths) {
            if (!prod) continue;
            if (!result.title) result.title = prod.name || prod.title || null;
            if (!result.image)
              result.image =
                prod.image ||
                prod.images?.[0] ||
                prod.thumbnail ||
                prod.picture ||
                null;
            if (!result.price && prod.price) {
              const p =
                typeof prod.price === "number"
                  ? prod.price
                  : parseFloat(prod.price);
              if (!isNaN(p)) result.price = p;
            }
          }
        } catch { /* ignore parse errors */ }
      }
    }

    // ── 4. Open Graph / meta tags ───────────────────────────────────
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

    // ── 5. CSS selector fallbacks (per-store) ───────────────────────
    const cssResult = extractBySelectors($, store);

    if (!result.title) result.title = cssResult.title;
    if (!result.image) result.image = cssResult.image;
    if (!result.price) result.price = cssResult.price;

    // ── 6. Clean title ──────────────────────────────────────────────
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
