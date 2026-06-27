"use client";

import { useState } from "react";
import { Copy as CopyIcon, Check, Star, Users, TrendingUp, Filter as FilterIcon } from "lucide-react";

interface Trader {
  wallet: string;
  alias?: string;
  pnl30d: number;
  roi: number;
  winRate: number;
  trades: number;
  followers: number;
  copying: number;
  avgSize: number;
  proVerified?: boolean;
  tags: string[];
}

const TRADERS: Trader[] = [
  { wallet: "0x7a63...b4ef", alias: "WhaleHunter", pnl30d: 184200, roi: 38.4, winRate: 78, trades: 892, followers: 4120, copying: 312, avgSize: 850, proVerified: true, tags: ["politics", "crypto"] },
  { wallet: "0xe299...34dd", alias: "MacroSensei", pnl30d: 112400, roi: 31.2, winRate: 71, trades: 534, followers: 2890, copying: 198, avgSize: 1240, proVerified: true, tags: ["finance", "politics"] },
  { wallet: "0xabc1...2def", alias: "TrenchGremlin", pnl30d: 89400, roi: 44.8, winRate: 69, trades: 388, followers: 1820, copying: 142, avgSize: 420, tags: ["new", "tech"] },
  { wallet: "0x2940...5ab3", pnl30d: 51000, roi: 22.5, winRate: 65, trades: 412, followers: 980, copying: 78, avgSize: 320, tags: ["sports"] },
  { wallet: "0x4f10...991e", alias: "OracleSatoshi", pnl30d: 42000, roi: 28.1, winRate: 73, trades: 215, followers: 770, copying: 61, avgSize: 540, proVerified: true, tags: ["crypto"] },
  { wallet: "0xdf02...112c", pnl30d: 31000, roi: 18.9, winRate: 60, trades: 305, followers: 510, copying: 33, avgSize: 240, tags: ["culture", "politics"] },
  { wallet: "0xbf21...cc81", alias: "BasisRipper", pnl30d: 19800, roi: 12.4, winRate: 57, trades: 178, followers: 410, copying: 22, avgSize: 660, tags: ["finance"] },
  { wallet: "0xa221...f0b7", pnl30d: 16200, roi: 9.7, winRate: 62, trades: 244, followers: 320, copying: 18, avgSize: 180, tags: ["sports", "esports"] },
  { wallet: "0x331a...e451", alias: "RiskParity", pnl30d: 12000, roi: 14.2, winRate: 58, trades: 192, followers: 280, copying: 14, avgSize: 410, proVerified: true, tags: ["finance"] },
  { wallet: "0x9012...88ab", pnl30d: 9000, roi: 8.1, winRate: 54, trades: 165, followers: 210, copying: 9, avgSize: 220, tags: ["new"] },
];

type Sort = "pnl" | "roi" | "winrate" | "followers" | "new";

export default function CopyClient() {
  const [sort, setSort] = useState<Sort>("pnl");
  const [proOnly, setProOnly] = useState(false);
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const [copyAmount, setCopyAmount] = useState(50);

  const toggleCopy = (wallet: string) => setCopied((p) => ({ ...p, [wallet]: !p[wallet] }));

  const sorted = [...TRADERS]
    .filter((t) => (proOnly ? t.proVerified : true))
    .sort((a, b) => {
      switch (sort) {
        case "roi": return b.roi - a.roi;
        case "winrate": return b.winRate - a.winRate;
        case "followers": return b.followers - a.followers;
        case "new": return a.trades - b.trades;
        case "pnl":
        default: return b.pnl30d - a.pnl30d;
      }
    });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <CopyIcon className="h-4 w-4 text-emerald-400" />
            <h1 className="text-lg font-bold text-white">Copy Trading</h1>
          </div>
          <span className="text-xs text-white/40">Mirror the trades of top-performing wallets. Set a fixed copy size and the rest is automatic.</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.02] px-2 py-1">
            <span className="text-white/40">Copy size:</span>
            <input
              type="number"
              value={copyAmount}
              onChange={(e) => setCopyAmount(Number(e.target.value))}
              className="w-16 bg-transparent text-right text-white outline-none"
            />
            <span className="text-white/40">USDC</span>
          </div>
          {(
            [
              { id: "pnl", label: "Top P&L" },
              { id: "roi", label: "Top ROI" },
              { id: "winrate", label: "Win Rate" },
              { id: "followers", label: "Most Followed" },
              { id: "new", label: "Rising" },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id as Sort)}
              className={`rounded-md px-2.5 py-1 font-medium transition ${
                sort === s.id ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40" : "text-white/50 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => setProOnly((p) => !p)}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition ${
              proOnly ? "bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-500/30" : "text-white/50 hover:text-white"
            }`}
          >
            <Star className="h-3 w-3" /> Pro Verified
          </button>
          <button className="ml-1 flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-white/60 hover:bg-white/[0.05]">
            <FilterIcon className="h-3 w-3" />
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((t) => (
            <div key={t.wallet} className="group rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-4 transition hover:border-emerald-500/30">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-white truncate">{t.alias ?? t.wallet}</p>
                    {t.proVerified && (
                      <span className="flex items-center gap-0.5 rounded bg-yellow-500/15 px-1.5 py-px text-[9px] font-bold text-yellow-300">
                        <Star className="h-2.5 w-2.5 fill-current" /> PRO
                      </span>
                    )}
                  </div>
                  {t.alias && <p className="font-mono text-[10px] text-emerald-300/70">{t.wallet}</p>}
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40">30D P&L</p>
                  <p className={`text-base font-bold ${t.pnl30d >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {t.pnl30d >= 0 ? "+" : ""}${(t.pnl30d / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[10px]">
                <div>
                  <p className="text-white/40">ROI</p>
                  <p className={`mt-0.5 font-mono text-xs font-semibold ${t.roi >= 20 ? "text-green-400" : "text-white"}`}>+{t.roi.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-white/40">Win</p>
                  <p className={`mt-0.5 font-mono text-xs font-semibold ${t.winRate >= 65 ? "text-green-400" : "text-white"}`}>{t.winRate}%</p>
                </div>
                <div>
                  <p className="text-white/40">Trades</p>
                  <p className="mt-0.5 font-mono text-xs text-white">{t.trades}</p>
                </div>
                <div>
                  <p className="text-white/40">Avg</p>
                  <p className="mt-0.5 font-mono text-xs text-white">${t.avgSize}</p>
                </div>
              </div>

              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                <div className={`h-full ${t.winRate >= 65 ? "bg-green-400" : "bg-emerald-400"}`} style={{ width: `${t.winRate}%` }} />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {t.followers.toLocaleString()} followers</span>
                  <span>·</span>
                  <span>{t.copying} copying</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {t.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded bg-white/[0.05] px-1.5 py-px text-[9px] text-white/60">{tag}</span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toggleCopy(t.wallet)}
                className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-bold transition ${
                  copied[t.wallet]
                    ? "bg-green-500/20 text-green-300 ring-1 ring-green-500/40"
                    : "bg-emerald-500 text-white hover:bg-emerald-500"
                }`}
              >
                {copied[t.wallet] ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Copying · ${copyAmount}/trade
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3.5 w-3.5" /> Copy · ${copyAmount}/trade
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
