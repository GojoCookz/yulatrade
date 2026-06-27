import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";
import ReferralsClient from "./ReferralsClient";

export const metadata = { title: "Referrals — YULA Terminal" };

export default function ReferralsPage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <ReferralsClient />
      <StatusBar />
      <div className="h-7 shrink-0" />
    </div>
  );
}
