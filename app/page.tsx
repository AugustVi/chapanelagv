import { HeroSection } from "@/components/hero-section";
import { EventInfo } from "@/components/event-info";
import { ConfirmationSection } from "@/components/confirmation-section";
import { GiftsSection } from "@/components/gifts-section";
import { PixSection } from "@/components/pix-section";
import { FooterMessage } from "@/components/footer-message";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <ScrollReveal>
        <EventInfo />
      </ScrollReveal>

      <ScrollReveal>
        <GiftsSection />
      </ScrollReveal>

      <ScrollReveal>
        <ConfirmationSection />
      </ScrollReveal>

      <ScrollReveal>
        <PixSection />
      </ScrollReveal>

      <ScrollReveal>
        <FooterMessage />
      </ScrollReveal>
    </main>
  );
}
