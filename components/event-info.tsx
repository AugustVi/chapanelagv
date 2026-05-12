import { TeapotIcon, HouseIcon, GiftIcon, FloatingSprig, ScatteredLeaves, VineBorder, BotanicalWreath } from "./botanical-florals";

export function EventInfo() {
  const address = process.env.NEXT_PUBLIC_EVENT_ADDRESS || "Endereço do evento";
  const date = process.env.NEXT_PUBLIC_EVENT_DATE || "Data";
  const time = process.env.NEXT_PUBLIC_EVENT_TIME || "Horário";
  const mapsLink = process.env.NEXT_PUBLIC_MAPS_LINK || "#";

  return (
    <section className="paper-texture relative overflow-hidden bg-warm-100/40 px-6 py-28 sm:px-8">
      {/* Floating botanical accents — visible on mobile */}
      <FloatingSprig className="animate-float pointer-events-none absolute -left-3 top-8 h-20 w-16 text-olive-500 opacity-20 sm:left-4 sm:top-12 sm:h-32 sm:w-24 sm:opacity-25" />
      <FloatingSprig className="animate-float-delayed pointer-events-none absolute right-0 top-1/3 h-22 w-16 text-olive-500 opacity-15 sm:h-36 sm:w-24 sm:opacity-20" />
      <ScatteredLeaves className="animate-float-slow pointer-events-none absolute left-1/4 bottom-8 h-16 w-16 text-olive-500 opacity-10 sm:h-24 sm:w-24 sm:opacity-12" />

      {/* Vine border at top */}
      <VineBorder className="pointer-events-none absolute left-0 right-0 top-0 h-6 w-full text-olive-500 opacity-25" />

      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[250px] w-[250px] -translate-y-1/2 translate-x-1/4 rounded-full bg-olive-200/12 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="relative mb-24 text-center">
          {/* Small wreath behind header */}
          <BotanicalWreath className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 text-olive-500 opacity-12 sm:h-[340px] sm:w-[340px]" />

          <span className="relative font-script text-2xl text-olive-600 sm:text-3xl">
            Informações
          </span>
          <h2 className="relative mt-3 font-display text-4xl font-semibold tracking-tight text-sage-800 sm:text-5xl">
            O Evento
          </h2>
          <div className="relative mt-6 flex items-center justify-center gap-3 text-olive-600">
            <div className="h-px w-10 bg-current opacity-25" />
            <TeapotIcon className="h-9 w-9" />
            <div className="h-px w-10 bg-current opacity-25" />
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {/* Date card */}
          <div className="group rounded-3xl border border-sage-200/40 bg-white/80 p-8 text-center shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-sage-200/40 hover:-translate-y-1">
            <div className="mx-auto mb-5 flex items-center justify-center text-olive-700">
              <TeapotIcon className="h-16 w-16" />
            </div>
            <h3 className="font-display text-xl font-medium text-sage-800">
              Data
            </h3>
            <p className="mt-3 font-body text-base text-sage-500 leading-relaxed">{date}</p>
            <p className="font-body text-base text-sage-500">{time}</p>
          </div>

          {/* Address card */}
          <div className="group rounded-3xl border border-sage-200/40 bg-white/80 p-8 text-center shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-sage-200/40 hover:-translate-y-1">
            <div className="mx-auto mb-5 flex items-center justify-center text-olive-700">
              <HouseIcon className="h-16 w-16" />
            </div>
            <h3 className="font-display text-xl font-medium text-sage-800">
              Endereço
            </h3>
            <p className="mt-3 font-body text-base text-sage-500 leading-relaxed">{address}</p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-body text-sm text-terracotta-500 transition-colors hover:text-terracotta-600"
            >
              Ver no mapa
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Gift suggestion card */}
          <div className="group rounded-3xl border border-sage-200/40 bg-white/80 p-8 text-center shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-sage-200/40 hover:-translate-y-1">
            <div className="mx-auto mb-5 flex items-center justify-center text-olive-700">
              <GiftIcon className="h-16 w-16" />
            </div>
            <h3 className="font-display text-xl font-medium text-sage-800">
              Sugestão
            </h3>
            <p className="mt-3 font-body text-base text-sage-500 leading-relaxed">
              Sua presença é o maior presente, mas se quiser nos mimar, confira
              nossa lista abaixo
            </p>
          </div>
        </div>
      </div>

      {/* Vine border at bottom */}
      <VineBorder className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 w-full text-olive-500 opacity-25 rotate-180" />
    </section>
  );
}
