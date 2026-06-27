"use client";

import { Wallet, BarChart3, Gift, Send, VolumeX, Smile } from "lucide-react";

export default function StatusBar() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 hidden h-7 items-center justify-between border-t border-white/5 bg-[#080114] px-3 text-[10px] lg:flex">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-green-400">Connected</span>
        </div>
        <button className="flex items-center gap-1 text-white/40 hover:text-white/60 transition">
          <Wallet className="h-3 w-3" />
          Wallets
        </button>
        <button className="flex items-center gap-1 text-white/40 hover:text-white/60 transition">
          <BarChart3 className="h-3 w-3" />
          Trenches
        </button>
        <button className="flex items-center gap-1 text-white/40 hover:text-white/60 transition">
          <Gift className="h-3 w-3" />
          Referrals
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-3 text-white/30">
        <span className="flex items-center gap-1">
          <BarChart3 className="h-2.5 w-2.5" />
          186.4K <span className="text-white/20">markets</span>
        </span>
        <span className="text-white/10">·</span>
        <span className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 10 10" className="inline-block">
            <polygon points="5,0 10,5 5,10 0,5" fill="#f59e0b" />
          </svg>
          39 <span className="text-white/20">Gwei</span>
        </span>
        <span className="text-white/10">·</span>
        <span className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 10 10" className="inline-block">
            <polygon points="5,0 10,5 5,10 0,5" fill="#8247e5" />
          </svg>
          Polygon
        </span>
      </div>

      <div className="flex items-center gap-3 text-white/30">
        <a href="#" className="hover:text-white/50 transition" aria-label="Telegram">
          <Send className="h-3 w-3" />
        </a>
        <a href="#" className="hover:text-white/50 transition font-bold" aria-label="X">
          X
        </a>
        <button className="hover:text-white/50 transition" aria-label="Mute">
          <VolumeX className="h-3 w-3" />
        </button>
        <button className="hover:text-white/50 transition" aria-label="Feedback">
          <Smile className="h-3 w-3" />
        </button>
        <a href="#" className="hover:text-white/50 transition">Docs</a>
        <a href="#" className="hover:text-white/50 transition">Terms</a>
        <a href="#" className="hover:text-white/50 transition">Privacy</a>
        <span className="text-white/20">v2.1.0</span>
      </div>
    </footer>
  );
}
