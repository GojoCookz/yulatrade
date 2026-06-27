"use client";

import { useState } from "react";
import Link from "next/link";
import { Wallet, Plus, Download, RefreshCcw, Inbox } from "lucide-react";

type Tab = "positions" | "history" | "open" | "pnl";

// No fabricated data — a fresh / signed-out account has nothing yet.
const positions: never[] = [];
const history: never[] = [];

function EmptyState({
  title,
  subtitle,
  cta,
}: {
  title: string;
  subtitle: string;
  cta?: boolean;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
      <div className="rounded-full bg-white/[0.04] p-4">
        <Inbox className="h-6 w-6 text-white/30" />
      </div>
      <p className="mt-3 text-sm text-white/60">{title}</p>
      <p className="mt-1 text-xs text-white/40">{subtitle}</p>
      {cta && (
        <Link
          href="/browse"
          className="mt-4 rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-400 transition"
        >
          Browse Markets
        </Link>
      )}
    </div>
  );
}

export default function PortfolioClient() {
  const [tab, setTab] = useState<Tab>("positions");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header / wallet summary */}
      <div className="border-b border-white/5 px-4 py-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-lg font-bold text-white">
              <Wallet className="h-4 w-4 text-emerald-400" />
              Portfolio
            </h1>
            <p className="mt-0.5 text-xs text-white/40">Track positions, P&L, and trade history</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.05] sm:flex">
              <RefreshCcw className="h-3 w-3" /> Refresh
            </button>
            <button className="hidden items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.05] sm:flex">
              <Download className="h-3 w-3" /> Export
            </button>
            <button className="flex items-center gap-1 rounded-md bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25">
              <Plus className="h-3 w-3" /> Deposit
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Total Value</p>
            <p className="mt-1 text-xl font-bold text-white">$0.00</p>
            <p className="mt-0.5 text-[10px] text-white/40">no positions</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Total P&L</p>
            <p className="mt-1 text-xl font-bold text-white">$0.00</p>
            <p className="mt-0.5 text-[10px] text-white/40">all-time</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#0d1410]/60 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Win Rate</p>
            <p className="mt-1 text-xl font-bold text-white/70">—</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
              <div className="h-full bg-white/10" style={{ width: "0%" }} />
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
      <div className="border-b border-white/5 px-4 md:px-6">
        <div className="flex items-center gap-5 overflow-x-auto text-xs">
          {(
            [
              { id: "positions", label: "Positions" },
              { id: "history", label: "History" },
              { id: "open", label: "Open Orders" },
              { id: "pnl", label: "P&L Chart" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`whitespace-nowrap pb-3 pt-3 transition ${
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
          positions.length === 0 ? (
            <EmptyState title="No open positions" subtitle="Connect a wallet and place a trade to see your positions here." cta />
          ) : null
        )}
        {tab === "history" && (
          history.length === 0 ? (
            <EmptyState title="No trade history" subtitle="Your past trades will appear here once you start trading." cta />
          ) : null
        )}
        {tab === "open" && (
          <EmptyState title="No open orders" subtitle="Limit orders you place will appear here." />
        )}
        {tab === "pnl" && (
          <EmptyState title="No P&L data yet" subtitle="Your profit & loss chart builds up as you trade." />
        )}
      </div>
    </div>
  );
}
