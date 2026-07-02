"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Filter as FilterIcon, ExternalLink } from "lucide-react";

type Side = "Buy" | "Sell";
type Outcome = "Yes" | "No";
interface WhaleTrade {
  ageSec: number;
  wallet: string;
  side: Side;
  outcome: Outcome;
  market: string;
  category: "politics" | "crypto" | "sports" | "finance" | "tech" | "culture";
  price: number;
  shares: number;
  usdc: number;
}

// No fabricated whale activity — the feed and leaderboard start empty.
const INITIAL_TRADES: WhaleTrade[] = [];

const TOP_WHALES: {
  rank: number;
  wallet: string;
  vol30d: string;
  winRate: number;
  trades: number;
  pnl: string;
  pnlPos: boolean;
}[] = [];

const CATEGORY_TINT: Record<WhaleTrade["category"], string> = {
  politics: "text-blue-400",
  crypto: "text-orange-400",
  sports: "text-red-400",
  finance: "text-emerald-400",
  tech: "text-teal-400",
  culture: "text-pink-400",
};

function formatAge(secs: number) {
  if (secs < 60) return `${secs}s`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  return `${Math.floor(secs / 3600)}h`;
}

function categorySlug(market: string): WhaleTrade["category"] {
  if (/bitcoin|ethereum|solana|btc|eth|sol|crypto/i.test(market)) return "crypto";
  if (/election|trump|ceasefire|nuclear|iran|ukraine|fed|presidential/i.test(market)) return "politics";
  if (/world cup|nba|nfl|fifa|playoff|champion/i.test(market)) return "sports";
  if (/gpt|ai|tech|gpu/i.test(market)) return "tech";
  if (/oscar|grammy|movie/i.test(market)) return "culture";
  return "finance";
}

