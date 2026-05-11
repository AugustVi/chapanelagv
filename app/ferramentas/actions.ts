"use server";

import { scrapeProduct } from "@/lib/scraper";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);
}

export async function buscarProduto(url: string) {
  const product = await scrapeProduct(url);

  const imageSlug = product.title ? slugify(product.title) : null;

  return {
    title: product.title,
    image: product.image,
    price: product.price,
    store: product.store,
    imageSlug,
  };
}
