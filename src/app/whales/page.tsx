import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";
import WhalesClient from "./WhalesClient";

export const metadata = {
  title: "Whales — YULA Terminal",
};

export default function WhalesPage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <WhalesClient />
      <StatusBar />
      <div className="h-7 shrink-0" />
    </div>
  );
}
