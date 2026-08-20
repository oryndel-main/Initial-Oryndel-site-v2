"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "1",
    title: "We learn your business",
    body: "A short call about your trade, your service area, your pricing, and how you talk to customers. Fifteen minutes, no commitment.",
  },
  {
    n: "2",
    title: "We build your agent",
    body: "Your call script, your booking flow, your calendar — wired up and tested against real scenarios from your trade before you ever hear it.",
  },
  {
    n: "3",
    title: "You call it yourself",
    body: "We hand you a live number. You call it, run it through a real scenario, and hear exactly how it'll sound to your customers. You decide from there.",
  },
];

export default function BuildProcess() {
  return (
    <section className="relative border-t border-line/60 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-bronze-light">
            No case studies. No fake reviews.
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-bone md:text-4xl">
            We&apos;re new — so instead of testimonials, we let you hear the
            proof yourself.
          </h2>
          <p className="mt-4 text-lg text-dim">
            Here&apos;s exactly how you go from this page to a working agent
            for your business.
          </p>
        </motion.div>

        <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-line md:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center md:text-left"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-bronze/30 bg-charcoal font-display text-xl font-bold text-bronze-light md:mx-0">
                {s.n}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-bone">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full border border-bronze/40 bg-bronze/5 px-7 py-3.5 text-sm font-semibold text-bronze-light transition-all duration-300 hover:bg-bronze/10 hover:scale-[1.03]"
          >
            See it built for your business →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
