"use client";

import { useState } from "react";
import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";

const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D", "1W", "1M"] as const;
const bottomTabs = ["Trades", "Orderbook", "Positions", "Holders", "Top Traders", "Related Markets", "News"] as const;
const amountPresets = [10, 50, 100, 1000] as const;
const amountAdds = [1, 5, 10, 100] as const;

interface MockTrade {
  age: string;
  side: "Buy" | "Sell";
  outcome: "Yes" | "No";
  price: string;
  shares: string;
  usdc: string;
  trader: string;
}

const mockTrades: MockTrade[] = [
  { age: "2s", side: "Buy", outcome: "Yes", price: "4.0c", shares: "250", usdc: "$10.00", trader: "0x1a2b...3c4d" },
  { age: "5s", side: "Sell", outcome: "No", price: "96.1c", shares: "52", usdc: "$49.97", trader: "0x5e6f...7g8h" },
  { age: "12s", side: "Buy", outcome: "Yes", price: "4.0c", shares: "1,000", usdc: "$40.00", trader: "0x9i0j...1k2l" },
  { age: "18s", side: "Buy", outcome: "No", price: "96.0c", shares: "104", usdc: "$99.84", trader: "0x3m4n...5o6p" },
  { age: "25s", side: "Sell", outcome: "Yes", price: "4.1c", shares: "500", usdc: "$20.50", trader: "0x7q8r...9s0t" },
  { age: "31s", side: "Buy", outcome: "Yes", price: "3.9c", shares: "2,564", usdc: "$100.00", trader: "0xab12...cd34" },
  { age: "45s", side: "Sell", outcome: "No", price: "96.2c", shares: "20", usdc: "$19.24", trader: "0xef56...gh78" },
  { age: "1m", side: "Buy", outcome: "Yes", price: "4.0c", shares: "125", usdc: "$5.00", trader: "0xij90...kl12" },
];

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function TradePageClient({ slug }: { slug: string }) {
  const [activeTimeframe, setActiveTimeframe] = useState("1H");
  const [chartType, setChartType] = useState<"Line" | "Candle">("Line");
  const [activeTab, setActiveTab] = useState<string>("Trades");
  const [selectedOutcome, setSelectedOutcome] = useState<"Yes" | "No">("Yes");
  const [buySell, setBuySell] = useState<"Buy" | "Sell">("Buy");
  const [orderType, setOrderType] = useState<"Market" | "Limit" | "DCA">("Market");
  const [amount, setAmount] = useState("");

  const title = formatTitle(slug);

  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />

      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-auto">
          {/* Market header */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-bold text-white">{title}</h1>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
                1% Pro
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-white/40">
              <div>
                <span className="text-white/30">24h: </span>
                <span className="text-white/60">0%</span>
              </div>
              <div>
                <span className="text-white/30">Vol: </span>
                <span className="text-white/60">$74.2M</span>
              </div>
              <div>
                <span className="text-white/30">Liq: </span>
                <span className="text-white/60">$8.3M</span>
              </div>
            </div>
          </div>

          {/* Chart area */}
          <div className="relative mx-4 mt-3 h-64 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-900/20 via-[#0d1410] to-emerald-800/10 border border-white/5">
            {/* Timeframe buttons */}
            <div className="absolute top-2 left-2 flex items-center gap-0.5">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`rounded px-1.5 py-0.5 text-[9px] font-medium transition-colors ${
                    activeTimeframe === tf
                      ? "bg-emerald-500/50 text-white"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {tf}
                </button>
              ))}
              <span className="mx-1 h-3 w-px bg-white/10" />
              {(["Line", "Candle"] as const).map((ct) => (
                <button
                  key={ct}
                  onClick={() => setChartType(ct)}
                  className={`rounded px-1.5 py-0.5 text-[9px] font-medium transition-colors ${
                    chartType === ct
                      ? "bg-white/10 text-white/70"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {ct}
                </button>
              ))}
            </div>

            {/* Placeholder chart line */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,180 Q50,170 100,175 T200,160 T300,140 T400,150 T500,120 T600,130 T700,100 T800,110"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              <path
                d="M0,180 Q50,170 100,175 T200,160 T300,140 T400,150 T500,120 T600,130 T700,100 T800,110 L800,256 L0,256 Z"
                fill="url(#chartGrad)"
              />
            </svg>

            {/* Price overlay */}
            <div className="absolute top-2 right-2 text-right">
              <div className="text-lg font-bold text-green-400">4.0c</div>
              <div className="text-[9px] text-white/30">Yes</div>
            </div>
          </div>

          {/* Bottom tabs */}
          <div className="mt-3 border-b border-white/5 px-4">
            <div className="flex gap-0.5">
              {bottomTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1.5 text-[10px] font-medium transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-emerald-500 text-emerald-400"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Trades table */}
          {activeTab === "Trades" && (
            <div className="overflow-auto px-4 pb-10">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="text-white/30 uppercase tracking-wider">
                    <th className="px-2 py-1.5 text-left font-semibold">Age</th>
                    <th className="px-2 py-1.5 text-left font-semibold">Side</th>
                    <th className="px-2 py-1.5 text-left font-semibold">Outcome</th>
                    <th className="px-2 py-1.5 text-right font-semibold">Price</th>
                    <th className="px-2 py-1.5 text-right font-semibold">Shares</th>
                    <th className="px-2 py-1.5 text-right font-semibold">USDC</th>
                    <th className="px-2 py-1.5 text-right font-semibold">Trader</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTrades.map((t, i) => (
                    <tr key={i} className="border-t border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="px-2 py-1.5 text-white/40">{t.age}</td>
                      <td className={`px-2 py-1.5 font-medium ${t.side === "Buy" ? "text-green-400" : "text-red-400"}`}>
                        {t.side}
                      </td>
                      <td className={`px-2 py-1.5 font-medium ${t.outcome === "Yes" ? "text-green-400" : "text-red-400"}`}>
                        {t.outcome}
                      </td>
                      <td className="px-2 py-1.5 text-right text-white/60 font-mono">{t.price}</td>
                      <td className="px-2 py-1.5 text-right text-white/60 font-mono">{t.shares}</td>
                      <td className="px-2 py-1.5 text-right text-white/60 font-mono">{t.usdc}</td>
                      <td className="px-2 py-1.5 text-right text-white/40 font-mono">{t.trader}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right panel */}
        <aside className="hidden lg:flex w-72 shrink-0 flex-col border-l border-white/5 bg-[#0d1410]/50 overflow-y-auto">
          {/* Price display */}
          <div className="border-b border-white/5 px-4 py-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-green-400">4.0c</span>
              <span className="text-xs text-white/40">Yes</span>
            </div>
            <div className="text-[10px] text-white/30 mt-0.5">0mo 0d</div>
          </div>

          {/* Yes/No toggle */}
          <div className="flex gap-1 px-4 pt-3">
            <button
              onClick={() => setSelectedOutcome("Yes")}
              className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors ${
                selectedOutcome === "Yes"
                  ? "bg-green-600 text-white"
                  : "bg-white/5 text-white/40 hover:text-white/60"
              }`}
            >
              Yes 4.0c
            </button>
            <button
              onClick={() => setSelectedOutcome("No")}
              className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors ${
                selectedOutcome === "No"
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-white/40 hover:text-white/60"
              }`}
            >
              No 96.1c
            </button>
          </div>

          {/* Invested / Value / PNL */}
          <div className="grid grid-cols-4 gap-1 px-4 py-2 text-center">
            {["Invested", "Value", "PNL", "PNL%"].map((label) => (
              <div key={label}>
                <div className="text-[9px] text-white/30">{label}</div>
                <div className="text-[10px] font-mono text-white/50">0</div>
              </div>
            ))}
          </div>

          {/* Buy/Sell toggle */}
          <div className="flex gap-1 px-4">
            <button
              onClick={() => setBuySell("Buy")}
              className={`flex-1 rounded-md py-1 text-[10px] font-semibold transition-colors ${
                buySell === "Buy"
                  ? "bg-green-600/20 text-green-400 border border-green-600/30"
                  : "bg-white/5 text-white/40"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setBuySell("Sell")}
              className={`flex-1 rounded-md py-1 text-[10px] font-semibold transition-colors ${
                buySell === "Sell"
                  ? "bg-red-600/20 text-red-400 border border-red-600/30"
                  : "bg-white/5 text-white/40"
              }`}
            >
              Sell
            </button>
          </div>

          {/* Market / Limit / DCA */}
          <div className="flex gap-0.5 px-4 pt-2">
            {(["Market", "Limit", "DCA"] as const).map((ot) => (
              <button
                key={ot}
                onClick={() => setOrderType(ot)}
                className={`flex-1 rounded-md py-1 text-[10px] font-medium transition-colors ${
                  orderType === ot
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                {ot}
              </button>
            ))}
          </div>

          {/* Amount input */}
          <div className="px-4 pt-2">
            <input
              type="text"
              placeholder="Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-emerald-500/50"
            />
            <div className="flex gap-1 mt-1.5">
              {amountPresets.map((p) => (
                <button
                  key={p}
                  onClick={() => setAmount(String(p))}
                  className="flex-1 rounded bg-white/5 py-0.5 text-[9px] text-white/40 hover:bg-white/10 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex gap-1 mt-1">
              {amountAdds.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(String(Number(amount || 0) + a))}
                  className="flex-1 rounded bg-white/5 py-0.5 text-[9px] text-white/40 hover:bg-white/10 transition-colors"
                >
                  +${a}
                </button>
              ))}
              <button
                onClick={() => setAmount("MAX")}
                className="flex-1 rounded bg-white/5 py-0.5 text-[9px] text-white/40 hover:bg-white/10 transition-colors"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Gas */}
          <div className="px-4 pt-2 text-[9px] text-white/20">
            Gas: ~$0.01 Polygon
          </div>

          {/* Buy button */}
          <div className="px-4 pt-2">
            <button className="w-full rounded-md bg-green-600 py-2 text-xs font-bold text-white hover:bg-green-700 transition-colors">
              Buy Yes @ 4c
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 px-4 pt-3 pb-2 border-t border-white/5 mt-3">
            {[
              { label: "5m Vol", value: "$0" },
              { label: "Buys", value: "0" },
              { label: "Sells", value: "0" },
              { label: "Net Vol", value: "$0" },
            ].map((s) => (
              <div key={s.label} className="flex justify-between">
                <span className="text-[9px] text-white/30">{s.label}</span>
                <span className="text-[9px] text-white/50 font-mono">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Market Intelligence */}
          <div className="border-t border-white/5 px-4 pt-2 pb-4">
            <h3 className="text-[10px] font-semibold text-white/50 mb-2">Market Intelligence</h3>
            {[
              { label: "Makers (24h)", value: "0" },
              { label: "Whales (24h)", value: "0" },
              { label: "Pro Traders", value: "0" },
            ].map((mi) => (
              <div key={mi.label} className="flex justify-between py-0.5">
                <span className="text-[9px] text-white/30">{mi.label}</span>
                <span className="text-[9px] text-white/50 font-mono">{mi.value}</span>
              </div>
            ))}

            <div className="mt-2">
              <div className="text-[9px] text-white/30 mb-1">Top 10 Holders</div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[9px] text-green-400 w-6">YES</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-3/5 rounded-full bg-green-500/60" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-red-400 w-6">NO</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-2/5 rounded-full bg-red-500/60" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <StatusBar />
    </div>
  );
}
