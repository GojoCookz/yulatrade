"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const markets = [
  {
    flag: "🇺🇦",
    title: "Russia x Ukraine ceasefire",
    yes: 96,
    no: 4,
    volume: "$128.7M",
  },
  {
    flag: "🇺🇸",
    title: "US x Iran peace deal",
    yes: 73,
    no: 27,
    volume: "$87.9M",
  },
  {
    flag: "🇯🇵",
    title: "Japan FIFA World Cup",
    yes: 98,
    no: 2,
    volume: "$81.3M",
  },
];

export default function MarketsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-4 py-24 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-5xl transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">What&apos;s trading now</h2>
          </div>
          <span className="flex items-center gap-2 text-sm text-white/50">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Real-time
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-[#0d1410] p-5 transition-colors hover:border-white/20"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-md bg-white/5 px-2 py-0.5 text-lg">{market.flag}</span>
              </div>
              <h3 className="mb-4 text-sm font-semibold leading-tight">{market.title}</h3>
              <div className="mb-1 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              </div>
              <div className="mb-3 flex items-center gap-4">
                <div>
                  <span className="text-xs text-white/40">YES </span>
                  <span className="text-lg font-bold text-green-400">{market.yes}c</span>
                </div>
                <div>
                  <span className="text-xs text-white/40">NO </span>
                  <span className="text-lg font-bold text-red-400">{market.no}c</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>{market.volume} Vol.</span>
                <span>24h</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            View all markets
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
