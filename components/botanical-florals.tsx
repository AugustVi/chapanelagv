interface SvgProps {
  className?: string;
}

/* ──────────── Corner Flourishes ──────────── */

/** Delicate corner spray — vines with leaves and tiny buds, vintage engraving style */
export function CornerFlourish({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
      <path d="M0,0 Q35,8 60,38 Q80,62 70,100 Q65,120 55,145" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
      <path d="M32,20 Q55,15 80,35 Q100,50 110,80" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.28" />
      <path d="M15,8 Q25,30 55,55 Q80,70 100,60" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.22" />
      <path d="M22,13 Q29,7 33,13 Q29,19 22,13Z" fill="currentColor" opacity="0.3" />
      <path d="M45,28 Q52,22 56,28 Q52,34 45,28Z" fill="currentColor" opacity="0.3" />
      <path d="M58,50 Q66,44 70,50 Q66,56 58,50Z" fill="currentColor" opacity="0.25" />
      <path d="M62,78 Q70,72 73,78 Q70,84 62,78Z" fill="currentColor" opacity="0.25" />
      <path d="M50,110 Q58,104 61,110 Q58,116 50,110Z" fill="currentColor" opacity="0.2" />
      <path d="M74,42 Q82,36 86,42 Q82,48 74,42Z" fill="currentColor" opacity="0.25" />
      <path d="M95,62 Q103,56 106,62 Q103,68 95,62Z" fill="currentColor" opacity="0.2" />
      <circle cx="70" cy="100" r="2.2" fill="currentColor" opacity="0.28" />
      <circle cx="74" cy="97" r="1.5" fill="currentColor" opacity="0.22" />
      <circle cx="67" cy="96" r="1.5" fill="currentColor" opacity="0.22" />
      <circle cx="110" cy="80" r="2" fill="currentColor" opacity="0.24" />
      <circle cx="55" cy="145" r="2.2" fill="currentColor" opacity="0.2" />
      <circle cx="51" cy="142" r="1.5" fill="currentColor" opacity="0.16" />
      <circle cx="100" cy="60" r="3.5" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="60" r="1.8" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/** Mirrored corner flourish (top-right / bottom-left orientation) */
export function CornerFlourishMirrored({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
      <path d="M160,0 Q125,8 100,38 Q80,62 90,100 Q95,120 105,145" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
      <path d="M128,20 Q105,15 80,35 Q60,50 50,80" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.28" />
      <path d="M145,8 Q135,30 105,55 Q80,70 60,60" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.22" />
      <path d="M138,13 Q131,7 127,13 Q131,19 138,13Z" fill="currentColor" opacity="0.3" />
      <path d="M115,28 Q108,22 104,28 Q108,34 115,28Z" fill="currentColor" opacity="0.3" />
      <path d="M102,50 Q94,44 90,50 Q94,56 102,50Z" fill="currentColor" opacity="0.25" />
      <path d="M98,78 Q90,72 87,78 Q90,84 98,78Z" fill="currentColor" opacity="0.25" />
      <path d="M110,110 Q102,104 99,110 Q102,116 110,110Z" fill="currentColor" opacity="0.2" />
      <path d="M86,42 Q78,36 74,42 Q78,48 86,42Z" fill="currentColor" opacity="0.25" />
      <path d="M65,62 Q57,56 54,62 Q57,68 65,62Z" fill="currentColor" opacity="0.2" />
      <circle cx="90" cy="100" r="2.2" fill="currentColor" opacity="0.28" />
      <circle cx="86" cy="97" r="1.5" fill="currentColor" opacity="0.22" />
      <circle cx="93" cy="96" r="1.5" fill="currentColor" opacity="0.22" />
      <circle cx="50" cy="80" r="2" fill="currentColor" opacity="0.24" />
      <circle cx="105" cy="145" r="2.2" fill="currentColor" opacity="0.2" />
      <circle cx="109" cy="142" r="1.5" fill="currentColor" opacity="0.16" />
      <circle cx="60" cy="60" r="3.5" fill="currentColor" opacity="0.15" />
      <circle cx="60" cy="60" r="1.8" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* ──────────── Larger elaborate corner piece ──────────── */

export function CornerBouquet({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      {/* Main stems radiating from corner */}
      <path d="M0,0 Q40,15 70,50 Q90,75 80,110 Q75,130 65,155" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.32" />
      <path d="M0,0 Q30,30 60,70 Q78,98 90,130" stroke="currentColor" strokeWidth="0.55" fill="none" opacity="0.26" />
      <path d="M0,0 Q55,10 90,40 Q110,60 125,85" stroke="currentColor" strokeWidth="0.55" fill="none" opacity="0.24" />
      <path d="M10,5 Q15,40 40,80 Q55,105 70,140 Q78,158 82,175" stroke="currentColor" strokeWidth="0.45" fill="none" opacity="0.2" />
      {/* Leaves */}
      <path d="M25,18 Q33,12 37,18 Q33,24 25,18Z" fill="currentColor" opacity="0.28" />
      <path d="M50,35 Q58,29 62,35 Q58,41 50,35Z" fill="currentColor" opacity="0.28" />
      <path d="M68,58 Q77,52 81,58 Q77,64 68,58Z" fill="currentColor" opacity="0.26" />
      <path d="M75,88 Q84,82 88,88 Q84,94 75,88Z" fill="currentColor" opacity="0.24" />
      <path d="M60,125 Q68,119 72,125 Q68,131 60,125Z" fill="currentColor" opacity="0.2" />
      <path d="M85,45 Q93,39 97,45 Q93,51 85,45Z" fill="currentColor" opacity="0.24" />
      <path d="M105,68 Q113,62 117,68 Q113,74 105,68Z" fill="currentColor" opacity="0.22" />
      <path d="M78,145 Q85,139 89,145 Q85,151 78,145Z" fill="currentColor" opacity="0.18" />
      <path d="M40,60 Q48,54 52,60 Q48,66 40,60Z" fill="currentColor" opacity="0.22" />
      <path d="M38,100 Q46,94 50,100 Q46,106 38,100Z" fill="currentColor" opacity="0.2" />
      {/* Leaf with center vein */}
      <path d="M90,100 Q75,92 72,99 Q75,92 90,100Z" fill="currentColor" opacity="0.2" />
      {/* Larger flowers */}
      <circle cx="80" cy="110" r="5" fill="currentColor" opacity="0.13" />
      <circle cx="80" cy="110" r="2.5" fill="currentColor" opacity="0.18" />
      <circle cx="78" cy="107" r="1.5" fill="currentColor" opacity="0.14" />
      <circle cx="83" cy="108" r="1.5" fill="currentColor" opacity="0.14" />
      <circle cx="82" cy="113" r="1.5" fill="currentColor" opacity="0.14" />
      <circle cx="90" cy="130" r="4.5" fill="currentColor" opacity="0.12" />
      <circle cx="90" cy="130" r="2.2" fill="currentColor" opacity="0.16" />
      <circle cx="65" cy="155" r="4.5" fill="currentColor" opacity="0.12" />
      <circle cx="65" cy="155" r="2.2" fill="currentColor" opacity="0.16" />
      <circle cx="125" cy="85" r="4" fill="currentColor" opacity="0.11" />
      <circle cx="125" cy="85" r="2" fill="currentColor" opacity="0.15" />
      {/* Tiny buds */}
      <circle cx="65" cy="70" r="2.5" fill="currentColor" opacity="0.2" />
      <circle cx="55" cy="45" r="2" fill="currentColor" opacity="0.18" />
      <circle cx="110" cy="50" r="2" fill="currentColor" opacity="0.17" />
    </svg>
  );
}

/* ──────────── Decorative Dividers ──────────── */

/** Thin lines with a botanical six-petal flower in the center */
export function FloralDivider({ className }: SvgProps) {
  return (
    <div className={`flex items-center gap-3 sm:gap-5 ${className || ""}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-35" />
      <svg viewBox="0 0 40 20" fill="none" className="h-6 w-14 shrink-0 opacity-60">
        {/* Center flower — larger and more visible */}
        <circle cx="20" cy="10" r="3.5" fill="currentColor" opacity="0.55" />
        {/* Petal dots */}
        <circle cx="20" cy="5" r="1.6" fill="currentColor" opacity="0.42" />
        <circle cx="24" cy="7.5" r="1.6" fill="currentColor" opacity="0.42" />
        <circle cx="24" cy="12.5" r="1.6" fill="currentColor" opacity="0.42" />
        <circle cx="20" cy="15" r="1.6" fill="currentColor" opacity="0.42" />
        <circle cx="16" cy="12.5" r="1.6" fill="currentColor" opacity="0.42" />
        <circle cx="16" cy="7.5" r="1.6" fill="currentColor" opacity="0.42" />
        {/* Side leaves */}
        <path d="M8,10 Q14,5 12.5,10 Q14,15 8,10Z" fill="currentColor" opacity="0.5" />
        <path d="M32,10 Q26,5 27.5,10 Q26,15 32,10Z" fill="currentColor" opacity="0.5" />
        {/* Connecting stems */}
        <path d="M12.5,10 L16,10" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
        <path d="M24,10 L27.5,10" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-current to-transparent opacity-35" />
    </div>
  );
}

/** More elaborate divider with larger floral cluster */
export function OrnateDivider({ className }: SvgProps) {
  return (
    <div className={`flex items-center gap-2 sm:gap-4 ${className || ""}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-28" />
      <svg viewBox="0 0 60 24" fill="none" className="h-6 w-16 shrink-0 opacity-55">
        {/* Center rose-like flower */}
        <circle cx="30" cy="12" r="3.5" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="6.5" r="2" fill="currentColor" opacity="0.35" />
        <circle cx="35" cy="9" r="2" fill="currentColor" opacity="0.35" />
        <circle cx="35" cy="15" r="2" fill="currentColor" opacity="0.35" />
        <circle cx="30" cy="17.5" r="2" fill="currentColor" opacity="0.35" />
        <circle cx="25" cy="15" r="2" fill="currentColor" opacity="0.35" />
        <circle cx="25" cy="9" r="2" fill="currentColor" opacity="0.35" />
        {/* Side leaves */}
        <path d="M6,12 Q13,5 11,12 Q13,19 6,12Z" fill="currentColor" opacity="0.45" />
        <path d="M54,12 Q47,5 49,12 Q47,19 54,12Z" fill="currentColor" opacity="0.45" />
        <path d="M15,12 Q20,7 18.5,12 Q20,17 15,12Z" fill="currentColor" opacity="0.38" />
        <path d="M45,12 Q40,7 41.5,12 Q40,17 45,12Z" fill="currentColor" opacity="0.38" />
        {/* Stems */}
        <path d="M11,12 L18,12" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <path d="M42,12 L49,12" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-current to-transparent opacity-28" />
    </div>
  );
}

/* ──────────── Floating Botanical Elements ──────────── */

export function FloatingSprig({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 120" fill="none" className={className} aria-hidden="true">
      <path d="M40,0 Q35,25 42,55 Q48,80 35,110 Q32,118 30,120" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.28" />
      <path d="M40,25 Q52,22 58,28 Q62,32 65,28" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.22" />
      <path d="M34,40 Q28,34 32,28 Q36,34 34,40Z" fill="currentColor" opacity="0.22" />
      <path d="M44,65 Q50,60 54,65 Q50,70 44,65Z" fill="currentColor" opacity="0.2" />
      <path d="M33,90 Q27,85 30,80 Q34,85 33,90Z" fill="currentColor" opacity="0.18" />
      <path d="M55,30 Q60,26 63,30 Q60,34 55,30Z" fill="currentColor" opacity="0.18" />
      <circle cx="30" cy="118" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="27" cy="115" r="1.3" fill="currentColor" opacity="0.15" />
      <circle cx="33" cy="116" r="1.3" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

/** A wider, shorter sprig for horizontal placement */
export function FloatingBranch({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 140 70" fill="none" className={className} aria-hidden="true">
      <path d="M0,35 Q30,20 65,28 Q100,35 140,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M55,28 Q52,15 55,10 Q58,15 55,28Z" fill="currentColor" opacity="0.2" />
      <path d="M30,22 Q26,14 28,10 Q31,14 30,22Z" fill="currentColor" opacity="0.18" />
      <path d="M90,32 Q93,22 96,18 Q99,22 90,32Z" fill="currentColor" opacity="0.2" />
      <path d="M115,27 Q118,18 120,14 Q123,18 115,27Z" fill="currentColor" opacity="0.17" />
      <circle cx="55" cy="10" r="2.5" fill="currentColor" opacity="0.2" />
      <circle cx="140" cy="25" r="2" fill="currentColor" opacity="0.16" />
      <circle cx="28" cy="10" r="1.8" fill="currentColor" opacity="0.16" />
    </svg>
  );
}

/** Scattered small leaves for filling empty spaces */
export function ScatteredLeaves({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path d="M20,10 Q28,4 30,10 Q28,16 20,10Z" fill="currentColor" opacity="0.15" />
      <path d="M75,20 Q82,15 85,20 Q82,25 75,20Z" fill="currentColor" opacity="0.12" />
      <path d="M10,60 Q16,55 18,60 Q16,65 10,60Z" fill="currentColor" opacity="0.14" />
      <path d="M85,75 Q91,70 93,75 Q91,80 85,75Z" fill="currentColor" opacity="0.12" />
      <path d="M50,85 Q56,80 58,85 Q56,90 50,85Z" fill="currentColor" opacity="0.1" />
      <path d="M35,50 Q30,45 28,50 Q30,55 35,50Z" fill="currentColor" opacity="0.1" />
      <path d="M65,55 Q60,50 58,55 Q60,60 65,55Z" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

/* ──────────── Decorative Wreath ──────────── */

/** Circular botanical wreath — leaves and small flowers arranged in a ring */
export function BotanicalWreath({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      {/* Connecting vine arcs (4 arcs making a circle) */}
      <path d="M100,22 A78,78 0 0,1 178,100" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
      <path d="M178,100 A78,78 0 0,1 100,178" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
      <path d="M100,178 A78,78 0 0,1 22,100" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
      <path d="M22,100 A78,78 0 0,1 100,22" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />

      {/* Leaves around the wreath — 12 positions */}
      {/* Top cluster (0°) */}
      <path d="M100,26 Q106,22 110,28 Q104,31 100,26Z" fill="currentColor" opacity="0.22" />
      <path d="M100,18 Q95,14 92,19 Q97,22 100,18Z" fill="currentColor" opacity="0.22" />
      {/* 30° */}
      <path d="M138,39 Q144,35 148,42 Q142,44 138,39Z" fill="currentColor" opacity="0.2" />
      {/* 60° */}
      <path d="M162,74 Q168,71 170,78 Q165,80 162,74Z" fill="currentColor" opacity="0.2" />
      {/* 90° */}
      <path d="M174,105 Q180,103 180,110 Q175,112 174,105Z" fill="currentColor" opacity="0.22" />
      <path d="M178,96 Q183,92 185,98 Q180,100 178,96Z" fill="currentColor" opacity="0.2" />
      {/* 120° */}
      <path d="M162,132 Q168,135 166,142 Q160,140 162,132Z" fill="currentColor" opacity="0.2" />
      {/* 150° */}
      <path d="M138,163 Q144,167 140,173 Q134,170 138,163Z" fill="currentColor" opacity="0.22" />
      {/* 180° (bottom) */}
      <path d="M104,175 Q108,181 102,183 Q98,179 104,175Z" fill="currentColor" opacity="0.2" />
      <path d="M94,178 Q90,183 88,179 Q92,176 94,178Z" fill="currentColor" opacity="0.2" />
      {/* 210° */}
      <path d="M62,163 Q56,167 60,173 Q66,170 62,163Z" fill="currentColor" opacity="0.2" />
      {/* 240° */}
      <path d="M38,132 Q32,135 30,142 Q36,140 38,132Z" fill="currentColor" opacity="0.22" />
      {/* 270° */}
      <path d="M26,100 Q20,103 20,96 Q25,94 26,100Z" fill="currentColor" opacity="0.22" />
      <path d="M22,105 Q17,108 15,102 Q20,101 22,105Z" fill="currentColor" opacity="0.2" />
      {/* 300° */}
      <path d="M38,68 Q32,65 34,58 Q40,60 38,68Z" fill="currentColor" opacity="0.2" />
      {/* 330° */}
      <path d="M62,37 Q56,33 60,27 Q66,30 62,37Z" fill="currentColor" opacity="0.22" />

      {/* Flowers at cardinal points */}
      {/* Top */}
      <circle cx="100" cy="22" r="4.5" fill="currentColor" opacity="0.1" />
      <circle cx="100" cy="22" r="2" fill="currentColor" opacity="0.16" />
      <circle cx="98" cy="19" r="1.3" fill="currentColor" opacity="0.12" />
      <circle cx="103" cy="19" r="1.3" fill="currentColor" opacity="0.12" />
      <circle cx="103" cy="25" r="1.3" fill="currentColor" opacity="0.12" />
      <circle cx="97" cy="25" r="1.3" fill="currentColor" opacity="0.12" />
      {/* Right */}
      <circle cx="178" cy="100" r="4.5" fill="currentColor" opacity="0.1" />
      <circle cx="178" cy="100" r="2" fill="currentColor" opacity="0.16" />
      {/* Bottom */}
      <circle cx="100" cy="178" r="4.5" fill="currentColor" opacity="0.1" />
      <circle cx="100" cy="178" r="2" fill="currentColor" opacity="0.16" />
      {/* Left */}
      <circle cx="22" cy="100" r="4.5" fill="currentColor" opacity="0.1" />
      <circle cx="22" cy="100" r="2" fill="currentColor" opacity="0.16" />

      {/* Small accent buds at 45° positions */}
      <circle cx="155" cy="45" r="2.2" fill="currentColor" opacity="0.14" />
      <circle cx="155" cy="155" r="2.2" fill="currentColor" opacity="0.14" />
      <circle cx="45" cy="155" r="2.2" fill="currentColor" opacity="0.14" />
      <circle cx="45" cy="45" r="2.2" fill="currentColor" opacity="0.14" />
    </svg>
  );
}

/* ──────────── Vintage Chá de Panela Icons ──────────── */

/** Vintage teapot with floral motif */
export function TeapotIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 100 90" fill="none" className={className} aria-hidden="true">
      {/* Steam */}
      <path d="M50,2 Q46,8 50,14" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.35" />
      <path d="M56,0 Q54,6 56,11" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.28" />
      <path d="M44,0 Q42,5 44,9" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.28" />
      {/* Lid */}
      <path d="M38,28 Q50,16 62,28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" />
      <circle cx="50" cy="17" r="3.5" fill="currentColor" opacity="0.4" />
      {/* Body */}
      <path d="M34,32 Q34,45 35,60 Q36,78 50,78 Q64,78 65,60 Q66,45 66,32 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" />
      {/* Spout */}
      <path d="M34,50 Q22,44 16,34 Q14,30 18,28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" />
      {/* Handle */}
      <path d="M66,42 Q82,38 84,55 Q86,72 66,68" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" />
      {/* Decorative floral motif on body */}
      <circle cx="50" cy="55" r="4" fill="currentColor" opacity="0.15" />
      <circle cx="50" cy="55" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="48" cy="52" r="1.3" fill="currentColor" opacity="0.14" />
      <circle cx="52" cy="52" r="1.3" fill="currentColor" opacity="0.14" />
      <circle cx="53" cy="58" r="1.3" fill="currentColor" opacity="0.14" />
      <circle cx="47" cy="58" r="1.3" fill="currentColor" opacity="0.14" />
      {/* Base rim */}
      <path d="M36,77 Q50,82 64,77" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" />
    </svg>
  );
}

/** Vintage teacup with saucer */
export function TeacupIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 70" fill="none" className={className} aria-hidden="true">
      {/* Steam */}
      <path d="M34,6 Q32,12 34,18" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M40,4 Q39,10 40,15" stroke="currentColor" strokeWidth="0.55" fill="none" opacity="0.25" />
      {/* Cup body */}
      <path d="M25,22 Q25,32 28,42 Q31,52 40,52 Q49,52 52,42 Q55,32 55,22 Z" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.55" />
      {/* Cup rim */}
      <path d="M26,22 Q40,26 54,22" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.55" />
      {/* Handle */}
      <path d="M55,28 Q64,28 66,36 Q68,44 55,44" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Small floral decoration */}
      <circle cx="40" cy="38" r="3" fill="currentColor" opacity="0.12" />
      <circle cx="40" cy="38" r="1.5" fill="currentColor" opacity="0.18" />
      <circle cx="38.5" cy="36" r="1" fill="currentColor" opacity="0.12" />
      <circle cx="41.5" cy="36" r="1" fill="currentColor" opacity="0.12" />
      <circle cx="42" cy="40" r="1" fill="currentColor" opacity="0.12" />
      <circle cx="38" cy="40" r="1" fill="currentColor" opacity="0.12" />
      {/* Saucer */}
      <path d="M14,54 Q40,60 66,54" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      <path d="M18,56 Q40,62 62,56" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
    </svg>
  );
}

/** Charming line-art cottage */
export function HouseIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 70" fill="none" className={className} aria-hidden="true">
      {/* Chimney */}
      <path d="M55,8 L55,18 Q55,20 57,20 L60,20 L60,6" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Smoke */}
      <path d="M57,4 Q55,2 56,0" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
      <path d="M59,2 Q58,0 59,-2" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.2" />
      {/* Roof */}
      <path d="M8,30 L40,10 L72,30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" />
      <path d="M14,30 L40,14 L66,30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* House body */}
      <rect x="16" y="30" width="48" height="34" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" rx="1" />
      {/* Door */}
      <rect x="30" y="42" width="14" height="22" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" rx="1" />
      <circle cx="41" cy="54" r="1.2" fill="currentColor" opacity="0.4" />
      {/* Windows */}
      <rect x="20" y="40" width="10" height="10" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" rx="0.5" />
      <path d="M25,40 L25,50 M20,45 L30,45" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <rect x="54" y="40" width="10" height="10" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" rx="0.5" />
      <path d="M59,40 L59,50 M54,45 L64,45" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      {/* Tiny garden */}
      <path d="M12,62 Q15,58 18,62" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
      <circle cx="15" cy="58" r="1.8" fill="currentColor" opacity="0.15" />
      <path d="M66,62 Q69,57 72,62" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
      <circle cx="69" cy="57" r="1.8" fill="currentColor" opacity="0.15" />
      {/* Ground line */}
      <path d="M8,64 L72,64" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
    </svg>
  );
}

/** Vintage gift box with bow */
export function GiftIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 75" fill="none" className={className} aria-hidden="true">
      {/* Box body */}
      <rect x="16" y="26" width="48" height="42" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.55" rx="2" />
      {/* Box lid (slightly wider) */}
      <path d="M13,26 L67,26 L65,22 L15,22 Z" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.55" />
      {/* Vertical ribbon */}
      <path d="M40,22 L40,68" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Horizontal ribbon */}
      <path d="M16,46 L64,46" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Bow — left loop */}
      <path d="M40,22 Q28,12 30,18 Q32,22 40,22" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Bow — right loop */}
      <path d="M40,22 Q52,12 50,18 Q48,22 40,22" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Bow center knot */}
      <circle cx="40" cy="22" r="2.5" fill="currentColor" opacity="0.4" />
      {/* Bow tails */}
      <path d="M38,24 Q32,30 30,34" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M42,24 Q48,30 50,34" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.4" />
      {/* Small floral accent on box */}
      <circle cx="40" cy="58" r="2.5" fill="currentColor" opacity="0.12" />
      <circle cx="40" cy="58" r="1.3" fill="currentColor" opacity="0.16" />
    </svg>
  );
}

