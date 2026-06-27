"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Sparkles, TrendingUp, Filter as FilterIcon } from "lucide-react";

interface Trench {
  slug: string;
  title: string;
  category: "politics" | "crypto" | "sports" | "finance" | "tech" | "culture";
  creator: string;
  ageSec: number;
  liquidity: number;
  vol1h: number;
  vol24h: number;
  traders: number;
  change1h: number;
  yesPrice: number;
  multiMarkets?: number;
}

const SEED: Trench[] = [
  { slug: "ai-2027-superintelligence", title: "AI model labeled 'superintelligent' by EOY 2027?", category: "tech", creator: "0xa1...4f", ageSec: 240, liquidity: 12400, vol1h: 8200, vol24h: 41000, traders: 38, change1h: 412, yesPrice: 12 },
  { slug: "btc-200k-q2", title: "Bitcoin hits 200k in Q2 2026?", category: "crypto", creator: "0x2b...91", ageSec: 480, liquidity: 24800, vol1h: 14200, vol24h: 78000, traders: 62, change1h: 285, yesPrice: 18 },
  { slug: "fed-emergency-cut", title: "Fed emergency rate cut in next 60 days?", category: "finance", creator: "0x33...77", ageSec: 760, liquidity: 9800, vol1h: 5400, vol24h: 28000, traders: 27, change1h: 198, yesPrice: 8 },
  { slug: "starship-mars-2026", title: "SpaceX Starship reaches Mars orbit in 2026?", category: "tech", creator: "0x91...0a", ageSec: 1100, liquidity: 6200, vol1h: 3100, vol24h: 14800, traders: 22, change1h: 155, yesPrice: 4 },
  { slug: "lakers-finals", title: "Lakers reach NBA Finals?", category: "sports", creator: "0xc0...22", ageSec: 1440, liquidity: 18900, vol1h: 4400, vol24h: 33000, traders: 41, change1h: 92, yesPrice: 22 },
  { slug: "ukraine-territory-q2", title: "Ukraine regains 10%+ territory by Q2 2026?", category: "politics", creator: "0x66...e1", ageSec: 1800, liquidity: 14500, vol1h: 3800, vol24h: 27000, traders: 33, change1h: 78, yesPrice: 14 },
  { slug: "oscar-best-picture-leak", title: "Best Picture leak before 2026 ceremony?", category: "culture", creator: "0xff...c8", ageSec: 2100, liquidity: 4400, vol1h: 1900, vol24h: 9200, traders: 18, change1h: 64, yesPrice: 31 },
  { slug: "eth-flip-btc-7d", title: "Ethereum flips Bitcoin within 7 days?", category: "crypto", creator: "0xe5...11", ageSec: 2400, liquidity: 7100, vol1h: 2200, vol24h: 11000, traders: 21, change1h: 41, yesPrice: 3 },
  { slug: "gpt-6-shipped", title: "GPT-6 shipped before Sept 2026?", category: "tech", creator: "0x12...88", ageSec: 2800, liquidity: 16200, vol1h: 3300, vol24h: 21000, traders: 35, change1h: 38, yesPrice: 19 },
  { slug: "presidential-impeachment-2026", title: "Presidential impeachment vote in 2026?", category: "politics", creator: "0xab...77", ageSec: 3200, liquidity: 11000, vol1h: 1800, vol24h: 18000, traders: 26, change1h: 22, yesPrice: 6 },
];

const TAG_COLORS: Record<Trench["category"], string> = {
  politics: "text-blue-400",
  crypto: "text-orange-400",
  sports: "text-red-400",
  finance: "text-emerald-400",
  tech: "text-teal-400",
  culture: "text-pink-400",
};

