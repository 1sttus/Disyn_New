"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, Sparkles, X, MessageSquare, Loader2 } from "lucide-react";

interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string;
}

export default function PricingSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [chatLink, setChatLink] = useState("");

  // Fetch Packages
  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch("/api/admin/packages");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.warn("Using default fallback packages", err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  const trackClick = async (packageName: string) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "click",
          eventDetails: `Package Selected: ${packageName}`,
        }),
      });
    } catch (e) {
      console.warn("Analytics tracking bypassed");
    }
  };

  const handleCtaClick = (pack: Package) => {
    trackClick(pack.title);
    setSelectedPackage(pack);
    setSubmitSuccess(false);
    setChatLink("");
    setName("");
    setPhone("");
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          packageName: selectedPackage?.title,
          packageId: selectedPackage?.id,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setChatLink(data.directChatLink || "");
      } else {
        throw new Error(data.error || "Failed to submit lead");
      }
    } catch (err) {
      console.error(err);
      alert("Submission encountered an issue. We have logged your request; feel free to reach out directly via our contact form.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-secondary-bg/50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-accent-cyan uppercase">PRICING PACKAGES</span>
          <h2 className="text-3xl md:text-5xl font-black font-space mt-2 text-white">
            CHOOSE YOUR SCALE
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Pricing Cards List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full h-96 card-standard border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pack) => {
              const isPremium = pack.title.toLowerCase().includes("product");
              return (
                <div
                  key={pack.id}
                  className={`flex flex-col h-full relative overflow-hidden ${
                    isPremium ? "card-premium p-8" : "card-pricing p-8"
                  }`}
                >
                  {isPremium && (
                    <span className="absolute top-0 right-0 bg-[#FFB020] text-primary-bg text-[10px] font-black tracking-widest uppercase py-1.5 px-4 rounded-bl-lg font-space shadow-md">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-2xl font-black font-space text-white">
                    {pack.title}
                  </h3>
                  <p className={`text-sm mt-2 min-h-[40px] leading-relaxed ${isPremium ? "text-white/80" : "text-text-muted"}`}>
                    {pack.description}
                  </p>

                  <div className="my-6">
                    <span className="text-4xl font-black font-space text-white tracking-tight">
                      {pack.price}
                    </span>
                    <span className={`text-xs uppercase tracking-wider ml-1 font-semibold ${isPremium ? "text-white/60" : "text-text-disabled"}`}>
                      / Flat Rate
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8 flex-grow border-t border-white/10 pt-6">
                    {pack.features.split("\n").map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-white">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPremium ? "text-white" : "text-accent-cyan"}`} />
                        <span>{feature.trim()}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCtaClick(pack)}
                    className={
                      isPremium
                        ? "btn-primary ripple-fx w-full !bg-white !text-primary-bg hover:!bg-white/90"
                        : "btn-primary ripple-fx w-full"
                    }
                  >
                    Get This Package
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Package Checkout Form Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary-bg/85 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="relative w-full max-w-md card-standard bg-secondary-bg/95 border-white/10 p-8 shadow-2xl rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-text-muted hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitSuccess ? (
                <>
                  <div className="flex items-center gap-2 text-accent-cyan mb-2">
                    <Sparkles className="w-4.5 h-4.5 text-accent-cyan animate-pulse" />
                    <span className="text-[10px] font-extrabold tracking-widest uppercase font-space">Lead Funnel Pipeline</span>
                  </div>
                  <h3 className="text-2xl font-black font-space text-white">
                    Request {selectedPackage.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    Fill out this 15-second form. Submitting will register your inquiry in our CRM and trigger automated next-step details to your phone.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div>
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
                        Full Name <span className="text-accent-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
                        WhatsApp Phone Number <span className="text-accent-cyan">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1555123456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input-field"
                      />
                      <span className="text-[10px] text-text-disabled mt-1 block">
                        Include country code without spaces (e.g. +15551234567)
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 font-space">
                        Email Address <span className="text-text-disabled">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="btn-primary ripple-fx w-full mt-6"
                    >
                      {formSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing Lead...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#0B0F1A]" />
                          Initialize Project
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  {/* Success Icon */}
                  <div className="w-16 h-16 rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(37,211,102,0.15)]">
                    <Check className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-black font-space text-white">
                    Inquiry Confirmed!
                  </h3>
                  <p className="text-sm text-text-muted mt-2 leading-relaxed">
                    Hi <strong className="text-white">{name}</strong>, your request for the <strong className="text-white">{selectedPackage.title}</strong> package was saved. We've initiated a welcome package via WhatsApp to your number.
                  </p>

                  <div className="space-y-3.5 mt-8">
                    {chatLink && (
                      <a
                        href={chatLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-whatsapp ripple-fx w-full py-4 text-sm uppercase flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-5 h-5" />
                        Chat Directly via WhatsApp
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedPackage(null)}
                      className="btn-secondary ripple-fx w-full py-3 text-xs uppercase"
                    >
                      Return to Showcase
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