/** Decorative vintage heart */
export function HeartIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 50 45" fill="none" className={className} aria-hidden="true">
      {/* Filled heart background */}
      <path
        d="M25,42 C25,42 4,28 4,15 C4,6 11,2 17,2 C22,2 25,6 25,10 C25,6 28,2 33,2 C39,2 46,6 46,15 C46,28 25,42 25,42Z"
        fill="currentColor"
        opacity="0.28"
      />
      {/* Outline */}
      <path
        d="M25,42 C25,42 4,28 4,15 C4,6 11,2 17,2 C22,2 25,6 25,10 C25,6 28,2 33,2 C39,2 46,6 46,15 C46,28 25,42 25,42Z"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="none"
        opacity="0.7"
      />
      {/* Inner highlight */}
      <path
        d="M25,36 C25,36 10,25 10,15 C10,10 14,7 17,7 C21,7 25,11 25,14 C25,11 29,7 33,7 C36,7 40,10 40,15 C40,25 25,36 25,36Z"
        fill="currentColor"
        opacity="0.15"
      />
      {/* Tiny floral inside */}
      <circle cx="25" cy="20" r="2.8" fill="currentColor" opacity="0.3" />
      <circle cx="25" cy="20" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/** Small rolling pin / kitchen tool */
export function RollingPinIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 40" fill="none" className={className} aria-hidden="true">
      {/* Handles */}
      <rect x="4" y="14" width="14" height="12" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" rx="3" />
      <rect x="62" y="14" width="14" height="12" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" rx="3" />
      {/* Barrel */}
      <rect x="18" y="8" width="44" height="24" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" rx="5" />
      {/* Grip lines */}
      <path d="M10,18 L10,22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M68,18 L68,22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Floral accent */}
      <circle cx="40" cy="20" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="40" cy="20" r="1.5" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

