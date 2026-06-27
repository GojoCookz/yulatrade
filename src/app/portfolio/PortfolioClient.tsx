"use client";

import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus, Download, RefreshCcw } from "lucide-react";

type Tab = "positions" | "history" | "open" | "pnl";

const positions = [
  { market: "Bitcoin tops 200k by close of 2026?", side: "YES", shares: 1250, avgPrice: 32, currentPrice: 34, value: 425, pnl: 25, pnlPct: 6.25 },
  { market: "2026 FIFA World Cup winner?", side: "YES", shares: 800, avgPrice: 8, currentPrice: 12, value: 96, pnl: 32, pnlPct: 50 },
  { market: "Federal Reserve cuts in July?", side: "NO", shares: 500, avgPrice: 44, currentPrice: 39, value: 195, pnl: 25, pnlPct: 12.8 },
  { market: "GPT-5 shipped before September?", side: "YES", shares: 400, avgPrice: 58, currentPrice: 65, value: 260, pnl: 28, pnlPct: 12.07 },
  { market: "Russia x Ukraine ceasefire by May 31, 2026?", side: "NO", shares: 220, avgPrice: 12, currentPrice: 4, value: 8.8, pnl: -17.6, pnlPct: -66.67 },
];

const history = [
  { ts: "2 min ago", action: "Bought", market: "Bitcoin tops 200k", side: "YES", price: 34, shares: 1000, amount: 340 },
  { ts: "1 hr ago", action: "Sold", market: "Trump 2028 election", side: "YES", price: 46, shares: 500, amount: 230 },
  { ts: "3 hr ago", action: "Bought", market: "FIFA World Cup", side: "YES", price: 12, shares: 800, amount: 96 },
  { ts: "5 hr ago", action: "Claimed", market: "Eurovision Winner 2026", side: "YES", price: 100, shares: 200, amount: 200 },
  { ts: "8 hr ago", action: "Sold", market: "Fed cuts July", side: "YES", price: 61, shares: 300, amount: 183 },
];

