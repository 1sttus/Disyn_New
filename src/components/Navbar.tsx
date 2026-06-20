"use client";

import { useState, useEffect } from "react";
import { Home, User, Briefcase, Tag, Mail, Shield } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Portfolio", href: "#portfolio", icon: Briefcase },
  { name: "Pricing", href: "#pricing", icon: Tag },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
          if (rect.top <= 150 && rect.bottom >= 150) {
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
  };

  return (
    <>
      {/* 💻 DESKTOP FLOATING NAVBAR (Header) */}
      <header
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

          {/* Desktop Nav Links */}
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

          {/* Call to Action Actions */}
          <div className="flex items-center gap-4">
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
              className="hidden md:inline-flex btn-primary ripple-fx text-xs tracking-wider uppercase items-center gap-1.5"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* 📱 MOBILE STICKY BOTTOM TAB BAR (Glassmorphism effect) */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-[#0B0F1A]/80 backdrop-blur-xl p-2.5 flex items-center justify-around shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item)}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-accent-cyan bg-accent-cyan/10"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] font-black uppercase tracking-wider font-space">
                {item.name}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
