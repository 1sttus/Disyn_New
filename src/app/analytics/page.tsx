"use client";

import { Activity, ArrowUpRight, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const areas = [
  { name: "Program completion", value: 82 },
  { name: "Assessment participation", value: 74 },
  { name: "Retention", value: 91 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[color:var(--page-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">Analytics</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">Performance at a glance</h1>
          <p className="mt-2 text-[color:var(--text-secondary)]">Monitor engagement, outcomes, and learner progress with a premium reporting surface.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Learner growth", value: "+14%", icon: Activity },
            { label: "Average score", value: "88%", icon: BarChart3 },
            { label: "Certificates issued", value: "1.2k", icon: ArrowUpRight },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} className="bg-[color:var(--card-bg)]/80">
                <CardContent className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-sm text-[color:var(--text-secondary)]">{metric.label}</p>
                    <p className="mt-1 text-xl font-semibold text-[color:var(--text-primary)]">{metric.value}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-3 text-[color:var(--accent-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-[color:var(--card-bg)]/80">
          <CardHeader>
            <CardTitle>Learning health indicators</CardTitle>
            <CardDescription>Track core performance areas for institutional planning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {areas.map((area) => (
              <div key={area.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[color:var(--text-primary)]">{area.name}</span>
                  <span className="text-[color:var(--text-secondary)]">{area.value}%</span>
                </div>
                <Progress value={area.value} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
