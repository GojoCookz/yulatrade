"use client";

import Link from "next/link";
import { Bell, Share2 } from "lucide-react";

interface Market {
  slug: string;
  title: string;
  cc: string;
  tag: string;
  status: string;
  yesPrice: number;
  noPrice: number;
  delta: string;
  volume: string;
  liquidity: string;
  txs: string;
  traders: string;
  chartTrend: "up" | "down" | "flat";
}

const markets: Market[] = [
  { slug: "russia-ukraine-ceasefire", title: "Russia x Ukraine ceasefire by May 31, 2026?", cc: "ua", tag: "tech", status: "Ended", yesPrice: 96, noPrice: 4, delta: "0.0%", volume: "$128.7M", liquidity: "$10.5M", txs: "0", traders: "0", chartTrend: "up" },
  { slug: "us-iran-peace-deal", title: "US x Iran permanent peace deal by May 31, 2026?", cc: "us", tag: "other", status: "Ended", yesPrice: 73, noPrice: 27, delta: "0.0%", volume: "$87.9M", liquidity: "$1.4M", txs: "0", traders: "0", chartTrend: "down" },
  { slug: "japan-fifa-2026", title: "Will Japan win the 2026 FIFA World Cup?", cc: "jp", tag: "other", status: "Jul 19", yesPrice: 98, noPrice: 2, delta: "0.0%", volume: "$81.3M", liquidity: "$1.9M", txs: "0", traders: "0", chartTrend: "up" },
  { slug: "belgium-fifa-2026", title: "Will Belgium win the 2026 FIFA World Cup?", cc: "be", tag: "other", status: "Jul 19", yesPrice: 98, noPrice: 2, delta: "0.0%", volume: "$75.5M", liquidity: "$5.3M", txs: "0", traders: "0", chartTrend: "up" },
  { slug: "argentina-fifa-2026", title: "Will Argentina win the 2026 FIFA World Cup?", cc: "ar", tag: "other", status: "Jul 19", yesPrice: 91, noPrice: 9, delta: "0.0%", volume: "$74.2M", liquidity: "$8.3M", txs: "0", traders: "0", chartTrend: "flat" },
  { slug: "france-fifa-2026", title: "Will France win the 2026 FIFA World Cup?", cc: "fr", tag: "other", status: "Jul 19", yesPrice: 84, noPrice: 16, delta: "0.0%", volume: "$73.1M", liquidity: "$8.1M", txs: "0", traders: "0", chartTrend: "down" },
  { slug: "colombia-fifa-2026", title: "Will Colombia win the 2026 FIFA World Cup?", cc: "co", tag: "other", status: "Jul 19", yesPrice: 98, noPrice: 2, delta: "0.0%", volume: "$72.8M", liquidity: "$2.9M", txs: "0", traders: "0", chartTrend: "up" },
  { slug: "norway-fifa-2026", title: "Will Norway win the 2026 FIFA World Cup?", cc: "no", tag: "other", status: "Jul 19", yesPrice: 98, noPrice: 2, delta: "0.0%", volume: "$71.1M", liquidity: "$1.8M", txs: "0", traders: "0", chartTrend: "up" },
  { slug: "portugal-fifa-2026", title: "Will Portugal win the 2026 FIFA World Cup?", cc: "pt", tag: "other", status: "Jul 19", yesPrice: 92, noPrice: 8, delta: "0.0%", volume: "$69.3M", liquidity: "$4.4M", txs: "0", traders: "0", chartTrend: "flat" },
  { slug: "england-fifa-2026", title: "Will England win the 2026 FIFA World Cup?", cc: "gb", tag: "other", status: "Jul 19", yesPrice: 85, noPrice: 15, delta: "0.0%", volume: "$68.5M", liquidity: "$6.2M", txs: "0", traders: "0", chartTrend: "down" },
];

