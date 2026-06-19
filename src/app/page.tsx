"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  // Track Page Visit on Load
  useEffect(() => {
    async function trackVisit() {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventType: "visit",
            eventDetails: "Landing Page Visit",
          }),
        });
      } catch (err) {
        console.warn("Analytics visit tracking bypassed:", err);
      }
    }
    trackVisit();
  }, []);

  return (
    <>
      {/* Premium Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <PricingSection />
        <ContactSection />
      </main>

      {/* Premium Footer */}
      <footer className="py-8 bg-[#070A12] border-t border-white/5 text-center text-xs text-gray-500 font-medium">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} DISYN. All rights reserved. Designed for Premium Creative Systems.</p>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-accent-cyan transition-colors">Back to Top</a>
            <span>•</span>
            <a href="/admin/dashboard" className="hover:text-accent-cyan transition-colors">Admin Portal</a>
          </div>
        </div>
      </footer>
    </>
  );
}