function formatAge(s: number) {
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
}
function fmtUsd(n: number) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n}`;
}

type Sort = "new" | "trending" | "volume" | "liquidity" | "traders";

export default function TrenchesClient() {
  const [items, setItems] = useState<Trench[]>(SEED);
  const [sort, setSort] = useState<Sort>("trending");
  const [minLiq, setMinLiq] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setItems((xs) =>
        xs.map((x) => ({
          ...x,
          ageSec: x.ageSec + 1,
          vol1h: x.vol1h + Math.floor(Math.random() * 50),
          traders: x.traders + (Math.random() > 0.92 ? 1 : 0),
          change1h: x.change1h + (Math.random() - 0.4) * 3,
        }))
      );
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const sorted = [...items]
    .filter((x) => x.liquidity >= minLiq)
    .sort((a, b) => {
      switch (sort) {
        case "new": return a.ageSec - b.ageSec;
        case "volume": return b.vol24h - a.vol24h;
        case "liquidity": return b.liquidity - a.liquidity;
        case "traders": return b.traders - a.traders;
        case "trending":
        default:
          return b.change1h - a.change1h;
      }
    });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-400" />
            <h1 className="text-lg font-bold text-white">Trenches</h1>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Live · {sorted.length} markets
          </span>
          <span className="text-[11px] text-white/40">freshly-deployed markets with rising activity</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {(
            [
              { id: "trending", label: "Trending", icon: TrendingUp },
              { id: "new", label: "New", icon: Sparkles },
              { id: "volume", label: "Top Volume" },
              { id: "liquidity", label: "Top Liquidity" },
              { id: "traders", label: "Top Holders" },
            ] as const
          ).map((s) => {
            const Icon = "icon" in s ? s.icon : null;
            const active = sort === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSort(s.id as Sort)}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition ${
                  active ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40" : "text-white/50 hover:text-white"
                }`}
              >
                {Icon ? <Icon className="h-3 w-3" /> : null}
                {s.label}
              </button>
            );
          })}
          <span className="mx-1 text-white/15">|</span>
          <select
            value={minLiq}
            onChange={(e) => setMinLiq(Number(e.target.value))}
            className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-white/70 outline-none hover:bg-white/[0.05]"
          >
            <option value={0}>All liquidity</option>
            <option value={5000}>$5K+ liq</option>
            <option value={10000}>$10K+ liq</option>
            <option value={25000}>$25K+ liq</option>
          </select>
          <button className="ml-1 flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-white/60 hover:bg-white/[0.05]">
            <FilterIcon className="h-3 w-3" />
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((t) => (
            <Link
              key={t.slug}
              href={`/trade/${t.slug}`}
              className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-4 transition hover:border-emerald-500/30 hover:bg-[#0d1410]"
            >
              {/* trend stripe */}
              <div
                className={`absolute left-0 top-0 h-full w-1 ${
                  t.change1h > 200 ? "bg-orange-400" : t.change1h > 100 ? "bg-emerald-400" : "bg-white/10"
                }`}
              />
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-200 truncate">{t.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px]">
                    <span className={`flex items-center gap-1 ${TAG_COLORS[t.category]}`}>
                      <span className="h-1 w-1 rounded-full bg-current" /> {t.category}
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/40">deployed {formatAge(t.ageSec)} ago</span>
                    <span className="text-white/30">·</span>
                    <span className="font-mono text-emerald-300/70">{t.creator}</span>
                  </div>
                </div>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                    t.change1h > 0
                      ? "bg-green-500/15 text-green-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {t.change1h > 0 ? "+" : ""}{t.change1h.toFixed(0)}% / 1h
                </span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[10px]">
                <div>
                  <p className="text-white/40">Price</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-white">{t.yesPrice}¢</p>
                </div>
                <div>
                  <p className="text-white/40">Liq</p>
                  <p className="mt-0.5 font-mono text-sm text-white/80">{fmtUsd(t.liquidity)}</p>
                </div>
                <div>
                  <p className="text-white/40">Vol 1h</p>
                  <p className="mt-0.5 font-mono text-sm text-green-400">{fmtUsd(t.vol1h)}</p>
                </div>
                <div>
                  <p className="text-white/40">Holders</p>
                  <p className="mt-0.5 font-mono text-sm text-white/80">{t.traders}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
