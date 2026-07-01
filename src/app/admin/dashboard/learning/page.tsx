"use client";

import { useEffect, useMemo, useState } from "react";
import { Briefcase, Building2, GraduationCap, Plus, Sparkles, Layers3 } from "lucide-react";

interface OrganizationSummary {
  id: string;
  name: string;
  slug: string;
  status: string;
  description?: string | null;
  createdAt: string;
}

interface ProgramSummary {
  id: string;
  title: string;
  slug: string;
  status: string;
  level: string;
  organizationId: string;
}

export default function LearningEcosystemPage() {
  const [organizations, setOrganizations] = useState<OrganizationSummary[]>([]);
  const [programs, setPrograms] = useState<ProgramSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const orgRes = await fetch("/api/admin/organizations");
        const programRes = await fetch("/api/admin/programs");

        if (orgRes.ok) {
          setOrganizations(await orgRes.json());
        }
        if (programRes.ok) {
          setPrograms(await programRes.json());
        }
      } catch (error) {
        console.error("Unable to load learning ecosystem data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = useMemo(() => [
    { label: "Organizations", value: organizations.length, icon: Building2 },
    { label: "Programs", value: programs.length, icon: GraduationCap },
    { label: "Curriculum Modules", value: 0, icon: Layers3 },
    { label: "AI Readiness", value: "RAG ready", icon: Sparkles },
  ], [organizations.length, programs.length]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-accent-cyan">
          <Briefcase className="h-3.5 w-3.5" />
          Vocational Learning Ecosystem
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-space text-white tracking-wide">
            Multi-tenant learning operations center
          </h1>
          <p className="max-w-3xl text-sm text-text-secondary">
            This foundation introduces organizations, programs, and curriculum entities so the platform can evolve into a competency-based learning system without hardcoded content.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/5 bg-[#0D111F]/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">{stat.label}</p>
              <div className="rounded-lg border border-accent-cyan/15 bg-accent-cyan/10 p-2 text-accent-cyan">
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-white/5 bg-[#0D111F]/60 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Organizations</h2>
              <p className="text-sm text-text-secondary">Tenant workspaces with branding and governance controls.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-2 text-sm font-semibold text-accent-cyan">
              <Plus className="h-4 w-4" />
              Create org
            </button>
          </div>

          {loading ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-text-muted">
              Loading organizations...
            </div>
          ) : organizations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-text-muted">
              No organizations configured yet.
            </div>
          ) : (
            <div className="space-y-3">
              {organizations.map((organization) => (
                <div key={organization.id} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{organization.name}</h3>
                      <p className="mt-1 text-sm text-text-secondary">{organization.description || "Tenant-ready learning workspace"}</p>
                    </div>
                    <span className="rounded-full border border-accent-green/20 bg-accent-green/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-green">
                      {organization.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                    <span className="rounded bg-white/5 px-2 py-1">/{organization.slug}</span>
                    <span className="rounded bg-white/5 px-2 py-1">{new Date(organization.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#0D111F]/60 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">Programs</h2>
            <p className="text-sm text-text-secondary">Competency-based learning pathways owned by each organization.</p>
          </div>

          {programs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-text-muted">
              No programs created yet. The first program will become the seed for curriculum authoring.
            </div>
          ) : (
            <div className="space-y-3">
              {programs.map((program) => (
                <div key={program.id} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white">{program.title}</h3>
                    <span className="rounded-full border border-accent-purple/20 bg-accent-purple/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-purple">
                      {program.level}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">/{program.slug}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
