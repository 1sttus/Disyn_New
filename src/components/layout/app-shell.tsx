import Link from "next/link";
import { BookOpen, Compass, LayoutGrid, MessageCircleMore, Sparkles, UserCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "My Learning", href: "/student/dashboard", icon: LayoutGrid },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "AI Tutor", href: "/ai-tutor", icon: Sparkles },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--text-primary)]">
      <header className="sticky top-0 z-40 border-b border-[color:var(--border-soft)] bg-[color:var(--nav-bg)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Disyn home">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))] text-sm font-semibold text-[color:var(--text-on-accent)]">
              D
            </div>
            <div>
              <p className="text-sm font-semibold">Disyn</p>
              <p className="text-xs text-[color:var(--text-secondary)]">Vocational Learning</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-[color:var(--text-secondary)] transition hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text-primary)]">
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/auth/login" className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm text-[color:var(--text-primary)]">
              <UserCircle2 className="h-4 w-4" />
              Sign in
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[color:var(--border-soft)] px-4 py-8 text-sm text-[color:var(--text-secondary)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Designed for trusted, competency-based vocational education.</p>
          <div className="flex items-center gap-2">
            <MessageCircleMore className="h-4 w-4" />
            <span>Support available 24/7</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
