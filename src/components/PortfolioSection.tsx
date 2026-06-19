"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Eye, ArrowUpRight, X, Sparkles, AlertCircle } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string;
}

const categories = ["All", "Graphic Design", "UI/UX", "Web Development", "AI Projects"];

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects from the API
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/admin/projects");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.ok ? await res.json() : [];
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        console.warn("Using default fallback projects", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Handle Filtering
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase())
      );
    }
  }, [activeFilter, projects]);

  const trackClick = async (projectName: string) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "click",
          eventDetails: `Portfolio Case Study: ${projectName}`,
        }),
      });
    } catch (e) {
      console.warn("Analytics tracking bypassed");
    }
  };

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-0 w-96 h-96 rounded-full bg-accent-cyan/5 blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-accent-cyan uppercase">PROJECT SHOWCASE</span>
            <h2 className="text-3xl md:text-5xl font-black font-outfit mt-2 text-white">
              CRAFTED SOLUTIONS
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mt-4 rounded-full" />
          </div>

          {/* Filters List */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-outfit tracking-wide transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-accent-cyan text-primary-bg shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    : "glass-panel border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full h-80 glass-panel border-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 glass-panel border-white/5">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-400">No Projects Found</h3>
            <p className="text-sm text-gray-600 mt-1">Check back later or try changing filters.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative glass-panel border-white/5 overflow-hidden flex flex-col h-full hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                >
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-primary-bg border-b border-white/5">
                    <Image
                      src={project.imageUrl || "https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent opacity-60" />
                    
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-primary-bg/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => {
                          trackClick(project.title);
                          setSelectedProject(project);
                        }}
                        className="ripple-btn p-3 rounded-full bg-accent-cyan text-primary-bg shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Category Label Tag */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest bg-primary-bg/85 backdrop-blur-sm text-accent-cyan border border-accent-cyan/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Description Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold font-outfit text-white group-hover:text-glow-cyan transition-all">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.split(",").map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        trackClick(project.title);
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-accent-cyan hover:text-white transition-colors duration-200 mt-6 pt-4 border-t border-white/5"
                    >
                      View Case Study
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Case Study Detailed Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-primary-bg/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
          >
            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-panel bg-secondary-bg/95 border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-primary-bg/80 hover:bg-accent-cyan hover:text-primary-bg text-gray-400 border border-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Visual Image Left */}
                <div className="md:col-span-5 relative h-64 md:h-full min-h-[300px] bg-primary-bg border-b md:border-b-0 md:border-r border-white/5">
                  <Image
                    src={selectedProject.imageUrl || "https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format"}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-bg/80 via-transparent to-transparent md:hidden" />
                </div>

                {/* Details Right */}
                <div className="md:col-span-7 p-6 md:p-8 overflow-y-auto max-h-[80vh]">
                  <span className="text-xs font-bold tracking-widest text-accent-cyan uppercase">CASE STUDY</span>
                  <h3 className="text-2xl md:text-3xl font-black font-outfit text-white mt-1">
                    {selectedProject.title}
                  </h3>
                  
                  {/* Category & Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-xs font-bold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 px-3 py-1 rounded-full">
                      {selectedProject.category}
                    </span>
                    {selectedProject.tags.split(",").map((t) => (
                      <span key={t} className="text-xs text-gray-500 font-mono">
                        #{t.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-6 mt-8">
                    {/* Problem */}
                    <div>
                      <h4 className="text-sm font-black font-outfit uppercase tracking-widest text-accent-purple flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                        The Challenge
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed mt-2 pl-3.5 border-l border-white/5">
                        {selectedProject.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-sm font-black font-outfit uppercase tracking-widest text-accent-cyan flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                        Our Approach
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed mt-2 pl-3.5 border-l border-white/5">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="bg-accent-cyan/5 border border-accent-cyan/25 rounded-xl p-4 flex gap-3 shadow-[0_0_15px_rgba(0,229,255,0.05)]">
                      <Sparkles className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black font-outfit uppercase tracking-widest text-accent-cyan">
                          Business Impact
                        </h4>
                        <p className="text-sm text-white font-medium mt-1 leading-normal">
                          {selectedProject.impact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hire CTA Inside Modal */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        const element = document.getElementById("pricing");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="ripple-btn px-6 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary-bg font-extrabold text-xs tracking-wider uppercase"
                    >
                      Hire For Similar Project
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
