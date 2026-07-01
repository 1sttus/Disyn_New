"use client";

import { BookOpen, Compass, PlayCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const catalog = [
  { title: "Electrical Systems Fundamentals", level: "Foundation", duration: "8 weeks", description: "Build practical understanding of circuits, power, and safe maintenance techniques." },
  { title: "Digital Fabrication Basics", level: "Intermediate", duration: "6 weeks", description: "Learn design workflows, tooling, and fabrication safety in a modern lab setting." },
  { title: "HVAC Maintenance Essentials", level: "Advanced", duration: "10 weeks", description: "Master diagnostics, installation principles, and service planning for HVAC systems." },
];

export default function CourseCataloguePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[color:var(--page-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">
              <Compass className="h-3.5 w-3.5" />
              Course catalogue
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
              Explore competency-based programmes.
            </h1>
            <p className="mt-2 max-w-2xl text-[color:var(--text-secondary)]">
              Discover pathways that connect theory, applied work, assessments, and recognized credentials.
            </p>
          </div>
          <Button variant="secondary">Browse by skill</Button>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {catalog.map((course) => (
            <Card key={course.title} className="group bg-[color:var(--card-bg)]/80">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge>{course.level}</Badge>
                  <span className="text-sm text-[color:var(--text-secondary)]">{course.duration}</span>
                </div>
                <CardTitle className="mt-3">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                  <BookOpen className="h-4 w-4" />
                  12 lessons · 4 assessments
                </div>
                <Button className="w-full">
                  <PlayCircle className="h-4 w-4" />
                  View course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
