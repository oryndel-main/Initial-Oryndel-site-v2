"use client";

import { motion } from "framer-motion";

const lines = [
  { who: "caller", text: "Hey, my tank's backing up into the yard, can someone come today?" },
  { who: "agent", text: "Sorry to hear that — I can get someone out today. What's the property address?" },
  { who: "caller", text: "412 Birchwood Rd." },
  { who: "agent", text: "Got it. I've got a 2–4pm window open. I'll text you a confirmation now." },
];

export default function DispatchTicket() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-bronze-gradient opacity-[0.08] blur-2xl" />
      <div className="ticket-edge rounded-b-2xl rounded-t-sm border border-line bg-charcoal p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="mb-5 flex items-center justify-between border-b border-dashed border-line pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              Service Ticket
            </p>
            <p className="font-mono text-sm text-bone">#OR-4471</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-bronze" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bronze-light">
              Live call
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: l.who === "caller" ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.35, duration: 0.5 }}
              className={`flex ${l.who === "agent" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 font-mono text-[13px] leading-snug ${
                  l.who === "agent"
                    ? "bg-bronze/10 text-bronze-light"
                    : "bg-graphite text-dim"
                }`}
              >
                {l.text}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="mt-5 flex items-center justify-between rounded-lg border border-bronze/30 bg-bronze/5 px-3 py-2.5"
        >
          <span className="font-mono text-[11px] uppercase tracking-wide text-bronze-light">
            Booked · 2:00–4:00 PM
          </span>
          <span className="font-mono text-[11px] text-dim">Synced to calendar ✓</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
