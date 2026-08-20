"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    monthly: 297,
    setup: 150,
    recommended: true,
    features: [
      "1 phone number, trained on your business + one trade",
      "Up to 150 answered calls/month",
      "Booking synced to your calendar or Google Sheet",
      "Text confirmation to you after every booking",
      "Answers 24/7, including after-hours & emergencies",
    ],
    cta: "Book a Live Demo",
  },
  {
    name: "Growth",
    monthly: 497,
    setup: 250,
    recommended: false,
    features: [
      "Everything in Starter",
      "Up to 500 calls/month",
      "Multi-service routing (e.g. septic + porta-potty)",
      "Direct CRM / scheduling tool integration",
      "Monthly call summary — recovery & booking rate",
    ],
    cta: "Book a Live Demo",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-bronze-light">
            Pricing
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-bone md:text-4xl">
            Straightforward pricing. No hidden call fees.
          </h2>
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className={`text-sm ${!annual ? "text-bone" : "text-dim"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            aria-pressed={annual}
            aria-label="Toggle annual billing"
            className="relative h-7 w-14 rounded-full border border-line bg-graphite transition-colors"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-0.5 h-5 w-5 rounded-full bg-bronze-gradient"
              style={{ left: annual ? "calc(100% - 24px)" : "4px" }}
            />
          </button>
          <span className={`text-sm ${annual ? "text-bone" : "text-dim"}`}>
            Annual <span className="text-bronze-light">— 2 months free</span>
          </span>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((t, i) => {
            const price = annual ? Math.round(t.monthly * 0.8333) : t.monthly;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className={`relative rounded-2xl p-8 ${
                  t.recommended
                    ? "border-2 border-bronze/50 bg-gradient-to-b from-bronze/[0.07] to-transparent shadow-[0_20px_60px_-15px_rgba(201,160,106,0.25)]"
                    : "card-border"
                }`}
              >
                {t.recommended && (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-bronze-gradient px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-black">
                    Most businesses start here
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-bone">
                  {t.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-bone">
                    ${price}
                  </span>
                  <span className="text-sm text-dim">/mo</span>
                </div>
                <p className="mt-1 text-xs text-dim">
                  {annual
                    ? `Billed as $${(price * 12).toLocaleString()}/year`
                    : `+ $${t.setup} one-time setup`}
                </p>
                <ul className="mt-6 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-dim">
                      <span className="mt-0.5 text-bronze-light">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#demo"
                  className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-300 hover:scale-[1.02] ${
                    t.recommended
                      ? "bg-bronze-gradient text-black"
                      : "border border-line text-bone hover:border-bronze/40"
                  }`}
                >
                  {t.cta}
                </a>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="card-border flex flex-col justify-between rounded-2xl p-8"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-bone">
                Fleet / Multi-location
              </h3>
              <p className="mt-4 font-display text-2xl font-bold text-bone">
                Custom
              </p>
              <p className="mt-1 text-xs text-dim">Priced per conversation, after a scoping call</p>
              <ul className="mt-6 space-y-3">
                {[
                  "Multiple trucks, locations, or lines",
                  "Dedicated onboarding call",
                  "Custom call logic per location",
                ].map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-dim">
                    <span className="mt-0.5 text-bronze-light">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#demo"
              className="mt-8 block rounded-full border border-line px-6 py-3 text-center text-sm font-semibold text-bone transition-all duration-300 hover:scale-[1.02] hover:border-bronze/40"
            >
              Talk to Us
            </a>
          </motion.div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-dim">
          Calls beyond your plan&apos;s limit are billed at $0.60/call, added to
          your monthly invoice — no surprise overage penalties, just the exact
          usage above your cap.
        </p>
      </div>
    </section>
  );
}
