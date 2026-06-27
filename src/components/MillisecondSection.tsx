"use client";

import { useEffect, useRef, useState } from "react";

export default function MillisecondSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    if (!visible) return;
    const target = 0.043;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section ref={ref} className="px-4 py-24 sm:px-6 lg:px-8">
      <div
        className={`mx-auto grid max-w-5xl gap-12 transition-all duration-700 lg:grid-cols-2 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Counter */}
        <div className="flex flex-col items-center justify-center lg:items-start">
          <span className="font-mono text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            {count.toFixed(3)}
          </span>
          <span className="mt-2 text-lg text-white/40">seconds</span>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            That&apos;s the difference between your price and someone else&apos;s.
          </h2>
          <p className="text-white/60 leading-relaxed">
            The trader who got filled at 67c in the last section? That was 43 milliseconds before
            the price moved to 72c. In prediction markets, speed isn&apos;t a feature — it&apos;s
            the entire edge. Our infrastructure co-locates with Polymarket&apos;s matching engine,
            giving you sub-50ms execution while everyone else waits.
          </p>
        </div>
      </div>
    </section>
  );
}
