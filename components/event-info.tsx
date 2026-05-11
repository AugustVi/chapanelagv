export function EventInfo() {
  const address = process.env.NEXT_PUBLIC_EVENT_ADDRESS || "Endereço do evento";
  const date = process.env.NEXT_PUBLIC_EVENT_DATE || "Data";
  const time = process.env.NEXT_PUBLIC_EVENT_TIME || "Horário";
  const mapsLink = process.env.NEXT_PUBLIC_MAPS_LINK || "#";

  return (
    <section className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-sage-500">
            Informações
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-sage-800 sm:text-5xl">
            O Evento
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {/* Date card */}
          <div className="group rounded-2xl border border-sage-200/60 bg-white p-8 text-center transition-all duration-300 hover:shadow-lg hover:shadow-sage-200/50">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600 transition-colors group-hover:bg-sage-200">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-display text-lg font-medium text-sage-800">
              Data
            </h3>
            <p className="mt-2 font-body text-sage-600">{date}</p>
            <p className="font-body text-sage-600">{time}</p>
          </div>

          {/* Address card */}
          <div className="group rounded-2xl border border-sage-200/60 bg-white p-8 text-center transition-all duration-300 hover:shadow-lg hover:shadow-sage-200/50">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600 transition-colors group-hover:bg-sage-200">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-display text-lg font-medium text-sage-800">
              Endereço
            </h3>
            <p className="mt-2 font-body text-sage-600">{address}</p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-body text-sm text-terracotta-600 transition-colors hover:text-terracotta-700"
            >
              Ver no mapa
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {/* Gift suggestion card */}
          <div className="group rounded-2xl border border-sage-200/60 bg-white p-8 text-center transition-all duration-300 hover:shadow-lg hover:shadow-sage-200/50">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600 transition-colors group-hover:bg-sage-200">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                />
              </svg>
            </div>
            <h3 className="font-display text-lg font-medium text-sage-800">
              Sugestão
            </h3>
            <p className="mt-2 font-body text-sage-600">
              Sua presença é o maior presente, mas se quiser nos mimar, confira
              nossa lista abaixo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
