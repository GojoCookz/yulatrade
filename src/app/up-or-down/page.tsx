import { Suspense } from "react";
import TerminalNav from "@/components/terminal/TerminalNav";
import StatusBar from "@/components/terminal/StatusBar";
import UpDownClient from "./UpDownClient";

export const metadata = {
  title: "Up or Down — YULA Terminal",
};

export default function UpOrDownPage() {
  return (
    <div className="flex h-screen flex-col bg-[#050505]">
      <TerminalNav />
      <Suspense fallback={<div className="flex-1" />}>
        <UpDownClient />
      </Suspense>
      <StatusBar />
      <div className="h-7 shrink-0" />
    </div>
  );
}
