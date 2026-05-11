import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const couple = process.env.NEXT_PUBLIC_COUPLE_NAME || "Gabrielle & Vinicius";

export const metadata: Metadata = {
  title: `Chá de Panela | ${couple}`,
  description:
    "Venha celebrar conosco o nosso Chá de Panela. Confira os presentes, o local e confirme sua presença.",
  openGraph: {
    title: `Chá de Panela | ${couple}`,
    description: "Venha celebrar conosco o nosso Chá de Panela.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-cream-50 text-sage-950">{children}</body>
    </html>
  );
}
