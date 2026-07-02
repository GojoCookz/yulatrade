"use client";

import { useState } from "react";
import {
  Target,
  Search,
  RefreshCcw,
  Zap,
  BarChart3,
  Sparkles,
  Star,
  Users,
  Copy as CopyIcon,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Discover leaderboard data (public trader stats, like the real       */
/* Discover tab — not the user's own portfolio)                        */
/* ------------------------------------------------------------------ */

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
];

type Tab = "targets" | "performance" | "discover";

export default function CopyClient() {
  const [tab, setTab] = useState<Tab>("targets");
  const [walletQuery, setWalletQuery] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const toggleCopy = (wallet: string) => setCopied((p) => ({ ...p, [wallet]: !p[wallet] }));

  const refresh = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
  };

  const tabs = [
    { id: "targets" as const, label: "My Targets", icon: Zap },
    { id: "performance" as const, label: "Performance", icon: BarChart3 },
    { id: "discover" as const, label: "Discover", icon: Sparkles },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-4 lg:px-6">
        <div>
          <h1 className="flex items-center gap-2 text-lg font-bold text-white">
            <Target className="h-4.5 w-4.5 h-[18px] w-[18px] text-emerald-400" />
            Copy Trading
          </h1>
          <p className="mt-0.5 text-xs text-white/40">Auto-mirror trades from top Polymarket wallets</p>
        </div>
        <button onClick={refresh} className="text-white/30 hover:text-white transition" aria-label="Refresh">
          <RefreshCcw className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Wallet search */}
      <div className="flex items-center gap-2 px-4 pt-4 lg:px-6">
        <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-white/[0.13] bg-white/[0.02] px-3.5 py-2.5">
          <Search className="h-4 w-4 text-white/30" />
          <input
            value={walletQuery}
            onChange={(e) => setWalletQuery(e.target.value)}
            placeholder="Search any wallet address to copy (0x...)"
            className="flex-1 bg-transparent font-mono text-xs text-white/80 placeholder:text-white/25 outline-none"
          />
        </div>
        <button
          className={`rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
            walletQuery.trim()
              ? "bg-emerald-500 text-white hover:bg-emerald-400"
              : "bg-emerald-500/20 text-emerald-300/60 cursor-default"
          }`}
        >
          Look Up
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex items-center gap-6 border-b border-white/[0.08] px-4 text-xs lg:px-6">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 border-b-2 pb-2.5 transition ${
                active
                  ? "border-emerald-500 font-semibold text-white"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {tab === "targets" && (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08]">
              <Target className="h-6 w-6 text-emerald-400" />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">No copy targets yet</p>
            <p className="mt-1 text-xs text-white/40">Search for a wallet above or browse the leaderboard</p>
            <button
              onClick={() => setTab("discover")}
              className="mt-5 flex items-center gap-1.5 rounded-lg border border-emerald-500/40 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/10 transition"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Browse Top Traders
            </button>
          </div>
        )}

        {tab === "performance" && (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
              <BarChart3 className="h-6 w-6 text-white/30" />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">No performance data yet</p>
            <p className="mt-1 text-xs text-white/40">Add copy targets to start tracking mirrored P&L</p>
          </div>
        )}

        {tab === "discover" && (
          <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3 lg:px-6">
            {TRADERS.map((t) => (
              <div key={t.wallet} className="group rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-4 transition hover:border-emerald-500/30">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-bold text-white">{t.alias ?? t.wallet}</p>
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
                    <p className="text-base font-bold text-green-400">+${(t.pnl30d / 1000).toFixed(1)}K</p>
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
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {t.followers.toLocaleString()}</span>
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
                  className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-bold transition ${
                    copied[t.wallet]
                      ? "bg-green-500/20 text-green-300 ring-1 ring-green-500/40"
                      : "bg-emerald-500 text-white hover:bg-emerald-400"
                  }`}
                >
                  {copied[t.wallet] ? (
                    <><Check className="h-3.5 w-3.5" /> Copying</>
                  ) : (
                    <><CopyIcon className="h-3.5 w-3.5" /> Copy Wallet</>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
