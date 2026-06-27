"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Star, Bell, Wallet, User, Menu, X, LayoutGrid, TrendingUp, Briefcase, Copy as CopyIcon } from "lucide-react";
import YulaLogo from "@/components/YulaLogo";
import AuthModal from "@/components/AuthModal";

const navLinks = [
  { label: "Trending", href: "/trending" },
  { label: "Browse", href: "/browse" },
  { label: "Trenches", href: "/trenches" },
  { label: "Up or Down", href: "/up-or-down" },
  { label: "Whales", href: "/whales" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Copy", href: "/copy" },
  { label: "Referrals", href: "/referrals" },
];

export default function TerminalNav() {
  const pathname = usePathname();
  const [marketUrl, setMarketUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");

  const openAuth = (tab: "login" | "signup" = "login") => {
    setMobileOpen(false);
    setAuthTab(tab);
    setAuthOpen(true);
  };

  // Bottom-bar tabs. Gated ones prompt sign-in like the real site.
  const bottomTabs = [
    { label: "Markets", href: "/browse", icon: LayoutGrid, gated: false },
    { label: "Trending", href: "/trending", icon: TrendingUp, gated: false },
    { label: "Portfolio", href: "/portfolio", icon: Briefcase, gated: true },
    { label: "Copy", href: "/copy", icon: CopyIcon, gated: true },
    { label: "Account", href: "#account", icon: User, gated: true },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between bg-[#050505] px-4 border-b border-white/5">
      <div className="flex items-center gap-6">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:bg-white/5 hover:text-white transition lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <YulaLogo size={28} />
          <span className="text-base font-bold tracking-tight text-white">Yula</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-medium transition ${
                  isActive ? "text-emerald-400" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-3 right-3 h-0.5 rounded-full bg-emerald-500" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <svg className="h-3 w-3 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <input
            type="text"
            placeholder="Paste Market URL/ID"
            value={marketUrl}
            onChange={(e) => setMarketUrl(e.target.value)}
            className="w-36 bg-transparent text-xs text-white/80 placeholder:text-white/30 outline-none"
          />
        </div>

        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <Search className="h-3 w-3 text-white/40" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-32 bg-transparent text-xs text-white/80 placeholder:text-white/30 outline-none"
          />
          <span className="text-[10px] text-white/30 border border-white/10 rounded px-1">/</span>
        </div>

        {/* Mobile-only search icon (opens the drawer search) */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06] transition md:hidden"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          onClick={() => openAuth("signup")}
          className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-400 transition"
        >
          <span>+</span> <span className="hidden sm:inline">Deposit</span>
        </button>

        <button className="hidden text-white/40 hover:text-yellow-400 transition md:block" aria-label="Favorite">
          <Star className="h-4 w-4" />
        </button>

        <button className="hidden text-white/40 hover:text-white transition md:block" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </button>

        <button className="hidden md:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-white/[0.06] transition">
          <Wallet className="h-3.5 w-3.5 text-white/60" />
          <span className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-blue-500" />
            0.00
          </span>
        </button>

        {/* Desktop: account circle */}
        <button
          onClick={() => openAuth("login")}
          className="hidden h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06] transition md:flex"
          aria-label="Account"
        >
          <User className="h-3.5 w-3.5" />
        </button>

        {/* Mobile: Login button (matches the real app) */}
        <button
          onClick={() => openAuth("login")}
          className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-400 transition md:hidden"
        >
          Login
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-14 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-x-0 top-14 z-50 border-b border-white/10 bg-[#050505] px-3 py-3 lg:hidden">
            <div className="mb-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
              <Search className="h-3.5 w-3.5 text-white/40" />
              <input
                type="text"
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/30 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                        : "bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Mobile bottom tab bar (matches the real app's primary nav) */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-stretch border-t border-white/10 bg-[#050505]/95 backdrop-blur lg:hidden">
        {bottomTabs.map((t) => {
          const isActive = pathname === t.href;
          const Icon = t.icon;
          const content = (
            <span
              className={`flex h-full flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition ${
                isActive ? "text-emerald-400" : "text-white/45"
              }`}
            >
              <Icon className="h-5 w-5" />
              {t.label}
            </span>
          );
          return t.gated ? (
            <button key={t.label} onClick={() => openAuth("login")} className="flex flex-1">
              {content}
            </button>
          ) : (
            <Link key={t.label} href={t.href} className="flex flex-1">
              {content}
            </Link>
          );
        })}
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />
    </nav>
  );
}