/** Small spoon / wooden utensil */
export function SpoonIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 80" fill="none" className={className} aria-hidden="true">
      {/* Handle */}
      <path d="M23,72 Q24,60 22,48 Q20,36 22,24 Q24,18 22,10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      {/* Spoon head (oval) */}
      <path d="M22,10 Q14,0 8,6 Q2,14 10,18 Q16,20 22,10Z" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Tiny decorative line on handle */}
      <path d="M20,55 Q23,52 24,55" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
    </svg>
  );
}

/* ──────────── Vine Border ──────────── */

/** Horizontal vine border with leaves — for card/section edges */
export function VineBorder({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 300 24" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      {/* Wavy vine stem */}
      <path d="M0,12 Q18,3 36,12 Q54,21 72,12 Q90,3 108,12 Q126,21 144,12 Q162,3 180,12 Q198,21 216,12 Q234,3 252,12 Q270,21 288,12 Q294,9 300,12" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Leaves at intervals */}
      <path d="M24,12 Q30,6 28,12 Q30,18 24,12Z" fill="currentColor" opacity="0.18" />
      <path d="M72,12 Q78,6 76,12 Q78,18 72,12Z" fill="currentColor" opacity="0.18" />
      <path d="M120,12 Q114,6 116,12 Q114,18 120,12Z" fill="currentColor" opacity="0.18" />
      <path d="M168,12 Q174,6 172,12 Q174,18 168,12Z" fill="currentColor" opacity="0.18" />
      <path d="M216,12 Q222,6 220,12 Q222,18 216,12Z" fill="currentColor" opacity="0.18" />
      <path d="M264,12 Q270,6 268,12 Q270,18 264,12Z" fill="currentColor" opacity="0.18" />
      {/* Tiny buds */}
      <circle cx="48" cy="10" r="1.5" fill="currentColor" opacity="0.14" />
      <circle cx="96" cy="14" r="1.5" fill="currentColor" opacity="0.14" />
      <circle cx="144" cy="10" r="1.5" fill="currentColor" opacity="0.14" />
      <circle cx="192" cy="14" r="1.5" fill="currentColor" opacity="0.14" />
      <circle cx="240" cy="10" r="1.5" fill="currentColor" opacity="0.14" />
      <circle cx="288" cy="14" r="1.5" fill="currentColor" opacity="0.14" />
    </svg>
  );
}

