"use client";

import { useState } from "react";
import { Filter, RefreshCw, Search, Zap } from "lucide-react";

const timeFilters = ["1m", "3m", "5m", "1h", "6h", "24h", "7D"] as const;

export default function FilterBar() {
  const [activeTime, setActiveTime] = useState<string>("24h");

  return (
    <div className="flex items-center justify-between border-b border-white/5 bg-[#050505] px-3 py-2">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-bold text-white">Trending</h1>

        <div className="flex items-center gap-0.5 rounded-lg bg-white/5 p-0.5">
          {timeFilters.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTime(tf)}
              className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors ${
                activeTime === tf
                  ? "bg-emerald-500/80 text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-white/50 hover:text-white/70 transition-colors">
          <Filter className="h-3 w-3" />
          Filter
        </button>

        <button className="text-white/40 hover:text-white/70 transition-colors">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-green-400">LIVE</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1">
          <Search className="h-3 w-3 text-white/40" />
          <input
            type="text"
            placeholder="Search markets..."
            className="w-28 bg-transparent text-[11px] text-white/80 placeholder:text-white/30 outline-none"
          />
        </div>

        <button className="flex items-center gap-1 rounded-md bg-yellow-500/20 px-2.5 py-1 text-[10px] font-semibold text-yellow-400 hover:bg-yellow-500/30 transition-colors">
          <Zap className="h-3 w-3" />
          Quick Buy $
        </button>
      </div>
    </div>
  );
}
