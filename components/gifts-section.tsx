"use client";

import { useEffect, useState, useCallback } from "react";
import type { ProductInfo } from "@/lib/scraper";
import { GiftCard } from "./gift-card";
import { ReservationModal } from "./reservation-modal";
import { WishlistFallback } from "./wishlist-fallback";

export function GiftsSection() {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [reservations, setReservations] = useState<Record<string, string>>({});
  const [reservingProduct, setReservingProduct] = useState<ProductInfo | null>(
    null,
  );
  const [reservationErrors, setReservationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    Promise.all([
      fetch("/api/gifts").then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      }),
      fetch("/api/reservations")
        .then((res) => res.json())
        .then((data) => {
          const map: Record<string, string> = {};
          for (const r of data.reservations || []) {
            // guest_name may be absent when accessed without key
            map[r.gift_url] = r.guest_name || "";
          }
          setReservations(map);
        })
        .catch(() => {
          // Reservations fail silently — gifts still render
        }),
    ])
      .then(([productsData]) => {
        setProducts(productsData);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleReserveConfirm = useCallback(
    async (guestName: string) => {
      if (!reservingProduct) return;

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftUrl: reservingProduct.url,
          guestName,
        }),
      });

      if (response.ok) {
        setReservations((prev) => ({
          ...prev,
          [reservingProduct.url]: guestName,
        }));
        setReservationErrors((prev) => {
          const next = { ...prev };
          delete next[reservingProduct.url];
          return next;
        });
        setReservingProduct(null);
      } else if (response.status === 409) {
        setReservationErrors((prev) => ({
          ...prev,
          [reservingProduct.url]:
            "Este presente acabou de ser reservado por outra pessoa",
        }));
        setReservingProduct(null);
      } else {
        setReservationErrors((prev) => ({
          ...prev,
          [reservingProduct.url]: "Erro ao reservar. Tente novamente.",
        }));
        setReservingProduct(null);
      }
    },
    [reservingProduct],
  );

  return (
    <section className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-olive-600">
            Presentes
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-sage-800 sm:text-5xl">
            Lista de Presentes
          </h2>
          <p className="mt-4 font-body text-lg text-sage-600">
            Escolha um presente com carinho para o nosso novo lar
          </p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid gap-3 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-sage-200/60 bg-white p-3 sm:p-5"
              >
                <div className="aspect-square sm:aspect-[4/3] animate-pulse rounded-xl bg-sage-100" />
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-sage-100" />
                  <div className="h-5 w-1/2 animate-pulse rounded bg-sage-100" />
                  <div className="h-10 w-full animate-pulse rounded-full bg-sage-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center">
            <p className="font-body text-sage-500">
              Não foi possível carregar os presentes no momento.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 font-body text-sm text-terracotta-600 underline hover:text-terracotta-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && (
          <div className="grid gap-3 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <GiftCard
                key={product.url}
                product={product}
                reservedBy={reservations[product.url] ?? null}
                onReserveClick={() => setReservingProduct(product)}
                reservationError={reservationErrors[product.url] ?? null}
              />
            ))}
          </div>
        )}

        {/* Wishlist fallback */}
        {!loading && !error && <WishlistFallback />}

        {/* Reservation modal */}
        {reservingProduct && (
          <ReservationModal
            giftTitle={reservingProduct.title || "Presente"}
            onConfirm={handleReserveConfirm}
            onCancel={() => setReservingProduct(null)}
          />
        )}
      </div>
    </section>
  );
}
