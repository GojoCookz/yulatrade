import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";
import CopyClient from "./CopyClient";

export const metadata = { title: "Copy Trading — YULA Terminal" };

export default function CopyPage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <CopyClient />
      <StatusBar />
      <div className="h-16 shrink-0 lg:h-7" />
    </div>
  );
}
