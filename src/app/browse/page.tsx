import { Suspense } from "react";
import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";
import BrowseClient from "./BrowseClient";

export const metadata = {
  title: "Browse Markets — YULA Terminal",
};

export default function BrowsePage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <Suspense fallback={<div className="flex-1" />}>
        <BrowseClient />
      </Suspense>
      <StatusBar />
      <div className="h-16 shrink-0 lg:h-7" />
    </div>
  );
}
