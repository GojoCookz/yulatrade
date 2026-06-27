"use client";

import { useEffect, useRef, useState } from "react";

export default function TelegramSection() {
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
        className={`mx-auto grid max-w-5xl gap-12 transition-all duration-700 lg:grid-cols-2 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Text */}
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#229ED9]/30 bg-[#229ED9]/10 px-3 py-1 text-xs font-medium text-[#229ED9]">
            Telegram Bot — Coming Soon
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Your terminal, in a chat</h2>
          <p className="mb-6 text-white/60">No app. No tab. Open Telegram and trade.</p>
          <ul className="mb-6 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              /buy /sell /limit execution
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              Price alerts
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              Portfolio tracking
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              Copy trading
            </li>
          </ul>
          <a href="#" className="text-sm text-[#229ED9] hover:underline">
            Open in Telegram &rarr;
          </a>
        </div>

        {/* Phone mockup */}
        <div className="flex items-center justify-center">
          <div className="w-72 overflow-hidden rounded-3xl border border-white/10 bg-[#0d1410]">
            {/* Phone header */}
            <div className="border-b border-white/10 bg-[#0d1410] px-4 py-3">
              <p className="text-sm font-semibold">Yula Trade Bot</p>
              <p className="text-xs text-green-400">online</p>
            </div>
            {/* Chat messages */}
            <div className="flex flex-col gap-3 p-4">
              <div className="self-end rounded-2xl rounded-br-sm bg-[#229ED9] px-3 py-2 text-xs text-white">
                /buy Trump 2028 100 shares
              </div>
              <div className="self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-xs text-white/80">
                Bought 100 shares YES @ 67c<br />
                Total: $67.00<br />
                Filled in 38ms
              </div>
              <div className="self-end rounded-2xl rounded-br-sm bg-[#229ED9] px-3 py-2 text-xs text-white">
                /portfolio
              </div>
              <div className="self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-xs text-white/80">
                Active positions: 3<br />
                Total value: $1,240.00<br />
                P&L: +$187.50
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
