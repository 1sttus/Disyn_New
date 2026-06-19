"use client";

import React, { useState } from "react";
import { Send, Mail, MapPin, Phone, Loader2, Check } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          packageName: `Custom Inquiry: ${message.slice(0, 40)}...`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error(data.error || "Failed to submit lead");
      }
    } catch (err) {
      console.error(err);
      alert("Submission encountered an issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const trackSocialClick = async (platform: string) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "click",
          eventDetails: `Social Link Clicked: ${platform}`,
        }),
      });
    } catch (e) {
      console.warn("Analytics tracking bypassed");
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent-cyan/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-accent-cyan uppercase">CONNECT WITH US</span>
          <h2 className="text-3xl md:text-5xl font-black font-space mt-2 text-white">
            START YOUR ENGINE
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Contact details & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between card-standard p-8 border-white/5 bg-secondary-bg/25">
            <div>
              <h3 className="text-2xl font-black font-space text-white mb-4">
                GET IN TOUCH
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-8">
                Ready to transform your brand into a premium customer-generating SaaS engine? Fill out the form or reach out directly via one of our social hubs.
              </p>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent-cyan/10 text-accent-cyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-text-disabled font-semibold uppercase font-space">EMAIL</span>
                    <p className="text-sm font-semibold text-white mt-0.5">hello@disyn.dev</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent-purple/10 text-accent-purple">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-text-disabled font-semibold uppercase font-space">PHONE</span>
                    <p className="text-sm font-semibold text-white mt-0.5">+1 (555) 0199 44</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent-cyan/10 text-accent-cyan">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-text-disabled font-semibold uppercase font-space">LOCATION</span>
                    <p className="text-sm font-semibold text-white mt-0.5">New York City, USA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Panel */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <span className="block text-xs font-semibold text-text-disabled uppercase tracking-widest mb-4 font-space">
                SOCIAL HUB
              </span>
              <div className="flex gap-4">
                {socialLinks.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackSocialClick(soc.name)}
                    className="ripple-fx p-3 rounded-full card-standard border-white/5 hover:border-accent-cyan/30 text-text-muted hover:text-accent-cyan hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] bg-white/[0.02]"
                    title={soc.name}
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 card-standard p-8 border-white/5 bg-secondary-bg/25">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-12">
                <div className="w-16 h-16 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20 flex items-center justify-center mb-6 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-space text-white">
                  Message Transmitted!
                </h3>
                <p className="text-sm text-text-muted mt-2 max-w-sm">
                  We've successfully registered your custom project details in our lead queue. One of our team members will contact you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn-secondary ripple-fx mt-6 px-6 py-2.5 text-xs font-bold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
                      Name <span className="text-accent-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
                      WhatsApp Phone <span className="text-accent-cyan">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1555123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
                    Project Scope / Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your design, development, or AI automation goals..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary ripple-fx w-full py-4 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving lead details...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#0B0F1A]" />
                      Submit Project Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
