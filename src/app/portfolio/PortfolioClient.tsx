"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RefreshCcw,
  Trophy,
  Calendar,
  Search,
  Settings,
  Plus,
  Copy as CopyIcon,
  MoreHorizontal,
  ArrowDownToLine,
  ArrowUpDown,
  Inbox,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function EmptyState({ title, subtitle, cta }: { title: string; subtitle: string; cta?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="rounded-full bg-white/[0.04] p-4">
        <Inbox className="h-6 w-6 text-white/30" />
      </div>
      <p className="mt-3 text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-white/40">{subtitle}</p>
      {cta && (
        <Link
          href="/trending"
          className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-400 transition"
        >
          Discover Markets
        </Link>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio tab                                                       */
/* ------------------------------------------------------------------ */

function PortfolioView() {
  const [pnlPeriod, setPnlPeriod] = useState<"7D" | "30D" | "90D" | "All">("30D");
  const [bottomTab, setBottomTab] = useState<"positions" | "trades" | "orders">("positions");
  const [spinning, setSpinning] = useState(false);

  const refresh = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
  };

  const distribution = [
    { label: "> 100%", dot: "bg-green-400" },
    { label: "0 – 100%", dot: "bg-yellow-400" },
    { label: "0 – -50%", dot: "bg-rose-400" },
    { label: "< -50%", dot: "bg-red-500" },
  ];

  return (
    <>
      {/* Top three-panel section */}
      <div className="grid grid-cols-1 gap-px border-b border-white/5 bg-white/[0.03] lg:grid-cols-[260px_1fr_280px]">
        {/* Balance */}
        <div className="bg-[#050505] p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Balance</p>
            <button onClick={refresh} className="text-white/30 hover:text-white transition" aria-label="Refresh balance">
              <RefreshCcw className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`} />
            </button>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">$0.00</p>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/40">Tradeable</span>
              <span className="font-semibold text-white">$0.00 <span className="font-normal text-white/30">USDC</span></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">Invested</span>
              <span className="text-white/80">$0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">Positions</span>
              <span className="font-semibold text-white">0</span>
            </div>
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2.5 text-xs font-bold text-white hover:bg-emerald-400 transition">
            <Trophy className="h-3.5 w-3.5" />
            Claim Winnings
          </button>
        </div>

        {/* Realized PNL */}
        <div className="bg-[#050505] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Realized PNL</p>
            <div className="flex items-center gap-1">
              {(["7D", "30D", "90D", "All"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPnlPeriod(p)}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition ${
                    pnlPeriod === p ? "bg-emerald-500 text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="mx-1 h-3 w-px bg-white/10" />
              <button className="text-white/40 hover:text-white transition" aria-label="PNL Calendar">
                <Calendar className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-white/[0.04] bg-white/[0.01] lg:h-48">
            <p className="text-xs text-white/30">No PnL data yet — start trading</p>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-[#050505] p-5">
          <p className="text-[10px] uppercase tracking-wider text-white/40">Performance</p>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/40">Total PnL</span>
              <span className="font-semibold text-green-400">+$0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">Win Rate</span>
              <span className="text-white/80">0.0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">Total Trades</span>
              <span className="text-white/80">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">Profit Factor</span>
              <span className="text-white/80">0.00x</span>
            </div>
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-wider text-white/40">Return Distribution</p>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
            {distribution.map((d) => (
              <div key={d.label} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-white/50">
                  <span className={`h-1.5 w-1.5 rounded-full ${d.dot}`} />
                  {d.label}
                </span>
                <span className="text-white/70">0</span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full">
            <div className="w-3/5 bg-green-500/70" />
            <div className="w-1/5 bg-yellow-500/70" />
            <div className="w-1/5 bg-red-500/70" />
          </div>
        </div>
      </div>

      {/* Bottom tabs */}
      <div className="flex items-center gap-5 border-b border-white/5 px-4 text-xs lg:px-5">
        {(
          [
            { id: "positions", label: "Active positions (0)" },
            { id: "trades", label: "Trades" },
            { id: "orders", label: "Open orders (0)" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setBottomTab(t.id)}
            className={`whitespace-nowrap border-b-2 pb-2.5 pt-3 transition ${
              bottomTab === t.id
                ? "border-emerald-500 font-semibold text-white"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        {bottomTab === "positions" && (
          <EmptyState title="No open positions" subtitle="Browse markets to start trading" cta />
        )}
        {bottomTab === "trades" && (
          <EmptyState title="No trades yet" subtitle="Your executed trades will appear here" cta />
        )}
        {bottomTab === "orders" && (
          <EmptyState title="No open orders" subtitle="Limit orders you place will appear here" />
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Wallets tab                                                         */
/* ------------------------------------------------------------------ */

function WalletsView() {
  const [walletSearch, setWalletSearch] = useState("");
  const mainWalletVisible = "main trading".includes(walletSearch.trim().toLowerCase()) || !walletSearch.trim();

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 overflow-auto p-4 lg:grid-cols-[1fr_320px]">
      {/* Your wallets */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0d1410]/40 p-5 self-start">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-white">Your wallets</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1.5">
              <Search className="h-3 w-3 text-white/30" />
              <input
                value={walletSearch}
                onChange={(e) => setWalletSearch(e.target.value)}
                placeholder="Search by name or address..."
                className="w-40 bg-transparent text-[11px] text-white/80 placeholder:text-white/25 outline-none"
              />
            </div>
            <button className="text-white/30 hover:text-white transition" aria-label="Wallet settings">
              <Settings className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Trading wallets */}
        <div className="mt-5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-white">
            Trading Wallets
            <span className="rounded-full bg-white/[0.06] px-1.5 text-[10px] text-white/50">1</span>
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-white/30">
                  <th className="py-2 text-left font-medium">Wallet</th>
                  <th className="py-2 text-right font-medium">Balance</th>
                  <th className="py-2 text-right font-medium">Holdings</th>
                  <th className="py-2 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mainWalletVisible && (
                  <tr className="border-t border-white/[0.04]">
                    <td className="py-2.5">
                      <p className="font-semibold text-white">Main Trading</p>
                      <p className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-white/30">
                        0x8Fc4...b21A
                        <button className="hover:text-white/70 transition" aria-label="Copy address">
                          <CopyIcon className="h-2.5 w-2.5" />
                        </button>
                      </p>
                    </td>
                    <td className="py-2.5 text-right font-mono text-white/80">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                        0.00
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-white/50">0 positions</td>
                    <td className="py-2.5 text-right">
                      <button className="text-white/30 hover:text-white transition" aria-label="Wallet actions">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Withdrawal wallets */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-white">
              Withdrawal Wallets
              <span className="rounded-full bg-white/[0.06] px-1.5 text-[10px] text-white/50">0</span>
            </p>
            <button className="flex items-center gap-1 rounded-md border border-white/10 px-2.5 py-1 text-[11px] text-white/60 hover:bg-white/[0.05] transition">
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
          <p className="mt-6 pb-4 text-center text-xs text-white/30">
            You don&apos;t have any withdrawal wallets
          </p>
        </div>
      </div>

      {/* Transfer assets */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0d1410]/40 p-5 self-start">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Transfer assets</h2>
          <button className="flex items-center gap-1 rounded-md border border-white/10 px-2.5 py-1 text-[11px] text-white/60 hover:bg-white/[0.05] transition">
            <ArrowUpDown className="h-3 w-3" /> Transfer
          </button>
        </div>

        <p className="mt-5 text-xs font-semibold text-white">Quick Actions</p>
        <div className="mt-2 space-y-2">
          <button className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-xs text-white/70 hover:bg-white/[0.05] hover:text-white transition">
            <ArrowDownToLine className="h-3.5 w-3.5" />
            Deposit USDC
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-xs text-white/70 hover:bg-white/[0.05] hover:text-white transition">
            <ArrowUpDown className="h-3.5 w-3.5" />
            Withdraw USDC
          </button>
        </div>

        <p className="mt-5 text-xs font-semibold text-white">Wallet Info</p>
        <p className="mt-2 text-xs text-white/30">No wallet loaded</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export default function PortfolioClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") === "wallets" ? "wallets" : "portfolio";

  const setTab = (t: "portfolio" | "wallets") => {
    router.replace(t === "wallets" ? "/portfolio?tab=wallets" : "/portfolio", { scroll: false });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Page tabs */}
      <div className="flex items-center justify-between px-4 pt-3 lg:px-5">
        <div className="flex items-center gap-6">
          {(
            [
              { id: "portfolio", label: "Portfolio" },
              { id: "wallets", label: "Wallets" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`border-b-2 pb-2 text-lg font-bold transition ${
                tab === t.id
                  ? "border-emerald-500 text-white"
                  : "border-transparent text-white/30 hover:text-white/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[11px] sm:flex">
          <ArrowUpDown className="h-3 w-3 text-white/30" />
          <span className="text-white/60">Starting Wallet</span>
          <span className="text-white/35">$0.00</span>
        </div>
      </div>

      {tab === "portfolio" ? <PortfolioView /> : <WalletsView />}
    </div>
  );
}
