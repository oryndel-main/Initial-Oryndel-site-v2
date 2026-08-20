"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "62%",
    label: "of calls to trade businesses go unanswered during work hours",
  },
  {
    value: "$400+",
    label: "average job value lost every time a caller hangs up and dials a competitor",
  },
  {
    value: "24/7",
    label: "when emergencies actually happen — nights, weekends, holidays",
  },
];

export default function Problem() {
  return (
    <section className="relative border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-bone md:text-4xl">
            You&apos;re not losing customers to competitors.
            <br className="hidden md:block" /> You&apos;re losing them to voicemail.
          </h2>
          <p className="mt-4 text-lg text-dim">
            You&apos;re on a job. Your hands are full, or your phone&apos;s in the
            truck. The call rings out, they hang up, and they call the next
            name on the search page. That&apos;s not a lead you lost — it&apos;s
            revenue that already had your name on it.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card-border rounded-2xl p-8"
            >
              <p className="bronze-text font-display text-4xl font-extrabold tracking-tight">
                {s.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dim">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
