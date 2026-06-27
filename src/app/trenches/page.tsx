import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";
import TrenchesClient from "./TrenchesClient";

export const metadata = { title: "Trenches — YULA Terminal" };

export default function TrenchesPage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <TrenchesClient />
      <StatusBar />
      <div className="h-16 shrink-0 lg:h-7" />
    </div>
  );
}
