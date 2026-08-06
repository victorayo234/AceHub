import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Menu,
  NotebookPen,
  Search,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/courses", label: "My Courses", icon: BookOpen },
  { to: "/app/notes", label: "Notes", icon: NotebookPen },
  { to: "/app/flashcards", label: "Flashcards", icon: Layers },
  { to: "/app/quizzes", label: "Quizzes", icon: GraduationCap },
  { to: "/app/groups", label: "Study Groups", icon: Users },
  { to: "/app/progress", label: "Progress", icon: TrendingUp },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1 px-3">
      {nav.map((item) => {
        const active = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-6 py-5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="h-[18px] w-[18px]" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">AceHub</span>
    </Link>
  );
}

export function AppShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar lg:flex">
        <Brand />
        <NavList />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Brand />
              <NavList onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <GlobalSearch />


          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-[oklch(0.96_0.04_60)] px-3 py-1.5 text-sm font-semibold text-[oklch(0.48_0.12_50)]">
              <Flame className="h-4 w-4 text-flame" />
              14
            </div>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                AO
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card-soft flex flex-col items-center px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function AiLoading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-primary-soft px-4 py-3">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: `${i * 140}ms` }}
          />
        ))}
      </span>
      <span className="text-sm font-medium text-accent-foreground">{label}</span>
    </div>
  );
}
