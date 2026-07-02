"use client";

import { Plus, Search, ShieldCheck, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const users = [
  { name: "Amina Okafor", role: "Learner", status: "Active" },
  { name: "Daniel Mensah", role: "Instructor", status: "Active" },
  { name: "Ruth Asante", role: "Admin", status: "Pending MFA" },
];

export default function UserManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-secondary)]">User management</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">Manage people and access</h1>
          <p className="mt-2 text-[color:var(--text-secondary)]">Support learner, instructor, and organization administrator workflows.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Invite user
        </Button>
      </div>

      <Card className="bg-[color:var(--card-bg)]/80">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>People directory</CardTitle>
              <CardDescription>Searchable roster for access governance.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-[color:var(--text-secondary)]" />
              <Input className="w-56" placeholder="Search users" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.map((user) => (
            <div key={user.name} className="flex flex-col gap-3 rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--card-bg)] p-3 text-[color:var(--accent-primary)]">
                  <UserCog className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-[color:var(--text-primary)]">{user.name}</p>
                  <p className="text-sm text-[color:var(--text-secondary)]">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                <ShieldCheck className="h-4 w-4 text-[color:var(--accent-primary)]" />
                {user.status}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
