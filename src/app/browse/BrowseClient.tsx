"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getMarketImage } from "@/lib/marketImages";
import {
  Flame,
  Trophy,
  Landmark,
  Bitcoin,
  TrendingUp,
  Globe,
  Microscope,
  Music,
  Zap,
  ChevronRight,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Bell,
  Share2,
} from "lucide-react";

interface SubItem {
  id: string;
  label: string;
  count: number;
}
interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  sub?: SubItem[];
  headerLabel?: string;
}

const categories: Category[] = [
  { id: "all", label: "All", icon: Flame, headerLabel: "All markets" },
  {
    id: "sports",
    label: "Sports",
    icon: Trophy,
    sub: [
      { id: "soccer", label: "Soccer", count: 3013 },
      { id: "esports", label: "Esports", count: 707 },
      { id: "basketball", label: "Basketball", count: 156 },
      { id: "baseball", label: "Baseball", count: 155 },
      { id: "cricket", label: "Cricket", count: 128 },
      { id: "mlb", label: "Mlb", count: 124 },
      { id: "epl", label: "EPL", count: 115 },
      { id: "tennis", label: "Tennis", count: 114 },
      { id: "laliga", label: "La Liga", count: 97 },
      { id: "ufc", label: "Ufc", count: 65 },
    ],
  },
  {
    id: "politics",
    label: "Politics",
    icon: Landmark,
    sub: [
      { id: "elections", label: "Elections", count: 873 },
      { id: "trump", label: "Trump", count: 319 },
      { id: "iran", label: "Iran", count: 126 },
      { id: "ukraine", label: "Ukraine", count: 108 },
    ],
  },
  {
    id: "crypto",
    label: "Crypto",
    icon: Bitcoin,
    sub: [
      { id: "bitcoin", label: "Bitcoin", count: 491 },
      { id: "ethereum", label: "Ethereum", count: 474 },
      { id: "solana", label: "Solana", count: 455 },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: TrendingUp,
    sub: [
      { id: "economy", label: "Economy", count: 174 },
      { id: "earnings", label: "Earnings", count: 133 },
      { id: "stocks", label: "Stocks", count: 105 },
    ],
  },
  {
    id: "world",
    label: "World",
    icon: Globe,
    sub: [
      { id: "geopolitics", label: "Geopolitics", count: 423 },
      { id: "w-iran", label: "Iran", count: 126 },
      { id: "w-ukraine", label: "Ukraine", count: 108 },
      { id: "middle-east", label: "Middle East", count: 103 },
    ],
  },
  {
    id: "tech",
    label: "Tech & Science",
    icon: Microscope,
    sub: [
      { id: "ai", label: "Ai", count: 121 },
      { id: "science", label: "Science", count: 71 },
    ],
  },
  {
    id: "culture",
    label: "Culture",
    icon: Music,
    sub: [
      { id: "pop-culture", label: "Pop Culture", count: 306 },
      { id: "celebrities", label: "Celebrities", count: 93 },
      { id: "music", label: "Music", count: 80 },
      { id: "movies", label: "Movies", count: 70 },
      { id: "awards", label: "Awards", count: 69 },
    ],
  },
  { id: "new", label: "New", icon: Zap, headerLabel: "Newest markets" },
];

interface Market {
  slug: string;
  title: string;
  cc?: string;
  image?: string;
  iconBg: string;
  iconLetter: string;
  tag: string;
  category: string;
  sub?: string;
  endsLabel: string;
  yesPrice: string;
  noPrice: string;
  delta: string;
  vol: string;
  liquidity: string;
  endsDate: string;
  chartTrend: "up" | "down" | "flat";
  multiMarkets?: number;
}

const allMarkets: Market[] = [
  // ALL
  { slug: "btc-200k", title: "Bitcoin tops 200k by close of 2026?", iconBg: "from-orange-400 to-orange-600", iconLetter: "₿", tag: "crypto", category: "crypto", sub: "bitcoin", endsLabel: "Dec 31", yesPrice: "34¢", noPrice: "66¢", delta: "+2%", vol: "$45.2M", liquidity: "$5.8M", endsDate: "Dec 31, 26", chartTrend: "up" },
  { slug: "fed-cuts-july", title: "Federal Reserve cuts in July?", iconBg: "from-blue-700 to-indigo-800", iconLetter: "$", tag: "finance", category: "finance", sub: "economy", endsLabel: "Jul 30", yesPrice: "61¢", noPrice: "39¢", delta: "-1%", vol: "$38.1M", liquidity: "$4.2M", endsDate: "Jul 30, 26", chartTrend: "down" },
  { slug: "wc-2026-winner", title: "2026 World Cup champion?", iconBg: "from-yellow-600 to-amber-700", iconLetter: "⚽", tag: "sports", category: "sports", sub: "soccer", endsLabel: "Jul 19", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$12.1M", liquidity: "$224.0M", endsDate: "Jul 19, 26", chartTrend: "up", multiMarkets: 32 },
  { slug: "election-2028", title: "2028 US presidential winner?", iconBg: "from-blue-600 to-blue-800", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Nov 6", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$89.2M", liquidity: "$61.4M", endsDate: "Nov 6, 28", chartTrend: "flat", multiMarkets: 14 },
  { slug: "gpt5-sept", title: "GPT-5 shipped before September?", iconBg: "from-emerald-500 to-teal-700", iconLetter: "AI", tag: "tech", category: "tech", sub: "ai", endsLabel: "Sep 1", yesPrice: "65¢", noPrice: "35¢", delta: "+4%", vol: "$22.4M", liquidity: "$1.8M", endsDate: "Sep 1, 26", chartTrend: "up" },
  { slug: "oscar-best-pic", title: "Best Picture at 2026 Oscars?", iconBg: "from-yellow-500 to-orange-600", iconLetter: "🎬", tag: "culture", category: "culture", sub: "movies", endsLabel: "Mar 15", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$8.4M", liquidity: "$1.2M", endsDate: "Mar 15, 26", chartTrend: "flat", multiMarkets: 8 },

  // SPORTS — Soccer
  { slug: "fifa-2026", title: "2026 FIFA World Cup champion?", iconBg: "from-yellow-600 to-amber-700", iconLetter: "⚽", tag: "sports", category: "sports", sub: "soccer", endsLabel: "Jul 19", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$12.1M", liquidity: "$224.0M", endsDate: "Jul 19, 26", chartTrend: "up", multiMarkets: 32 },
  { slug: "ucl-final-26", title: "UEFA Champions League final winner?", iconBg: "from-blue-700 to-indigo-900", iconLetter: "★", tag: "sports", category: "sports", sub: "soccer", endsLabel: "May 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$3.0M", liquidity: "$1.5M", endsDate: "May 30, 26", chartTrend: "up", multiMarkets: 9 },
  { slug: "ucl-team-final", title: "Team to reach the UCL final?", iconBg: "from-blue-700 to-indigo-900", iconLetter: "★", tag: "sports", category: "sports", sub: "soccer", endsLabel: "May 6", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$223K", liquidity: "$131K", endsDate: "May 6, 26", chartTrend: "up" },
  { slug: "epl-champ-26", title: "English Premier League winner?", iconBg: "from-purple-500 to-fuchsia-700", iconLetter: "EPL", tag: "sports", category: "sports", sub: "epl", endsLabel: "May 24", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$2.4M", liquidity: "$3.1M", endsDate: "May 24, 26", chartTrend: "up", multiMarkets: 4 },
  { slug: "laliga-winner-26", title: "La Liga 25/26 winner?", iconBg: "from-orange-500 to-red-600", iconLetter: "LL", tag: "sports", category: "sports", sub: "laliga", endsLabel: "May 24", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.9M", liquidity: "$2.1M", endsDate: "May 24, 26", chartTrend: "up", multiMarkets: 5 },
  { slug: "atletico-arsenal", title: "Club Atlético vs Arsenal - Match winner?", iconBg: "from-red-600 to-red-800", iconLetter: "★", tag: "sports", category: "sports", sub: "soccer", endsLabel: "Apr 29", yesPrice: "38¢", noPrice: "62¢", delta: "+1%", vol: "$1.4M", liquidity: "$4.1M", endsDate: "Apr 29, 26", chartTrend: "down", multiMarkets: 3 },
  { slug: "bayern-psg", title: "Bayern München vs PSG - Match winner?", iconBg: "from-red-600 to-red-800", iconLetter: "★", tag: "sports", category: "sports", sub: "soccer", endsLabel: "May 6", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$60K", liquidity: "$188K", endsDate: "May 6, 26", chartTrend: "flat" },
  { slug: "mito-machida", title: "FC Mito vs FC Machida Zelvia - Result?", iconBg: "from-zinc-600 to-zinc-800", iconLetter: "J", tag: "sports", category: "sports", sub: "soccer", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$65K", liquidity: "$150K", endsDate: "Apr 29, 26", chartTrend: "flat", multiMarkets: 3 },
  { slug: "fifa-continent", title: "Which continent wins the 2026 FIFA World Cup?", iconBg: "from-emerald-500 to-teal-700", iconLetter: "🌐", tag: "sports", category: "sports", sub: "soccer", endsLabel: "Jul 19", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$58K", liquidity: "$378K", endsDate: "Jul 19, 26", chartTrend: "flat" },

  // SPORTS — Basketball
  { slug: "nba-champ-26", title: "2026 NBA champion?", iconBg: "from-orange-500 to-red-600", iconLetter: "🏀", tag: "sports", category: "sports", sub: "basketball", endsLabel: "Jun 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.7M", liquidity: "$2.2M", endsDate: "Jun 30, 26", chartTrend: "up" },
  { slug: "nba-playoff-east", title: "NBA Playoffs: Eastern Conference champion?", iconBg: "from-blue-500 to-blue-700", iconLetter: "E", tag: "sports", category: "sports", sub: "basketball", endsLabel: "Jun 15", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$79K", liquidity: "$262K", endsDate: "Jun 15, 26", chartTrend: "up" },
  { slug: "nba-playoff-west", title: "NBA Playoffs: Western Conference champion?", iconBg: "from-amber-500 to-orange-700", iconLetter: "W", tag: "sports", category: "sports", sub: "basketball", endsLabel: "Jun 15", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$47K", liquidity: "$203K", endsDate: "Jun 15, 26", chartTrend: "up" },
  { slug: "raptors-cavs", title: "Raptors vs Cavaliers - Series winner?", iconBg: "from-red-700 to-emerald-900", iconLetter: "🏀", tag: "sports", category: "sports", sub: "basketball", endsLabel: "Apr 29", yesPrice: "56¢", noPrice: "44¢", delta: "0%", vol: "$313K", liquidity: "$4.3M", endsDate: "Apr 29, 26", chartTrend: "flat", multiMarkets: 40 },
  { slug: "rockets-lakers", title: "Rockets vs Lakers - Series winner?", iconBg: "from-red-600 to-yellow-500", iconLetter: "🏀", tag: "sports", category: "sports", sub: "basketball", endsLabel: "Apr 29", yesPrice: "64¢", noPrice: "36¢", delta: "0%", vol: "$246K", liquidity: "$2.4M", endsDate: "Apr 29, 26", chartTrend: "up", multiMarkets: 41 },
  { slug: "magic-pistons", title: "Magic vs Pistons - Series winner?", iconBg: "from-blue-700 to-cyan-600", iconLetter: "🏀", tag: "sports", category: "sports", sub: "basketball", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$201K", liquidity: "$2.6M", endsDate: "Apr 29, 26", chartTrend: "flat", multiMarkets: 39 },
  { slug: "nba-mvp", title: "2025-26 NBA MVP?", iconBg: "from-yellow-600 to-orange-700", iconLetter: "★", tag: "sports", category: "sports", sub: "basketball", endsLabel: "Jun 9", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$94K", liquidity: "$210K", endsDate: "Jun 9, 26", chartTrend: "up" },
  { slug: "playoff-semis", title: "NBA Playoffs: Team to reach Conference Semifinals?", iconBg: "from-orange-500 to-red-600", iconLetter: "🏀", tag: "sports", category: "sports", sub: "basketball", endsLabel: "May 2", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$63K", liquidity: "$60K", endsDate: "May 2, 26", chartTrend: "flat" },

  // SPORTS — Esports
  { slug: "lol-worlds", title: "LoL Worlds 2026 champion?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Nov 8", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.2M", liquidity: "$354K", endsDate: "Nov 8, 26", chartTrend: "down", multiMarkets: 12 },
  { slug: "lol-fnatic-shifters", title: "LoL: Fnatic vs Shifters - Series winner?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.2M", liquidity: "$354K", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 3 },
  { slug: "lol-weibo-tes", title: "LoL: Weibo Gaming vs Top Esports - Result?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$936K", liquidity: "$2.7K", endsDate: "Apr 28, 26", chartTrend: "up" },
  { slug: "lol-vit-solary", title: "LoL: Team Vitality vs Solary - Result?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$699K", liquidity: "$0.10", endsDate: "Apr 28, 26", chartTrend: "down" },
  { slug: "lol-nv-galions", title: "LoL: Natus Vincere vs Galions - Result?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$544K", liquidity: "$128K", endsDate: "Apr 28, 26", chartTrend: "flat" },
  { slug: "lol-nrf-t1", title: "LoL: Nongshim Red Force vs T1 - Result?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 29", yesPrice: "86¢", noPrice: "14¢", delta: "+5%", vol: "$483K", liquidity: "$930K", endsDate: "Apr 29, 26", chartTrend: "up", multiMarkets: 37 },
  { slug: "lol-heretics-sk", title: "LoL: Team Heretics vs SK Gaming - Result?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$393K", liquidity: "$0.80", endsDate: "Apr 28, 26", chartTrend: "flat" },
  { slug: "lol-kt-hle", title: "LoL: KT Rolster vs Hanwha Life - Result?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 29", yesPrice: "88¢", noPrice: "12¢", delta: "+2%", vol: "$230K", liquidity: "$502K", endsDate: "Apr 29, 26", chartTrend: "up", multiMarkets: 40 },
  { slug: "lol-soopers-kt", title: "LoL: DN SOOPers vs KT Rolster Challengers - Result?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 30", yesPrice: "96¢", noPrice: "4¢", delta: "+3%", vol: "$57K", liquidity: "$69K", endsDate: "Apr 30, 26", chartTrend: "up", multiMarkets: 23 },
  { slug: "lol-rmd-pain", title: "LoL: RMD Gaming vs paiN Academy - Result?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "LoL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$50K", liquidity: "$8.6K", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 36 },
  { slug: "valve-cache-map", title: "Will Valve add Cache to the active map pool?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Feb 27", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$221K", liquidity: "$41K", endsDate: "Feb 27, 26", chartTrend: "down" },
  { slug: "cs-vit-fut", title: "Counter-Strike: Vitality vs FUT - Match result?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 29", yesPrice: "92¢", noPrice: "8¢", delta: "0%", vol: "$194K", liquidity: "$620K", endsDate: "Apr 29, 26", chartTrend: "up", multiMarkets: 11 },
  { slug: "cs-nv-faze", title: "Counter-Strike: Natus Vincere vs FaZe - Match result?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 29", yesPrice: "81¢", noPrice: "19¢", delta: "0%", vol: "$69K", liquidity: "$531K", endsDate: "Apr 29, 26", chartTrend: "up", multiMarkets: 11 },
  { slug: "cs-astralis-g2", title: "Counter-Strike: Astralis vs G2 - Match result?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$48K", liquidity: "$518K", endsDate: "Apr 29, 26", chartTrend: "flat", multiMarkets: 11 },
  { slug: "cs-yawara-bounty", title: "Counter-Strike: Yawara vs Bounty Hunters - Match result?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$77K", liquidity: "$235", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 2 },
  { slug: "cs-big-genone", title: "Counter-Strike: BIG Academy vs GenOne - Match result?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$73K", liquidity: "$0.05", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 2 },
  { slug: "cs-eternal-g2", title: "Counter-Strike: eternal premium vs G2 Ares - Match result?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$71K", liquidity: "$200", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 2 },
  { slug: "cs-young-ninjas", title: "Counter-Strike: Young Ninjas vs UNiTY - Match result?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$48K", liquidity: "$0", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 2 },
  { slug: "cs-oddik-keyd", title: "Counter-Strike: ODDIK vs Keyd - Match result?", iconBg: "from-orange-500 to-red-700", iconLetter: "CS", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$58K", liquidity: "$0.15", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 3 },
  { slug: "dota-power-l1ga", title: "Dota 2: Power Rangers vs L1ga Team - Match result?", iconBg: "from-red-700 to-rose-900", iconLetter: "D2", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$294K", liquidity: "$62", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 6 },
  { slug: "dota-lynx-sar1", title: "Dota 2: Team Lynx vs South America Rejects - Match result?", iconBg: "from-red-700 to-rose-900", iconLetter: "D2", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$277K", liquidity: "$0.10", endsDate: "Apr 28, 26", chartTrend: "flat" },
  { slug: "val-hge-novo", title: "Valorant: HGE vs NOVO Esports - Match result?", iconBg: "from-rose-500 to-red-700", iconLetter: "VAL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$109K", liquidity: "$2.4K", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 6 },
  { slug: "val-barca-ucam", title: "Valorant: Barça eSports vs UCAM - Match result?", iconBg: "from-rose-500 to-red-700", iconLetter: "VAL", tag: "sports", category: "sports", sub: "esports", endsLabel: "Apr 28", yesPrice: "57¢", noPrice: "43¢", delta: "0%", vol: "$52K", liquidity: "$55K", endsDate: "Apr 28, 26", chartTrend: "flat", multiMarkets: 6 },

  // SPORTS — Tennis
  { slug: "wimbledon-26", title: "2026 Wimbledon men's singles winner?", iconBg: "from-green-600 to-emerald-700", iconLetter: "🎾", tag: "sports", category: "sports", sub: "tennis", endsLabel: "Jul 12", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.4M", liquidity: "$2.3M", endsDate: "Jul 12, 26", chartTrend: "flat" },
  { slug: "french-open-26", title: "2026 Men's French Open winner?", iconBg: "from-orange-500 to-red-700", iconLetter: "🎾", tag: "sports", category: "sports", sub: "tennis", endsLabel: "Jun 6", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$341K", liquidity: "$2.4M", endsDate: "Jun 6, 26", chartTrend: "flat" },

  // SPORTS — MLB
  { slug: "mlb-ws-26", title: "2026 World Series champion?", iconBg: "from-blue-600 to-blue-800", iconLetter: "⚾", tag: "sports", category: "sports", sub: "mlb", endsLabel: "Nov 2", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$2.1M", liquidity: "$1.9M", endsDate: "Nov 2, 26", chartTrend: "up" },
  { slug: "mlb-ws-2026", title: "MLB World Series Champion 2026?", iconBg: "from-blue-600 to-blue-800", iconLetter: "⚾", tag: "sports", category: "sports", sub: "mlb", endsLabel: "Oct 31", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$186K", liquidity: "$1.5M", endsDate: "Oct 31, 26", chartTrend: "up" },

  // SPORTS — F1 / Motor
  { slug: "f1-champion-26", title: "F1 2026 Drivers' champion?", iconBg: "from-red-500 to-red-700", iconLetter: "F1", tag: "sports", category: "sports", sub: "ufc", endsLabel: "Dec 5", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.1M", liquidity: "$12.0M", endsDate: "Dec 5, 26", chartTrend: "flat" },
  { slug: "f1-constructors", title: "F1 2026 Constructors' champion?", iconBg: "from-red-500 to-red-700", iconLetter: "F1", tag: "sports", category: "sports", sub: "ufc", endsLabel: "Dec 5", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$145K", liquidity: "$1.2M", endsDate: "Dec 5, 26", chartTrend: "flat" },

  // SPORTS — UFC
  { slug: "ufc-heavyweight", title: "Next UFC heavyweight champion?", iconBg: "from-zinc-700 to-zinc-900", iconLetter: "🥊", tag: "sports", category: "sports", sub: "ufc", endsLabel: "Dec 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$890K", liquidity: "$1.1M", endsDate: "Dec 30, 26", chartTrend: "up", multiMarkets: 6 },
  { slug: "ufc-fn-bryczek", title: "UFC Fight Night: Bryczek vs Rowston - Winner?", iconBg: "from-red-600 to-zinc-900", iconLetter: "UFC", tag: "sports", category: "sports", sub: "ufc", endsLabel: "May 2", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$51K", liquidity: "$27K", endsDate: "May 2, 26", chartTrend: "flat" },
  { slug: "ufc-fn-prates", title: "UFC Fight Night: Prates vs Della Maddalena - Winner?", iconBg: "from-red-600 to-zinc-900", iconLetter: "UFC", tag: "sports", category: "sports", sub: "ufc", endsLabel: "May 2", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$50K", liquidity: "$108K", endsDate: "May 2, 26", chartTrend: "flat" },

  // SPORTS — NHL / NFL / Cricket
  { slug: "nhl-stanley-26", title: "2026 NHL Stanley Cup champion?", iconBg: "from-sky-500 to-blue-700", iconLetter: "🏒", tag: "sports", category: "sports", sub: "soccer", endsLabel: "Jun 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$260K", liquidity: "$598K", endsDate: "Jun 29, 26", chartTrend: "flat" },
  { slug: "nfl-champ-27", title: "NFL Super Bowl 2027 champion?", iconBg: "from-red-700 to-red-900", iconLetter: "🏈", tag: "sports", category: "sports", sub: "soccer", endsLabel: "Feb 14", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$176K", liquidity: "$3.7M", endsDate: "Feb 14, 27", chartTrend: "flat" },
  { slug: "ipl-mumbai-srh", title: "IPL: Mumbai Indians vs Sunrisers Hyderabad - Result?", iconBg: "from-blue-700 to-cyan-600", iconLetter: "🏏", tag: "sports", category: "sports", sub: "cricket", endsLabel: "May 6", yesPrice: "98¢", noPrice: "2¢", delta: "+1%", vol: "$158K", liquidity: "$1.4M", endsDate: "May 6, 26", chartTrend: "up", multiMarkets: 3 },

  // POLITICS — Iran
  { slug: "us-iran-ceasefire-x", title: "US x Iran ceasefire holds through April?", cc: "us", iconBg: "from-red-500 to-blue-700", iconLetter: "★", tag: "politics", category: "politics", sub: "iran", endsLabel: "Apr 21", yesPrice: "50¢", noPrice: "50¢", delta: "0%", vol: "$13.4M", liquidity: "$5.8M", endsDate: "Apr 21, 26", chartTrend: "flat" },
  { slug: "us-iran-peace-deal-x", title: "US x Iran permanent peace by May?", cc: "us", iconBg: "from-red-500 to-blue-700", iconLetter: "★", tag: "politics", category: "politics", sub: "iran", endsLabel: "May 30", yesPrice: "50¢", noPrice: "50¢", delta: "0%", vol: "$3.5M", liquidity: "$1.4M", endsDate: "May 30, 26", chartTrend: "down" },
  { slug: "iran-nuclear-deal", title: "Iran-US nuclear deal signed by year end?", cc: "ir", iconBg: "from-emerald-600 to-emerald-800", iconLetter: "★", tag: "politics", category: "politics", sub: "iran", endsLabel: "Dec 31", yesPrice: "18¢", noPrice: "82¢", delta: "+1%", vol: "$2.8M", liquidity: "$890K", endsDate: "Dec 31, 26", chartTrend: "down" },
  { slug: "trump-iran-ops", title: "Trump announces end of military ops vs Iran by June?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "iran", endsLabel: "Jun 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$2.3M", liquidity: "$555K", endsDate: "Jun 30, 26", chartTrend: "flat" },
  { slug: "trump-hormuz-blockade", title: "Trump announces US blockade of Hormuz lifted by April?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "iran", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.1M", liquidity: "$241K", endsDate: "Apr 29, 26", chartTrend: "flat" },
  { slug: "iran-sanctions-lifted", title: "Iran sanctions partially lifted in 2026?", cc: "ir", iconBg: "from-emerald-600 to-emerald-800", iconLetter: "★", tag: "politics", category: "politics", sub: "iran", endsLabel: "Dec 31", yesPrice: "22¢", noPrice: "78¢", delta: "0%", vol: "$890K", liquidity: "$320K", endsDate: "Dec 31, 26", chartTrend: "down" },
  { slug: "kharg-control", title: "Kharg Island control changes by March end?", cc: "ir", iconBg: "from-emerald-600 to-emerald-800", iconLetter: "★", tag: "politics", category: "politics", sub: "iran", endsLabel: "Mar 31", yesPrice: "8¢", noPrice: "92¢", delta: "0%", vol: "$1.0M", liquidity: "$1.2M", endsDate: "Mar 31, 26", chartTrend: "down" },
  { slug: "hormuz-april-norm", title: "Hormuz traffic normalizes by end of April?", iconBg: "from-zinc-500 to-zinc-700", iconLetter: "⚓", tag: "politics", category: "politics", sub: "iran", endsLabel: "Apr 29", yesPrice: "60¢", noPrice: "40¢", delta: "0%", vol: "$1.0M", liquidity: "$633K", endsDate: "Apr 29, 26", chartTrend: "up" },
  { slug: "hormuz-may-norm", title: "Hormuz traffic normalizes by mid-May?", iconBg: "from-zinc-500 to-zinc-700", iconLetter: "⚓", tag: "politics", category: "politics", sub: "iran", endsLabel: "May 14", yesPrice: "55¢", noPrice: "45¢", delta: "0%", vol: "$963K", liquidity: "$535K", endsDate: "May 14, 26", chartTrend: "up" },
  { slug: "hormuz-june-norm", title: "Hormuz traffic normalizes by end of June?", iconBg: "from-zinc-500 to-zinc-700", iconLetter: "⚓", tag: "politics", category: "politics", sub: "iran", endsLabel: "Jun 29", yesPrice: "70¢", noPrice: "30¢", delta: "+2%", vol: "$392K", liquidity: "$131K", endsDate: "Jun 29, 26", chartTrend: "up" },
  { slug: "hormuz-may-end", title: "Hormuz traffic normalizes by end of May?", iconBg: "from-zinc-500 to-zinc-700", iconLetter: "⚓", tag: "politics", category: "politics", sub: "iran", endsLabel: "May 30", yesPrice: "60¢", noPrice: "40¢", delta: "0%", vol: "$251K", liquidity: "$254K", endsDate: "May 30, 26", chartTrend: "up" },

  // POLITICS — Elections
  { slug: "brazil-pres-26", title: "Brazilian presidential winner?", cc: "br", iconBg: "from-green-600 to-yellow-600", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Oct 3", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$4.0M", liquidity: "$4.8M", endsDate: "Oct 3, 26", chartTrend: "down", multiMarkets: 7 },
  { slug: "dem-nominee-28", title: "2028 Democratic presidential nominee?", iconBg: "from-blue-600 to-blue-800", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Nov 6", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$3.1M", liquidity: "$61.4M", endsDate: "Nov 6, 28", chartTrend: "flat", multiMarkets: 14 },
  { slug: "french-pres-27", title: "Next French presidential winner?", cc: "fr", iconBg: "from-blue-500 to-red-500", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$2.0M", liquidity: "$5.6M", endsDate: "Apr 29, 27", chartTrend: "flat", multiMarkets: 9 },
  { slug: "pres-winner-2028", title: "2028 US presidential election winner?", iconBg: "from-blue-600 to-blue-800", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Nov 6", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.8M", liquidity: "$30.1M", endsDate: "Nov 6, 28", chartTrend: "flat", multiMarkets: 14 },
  { slug: "fed-chair-confirm", title: "Who will be confirmed as Fed Chair?", iconBg: "from-blue-700 to-indigo-800", iconLetter: "$", tag: "politics", category: "politics", sub: "elections", endsLabel: "Oct 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.2M", liquidity: "$2.2M", endsDate: "Oct 30, 26", chartTrend: "down", multiMarkets: 8 },
  { slug: "powell-out", title: "Jerome Powell out as Fed Chair by mid-May?", iconBg: "from-blue-700 to-indigo-800", iconLetter: "$", tag: "politics", category: "politics", sub: "elections", endsLabel: "May 13", yesPrice: "12¢", noPrice: "88¢", delta: "-1%", vol: "$252K", liquidity: "$79K", endsDate: "May 13, 26", chartTrend: "down" },
  { slug: "uk-general-election", title: "Next UK general election date?", cc: "gb", iconBg: "from-blue-700 to-red-700", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Dec 31", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.4M", liquidity: "$2.2M", endsDate: "Dec 31, 26", chartTrend: "flat", multiMarkets: 6 },
  { slug: "german-election", title: "Next German Chancellor?", cc: "de", iconBg: "from-zinc-700 to-yellow-600", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Sep 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$890K", liquidity: "$1.6M", endsDate: "Sep 30, 27", chartTrend: "flat", multiMarkets: 8 },
  { slug: "canadian-pm", title: "Next Canadian Prime Minister?", cc: "ca", iconBg: "from-red-500 to-zinc-100", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Oct 19", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$520K", liquidity: "$890K", endsDate: "Oct 19, 26", chartTrend: "flat", multiMarkets: 6 },
  { slug: "mexico-pres", title: "Next Mexican President?", cc: "mx", iconBg: "from-green-600 to-red-600", iconLetter: "★", tag: "politics", category: "politics", sub: "elections", endsLabel: "Jul 1", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$340K", liquidity: "$640K", endsDate: "Jul 1, 30", chartTrend: "flat" },

  // POLITICS — Trump
  { slug: "trump-tweets-april", title: "Trump tweet count Apr 24 - May 1?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "trump", endsLabel: "May 1", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.3M", liquidity: "$826K", endsDate: "May 1, 26", chartTrend: "up", multiMarkets: 5 },
  { slug: "trump-tweets-may", title: "Trump tweet count Apr 28 - May 5?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "trump", endsLabel: "May 5", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$452K", liquidity: "$400K", endsDate: "May 5, 26", chartTrend: "down", multiMarkets: 5 },
  { slug: "trump-tweets-may8", title: "Trump tweet count May 1 - May 8?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "trump", endsLabel: "May 8", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$212K", liquidity: "$483K", endsDate: "May 8, 26", chartTrend: "flat", multiMarkets: 5 },
  { slug: "trump-approval", title: "Trump approval rating end of April?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "trump", endsLabel: "Apr 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$890K", liquidity: "$540K", endsDate: "Apr 30, 26", chartTrend: "down", multiMarkets: 8 },
  { slug: "trump-executive-order", title: "Trump signs executive order in next 7 days?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "trump", endsLabel: "May 6", yesPrice: "78¢", noPrice: "22¢", delta: "+3%", vol: "$650K", liquidity: "$280K", endsDate: "May 6, 26", chartTrend: "up" },
  { slug: "trump-cabinet-resign", title: "Trump cabinet member resigns by end of June?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "trump", endsLabel: "Jun 30", yesPrice: "32¢", noPrice: "68¢", delta: "0%", vol: "$420K", liquidity: "$210K", endsDate: "Jun 30, 26", chartTrend: "flat", multiMarkets: 4 },
  { slug: "trump-summit", title: "Trump-Putin summit in 2026?", iconBg: "from-red-500 to-orange-600", iconLetter: "T", tag: "politics", category: "politics", sub: "trump", endsLabel: "Dec 31", yesPrice: "24¢", noPrice: "76¢", delta: "+1%", vol: "$380K", liquidity: "$190K", endsDate: "Dec 31, 26", chartTrend: "up" },

  // POLITICS — Ukraine
  { slug: "ukraine-truce", title: "Ukraine ceasefire signed by July?", cc: "ua", iconBg: "from-yellow-400 to-blue-600", iconLetter: "★", tag: "politics", category: "politics", sub: "ukraine", endsLabel: "Jul 31", yesPrice: "12¢", noPrice: "88¢", delta: "-2%", vol: "$2.9M", liquidity: "$1.1M", endsDate: "Jul 31, 26", chartTrend: "down" },
  { slug: "ukraine-territory", title: "Ukraine regains pre-2022 territory in 2026?", cc: "ua", iconBg: "from-yellow-400 to-blue-600", iconLetter: "★", tag: "politics", category: "politics", sub: "ukraine", endsLabel: "Dec 31", yesPrice: "4¢", noPrice: "96¢", delta: "0%", vol: "$1.6M", liquidity: "$720K", endsDate: "Dec 31, 26", chartTrend: "down" },
  { slug: "ukraine-nato", title: "Ukraine receives formal NATO membership offer in 2026?", cc: "ua", iconBg: "from-yellow-400 to-blue-600", iconLetter: "★", tag: "politics", category: "politics", sub: "ukraine", endsLabel: "Dec 31", yesPrice: "8¢", noPrice: "92¢", delta: "+1%", vol: "$1.1M", liquidity: "$540K", endsDate: "Dec 31, 26", chartTrend: "down" },
  { slug: "ukraine-peace-deal", title: "Ukraine-Russia formal peace deal in 2026?", cc: "ua", iconBg: "from-yellow-400 to-blue-600", iconLetter: "★", tag: "politics", category: "politics", sub: "ukraine", endsLabel: "Dec 31", yesPrice: "6¢", noPrice: "94¢", delta: "0%", vol: "$890K", liquidity: "$420K", endsDate: "Dec 31, 26", chartTrend: "down" },
  { slug: "zelensky-election", title: "Ukraine holds presidential election in 2026?", cc: "ua", iconBg: "from-yellow-400 to-blue-600", iconLetter: "★", tag: "politics", category: "politics", sub: "ukraine", endsLabel: "Dec 31", yesPrice: "15¢", noPrice: "85¢", delta: "0%", vol: "$650K", liquidity: "$320K", endsDate: "Dec 31, 26", chartTrend: "flat" },
  { slug: "russia-sanctions", title: "Russia sanctions lifted in part by end of 2026?", iconBg: "from-red-700 to-zinc-900", iconLetter: "RU", tag: "politics", category: "politics", sub: "ukraine", endsLabel: "Dec 31", yesPrice: "9¢", noPrice: "91¢", delta: "0%", vol: "$420K", liquidity: "$180K", endsDate: "Dec 31, 26", chartTrend: "down" },

  // CRYPTO — Bitcoin
  { slug: "btc-150k", image: "/images/coins/btc.svg", title: "Bitcoin hits 150k in 2026?", iconBg: "from-orange-400 to-orange-600", iconLetter: "₿", tag: "crypto", category: "crypto", sub: "bitcoin", endsLabel: "Dec 31", yesPrice: "44¢", noPrice: "56¢", delta: "+1%", vol: "$5.8M", liquidity: "$49.8K", endsDate: "Dec 31, 26", chartTrend: "up" },
  { slug: "btc-200k", image: "/images/coins/btc.svg", title: "Bitcoin tops 200k by close of 2026?", iconBg: "from-orange-400 to-orange-600", iconLetter: "₿", tag: "crypto", category: "crypto", sub: "bitcoin", endsLabel: "Dec 31", yesPrice: "34¢", noPrice: "66¢", delta: "+2%", vol: "$45.2M", liquidity: "$5.8M", endsDate: "Dec 31, 26", chartTrend: "up" },
  { slug: "btc-apr-28", image: "/images/coins/btc.svg", title: "BTC close on April 28?", iconBg: "from-orange-400 to-orange-600", iconLetter: "₿", tag: "crypto", category: "crypto", sub: "bitcoin", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$251K", liquidity: "$1.3M", endsDate: "Apr 29, 26", chartTrend: "up", multiMarkets: 14 },
  { slug: "btc-april-price", image: "/images/coins/btc.svg", title: "What price will Bitcoin hit in April?", iconBg: "from-orange-400 to-orange-600", iconLetter: "₿", tag: "crypto", category: "crypto", sub: "bitcoin", endsLabel: "May 1", yesPrice: "49¢", noPrice: "51¢", delta: "+1%", vol: "$3.2M", liquidity: "$2.7M", endsDate: "May 1, 26", chartTrend: "up", multiMarkets: 8 },
  { slug: "btc-above-blank-apr-30", image: "/images/coins/btc.svg", title: "Bitcoin above ___ on April 30?", iconBg: "from-orange-400 to-orange-600", iconLetter: "₿", tag: "crypto", category: "crypto", sub: "bitcoin", endsLabel: "Apr 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$166K", liquidity: "$359K", endsDate: "Apr 30, 26", chartTrend: "up", multiMarkets: 7 },
  { slug: "btc-up-down-apr-29", image: "/images/coins/btc.svg", title: "Bitcoin Up or Down - April 29, 12AM ET?", iconBg: "from-orange-400 to-orange-600", iconLetter: "₿", tag: "crypto", category: "crypto", sub: "bitcoin", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$83K", liquidity: "$365K", endsDate: "Apr 29, 26", chartTrend: "flat" },
  { slug: "btc-apr-27-may-3", image: "/images/coins/btc.svg", title: "BTC price April 27 - May 3?", iconBg: "from-orange-400 to-orange-600", iconLetter: "₿", tag: "crypto", category: "crypto", sub: "bitcoin", endsLabel: "May 4", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$79K", liquidity: "$206K", endsDate: "May 4, 26", chartTrend: "flat", multiMarkets: 6 },

  // CRYPTO — Ethereum
  { slug: "eth-5k-april", image: "/images/coins/eth.svg", title: "Ethereum tops 5k in April?", iconBg: "from-indigo-500 to-emerald-700", iconLetter: "Ξ", tag: "crypto", category: "crypto", sub: "ethereum", endsLabel: "May 1", yesPrice: "22¢", noPrice: "78¢", delta: "-3%", vol: "$3.2M", liquidity: "$2.7M", endsDate: "May 1, 26", chartTrend: "down" },
  { slug: "eth-april-price", image: "/images/coins/eth.svg", title: "What price will Ethereum hit in April?", iconBg: "from-indigo-500 to-emerald-700", iconLetter: "Ξ", tag: "crypto", category: "crypto", sub: "ethereum", endsLabel: "May 1", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$349K", liquidity: "$1.7M", endsDate: "May 1, 26", chartTrend: "flat", multiMarkets: 8 },
  { slug: "eth-flip-btc", image: "/images/coins/eth.svg", title: "Ethereum flips Bitcoin by market cap in 2026?", iconBg: "from-indigo-500 to-emerald-700", iconLetter: "Ξ", tag: "crypto", category: "crypto", sub: "ethereum", endsLabel: "Dec 31", yesPrice: "3¢", noPrice: "97¢", delta: "0%", vol: "$890K", liquidity: "$420K", endsDate: "Dec 31, 26", chartTrend: "down" },
  { slug: "xrp-target-april", image: "/images/coins/xrp.svg", title: "What price will XRP hit in April?", iconBg: "from-zinc-400 to-zinc-700", iconLetter: "X", tag: "crypto", category: "crypto", sub: "ethereum", endsLabel: "May 1", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$485K", liquidity: "$727K", endsDate: "May 1, 26", chartTrend: "flat", multiMarkets: 6 },

  // CRYPTO — Solana
  { slug: "sol-300", image: "/images/coins/sol.svg", title: "Solana hits 300 in April?", iconBg: "from-fuchsia-500 to-emerald-700", iconLetter: "S", tag: "crypto", category: "crypto", sub: "solana", endsLabel: "May 1", yesPrice: "31¢", noPrice: "69¢", delta: "+5%", vol: "$890K", liquidity: "$610K", endsDate: "May 1, 26", chartTrend: "up" },
  { slug: "sol-april-price", image: "/images/coins/sol.svg", title: "What price will Solana hit in April?", iconBg: "from-fuchsia-500 to-emerald-700", iconLetter: "S", tag: "crypto", category: "crypto", sub: "solana", endsLabel: "May 1", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$89K", liquidity: "$610K", endsDate: "May 1, 26", chartTrend: "flat", multiMarkets: 5 },
  { slug: "sol-flip-eth", image: "/images/coins/sol.svg", title: "Solana flips Ethereum by market cap in 2026?", iconBg: "from-fuchsia-500 to-emerald-700", iconLetter: "S", tag: "crypto", category: "crypto", sub: "solana", endsLabel: "Dec 31", yesPrice: "8¢", noPrice: "92¢", delta: "+1%", vol: "$2.1M", liquidity: "$890K", endsDate: "Dec 31, 26", chartTrend: "down" },
  { slug: "doge-target", image: "/images/coins/doge.svg", title: "What price will Dogecoin hit in April?", iconBg: "from-yellow-500 to-amber-600", iconLetter: "Ð", tag: "crypto", category: "crypto", sub: "solana", endsLabel: "May 1", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$120K", liquidity: "$84K", endsDate: "May 1, 26", chartTrend: "flat", multiMarkets: 8 },
  { slug: "printr-public", image: "/images/coins/sol.svg", title: "Printr public sale total commitments?", iconBg: "from-fuchsia-500 to-emerald-700", iconLetter: "P", tag: "crypto", category: "crypto", sub: "solana", endsLabel: "Jun 1", yesPrice: "98¢", noPrice: "2¢", delta: "+3%", vol: "$1.2M", liquidity: "$176K", endsDate: "Jun 1, 26", chartTrend: "up" },
  { slug: "memecoin-100b", image: "/images/coins/sol.svg", title: "Memecoin hits 100B market cap in 2026?", iconBg: "from-yellow-500 to-pink-600", iconLetter: "M", tag: "crypto", category: "crypto", sub: "solana", endsLabel: "Dec 31", yesPrice: "12¢", noPrice: "88¢", delta: "+8%", vol: "$1.4M", liquidity: "$420K", endsDate: "Dec 31, 26", chartTrend: "up" },
  { slug: "ada-target", image: "/images/coins/ada.svg", title: "What price will Cardano hit in April?", iconBg: "from-blue-500 to-indigo-700", iconLetter: "A", tag: "crypto", category: "crypto", sub: "ethereum", endsLabel: "May 1", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$80K", liquidity: "$120K", endsDate: "May 1, 26", chartTrend: "flat", multiMarkets: 6 },

  // FINANCE
  { slug: "fed-june", title: "Fed decision in June?", iconBg: "from-blue-700 to-indigo-800", iconLetter: "$", tag: "finance", category: "finance", sub: "economy", endsLabel: "Jun 16", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.5M", liquidity: "$3.2M", endsDate: "Jun 16, 26", chartTrend: "flat", multiMarkets: 3 },
  { slug: "fed-chair-26", title: "Next Federal Reserve Chair?", iconBg: "from-blue-700 to-indigo-800", iconLetter: "$", tag: "finance", category: "finance", sub: "economy", endsLabel: "Oct 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.2M", liquidity: "$2.2M", endsDate: "Oct 30, 26", chartTrend: "down", multiMarkets: 8 },
  { slug: "rate-cuts-26", title: "Fed rate cuts through 2026?", iconBg: "from-blue-700 to-indigo-800", iconLetter: "$", tag: "finance", category: "finance", sub: "economy", endsLabel: "Dec 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$378K", liquidity: "$1.2M", endsDate: "Dec 30, 26", chartTrend: "down", multiMarkets: 6 },
  { slug: "biggest-stock-apr", title: "Largest US stock by April close?", iconBg: "from-emerald-500 to-teal-700", iconLetter: "📈", tag: "finance", category: "finance", sub: "stocks", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$300K", liquidity: "$1.3M", endsDate: "Apr 29, 26", chartTrend: "up", multiMarkets: 5 },
  { slug: "nvda-earnings", title: "NVDA Q1 earnings beat?", iconBg: "from-green-600 to-emerald-700", iconLetter: "N", tag: "finance", category: "finance", sub: "earnings", endsLabel: "May 22", yesPrice: "72¢", noPrice: "28¢", delta: "+3%", vol: "$1.8M", liquidity: "$2.4M", endsDate: "May 22, 26", chartTrend: "up" },
  { slug: "spx-eom-may", title: "S&P 500 close end of May?", iconBg: "from-zinc-500 to-zinc-700", iconLetter: "S", tag: "finance", category: "finance", sub: "stocks", endsLabel: "May 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$540K", liquidity: "$890K", endsDate: "May 30, 26", chartTrend: "flat", multiMarkets: 7 },

  // WORLD
  { slug: "iran-deal", title: "Iran nuclear deal by year end?", iconBg: "from-emerald-600 to-emerald-800", iconLetter: "★", tag: "world", category: "world", sub: "geopolitics", endsLabel: "Dec 31", yesPrice: "18¢", noPrice: "82¢", delta: "+1%", vol: "$3.8M", liquidity: "$1.6M", endsDate: "Dec 31, 26", chartTrend: "down" },
  { slug: "israel-truce", title: "Israel-Hezbollah ceasefire extended?", iconBg: "from-blue-500 to-green-600", iconLetter: "★", tag: "world", category: "world", sub: "middle-east", endsLabel: "Jun 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$2.6M", liquidity: "$2.6M", endsDate: "Jun 30, 26", chartTrend: "flat" },
  { slug: "hormuz-april", title: "Strait of Hormuz traffic normalizes by April?", iconBg: "from-zinc-500 to-zinc-700", iconLetter: "⚓", tag: "world", category: "world", sub: "middle-east", endsLabel: "Apr 29", yesPrice: "60¢", noPrice: "40¢", delta: "0%", vol: "$1.0M", liquidity: "$633K", endsDate: "Apr 29, 26", chartTrend: "up" },
  { slug: "ukraine-control", title: "Kharg Island control changes by March end?", cc: "ua", iconBg: "from-yellow-400 to-blue-600", iconLetter: "★", tag: "world", category: "world", sub: "w-ukraine", endsLabel: "Mar 31", yesPrice: "8¢", noPrice: "92¢", delta: "0%", vol: "$1.0M", liquidity: "$1.2M", endsDate: "Mar 31, 26", chartTrend: "down" },

  // TECH & SCIENCE
  { slug: "best-ai-may", title: "Best AI model at end of May?", iconBg: "from-emerald-500 to-teal-700", iconLetter: "AI", tag: "tech", category: "tech", sub: "ai", endsLabel: "May 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$253K", liquidity: "$590K", endsDate: "May 30, 26", chartTrend: "up", multiMarkets: 6 },
  { slug: "aliens-confirmed", title: "US confirms alien existence by year end?", iconBg: "from-violet-600 to-emerald-800", iconLetter: "👽", tag: "tech", category: "tech", sub: "science", endsLabel: "Dec 30", yesPrice: "2¢", noPrice: "98¢", delta: "0%", vol: "$219K", liquidity: "$1.8M", endsDate: "Dec 30, 26", chartTrend: "flat" },
  { slug: "spacex-ticker", title: "SpaceX public ticker symbol?", iconBg: "from-zinc-700 to-zinc-900", iconLetter: "🚀", tag: "tech", category: "tech", sub: "science", endsLabel: "Dec 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$33K", liquidity: "$145K", endsDate: "Dec 30, 27", chartTrend: "flat", multiMarkets: 4 },
  { slug: "math-ai-apr", title: "Best Math AI model end of April?", iconBg: "from-emerald-500 to-teal-700", iconLetter: "AI", tag: "tech", category: "tech", sub: "ai", endsLabel: "Apr 29", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$68K", liquidity: "$75K", endsDate: "Apr 29, 26", chartTrend: "up", multiMarkets: 5 },

  // CULTURE
  { slug: "clavicular-26", title: "Clavicular pregnancy reports in 2026?", iconBg: "from-pink-500 to-rose-700", iconLetter: "♀", tag: "culture", category: "culture", sub: "pop-culture", endsLabel: "Dec 30", yesPrice: "5¢", noPrice: "95¢", delta: "0%", vol: "$5.1M", liquidity: "$278K", endsDate: "Dec 30, 26", chartTrend: "flat" },
  { slug: "eurovision-26", title: "Eurovision 2026 winner?", iconBg: "from-purple-500 to-fuchsia-700", iconLetter: "♪", tag: "culture", category: "culture", sub: "music", endsLabel: "May 15", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$4.2M", liquidity: "$10.0M", endsDate: "May 15, 26", chartTrend: "up", multiMarkets: 26 },
  { slug: "musk-tweets-apr", title: "Musk tweet count Apr 24-May 1?", iconBg: "from-red-500 to-orange-600", iconLetter: "X", tag: "culture", category: "culture", sub: "celebrities", endsLabel: "May 1", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$1.3M", liquidity: "$826K", endsDate: "May 1, 26", chartTrend: "up", multiMarkets: 5 },
  { slug: "musk-tweets-may", title: "Musk tweet count Apr 28-May 5?", iconBg: "from-red-500 to-orange-600", iconLetter: "X", tag: "culture", category: "culture", sub: "celebrities", endsLabel: "May 5", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$452K", liquidity: "$400K", endsDate: "May 5, 26", chartTrend: "down", multiMarkets: 5 },
  { slug: "highest-grossing", title: "Highest grossing movie of 2026?", iconBg: "from-yellow-500 to-orange-600", iconLetter: "🎬", tag: "culture", category: "culture", sub: "movies", endsLabel: "Dec 30", yesPrice: "—", noPrice: "—", delta: "0%", vol: "$184K", liquidity: "$831K", endsDate: "Dec 30, 26", chartTrend: "flat", multiMarkets: 12 },
  { slug: "kimmel-resigns", title: "Jimmy Kimmel exits show by May 31?", iconBg: "from-blue-500 to-indigo-700", iconLetter: "K", tag: "culture", category: "culture", sub: "celebrities", endsLabel: "May 30", yesPrice: "3¢", noPrice: "97¢", delta: "0%", vol: "$146K", liquidity: "$137K", endsDate: "May 30, 26", chartTrend: "flat" },
];

function Sparkline({ trend, category }: { trend: "up" | "down" | "flat"; category?: string }) {
  const points =
    trend === "up"
      ? "0,18 10,15 20,16 30,12 40,13 50,8 60,9 70,5 80,6"
      : trend === "down"
      ? "0,5 10,7 20,6 30,10 40,9 50,13 60,12 70,16 80,17"
      : "0,11 10,10 20,12 30,9 40,11 50,10 60,12 70,9 80,11";
  // Color the line per trend so up=green, down=red, flat=purple — easier scan
  const stroke = trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : "#34d399";
  const fillId = `spark-${category ?? "x"}-${trend}`;
  return (
    <svg width="84" height="24" viewBox="0 0 80 22" className="inline-block">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`${points} 80,22 0,22`} fill={`url(#${fillId})`} stroke="none" />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Deterministic pseudo-random from slug (SSR-safe — same output on server and
// client) so markets without hardcoded quotes still display a live-looking price.
function seedFrom(slug: string, salt: string) {
  let h = 2166136261;
  const s = slug + salt;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function quoteFor(m: Market): { yes: string; no: string; delta: string; deltaUp: boolean } {
  const deltaVal = (seedFrom(m.slug, "d") - 0.45) * 5;
  const delta = `${deltaVal >= 0 ? "+" : ""}${deltaVal.toFixed(1)}%`;
  if (m.yesPrice !== "—") {
    const hasRealDelta = m.delta !== "0%";
    return {
      yes: m.yesPrice,
      no: m.noPrice,
      delta: hasRealDelta ? m.delta : delta,
      deltaUp: hasRealDelta ? !m.delta.startsWith("-") : deltaVal >= 0,
    };
  }
  const yesNum = Math.min(96, Math.max(4, Math.round(4 + seedFrom(m.slug, "p") * 92)));
  return { yes: `${yesNum}¢`, no: `${100 - yesNum}¢`, delta, deltaUp: deltaVal >= 0 };
}

const TAG_COLORS: Record<string, { dot: string; text: string }> = {
  politics: { dot: "bg-blue-400", text: "text-blue-400" },
  sports: { dot: "bg-red-400", text: "text-red-400" },
  crypto: { dot: "bg-orange-400", text: "text-orange-400" },
  finance: { dot: "bg-emerald-400", text: "text-emerald-400" },
  world: { dot: "bg-cyan-400", text: "text-cyan-400" },
  tech: { dot: "bg-teal-400", text: "text-teal-400" },
  culture: { dot: "bg-pink-400", text: "text-pink-400" },
  entertainment: { dot: "bg-pink-400", text: "text-pink-400" },
};
function TagPill({ tag }: { tag: string }) {
  const colors = TAG_COLORS[tag] ?? { dot: "bg-white/30", text: "text-white/60" };
  return (
    <span className={`flex items-center gap-1 ${colors.text}`}>
      <span className={`h-1 w-1 rounded-full ${colors.dot}`} />
      {tag}
    </span>
  );
}

function MarketIcon({ m }: { m: Market }) {
  const topical = m.image ?? getMarketImage(m.title);
  if (topical) {
    return (
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md ring-1 ring-white/[0.15] bg-zinc-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={topical} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }
  if (m.cc) {
    return (
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/flags/${m.cc}.png`} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }
  // Seeded public-domain stock image fallback (Lorem Picsum)
  return (
    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10 bg-zinc-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(m.slug)}/80/80`}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${m.iconBg} mix-blend-multiply opacity-40`} />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white drop-shadow">
        {m.iconLetter}
      </div>
    </div>
  );
}

export default function BrowseClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category") ?? "all";
  const subParam = searchParams.get("sub");

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [activeSub, setActiveSub] = useState<string | null>(subParam);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(categoryParam);

  useEffect(() => {
    setActiveCategory(categoryParam);
    setActiveSub(subParam);
    if (categoryParam !== "all") setExpandedGroup(categoryParam);
  }, [categoryParam, subParam]);

  const activeCat = categories.find((c) => c.id === activeCategory);
  const subItems = activeCat?.sub;
  const headerLabel = activeCat?.headerLabel ?? "All markets";

  const filteredMarkets = (() => {
    if (activeCategory === "all") return allMarkets;
    if (activeCategory === "new") return allMarkets.slice(0, 10);
    const list = allMarkets.filter((m) => m.category === activeCategory);
    if (activeSub) return list.filter((m) => m.sub === activeSub);
    return list;
  })();

  const updateUrl = (cat: string, sub: string | null) => {
    const params = new URLSearchParams();
    if (cat !== "all") params.set("category", cat);
    if (sub) params.set("sub", sub);
    const qs = params.toString();
    router.push(`/browse${qs ? `?${qs}` : ""}`);
  };

  const eventCount = filteredMarkets.length * 4;
  const mktCount = filteredMarkets.length;

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="hidden w-52 shrink-0 overflow-y-auto border-r border-white/5 px-2 py-3 md:block">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const isExpanded = expandedGroup === cat.id;
          return (
            <div key={cat.id}>
              <button
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveSub(null);
                  if (cat.sub) setExpandedGroup(isExpanded && isActive ? null : cat.id);
                  updateUrl(cat.id, null);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-emerald-500/30 text-emerald-100 ring-1 ring-emerald-500/50 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.25)]"
                    : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </span>
                {cat.sub && (
                  <ChevronRight className={`h-3.5 w-3.5 transition ${isExpanded ? "rotate-90" : ""}`} />
                )}
              </button>
              {cat.sub && isExpanded && (
                <div className="ml-3 mt-0.5 border-l border-white/5 pl-2">
                  {cat.sub.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setActiveSub(activeSub === s.id ? null : s.id);
                        updateUrl(cat.id, activeSub === s.id ? null : s.id);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-1.5 text-xs transition ${
                        activeSub === s.id ? "text-white font-medium" : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className="text-[10px] text-white/30">{s.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </aside>

      <div className="flex-1 overflow-auto">
        {/* Mobile category pills */}
        <div className="flex gap-2 overflow-x-auto border-b border-white/5 px-3 py-2.5 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveSub(null);
                  updateUrl(cat.id, null);
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-200"
                    : "border-white/10 bg-white/[0.03] text-white/60"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            {subItems ? (
              subItems.map((chip) => {
                const isActive = activeSub === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => {
                      const next = activeSub === chip.id ? null : chip.id;
                      setActiveSub(next);
                      updateUrl(activeCategory, next);
                    }}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      isActive
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-200"
                        : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white/80"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })
            ) : (
              <span className="text-xs text-white/50">{headerLabel}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">
              {eventCount} events · {mktCount} mkts
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              <Search className="h-3 w-3 text-white/40" />
              <input
                placeholder="Search"
                className="w-28 bg-transparent text-xs text-white/80 placeholder:text-white/30 outline-none"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70 hover:bg-white/[0.06] transition">
              <SlidersHorizontal className="h-3 w-3" />
              Filter
            </button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/35">
              <th className="px-4 py-3 text-left font-medium w-10">#</th>
              <th className="px-3 py-3 text-left font-medium">Event</th>
              <th className="px-3 py-3 text-center font-medium">Price</th>
              <th className="px-3 py-3 text-center font-medium">Chart</th>
              <th className="px-3 py-3 text-center font-medium">Δ 24H</th>
              <th className="px-3 py-3 text-center font-medium">
                <span className="inline-flex items-center gap-1">
                  Vol 24H <span className="text-emerald-400">▾</span>
                </span>
              </th>
              <th className="px-3 py-3 text-right font-medium">Liquidity</th>
              <th className="px-3 py-3 text-right font-medium">Ends</th>
              <th className="px-4 py-3 text-center font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMarkets.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center text-sm text-white/40">
                  No markets in this category yet.
                </td>
              </tr>
            ) : (
              filteredMarkets.map((m, i) => (
                <tr key={m.slug} className="group border-b border-white/[0.04] transition hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-xs text-white/40">{i + 1}</td>
                  <td className="px-3 py-3">
                    <Link href={`/trade/${m.slug}`} className="flex items-center gap-3">
                      <MarketIcon m={m} />
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-white">{m.title}</p>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px]">
                          <TagPill tag={m.tag} />
                          {m.endsLabel && <span className="text-white/30">→ {m.endsLabel}</span>}
                          {m.multiMarkets && (
                            <span className="rounded-full bg-emerald-500/15 px-1.5 py-px text-[10px] text-emerald-300">
                              {m.multiMarkets} markets
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </td>
                  {(() => {
                    const q = quoteFor(m);
                    return (
                      <>
                        <td className="px-3 py-3 text-center whitespace-nowrap">
                          <span className="font-medium text-green-400">{q.yes}</span>
                          <span className="mx-1 text-white/20">/</span>
                          <span className="font-medium text-red-400">{q.no}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <Sparkline trend={m.chartTrend} category={m.slug} />
                        </td>
                        <td className={`px-3 py-3 text-center text-xs ${q.deltaUp ? "text-green-400/80" : "text-red-400/80"}`}>
                          {q.delta}
                        </td>
                      </>
                    );
                  })()}
                  <td className="px-3 py-3 text-center font-medium text-white">{m.vol}</td>
                  <td className="px-3 py-3 text-right text-white/60">{m.liquidity}</td>
                  <td className="px-3 py-3 text-right text-xs text-white/40">{m.endsDate}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-white/30 hover:text-white/70 transition" aria-label="Notify">
                        <Bell className="h-3.5 w-3.5" />
                      </button>
                      <button className="text-white/30 hover:text-white/70 transition" aria-label="Share">
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                      <Link
                        href={`/trade/${m.slug}`}
                        className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500 transition"
                      >
                        Trade
                        {m.multiMarkets && <ChevronDown className="h-3 w-3" />}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
