"use client";

import { motion } from "framer-motion";
import DispatchTicket from "./DispatchTicket";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="grain" />
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-bronze/[0.06] blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-graphite/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-bronze-light"
          >
            Built for septic, porta-potty &amp; dumpster companies
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-bone md:text-6xl"
          >
            Every missed call
            <br />
            is a job on <span className="bronze-text">someone else&apos;s</span> truck.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-dim"
          >
            Oryndel answers your phone 24/7, sounds like a real person, and books
            the job straight into your calendar — even at 2am on a Sunday when
            a tank backs up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#demo"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-bronze-gradient px-8 py-4 text-base font-semibold text-black transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a Live Demo
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="text-sm text-dim">
              We build it for your business first.
              <br className="hidden sm:block" /> You hear it work before you pay.
            </p>
          </motion.div>
        </div>

        <DispatchTicket />
      </div>
    </section>
  );
}
