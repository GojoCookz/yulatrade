"use client";

import { useEffect, useRef, useState } from "react";

export default function SpeedComparisonSection() {
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
        <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
          67c when you saw it. 72c when your order hit.
        </h2>

        <div className="flex flex-col items-center gap-6 lg:flex-row">
          {/* Polymarket card */}
          <div className="flex-1 rounded-xl border border-white/10 bg-[#0d1410] p-6">
            <div className="mb-4 text-sm font-medium text-white/50">Polymarket</div>
            <p className="mb-2 text-lg font-semibold">Will Trump win the 2028 election?</p>
            <p className="mb-1 text-3xl font-bold">67c</p>
            <p className="mb-4 text-sm text-white/50">1,000 shares x 67c = $670.00</p>
            <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-400">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              Waiting for confirmation...
            </div>
          </div>

          {/* VS circle */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0d1410] text-sm font-bold text-white/60">
            vs
          </div>

          {/* Yula card */}
          <div className="flex-1 rounded-xl border border-emerald-500/30 bg-[#0d1410] p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-white/50">Yula</span>
              <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Live
              </span>
            </div>
            <p className="mb-2 text-lg font-semibold">Will Trump win the 2028 election?</p>
            <p className="mb-1 text-3xl font-bold">67c</p>
            <p className="mb-4 text-sm text-white/50">1,000 shares x 67c = $670.00</p>
            <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Executing...
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-white/60">
            Same market. Same moment. One paid $50 extra. One didn&apos;t.
          </p>
          <p className="mt-2 text-sm font-medium text-emerald-400">
            The difference was 43 milliseconds.
          </p>
        </div>
      </div>
    </section>
  );
}
