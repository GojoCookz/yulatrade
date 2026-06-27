import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yula — Prediction Market Terminal",
  description: "Your unfair advantage on Polymarket. Sub-50ms execution, copy trading, and Telegram bot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#050505] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
