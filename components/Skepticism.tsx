"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "It doesn't sound like a robot",
    body: "No dial-tone menus, no \"press 1 for sales.\" It talks the way a good dispatcher talks — because it's built and tuned for your business, not a generic script.",
  },
  {
    title: "No new number, no new hardware",
    body: "It runs alongside the number you already have. Nothing to reprint on your trucks or your website.",
  },
  {
    title: "Nothing to set up on your end",
    body: "We build it, test it against real scenarios from your trade, and hand you a working line. You don't touch a config screen.",
  },
  {
    title: "It never clocks out",
    body: "3am emergency calls, holiday weekends, the lunch rush — answered the same way every time.",
  },
];

export default function Skepticism() {
  return (
    <section className="relative border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-bronze-light">
            We know what you&apos;re thinking
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-bone md:text-4xl">
            &quot;AI&quot; gets thrown around a lot. Here&apos;s what this actually is.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/60 md:grid-cols-2">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-charcoal p-8 md:p-10"
            >
              <h3 className="font-display text-lg font-semibold text-bone">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
