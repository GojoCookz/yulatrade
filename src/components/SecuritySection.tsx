"use client";

import { useEffect, useRef, useState } from "react";
import { User, Lock, BarChart3 } from "lucide-react";

export default function SecuritySection() {
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
          Your keys. Your funds. Period.
        </h2>

        <div className="rounded-xl border border-white/10 bg-[#0d1410] p-8 sm:p-12">
          <h3 className="mb-4 text-xl font-semibold">Non-Custodial Wallets</h3>
          <p className="mb-10 max-w-xl text-white/60">
            Your private keys are generated and stored inside Turnkey&apos;s hardware security
            modules (HSMs). They never leave the secure enclave — not even Yula can access them.
          </p>

          {/* Diagram */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-0">
            {/* You */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5">
                <User className="h-6 w-6 text-white/70" />
              </div>
              <span className="text-xs text-white/50">You</span>
            </div>

            {/* Arrow */}
            <div className="hidden h-px w-16 border-t border-dashed border-white/20 sm:block" />
            <div className="block h-8 w-px border-l border-dashed border-white/20 sm:hidden" />

            {/* Turnkey HSM */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-500/50 bg-green-500/10">
                <Lock className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-xs text-white/50">Turnkey HSM</span>
            </div>

            {/* Arrow */}
            <div className="hidden h-px w-16 border-t border-dashed border-white/20 sm:block" />
            <div className="block h-8 w-px border-l border-dashed border-white/20 sm:hidden" />

            {/* Polymarket */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5">
                <BarChart3 className="h-6 w-6 text-white/70" />
              </div>
              <span className="text-xs text-white/50">PM</span>
            </div>
          </div>

          <p className="mt-8 text-center font-mono text-sm text-green-400">
            Keys never leave the hardware enclave
          </p>
        </div>
      </div>
    </section>
  );
}
