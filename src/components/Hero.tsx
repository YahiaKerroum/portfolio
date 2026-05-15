"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: orbY1 }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px]"
        />
        <motion.div
          style={{ y: orbY2 }}
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[150px]"
        />
        <motion.div
          style={{ y: orbY3 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[200px]"
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <motion.div style={{ y: textY, opacity }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Profile photo with animated ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-8">
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full animate-spin-slow">
              <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-r from-accent via-accent-cyan to-accent-light">
                <div className="w-full h-full rounded-full bg-background" />
              </div>
            </div>
            {/* Photo */}
            <div className="absolute inset-[6px] rounded-full overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Yahia Kerroum"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Availability dot */}
            <span className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-green-400 border-[3px] border-background shadow-lg shadow-green-400/30" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface/80 backdrop-blur-sm border border-accent/20 text-sm text-muted"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50" />
            Available for opportunities
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Yahia</span>{" "}
          <span className="text-gradient animate-gradient">Kerroum</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AI Engineering student at ENSIA building full-stack applications
          and intelligent systems. From facial recognition to adaptive
          learning, I turn complex problems into production software.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-7 py-3.5 rounded-xl bg-accent text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-xl border border-border text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          {[
            {
              href: "https://github.com/YahiaKerroum",
              label: "GitHub",
              svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              ),
            },
            {
              href: "https://www.linkedin.com/in/yahia-student-kerroum-a963632b4/",
              label: "LinkedIn",
              svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              ),
            },
            {
              href: "mailto:yahia.kerroum@ensia.edu.dz",
              label: "Email",
              svg: <Mail size={20} />,
            },
          ].map(({ href, label, svg }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="p-3.5 rounded-xl bg-surface/60 backdrop-blur-sm border border-border text-muted hover:text-accent hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
              aria-label={label}
            >
              {svg}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-muted/50 hover:text-accent transition-colors duration-300">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
