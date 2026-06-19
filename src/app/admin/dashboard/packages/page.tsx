"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, AlertCircle } from "lucide-react";

interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string;
}

export default function PackagesManager() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/packages");
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const openAddModal = () => {
    setEditingPackage(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setFeatures("");
    setShowModal(true);
  };

  const openEditModal = (p: Package) => {
    setEditingPackage(p);
    setTitle(p.title);
    setDescription(p.description);
    setPrice(p.price);
    setFeatures(p.features);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: editingPackage?.id,
      title,
      description,
      price,
      features,
    };

    try {
      const method = editingPackage ? "PUT" : "POST";
      const res = await fetch("/api/admin/packages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        loadPackages();
      } else {
        const errorData = await res.json();
        alert("Failed to save package: " + (errorData.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      const res = await fetch(`/api/admin/packages?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPackages(packages.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete package");
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
            PACKAGES & PLANS
          </h1>
          <p className="text-sm text-gray-400">
            Define service offerings, prices, and feature deliverables for your lead funnel.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="ripple-btn inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary-bg font-extrabold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(0,229,255,0.2)]"
        >
          <Plus className="w-4.5 h-4.5" />
          Add Package
        </button>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 text-sm font-semibold uppercase tracking-widest font-mono">
          Reloading packages...
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20 glass-panel border-white/5 bg-[#0D111F]/50 text-gray-500">
          No service packages found. Create your first package above!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pack) => (
            <div
              key={pack.id}
              className="glass-panel p-6 border-white/5 bg-[#0D111F]/50 flex flex-col h-full relative"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-black font-outfit text-white">
                  {pack.title}
                </h3>
                <span className="text-2xl font-black font-outfit text-accent-cyan tracking-tight">
                  {pack.price}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed flex-grow">
                {pack.description}
              </p>

              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                {pack.features.split("\n").map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300"
                  >
                    ✓ {feat.trim()}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => openEditModal(pack)}
                  className="flex-grow inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-white/5 hover:border-accent-cyan/30 bg-white/[0.02] text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit Package
                </button>
                <button
                  onClick={() => handleDelete(pack.id)}
                  className="p-2.5 rounded-lg border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 text-gray-500 hover:text-red-400 transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-primary-bg/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-md glass-panel bg-secondary-bg border-white/10 p-6 md:p-8 shadow-2xl rounded-2xl">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black font-outfit text-white mb-6">
              {editingPackage ? "Edit Package Plan" : "Create Pricing Package"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Package Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brand Launch"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Pricing Tag (e.g. $1,500)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. $1,500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Brief Subtext Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete design identity for startups..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Deliverables / Features List</span>
                  <span className="text-[10px] text-gray-500 font-mono">one per line</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Logo Design Suite&#10;Typography Guidelines&#10;Social Media Templates"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full glass-input resize-none"
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
                  {editingPackage ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
