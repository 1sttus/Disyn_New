"use client";

import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const organizations = [
  { name: "City Skills Institute", type: "Technical College", status: "Active" },
  { name: "GreenTech Academy", type: "Private Academy", status: "Pending review" },
];

export default function OrganizationManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">Organization management</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">Shape each tenant experience</h1>
          <p className="mt-2 text-[color:var(--text-secondary)]">Configure branding, governance, and programme settings per organization.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New organization
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="bg-[color:var(--card-bg)]/80">
          <CardHeader>
            <CardTitle>Tenant overview</CardTitle>
            <CardDescription>Operational view of active organizations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {organizations.map((org) => (
              <div key={org.name} className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--card-bg)] p-3 text-[color:var(--accent-primary)]">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[color:var(--text-primary)]">{org.name}</p>
                    <p className="text-sm text-[color:var(--text-secondary)]">{org.type}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-[color:var(--text-secondary)]">Status: {org.status}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[color:var(--card-bg)]/80">
          <CardHeader>
            <CardTitle>Organization settings</CardTitle>
            <CardDescription>Branding, permissions, and domain controls for a tenant.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-[color:var(--text-primary)]">Organization name</span>
              <Input placeholder="e.g. City Skills Institute" />
            </label>
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-[color:var(--text-primary)]">Primary domain</span>
              <Input placeholder="academy.example.org" />
            </label>
            <Button className="w-full">Save tenant settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