/* ──────────── Small Flower Cluster ──────────── */

export function FlowerCluster({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      {/* Stems */}
      <path d="M20,40 Q18,30 16,22" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
      <path d="M20,40 Q24,30 26,20" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
      <path d="M20,40 Q20,32 20,25" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
      {/* Flower 1 (left) */}
      <circle cx="16" cy="22" r="3.5" fill="currentColor" opacity="0.12" />
      <circle cx="16" cy="22" r="1.8" fill="currentColor" opacity="0.18" />
      <circle cx="14" cy="20" r="1.1" fill="currentColor" opacity="0.12" />
      <circle cx="18" cy="20" r="1.1" fill="currentColor" opacity="0.12" />
      <circle cx="18" cy="24" r="1.1" fill="currentColor" opacity="0.12" />
      <circle cx="14" cy="24" r="1.1" fill="currentColor" opacity="0.12" />
      {/* Flower 2 (right) */}
      <circle cx="26" cy="20" r="3.5" fill="currentColor" opacity="0.12" />
      <circle cx="26" cy="20" r="1.8" fill="currentColor" opacity="0.18" />
      <circle cx="24" cy="18" r="1.1" fill="currentColor" opacity="0.12" />
      <circle cx="28" cy="18" r="1.1" fill="currentColor" opacity="0.12" />
      <circle cx="28" cy="22" r="1.1" fill="currentColor" opacity="0.12" />
      <circle cx="24" cy="22" r="1.1" fill="currentColor" opacity="0.12" />
      {/* Flower 3 (top center) */}
      <circle cx="20" cy="25" r="2.5" fill="currentColor" opacity="0.1" />
      <circle cx="20" cy="25" r="1.3" fill="currentColor" opacity="0.14" />
    </svg>
  );
}

