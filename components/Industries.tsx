"use client";

import { motion } from "framer-motion";

const industries = [
  {
    name: "Septic Pumping",
    body: "Emergency backups, routine pump-outs, tank size and access questions handled on the first call.",
    icon: (
      <path d="M12 2 4 7v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-5Z" />
    ),
  },
  {
    name: "Portable Toilet Rental",
    body: "Event quotes, delivery windows, and unit-count questions answered without a callback.",
    icon: <path d="M6 3h12l-1 16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 3ZM6 9h12" />,
  },
  {
    name: "Dumpster / Roll-Off Rental",
    body: "Size guidance, drop-off scheduling, and permit questions — booked straight to your route sheet.",
    icon: <path d="M3 10h18l-2 9H5l-2-9ZM3 10 5 5h14l2 5" />,
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-bronze-light">
            Who we build for
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-bone md:text-4xl">
            Built specifically for these trades — not a generic call center.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="card-border group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-bronze/40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-bronze-light"
              >
                {ind.icon}
              </svg>
              <h3 className="mt-5 font-display text-lg font-semibold text-bone">
                {ind.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{ind.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
