"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-4 py-24 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="mb-8 text-3xl font-bold sm:text-4xl lg:text-5xl">
          Stop watching. Start trading.
        </h2>
        <Link
          href="/trending"
          className="inline-block rounded-xl bg-emerald-500 px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Open Terminal
        </Link>
        <p className="mt-4 text-sm text-white/40">
          Free. No signup. Sub-50ms execution.
        </p>
      </div>
    </section>
  );
}
