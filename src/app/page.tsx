"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Authority", href: "#authority" },
  { label: "Value", href: "#value" },
  { label: "Work", href: "#portfolio" },
  { label: "Packages", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const mobileNavItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#portfolio" },
  { label: "Value", href: "#value" },
  { label: "Packages", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const focusAreas = [
  "Brand systems",
  "Graphic design",
  "UI/UX systems",
  "Conversion-focused websites",
  "Church, school, and organization graphics",
  "AI workflows",
];

const valueBlocks = [
  {
    title: "Brand Identity Systems",
    description:
      "Logo direction, identity foundations, visual language, and brand materials that make people trust the work before the first conversation.",
  },
  {
    title: "Graphic Design for Institutions",
    description:
      "Flyers, campaign visuals, event graphics, and communication materials for churches, schools, organizations, and public-facing programs.",
  },
  {
    title: "High-Converting Websites",
    description:
      "Landing pages and business websites structured around attention, proof, action, and measurable lead flow.",
  },
  {
    title: "UI/UX Product Design",
    description:
      "Interface systems for digital products that reduce friction, clarify decisions, and make complex actions feel simple.",
  },
  {
    title: "AI Creative Systems",
    description:
      "AI-assisted workflows for content, creative operations, automation, and repeatable business execution.",
  },
];

const projects = [
  {
    title: "Church Conference Visual System",
    category: "Church Graphic Design",
    problem: "A church program needed a stronger visual language for flyers, social posts, and announcement materials.",
    solution: "Created a consistent event identity with bold typography, worship-centered layout direction, and reusable graphic templates.",
    outcome: "A clearer campaign system for digital promotion, Sunday announcements, and printed communication.",
    status: "Selected Sample",
  },
  {
    title: "School Admission Campaign",
    category: "School Graphic Design",
    problem: "A school needed admission materials that parents could understand quickly and share easily.",
    solution: "Designed flyer, social, and information layouts with cleaner hierarchy and a more credible visual system.",
    outcome: "A professional campaign direction that made the admission message easier to read and act on.",
    status: "Selected Sample",
  },
  {
    title: "Organization Brand Refresh",
    category: "Brand Design",
    problem: "An organization had scattered visuals that made its communication feel inconsistent across channels.",
    solution: "Built a brand design direction with improved color usage, typography, layout rules, and presentation assets.",
    outcome: "A more unified identity for proposals, events, social communication, and internal documents.",
    status: "Selected Sample",
  },
  {
    title: "Conversion Portfolio System",
    category: "Web + Brand System",
    problem: "The brand looked capable, but the page did not guide visitors toward a clear buying decision.",
    solution: "Rebuilt the homepage around positioning, proof, services, and direct WhatsApp conversion.",
    outcome: "A sharper narrative with fewer distractions and a stronger inquiry path.",
    status: "Live Case Study",
  },
  {
    title: "AI Workflow Architecture",
    category: "Upcoming Project",
    problem: "Creative work was taking too long because content and design tasks were handled manually.",
    solution: "Designed an AI-assisted workflow for repeatable content generation and review.",
    outcome: "A faster production rhythm without losing strategic control or brand consistency.",
    status: "Upcoming",
  },
];

const packages = [
  {
    title: "Starter Brand System",
    price: "$1,500",
    description: "For individuals and small brands ready to look intentional and credible.",
    features: ["Visual direction", "Basic identity system", "Social media foundation"],
  },
  {
    title: "Pro Brand + Website System",
    price: "$3,200",
    description: "For serious businesses ready to turn attention into structured demand.",
    features: ["Full brand identity", "Website UI/UX design", "Conversion-focused homepage"],
    featured: true,
  },
  {
    title: "Premium Digital System",
    price: "$5,000",
    description: "For brands that need a complete digital presence and scalable creative system.",
    features: ["Brand system", "High-converting website", "UI/UX direction", "AI workflow strategy"],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

async function trackClick(label: string) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "click",
        eventDetails: label,
      }),
    });
  } catch {
    // Analytics should never block the primary conversion path.
  }
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative px-6 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-cyan">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </motion.section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  useEffect(() => {
    async function trackVisit() {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "visit",
            eventDetails: "Portfolio homepage visit",
          }),
        });
      } catch {
        // Keep the page quiet if analytics is unavailable.
      }
    }

    trackVisit();
  }, []);

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "2348083439674"}?text=${encodeURIComponent(
    "Hi Disyn, I am interested in a design, web, or AI systems project."
  )}`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-text-primary">
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          style={{ y: orbOneY }}
          className="absolute left-[-10%] top-[12%] h-[24rem] w-[24rem] rounded-full bg-accent-cyan/10 blur-[120px]"
        />
        <motion.div
          style={{ y: orbTwoY }}
          className="absolute right-[-8%] top-[42%] h-[28rem] w-[28rem] rounded-full bg-accent-purple/10 blur-[140px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-8">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#070A12]/70 px-5 py-3 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="text-sm font-black uppercase tracking-[0.32em] text-white"
          >
            Disyn
          </button>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              trackClick("Navigation Hire Me");
              scrollToSection("contact");
            }}
            className="rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-primary-bg transition hover:scale-[1.03]"
          >
            Hire Me
          </button>
        </nav>
      </header>

      <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-[#070A12]/70 px-2 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
        {mobileNavItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-text-muted transition hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <motion.section
        id="home"
        ref={heroRef}
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 flex min-h-screen items-center px-6 pb-20 pt-32"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mx-auto w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-accent-cyan"
          >
            Creative Systems Designer
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-8 max-w-5xl text-6xl font-black leading-[0.9] text-white md:text-8xl lg:text-9xl"
          >
            Design. Build. Scale.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-3xl text-lg font-medium leading-8 text-text-secondary md:text-2xl"
          >
            Creative Systems Designer specializing in Brand Design, Graphic Design, UI/UX, Web, and AI systems.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base font-bold uppercase tracking-[0.12em] text-accent-cyan md:text-lg"
          >
            I design systems that turn attention into revenue.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => {
                trackClick("Hero Hire Me");
                scrollToSection("contact");
              }}
              className="w-full rounded-full bg-accent-cyan px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-primary-bg transition hover:scale-[1.04] hover:bg-white sm:w-auto"
            >
              Hire Me
            </button>
            <button
              type="button"
              onClick={() => {
                trackClick("Hero View Selected Work");
                scrollToSection("portfolio");
              }}
              className="w-full rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:scale-[1.04] hover:bg-white/10 sm:w-auto"
            >
              View Selected Work
            </button>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-7 text-sm text-text-muted">
            Available for high-impact design projects and long-term collaborations.
          </motion.p>
        </motion.div>
      </motion.section>

      <SectionShell
        id="authority"
        eyebrow="Authority"
        title="Creative work with business intent. Not decoration. Strategy."
        className="z-10 bg-[#090D16]/70"
      >
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.p variants={fadeUp} className="text-xl leading-9 text-text-secondary md:text-2xl">
            Every project is shaped to improve perception, usability, and conversion. The goal is not just to make a brand look better. The goal is to make people understand, trust, and act faster, whether it is a brand identity, church flyer, school campaign, organization design system, website, or product interface.
          </motion.p>
          <motion.div variants={stagger} className="grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <motion.div
                key={area}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm font-bold uppercase tracking-[0.16em] text-white"
              >
                {area}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionShell>

      <SectionShell id="value" eyebrow="Value Stack" title="What I help you build" className="z-10">
        <motion.div variants={stagger} className="mt-12 grid gap-5 md:grid-cols-2">
          {valueBlocks.map((block) => (
            <motion.article
              key={block.title}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.015 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/20 transition"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-cyan">
                {block.title}
              </p>
              <p className="mt-5 text-base leading-8 text-text-secondary">{block.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </SectionShell>

      <SectionShell
        id="portfolio"
        eyebrow="Selected Work"
        title="Selected work samples with problem, solution, and outcome."
        className="z-10 bg-[#090D16]/70"
      >
        <motion.div variants={stagger} className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.02 }}
              className="rounded-[2rem] border border-white/10 bg-[#0D111F]/80 p-7"
            >
              <p className="mb-5 flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-accent-cyan">
                <span>{project.category}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-text-muted">
                  {project.status}
                </span>
              </p>
              <h3 className="text-2xl font-black text-white">{project.title}</h3>
              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-text-muted">Problem</p>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-text-muted">Solution</p>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">{project.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-cyan">Outcome</p>
                  <p className="mt-2 text-sm leading-7 text-white">{project.outcome}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </SectionShell>

      <SectionShell id="pricing" eyebrow="Services" title="Services & Design Packages" className="z-10">
        <motion.div variants={stagger} className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((pack) => (
            <motion.article
              key={pack.title}
              variants={fadeUp}
              whileHover={{ y: -8, scale: pack.featured ? 1.035 : 1.02 }}
              className={`relative rounded-[2rem] border p-7 ${
                pack.featured
                  ? "border-accent-cyan/45 bg-accent-cyan/[0.09] shadow-[0_0_55px_rgba(0,229,255,0.16)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {pack.featured && (
                <p className="mb-5 w-fit rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary-bg">
                  Recommended
                </p>
              )}
              <h3 className="text-2xl font-black text-white">{pack.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{pack.description}</p>
              <p className="mt-8 text-4xl font-black text-white">{pack.price}</p>
              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {pack.features.map((feature) => (
                  <p key={feature} className="text-sm font-semibold text-text-secondary">
                    {feature}
                  </p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  trackClick(`Package CTA: ${pack.title}`);
                  scrollToSection("contact");
                }}
                className={`mt-8 w-full rounded-full px-5 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:scale-[1.03] ${
                  pack.featured
                    ? "bg-white text-primary-bg"
                    : "border border-white/15 text-white hover:bg-white/10"
                }`}
              >
                Start With This
              </button>
            </motion.article>
          ))}
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-12 max-w-xl rounded-full border border-accent-warning/25 bg-accent-warning/5 px-6 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-accent-warning"
        >
          Limited availability for quality-focused work.
        </motion.p>
      </SectionShell>

      <motion.section
        id="contact"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8 text-center shadow-2xl shadow-black/30 md:p-14">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.28em] text-accent-cyan">
            Contact
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
            Let&apos;s build something intentional
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
            If you need a brand, interface, website, or AI workflow that carries business weight, send the project context and the outcome you want to create.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackClick("WhatsApp Contact CTA")}
            animate={{ scale: [1, 1.025, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-9 inline-flex rounded-full bg-accent-green px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:scale-[1.06]"
          >
            Contact on WhatsApp
          </motion.a>
          <motion.p variants={fadeUp} className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
            Serious inquiries only.
          </motion.p>
        </div>
      </motion.section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-disabled sm:flex-row sm:items-center sm:justify-between">
          <p>Disyn. Creative systems for clarity, conversion, and scale.</p>
          <Link href="/admin/dashboard" className="transition hover:text-accent-cyan">
            Admin
          </Link>
        </div>
      </footer>
    </main>
  );
}
