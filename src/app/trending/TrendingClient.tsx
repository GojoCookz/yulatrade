"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Bell, Share2, Filter as FilterIcon, RefreshCw, Search, Zap, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Trend = "up" | "down" | "flat";
type Category = "sports" | "politics" | "crypto" | "economics" | "tech" | "other";

interface Market {
  slug: string;
  title: string;
  cc: string;
  tag: string;
  category: Category;
  /** null = Ended */
  endsInDays: number | null;
  endsLabel: string;
  yes: number;
  no: number;
  deltaPct: number;
  vol: number; // 24h dollars
  liq: number;
  txs: number;
  traders: number;
  trend: Trend;
}

const SEED: Market[] = [
  { slug: "russia-ukraine-ceasefire", title: "Russia x Ukraine ceasefire by May 31, 2026?", cc: "ua", tag: "tech", category: "politics", endsInDays: null, endsLabel: "Ended", yes: 96, no: 4, deltaPct: 0.4, vol: 128_700_000, liq: 10_500_000, txs: 14210, traders: 3821, trend: "up" },
  { slug: "japan-fifa-2026", title: "Will Japan win the 2026 FIFA World Cup?", cc: "jp", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 98, no: 2, deltaPct: 0.1, vol: 95_800_000, liq: 2_800_000, txs: 9120, traders: 2204, trend: "up" },
  { slug: "belgium-fifa-2026", title: "Will Belgium win the 2026 FIFA World Cup?", cc: "be", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 98, no: 2, deltaPct: -0.2, vol: 95_000_000, liq: 3_800_000, txs: 8544, traders: 1988, trend: "up" },
  { slug: "us-iran-peace-deal", title: "US x Iran permanent peace deal by May 31, 2026?", cc: "us", tag: "other", category: "politics", endsInDays: null, endsLabel: "Ended", yes: 73, no: 27, deltaPct: -1.2, vol: 87_900_000, liq: 1_400_000, txs: 11930, traders: 3117, trend: "down" },
  { slug: "argentina-fifa-2026", title: "Will Argentina win the 2026 FIFA World Cup?", cc: "ar", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 91, no: 9, deltaPct: 0.8, vol: 89_100_000, liq: 7_100_000, txs: 7810, traders: 1854, trend: "flat" },
  { slug: "norway-fifa-2026", title: "Will Norway win the 2026 FIFA World Cup?", cc: "no", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 98, no: 2, deltaPct: 0.0, vol: 88_300_000, liq: 2_200_000, txs: 5220, traders: 1310, trend: "up" },
  { slug: "france-fifa-2026", title: "Will France win the 2026 FIFA World Cup?", cc: "fr", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 84, no: 16, deltaPct: -0.6, vol: 87_300_000, liq: 5_600_000, txs: 8933, traders: 2410, trend: "down" },
  { slug: "portugal-fifa-2026", title: "Will Portugal win the 2026 FIFA World Cup?", cc: "pt", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 92, no: 8, deltaPct: 0.3, vol: 87_000_000, liq: 3_400_000, txs: 6108, traders: 1522, trend: "flat" },
  { slug: "colombia-fifa-2026", title: "Will Colombia win the 2026 FIFA World Cup?", cc: "co", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 98, no: 2, deltaPct: 0.2, vol: 86_500_000, liq: 1_900_000, txs: 4980, traders: 1204, trend: "up" },
  { slug: "spain-fifa-2026", title: "Will Spain win the 2026 FIFA World Cup?", cc: "es", tag: "tech", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 85, no: 15, deltaPct: 1.1, vol: 74_900_000, liq: 7_800_000, txs: 8321, traders: 2110, trend: "up" },
  { slug: "brazil-fifa-2026", title: "Will Brazil win the 2026 FIFA World Cup?", cc: "br", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 92, no: 8, deltaPct: -0.4, vol: 71_900_000, liq: 3_400_000, txs: 7412, traders: 1902, trend: "down" },
  { slug: "england-fifa-2026", title: "Will England win the 2026 FIFA World Cup?", cc: "gb", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 89, no: 11, deltaPct: 0.5, vol: 70_500_000, liq: 3_500_000, txs: 6820, traders: 1750, trend: "up" },
  { slug: "germany-fifa-2026", title: "Will Germany win the 2026 FIFA World Cup?", cc: "de", tag: "other", category: "sports", endsInDays: 18, endsLabel: "Jul 19", yes: 90, no: 10, deltaPct: 0.0, vol: 68_200_000, liq: 4_100_000, txs: 6310, traders: 1633, trend: "flat" },
  { slug: "qatar-lng-april", title: "QatarEnergy announces/resumes LNG production in Qatar by April 30?", cc: "qa", tag: "other", category: "economics", endsInDays: null, endsLabel: "Ended", yes: 94, no: 6, deltaPct: -0.1, vol: 25_500_000, liq: 6_500_000, txs: 3120, traders: 812, trend: "flat" },
  { slug: "btc-200k-2026", title: "Bitcoin tops 200k by close of 2026?", cc: "", tag: "crypto", category: "crypto", endsInDays: 183, endsLabel: "Dec 31", yes: 34, no: 66, deltaPct: 2.1, vol: 45_200_000, liq: 5_800_000, txs: 15204, traders: 4102, trend: "up" },
  { slug: "fed-cuts-july", title: "Federal Reserve cuts in July?", cc: "us", tag: "finance", category: "economics", endsInDays: 29, endsLabel: "Jul 30", yes: 61, no: 39, deltaPct: -0.9, vol: 38_100_000, liq: 4_200_000, txs: 9822, traders: 2518, trend: "down" },
];

