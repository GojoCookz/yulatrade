"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-5xl text-center transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Your unfair advantage on{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
            Polymarket
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          While you&apos;re placing orders on Polymarket, someone faster already took the other
          side. That someone could be you.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            <Zap className="h-4 w-4" />
            Start Trading Free
          </Link>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Telegram Bot
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Browser mockup */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1410]">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
                yula.trade/terminal
              </div>
            </div>
            {/* Content area */}
            <div className="flex h-64 flex-col items-center justify-center gap-4 sm:h-80">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
                <Play className="h-6 w-6 text-emerald-400" />
              </div>
              <p className="text-sm text-white/40">Terminal Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
