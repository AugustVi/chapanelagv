"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "./ui/button";

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
    <section className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-sage-500">
            Presente em dinheiro
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-sage-800 sm:text-5xl">
            PIX
          </h2>
          <p className="mt-4 font-body text-lg text-sage-600">
            Se preferir, contribua com um valor para a nossa nova casa
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center">
          {/* QR Code */}
          <div className="rounded-2xl border border-sage-200/60 bg-white p-6 shadow-sm">
            <QRCodeSVG
              value={pixKey}
              size={200}
              level="M"
              className="h-[200px] w-[200px]"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h3 className="font-display text-xl font-medium text-sage-800">
              Chave PIX
            </h3>
            <p className="mt-2 max-w-xs break-all font-body text-sm text-sage-500">
              {pixKey}
            </p>

            <Button onClick={handleCopyPix} variant="outline" className="mt-6">
              {copied ? (
                <>
                  <svg
                    className="h-4 w-4 text-green-600"
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
                    className="h-4 w-4"
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
    </section>
  );
}
