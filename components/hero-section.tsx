export function HeroSection() {
  const couple = process.env.NEXT_PUBLIC_COUPLE_NAME || "Gabrielle & Vinicius";
  const date = process.env.NEXT_PUBLIC_EVENT_DATE || "20 de Dezembro de 2026";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-100/60 via-cream-50 to-cream-100/40" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sage-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-terracotta-200/15 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-[250px] w-[250px] rounded-full bg-cream-300/20 blur-3xl" />
      </div>

      {/* Decorative top line */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px w-12 bg-sage-400/50" />
        <span className="font-display text-xs uppercase tracking-[0.3em] text-sage-500">
          Chá de Panela
        </span>
        <div className="h-px w-12 bg-sage-400/50" />
      </div>

      {/* Main heading */}
      <h1 className="font-display text-5xl font-semibold leading-tight text-sage-800 sm:text-6xl md:text-7xl lg:text-8xl">
        {couple}
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-md font-body text-lg italic text-sage-600 sm:text-xl">
        Uma nova casa começa com o carinho de quem amamos
      </p>

      {/* Date badge */}
      <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-sage-300/60 bg-white/60 px-6 py-3 backdrop-blur-sm">
        <svg
          className="h-4 w-4 text-terracotta-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="font-body text-sm text-sage-700">{date}</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex animate-bounce flex-col items-center gap-2">
        <span className="font-body text-xs uppercase tracking-widest text-sage-400">
          Role para descobrir
        </span>
        <svg
          className="h-5 w-5 text-sage-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