function Sparkline({ trend, id }: { trend: "up" | "down" | "flat"; id: string }) {
  const points =
    trend === "up"
      ? "0,18 10,15 20,16 30,12 40,13 50,8 60,9 70,5 80,6"
      : trend === "down"
      ? "0,5 10,7 20,6 30,10 40,9 50,13 60,12 70,16 80,17"
      : "0,11 10,10 20,12 30,9 40,11 50,10 60,12 70,9 80,11";
  const stroke = trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : "#34d399";
  const fillId = `term-spark-${id}`;
  return (
    <svg width="84" height="24" viewBox="0 0 80 22" className="inline-block">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`${points} 80,22 0,22`} fill={`url(#${fillId})`} stroke="none" />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TAG_COLORS: Record<string, { dot: string; text: string }> = {
  tech: { dot: "bg-teal-400", text: "text-teal-400" },
  other: { dot: "bg-blue-400", text: "text-blue-400" },
  sports: { dot: "bg-red-400", text: "text-red-400" },
  crypto: { dot: "bg-orange-400", text: "text-orange-400" },
  politics: { dot: "bg-blue-400", text: "text-blue-400" },
  culture: { dot: "bg-pink-400", text: "text-pink-400" },
  finance: { dot: "bg-emerald-400", text: "text-emerald-400" },
};

function FlagThumb({ cc }: { cc: string }) {
  return (
    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w80/${cc}.png`}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function MarketTable() {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 z-10 bg-[#050505]">
          <tr className="text-[11px] uppercase tracking-wider text-white/35">
            <th className="px-4 py-3 text-left font-medium">Market</th>
            <th className="px-3 py-3 text-center font-medium">Chart</th>
            <th className="px-3 py-3 text-center font-medium">Price</th>
            <th className="px-3 py-3 text-center font-medium">Δ</th>
            <th className="px-3 py-3 text-right font-medium">
              <span className="inline-flex items-center gap-1">
                Vol <span className="text-emerald-400">▾</span>
              </span>
            </th>
            <th className="px-3 py-3 text-right font-medium">Liq</th>
            <th className="px-3 py-3 text-center font-medium">B/S TXS</th>
            <th className="px-3 py-3 text-center font-medium">Traders</th>
            <th className="px-4 py-3 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => (
            <tr
              key={m.slug}
              className="group border-t border-white/[0.04] transition-colors hover:bg-white/[0.02]"
            >
              {/* MARKET */}
              <td className="px-4 py-3">
                <Link href={`/trade/${m.slug}`} className="flex items-center gap-3">
                  <FlagThumb cc={m.cc} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-white group-hover:text-white">
                      {m.title}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px]">
                      {(() => {
                        const c = TAG_COLORS[m.tag] ?? { dot: "bg-blue-400", text: "text-blue-400" };
                        return (
                          <span className={`flex items-center gap-1 ${c.text}`}>
                            <span className={`h-1 w-1 rounded-full ${c.dot}`} />
                            {m.tag}
                          </span>
                        );
                      })()}
                      <span className="text-white/30">·</span>
                      <span className={m.status === "Ended" ? "text-red-400/80" : "text-white/40"}>
                        {m.status === "Ended" ? "● Ended" : `→ ${m.status}`}
                      </span>
                    </div>
                  </div>
                </Link>
              </td>

              {/* CHART */}
              <td className="px-3 py-3 text-center">
                <Sparkline trend={m.chartTrend} id={m.slug} />
              </td>

              {/* PRICE */}
              <td className="px-3 py-3 text-center whitespace-nowrap">
                <span className="font-medium text-green-400">{m.yesPrice}¢</span>
                <span className="mx-1 text-white/20">/</span>
                <span className="font-medium text-red-400">{m.noPrice}¢</span>
              </td>

              {/* DELTA */}
              <td className="px-3 py-3 text-center text-xs text-white/30">{m.delta}</td>

              {/* VOL */}
              <td className="px-3 py-3 text-right font-medium text-white">{m.volume}</td>

              {/* LIQ */}
              <td className="px-3 py-3 text-right text-white/60">{m.liquidity}</td>

              {/* B/S TXS */}
              <td className="px-3 py-3 text-center text-white/30">{m.txs}</td>

              {/* TRADERS */}
              <td className="px-3 py-3 text-center text-white/30">{m.traders}</td>

              {/* ACTION */}
              <td className="px-3 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button className="text-white/30 hover:text-white/70 transition" aria-label="Notify">
                    <Bell className="h-3.5 w-3.5" />
                  </button>
                  <button className="text-white/30 hover:text-white/70 transition" aria-label="Share">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                  <Link
                    href={`/trade/${m.slug}`}
                    className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500 transition"
                  >
                    Trade →
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
