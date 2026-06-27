"use client";

import { useState } from "react";
import { Gift, Copy as CopyIcon, Check, Share2, X as TwitterX, Send } from "lucide-react";

const referrals = [
  { wallet: "0x9012...88ab", joined: "2 days ago", volume: "$2,340", earned: 11.7, status: "Active" },
  { wallet: "0xa221...f0b7", joined: "5 days ago", volume: "$1,820", earned: 9.1, status: "Active" },
  { wallet: "0x331a...e451", joined: "1 week ago", volume: "$5,210", earned: 26.05, status: "Active" },
  { wallet: "0xbf21...cc81", joined: "2 weeks ago", volume: "$890", earned: 4.45, status: "Active" },
  { wallet: "0x2c01...51ef", joined: "3 weeks ago", volume: "$240", earned: 1.2, status: "Idle" },
  { wallet: "0x4d11...77f2", joined: "1 month ago", volume: "$9,140", earned: 45.7, status: "Active" },
];

export default function ReferralsClient() {
  const [refLink] = useState("https://yula.trade/r/YULA-7A6C");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const totalReferred = referrals.length;
  const totalVolume = referrals.reduce((a, r) => a + Number(r.volume.replace(/[^0-9.]/g, "")), 0);
  const totalEarned = referrals.reduce((a, r) => a + r.earned, 0);

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="border-b border-white/5 px-6 py-5">
        <h1 className="flex items-center gap-2 text-lg font-bold text-white">
          <Gift className="h-4 w-4 text-emerald-400" />
          Referrals
        </h1>
        <p className="mt-0.5 text-xs text-white/40">Earn 0.5% commission on every trade your referrals make. Forever.</p>
      </div>

      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Link card */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-900/5 p-5">
            <p className="text-[10px] uppercase tracking-wider text-emerald-300">Your referral link</p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 truncate rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 font-mono text-sm text-white">
                {refLink}
              </code>
              <button
                onClick={copy}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                  copied ? "bg-green-500/20 text-green-300" : "bg-emerald-500 text-white hover:bg-emerald-500"
                }`}
              >
                {copied ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.05]">
                <TwitterX className="h-3.5 w-3.5" /> Share on X
              </button>
              <button className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.05]">
                <Send className="h-3.5 w-3.5" /> Share on Telegram
              </button>
              <button className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.05]">
                <Share2 className="h-3.5 w-3.5" /> More
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg border border-white/[0.06] bg-black/20 p-3 text-xs">
              <div>
                <p className="text-white/40">Your tier</p>
                <p className="mt-0.5 font-bold text-emerald-200">Tier 1 · 0.5%</p>
              </div>
              <div>
                <p className="text-white/40">Next tier</p>
                <p className="mt-0.5 font-bold text-white">Tier 2 · 0.75%</p>
              </div>
              <div>
                <p className="text-white/40">Progress</p>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full bg-emerald-400" style={{ width: "42%" }} />
                </div>
                <p className="mt-0.5 text-[10px] text-white/40">$58K / $100K referred volume</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats stack */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-4">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Referred Users</p>
            <p className="mt-1 text-2xl font-bold text-white">{totalReferred}</p>
            <p className="mt-0.5 text-[10px] text-green-400">+3 this week</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#0d1410]/60 p-4">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Referred Volume</p>
            <p className="mt-1 text-2xl font-bold text-white">${(totalVolume / 1000).toFixed(2)}K</p>
            <p className="mt-0.5 text-[10px] text-green-400">+$340 / 24h</p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-wider text-emerald-300">Commission Earned</p>
            <p className="mt-1 text-2xl font-bold text-emerald-300">${totalEarned.toFixed(2)}</p>
            <p className="mt-0.5 text-[10px] text-white/40">all-time</p>
          </div>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-wider text-yellow-300">Pending Payout</p>
            <p className="mt-1 text-2xl font-bold text-yellow-300">$24.18</p>
            <button className="mt-1 text-[10px] text-yellow-300/80 hover:text-yellow-200 underline">Claim →</button>
          </div>
        </div>

        {/* Table */}
        <div className="col-span-12 rounded-xl border border-white/[0.06] bg-[#0d1410]/40 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
            <h2 className="text-sm font-semibold text-white">Recent Referrals</h2>
            <button className="text-[11px] text-emerald-300 hover:underline">View all</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-white/35">
                <th className="px-4 py-2 text-left font-medium">Wallet</th>
                <th className="px-3 py-2 text-left font-medium">Joined</th>
                <th className="px-3 py-2 text-right font-medium">Volume</th>
                <th className="px-3 py-2 text-right font-medium">You Earned</th>
                <th className="px-3 py-2 text-center font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r, i) => (
                <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5 font-mono text-emerald-300">{r.wallet}</td>
                  <td className="px-3 py-2.5 text-white/60">{r.joined}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-white">{r.volume}</td>
                  <td className="px-3 py-2.5 text-right font-mono font-semibold text-emerald-300">${r.earned.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      r.status === "Active" ? "bg-green-500/15 text-green-400" : "bg-white/[0.06] text-white/50"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
