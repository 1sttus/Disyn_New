"use client";

import { Bot, SendHorizonal, Sparkles, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const prompts = [
  "Explain this lesson in simple language",
  "Create flashcards for my current module",
  "Suggest a revision plan for the next 3 days",
];

export default function AITutorPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[color:var(--page-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">
            <Sparkles className="h-3.5 w-3.5" />
            AI tutor
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
            Learn with an assistant grounded in approved materials.
          </h1>
          <p className="mt-2 text-[color:var(--text-secondary)]">
            The tutor uses institution-approved content and can explain lessons, generate summaries, flashcards, and revision plans.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="bg-[color:var(--card-bg)]/80">
            <CardHeader>
              <CardTitle>Suggested prompts</CardTitle>
              <CardDescription>Start with one of these guided questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {prompts.map((prompt) => (
                <button key={prompt} className="flex w-full items-center gap-3 rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-4 py-3 text-left text-sm text-[color:var(--text-primary)] transition hover:border-[color:var(--accent-primary)]">
                  <MessageSquareText className="h-4 w-4 text-[color:var(--accent-primary)]" />
                  {prompt}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[color:var(--card-bg)]/80">
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
              <CardDescription>Ask follow-up questions and receive grounded explanations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-4">
                <div className="flex items-center gap-2 text-[color:var(--accent-primary)]">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm font-semibold">Tutor</span>
                </div>
                <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
                  I can explain this lesson using the current module content and highlight the most important concepts for revision.
                </p>
              </div>
              <div className="flex gap-2">
                <Input aria-label="Message the AI tutor" placeholder="Ask about your lesson" />
                <Button size="icon" aria-label="Send message">
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