const PERIODS = ["1m", "3m", "5m", "1h", "6h", "24h", "7D"] as const;
type Period = (typeof PERIODS)[number];
const PERIOD_MULT: Record<Period, number> = { "1m": 0.0009, "3m": 0.0026, "5m": 0.004, "1h": 0.052, "6h": 0.31, "24h": 1, "7D": 5.4 };

type SortKey = "price" | "delta" | "vol" | "liq" | "txs" | "traders";
type Preset = "high-volume" | "ending-soon" | "low-spread" | "hot" | null;

const CATEGORIES: { id: Category | "entertainment" | "science" | "weather" | "finance"; label: string }[] = [
  { id: "crypto", label: "Crypto" },
  { id: "economics", label: "Economics" },
  { id: "entertainment", label: "Entertainment" },
  { id: "finance", label: "Finance" },
  { id: "other", label: "Other" },
  { id: "politics", label: "Politics" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "tech", label: "Tech" },
  { id: "weather", label: "Weather" },
];

interface Metrics {
  volMin: string; volMax: string;
  txsMin: string; txsMax: string;
  holdersMin: string; holdersMax: string;
  deltaMin: string; deltaMax: string;
  yesMin: string; yesMax: string;
  liqMin: string; liqMax: string;
}
const EMPTY_METRICS: Metrics = { volMin: "", volMax: "", txsMin: "", txsMax: "", holdersMin: "", holdersMax: "", deltaMin: "", deltaMax: "", yesMin: "", yesMax: "", liqMin: "", liqMax: "" };

interface Filters {
  preset: Preset;
  categories: string[];
  include: string;
  exclude: string;
  metrics: Metrics;
}
const EMPTY_FILTERS: Filters = { preset: null, categories: [], include: "", exclude: "", metrics: EMPTY_METRICS };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function fmtMoney(n: number): string {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}
function fmtCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${Math.round(n)}`;
}
/** Dollar inputs accept raw dollars, or small numbers treated as millions. */
function parseDollars(s: string): number | null {
  const v = Number(s);
  if (!s || Number.isNaN(v)) return null;
  return v <= 1000 ? v * 1e6 : v;
}
function parseNum(s: string): number | null {
  const v = Number(s);
  return !s || Number.isNaN(v) ? null : v;
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

function Sparkline({ trend, id }: { trend: Trend; id: string }) {
  const points =
    trend === "up"
      ? "0,18 10,15 20,16 30,12 40,13 50,8 60,9 70,5 80,6"
      : trend === "down"
      ? "0,5 10,7 20,6 30,10 40,9 50,13 60,12 70,16 80,17"
      : "0,11 10,10 20,12 30,9 40,11 50,10 60,12 70,9 80,11";
  const stroke = trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : "#34d399";
  const fillId = `tr-spark-${id}`;
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

function Thumb({ m }: { m: Market }) {
  if (m.cc) {
    return (
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/w80/${m.cc}.png`} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white ring-1 ring-white/10">
      ₿
    </div>
  );
}

