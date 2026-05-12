"use client";

import { useEffect, useState, useCallback } from "react";
import type { ProductInfo } from "@/lib/scraper";
import { GiftCard } from "./gift-card";
import { ReservationModal } from "./reservation-modal";
import { WishlistFallback } from "./wishlist-fallback";
import { FloralDivider, FloatingSprig, FloatingBranch, VineBorder, ScatteredLeaves, CookingPotIcon } from "./botanical-florals";

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
            map[r.gift_url] = r.guest_name || "";
          }
          setReservations(map);
        })
        .catch(() => {}),
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
    <section className="paper-texture relative px-6 py-28 sm:px-8">
      {/* Vine border at top */}
      <VineBorder className="pointer-events-none absolute left-0 right-0 top-0 h-6 w-full text-olive-500 opacity-25" />

      {/* Floating botanical accents — visible on all screen sizes */}
      <FloatingSprig className="animate-float pointer-events-none absolute right-1 top-12 h-18 w-14 text-olive-500 opacity-15 sm:right-4 sm:top-16 sm:h-28 sm:w-20 sm:opacity-20" />
      <FloatingSprig className="animate-float-slow pointer-events-none absolute left-0 bottom-24 h-20 w-14 text-olive-500 opacity-12 sm:left-2 sm:bottom-32 sm:h-32 sm:w-20 sm:opacity-15" />
      <FloatingBranch className="animate-float pointer-events-none absolute left-0 top-1/3 h-8 w-20 text-olive-500 opacity-12 sm:h-14 sm:w-32 sm:opacity-18" />
      <ScatteredLeaves className="animate-float-delayed pointer-events-none absolute right-2 bottom-1/4 h-12 w-12 text-olive-500 opacity-10 sm:right-8 sm:h-20 sm:w-20 sm:opacity-12" />
      <CookingPotIcon className="animate-float pointer-events-none absolute right-1 top-1/2 h-12 w-10 text-olive-600 opacity-20 sm:right-2 sm:h-18 sm:w-16 sm:opacity-25" />

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="font-script text-2xl text-olive-500 sm:text-3xl">
            Presentes
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-sage-800 sm:text-5xl">
            Lista de Presentes
          </h2>
          <FloralDivider className="mt-5 text-olive-400" />
          <p className="mt-5 font-body text-lg leading-relaxed text-sage-500">
            Escolha um presente com carinho para o nosso novo lar
          </p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid gap-3 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-3xl border border-sage-200/30 bg-white/70 p-3 sm:p-5">
                <div className="aspect-square sm:aspect-[4/3] animate-pulse rounded-2xl bg-sage-100/60" />
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-sage-100/60" />
                  <div className="h-5 w-1/2 animate-pulse rounded bg-sage-100/60" />
                  <div className="h-10 w-full animate-pulse rounded-full bg-sage-100/60" />
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
              className="mt-4 font-body text-sm text-terracotta-500 underline hover:text-terracotta-600"
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

      {/* Vine border at bottom */}
      <VineBorder className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 w-full text-olive-500 opacity-25 rotate-180" />
    </section>
  );
}
