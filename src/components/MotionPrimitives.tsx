"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

const spring = {
  stiffness: 120,
  damping: 24,
  mass: 0.8,
};

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, spring);

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 48,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion ? false : { opacity: 0, y: distance, filter: "blur(5px)" }
      }
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealArticle({
  children,
  className,
  delay = 0,
  distance = 56,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      initial={
        reduceMotion ? false : { opacity: 0, y: distance, filter: "blur(5px)" }
      }
      transition={{
        duration: 0.78,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -6% 0px" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    >
      {children}
    </motion.article>
  );
}

export function PortraitMotion({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const y = useSpring(rawY, spring);

  return (
    <motion.div
      ref={frameRef}
      className="portrait__frame"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -1.2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      style={{ y: reduceMotion ? 0 : y }}
      transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.025,
              rotate: 0.5,
              transition: { duration: 0.25 },
            }
      }
    >
      {children}
    </motion.div>
  );
}