/* ──────────── Vintage Sunflower ──────────── */

export function SunflowerIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 100 120" fill="none" className={className} aria-hidden="true">
      {/* Stem */}
      <path d="M50,58 Q48,80 52,105 Q53,112 51,118" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Left leaf */}
      <path d="M46,78 Q34,70 32,76 Q34,82 46,78Z" fill="currentColor" opacity="0.3" />
      <path d="M46,78 Q38,74 32,76" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.25" />
      {/* Right leaf */}
      <path d="M50,88 Q64,82 66,88 Q64,94 50,88Z" fill="currentColor" opacity="0.25" />
      <path d="M50,88 Q58,84 66,88" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.2" />
      {/* Petals — 16 pointed ovals radiating from center */}
      <path d="M50,28 Q46,14 50,8 Q54,14 50,28Z" fill="currentColor" opacity="0.28" />
      <path d="M62,32 Q72,22 77,26 Q69,34 62,32Z" fill="currentColor" opacity="0.28" />
      <path d="M68,42 Q82,38 84,44 Q76,48 68,42Z" fill="currentColor" opacity="0.28" />
      <path d="M68,54 Q82,58 84,52 Q76,48 68,54Z" fill="currentColor" opacity="0.28" />
      <path d="M62,64 Q72,74 77,70 Q69,62 62,64Z" fill="currentColor" opacity="0.28" />
      <path d="M50,68 Q54,82 50,88 Q46,82 50,68Z" fill="currentColor" opacity="0.28" />
      <path d="M38,64 Q28,74 23,70 Q31,62 38,64Z" fill="currentColor" opacity="0.28" />
      <path d="M32,54 Q18,58 16,52 Q24,48 32,54Z" fill="currentColor" opacity="0.28" />
      <path d="M32,42 Q18,38 16,44 Q24,48 32,42Z" fill="currentColor" opacity="0.28" />
      <path d="M38,32 Q28,22 23,26 Q31,34 38,32Z" fill="currentColor" opacity="0.28" />
      {/* Secondary petals (between the main ones, slightly smaller) */}
      <path d="M56,30 Q62,18 66,22 Q61,28 56,30Z" fill="currentColor" opacity="0.22" />
      <path d="M66,48 Q78,48 80,52 Q73,53 66,48Z" fill="currentColor" opacity="0.22" />
      <path d="M56,66 Q62,78 66,74 Q61,68 56,66Z" fill="currentColor" opacity="0.22" />
      <path d="M44,66 Q38,78 34,74 Q39,68 44,66Z" fill="currentColor" opacity="0.22" />
      <path d="M34,48 Q22,48 20,52 Q27,53 34,48Z" fill="currentColor" opacity="0.22" />
      <path d="M44,30 Q38,18 34,22 Q39,28 44,30Z" fill="currentColor" opacity="0.22" />
      {/* Center disk (seed head) */}
      <circle cx="50" cy="46" r="14" fill="currentColor" opacity="0.22" />
      <circle cx="50" cy="46" r="11" fill="currentColor" opacity="0.18" />
      {/* Stippled seed pattern in center */}
      <circle cx="46" cy="42" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="41" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="54" cy="42" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="45" cy="46" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="45" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="55" cy="46" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="47" cy="50" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="51" cy="50" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="53" cy="49" r="1" fill="currentColor" opacity="0.2" />
      {/* Outer rim of seed head */}
      <circle cx="50" cy="46" r="14" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.3" />
    </svg>
  );
}

