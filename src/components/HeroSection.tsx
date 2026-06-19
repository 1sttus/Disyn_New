"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code, Palette, Zap, Layers } from "lucide-react";

export default function HeroSection() {
  const trackCtaClick = async (ctaType: string) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "click",
          eventDetails: `Hero CTA Click: ${ctaType}`,
        }),
      });
    } catch (e) {
      console.warn("Analytics bypass on click", e);
    }
  };

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Dynamic Animated Backdrop Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-accent-cyan/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-[35vw] h-[35vw] rounded-full bg-accent-purple/10 blur-[130px] animate-float-delayed" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      {/* Floating Glass Cards in Background */}
      <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none select-none">
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[10%] w-48 p-4 card-standard border-white/5 opacity-40 shadow-2xl"
        >
          <div className="flex items-center gap-3 text-accent-cyan mb-2">
            <Palette className="w-5 h-5" />
            <span className="text-xs font-bold tracking-wider font-space">UI/UX DESIGN</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-accent-cyan" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[8%] w-52 p-4 card-standard border-white/5 opacity-40 shadow-2xl"
        >
          <div className="flex items-center gap-3 text-accent-purple mb-2">
            <Code className="w-5 h-5" />
            <span className="text-xs font-bold tracking-wider font-space">WEB DEVELOPER</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[90%] h-full bg-accent-purple" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[18%] right-[15%] w-40 p-3 card-standard border-white/5 opacity-25"
        >
          <div className="flex items-center gap-2 text-text-primary">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="text-[10px] font-bold font-space uppercase">AI Creative Systems</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Glow Micro-Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-standard border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          High-Ticket Creative Systems
        </motion.div>

        {/* Brand Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black font-space tracking-tight leading-none mb-6"
        >
          <span className="text-text-primary">WE BUILD </span>
          <span className="brand-gradient-text text-glow-cyan">
            DISYN
          </span>
        </motion.h1>

        {/* Roles Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-text-secondary font-medium font-space tracking-wide mb-8 max-w-3xl mx-auto flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5"
        >
          <span className="flex items-center gap-1"><Palette className="w-5 h-5 text-accent-cyan" /> UI/UX Design</span>
          <span className="text-text-disabled hidden sm:inline">•</span>
          <span className="flex items-center gap-1"><Code className="w-5 h-5 text-accent-purple" /> Web Development</span>
          <span className="text-text-disabled hidden sm:inline">•</span>
          <span className="flex items-center gap-1"><Layers className="w-5 h-5 text-accent-cyan" /> AI Systems</span>
        </motion.p>

        {/* Short positioning statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          We design experiences, engineer digital products, and build systems that help brands grow. Combining design technology and intelligence.
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              trackCtaClick("Pricing/Hire");
              smoothScrollTo("pricing");
            }}
            className="btn-primary ripple-fx w-full sm:w-auto text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2"
          >
            Hire Me
            <ArrowRight className="w-5 h-5 text-[#0B0F1A]" />
          </button>

          <button
            onClick={() => {
              trackCtaClick("Portfolio");
              smoothScrollTo("portfolio");
            }}
            className="btn-secondary ripple-fx w-full sm:w-auto text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2"
          >
            Explore Work
            <Zap className="w-5 h-5 text-accent-purple" />
          </button>
        </motion.div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none opacity-60">
        <span className="text-[10px] tracking-widest text-text-disabled uppercase font-semibold">SCROLL TO DISCOVER</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-6 bg-accent-cyan/50 rounded-full"
        />
      </div>
    </section>
  );
}
