/**
 * Topical market thumbnails resolved from Polymarket's public event-image
 * CDN (the same hotlinkable S3 bucket the live terminals use). Matched by
 * market title keywords so every page (trending, browse, trenches) picks
 * them up without per-row wiring. Returns null when no topical image fits —
 * callers fall back to flags / coin icons / seeded placeholders.
 */

const PM = "https://polymarket-upload.s3.us-east-2.amazonaws.com/";

const FIFA_COUNTRIES = [
  "japan",
  "belgium",
  "argentina",
  "norway",
  "france",
  "portugal",
  "colombia",
  "spain",
  "brazil",
  "england",
  "germany",
] as const;

export function getMarketImage(title: string): string | null {
  const t = title.toLowerCase();

  // Sports
  if (t.includes("fifa") || t.includes("world cup")) {
    const country = FIFA_COUNTRIES.find((c) => t.includes(c));
    if (country) return `${PM}world-cup-winner-${country}-flag-20260603-192743.png`;
    return `${PM}2026-fifa-world-cup-winner-595-8rgoVIZnbKgL.png`;
  }
  if (t.includes("champions league") || t.includes("ucl")) return `${PM}champions-league-pic-QIUFsL8vaDdq.png`;
  if (t.includes("nba")) return `${PM}nba-finals-points-leader-7g2ZEZvMXxLb.jpg`;
  if (t.includes("lol:") || t.includes("league of legends") || t.includes("worlds")) return `${PM}league-of-legends-61a4f083a6.png`;

  // Geopolitics
  if (t.includes("ukraine")) return `${PM}russia-x-ukraine-ceasefire-before-july-GSNGh26whPic.jpg`;
  if (t.includes("hezbollah") || t.includes("israel")) return `${PM}israel-x-hezbollah-ceasefire-extended-by-2-En32lSfFPU.jpg`;
  if (t.includes("iran") && (t.includes("military") || t.includes("blockade") || t.includes("hormuz"))) {
    return `${PM}trump-announces-end-of-military-operations-against-iran-before-july-KQddUiSdAUpe.jpg`;
  }
  if (t.includes("iran") && t.includes("peace")) return `${PM}us-x-iran-permanent-peace-deal-by-yYlzv70Hi7j9.jpg`;
  if (t.includes("iran")) return `${PM}us-x-iran-ceasefire-by-Cgmx3GCuOwjs.jpg`;

  // Elections / politics
  if (t.includes("brazil") && (t.includes("presidential") || t.includes("election"))) {
    return `${PM}brazil-presidential-election-37lx5Jgvkbr8.png`;
  }
  if (t.includes("knafo") || t.includes("bardella") || (t.includes("french") && t.includes("presidential"))) {
    return `${PM}france-presidential-election-2027-U5QY3acvfubZ.png`;
  }
  if (t.includes("democrat")) return `${PM}democrats+2028+donkey.png`;
  if (t.includes("presidential") || t.includes("impeachment")) {
    return `${PM}presidential-election-winner-2024-afdda358-219d-448a-abb5-ba4d14118d71.png`;
  }

  // Fed / macro
  if (t.includes("powell") || (t.includes("fed") && t.includes("chair"))) return `${PM}jerome+powell+glasses1.png`;
  if (t.includes("fed") || t.includes("rate cut") || t.includes("inflation") || t.includes("treasury") || t.includes("recession")) {
    return `${PM}who-will-be-confirmed-as-fed-chair-Nq__lShY4XIm.png`;
  }
  if (t.includes("oil") || t.includes("lng") || t.includes("crude") || t.includes("wti")) return `${PM}crude-oil-9a850ce2a2.png`;

  // Crypto
  if (t.includes("bitcoin") || t.includes("btc")) return `${PM}BTC+fullsize.png`;
  if (t.includes("printr")) return `${PM}printr-public-sale-total-commitments-bEQ-dWPkB96q.jpg`;

  // Culture / people
  if (t.includes("eurovision")) return `${PM}eurovision-winner-2026-iQl9DuaXDdeQ.png`;
  if (t.includes("clavicular")) return `${PM}clavicular-expecting-in-2026-xUesVxE7VDgf.jpg`;
  if (t.includes("musk")) return `${PM}elon-musk-of-tweets-nov-22-29-apMPG21-pzx_.jpg`;

  return null;
}
