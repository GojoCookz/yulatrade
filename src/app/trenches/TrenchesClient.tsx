"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMarketImage } from "@/lib/marketImages";
import {
  Search,
  Zap,
  Users,
  Trophy,
  BarChart3,
  Clock,
  SlidersHorizontal,
  Inbox,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Category = "Politics" | "Crypto" | "Sports" | "Finance" | "Tech" | "Other";
type Lane = "new" | "spike" | "soon";

interface Trench {
  slug: string;
  title: string;
  lane: Lane;
  category: Category;
  ageLabel: string; // "new" | "2d"
  holders: number;
  wins: number;
  vol: number;
  liq: number;
  txs: number;
  yes: number; // cents
  changePct: number;
  spread: number;
  leftLabel: string; // countdown e.g. "301d left"
  endDate: string; // "Apr 29, 2027"
}

const ITEMS: Trench[] = [
  // NEW lane
  { slug: "knafo-french-election-2027", title: "Will Sarah Knafo win the 2027 French presidential election?", lane: "new", category: "Politics", ageLabel: "new", holders: 5080, wins: 0, vol: 1_600_000, liq: 172_900, txs: 34_496, yes: 2.1, changePct: 0, spread: 0.0, leftLabel: "301d left", endDate: "Apr 29, 2027" },
  { slug: "bardella-french-election-2027", title: "Will Jordan Bardella win the 2027 French presidential election?", lane: "new", category: "Politics", ageLabel: "new", holders: 2275, wins: 0, vol: 1_200_000, liq: 305_800, txs: 13_680, yes: 22.0, changePct: 0, spread: 0.0, leftLabel: "301d left", endDate: "Apr 29, 2027" },
  { slug: "musk-richest-dec-31", title: "Will Elon Musk be the richest person on December 31?", lane: "new", category: "Other", ageLabel: "new", holders: 719, wins: 0, vol: 150_200, liq: 10_200, txs: 3_041, yes: 90.0, changePct: 0, spread: 0.0, leftLabel: "181d left", endDate: "Dec 30, 2026" },
  { slug: "starship-fully-reusable-2027", title: "SpaceX Starship fully reusable before 2027?", lane: "new", category: "Tech", ageLabel: "new", holders: 484, wins: 0, vol: 118_500, liq: 3_400, txs: 1_117, yes: 42.8, changePct: 0, spread: 0.0, leftLabel: "181d left", endDate: "Dec 30, 2026" },
  { slug: "tesla-robotaxi-california", title: "Will Tesla launch robotaxis in California by June 30?", lane: "new", category: "Other", ageLabel: "2d", holders: 407, wins: 0, vol: 114_700, liq: 5_000, txs: 1_380, yes: 9.0, changePct: 0, spread: 0.0, leftLabel: "363d left", endDate: "Jun 29, 2026" },
  { slug: "treasury-yield-5pct", title: "Will the 10-year Treasury yield hit 5.0% before 2027?", lane: "new", category: "Finance", ageLabel: "new", holders: 120, wins: 0, vol: 59_000, liq: 15_000, txs: 813, yes: 13.0, changePct: 0, spread: 0.0, leftLabel: "181d left", endDate: "Dec 30, 2026" },
  { slug: "inflation-10pct-2026", title: "Will inflation reach more than 10% in 2026?", lane: "new", category: "Sports", ageLabel: "new", holders: 131, wins: 0, vol: 52_300, liq: 16_400, txs: 694, yes: 4.3, changePct: 0, spread: 0.0, leftLabel: "181d left", endDate: "Dec 30, 2026" },
  { slug: "arc-token-dec-2026", title: "Will Arc launch a token by December 31 2026?", lane: "new", category: "Crypto", ageLabel: "new", holders: 73, wins: 0, vol: 45_000, liq: 9_400, txs: 142, yes: 31.0, changePct: 0, spread: 0.0, leftLabel: "181d left", endDate: "Dec 30, 2026" },
  // SOON lane
  { slug: "powell-depart-may-15-22", title: "Will Jerome Powell depart as Fed Chair between May 15 and May 22?", lane: "soon", category: "Finance", ageLabel: "new", holders: 125, wins: 0, vol: 31_400, liq: 6_900, txs: 306, yes: 90.0, changePct: 0, spread: 2.0, leftLabel: "19h 30m left", endDate: "Jul 2, 2026" },
  { slug: "trump-gold-coin-july-4", title: "Trump's face on US gold coin by July 4?", lane: "soon", category: "Politics", ageLabel: "new", holders: 138, wins: 0, vol: 24_300, liq: 9_200, txs: 960, yes: 59.0, changePct: 0, spread: 2.0, leftLabel: "1d left", endDate: "Jul 3, 2026" },
  { slug: "powell-depart-after-july-3", title: "Will Jerome Powell depart as Fed Chair after July 3?", lane: "soon", category: "Finance", ageLabel: "new", holders: 64, wins: 0, vol: 13_700, liq: 7_500, txs: 168, yes: 1.3, changePct: 0, spread: 2.0, leftLabel: "19h 30m left", endDate: "Jul 2, 2026" },
  { slug: "powell-depart-may-23-29", title: "Will Jerome Powell depart as Fed Chair between May 23 and May 29?", lane: "soon", category: "Finance", ageLabel: "new", holders: 57, wins: 0, vol: 6_300, liq: 4_500, txs: 116, yes: 7.0, changePct: 0, spread: 2.0, leftLabel: "19h 30m left", endDate: "Jul 2, 2026" },
  { slug: "powell-depart-may-30-june-5", title: "Will Jerome Powell depart as Fed Chair between May 30 and June 5?", lane: "soon", category: "Finance", ageLabel: "new", holders: 48, wins: 0, vol: 5_900, liq: 8_100, txs: 138, yes: 2.0, changePct: 0, spread: 2.0, leftLabel: "19h 30m left", endDate: "Jul 2, 2026" },
];

const CATEGORY_TINT: Record<Category, string> = {
  Politics: "text-blue-400",
  Crypto: "text-orange-400",
  Sports: "text-red-400",
  Finance: "text-emerald-400",
  Tech: "text-teal-400",
  Other: "text-white/50",
};

function fmtUsd(n: number) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n}`;
}
function fmtCount(n: number) {
  if (n >= 1000) return n.toLocaleString();
  return `${n}`;
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function TrenchCard({ t }: { t: Trench }) {
  return (
    <Link
      href={`/trade/${t.slug}`}
      className="block border-b border-white/[0.05] px-3 py-3 transition hover:bg-white/[0.02]"
    >
      <div className="flex gap-2.5">
        {/* Thumb */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/[0.15] bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getMarketImage(t.title) ?? `/images/markets/seed-${t.slug}.jpg`}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Title + meta */}
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-snug text-white line-clamp-2">{t.title}</p>
          <div className="mt-1 flex items-center gap-2 text-[10px]">
            <span className="font-semibold text-emerald-400">{t.ageLabel}</span>
            <span className={`flex items-center gap-1 ${CATEGORY_TINT[t.category]}`}>
              <BarChart3 className="h-2.5 w-2.5" />
              {t.category}
            </span>
            <span className="flex items-center gap-0.5 text-white/40">
              <Users className="h-2.5 w-2.5" />
              {fmtCount(t.holders)}
            </span>
            <span className="flex items-center gap-0.5 text-white/40">
              <Trophy className="h-2.5 w-2.5" />
              {t.wins}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="shrink-0 text-right text-[10px] leading-tight">
          <p>
            <span className="text-white/30">VOL </span>
            <span className="font-semibold text-emerald-300">{fmtUsd(t.vol)}</span>
          </p>
          <p className="mt-0.5">
            <span className="text-white/30">LIQ </span>
            <span className="text-white/70">{fmtUsd(t.liq)}</span>
          </p>
          <p className="mt-0.5">
            <span className="text-white/30">TX </span>
            <span className="text-white/70">{t.txs.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Bottom row: countdown, price bar, date */}
      <div className="mt-2 flex items-center gap-1.5">
        <span className="flex items-center gap-1 text-[10px] text-white/40">
          <Clock className="h-2.5 w-2.5" />
          {t.leftLabel}
        </span>
        <span className="flex items-center gap-1 rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-green-400">
          Yes {t.yes.toFixed(1)}¢
        </span>
        <span className="flex items-center gap-1 rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-red-400">
          No {(100 - t.yes).toFixed(1)}¢
        </span>
        <span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/40">
          {t.changePct}%
        </span>
        <span className="ml-auto flex items-center gap-1 rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/40">
          <BarChart3 className="h-2.5 w-2.5" />
          Spd {t.spread.toFixed(1)}
        </span>
        <span className="text-[10px] text-white/30">{t.endDate}</span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Column                                                              */
/* ------------------------------------------------------------------ */

function LaneColumn({ label, items, emptyText }: { label: string; items: Trench[]; emptyText: string }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"vol" | "txs">("vol");

  const filtered = items
    .filter((t) => !q.trim() || t.title.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((a, b) => (sort === "vol" ? b.vol - a.vol : b.txs - a.txs));

  return (
    <div className="flex min-w-0 flex-1 flex-col border-white/[0.06] lg:border-r lg:last:border-r-0">
      {/* Column header */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2">
        <span className="text-sm font-bold text-white">{label}</span>
        <div className="flex flex-1 items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.02] px-2.5 py-1">
          <Search className="h-3 w-3 text-white/30" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-[11px] text-white/80 placeholder:text-white/25 outline-none"
          />
        </div>
        <button
          onClick={() => setSort("vol")}
          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition ${
            sort === "vol" ? "bg-emerald-500/80 text-white" : "text-white/40 hover:text-white"
          }`}
        >
          Vol
        </button>
        <button
          onClick={() => setSort("txs")}
          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition ${
            sort === "txs" ? "bg-emerald-500/80 text-white" : "text-white/40 hover:text-white"
          }`}
        >
          Txns
        </button>
        <button className="text-white/30 hover:text-white transition" aria-label={`${label} filters`}>
          <SlidersHorizontal className="h-3 w-3" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <Inbox className="h-5 w-5 text-white/20" />
            <p className="mt-2 text-xs text-white/35">{emptyText}</p>
          </div>
        ) : (
          filtered.map((t) => <TrenchCard key={t.slug} t={t} />)
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const MIN_SIZES = ["$10", "$25", "$50", "$100"] as const;

export default function TrenchesClient() {
  const [minSize, setMinSize] = useState<(typeof MIN_SIZES)[number]>("$10");
  const [count, setCount] = useState("10");
  const [, setTick] = useState(0);

  // idle tick keeps "live" label honest without fabricating data changes
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 lg:px-5">
        <h1 className="text-sm font-bold text-white">
          Trenches <span className="text-white/30">·</span> <span className="font-semibold text-emerald-400">live</span>
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-yellow-400/80" />
            {MIN_SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setMinSize(s)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                  minSize === s
                    ? "bg-emerald-500 text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <select
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="rounded-md border border-white/[0.13] bg-white/[0.03] px-2 py-1 text-[11px] text-white/70 outline-none hover:bg-white/[0.06]"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Three-lane board */}
      <div className="flex flex-1 flex-col overflow-y-auto border-t border-white/[0.06] lg:flex-row lg:overflow-hidden">
        <LaneColumn label="New" items={ITEMS.filter((t) => t.lane === "new")} emptyText="No new markets" />
        <LaneColumn label="Spikes" items={ITEMS.filter((t) => t.lane === "spike")} emptyText="No volume spike markets" />
        <LaneColumn label="Soon" items={ITEMS.filter((t) => t.lane === "soon")} emptyText="No markets ending soon" />
      </div>
    </div>
  );
}
