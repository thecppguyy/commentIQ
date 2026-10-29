"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollTiltProps = {
  children: ReactNode;
  className?: string;
};

export default function ScrollTilt({ children, className }: ScrollTiltProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let previousScrollY = window.scrollY;
    let idleTimer: number | undefined;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - previousScrollY;
      previousScrollY = currentScrollY;

      if (Math.abs(difference) < 1) return;

      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) {
        element.dataset.scrollDirection = "rest";
        return;
      }

      element.dataset.scrollDirection = difference > 0 ? "down" : "up";
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        element.dataset.scrollDirection = "rest";
      }, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div ref={elementRef} className={className} data-scroll-direction="rest">
      {children}
    </div>
  );
}
