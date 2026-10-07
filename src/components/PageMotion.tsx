"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* One choreography for the page, keyed off data attributes so the markup stays
   server-rendered and fully visible without JavaScript. Every move starts from
   the element's resting, readable state. */
export default function PageMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let offName = () => {};
    const ctx = gsap.context(() => {
      // the hero copy lands with a little squash, after the name has been piped in
      if (document.querySelector(".hero")) {
        gsap.from(".hero__title, .hero__lede, .hero__links > *", {
          y: 26,
          scaleY: 0.92,
          transformOrigin: "50% 100%",
          duration: 1.1,
          ease: "elastic.out(1, 0.6)",
          stagger: 0.07,
          delay: 0.9,
        });
        // "give it a poke" only once the name is there to be poked
        gsap.set(".hero__hint", { autoAlpha: 0 });
        const hint = () =>
          gsap.fromTo(
            ".hero__hint",
            { autoAlpha: 0, y: 10, rotate: -4 },
            { autoAlpha: 1, y: 0, rotate: 0, duration: 1, ease: "back.out(2)", delay: 0.5 },
          );
        const onName = (e: Event) => {
          if ((e as CustomEvent<string>).detail === "landed") ctx.add(hint);
        };
        if ((window as Window & { __ykLanded?: boolean }).__ykLanded) hint();
        window.addEventListener("yk:name", onName);
        offName = () => window.removeEventListener("yk:name", onName);
      }

      // big headings squash and settle, letter by letter, like the name does
      gsap.utils.toArray<HTMLElement>("[data-motion='drop']").forEach((el) => {
        gsap.from(el.querySelectorAll(".char"), {
          scaleY: 0.62,
          yPercent: 18,
          transformOrigin: "50% 100%",
          duration: 1.15,
          ease: "elastic.out(1, 0.55)",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // the work list deals itself out, row by row
      ScrollTrigger.batch(".work-row", {
        start: "top 92%",
        once: true,
        onEnter: (rows) =>
          gsap.from(rows, { y: 40, rotate: 0.6, duration: 0.9, ease: "expo.out", stagger: 0.07, clearProps: "transform" }),
      });

      // paragraphs ease up, gently
      gsap.utils.toArray<HTMLElement>("[data-motion='rise']").forEach((el) => {
        gsap.from(el, { y: 36, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      // facts rise with the paragraphs, one row after another
      gsap.utils.toArray<HTMLElement>("[data-motion='facts']").forEach((el) => {
        gsap.from(el.children, {
          y: 20,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // screenshots unfold as they arrive, then drift a touch slower than the page
      gsap.utils.toArray<HTMLElement>("[data-motion='shot']").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(12% 6% 12% 6% round 18px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            ease: "expo.out",
            duration: 1.3,
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
        const img = el.querySelector("img");
        if (img)
          gsap.fromTo(
            img,
            { yPercent: -3 },
            { yPercent: 3, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
      });
    });
    return () => {
      offName();
      ctx.revert();
    };
  }, []);

  return null;
}
