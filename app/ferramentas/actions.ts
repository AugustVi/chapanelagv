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

export interface ScrapeResult {
  title: string | null;
  image: string | null;
  price: number | null;
  store: string | null;
  imageSlug: string | null;
  /** Which fields the scraper managed to extract */
  extracted: { title: boolean; image: boolean; price: boolean };
  /** Store-specific hint for manual entry */
  hint: string | null;
}

export async function buscarProduto(url: string): Promise<ScrapeResult> {
  const product = await scrapeProduct(url);

  const imageSlug = product.title ? slugify(product.title) : null;
  const extracted = {
    title: !!product.title,
    image: !!product.image,
    price: product.price != null,
  };

  let hint: string | null = null;
  if (!extracted.title || !extracted.image || !extracted.price) {
    if (product.store === "Shopee") {
      hint =
        "Shopee bloqueia a extração automática de dados. Copie manualmente o título, preço e imagem do produto e cole nos campos abaixo.";
    } else if (product.store === "Mercado Livre") {
      hint =
        "O Mercado Livre pode bloquear a extração automática. Preencha os dados manualmente ou configure um SCRAPING_PROXY_URL para usar um proxy de scraping.";
    } else {
      hint =
        "Não foi possível extrair todos os dados. Preencha os campos restantes manualmente.";
    }
  }

  return {
    title: product.title,
    image: product.image,
    price: product.price,
    store: product.store,
    imageSlug,
    extracted,
    hint,
  };
}
