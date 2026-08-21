"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOtherCountry, setShowOtherCountry] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      business: form.get("business"),
      trade: form.get("trade"),
      phone: form.get("phone"),
      // Honeypot: real visitors never see or fill this field (see CSS
      // below). If it's non-empty, the request came from a bot.
      website: form.get("website"),
    };

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="demo" className="relative overflow-hidden border-t border-line/60 py-28 md:py-36">
      <div className="grain" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[500px] -translate-y-1/2 bg-radial-glow" />
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-mono text-xs uppercase tracking-widest text-bronze-light"
        >
          Ready when you are
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl font-bold tracking-tight text-bone md:text-5xl"
        >
          Hear it handle your business before you spend a dollar.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-lg text-dim"
        >
          Tell us a bit about your business. We&apos;ll build a real working
          agent for it and call you back with a number to try yourself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-border mx-auto mt-10 max-w-lg rounded-2xl p-8 text-left"
        >
          {submitted ? (
            <div className="py-6 text-center">
              <p className="font-display text-xl font-semibold text-bone">
                Got it — we&apos;re on it.
              </p>
              <p className="mt-2 text-sm text-dim">
                We&apos;ll reach out within one business day to start building
                your demo agent.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field — hidden from real users via CSS (not
                  display:none, which some bots skip), always empty for
                  humans, visually and from tab order absent for everyone
                  else. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {error && (
                <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                  {error}
                </p>
              )}

              <div>
                <label htmlFor="business" className="mb-1.5 block text-xs font-medium text-dim">
                  Business name
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  required
                  placeholder="e.g. Apex Septic & Sanitation"
                  className="w-full rounded-lg border border-line bg-black/40 px-4 py-3 text-sm text-bone placeholder:text-dim/60 focus:border-bronze/50"
                />
              </div>
              <div>
                <label htmlFor="trade" className="mb-1.5 block text-xs font-medium text-dim">
                  What do you do?
                </label>
                <select
                  id="trade"
                  name="trade"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-line bg-black/40 px-4 py-3 text-sm text-bone focus:border-bronze/50"
                >
                  <option value="" disabled>
                    Select your trade
                  </option>
                  <option value="septic">Septic pumping</option>
                  <option value="porta-potty">Portable toilet rental</option>
                  <option value="dumpster">Dumpster / roll-off rental</option>
                  <option value="multiple">More than one</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-dim">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(555) 555-0123"
                  className="w-full rounded-lg border border-line bg-black/40 px-4 py-3 text-sm text-bone placeholder:text-dim/60 focus:border-bronze/50"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-full bg-bronze-gradient px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? "Sending…" : "Book My Live Demo"}
              </button>
              <p className="text-center text-xs text-dim">
                No card required. We build first, you decide after.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
