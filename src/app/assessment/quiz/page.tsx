"use client";

import { CheckCircle2, Circle, TimerReset } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const questions = [
  { prompt: "Which safety measure should be applied before inspecting live electrical equipment?", options: ["Use a metal tool", "Verify isolation and PPE", "Increase current", "Skip the checklist"] },
  { prompt: "What does a schematic diagram primarily help a technician understand?", options: ["Brand identity", "Circuit connections", "Weather patterns", "Marketing funnels"] },
];

export default function QuizPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[color:var(--page-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col gap-3 rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--card-bg)]/80 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">Assessment</p>
            <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">Knowledge check</h1>
            <p className="mt-2 text-[color:var(--text-secondary)]">Multiple choice quiz with instant feedback-ready structure.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm text-[color:var(--text-secondary)]">
            <TimerReset className="h-4 w-4" />
            12 mins remaining
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={question.prompt} className="bg-[color:var(--card-bg)]/80">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{`${index + 1}. ${question.prompt}`}</CardTitle>
                  <Badge>Single answer</Badge>
                </div>
                <CardDescription>Select the best answer from the options below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-4 py-3 text-sm text-[color:var(--text-primary)] transition hover:border-[color:var(--accent-primary)]">
                    <Circle className="h-4 w-4" />
                    <span>{option}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button>Submit assessment</Button>
        </div>
      </div>
    </div>
  );
}
