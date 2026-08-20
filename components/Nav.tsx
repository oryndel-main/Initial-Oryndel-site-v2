"use client";

import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-line/60 bg-black/60 px-5 py-3 backdrop-blur-xl">
          <a
            href="#top"
            className="font-display text-xl font-extrabold tracking-tight text-bone transition hover:text-bronze-light"
            style={{ letterSpacing: "-0.02em" }}
          >
            Oryndel
          </a>
          <nav className="hidden items-center gap-8 text-sm text-dim md:flex">
            <a href="#how-it-works" className="transition hover:text-bone">
              How it works
            </a>
            <a href="#industries" className="transition hover:text-bone">
              Industries
            </a>
            <a href="#pricing" className="transition hover:text-bone">
              Pricing
            </a>
          </nav>
          <a
            href="#demo"
            className="group relative overflow-hidden rounded-full bg-bronze-gradient px-5 py-2 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            Book a Live Demo
          </a>
        </div>
      </div>
    </motion.header>
  );
}
