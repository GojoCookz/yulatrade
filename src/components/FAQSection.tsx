"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "Is Yula free?",
    answer:
      "Yes. No subscription, no platform fee. You pay standard Polymarket trading fees only.",
  },
  {
    question: "Do I need a Polymarket account?",
    answer:
      "Yes. Yula connects to your Polymarket account. You'll need one to place trades.",
  },
  {
    question: "How do I fund my account?",
    answer:
      "Deposit USDC to your Yula wallet. We support deposits from any major exchange or wallet.",
  },
  {
    question: "How fast is execution?",
    answer:
      "Sub-50 milliseconds. Our infrastructure co-locates with Polymarket's matching engine for minimal latency.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        {/* Left */}
        <div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Common questions</h2>
          <p className="text-white/50">Everything you need to know.</p>
        </div>

        {/* Right — Accordion */}
        <div className="flex flex-col divide-y divide-white/10">
          {faqs.map((faq, i) => (
            <div key={i} className="py-4">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium">{faq.question}</span>
                {openIndex === i ? (
                  <X className="h-4 w-4 shrink-0 text-white/50" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-white/50" />
                )}
              </button>
              {openIndex === i && (
                <p className="mt-3 text-sm leading-relaxed text-white/50">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
