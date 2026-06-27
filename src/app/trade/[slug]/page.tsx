import TradePageClient from "./TradePageClient";

export default async function TradePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TradePageClient slug={slug} />;
}
