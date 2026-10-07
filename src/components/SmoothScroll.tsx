"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const OFFSET = -88;

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: OFFSET }, autoRaf: false });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // a new page starts at its top, or at the section its link pointed to
  useEffect(() => {
    const hash = window.location.hash;
    const lenis = window.__lenis;
    const go = () => {
      const el = hash ? document.querySelector(hash) : null;
      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: OFFSET, immediate: true });
        else el.scrollIntoView();
      } else if (lenis) lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    const id = requestAnimationFrame(go);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
