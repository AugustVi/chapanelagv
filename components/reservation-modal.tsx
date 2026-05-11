"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

interface ReservationModalProps {
  giftTitle: string;
  onConfirm: (guestName: string) => Promise<void>;
  onCancel: () => void;
}

export function ReservationModal({
  giftTitle,
  onConfirm,
  onCancel,
}: ReservationModalProps) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || trimmed.length < 2) return;

    setSubmitting(true);
    try {
      await onConfirm(trimmed);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-sage-200/60 bg-white p-6 shadow-xl animate-fade-in">
        <h3 className="font-display text-lg font-semibold text-sage-800">
          Reservar Presente
        </h3>
        <p className="mt-1 font-body text-sm text-sage-500 line-clamp-2">
          {giftTitle}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="guest-name"
              className="block font-body text-sm font-medium text-sage-700"
            >
              Seu nome
            </label>
            <input
              id="guest-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              autoFocus
              className="mt-1.5 w-full rounded-lg border border-sage-200 bg-sage-50/50 px-3 py-2.5 font-body text-sm text-sage-900 placeholder:text-sage-400 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400/20"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={submitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={name.trim().length < 2 || submitting}
              className="flex-1"
            >
              {submitting ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Reservar"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