export default function WhalesClient() {
  const [trades, setTrades] = useState<WhaleTrade[]>(INITIAL_TRADES);
  const [minSize, setMinSize] = useState<number>(500);
  const [timeRange, setTimeRange] = useState<"1H" | "6H" | "24H" | "7D">("24H");
  const [category, setCategory] = useState<"all" | WhaleTrade["category"]>("all");

  // age ticker
  useEffect(() => {
    const id = setInterval(() => {
      setTrades((ts) => ts.map((t) => ({ ...t, ageSec: t.ageSec + 1 })));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const filtered = trades.filter((t) => {
    if (t.usdc < minSize) return false;
    if (category !== "all" && t.category !== category) return false;
    return true;
  });

  const total24h = trades.reduce((a, t) => a + t.usdc, 0);
  const biggest = trades.reduce((a, t) => (t.usdc > a ? t.usdc : a), 0);
  const activeWhales = new Set(trades.map((t) => t.wallet)).size;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
      {/* Left feed */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="px-4 pt-3 lg:px-5">
          <h1 className="flex items-center gap-2 text-lg font-bold text-white">
            <span aria-hidden>🐋</span> Whale Tracker
          </h1>

          {/* Stats strip */}
          <div className="mt-3 flex items-center gap-8 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-white/35">24h Volume</p>
              <p className="mt-0.5 text-sm font-bold text-white">${(total24h / 1e6 >= 0.01 ? (total24h / 1e6).toFixed(2) + "M" : total24h.toFixed(2))}</p>
            </div>
            <div className="h-7 w-px bg-white/[0.06]" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-white/35">Top Market</p>
              <p className="mt-0.5 text-sm font-bold text-white/60">—</p>
            </div>
            <div className="h-7 w-px bg-white/[0.06]" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-white/35">Biggest</p>
              <p className="mt-0.5 text-sm font-bold text-emerald-300">${biggest >= 1000 ? `${(biggest / 1000).toFixed(1)}K` : biggest.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 lg:px-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-white/40">
              <FilterIcon className="h-3 w-3" />
              Min:
            </span>
            {[500, 1000, 5000, 10000].map((v) => (
              <button
                key={v}
                onClick={() => setMinSize(v)}
                className={`rounded-full px-2.5 py-1 font-semibold transition ${
                  minSize === v ? "bg-emerald-500 text-white" : "text-white/45 hover:text-white"
                }`}
              >
                {v >= 1000 ? `$${v / 1000}.0K` : `$${v}.00`}
              </button>
            ))}
            <span className="mx-1 text-white/15">|</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-white/70 outline-none hover:bg-white/[0.05]"
            >
              <option value="all">All categories</option>
              <option value="politics">Politics</option>
              <option value="crypto">Crypto</option>
              <option value="sports">Sports</option>
              <option value="finance">Finance</option>
              <option value="tech">Tech</option>
              <option value="culture">Culture</option>
            </select>
            <span className="mx-1 text-white/15">|</span>
            {(["1H", "6H", "24H", "7D"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`rounded-full px-2.5 py-1 font-semibold transition ${
                  timeRange === r ? "bg-emerald-500 text-white" : "text-white/45 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[#050505]">
              <tr className="text-[10px] uppercase tracking-wider text-white/35">
                <th className="px-3 py-2 text-left font-medium">Age ↓</th>
                <th className="px-3 py-2 text-left font-medium">Wallet</th>
                <th className="px-3 py-2 text-left font-medium">Side</th>
                <th className="px-3 py-2 text-left font-medium">Outcome</th>
                <th className="px-3 py-2 text-left font-medium">Market</th>
                <th className="px-3 py-2 text-right font-medium">Price</th>
                <th className="px-3 py-2 text-right font-medium">Shares</th>
                <th className="px-3 py-2 text-right font-medium">USDC</th>
                <th className="px-3 py-2 text-center font-medium">TX</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                      <div className="rounded-full bg-white/[0.04] p-4">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse block" />
                      </div>
                      <p className="mt-3 text-sm text-white/60">No whale trades found</p>
                      <p className="mt-1 text-xs text-white/40">Try adjusting filters or check back later</p>
                    </div>
                  </td>
                </tr>
              )}
              {filtered.map((t, i) => (
                <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="px-3 py-2 text-white/50">{formatAge(t.ageSec)}</td>
                  <td className="px-3 py-2 font-mono text-emerald-300">{t.wallet}</td>
                  <td className={`px-3 py-2 font-semibold ${t.side === "Buy" ? "text-green-400" : "text-red-400"}`}>{t.side}</td>
                  <td className={`px-3 py-2 font-semibold ${t.outcome === "Yes" ? "text-green-400" : "text-red-400"}`}>{t.outcome}</td>
                  <td className="px-3 py-2 text-white/80 max-w-[320px]">
                    <Link href={`/trade/${t.market.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "")}`} className="hover:text-emerald-300 transition truncate block">
                      {t.market}
                    </Link>
                    <span className={`text-[10px] ${CATEGORY_TINT[t.category]}`}>● {t.category}</span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-white/80">{(t.price * 100).toFixed(1)}¢</td>
                  <td className="px-3 py-2 text-right font-mono text-white/60">{t.shares.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right font-mono font-semibold text-white">${(t.usdc).toLocaleString()}</td>
                  <td className="px-3 py-2 text-center">
                    <button className="text-white/40 hover:text-emerald-300 transition">
                      <ExternalLink className="h-3.5 w-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right leaderboard */}
      <aside className="w-full shrink-0 border-t border-white/5 bg-[#050505] overflow-auto lg:w-[340px] lg:border-l lg:border-t-0">
        <div className="border-b border-white/5 px-4 py-3">
          <h2 className="text-sm font-bold text-white">Top Whales · 30D</h2>
          <p className="mt-0.5 text-[10px] text-white/40">Ranked by trading volume</p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {TOP_WHALES.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-xs text-white/50">No ranked whales yet</p>
              <p className="mt-1 text-[10px] text-white/30">The 30-day leaderboard populates as wallets trade.</p>
            </div>
          )}
          {TOP_WHALES.map((w) => (
            <div key={w.rank} className="px-4 py-2.5 hover:bg-white/[0.02] transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                    w.rank === 1 ? "bg-yellow-500/20 text-yellow-300" :
                    w.rank === 2 ? "bg-zinc-300/20 text-zinc-200" :
                    w.rank === 3 ? "bg-orange-500/20 text-orange-300" :
                    "bg-white/[0.05] text-white/50"
                  }`}>{w.rank}</span>
                  <span className="font-mono text-xs text-emerald-300">{w.wallet}</span>
                </div>
                <span className={`text-xs font-semibold ${w.pnlPos ? "text-green-400" : "text-red-400"}`}>{w.pnl}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-white/50">
                <span>Vol <span className="text-white/80">{w.vol30d}</span></span>
                <span>·</span>
                <span>Win <span className={w.winRate >= 65 ? "text-green-400" : "text-white/80"}>{w.winRate}%</span></span>
                <span>·</span>
                <span>{w.trades} trades</span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                <div className={`h-full ${w.winRate >= 65 ? "bg-green-400" : "bg-emerald-400"}`} style={{ width: `${w.winRate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
