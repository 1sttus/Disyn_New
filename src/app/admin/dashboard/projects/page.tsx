"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
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

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Graphic Design");
  const [imageUrl, setImageUrl] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [impact, setImpact] = useState("");
  const [tags, setTags] = useState("");

  const [uploading, setUploading] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setCategory("Graphic Design");
    setImageUrl("");
    setProblem("");
    setSolution("");
    setImpact("");
    setTags("");
    setShowModal(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setDescription(p.description);
    setCategory(p.category);
    setImageUrl(p.imageUrl);
    setProblem(p.problem);
    setSolution(p.solution);
    setImpact(p.impact);
    setTags(p.tags);
    setShowModal(true);
  };

  // Handles image uploading to local /api/admin/upload API (Cloudinary/Mock fallback)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: editingProject?.id,
      title,
      description,
      category,
      imageUrl,
      problem,
      solution,
      impact,
      tags,
    };

    try {
      const method = editingProject ? "PUT" : "POST";
      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        loadProjects();
      } else {
        const errorData = await res.json();
        alert("Failed to save project: " + (errorData.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-outfit text-white tracking-wide">
            PORTFOLIO MANAGER
          </h1>
          <p className="text-sm text-gray-400">
            Create, update, or remove projects displaying in your showcase grid.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="ripple-btn inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary-bg font-extrabold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(0,229,255,0.2)]"
        >
          <Plus className="w-4.5 h-4.5" />
          Add Project
        </button>
      </div>

      {/* Projects List Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 text-sm font-semibold uppercase tracking-widest font-mono">
          Reloading portfolio...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 glass-panel border-white/5 bg-[#0D111F]/50 text-gray-500">
          No projects found. Add your first item above!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-panel border-white/5 bg-[#0D111F]/50 overflow-hidden flex flex-col h-full group"
            >
              {/* Image preview */}
              <div className="relative h-44 w-full bg-primary-bg border-b border-white/5">
                <Image
                  src={project.imageUrl || "https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-primary-bg/90 backdrop-blur-sm text-[9px] font-black text-accent-cyan tracking-widest uppercase border border-accent-cyan/10">
                  {project.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-bold font-outfit text-white">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Actions */}
                <div className="flex gap-2.5 mt-6 pt-4 border-t border-white/5">
                  <button
                    onClick={() => openEditModal(project)}
                    className="flex-grow inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-white/5 hover:border-accent-cyan/30 bg-white/[0.02] text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2.5 rounded-lg border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 text-gray-500 hover:text-red-400 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-primary-bg/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel bg-secondary-bg border-white/10 p-6 md:p-8 shadow-2xl rounded-2xl my-8">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black font-outfit text-white mb-6">
              {editingProject ? "Edit Project Details" : "Create Portfolio Project"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Disyn Brand Identity"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full glass-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Category Tag
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full glass-input cursor-pointer"
                  >
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI Projects">AI Projects</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="Summarize the project briefly for the grid..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full glass-input"
                />
              </div>

              {/* Image Upload Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Project Visual URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/... or upload a file"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full glass-input"
                  />
                </div>
                <div className="md:col-span-4 self-end">
                  <label className="ripple-btn flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 hover:border-accent-cyan/30 text-xs font-bold text-gray-400 hover:text-white cursor-pointer bg-white/[0.01]">
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-accent-cyan" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload File
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Preview image */}
              {imageUrl && (
                <div className="relative h-28 w-44 rounded-lg bg-black/40 overflow-hidden border border-white/5 flex items-center justify-center">
                  <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}

              {/* Case Study Details */}
              <div className="border-t border-white/5 pt-5 space-y-4">
                <h4 className="text-xs font-black font-outfit uppercase tracking-widest text-accent-cyan flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Case Study Details (Conversion Builder)
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    The Problem
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="What challenge was the client experiencing?"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className="w-full glass-input resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Our Solution
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="How did you solve this problem utilizing your skills?"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="w-full glass-input resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Business Impact
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="What metrics or key outcomes resulted from the solution?"
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    className="w-full glass-input resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Keywords / Skills Tags <span className="text-gray-500">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextJS, Figma, UI/UX, AI Pipeline"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full glass-input"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="ripple-btn px-5 py-3 rounded-xl border border-white/5 hover:border-white/10 text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ripple-btn px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-primary-bg font-extrabold text-xs tracking-wider uppercase"
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
