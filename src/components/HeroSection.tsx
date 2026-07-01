"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

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

      </div>
    </section>
  );
}
