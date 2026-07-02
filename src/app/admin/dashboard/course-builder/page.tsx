"use client";

import { Plus, NotebookPen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const builderSections = [
  { name: "Program overview", complete: true },
  { name: "Course modules", complete: true },
  { name: "Assessments", complete: false },
  { name: "Certification rules", complete: false },
];

export default function CourseBuilderPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">Course builder</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">Create structured programs</h1>
          <p className="mt-2 text-[color:var(--text-secondary)]">Compose modules, lessons, assessments, and credentials without writing code.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New programme
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="bg-[color:var(--card-bg)]/80">
          <CardHeader>
            <CardTitle>Builder checklist</CardTitle>
            <CardDescription>Track the essential authoring steps before publishing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {builderSections.map((section) => (
              <div key={section.name} className="flex items-center justify-between rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-4 py-3 text-sm">
                <span className="text-[color:var(--text-primary)]">{section.name}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${section.complete ? "bg-[color:var(--accent-primary)]/10 text-[color:var(--accent-primary)]" : "bg-[color:var(--surface-hover)] text-[color:var(--text-secondary)]"}`}>
                  {section.complete ? "Ready" : "Pending"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[color:var(--card-bg)]/80">
          <CardHeader>
            <CardTitle>Programme details</CardTitle>
            <CardDescription>Create the canonical structure for a new learning pathway.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-[color:var(--text-primary)]">Programme title</span>
              <Input placeholder="e.g. Electrical Technician Pathway" />
            </label>
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-[color:var(--text-primary)]">Description</span>
              <textarea className="min-h-28 w-full rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--card-bg)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent-primary)] focus:ring-2 focus:ring-[color:var(--accent-primary)]/20" placeholder="Describe the competencies and outcomes" />
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-4 text-sm">
              <div className="flex items-center gap-2 text-[color:var(--text-primary)]">
                <NotebookPen className="h-4 w-4 text-[color:var(--accent-primary)]" />
                Authoring support
              </div>
              <span className="text-[color:var(--text-secondary)]">AI-assisted content suggestions</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
