/**
 * Topical market thumbnails, matched by market title keywords so every
 * page (trending, browse, trenches) picks them up without per-row wiring.
 * Assets are mirrored locally under public/images/markets (see
 * scripts/mirror-market-images.mjs) so the demo has no runtime dependency
 * on any external CDN. Returns null when no topical image fits — callers
 * fall back to flags / coin icons / seeded placeholders.
 */

const IMG = "/images/markets/";

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
    if (country) return `${IMG}fifa-${country}.png`;
    return `${IMG}fifa-generic.png`;
  }
  if (t.includes("champions league") || t.includes("ucl")) return `${IMG}ucl.png`;
  if (t.includes("nba")) return `${IMG}nba.jpg`;
  if (t.includes("lol:") || t.includes("league of legends") || t.includes("worlds")) return `${IMG}lol.png`;

  // Geopolitics
  if (t.includes("ukraine")) return `${IMG}ukraine-ceasefire.jpg`;
  if (t.includes("hezbollah") || t.includes("israel")) return `${IMG}israel-hezbollah.jpg`;
  if (t.includes("iran") && (t.includes("military") || t.includes("blockade") || t.includes("hormuz"))) {
    return `${IMG}iran-military.jpg`;
  }
  if (t.includes("iran") && t.includes("peace")) return `${IMG}iran-peace.jpg`;
  if (t.includes("iran")) return `${IMG}iran-ceasefire.jpg`;

  // Elections / politics
  if (t.includes("brazil") && (t.includes("presidential") || t.includes("election"))) {
    return `${IMG}brazil-election.png`;
  }
  if (t.includes("knafo") || t.includes("bardella") || (t.includes("french") && t.includes("presidential"))) {
    return `${IMG}france-election.png`;
  }
  if (t.includes("democrat")) return `${IMG}democrats.png`;
  if (t.includes("presidential") || t.includes("impeachment")) return `${IMG}presidential.png`;

  // Fed / macro
  if (t.includes("powell") || (t.includes("fed") && t.includes("chair"))) return `${IMG}powell.png`;
  if (t.includes("fed") || t.includes("rate cut") || t.includes("inflation") || t.includes("treasury") || t.includes("recession")) {
    return `${IMG}fed-chair.png`;
  }
  if (t.includes("oil") || t.includes("lng") || t.includes("crude") || t.includes("wti")) return `${IMG}crude-oil.png`;

  // Crypto
  if (t.includes("bitcoin") || t.includes("btc")) return `${IMG}btc.png`;
  if (t.includes("printr")) return `${IMG}printr.jpg`;

  // Culture / people
  if (t.includes("eurovision")) return `${IMG}eurovision.png`;
  if (t.includes("clavicular")) return `${IMG}clavicular.jpg`;
  if (t.includes("musk")) return `${IMG}musk.jpg`;

  return null;
}
