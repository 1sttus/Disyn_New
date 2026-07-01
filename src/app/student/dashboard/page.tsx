"use client";

import { BookOpen, ChartColumnIncreasing, Clock3, Sparkles, Trophy, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stats = [
  { label: "Completed lessons", value: "24/36", icon: BookOpen },
  { label: "Weekly streak", value: "5 days", icon: TrendingUp },
  { label: "Average score", value: "88%", icon: Trophy },
  { label: "Time spent", value: "14h", icon: Clock3 },
];

const courses = [
  { title: "Electrical Systems Fundamentals", progress: 82, next: "Module 4 · Power Distribution" },
  { title: "HVAC Maintenance Essentials", progress: 64, next: "Lesson 2 · Diagnostics" },
  { title: "Digital Fabrication Basics", progress: 48, next: "Practical assessment" },
];

export default function StudentDashboardPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[color:var(--page-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">
              <Sparkles className="h-3.5 w-3.5" />
              Student dashboard
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
              Continue your learning journey.
            </h1>
            <p className="mt-2 max-w-2xl text-[color:var(--text-secondary)]">
              Follow your competency pathways, keep pace with assessments, and use AI support when you need it.
            </p>
          </div>
          <Button>Resume learning</Button>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-[color:var(--card-bg)]/80">
                <CardContent className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-sm text-[color:var(--text-secondary)]">{stat.label}</p>
                    <p className="mt-1 text-xl font-semibold text-[color:var(--text-primary)]">{stat.value}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-3 text-[color:var(--accent-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="bg-[color:var(--card-bg)]/80">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>Current programmes</CardTitle>
                  <CardDescription>Keep momentum across your enrolled courses.</CardDescription>
                </div>
                <Badge>Live progress</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div key={course.title} className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[color:var(--text-primary)]">{course.title}</p>
                      <p className="mt-1 text-sm text-[color:var(--text-secondary)]">Next: {course.next}</p>
                    </div>
                    <span className="text-sm font-semibold text-[color:var(--accent-primary)]">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="mt-4" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[color:var(--card-bg)]/80">
            <CardHeader>
              <CardTitle>Focus area</CardTitle>
              <CardDescription>Recommended next action based on recent performance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(124,77,255,0.16))] p-4">
                <div className="flex items-center gap-2 text-[color:var(--accent-primary)]">
                  <ChartColumnIncreasing className="h-4 w-4" />
                  <span className="text-sm font-semibold">Strengthen practical assessments</span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  Your recent results show better theory retention than applied problem solving. A targeted exercise is recommended.
                </p>
              </div>
              <Button variant="secondary" className="w-full">Open AI tutor</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
