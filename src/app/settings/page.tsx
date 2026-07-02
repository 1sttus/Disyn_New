"use client";

import { BellRing, Lock, Palette, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[color:var(--page-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">Personalize learning and security</h1>
          <p className="mt-2 text-[color:var(--text-secondary)]">Manage preferences, communication, and account protection.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="bg-[color:var(--card-bg)]/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-[color:var(--accent-primary)]" />
                <CardTitle>Theme preferences</CardTitle>
              </div>
              <CardDescription>Switch between light and dark themes with respect for contrast.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Display name" />
              <Button variant="secondary" className="w-full">Save appearance</Button>
            </CardContent>
          </Card>

          <Card className="bg-[color:var(--card-bg)]/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[color:var(--accent-primary)]" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Enhance account safety with strong authentication practices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-3 text-sm text-[color:var(--text-primary)]">
                <ShieldCheck className="h-4 w-4 text-[color:var(--accent-primary)]" />
                MFA ready and protected by role-based access policies.
              </div>
              <Button className="w-full">Enable MFA</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
