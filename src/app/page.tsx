import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SpeedComparisonSection from "@/components/SpeedComparisonSection";
import MillisecondSection from "@/components/MillisecondSection";
import TelegramSection from "@/components/TelegramSection";
import CopyTradingSection from "@/components/CopyTradingSection";
import MarketsSection from "@/components/MarketsSection";
import TokenSection from "@/components/TokenSection";
import SecuritySection from "@/components/SecuritySection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] text-white">
        <HeroSection />
        <SpeedComparisonSection />
        <MillisecondSection />
        <TelegramSection />
        <CopyTradingSection />
        <MarketsSection />
        <TokenSection />
        <SecuritySection />
        <CTASection />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
}
