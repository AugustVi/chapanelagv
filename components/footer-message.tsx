export function FooterMessage() {
  return (
    <footer className="relative overflow-hidden px-6 py-24 sm:px-8">
      {/* Fade in from cream at top */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-cream-50 to-transparent" />
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-olive-200/40 via-warm-100/60 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 translate-y-1/2 rounded-full bg-olive-100/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        {/* Divider */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-olive-300/60" />
          <span className="font-display text-2xl text-olive-400">&</span>
          <div className="h-px w-12 bg-olive-300/60" />
        </div>

        <h2 className="font-display text-4xl font-semibold text-sage-800 sm:text-5xl">
          Obrigado!
        </h2>

        <p className="mt-6 font-body text-lg leading-relaxed text-sage-600">
          A presença de cada um de vocês torna este momento ainda mais especial.
          Mal podemos esperar para compartilhar sorrisos, histórias e começar
          esta nova etapa ao lado de quem amamos.
        </p>

        <p className="mt-4 font-body text-lg italic text-sage-500">
          Com carinho, Gabrielle & Vinicius
        </p>

        {/* Heart decoration */}
        <div className="mt-12 flex justify-center">
          <svg
            className="h-8 w-8 text-terracotta-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
