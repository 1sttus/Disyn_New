"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, PlayCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const modules = [
  { title: "Foundations of safe electrical work", completed: true },
  { title: "Reading schematics and diagrams", completed: true },
  { title: "Power distribution and inspection", completed: false },
];

export default function CourseDetailsPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[color:var(--page-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]">
          <ArrowLeft className="h-4 w-4" />
          Back to catalogue
        </Link>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="bg-[color:var(--card-bg)]/80">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Foundation</Badge>
                <Badge>8 weeks</Badge>
                <Badge>Competency-based</Badge>
              </div>
              <CardTitle className="mt-3 text-3xl">Electrical Systems Fundamentals</CardTitle>
              <CardDescription className="max-w-2xl text-base">
                A practical path covering electrical theory, safety, diagnostics, and assessment-ready applied work.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-4">
                <div className="flex items-center justify-between text-sm text-[color:var(--text-secondary)]">
                  <span>Course completion</span>
                  <span className="font-semibold text-[color:var(--text-primary)]">62%</span>
                </div>
                <Progress value={62} className="mt-3" />
              </div>
              <Button className="w-full">
                <PlayCircle className="h-4 w-4" />
                Continue lesson
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[color:var(--card-bg)]/80">
            <CardHeader>
              <CardTitle>What you’ll learn</CardTitle>
              <CardDescription>Organized around practical skills and recognized outcomes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {modules.map((module) => (
                <div key={module.title} className="flex items-center gap-3 rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-3">
                  <CheckCircle2 className={`h-4 w-4 ${module.completed ? "text-[color:var(--accent-primary)]" : "text-[color:var(--text-muted)]"}`} />
                  <span className="text-sm text-[color:var(--text-primary)]">{module.title}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
