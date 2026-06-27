import TerminalNav from "@/components/terminal/TerminalNav";
import FilterBar from "@/components/terminal/FilterBar";
import MarketTable from "@/components/terminal/MarketTable";
import StatusBar from "@/components/terminal/StatusBar";

export const metadata = {
  title: "Trending Markets — YULA Terminal",
};

export default function TrendingPage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <FilterBar />
      <MarketTable />
      <StatusBar />
      {/* Bottom spacer for status bar */}
      <div className="h-16 shrink-0 lg:h-7" />
    </div>
  );
}
