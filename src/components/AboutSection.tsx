"use client";

import { motion } from "framer-motion";
import { Briefcase, Target, ShieldCheck, Zap, Palette, Code, Layers, Sparkles } from "lucide-react";

export default function AboutSection() {
  // Motion fade-up definition
  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
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

  const valueCards = [
    {
      id: 1,
      title: "Brand Identity Systems",
      description: "I create visual identities that position your brand as premium, credible, and unforgettable.",
      icon: Palette,
      accent: "text-accent-cyan",
      bg: "hover:border-accent-cyan/30 shadow-accent-cyan/5",
    },
    {
      id: 2,
      title: "High-Converting Websites",
      description: "Web experiences designed to turn visitors into leads and paying clients.",
      icon: Code,
      accent: "text-accent-purple",
      bg: "hover:border-accent-purple/30 shadow-accent-purple/5",
    },
    {
      id: 3,
      title: "UI/UX Product Design",
      description: "Clean, intuitive interfaces that make digital products feel effortless to use.",
      icon: Layers,
      accent: "text-accent-cyan",
      bg: "hover:border-accent-cyan/30 shadow-accent-cyan/5",
    },
    {
      id: 4,
      title: "AI-Enhanced Creative Systems",
      description: "Smart workflows that automate design, content, and business operations.",
      icon: Sparkles,
      accent: "text-accent-purple",
      bg: "hover:border-accent-purple/30 shadow-accent-purple/5",
    },
  ];

  return (
    <div id="about" className="space-y-32 py-24 relative overflow-hidden bg-secondary-bg/50">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-accent-purple/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-accent-cyan/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-32">
        
        {/* ========================================================================= */}
        {/* 💼 SECTION 2 — AUTHORITY POSITIONING                                      */}
        {/* ========================================================================= */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="space-y-12 border-b border-white/5 pb-20"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center md:text-left max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-accent-cyan uppercase font-space">STRATEGY FIRST</span>
            <h2 className="text-3xl md:text-5xl font-black font-space mt-2 text-white leading-tight">
              Creative work with business intent.<br />
              <span className="brand-gradient-text">Not decoration. Strategy.</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mt-4 rounded-full md:mx-0 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Core statement */}
            <motion.div variants={fadeUp} className="md:col-span-6 bg-white/[0.01] border border-white/5 p-8 rounded-2xl backdrop-blur-md">
              <p className="text-text-disabled text-xs font-semibold uppercase tracking-widest font-space mb-2">Core Principle</p>
              <blockquote className="text-lg md:text-xl font-medium text-text-secondary leading-relaxed italic border-l-2 border-accent-cyan pl-4">
                "Every project I work on is built around one principle: If it doesn’t improve perception, usability, or conversion — it doesn’t ship."
              </blockquote>
            </motion.div>

            {/* Specialization List */}
            <motion.div variants={fadeUp} className="md:col-span-6 space-y-6">
              <p className="text-text-muted text-sm leading-relaxed">
                I specialize in engineering cohesive solutions designed to achieve specific goals: attracting attention, building credibility, and driving growth.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Brand Identity Systems", desc: "Communicate value instantly", icon: ShieldCheck },
                  { title: "UI/UX Product Design", desc: "Guide user behavior", icon: Target },
                  { title: "High-Performance Web", desc: "Engage and convert leads", icon: Zap },
                  { title: "AI Creative Workflows", desc: "Automate scale and operations", icon: Sparkles },
                ].map((spec, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3 bg-white/[0.01] border border-white/5 rounded-xl hover:border-accent-cyan/10 transition-colors">
                    <spec.icon className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-space">{spec.title}</h4>
                      <p className="text-[10px] text-text-disabled mt-0.5">{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>


        {/* ========================================================================= */}
        {/* ⚙️ SECTION 3 — WHAT I DO (VALUE STACK)                                   */}
        {/* ========================================================================= */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center">
            <span className="text-xs font-bold tracking-widest text-accent-purple uppercase font-space">THE VALUE STACK</span>
            <h2 className="text-3xl md:text-5xl font-black font-space mt-2 text-white">
              What I help you build
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valueCards.map((card) => (
              <motion.div
                key={card.id}
                variants={fadeUp}
                whileHover={{ y: -6, rotate: 0.2 }}
                transition={{ duration: 0.2 }}
                className={`card-standard p-8 border-white/5 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all bg-[#0D111F]/50 ${card.bg}`}
              >
                <div className="space-y-4">
                  <div className={`p-3 bg-white/[0.02] border border-white/10 rounded-xl w-fit ${card.accent}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-space text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>


        {/* ========================================================================= */}
        {/* 🧠 SECTION 6 — ABOUT (PERSONAL POSITIONING)                               */}
        {/* ========================================================================= */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="border-t border-white/5 pt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest text-accent-cyan uppercase font-space">WHO I AM</span>
              <h2 className="text-3xl md:text-5xl font-black font-space text-white">
                Designing Systems.<br />
                <span className="brand-gradient-text">Creating Impact.</span>
              </h2>
              
              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                I’m Disyn — a Nigerian creative professional focused on building modern digital systems through design, technology, and strategy.
              </p>

              {/* Intersection Lists */}
              <div className="space-y-3 border-l border-accent-purple/20 pl-4 py-1">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-widest font-space">My work sits at the intersection of:</p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                    <strong>Creativity</strong> — Disruptive concepts that establish authority.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    <strong>Functionality</strong> — Secure, highly responsive code infrastructure.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                    <strong>Business growth</strong> — Engineering triggers to convert actions.
                  </li>
                </ul>
              </div>

              <blockquote className="text-sm font-bold text-accent-cyan tracking-wide font-space uppercase">
                "I believe design is not art for display — it is infrastructure for communication and conversion."
              </blockquote>
            </motion.div>

            {/* Right Graphic Box */}
            <motion.div variants={fadeUp} className="lg:col-span-5 card-standard p-8 border-white/10 bg-gradient-to-br from-accent-cyan/[0.02] to-accent-purple/[0.02] relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent-cyan/10 blur-xl pointer-events-none" />
              <div className="space-y-4 text-center">
                <Briefcase className="w-12 h-12 text-accent-purple mx-auto mb-2 animate-bounce" />
                <h4 className="text-base font-bold font-space text-white uppercase tracking-wider">CREATIVE SYSTEMS LAB</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Combining modern tech blueprints like Next.js, Framer Motion, and intelligent AI layers to elevate client ventures.
                </p>
                <span className="inline-block text-[10px] uppercase font-bold text-accent-cyan border border-accent-cyan/20 px-3 py-1 rounded-full font-space tracking-widest bg-accent-cyan/5">
                  Lagos, Nigeria
                </span>
              </div>
            </motion.div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
