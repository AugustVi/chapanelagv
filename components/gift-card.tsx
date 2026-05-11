"use client";

import type { ProductInfo } from "@/lib/scraper";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface GiftCardProps {
  product: ProductInfo;
  reservedBy: string | null;
  onReserveClick: () => void;
  reservationError: string | null;
}

export function GiftCard({
  product,
  reservedBy,
  onReserveClick,
  reservationError,
}: GiftCardProps) {
  const priceLabel = product.price
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.price)
    : "Preço a consultar";

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-sage-200/40 hover:-translate-y-1">
      {/* Product image */}
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-square sm:aspect-[4/3] overflow-hidden bg-sage-100/50 cursor-pointer"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.title || "Presente"}
            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-12 w-12 sm:h-16 sm:w-16 text-sage-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              />
            </svg>
          </div>
        )}

        {/* Store badge */}
        {product.store && (
          <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-white/90 px-2 py-0.5 sm:px-2.5 sm:py-1 font-body text-[10px] sm:text-xs font-medium text-sage-600 shadow-sm backdrop-blur-sm">
            {product.store}
          </span>
        )}

        {/* External link hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 transition-colors duration-300">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 font-body text-xs text-sage-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md backdrop-blur-sm translate-y-1 group-hover:translate-y-0 transition-transform">
            Ver na loja
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </div>
      </a>

      <CardContent className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Title + store link */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body text-sm sm:text-base font-semibold leading-snug text-sage-800 line-clamp-2 flex-1">
            {product.title || "Presente"}
          </h3>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 flex-shrink-0 rounded-full p-1.5 text-sage-400 hover:text-terracotta-500 hover:bg-sage-50 transition-colors"
            title="Abrir loja"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Price */}
        <p className="mt-2 sm:mt-2.5 font-body text-base sm:text-lg font-semibold text-terracotta-600">
          {priceLabel}
        </p>

        <div className="mt-auto space-y-2 pt-3 sm:pt-4">
          {/* Reservation status */}
          {reservedBy !== null ? (
            <div className="rounded-xl bg-sage-100/80 px-3 py-2.5 text-center">
              {reservedBy ? (
                <>
                  <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider text-sage-500">
                    Reservado por
                  </span>
                  <p className="font-body text-sm font-semibold text-sage-800">
                    {reservedBy}
                  </p>
                </>
              ) : (
                <p className="font-body text-sm font-semibold text-sage-700">
                  Reservado
                </p>
              )}
            </div>
          ) : (
            <>
              {reservationError && (
                <p className="text-center font-body text-[11px] sm:text-xs text-red-500 leading-tight">
                  {reservationError}
                </p>
              )}
              <Button
                variant="default"
                className="w-full text-sm"
                onClick={onReserveClick}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reservar
              </Button>
            </>
          )}

        </div>
      </CardContent>
    </Card>
  );
}