/** FLIP: animate rows to their new positions when order changes. */
function useFlip(orderSignature: string) {
  const refs = useRef(new Map<string, HTMLElement>());
  const prevTops = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const nextTops = new Map<string, number>();
    refs.current.forEach((el, key) => nextTops.set(key, el.getBoundingClientRect().top));
    nextTops.forEach((top, key) => {
      const old = prevTops.current.get(key);
      const el = refs.current.get(key);
      if (el && old !== undefined && Math.abs(old - top) > 1) {
        el.animate(
          [{ transform: `translateY(${old - top}px)` }, { transform: "translateY(0)" }],
          { duration: 450, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)" }
        );
      }
    });
    prevTops.current = nextTops;
  }, [orderSignature]);

  return useCallback((key: string) => (el: HTMLElement | null) => {
    if (el) refs.current.set(key, el);
    else refs.current.delete(key);
  }, []);
}

/* ------------------------------------------------------------------ */
/* Filters modal                                                       */
/* ------------------------------------------------------------------ */

function FiltersModal({
  open, onClose, draft, setDraft, resultCount, onApply, onReset,
}: {
  open: boolean;
  onClose: () => void;
  draft: Filters;
  setDraft: (f: Filters) => void;
  resultCount: number;
  onApply: () => void;
  onReset: () => void;
}) {
  if (!open) return null;

  const presets: { id: Exclude<Preset, null>; label: string }[] = [
    { id: "high-volume", label: "High Volume" },
    { id: "ending-soon", label: "Ending Soon" },
    { id: "low-spread", label: "Low Spread" },
    { id: "hot", label: "Hot" },
  ];

  const metricRows: { label: string; min: keyof Metrics; max: keyof Metrics }[] = [
    { label: "Volume", min: "volMin", max: "volMax" },
    { label: "Transactions", min: "txsMin", max: "txsMax" },
    { label: "Holders", min: "holdersMin", max: "holdersMax" },
    { label: "Price Change %", min: "deltaMin", max: "deltaMax" },
    { label: "Yes Price ¢", min: "yesMin", max: "yesMax" },
    { label: "Liquidity", min: "liqMin", max: "liqMax" },
  ];

  const toggleCategory = (id: string) => {
    setDraft({
      ...draft,
      categories: draft.categories.includes(id)
        ? draft.categories.filter((c) => c !== id)
        : [...draft.categories, id],
    });
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 pt-16" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1410] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
          <h2 className="text-sm font-bold text-white">Filters</h2>
          <div className="flex items-center gap-3">
            <button onClick={onReset} className="text-xs text-white/40 hover:text-white transition">Reset All</button>
            <button onClick={onClose} className="text-white/40 hover:text-white transition" aria-label="Close filters">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
          <p className="text-[10px] uppercase tracking-wider text-white/40">Quick Presets</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setDraft({ ...draft, preset: draft.preset === p.id ? null : p.id })}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  draft.preset === p.id
                    ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/50"
                    : "border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-wider text-white/40">Category</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleCategory(c.id)}
                className={`rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                  draft.categories.includes(c.id)
                    ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/50"
                    : "border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-wider text-white/40">Keywords</p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
              <Search className="h-3.5 w-3.5 text-white/30" />
              <input
                value={draft.include}
                onChange={(e) => setDraft({ ...draft, include: e.target.value })}
                placeholder="Include keywords... e.g. Bitcoin, Trump, FIFA"
                className="flex-1 bg-transparent text-xs text-white placeholder:text-white/25 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
              <span className="text-white/30">−</span>
              <input
                value={draft.exclude}
                onChange={(e) => setDraft({ ...draft, exclude: e.target.value })}
                placeholder="Exclude keywords... e.g. Bitcoin, Trump, FIFA"
                className="flex-1 bg-transparent text-xs text-white placeholder:text-white/25 outline-none"
              />
            </div>
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-wider text-white/40">Metrics</p>
          <div className="mt-2 space-y-2.5">
            {metricRows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-3">
                <span className="text-xs text-white/70">{r.label}</span>
                <div className="flex items-center gap-1.5">
                  <input
                    value={draft.metrics[r.min]}
                    onChange={(e) => setDraft({ ...draft, metrics: { ...draft.metrics, [r.min]: e.target.value } })}
                    placeholder="Min"
                    inputMode="decimal"
                    className="w-16 rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-right text-xs text-white placeholder:text-white/25 outline-none focus:border-emerald-500/50"
                  />
                  <span className="text-white/20">–</span>
                  <input
                    value={draft.metrics[r.max]}
                    onChange={(e) => setDraft({ ...draft, metrics: { ...draft.metrics, [r.max]: e.target.value } })}
                    placeholder="Max"
                    inputMode="decimal"
                    className="w-16 rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-right text-xs text-white placeholder:text-white/25 outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 p-4">
          <button
            onClick={onApply}
            className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
          >
            Apply Filters <span className="font-normal text-white/70">· {resultCount} results</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export default function TrendingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const periodParam = searchParams.get("period") as Period | null;
  const period: Period = periodParam && PERIODS.includes(periodParam) ? periodParam : "24h";

  const [markets, setMarkets] = useState<Market[]>(SEED);
  const [sortKey, setSortKey] = useState<SortKey>("vol");
  const [sortDesc, setSortDesc] = useState(true);
  const [search, setSearch] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);

  const setPeriod = (p: Period) => {
    router.replace(`/trending?period=${p}`, { scroll: false });
  };

  // Live jitter — volumes drift, deltas wiggle, rows re-rank with FLIP animation.
  useEffect(() => {
    const id = setInterval(() => {
      setMarkets((ms) =>
        ms.map((m) => {
          const drift = 1 + (Math.random() - 0.47) * 0.012;
          return {
            ...m,
            vol: m.vol * drift,
            deltaPct: +(m.deltaPct + (Math.random() - 0.5) * 0.3).toFixed(1),
            txs: m.txs + Math.floor(Math.random() * 8),
          };
        })
      );
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const refresh = () => {
    setSpinning(true);
    setMarkets((ms) =>
      ms.map((m) => ({ ...m, vol: m.vol * (1 + (Math.random() - 0.45) * 0.06) }))
    );
    setTimeout(() => setSpinning(false), 600);
  };

  const mult = PERIOD_MULT[period];

  const applyFilters = useCallback(
    (list: Market[], f: Filters, q: string): Market[] => {
      let out = list;
      if (q.trim()) {
        const needle = q.trim().toLowerCase();
        out = out.filter((m) => m.title.toLowerCase().includes(needle));
      }
      if (f.categories.length) out = out.filter((m) => f.categories.includes(m.category));
      if (f.include.trim()) {
        const words = f.include.toLowerCase().split(",").map((w) => w.trim()).filter(Boolean);
        out = out.filter((m) => words.some((w) => m.title.toLowerCase().includes(w)));
      }
      if (f.exclude.trim()) {
        const words = f.exclude.toLowerCase().split(",").map((w) => w.trim()).filter(Boolean);
        out = out.filter((m) => !words.some((w) => m.title.toLowerCase().includes(w)));
      }
      const mm = f.metrics;
      const volMin = parseDollars(mm.volMin); const volMax = parseDollars(mm.volMax);
      const liqMin = parseDollars(mm.liqMin); const liqMax = parseDollars(mm.liqMax);
      const txsMin = parseNum(mm.txsMin); const txsMax = parseNum(mm.txsMax);
      const hMin = parseNum(mm.holdersMin); const hMax = parseNum(mm.holdersMax);
      const dMin = parseNum(mm.deltaMin); const dMax = parseNum(mm.deltaMax);
      const yMin = parseNum(mm.yesMin); const yMax = parseNum(mm.yesMax);
      out = out.filter((m) => {
        const v = m.vol * mult;
        if (volMin !== null && v < volMin) return false;
        if (volMax !== null && v > volMax) return false;
        if (liqMin !== null && m.liq < liqMin) return false;
        if (liqMax !== null && m.liq > liqMax) return false;
        const t = m.txs * mult;
        if (txsMin !== null && t < txsMin) return false;
        if (txsMax !== null && t > txsMax) return false;
        if (hMin !== null && m.traders < hMin) return false;
        if (hMax !== null && m.traders > hMax) return false;
        if (dMin !== null && m.deltaPct < dMin) return false;
        if (dMax !== null && m.deltaPct > dMax) return false;
        if (yMin !== null && m.yes < yMin) return false;
        if (yMax !== null && m.yes > yMax) return false;
        return true;
      });
      return out;
    },
    [mult]
  );

  const sorted = useMemo(() => {
    const filtered = applyFilters(markets, applied, search);
    const dir = sortDesc ? -1 : 1;
    const byKey = (m: Market): number => {
      switch (sortKey) {
        case "price": return m.yes;
        case "delta": return m.deltaPct;
        case "vol": return m.vol;
        case "liq": return m.liq;
        case "txs": return m.txs;
        case "traders": return m.traders;
      }
    };
    const base = [...filtered].sort((a, b) => dir * (byKey(a) - byKey(b)));
    // Presets override ordering
    switch (applied.preset) {
      case "high-volume": return [...filtered].sort((a, b) => b.vol - a.vol);
      case "ending-soon": return [...filtered].sort((a, b) => (a.endsInDays ?? 9999) - (b.endsInDays ?? 9999));
      case "low-spread": return [...filtered].sort((a, b) => Math.abs(a.yes - 50) - Math.abs(b.yes - 50));
      case "hot": return [...filtered].sort((a, b) => Math.abs(b.deltaPct) - Math.abs(a.deltaPct));
      default: return base;
    }
  }, [markets, applied, search, sortKey, sortDesc, applyFilters]);

  const draftCount = useMemo(
    () => applyFilters(markets, draft, search).length,
    [markets, draft, search, applyFilters]
  );

  const orderSignature = sorted.map((m) => m.slug).join("|");
  const setRowRef = useFlip(orderSignature);
  const setCardRef = useFlip(`card-${orderSignature}`);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDesc((d) => !d);
    else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  const SortHeader = ({ id, label, align = "right" }: { id: SortKey; label: string; align?: "left" | "center" | "right" }) => {
    const active = sortKey === id && !applied.preset;
    return (
      <th className={`px-3 py-3 font-medium text-${align}`}>
        <button
          onClick={() => toggleSort(id)}
          className={`inline-flex items-center gap-1 uppercase tracking-wider transition ${
            active ? "text-emerald-400" : "text-white/35 hover:text-white/70"
          }`}
        >
          {label}
          {active && <span>{sortDesc ? "▾" : "▴"}</span>}
        </button>
      </th>
    );
  };

  const activeFilterCount =
    (applied.preset ? 1 : 0) +
    applied.categories.length +
    (applied.include ? 1 : 0) +
    (applied.exclude ? 1 : 0) +
    Object.values(applied.metrics).filter(Boolean).length;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 bg-[#050505] px-3 py-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-sm font-bold text-white">Trending</h1>

          <div className="flex items-center gap-0.5 rounded-lg bg-white/5 p-0.5">
            {PERIODS.map((tf) => (
              <button
                key={tf}
                onClick={() => setPeriod(tf)}
                className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  period === tf ? "bg-emerald-500/80 text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => { setDraft(applied); setFiltersOpen(true); }}
            className={`flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] transition-colors ${
              activeFilterCount
                ? "border-emerald-500/40 text-emerald-300"
                : "border-white/10 text-white/50 hover:text-white/70"
            }`}
          >
            <FilterIcon className="h-3 w-3" />
            Filter{activeFilterCount ? ` · ${activeFilterCount}` : ""}
          </button>

          <button onClick={refresh} className="text-white/40 hover:text-white/70 transition-colors" aria-label="Refresh">
            <RefreshCw className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`} />
          </button>

          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-green-400">LIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1">
            <Search className="h-3 w-3 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search markets..."
              className="w-28 bg-transparent text-[11px] text-white/80 placeholder:text-white/30 outline-none sm:w-36"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-white/30 hover:text-white" aria-label="Clear search">
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <button className="hidden items-center gap-1 rounded-md bg-yellow-500/20 px-2.5 py-1 text-[10px] font-semibold text-yellow-400 hover:bg-yellow-500/30 transition-colors sm:flex">
            <Zap className="h-3 w-3" />
            Quick Buy $
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
            <p className="text-sm text-white/60">No markets match</p>
            <p className="mt-1 text-xs text-white/40">Try clearing your search or filters.</p>
            <button
              onClick={() => { setSearch(""); setApplied(EMPTY_FILTERS); setDraft(EMPTY_FILTERS); }}
              className="mt-4 rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-400 transition"
            >
              Reset
            </button>
          </div>
        )}

        {/* Mobile: stacked cards */}
        <div className="flex flex-col divide-y divide-white/[0.04] md:hidden">
          {sorted.map((m) => {
            const c = TAG_COLORS[m.tag] ?? { dot: "bg-blue-400", text: "text-blue-400" };
            return (
              <Link
                key={m.slug}
                ref={setCardRef(m.slug) as React.Ref<HTMLAnchorElement>}
                href={`/trade/${m.slug}`}
                className="flex flex-col gap-2 px-3 py-3 active:bg-white/[0.03]"
              >
                <div className="flex items-start gap-3">
                  <Thumb m={m} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium leading-snug text-white">{m.title}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px]">
                      <span className={`flex items-center gap-1 ${c.text}`}>
                        <span className={`h-1 w-1 rounded-full ${c.dot}`} />
                        {m.tag}
                      </span>
                      <span className="text-white/30">·</span>
                      <span className={m.endsInDays === null ? "text-red-400/80" : "text-white/40"}>
                        {m.endsInDays === null ? "● Ended" : `→ ${m.endsLabel}`}
                      </span>
                    </div>
                  </div>
                  <Sparkline trend={m.trend} id={`m-${m.slug}`} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="whitespace-nowrap">
                      <span className="font-semibold text-green-400">{m.yes}¢</span>
                      <span className="mx-1 text-white/20">/</span>
                      <span className="font-semibold text-red-400">{m.no}¢</span>
                    </span>
                    <span className="text-white/40">Vol {fmtMoney(m.vol * mult)}</span>
                  </div>
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    Trade →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Desktop: full table */}
        <table className="hidden w-full text-sm md:table">
          <thead className="sticky top-0 z-10 bg-[#050505]">
            <tr className="text-[11px] uppercase tracking-wider text-white/35">
              <th className="px-4 py-3 text-left font-medium">Market</th>
              <th className="px-3 py-3 text-center font-medium">Chart</th>
              <SortHeader id="price" label="Price" align="center" />
              <SortHeader id="delta" label="Δ" align="center" />
              <SortHeader id="vol" label="Vol" />
              <SortHeader id="liq" label="Liq" />
              <SortHeader id="txs" label="B/S TXS" align="center" />
              <SortHeader id="traders" label="Traders" align="center" />
              <th className="px-4 py-3 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => {
              const c = TAG_COLORS[m.tag] ?? { dot: "bg-blue-400", text: "text-blue-400" };
              return (
                <tr
                  key={m.slug}
                  ref={setRowRef(m.slug) as React.Ref<HTMLTableRowElement>}
                  className="group border-t border-white/[0.04] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <Link href={`/trade/${m.slug}`} className="flex items-center gap-3">
                      <Thumb m={m} />
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-white">{m.title}</p>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px]">
                          <span className={`flex items-center gap-1 ${c.text}`}>
                            <span className={`h-1 w-1 rounded-full ${c.dot}`} />
                            {m.tag}
                          </span>
                          <span className="text-white/30">·</span>
                          <span className={m.endsInDays === null ? "text-red-400/80" : "text-white/40"}>
                            {m.endsInDays === null ? "● Ended" : `→ ${m.endsLabel}`}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Sparkline trend={m.trend} id={m.slug} />
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span className="font-medium text-green-400">{m.yes}¢</span>
                    <span className="mx-1 text-white/20">/</span>
                    <span className="font-medium text-red-400">{m.no}¢</span>
                  </td>
                  <td className={`px-3 py-3 text-center text-xs ${
                    m.deltaPct > 0 ? "text-green-400" : m.deltaPct < 0 ? "text-red-400" : "text-white/30"
                  }`}>
                    {m.deltaPct > 0 ? "+" : ""}{m.deltaPct.toFixed(1)}%
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-white">{fmtMoney(m.vol * mult)}</td>
                  <td className="px-3 py-3 text-right text-white/60">{fmtMoney(m.liq)}</td>
                  <td className="px-3 py-3 text-center text-white/30">{fmtCount(m.txs * mult)}</td>
                  <td className="px-3 py-3 text-center text-white/30">{fmtCount(m.traders)}</td>
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
                        className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-400 transition"
                      >
                        Trade →
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <FiltersModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        draft={draft}
        setDraft={setDraft}
        resultCount={draftCount}
        onApply={() => { setApplied(draft); setFiltersOpen(false); }}
        onReset={() => setDraft(EMPTY_FILTERS)}
      />
    </div>
  );
}
