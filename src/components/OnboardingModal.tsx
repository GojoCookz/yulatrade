"use client";

import { useState } from "react";
import {
  X,
  Key,
  Shield,
  AlertTriangle,
  Mail as MailIcon,
  Copy,
  BarChart3,
  Users,
  Bell,
  Eye,
  Trophy,
  Globe,
  Briefcase,
  Microscope,
  Smartphone,
  Diamond,
  Music,
  LayoutGrid,
  Layers,
} from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "politics", label: "Politics", icon: LayoutGrid },
  { id: "crypto", label: "Crypto", icon: Layers },
  { id: "culture", label: "Culture", icon: Music },
  { id: "world", label: "World", icon: Globe },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "science", label: "Science", icon: Microscope },
  { id: "tech", label: "Tech", icon: Smartphone },
  { id: "esports", label: "Esports", icon: Diamond },
];

const TOTAL_STEPS = 5;

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="absolute left-0 right-0 top-0 flex gap-1.5 px-6 pt-4">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              i < step ? "bg-green-500 w-full" : i === step ? "bg-emerald-500 w-full" : "w-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [walletAcknowledged, setWalletAcknowledged] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["sports", "politics"]);

  if (!isOpen) return null;

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else handleClose();
  };

  const handleClose = () => {
    setStep(0);
    setWalletAcknowledged(false);
    onClose();
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0f0820]"
        onClick={(e) => e.stopPropagation()}
      >
        <ProgressBar step={step} />

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 text-white/40 transition hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Step 0: Your Wallet */}
        {step === 0 && (
          <div className="flex flex-col">
            <div className="px-8 pb-2 pt-12">
              <div className="flex h-72 flex-col items-center justify-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/40 to-emerald-900/40">
                  <Key className="h-7 w-7 text-emerald-400" />
                </div>
                <div className="w-full rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                    Your Wallet Address
                  </p>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed">
                    Your wallet is secured by Turnkey. The private key is not directly exportable.
                  </p>
                </div>
                <p className="text-center text-xs text-white/40 leading-relaxed">
                  Your wallet key is managed securely. Keep your account
                  <br />
                  credentials safe.
                </p>
              </div>
            </div>
            <div className="border-t border-white/5 px-6 pb-6 pt-4">
              <h3 className="text-base font-semibold text-white">Your Wallet</h3>
              <p className="mt-1 text-xs text-white/50">
                Your wallet is secured and ready to use. Save your address for reference.
              </p>
              <label className="mt-4 flex items-center gap-2 text-xs text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={walletAcknowledged}
                  onChange={(e) => setWalletAcknowledged(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-500"
                />
                I&apos;ve noted my wallet address
              </label>
              <button
                onClick={next}
                disabled={!walletAcknowledged}
                className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Choose Your Markets */}
        {step === 1 && (
          <div className="flex flex-col">
            <div className="px-6 pt-12 pb-2">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                Pick What Interests You
              </p>
              <div className="mt-4 grid h-72 grid-cols-3 gap-2 content-start">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const selected = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-xs font-medium transition ${
                        selected
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                          : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-white/5 px-6 pb-6 pt-4">
              <h3 className="text-base font-semibold text-white">Choose Your Markets</h3>
              <p className="mt-1 text-xs text-white/50">
                We&apos;ll personalize your feed. Change anytime in settings.
              </p>
              <button
                onClick={next}
                className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Continue
              </button>
              <button
                onClick={next}
                className="mt-2 w-full text-xs text-white/40 hover:text-white/60 transition"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Keep Your Account Safe */}
        {step === 2 && (
          <div className="flex flex-col">
            <div className="px-6 pt-12 pb-2">
              <div className="flex h-72 flex-col gap-4 overflow-y-auto">
                {[
                  { icon: Key, title: "Never share your private key", desc: "Your key is the only way to recover your wallet. Keep it offline and never paste it into websites or messages." },
                  { icon: AlertTriangle, title: "Beware malicious extensions", desc: "Browser extensions can read and modify page content. Disable untrusted extensions when trading." },
                  { icon: Shield, title: "Verify you're on yula.trade", desc: "Bookmark the real site. Phishing clones look identical but steal your credentials and drain wallets." },
                  { icon: MailIcon, title: "Enable email verification", desc: "Login codes sent to your email add a second layer of protection beyond your password." },
                ].map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <div key={tip.title} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{tip.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-white/50">{tip.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-white/5 px-6 pb-6 pt-4">
              <h3 className="text-base font-semibold text-white">Keep Your Account Safe</h3>
              <p className="mt-1 text-xs text-white/50">
                Important practices to protect your funds on Yula.
              </p>
              <button
                onClick={next}
                className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Fund Your Wallet */}
        {step === 3 && (
          <div className="flex flex-col">
            <div className="px-6 pt-12 pb-2">
              <div className="flex h-72 flex-col items-center justify-center gap-3">
                <div className="text-center">
                  <p>
                    <span className="text-3xl font-bold text-white">$0.00</span>{" "}
                    <span className="text-sm font-medium text-white/50">USDC</span>
                  </p>
                  <p className="mt-1 text-xs text-white/40">Current balance</p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
                  <Layers className="h-3 w-3 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-300">Polygon Network</span>
                </div>
                <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-white">
                  <div className="grid h-20 w-20 grid-cols-8 gap-px">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <span className="flex-1 truncate font-mono text-xs text-white/40">—</span>
                  <button className="text-white/40 hover:text-white transition">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-center text-[11px] leading-relaxed text-white/40">
                  Send <span className="font-semibold text-white/70">USDC</span> on{" "}
                  <span className="font-semibold text-white/70">Polygon</span> only.
                  <br />
                  Other tokens or networks will be permanently lost.
                </p>
              </div>
            </div>
            <div className="border-t border-white/5 px-6 pb-6 pt-4">
              <h3 className="text-base font-semibold text-white">Fund Your Wallet</h3>
              <p className="mt-1 text-xs text-white/50">
                Deposit USDC to start trading. Minimum $1 to place a trade.
              </p>
              <button
                onClick={next}
                className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Continue
              </button>
              <button
                onClick={next}
                className="mt-2 w-full text-xs text-white/40 hover:text-white/60 transition"
              >
                I&apos;ll deposit later
              </button>
            </div>
          </div>
        )}

        {/* Step 4: You're All Set */}
        {step === 4 && (
          <div className="flex flex-col">
            <div className="px-6 pt-12 pb-2">
              <div className="grid h-72 grid-cols-2 gap-2.5 content-start">
                {[
                  { title: "Trending Markets", gradient: "from-emerald-900/80 to-emerald-700/40" },
                  { title: "Trading Terminal", gradient: "from-indigo-900/80 to-blue-700/40" },
                  { title: "Whale Tracker", gradient: "from-blue-900/80 to-indigo-700/40" },
                  { title: "Trenches", gradient: "from-fuchsia-900/80 to-emerald-700/40" },
                ].map((card) => (
                  <div
                    key={card.title}
                    className={`relative flex h-32 items-end overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br p-3 ${card.gradient}`}
                  >
                    <p className="text-xs font-semibold text-white">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/5 px-6 pb-6 pt-4">
              <h3 className="text-base font-semibold text-white">You&apos;re All Set</h3>
              <p className="mt-1 text-xs text-white/50">Everything you need to trade prediction markets.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { icon: BarChart3, label: "Charts" },
                  { icon: Users, label: "Copy Trade", badge: "NEW" },
                  { icon: Bell, label: "Alerts" },
                  { icon: Eye, label: "Whales", badge: "NEW" },
                ].map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <span
                      key={feat.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/70"
                    >
                      <Icon className="h-3 w-3" />
                      {feat.label}
                      {feat.badge && (
                        <span className="rounded-sm bg-green-500/20 px-1 py-px text-[9px] font-bold text-green-400">
                          {feat.badge}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
              <button
                onClick={handleClose}
                className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Start Trading
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
