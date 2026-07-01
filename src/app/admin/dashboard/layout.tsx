"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Shield, Users, Briefcase, Tag, LogOut, Home, Loader2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center text-accent-cyan flex-col gap-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <span className="text-xs font-semibold uppercase tracking-widest font-mono">
          Verifying Authority Session...
        </span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Don't flash layout content
  }

  const menuItems = [
    { name: "Leads (CRM)", href: "/admin/dashboard", icon: Users },
    { name: "Learning Ecosystem", href: "/admin/dashboard/learning", icon: GraduationCap },
    { name: "Projects Portfolio", href: "/admin/dashboard/projects", icon: Briefcase },
    { name: "Pricing Packages", href: "/admin/dashboard/packages", icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 dashboard-sidebar border-b md:border-b-0 md:border-r border-white/5 flex flex-col shrink-0">
        {/* Brand */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black font-space text-white tracking-widest">
              DISYN
            </span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 uppercase tracking-widest font-mono">
              Admin
            </span>
          </div>
        </div>

        {/* User Session Profile Mini */}
        <div className="p-4 mx-4 mt-6 rounded-xl card-standard bg-white/[0.01] border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple flex items-center justify-center text-primary-bg font-bold font-space">
            A
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">
              {session?.user?.name || "Administrator"}
            </h4>
            <p className="text-[10px] text-text-disabled truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-grow p-4 mt-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all font-space uppercase tracking-wider text-xs ${
                  isActive
                    ? "sidebar-menu-active"
                    : "text-text-secondary hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-muted hover:text-white hover:bg-white/[0.02] transition-all font-space uppercase tracking-wider text-xs"
          >
            <Home className="w-4 h-4 shrink-0" />
            Public Landing Page
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-accent-danger hover:text-red-300 hover:bg-red-500/5 transition-all text-left font-space uppercase tracking-wider text-xs cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Work Area */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
