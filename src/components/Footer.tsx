"use client";

import Link from "next/link";
import YulaLogo from "./YulaLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + tagline */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <YulaLogo size={32} />
              <span className="text-lg font-bold tracking-tight">Yula</span>
            </div>
            <p className="mb-4 text-sm text-white/40">Your unfair advantage on Polymarket.</p>
            {/* Social icons */}
            <div className="flex gap-3">
              {/* X / Twitter */}
              <a href="#" className="text-white/40 transition-colors hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Telegram */}
              <a href="#" className="text-white/40 transition-colors hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white/70">Product</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li><Link href="/trending" className="hover:text-white">Terminal</Link></li>
              <li><a href="#" className="hover:text-white">Telegram Bot</a></li>
              <li><Link href="/trending" className="hover:text-white">Markets</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white/70">Resources</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li><a href="#" className="hover:text-white">Docs</a></li>
              <li><a href="#" className="hover:text-white">Twitter/X</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white/70">Legal</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; 2026 Yula. Not affiliated with Polymarket.
          </p>
          <span className="flex items-center gap-2 text-xs text-white/30">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
