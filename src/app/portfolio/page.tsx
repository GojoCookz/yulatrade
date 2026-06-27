import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";
import PortfolioClient from "./PortfolioClient";

export const metadata = { title: "Portfolio — YULA Terminal" };

export default function PortfolioPage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <PortfolioClient />
      <StatusBar />
      <div className="h-16 shrink-0 lg:h-7" />
    </div>
  );
}
