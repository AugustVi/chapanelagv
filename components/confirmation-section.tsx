"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export function ConfirmationSection() {
  const [confirmed, setConfirmed] = useState(false);
  const whatsapp =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";

  function handleConfirm() {
    setConfirmed(true);
    setTimeout(() => {
      window.open(
        `https://wa.me/${whatsapp}?text=Olá! Confirmo minha presença no Chá de Panela! 🎉`,
        "_blank",
      );
    }, 600);
  }

  return (
    <section className="relative overflow-hidden bg-olive-50/70 px-6 py-24 sm:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-olive-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-warm-300/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <span className="font-display text-xs uppercase tracking-[0.3em] text-sage-500">
          Presença
        </span>
        <h2 className="mt-4 font-display text-4xl font-semibold text-sage-800 sm:text-5xl">
          Confirme sua Presença
        </h2>
        <p className="mt-4 font-body text-lg text-sage-600">
          Ficaremos muito felizes em compartilhar este momento com você
        </p>

        <div className="mt-10">
          {confirmed ? (
            <div className="animate-fade-in space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-10 w-10 text-green-600"
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
              </div>
              <p className="font-display text-xl text-sage-800">
                Presença confirmada!
              </p>
              <p className="font-body text-sage-500">
                Você será redirecionado para o WhatsApp...
              </p>
            </div>
          ) : (
            <Button
              onClick={handleConfirm}
              size="lg"
              className="min-w-[220px] text-base"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Confirmar Presença
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
