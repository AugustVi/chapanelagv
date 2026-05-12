import { CornerFlourish, CornerFlourishMirrored, FloatingBranch, HeartIcon } from "./botanical-florals";

export function HeroSection() {
  const couple = process.env.NEXT_PUBLIC_COUPLE_NAME || "Gabrielle & Vinicius";
  const date = process.env.NEXT_PUBLIC_EVENT_DATE || "20 de Dezembro de 2026";

  return (
    <section className="paper-texture relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Botanical corner decorations */}
      <CornerFlourish className="pointer-events-none absolute left-0 top-0 h-40 w-40 text-olive-500 sm:h-56 sm:w-56" />
      <CornerFlourishMirrored className="pointer-events-none absolute right-0 top-0 h-40 w-40 text-olive-500 sm:h-56 sm:w-56" />

      {/* Floating branches */}
      <FloatingBranch className="animate-float pointer-events-none absolute left-0 bottom-1/4 h-10 w-28 text-olive-500 opacity-20 sm:h-16 sm:w-36" />
      <FloatingBranch className="animate-float-delayed pointer-events-none absolute right-0 bottom-1/3 h-10 w-28 text-olive-500 opacity-18 sm:h-16 sm:w-36 rotate-180" />

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/80 via-cream-50 to-warm-100/30" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-olive-200/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-terracotta-100/12 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-[250px] w-[250px] rounded-full bg-warm-200/20 blur-3xl" />
      </div>

      {/* Decorative top line */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-[2px] w-14 sm:w-20 bg-olive-600/70 rounded-full" />
        <span className="font-script text-2xl text-olive-600 sm:text-3xl">
          Chá de Panela
        </span>
        <div className="h-[2px] w-14 sm:w-20 bg-olive-600/70 rounded-full" />
      </div>

      {/* Main heading */}
      <h1 className="relative font-display text-5xl font-semibold leading-tight tracking-tight text-sage-800 sm:text-6xl md:text-7xl lg:text-8xl">
        {/* Tiny decorative heart above names */}
        <HeartIcon className="mx-auto mb-2 h-9 w-9 text-terracotta-500" />
        {couple}
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-md font-body text-lg italic leading-relaxed text-sage-500 sm:text-xl">
        Uma nova casa começa com o carinho de quem amamos
      </p>

      {/* Date badge */}
      <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-sage-200/50 bg-white/50 px-7 py-3 backdrop-blur-sm">
        <svg
          className="h-4 w-4 text-terracotta-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="font-body text-sm tracking-wide text-sage-600">{date}</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex animate-bounce flex-col items-center gap-2">
        <span className="font-body text-xs uppercase tracking-[0.25em] text-sage-400">
          Role para descobrir
        </span>
        <svg className="h-5 w-5 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
