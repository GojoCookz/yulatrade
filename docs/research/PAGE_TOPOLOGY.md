# Page Topology — profet.trade

## Pages
1. **Landing Page** (`/`) — Marketing site with 11 sections
2. **Terminal/Trending** (`/trending`) — Market listing dashboard
3. **Trade Detail** (`/trade/[slug]`) — Individual market trading view

## Landing Page Sections (top to bottom)

| # | Name | Type | Interaction |
|---|------|------|-------------|
| 1 | Navbar | Fixed overlay | Click: Log In opens auth modal, Sign Up opens auth modal, Open Terminal links to /trending, mobile hamburger |
| 2 | AuthModal | Modal overlay | Click: tab toggle (Log In/Sign Up), 4 auth methods |
| 3 | HeroSection | Flow | Fade-in animation on load, video embed in browser mockup |
| 4 | SpeedComparisonSection | Flow | Scroll-triggered fade-in, side-by-side cards with "vs" divider |
| 5 | MillisecondSection | Flow | Scroll-triggered, animated counter 0.000 → 0.043 |
| 6 | TelegramSection | Flow | Scroll-triggered, phone mockup with chat messages |
| 7 | CopyTradingSection | Flow | Scroll-triggered, two-column: trade feed left, description right |
| 8 | MarketsSection | Flow | 3-column grid, market cards with flag images, prices, volumes |
| 9 | SecuritySection | Flow | Scroll-triggered, card with You → Turnkey HSM → Polymarket diagram |
| 10 | CTASection | Flow | Scroll-triggered fade-in |
| 11 | FAQSection | Flow | Two-column: heading left, accordion right, +/x toggle |
| 12 | Footer | Flow | 4-column: logo+social, Product, Resources, Legal |

## Terminal Page Layout (/trending)

- **Top Nav**: Same PROFET branding + Trending, Browse, Trenches, Up or Down, Whales, Portfolio, Copy, Referrals + Paste Market URL/ID, Search, Deposit, Login
- **Filter Bar**: Time filters (1m, 3m, 5m, 1h, 6h, 24h, 7D), Filter button, LIVE indicator, Search, Quick Buy $
- **Market Table**: Columns: MARKET (flag img + title + tags), CHART (sparkline), PRICE (Yes green/No red), delta, VOL, LIQ, B/S TXS, TRADERS, ACTION (Trade button)
- **Bottom Status Bar**: Connected, Wallets, Trenches, Referrals, market count, save count, Polygon, social links

## Trade Detail Page Layout (/trade/[slug])

- **Top Nav**: Same as terminal
- **Market Header**: Title, tags (1% Pro), Yes/No prices, 24h change, Volume, Liquidity
- **Chart Area**: TradingView-style price chart, timeframe selectors (1m-1M), Line/Candle toggle
- **Right Panel**: Buy/Sell toggle, Market/Limit/DCA tabs, amount input with presets, gas info, action button
- **Market Intelligence**: Makers, Whales, Pro Traders, Top 10 Holders with YES/NO bars
- **Below Chart Tabs**: Trades, Orderbook, Positions, Holders (62), Top Traders, Related Markets, News
- **Trade Feed Table**: Age, Side, Outcome, Price, Shares, USDC, Trader
- **Bottom Status Bar**: Same as terminal
