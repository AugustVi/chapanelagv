export function WishlistFallback() {
  return (
    <div className="mt-16 text-center">
      <div className="mx-auto max-w-lg rounded-2xl border border-sage-200/60 bg-sage-50/80 px-6 py-8 sm:px-10">
        <svg
          className="mx-auto h-10 w-10 text-sage-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <h3 className="mt-4 font-display text-xl font-medium text-sage-800">
          Não encontrou o que procurava?
        </h3>
        <p className="mt-2 font-body text-sm text-sage-600">
          Dê uma olhada na nossa wishlist da Amazon — tem mais ideias por lá.
        </p>
        <a
          href="https://www.amazon.com.br/hz/wishlist/ls/24X0JOLR7VHH?ref_=wl_share"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-700 px-6 py-3 font-body text-sm font-medium text-white transition-all hover:bg-sage-800 shadow-lg shadow-sage-200/50"
        >
          Ver Wishlist na Amazon
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
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
