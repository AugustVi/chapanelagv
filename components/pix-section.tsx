"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { FloralDivider } from "./botanical-florals";

const PIX_QRCODE_IMAGE = "/images/pix-qrcode.png";

export function PixSection() {
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY || "";
  const [copied, setCopied] = useState(false);

  function handleCopyPix() {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section className="paper-texture relative overflow-hidden bg-warm-100/30 px-6 pt-28 pb-16 sm:px-8">
      {/* Fade in from cream at top */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-cream-50 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive-100/15 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="font-script text-2xl text-olive-500 sm:text-3xl">
            Presente em dinheiro
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-sage-800 sm:text-5xl">
            PIX
          </h2>
          <FloralDivider className="mt-5 text-olive-400" />
          <p className="mt-5 font-body text-lg leading-relaxed text-sage-500">
            Se preferir, contribua com um valor para a nossa nova casa
          </p>
        </div>

        <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center">
          {/* QR Code — vintage frame */}
          <div className="rounded-3xl border border-sage-200/40 bg-white p-5 shadow-sm">
            <div className="rounded-2xl bg-sage-100/20">
              <img
                src={PIX_QRCODE_IMAGE}
                alt="QR Code PIX"
                className="h-[240px] w-[240px] sm:h-[260px] sm:w-[260px]"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h3 className="font-display text-2xl font-medium text-sage-800">
              Chave PIX
            </h3>
            <p className="mt-3 max-w-xs break-all font-body text-sm leading-relaxed text-sage-500">
              {pixKey}
            </p>

            <Button
              onClick={handleCopyPix}
              variant="outline"
              className="mt-7 rounded-full px-8 font-medium transition-all duration-500 hover:-translate-y-0.5"
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copiado!
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar PIX
                </>
              )}
            </Button>

            <p className="mt-6 font-body text-sm italic text-sage-400">
              Abra o app do seu banco, escolha PIX e cole a chave acima
            </p>
          </div>
        </div>
      </div>
      {/* Fade to white at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-cream-50" />
    </section>
  );
}
