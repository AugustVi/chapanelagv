import { CornerFlourish, CornerFlourishMirrored, FloralDivider, HeartIcon } from "./botanical-florals";

export function FooterMessage() {
  return (
    <footer className="paper-texture relative overflow-hidden px-6 pt-16 pb-32 sm:px-8">
      {/* Fade in from cream at top */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-cream-50 to-transparent" />

      {/* Botanical corner accents — visible on mobile */}
      <CornerFlourish className="pointer-events-none absolute left-0 top-0 h-32 w-32 text-olive-500 opacity-20 sm:h-44 sm:w-44 sm:opacity-25" />
      <CornerFlourishMirrored className="pointer-events-none absolute right-0 bottom-0 h-32 w-32 text-olive-500 opacity-20 sm:h-44 sm:w-44 sm:opacity-25" />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-olive-200/30 via-warm-100/40 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 translate-y-1/2 rounded-full bg-olive-100/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        {/* Ampersand divider */}
        <div className="mb-12 flex items-center justify-center gap-5">
          <div className="h-px w-16 bg-olive-300/50" />
          <span className="font-script text-3xl text-olive-400">&</span>
          <div className="h-px w-16 bg-olive-300/50" />
        </div>

        <h2 className="font-display text-5xl font-semibold tracking-tight text-sage-800 sm:text-6xl">
          Obrigado!
        </h2>

        <FloralDivider className="mt-8 text-olive-400" />

        <p className="mt-8 font-body text-lg leading-relaxed text-sage-500">
          A presença de cada um de vocês torna este momento ainda mais especial.
          Mal podemos esperar para compartilhar sorrisos, histórias e começar
          esta nova etapa ao lado de quem amamos.
        </p>

        <p className="mt-6 font-script text-3xl text-olive-500 sm:text-4xl">
          Com carinho, Gabrielle & Vinicius
        </p>

        {/* Heart decoration */}
        <div className="mt-14 flex justify-center">
          <HeartIcon className="h-12 w-12 text-terracotta-500" />
        </div>
      </div>
    </footer>
  );
}
