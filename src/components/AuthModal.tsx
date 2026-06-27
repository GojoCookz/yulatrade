"use client";

import { useState, useEffect } from "react";
import { X, Mail, Wallet, ArrowLeft, CheckCircle2 } from "lucide-react";
import OnboardingModal from "./OnboardingModal";
import YulaLogo from "./YulaLogo";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: "login" | "signup";
}

type View = "auth" | "email" | "wallet-select";

const wallets = [
  { id: "metamask", name: "MetaMask", color: "from-orange-500 to-amber-600", letter: "M" },
  { id: "phantom", name: "Phantom", color: "from-purple-500 to-fuchsia-600", letter: "P" },
  { id: "coinbase", name: "Coinbase Wallet", color: "from-blue-500 to-blue-700", letter: "C" },
  { id: "rabby", name: "Rabby", color: "from-sky-400 to-blue-500", letter: "R" },
  { id: "walletconnect", name: "WalletConnect", color: "from-blue-400 to-indigo-500", letter: "W" },
];

export default function AuthModal({ isOpen, onClose, initialTab }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">(initialTab);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [view, setView] = useState<View>("auth");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setView("auth");
      setEmail("");
      setEmailSent(false);
      setConnectingWallet(null);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen && !onboardingOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailSent(true);
  };

  const handleEmailContinue = () => {
    onClose();
    setOnboardingOpen(true);
  };

  const handleWalletPick = (id: string) => {
    setConnectingWallet(id);
    setTimeout(() => {
      onClose();
      setOnboardingOpen(true);
    }, 1200);
  };

  const handleOnboardingClose = () => {
    setOnboardingOpen(false);
  };

  const backToAuth = () => {
    setView("auth");
    setEmail("");
    setEmailSent(false);
    setConnectingWallet(null);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1410] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {view !== "auth" && (
              <button
                onClick={backToAuth}
                className="absolute left-4 top-4 text-white/50 transition hover:text-white"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/50 transition hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Logo */}
            <div className="mb-6 flex flex-col items-center gap-2">
              <YulaLogo size={40} />
              <span className="text-lg font-bold tracking-tight text-white">Yula</span>
            </div>

            {/* AUTH VIEW */}
            {view === "auth" && (
              <>
                <div className="mb-6 flex rounded-lg border border-white/10">
                  <button
                    onClick={() => setTab("login")}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      tab === "login" ? "bg-white/10 text-white" : "text-white/50"
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setTab("signup")}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      tab === "signup" ? "bg-white/10 text-white" : "text-white/50"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {tab === "signup" && (
                  <label className="mb-4 flex items-start gap-2 text-sm text-white/60">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 rounded border-white/20 bg-white/5 accent-emerald-500"
                    />
                    <span>
                      I agree to the{" "}
                      <a href="#" className="text-emerald-400 underline">Terms of Service</a> and{" "}
                      <a href="#" className="text-emerald-400 underline">Privacy Policy</a>
                    </span>
                  </label>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setView("email")}
                    className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/5"
                  >
                    <Mail className="h-4 w-4" />
                    Continue with Email
                  </button>

                  <button
                    onClick={() => setView("wallet-select")}
                    className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </button>

                  <p className="text-center text-xs text-white/40">
                    MetaMask · Phantom · Coinbase · Rabby
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-white/40">or</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <button className="flex items-center justify-center gap-2 rounded-lg bg-[#229ED9] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1a8abf]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Continue with Telegram
                  </button>

                  <button className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {tab === "login" ? "Sign in with Google" : "Sign up with Google"}
                  </button>
                </div>

                <p className="mt-6 text-center text-sm text-white/50">
                  {tab === "login" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button onClick={() => setTab("signup")} className="text-emerald-400 underline">
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button onClick={() => setTab("login")} className="text-emerald-400 underline">
                        Sign in
                      </button>
                    </>
                  )}
                </p>

                <p className="mt-3 text-center text-xs text-white/30">
                  By continuing, you agree to our terms of service
                </p>
              </>
            )}

            {/* EMAIL VIEW */}
            {view === "email" && (
              <>
                {!emailSent ? (
                  <>
                    <h2 className="text-center text-xl font-semibold text-white">
                      {tab === "login" ? "Sign in with email" : "Create your account"}
                    </h2>
                    <p className="mt-1 text-center text-sm text-white/50">
                      We&apos;ll send you a one-time code to log in.
                    </p>

                    <form onSubmit={handleEmailSubmit} className="mt-6 flex flex-col gap-3">
                      <label className="text-xs font-medium uppercase tracking-wider text-white/40">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-emerald-500/50"
                      />
                      <button
                        type="submit"
                        disabled={!email.includes("@")}
                        className="mt-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Send code
                      </button>
                      <p className="text-center text-xs text-white/40">
                        By continuing, you agree to our{" "}
                        <a href="#" className="text-emerald-400 underline">terms of service</a>.
                      </p>
                    </form>
                  </>
                ) : (
                  <>
                    <h2 className="text-center text-xl font-semibold text-white">Check your email</h2>
                    <p className="mt-1 text-center text-sm text-white/50">
                      Enter the 6-digit code sent to <span className="text-white">{email}</span>
                    </p>

                    <div className="mt-6 flex justify-center gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <input
                          key={i}
                          inputMode="numeric"
                          maxLength={1}
                          className="h-12 w-10 rounded-lg border border-white/10 bg-white/5 text-center text-lg font-semibold text-white outline-none focus:border-emerald-500/50"
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleEmailContinue}
                      className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => setEmailSent(false)}
                      className="mt-2 w-full text-xs text-white/40 hover:text-white/60 transition"
                    >
                      Use a different email
                    </button>
                  </>
                )}
              </>
            )}

            {/* WALLET SELECT VIEW */}
            {view === "wallet-select" && (
              <>
                <h2 className="text-center text-xl font-semibold text-white">Connect a wallet</h2>
                <p className="mt-1 text-center text-sm text-white/50">
                  Choose your preferred wallet to continue.
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  {wallets.map((w) => {
                    const isConnecting = connectingWallet === w.id;
                    const isDisabled = connectingWallet !== null && !isConnecting;
                    return (
                      <button
                        key={w.id}
                        onClick={() => handleWalletPick(w.id)}
                        disabled={isDisabled}
                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-emerald-500/40 hover:bg-white/[0.08] disabled:opacity-40"
                      >
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${w.color} text-sm font-bold text-white`}>
                          {w.letter}
                        </div>
                        <span className="flex-1 text-sm font-medium text-white">{w.name}</span>
                        {isConnecting ? (
                          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                            Connecting…
                          </span>
                        ) : (
                          <span className="text-xs text-white/30">Installed</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <p className="flex items-center gap-2 text-xs text-white/50">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                    Non-custodial. We never see your private keys.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <OnboardingModal isOpen={onboardingOpen} onClose={handleOnboardingClose} />
    </>
  );
}
