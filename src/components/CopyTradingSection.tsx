"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const trades = [
  {
    wallet: "0xf3a2...8b70",
    winRate: "73%",
    description: "Bought YES on 'Will BTC hit $200k by 2026?'",
    amount: "$2,400",
  },
  {
    wallet: "0x91cb...d4e1",
    winRate: "81%",
    description: "Sold NO on 'US recession in 2026'",
    amount: "$1,800",
  },
  {
    wallet: "0xa7e5...c902",
    winRate: "68%",
    description: "Bought YES on 'Fed rate cut July 2026'",
    amount: "$950",
  },
];

export default function CopyTradingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-4 py-24 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-5xl transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
          Copy Trading
        </span>
        <h2 className="mb-12 text-3xl font-bold sm:text-4xl">Follow the wallets that win</h2>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Trade cards */}
          <div className="flex flex-col gap-4">
            {trades.map((trade, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-[#0d1410] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-sm text-white/70">{trade.wallet}</span>
                  <span className="text-xs text-green-400">{trade.winRate} win rate</span>
                </div>
                <p className="mb-2 text-sm text-white/60">{trade.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{trade.amount}</span>
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <Check className="h-3 w-3" />
                    Copied
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center">
            <p className="mb-6 text-white/60 leading-relaxed">
              Find the traders with the best track records and automatically mirror their
              positions. No manual work — just set your limits and let the system handle
              execution.
            </p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                Follow any wallet on Polymarket
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                Set position limits per trade
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                Copies execute in under 50ms
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                Full PnL tracking
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
