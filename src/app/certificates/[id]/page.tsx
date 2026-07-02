"use client";

import { Award, Download, QrCode, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CertificatePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[color:var(--page-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <Card className="overflow-hidden border-[color:var(--border-soft)] bg-[color:var(--card-bg)]/80">
          <CardHeader className="border-b border-[color:var(--border-soft)] bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(124,77,255,0.16))]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">Certificate of competence</p>
                <CardTitle className="mt-2 text-3xl">Electrical Systems Fundamentals</CardTitle>
              </div>
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-3 text-[color:var(--accent-primary)]">
                <Award className="h-8 w-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-[color:var(--text-secondary)]">This certificate confirms successful completion of the stated programme and the associated competency-based assessment.</p>
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-4">
                <p className="text-sm font-semibold text-[color:var(--text-primary)]">Issued to</p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">Amina Okafor</p>
                <p className="mt-1 text-sm text-[color:var(--text-secondary)]">Issued on 02 Jul 2026 · Certificate ID: DISYN-2401</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="secondary">Verify certificate</Button>
              </div>
            </div>
            <div className="rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--card-bg)]">
                <QrCode className="h-10 w-10 text-[color:var(--accent-primary)]" />
              </div>
              <p className="mt-4 text-sm font-semibold text-[color:var(--text-primary)]">Scan to verify</p>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Instant employer and institution verification with tamper-safe validation.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
