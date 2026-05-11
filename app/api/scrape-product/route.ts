import { scrapeProduct } from "@/lib/scraper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 },
    );
  }

  try {
    const product = await scrapeProduct(url);
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Failed to scrape product" },
      { status: 500 },
    );
  }
}
