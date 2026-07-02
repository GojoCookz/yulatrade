/**
 * Mirror the market thumbnail images referenced in src/lib/marketImages.ts
 * into public/images/markets/ so the demo has no runtime dependency on the
 * upstream CDN. Run: node scripts/mirror-market-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const PM = "https://polymarket-upload.s3.us-east-2.amazonaws.com/";
const OUT = path.join(process.cwd(), "public", "images", "markets");

const FIFA_COUNTRIES = [
  "japan", "belgium", "argentina", "norway", "france", "portugal",
  "colombia", "spain", "brazil", "england", "germany",
];

/** local name -> remote file */
const FILES = {
  // Sports
  ...Object.fromEntries(
    FIFA_COUNTRIES.map((c) => [`fifa-${c}.png`, `world-cup-winner-${c}-flag-20260603-192743.png`])
  ),
  "fifa-generic.png": "2026-fifa-world-cup-winner-595-8rgoVIZnbKgL.png",
  "ucl.png": "champions-league-pic-QIUFsL8vaDdq.png",
  "nba.jpg": "nba-finals-points-leader-7g2ZEZvMXxLb.jpg",
  "lol.png": "league-of-legends-61a4f083a6.png",
  // Geopolitics
  "ukraine-ceasefire.jpg": "russia-x-ukraine-ceasefire-before-july-GSNGh26whPic.jpg",
  "israel-hezbollah.jpg": "israel-x-hezbollah-ceasefire-extended-by-2-En32lSfFPU.jpg",
  "iran-military.jpg": "trump-announces-end-of-military-operations-against-iran-before-july-KQddUiSdAUpe.jpg",
  "iran-peace.jpg": "us-x-iran-permanent-peace-deal-by-yYlzv70Hi7j9.jpg",
  "iran-ceasefire.jpg": "us-x-iran-ceasefire-by-Cgmx3GCuOwjs.jpg",
  // Elections / politics
  "brazil-election.png": "brazil-presidential-election-37lx5Jgvkbr8.png",
  "france-election.png": "france-presidential-election-2027-U5QY3acvfubZ.png",
  "democrats.png": "democrats+2028+donkey.png",
  "presidential.png": "presidential-election-winner-2024-afdda358-219d-448a-abb5-ba4d14118d71.png",
  // Fed / macro
  "powell.png": "jerome+powell+glasses1.png",
  "fed-chair.png": "who-will-be-confirmed-as-fed-chair-Nq__lShY4XIm.png",
  "crude-oil.png": "crude-oil-9a850ce2a2.png",
  // Crypto
  "btc.png": "BTC+fullsize.png",
  "printr.jpg": "printr-public-sale-total-commitments-bEQ-dWPkB96q.jpg",
  // Culture / people
  "eurovision.png": "eurovision-winner-2026-iQl9DuaXDdeQ.png",
  "clavicular.jpg": "clavicular-expecting-in-2026-xUesVxE7VDgf.jpg",
  "musk.jpg": "elon-musk-of-tweets-nov-22-29-apMPG21-pzx_.jpg",
};

await mkdir(OUT, { recursive: true });

const entries = Object.entries(FILES);
let ok = 0;
const failed = [];

// batches of 4
for (let i = 0; i < entries.length; i += 4) {
  await Promise.all(
    entries.slice(i, i + 4).map(async ([local, remote]) => {
      // S3 keys here contain literal '+' — do not percent-encode.
      const url = PM + remote;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 500) throw new Error(`suspiciously small (${buf.length}B)`);
        await writeFile(path.join(OUT, local), buf);
        ok++;
        console.log(`ok  ${local}  ${(buf.length / 1024).toFixed(0)}KB`);
      } catch (e) {
        failed.push([local, String(e.message ?? e)]);
        console.error(`ERR ${local}: ${e.message ?? e}`);
      }
    })
  );
}

console.log(`\n${ok}/${entries.length} mirrored to public/images/markets`);
if (failed.length) {
  console.error("Failed:", failed);
  process.exit(1);
}
