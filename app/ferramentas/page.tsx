"use client";

import { useState } from "react";
import { buscarProduto, type ScrapeResult } from "./actions";

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

function buildGiftsJsonEntry(url: string, title: string, imageSlug: string, price: string) {
  const entry: Record<string, unknown> = { url };
  if (title.trim()) entry.title = title.trim();
  if (imageSlug.trim()) entry.image = `/images/gifts/${imageSlug.trim()}.jpg`;
  const priceNum = parseFloat(price.replace(",", "."));
  if (price && !isNaN(priceNum)) entry.price = priceNum;
  return JSON.stringify(entry, null, 2);
}

export default function FerramentasPage() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [imageSlug, setImageSlug] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrapedImage, setScrapedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lastResult, setLastResult] = useState<ScrapeResult | null>(null);

  const store = url.trim() ? detectStore(url.trim()) : null;
  const jsonOutput = buildGiftsJsonEntry(url, title, imageSlug, price);

  async function handleFetch() {
    const trimmed = url.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setLastResult(null);

    try {
      const result = await buscarProduto(trimmed);
      setLastResult(result);

      if (result.title) setTitle(result.title);
      if (result.price) setPrice(result.price.toString().replace(".", ","));
      if (result.imageSlug) setImageSlug(result.imageSlug);
      setScrapedImage(result.image);

      if (result.hint) {
        setError(result.hint);
      }
    } catch {
      setError(
        "Erro ao buscar produto. O site pode estar bloqueando o acesso. Preencha manualmente abaixo.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main className="min-h-screen bg-cream-50 px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-sage-500">
            Ferramentas
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-sage-800">
            Conversor de Links
          </h1>
          <p className="mt-3 font-body text-sage-600">
            Cole o link de um produto (Amazon, Mercado Livre, Magalu, Shopee) e receba o
            JSON pronto para colar no{" "}
            <code className="rounded bg-sage-100 px-1.5 py-0.5 text-sm">gifts.json</code>
          </p>
        </div>

        {/* URL field + fetch button */}
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.amazon.com.br/dp/EXEMPLO"
            className="flex-1 rounded-2xl border border-sage-200 bg-white px-5 py-3.5 font-body text-sm text-sage-800 placeholder:text-sage-400 outline-none transition-shadow focus:shadow-lg focus:shadow-sage-200/50 focus:border-sage-300"
          />
          <button
            type="button"
            onClick={handleFetch}
            disabled={loading || !url.trim()}
            className="inline-flex items-center gap-2 rounded-2xl bg-sage-700 px-6 py-3.5 font-body text-sm font-medium text-white transition-all hover:bg-sage-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-sage-200/50"
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Buscando...
              </>
            ) : (
              "Buscar"
            )}
          </button>
        </div>

        {store && (
          <span className="mt-2 inline-block rounded-full bg-sage-100 px-2.5 py-0.5 font-body text-xs text-sage-600">
            {store}
          </span>
        )}

        {/* Error / info */}
        {error && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-body text-sm text-amber-700">{error}</p>
          </div>
        )}

        {/* Field-level extraction status */}
        {lastResult && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(["title", "image", "price"] as const).map((field) => (
              <span
                key={field}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-xs ${
                  lastResult.extracted[field]
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    lastResult.extracted[field] ? "bg-green-500" : "bg-amber-500"
                  }`}
                />
                {field === "title"
                  ? "Título"
                  : field === "image"
                    ? "Imagem"
                    : "Preço"}
                {lastResult.extracted[field] ? " extraído" : " pendente"}
              </span>
            ))}
          </div>
        )}

        {/* Manual fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-sage-700">
              Nome do produto
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do produto"
              className="w-full rounded-2xl border border-sage-200 bg-white px-5 py-3.5 font-body text-sm text-sage-800 placeholder:text-sage-400 outline-none transition-shadow focus:shadow-lg focus:shadow-sage-200/50 focus:border-sage-300"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center justify-between font-body text-sm font-medium text-sage-700">
              <span>Imagem</span>
              <span className="font-normal text-xs text-sage-400">
                /images/gifts/<span className="text-sage-600">nome</span>.jpg
              </span>
            </label>
            <input
              type="text"
              value={imageSlug}
              onChange={(e) => setImageSlug(e.target.value)}
              placeholder="panela-eletrica-arroz"
              className="w-full rounded-2xl border border-sage-200 bg-white px-5 py-3.5 font-body text-sm text-sage-800 placeholder:text-sage-400 outline-none transition-shadow focus:shadow-lg focus:shadow-sage-200/50 focus:border-sage-300"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-sage-700">
              Preço (R$)
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="199,90"
              className="w-full rounded-2xl border border-sage-200 bg-white px-5 py-3.5 font-body text-sm text-sage-800 placeholder:text-sage-400 outline-none transition-shadow focus:shadow-lg focus:shadow-sage-200/50 focus:border-sage-300"
            />
          </div>
        </div>

        {/* Product preview */}
        {url.trim() && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-sage-200 bg-white">
            <div className="flex gap-4 p-5">
              {scrapedImage && (
                <img
                  src={scrapedImage}
                  alt={title || "Preview"}
                  className="h-24 w-24 flex-shrink-0 rounded-xl object-cover bg-sage-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-semibold text-sage-800 line-clamp-2">
                  {title.trim() || "(nome do produto)"}
                </p>
                <p className="mt-1 font-body text-lg font-bold text-terracotta-600">
                  {price
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(parseFloat(price.replace(",", ".")))
                    : "Preço a consultar"}
                </p>
                {store && (
                  <span className="mt-2 inline-block rounded-full bg-sage-100 px-2.5 py-0.5 font-body text-xs text-sage-600">
                    {store}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* JSON output */}
        {url.trim() && (
          <div className="mt-6 rounded-2xl border border-sage-200 bg-sage-900 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-body text-xs uppercase tracking-wider text-sage-400">
                gifts.json entry
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-full bg-sage-700 px-3 py-1.5 font-body text-xs text-white hover:bg-sage-600 transition-colors"
              >
                {copied ? (
                  <>
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copiado!
                  </>
                ) : (
                  <>
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copiar JSON
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-sage-950 p-4 font-mono text-sm leading-relaxed text-green-300">
              {jsonOutput}
            </pre>
          </div>
        )}

        {/* Guide */}
        <div className="mt-8 rounded-2xl border border-sage-200/60 bg-sage-50 p-4">
          <p className="font-body text-xs text-sage-600">
            <strong>Como usar:</strong> Cole a URL e clique em Buscar. Se os dados
            forem encontrados, os campos serão preenchidos automaticamente. Ajuste
            o que precisar, copie o JSON e cole em{" "}
            <code className="rounded bg-sage-100 px-1 py-0.5">
              data/gifts.json
            </code>
            .
          </p>
        </div>

        {/* Empty state */}
        {!url.trim() && (
          <div className="mt-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-sage-100">
              <svg
                className="h-8 w-8 text-sage-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <p className="mt-4 font-body text-sm text-sage-500">
              Cole uma URL de produto acima para começar
            </p>
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 text-center">
          <a
            href="/"
            className="font-body text-sm text-sage-500 underline hover:text-sage-700 transition-colors"
          >
            Voltar para o site
          </a>
        </div>
      </div>
    </main>
  );
}
