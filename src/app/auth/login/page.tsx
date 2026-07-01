"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,77,255,0.16),transparent_35%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure learning access
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
            Welcome back to your vocational learning hub.
          </h1>
          <p className="mt-4 text-lg text-[color:var(--text-secondary)]">
            Sign in to continue your programmes, track progress, and receive personalized guidance from the AI tutor.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[color:var(--text-secondary)]">
            <span className="rounded-full border border-[color:var(--border-soft)] bg-[color:var(--card-bg)] px-3 py-1">WCAG 2.2 AA ready</span>
            <span className="rounded-full border border-[color:var(--border-soft)] bg-[color:var(--card-bg)] px-3 py-1">Multi-tenant by design</span>
            <span className="rounded-full border border-[color:var(--border-soft)] bg-[color:var(--card-bg)] px-3 py-1">Offline-ready roadmap</span>
          </div>
        </div>

        <Card className="w-full max-w-md border-[color:var(--border-soft)] bg-[color:var(--card-bg)]/80 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2 text-[color:var(--accent-primary)]">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-[0.25em]">Learner sign in</span>
            </div>
            <CardTitle>Access your learning workspace</CardTitle>
            <CardDescription>Use your email and password to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-[color:var(--text-primary)]">Email</span>
              <Input aria-label="Email" type="email" placeholder="you@example.com" />
            </label>
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-[color:var(--text-primary)]">Password</span>
              <Input aria-label="Password" type="password" placeholder="Enter your password" />
            </label>
            <Button className="w-full" type="button">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-sm text-[color:var(--text-secondary)]">
              Need an account? <Link href="/auth/register" className="font-medium text-[color:var(--accent-primary)]">Request access</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
