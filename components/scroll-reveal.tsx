"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;

    function checkVisibility() {
      if (cancelled) return;
      const rect = node!.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true);
        return true;
      }
      return false;
    }

    // Check if already in viewport on mount
    if (checkVisibility()) return;

    // IntersectionObserver for scroll-based reveal
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node!);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );

    observer.observe(node);

    // Safety net: if IntersectionObserver never fires, fall back to
    // scroll listener after a short delay.
    const fallbackTimer = setTimeout(() => {
      if (cancelled) return;
      if (checkVisibility()) {
        observer.disconnect();
        return;
      }

      function onScroll() {
        if (checkVisibility()) {
          observer.disconnect();
          window.removeEventListener("scroll", onScroll);
        }
      }
      window.addEventListener("scroll", onScroll);
    }, 2000);

    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className || ""}`}
    >
      {children}
    </div>
  );
}