export default function PortfolioClient() {
  const [tab, setTab] = useState<Tab>("positions");
  const totalValue = positions.reduce((a, p) => a + p.value, 0);
  const totalPnl = positions.reduce((a, p) => a + p.pnl, 0);
  const wins = positions.filter((p) => p.pnl > 0).length;
  const winRate = (wins / positions.length) * 100;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header / wallet summary */}
      <div className="border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-lg font-bold text-white">
              <Wallet className="h-4 w-4 text-emerald-400" />
              Portfolio
            </h1>
            <p className="mt-0.5 text-xs text-white/40">Track positions, P&L, and trade history</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.05]">
              <RefreshCcw className="h-3 w-3" /> Refresh
            </button>
            <button className="flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.05]">
              <Download className="h-3 w-3" /> Export
            </button>
            <button className="flex items-center gap-1 rounded-md bg-green-500/15 px-3 py-1.5 text-xs font-bold text-green-300 hover:bg-green-500/25">
              <Plus className="h-3 w-3" /> Deposit
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Total Value</p>
            <p className="mt-1 text-xl font-bold text-white">${totalValue.toFixed(2)}</p>
            <p className="mt-0.5 text-[10px] text-white/40">across {positions.length} positions</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Total P&L</p>
            <p className={`mt-1 text-xl font-bold ${totalPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
              {totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}
            </p>
            <p className="mt-0.5 text-[10px] text-white/40">all-time</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Win Rate</p>
            <p className="mt-1 text-xl font-bold text-white">{winRate.toFixed(0)}%</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
              <div className="h-full bg-green-400" style={{ width: `${winRate}%` }} />
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">USDC Balance</p>
            <p className="mt-1 text-xl font-bold text-white">$0.00</p>
            <p className="mt-0.5 text-[10px] text-white/40">on Polygon</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/5 px-6">
        <div className="flex items-center gap-6 text-xs">
          {(
            [
              { id: "positions", label: `Positions (${positions.length})` },
              { id: "history", label: "History" },
              { id: "open", label: "Open Orders" },
              { id: "pnl", label: "P&L Chart" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`pb-3 pt-3 transition ${
                tab === t.id ? "border-b-2 border-emerald-500 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {tab === "positions" && (
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[#050505]">
              <tr className="text-[10px] uppercase tracking-wider text-white/35">
                <th className="px-4 py-2 text-left font-medium">Market</th>
                <th className="px-3 py-2 text-left font-medium">Side</th>
                <th className="px-3 py-2 text-right font-medium">Shares</th>
                <th className="px-3 py-2 text-right font-medium">Avg Price</th>
                <th className="px-3 py-2 text-right font-medium">Current</th>
                <th className="px-3 py-2 text-right font-medium">Value</th>
                <th className="px-3 py-2 text-right font-medium">P&L</th>
                <th className="px-3 py-2 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p, i) => (
                <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5 text-white/80">{p.market}</td>
                  <td className={`px-3 py-2.5 font-semibold ${p.side === "YES" ? "text-green-400" : "text-red-400"}`}>{p.side}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-white/70">{p.shares.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-white/70">{p.avgPrice}¢</td>
                  <td className="px-3 py-2.5 text-right font-mono text-white">{p.currentPrice}¢</td>
                  <td className="px-3 py-2.5 text-right font-mono font-semibold text-white">${p.value.toFixed(2)}</td>
                  <td className={`px-3 py-2.5 text-right font-mono font-semibold ${p.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {p.pnl >= 0 ? "+" : ""}${p.pnl.toFixed(2)}
                    <span className="ml-1 text-[10px] opacity-70">({p.pnlPct >= 0 ? "+" : ""}{p.pnlPct.toFixed(1)}%)</span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <button className="rounded-md bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-200 hover:bg-emerald-500/25">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "history" && (
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[#050505]">
              <tr className="text-[10px] uppercase tracking-wider text-white/35">
                <th className="px-4 py-2 text-left font-medium">Time</th>
                <th className="px-3 py-2 text-left font-medium">Action</th>
                <th className="px-3 py-2 text-left font-medium">Market</th>
                <th className="px-3 py-2 text-left font-medium">Side</th>
                <th className="px-3 py-2 text-right font-medium">Price</th>
                <th className="px-3 py-2 text-right font-medium">Shares</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="px-4 py-2 text-white/50">{h.ts}</td>
                  <td className={`px-3 py-2 font-semibold ${
                    h.action === "Bought" ? "text-green-400" : h.action === "Sold" ? "text-red-400" : "text-yellow-400"
                  }`}>{h.action}</td>
                  <td className="px-3 py-2 text-white/80">{h.market}</td>
                  <td className={`px-3 py-2 font-semibold ${h.side === "YES" ? "text-green-400" : "text-red-400"}`}>{h.side}</td>
                  <td className="px-3 py-2 text-right font-mono text-white/80">{h.price}¢</td>
                  <td className="px-3 py-2 text-right font-mono text-white/60">{h.shares.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right font-mono text-white">${h.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "open" && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="rounded-full bg-white/[0.04] p-4">
              <Wallet className="h-6 w-6 text-white/30" />
            </div>
            <p className="mt-3 text-sm text-white/60">No open orders</p>
            <p className="mt-1 text-xs text-white/40">Limit orders you place will appear here</p>
          </div>
        )}

        {tab === "pnl" && (
          <div className="p-6">
            <div className="rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40">All-time P&L</p>
                  <p className="text-2xl font-bold text-green-400">+${totalPnl.toFixed(2)}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  {(["1D", "7D", "30D", "90D", "ALL"] as const).map((t, i) => (
                    <button key={t} className={`rounded-md px-2 py-1 ${i === 2 ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <svg viewBox="0 0 800 220" className="mt-4 h-56 w-full">
                <defs>
                  <linearGradient id="pnlfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  points="0,180 60,170 120,150 180,158 240,140 300,135 360,110 420,118 480,95 540,82 600,90 660,55 720,42 800,30 800,220 0,220"
                  fill="url(#pnlfill)"
                />
                <polyline
                  points="0,180 60,170 120,150 180,158 240,140 300,135 360,110 420,118 480,95 540,82 600,90 660,55 720,42 800,30"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 p-3">
                <p className="text-[10px] text-white/40">Best Day</p>
                <p className="mt-1 text-base font-bold text-green-400 flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" /> +$184.50</p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 p-3">
                <p className="text-[10px] text-white/40">Worst Day</p>
                <p className="mt-1 text-base font-bold text-red-400 flex items-center gap-1"><TrendingDown className="h-3.5 w-3.5" /> -$42.10</p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 p-3">
                <p className="text-[10px] text-white/40">Avg Trade</p>
                <p className="mt-1 text-base font-bold text-white">$87.30</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
