"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Shield } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section based on scroll offset
      const sections = ["home", "about", "portfolio", "pricing", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            const name = section === "home" ? "Home" : section.charAt(0).toUpperCase() + section.slice(1);
            setActiveItem(name);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string, href: string }) => {
    e.preventDefault();
    const targetId = item.href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
    setActiveItem(item.name);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "py-3 px-4 md:px-8" : "py-5 px-6 md:px-12"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "navbar-container px-6 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/5"
              : "bg-transparent py-2 border-b border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="#home" onClick={(e) => handleLinkClick(e, { name: "Home", href: "#home" })} className="group flex items-center gap-2">
            <span className="text-2xl font-black font-space tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple group-hover:opacity-85 transition-opacity">
              DISYN
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`text-xs font-bold uppercase tracking-widest transition-all duration-200 relative group px-4 py-2 ${
                    isActive
                      ? "nav-item-active text-accent-cyan"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {item.name}
                  {!isActive && <span className="nav-underline-anim" />}
                </a>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-text-muted hover:text-accent-cyan transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-5 h-5" />
            </Link>
            
            <a
              href="#pricing"
              onClick={(e) => handleLinkClick(e, { name: "Pricing", href: "#pricing" })}
              className="btn-primary ripple-fx text-xs tracking-wider uppercase inline-flex items-center gap-1.5"
            >
              Hire Me
              <ArrowUpRight className="w-4 h-4 text-[#0B0F1A]" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-[70px] z-40 w-full h-[calc(100vh-70px)] bg-primary-bg/95 backdrop-blur-lg md:hidden flex flex-col items-center justify-center gap-6 border-t border-white/5"
          >
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`text-2xl font-bold font-space uppercase tracking-widest px-6 py-2 ${
                    isActive
                      ? "text-accent-cyan border-b-2 border-accent-cyan"
                      : "text-text-secondary"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            <div className="flex flex-col items-center gap-6 mt-8">
              <a
                href="#pricing"
                onClick={(e) => handleLinkClick(e, { name: "Pricing", href: "#pricing" })}
                className="btn-primary ripple-fx text-sm tracking-wider uppercase inline-flex items-center gap-2 px-8 py-3"
              >
                Hire Me
                <ArrowUpRight className="w-5 h-5 text-[#0B0F1A]" />
              </a>
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-text-disabled hover:text-accent-cyan transition-colors"
              >
                <Shield className="w-4 h-4" />
                Admin Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
