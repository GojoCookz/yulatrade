"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import AuthModal from "./AuthModal";
import YulaLogo from "./YulaLogo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <YulaLogo size={32} />
            <span className="text-lg font-bold tracking-tight text-white">Yula</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => openAuth("login")}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              Log In
            </button>
            <button
              onClick={() => openAuth("signup")}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition-colors hover:bg-white/5"
            >
              Sign Up
            </button>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Open Terminal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-white/5 bg-[#050505]/95 px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => openAuth("login")}
                className="text-left text-sm text-white/70"
              >
                Log In
              </button>
              <button
                onClick={() => openAuth("signup")}
                className="text-left text-sm text-white/70"
              >
                Sign Up
              </button>
              <Link
                href="/trending"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Open Terminal
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialTab={authTab}
      />
    </>
  );
}