/* ──────────── Vintage Cooking Pot (Panelinha) ──────────── */

export function CookingPotIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 70 75" fill="none" className={className} aria-hidden="true">
      {/* Steam wisps */}
      <path d="M28,10 Q26,4 28,0" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M35,8 Q33,2 35,-2" stroke="currentColor" strokeWidth="0.55" fill="none" opacity="0.25" />
      <path d="M42,10 Q44,4 42,0" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
      {/* Lid knob */}
      <circle cx="35" cy="16" r="3.5" fill="currentColor" opacity="0.35" />
      {/* Lid dome */}
      <path d="M18,22 Q35,10 52,22" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.55" />
      <path d="M22,22 Q35,13 48,22" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.2" />
      {/* Lid rim */}
      <path d="M16,24 Q35,28 54,24" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Pot body */}
      <path d="M14,26 L14,58 Q14,66 35,66 Q56,66 56,58 L56,26" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.55" />
      {/* Pot rim line */}
      <path d="M15,28 L55,28" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.45" />
      {/* Left handle */}
      <path d="M14,34 Q6,34 5,42 Q4,50 14,50" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Right handle */}
      <path d="M56,34 Q64,34 65,42 Q66,50 56,50" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* Decorative band around pot */}
      <path d="M15,40 L55,40" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Small floral accent on pot */}
      <circle cx="35" cy="48" r="3.5" fill="currentColor" opacity="0.12" />
      <circle cx="35" cy="48" r="1.8" fill="currentColor" opacity="0.18" />
      <circle cx="33" cy="46" r="1" fill="currentColor" opacity="0.1" />
      <circle cx="37" cy="46" r="1" fill="currentColor" opacity="0.1" />
      <circle cx="37" cy="50" r="1" fill="currentColor" opacity="0.1" />
      <circle cx="33" cy="50" r="1" fill="currentColor" opacity="0.1" />
      {/* Bottom curve */}
      <path d="M16,64 Q35,70 54,64" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
    </svg>
  );
}
