"use client";

import { useEffect, useRef, useState } from "react";
import { Flame, Coins, RefreshCcw, TrendingUp, Lock, Percent } from "lucide-react";

const flywheel = [
  {
    icon: Percent,
    title: "Platform fees",
    body: "Every trade on the terminal, Telegram bot, and copy engine generates protocol fees.",
  },
  {
    icon: RefreshCcw,
    title: "Buybacks",
    body: "A share of fee revenue market-buys $YULA on Solana on a recurring schedule.",
  },
  {
    icon: Flame,
    title: "Burns",
    body: "Bought-back tokens are burned, permanently reducing circulating supply.",
  },
  {
    icon: TrendingUp,
    title: "Value accrual",
    body: "More volume means more fees, more buybacks, and a tighter supply for holders.",
  },
];

const perks = [
  { icon: Coins, label: "Fee rebates", body: "Hold $YULA to reduce trading fees across the platform." },
  { icon: Lock, label: "Staking tiers", body: "Stake to unlock pro analytics, whale alerts, and priority execution." },
  { icon: Percent, label: "Revenue share", body: "Stakers earn a portion of protocol revenue, paid in USDC." },
];

export default function TokenSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-5xl transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M5.1 15.9a.7.7 0 0 1 .5-.2h15.7c.3 0 .5.4.3.6l-3.1 3.5a.7.7 0 0 1-.5.2H2.3c-.3 0-.5-.4-.3-.6l3.1-3.5zM5.1 4.2a.7.7 0 0 1 .5-.2h15.7c.3 0 .5.4.3.6l-3.1 3.5a.7.7 0 0 1-.5.2H2.3c-.3 0-.5-.4-.3-.6l3.1-3.5zM18.9 10a.7.7 0 0 0-.5-.2H2.7c-.3 0-.5.4-.3.6l3.1 3.5c.1.1.3.2.5.2h15.7c.3 0 .5-.4.3-.6L18.9 10z" />
            </svg>
            $YULA on Solana
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            The token that earns when the terminal trades
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            $YULA is the native token of the platform, launched on Solana. Protocol fees flow
            directly back to the token — not to a treasury black hole.
          </p>
        </div>

        {/* Flywheel */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flywheel.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-5 transition hover:border-emerald-500/30"
              >
                <span className="absolute right-4 top-4 text-xs font-mono text-white/20">
                  0{i + 1}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">{step.body}</p>
                {i < flywheel.length - 1 && (
                  <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-emerald-500/40 lg:block">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Fee split bar */}
        <div className="mt-10 rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white">Where every fee goes</h3>
            <span className="text-[11px] text-white/40">illustrative split — final tokenomics at TGE</span>
          </div>
          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full">
            <div className="w-[50%] bg-emerald-500" title="Buyback & burn" />
            <div className="w-[30%] bg-emerald-800" title="Staker revenue share" />
            <div className="w-[20%] bg-white/15" title="Operations" />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">
            <span className="flex items-center gap-1.5 text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> 50% buyback &amp; burn
            </span>
            <span className="flex items-center gap-1.5 text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-800" /> 30% staker revenue share
            </span>
            <span className="flex items-center gap-1.5 text-white/70">
              <span className="h-2 w-2 rounded-full bg-white/15" /> 20% operations
            </span>
          </div>
        </div>

        {/* Holder perks */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.label}
                className="rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-5"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">{perk.label}</h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">{perk.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
