"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Pencil,
  Filter as FilterIcon,
  ChevronDown,
} from "lucide-react";

type Coin = "BTC" | "ETH" | "SOL" | "XRP";
type Timeframe = "5m" | "15m" | "1h";

const COIN_META: Record<Coin, { tvSymbol: string; color: string; label: string }> = {
  BTC: { tvSymbol: "BINANCE:BTCUSDT", color: "text-orange-400", label: "BTC" },
  ETH: { tvSymbol: "BINANCE:ETHUSDT", color: "text-indigo-400", label: "ETH" },
  SOL: { tvSymbol: "BINANCE:SOLUSDT", color: "text-fuchsia-400", label: "SOL" },
  XRP: { tvSymbol: "BINANCE:XRPUSDT", color: "text-zinc-300", label: "XRP" },
};

const TF_TO_TV: Record<Timeframe, string> = { "5m": "5", "15m": "15", "1h": "60" };
const TF_TO_SECONDS: Record<Timeframe, number> = { "5m": 300, "15m": 900, "1h": 3600 };

function formatClockTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}
function formatCountdown(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface TradeRow {
  age: string;
  side: "Buy" | "Sell";
  outcome: "Up" | "Down";
  price: number;
  shares: number;
  usdc: number;
  trader: string;
}
const mockTrades: TradeRow[] = [
  { age: "2s", side: "Sell", outcome: "Down", price: 44, shares: 20, usdc: 8.8, trader: "103255..7" },
  { age: "2s", side: "Sell", outcome: "Down", price: 44, shares: 5, usdc: 2.2, trader: "103255..7" },
  { age: "2s", side: "Buy", outcome: "Down", price: 45, shares: 2222, usdc: 1.0, trader: "103255..7" },
  { age: "2s", side: "Buy", outcome: "Up", price: 56, shares: 3571, usdc: 2.0, trader: "746537..1" },
  { age: "5s", side: "Buy", outcome: "Up", price: 56, shares: 1240, usdc: 0.7, trader: "918452..3" },
  { age: "8s", side: "Sell", outcome: "Up", price: 55, shares: 410, usdc: 2.3, trader: "200133..a" },
  { age: "12s", side: "Buy", outcome: "Down", price: 45, shares: 780, usdc: 3.5, trader: "76b219..f" },
  { age: "15s", side: "Sell", outcome: "Down", price: 44, shares: 90, usdc: 0.4, trader: "913aa1..2" },
];

export default function UpDownClient() {
  const router = useRouter();
  const params = useSearchParams();
  const coin = (params.get("coin") as Coin) ?? "BTC";
  const tf = (params.get("timeframe") as Timeframe) ?? "5m";
  const meta = COIN_META[coin] ?? COIN_META.BTC;

  const setQuery = (next: Partial<{ coin: Coin; timeframe: Timeframe }>) => {
    const sp = new URLSearchParams(params.toString());
    if (next.coin) sp.set("coin", next.coin);
    if (next.timeframe) sp.set("timeframe", next.timeframe);
    router.replace(`/up-or-down?${sp.toString()}`);
  };

  // round timer
  const periodSec = TF_TO_SECONDS[tf];
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const { roundStart, roundEnd, countdown } = useMemo(() => {
    if (!now) return { roundStart: null, roundEnd: null, countdown: 0 };
    const epochSec = Math.floor(now.getTime() / 1000);
    const intoRound = epochSec % periodSec;
    const start = new Date((epochSec - intoRound) * 1000);
    const end = new Date(start.getTime() + periodSec * 1000);
    return { roundStart: start, roundEnd: end, countdown: periodSec - intoRound };
  }, [now, periodSec]);

  // mock price ticker
  const [price, setPrice] = useState(59638);
  useEffect(() => {
    const id = setInterval(() => {
      setPrice((p) => +(p + (Math.random() - 0.5) * 80).toFixed(2));
    }, 1500);
    return () => clearInterval(id);
  }, []);
  const beat = 82962;
  const dayChange = -2.92;

  // order panel state
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit" | "dca">("market");
  const [amount, setAmount] = useState("");

  // TradingView widget URL — public embed, free + Apache-licensed widget
  const tvSrc = useMemo(() => {
    const sp = new URLSearchParams({
      symbol: meta.tvSymbol,
      interval: TF_TO_TV[tf],
      hidesidetoolbar: "1",
      hidetoptoolbar: "1",
      hideideas: "1",
      theme: "dark",
      style: "1",
      timezone: "Etc/UTC",
      withdateranges: "0",
      studies: "[]",
      locale: "en",
      bg_color: "0A0118",
      gridColor: "rgba(255,255,255,0.04)",
      backgroundColor: "rgba(10,1,24,1)",
      allow_symbol_change: "0",
      save_image: "0",
      toolbarbg: "0A0118",
    });
    return `https://s.tradingview.com/widgetembed/?${sp.toString()}`;
  }, [meta.tvSymbol, tf]);

  const upPrice = 56.0;
  const downPrice = 45.0;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Coin + timeframe + round bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 bg-[#050505] px-3 py-2">
          <div className="flex items-center gap-2">
            {(Object.keys(COIN_META) as Coin[]).map((c) => {
              const active = coin === c;
              return (
                <button
                  key={c}
                  onClick={() => setQuery({ coin: c })}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "bg-white/10 text-white ring-1 ring-white/15"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <span className={active ? COIN_META[c].color : ""}>●</span>
                  {c}
                </button>
              );
            })}
            <div className="ml-2 flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.02] p-0.5">
              {(["5m", "15m", "1h"] as Timeframe[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery({ timeframe: t })}
                  className={`rounded-sm px-3 py-1 text-xs font-medium transition ${
                    tf === t
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {roundStart && roundEnd
                ? `${formatClockTime(roundStart)} – ${formatClockTime(roundEnd)} ET`
                : "—"}
            </span>
            <span className="rounded-md bg-white/[0.03] border border-white/10 px-2 py-0.5 font-mono text-sm font-bold text-white">
              {formatCountdown(countdown)}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-white/40">
              {coin} <span className="text-white font-semibold">${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>{" "}
              <span className={dayChange < 0 ? "text-red-400" : "text-green-400"}>
                {dayChange < 0 ? "▼" : "▲"} {Math.abs(dayChange).toFixed(2)}%
              </span>
            </span>
            <span className="text-white/40">
              Beat: <span className="text-green-400 font-semibold">${beat.toLocaleString()}</span>
            </span>
            <span className="text-white/40">
              Up: <span className="text-emerald-300 font-semibold">{upPrice.toFixed(0)}¢</span>
            </span>
          </div>
        </div>

        {/* TradingView chart */}
        <div className="relative h-[55vh] min-h-[320px] overflow-hidden bg-[#050505] lg:h-auto lg:flex-1">
          <iframe
            key={`${coin}-${tf}`}
            src={tvSrc}
            title={`${coin} TradingView chart`}
            className="absolute inset-0 h-full w-full"
            style={{ border: "none" }}
            allow="clipboard-write"
            loading="eager"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
          />
        </div>

        {/* Bottom tabs */}
        <div className="border-t border-white/5 bg-[#050505]">
          <div className="flex items-center justify-between gap-2 border-b border-white/5 px-3 py-2">
            <div className="flex items-center gap-4 overflow-x-auto text-xs">
              {["Trades", "Orderbook", "Holders", "Related Markets", "Positions"].map((t, i) => (
                <button
                  key={t}
                  className={`pb-1 transition ${
                    i === 0
                      ? "border-b-2 border-emerald-500 text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {t}
                </button>
              ))}
              <span className="ml-2 flex items-center gap-1 text-[10px] text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <FilterIcon className="h-3 w-3" />
              Filter:
              <button className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">All</button>
              <button className="rounded px-2 py-0.5 hover:text-white">Mine</button>
            </div>
          </div>

          <div className="max-h-56 overflow-auto">
            <table className="w-full text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-white/30">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Age ↓</th>
                  <th className="px-3 py-2 text-left font-medium">Side</th>
                  <th className="px-3 py-2 text-left font-medium">Outcome</th>
                  <th className="px-3 py-2 text-right font-medium">Price</th>
                  <th className="px-3 py-2 text-right font-medium">Shares</th>
                  <th className="px-3 py-2 text-right font-medium">USDC</th>
                  <th className="px-3 py-2 text-right font-medium">Trader</th>
                </tr>
              </thead>
              <tbody>
                {mockTrades.map((t, i) => (
                  <tr key={i} className="border-t border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-3 py-1.5 text-white/50">{t.age}</td>
                    <td className={`px-3 py-1.5 font-medium ${t.side === "Buy" ? "text-green-400" : "text-red-400"}`}>{t.side}</td>
                    <td className={`px-3 py-1.5 font-medium ${t.outcome === "Up" ? "text-emerald-300" : "text-red-400"}`}>{t.outcome}</td>
                    <td className="px-3 py-1.5 text-right text-white/80 font-mono">{t.price}¢</td>
                    <td className="px-3 py-1.5 text-right text-white/60 font-mono">{t.shares.toLocaleString()}</td>
                    <td className="px-3 py-1.5 text-right text-white/80 font-mono">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                        {t.usdc.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-right text-white/40 font-mono">{t.trader}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right order panel */}
      <aside className="w-full shrink-0 overflow-y-auto border-t border-white/5 bg-[#050505] px-4 py-3 lg:w-[320px] lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="text-lg font-bold text-white">{upPrice.toFixed(1)}¢</span>
            <span className="text-sm text-white/60">Up</span>
          </div>
          <span className="text-[11px] text-white/40">⏱ 0mo 0d</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => setDirection("up")}
            className={`rounded-md py-2 text-xs font-semibold transition ${
              direction === "up"
                ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40"
                : "bg-white/[0.03] text-white/60 hover:text-white"
            }`}
          >
            Up {upPrice.toFixed(1)}¢
          </button>
          <button
            onClick={() => setDirection("down")}
            className={`rounded-md py-2 text-xs font-semibold transition ${
              direction === "down"
                ? "bg-red-500/20 text-red-200 ring-1 ring-red-400/40"
                : "bg-white/[0.03] text-white/60 hover:text-white"
            }`}
          >
            Down {downPrice.toFixed(1)}¢
          </button>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[10px]">
          {[
            { label: "Invested", value: "0.00", color: "text-white" },
            { label: "Value", value: "0.00", color: "text-white" },
            { label: "PNL", value: "+0.00", color: "text-green-400" },
            { label: "PNL %", value: "+0.0%", color: "text-green-400" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-white/40">{s.label}</p>
              <p className={`mt-0.5 text-[11px] font-medium ${s.color}`}>
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-0.5 align-middle" />
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => setSide("buy")}
            className={`rounded-md py-2 text-xs font-bold transition ${
              side === "buy" ? "bg-green-500/15 text-green-400 ring-1 ring-green-500/40" : "text-white/50 hover:text-white"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setSide("sell")}
            className={`rounded-md py-2 text-xs font-bold transition ${
              side === "sell" ? "bg-red-500/15 text-red-400 ring-1 ring-red-500/40" : "text-white/50 hover:text-white"
            }`}
          >
            Sell
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex gap-3">
            {(["market", "limit", "dca"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className={`capitalize ${orderType === t ? "border-b border-emerald-500 text-white pb-0.5" : "text-white/40 hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-white/40 flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
            $0.00
          </span>
        </div>

        <div className="mt-3 rounded-md border border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/40">Amount</span>
            <span className="text-sm text-white/30">0.0</span>
          </div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            inputMode="decimal"
            className="mt-1 w-full bg-transparent text-2xl font-bold text-white placeholder:text-white/20 outline-none"
          />
          <button className="absolute right-7 top-[332px] text-white/40 hover:text-white">
            <DollarSign className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-5 gap-1">
          {[10, 50, 100, 1000].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v.toString())}
              className="rounded-md border border-white/10 bg-white/[0.02] py-1.5 text-[11px] font-medium text-white/70 hover:bg-white/[0.06] transition"
            >
              {v}
            </button>
          ))}
          <button className="flex items-center justify-center rounded-md border border-white/10 bg-white/[0.02] text-white/40 hover:bg-white/[0.06] transition">
            <Pencil className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-1 grid grid-cols-5 gap-1">
          {["+$1", "+$5", "+$10", "+$100"].map((v) => (
            <button
              key={v}
              onClick={() => setAmount((a) => (Number(a || 0) + Number(v.replace(/[^\d]/g, ""))).toString())}
              className="rounded-md border border-white/10 bg-white/[0.02] py-1.5 text-[11px] font-medium text-white/70 hover:bg-white/[0.06] transition"
            >
              {v}
            </button>
          ))}
          <button className="rounded-md bg-yellow-500/20 py-1.5 text-[11px] font-bold text-yellow-300 hover:bg-yellow-500/30 transition">
            MAX
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="text-white/40">Gas</span>
          <span className="text-white/60">
            ~$0.01 · <span className="text-emerald-300">Polygon</span>
          </span>
        </div>

        <div className="mt-3 rounded-lg border border-yellow-500/30 bg-yellow-500/[0.04] p-3">
          <p className="text-xs font-semibold text-yellow-300">No wallet detected</p>
          <p className="mt-0.5 text-[10px] text-white/50">Create a wallet to start trading on Polymarket.</p>
          <button className="mt-2 w-full rounded-md bg-yellow-500/20 py-1.5 text-xs font-bold text-yellow-300 hover:bg-yellow-500/30 transition">
            Setup Trading Wallet
          </button>
        </div>

        <button
          className={`mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-3 text-sm font-bold transition ${
            direction === "up" && side === "buy"
              ? "bg-green-500/20 text-green-300 ring-1 ring-green-500/40 hover:bg-green-500/30"
              : direction === "down" && side === "buy"
              ? "bg-red-500/20 text-red-300 ring-1 ring-red-500/40 hover:bg-red-500/30"
              : "bg-white/[0.06] text-white/70 hover:bg-white/10"
          }`}
        >
          {side === "buy" ? "Buy" : "Sell"} {direction === "up" ? "Up" : "Down"} @ {(direction === "up" ? upPrice : downPrice).toFixed(0)}¢
        </button>

        <div className="mt-4 grid grid-cols-4 gap-2 border-t border-white/5 pt-3 text-center text-[10px]">
          <div>
            <p className="text-white/40">5m Vol</p>
            <p className="mt-0.5 font-mono text-white">$0.00</p>
          </div>
          <div>
            <p className="text-white/40">Buys</p>
            <p className="mt-0.5 font-mono text-green-400">0 / $0.00</p>
          </div>
          <div>
            <p className="text-white/40">Sells</p>
            <p className="mt-0.5 font-mono text-red-400">0 / $0.00</p>
          </div>
          <div>
            <p className="text-white/40">Net Vol</p>
            <p className="mt-0.5 font-mono text-emerald-300">+$0.00</p>
          </div>
        </div>

        <div className="mt-4 border-t border-white/5 pt-3">
          <p className="text-[10px] uppercase tracking-wider text-white/40">Market Intelligence</p>
          <div className="mt-2 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-white/50">Makers (24h)</span>
              <span className="text-white">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50">Whales (24h)</span>
              <span className="text-white">0 trades</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50">Pro Traders</span>
              <span className="text-white"><span className="text-green-400">4</span> buying · <span className="text-red-400">5</span> selling</span>
            </div>
            <div className="mt-2">
              <p className="text-white/50">Top 10 Holders</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-emerald-300 w-8">YES</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: "0%" }} />
                </div>
                <span className="text-white/60 w-10 text-right">0.0%</span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-red-400 w-8">NO</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-red-400" style={{ width: "0%" }} />
                </div>
                <span className="text-white/60 w-10 text-right">0.0%</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
