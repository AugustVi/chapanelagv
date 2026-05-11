import { scrapeProducts, type ProductInfo } from "@/lib/scraper";
import gifts from "@/data/gifts.json";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  const urls = gifts.map((g) => g.url);

  // Try scraping, but manual data in JSON takes priority
  const scraped = await scrapeProducts(urls);

  const merged: ProductInfo[] = scraped.map((product, i) => {
    const manual = gifts[i] as Partial<ProductInfo>;
    return {
      url: product.url,
      title: manual.title || product.title || null,
      image: manual.image || product.image || null,
      price: manual.price ?? product.price ?? null,
      store: product.store || manual.store || null,
    };
  });

  return NextResponse.json(merged);
}
