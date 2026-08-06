import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Flame, Layers, NotebookPen, Target } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses, notes, tagColor, upcoming, weekly } from "@/lib/mock-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AceHub" },
      { name: "description", content: "Your streak, study goal, recent courses and weekly progress." },
      { property: "og:title", content: "Dashboard — AceHub" },
      { property: "og:description", content: "Your streak, study goal and weekly study progress." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Welcome back, Ada"
        subtitle="You're on a 14-day streak. 25 minutes left on today's goal."
        action={
          <Button asChild>
            <Link to="/app/flashcards">Start reviewing</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Flame, label: "Current streak", value: "14 days" },
          { icon: Target, label: "Today's goal", value: "35 / 60 min" },
          { icon: Layers, label: "Cards due", value: "41" },
          { icon: NotebookPen, label: "Notes this week", value: "9" },
        ].map((s) => (
          <div key={s.label} className="card-soft p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <s.icon className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">{s.label}</span>
            </div>
            <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="card-soft p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Weekly study time</h2>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly} margin={{ left: 0, right: 8, top: 4 }}>
                <defs>
                  <linearGradient id="studyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <Tooltip
                  cursor={{ stroke: "var(--color-border)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`${v} min`, "Studied"]}
                />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#studyFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card-soft p-6">
          <h2 className="text-base font-semibold">Coming up</h2>
          <ul className="mt-4 space-y-3">
            {upcoming.map((u) => (
              <li key={u.id} className="rounded-lg bg-secondary/70 px-4 py-3">
                <p className="text-sm font-medium">{u.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {u.when} · {u.meta}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">Continue where you left off</h2>
          <Link
            to="/app/courses"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            All courses <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to="/app/courses/$courseId"
              params={{ courseId: c.id }}
              className="card-soft card-hover block p-5"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${tagColor[c.tag]}`} />
                <span className="text-xs font-medium text-muted-foreground">{c.code}</span>
              </div>
              <h3 className="mt-2 text-base font-semibold">{c.title}</h3>
              <Progress value={c.progress} className="mt-4 h-1.5" />
              <p className="mt-2 text-xs text-muted-foreground">{c.progress}% complete</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-base font-semibold">Recent notes</h2>
        <div className="card-soft divide-y divide-border">
          {notes.slice(0, 4).map((n) => (
            <Link
              key={n.id}
              to="/app/notes"
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/60"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground">
                <NotebookPen className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{n.title}</p>
                <p className="truncate text-xs text-muted-foreground">{n.excerpt}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.updated}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
