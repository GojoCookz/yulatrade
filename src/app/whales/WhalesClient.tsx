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

const INITIAL_TRADES: WhaleTrade[] = [
  { ageSec: 4, wallet: "0x7a63...b4ef", side: "Buy", outcome: "Yes", market: "2028 US presidential winner?", category: "politics", price: 0.46, shares: 195652, usdc: 90000 },
  { ageSec: 12, wallet: "0xe299...34dd", side: "Sell", outcome: "No", market: "Bitcoin tops 200k by close of 2026?", category: "crypto", price: 0.66, shares: 113636, usdc: 75000 },
  { ageSec: 33, wallet: "0x2940...5ab3", side: "Buy", outcome: "Yes", market: "2026 FIFA World Cup winner?", category: "sports", price: 0.12, shares: 416666, usdc: 50000 },
  { ageSec: 58, wallet: "0xabc1...2def", side: "Buy", outcome: "Yes", market: "Federal Reserve cuts in July?", category: "finance", price: 0.61, shares: 213114, usdc: 130000 },
  { ageSec: 124, wallet: "0x4f10...991e", side: "Sell", outcome: "Yes", market: "GPT-5 shipped before September?", category: "tech", price: 0.65, shares: 76923, usdc: 50000 },
  { ageSec: 188, wallet: "0xdf02...112c", side: "Buy", outcome: "No", market: "Best Picture at 2026 Oscars?", category: "culture", price: 0.18, shares: 277777, usdc: 50000 },
  { ageSec: 240, wallet: "0x7a63...b4ef", side: "Buy", outcome: "Yes", market: "Solana hits 300 in April?", category: "crypto", price: 0.31, shares: 161290, usdc: 50000 },
  { ageSec: 312, wallet: "0x9012...88ab", side: "Sell", outcome: "Yes", market: "Russia x Ukraine ceasefire by May 31, 2026?", category: "politics", price: 0.96, shares: 31250, usdc: 30000 },
  { ageSec: 401, wallet: "0xbf21...cc81", side: "Buy", outcome: "Yes", market: "NBA Playoffs: Eastern Conference champion?", category: "sports", price: 0.18, shares: 555555, usdc: 100000 },
  { ageSec: 489, wallet: "0xa221...f0b7", side: "Buy", outcome: "Yes", market: "Will Bitcoin hit 150k in 2026?", category: "crypto", price: 0.44, shares: 90909, usdc: 40000 },
  { ageSec: 590, wallet: "0x331a...e451", side: "Sell", outcome: "No", market: "Iran-US nuclear deal signed by year end?", category: "politics", price: 0.82, shares: 60975, usdc: 50000 },
  { ageSec: 680, wallet: "0xe299...34dd", side: "Buy", outcome: "Yes", market: "Ethereum tops 5k in April?", category: "crypto", price: 0.22, shares: 227272, usdc: 50000 },
];

const TOP_WHALES = [
  { rank: 1, wallet: "0x7a63...b4ef", vol30d: "$12.4M", winRate: 78, trades: 892, pnl: "+$1.84M", pnlPos: true },
  { rank: 2, wallet: "0xe299...34dd", vol30d: "$8.7M", winRate: 71, trades: 534, pnl: "+$1.12M", pnlPos: true },
  { rank: 3, wallet: "0xabc1...2def", vol30d: "$7.9M", winRate: 69, trades: 388, pnl: "+$894K", pnlPos: true },
  { rank: 4, wallet: "0x2940...5ab3", vol30d: "$6.2M", winRate: 65, trades: 412, pnl: "+$510K", pnlPos: true },
  { rank: 5, wallet: "0x4f10...991e", vol30d: "$5.1M", winRate: 73, trades: 215, pnl: "+$420K", pnlPos: true },
  { rank: 6, wallet: "0xdf02...112c", vol30d: "$4.4M", winRate: 60, trades: 305, pnl: "+$310K", pnlPos: true },
  { rank: 7, wallet: "0xbf21...cc81", vol30d: "$3.9M", winRate: 57, trades: 178, pnl: "-$56K", pnlPos: false },
  { rank: 8, wallet: "0xa221...f0b7", vol30d: "$3.6M", winRate: 62, trades: 244, pnl: "+$198K", pnlPos: true },
  { rank: 9, wallet: "0x331a...e451", vol30d: "$3.2M", winRate: 58, trades: 192, pnl: "+$120K", pnlPos: true },
  { rank: 10, wallet: "0x9012...88ab", vol30d: "$2.8M", winRate: 54, trades: 165, pnl: "-$90K", pnlPos: false },
];

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
  const [minSize, setMinSize] = useState<number>(10000);
  const [timeRange, setTimeRange] = useState<"1h" | "24h" | "7d" | "30d">("24h");
  const [category, setCategory] = useState<"all" | WhaleTrade["category"]>("all");

  // age ticker
  useEffect(() => {
    const id = setInterval(() => {
      setTrades((ts) => ts.map((t) => ({ ...t, ageSec: t.ageSec + 1 })));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // periodically insert a fresh whale trade at the top
  useEffect(() => {
    const samples: Omit<WhaleTrade, "ageSec">[] = [
      { wallet: "0x4d11...77f2", side: "Buy", outcome: "Yes", market: "What price will Bitcoin hit in April?", category: "crypto", price: 0.49, shares: 81632, usdc: 40000 },
      { wallet: "0x8821...9c34", side: "Sell", outcome: "Yes", market: "UEFA Champions League final winner?", category: "sports", price: 0.41, shares: 60975, usdc: 25000 },
      { wallet: "0xa991...bb04", side: "Buy", outcome: "No", market: "Federal Reserve cuts in July?", category: "finance", price: 0.39, shares: 153846, usdc: 60000 },
      { wallet: "0x2c01...51ef", side: "Buy", outcome: "Yes", market: "Democratic nominee 2028?", category: "politics", price: 0.27, shares: 185185, usdc: 50000 },
    ];
    const id = setInterval(() => {
      const s = samples[Math.floor(Math.random() * samples.length)];
      setTrades((ts) => [{ ...s, ageSec: 0 }, ...ts].slice(0, 60));
    }, 6000);
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
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-lg font-bold text-white">Whales</h1>
            <span className="flex items-center gap-1 text-[11px] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
            <span className="text-xs text-white/40">{filtered.length} trades · ${(total24h / 1e6).toFixed(2)}M total · {activeWhales} active whales · biggest ${(biggest / 1000).toFixed(1)}K</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-white/40">Min size:</span>
            {[1000, 10000, 50000, 100000].map((v) => (
              <button
                key={v}
                onClick={() => setMinSize(v)}
                className={`rounded-md px-2.5 py-1 font-medium transition ${
                  minSize === v ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40" : "text-white/50 hover:text-white"
                }`}
              >
                ${v >= 1000 ? `${v / 1000}K` : v}+
              </button>
            ))}
            <span className="mx-1 text-white/15">|</span>
            {(["1h", "24h", "7d", "30d"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`rounded-md px-2 py-1 font-medium transition ${
                  timeRange === r ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {r}
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
            <button className="ml-1 flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-white/60 hover:bg-white/[0.05]">
              <FilterIcon className="h-3 w-3" />
              Filter
            </button>
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
