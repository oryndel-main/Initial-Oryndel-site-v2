"use client";

import { motion } from "framer-motion";

const steps = [
  {
    tag: "01 — The call comes in",
    title: "Oryndel picks up in one ring",
    body: "Your existing number, forwarded — no new number to hand out. Oryndel answers using your business name, your tone, and knows your service area and pricing.",
  },
  {
    tag: "02 — It handles the real conversation",
    title: "Not a menu. A conversation.",
    body: "It asks the right follow-up questions for your trade — tank size, access issues, how many units, delivery window — the same way your best dispatcher would.",
  },
  {
    tag: "03 — The job gets booked",
    title: "Straight onto your calendar",
    body: "No message to call back. The slot is booked, the customer gets a text confirmation, and you get a heads-up before your next coffee.",
  },
];

export default function Proof() {
  return (
    <section id="how-it-works" className="relative border-t border-line/60 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-bronze-light">
            How it works
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-bone md:text-4xl">
            This is what actually happens on the call.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group card-border relative rounded-2xl p-8 transition-colors duration-300 hover:border-bronze/40"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-dim">
                {s.tag}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold text-bone">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
