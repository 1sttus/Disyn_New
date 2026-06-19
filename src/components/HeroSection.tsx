"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Code, Palette, Zap, Layers } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Apple-style fade out and scale down on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

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

  // Base motion animations
  const fadeUp: any = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <motion.section
      id="home"
      ref={targetRef}
      style={{ opacity, scale, y }}
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
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto px-6 relative z-10 text-center"
      >
        {/* Glow Micro-Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-standard border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          Creative Systems Designer
        </motion.div>

        {/* Brand Headline (H1) */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-8xl font-black font-space tracking-tight leading-none mb-6"
        >
          <span className="brand-gradient-text text-glow-cyan">
            Design. Build. Scale.
          </span>
        </motion.h1>

        {/* Roles Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-text-secondary font-medium font-space tracking-wide mb-6 max-w-3xl mx-auto"
        >
          I’m Disyn — a Creative Systems Designer building high-performance digital experiences through UI/UX, web development, and AI-powered creative systems.
        </motion.p>

        {/* Value Statement */}
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-accent-cyan font-bold max-w-2xl mx-auto mb-10 leading-relaxed font-space tracking-wide uppercase"
        >
          I don’t just design visuals. I design systems that help brands attract attention, convert users, and grow revenue.
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5"
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
            View Selected Work
            <Zap className="w-5 h-5 text-accent-purple" />
          </button>
        </motion.div>

        {/* Micro Trust Line */}
        <motion.p
          variants={fadeUp}
          className="text-xs text-text-muted italic tracking-wide"
        >
          Available for high-impact design projects & long-term collaborations.
        </motion.p>
      </motion.div>

      {/* Floating Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none opacity-60">
        <span className="text-[10px] tracking-widest text-text-disabled uppercase font-semibold">SCROLL TO STORY</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-6 bg-accent-cyan/50 rounded-full"
        />
      </div>
    </motion.section>
  );
}
