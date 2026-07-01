import { Suspense } from "react";
import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";
import TrendingClient from "./TrendingClient";

export const metadata = {
  title: "Trending Markets — YULA Terminal",
};

export default function TrendingPage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <Suspense fallback={<div className="flex-1" />}>
        <TrendingClient />
      </Suspense>
      <StatusBar />
      {/* Bottom spacer for status bar */}
      <div className="h-16 shrink-0 lg:h-7" />
    </div>
  );
}
