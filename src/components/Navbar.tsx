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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "py-4 px-4 md:px-8" : "py-6 px-6 md:px-12"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "glass-panel px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/10"
              : "bg-transparent py-2 border-b border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="#home" onClick={(e) => handleLinkClick(e, "#home")} className="group flex items-center gap-2">
            <span className="text-2xl font-black font-outfit tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple group-hover:opacity-85 transition-opacity">
              DISYN
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-400 hover:text-accent-cyan transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-5 h-5" />
            </Link>
            
            <a
              href="#pricing"
              onClick={(e) => handleLinkClick(e, "#pricing")}
              className="ripple-btn relative inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary-bg font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
            >
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
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
            className="fixed inset-0 top-[70px] z-40 w-full h-[calc(100vh-70px)] bg-primary-bg/95 backdrop-blur-lg md:hidden flex flex-col items-center justify-center gap-8 border-t border-white/5"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-2xl font-semibold font-outfit text-gray-300 hover:text-accent-cyan transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col items-center gap-6 mt-8">
              <a
                href="#pricing"
                onClick={(e) => handleLinkClick(e, "#pricing")}
                className="ripple-btn inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary-bg font-bold text-lg"
              >
                Hire Me
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent-cyan transition-colors"
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
