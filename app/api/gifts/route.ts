import { scrapeProducts, detectStore, type ProductInfo } from "@/lib/scraper";
import gifts from "@/data/gifts.json";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function hasCompleteManualData(gift: Partial<ProductInfo>): boolean {
  return !!(gift.title && gift.image && gift.price != null);
}

export async function GET() {
  // Build results from manual data first; only scrape items missing fields
  const results: (ProductInfo | null)[] = gifts.map((gift) => {
    const manual = gift as Partial<ProductInfo>;
    if (hasCompleteManualData(manual)) {
      return {
        url: manual.url!,
        title: manual.title!,
        image: manual.image!,
        price: manual.price!,
        store: manual.store || detectStore(manual.url!) || null,
      };
    }
    return null; // needs scraping
  });

  // Scrape only items without complete manual data
  const toScrape = results
    .map((r, i) => (r === null ? i : -1))
    .filter((i) => i >= 0);

  if (toScrape.length > 0) {
    const urls = toScrape.map((i) => gifts[i].url);
    const scraped = await scrapeProducts(urls);

    scraped.forEach((product, idx) => {
      const originalIdx = toScrape[idx];
      const manual = gifts[originalIdx] as Partial<ProductInfo>;
      results[originalIdx] = {
        url: product.url,
        title: manual.title || product.title || null,
        image: manual.image || product.image || null,
        price: manual.price ?? product.price ?? null,
        store: product.store || manual.store || null,
      };
    });
  }

  return NextResponse.json(results);
}
