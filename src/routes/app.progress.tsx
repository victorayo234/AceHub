import { createFileRoute } from "@tanstack/react-router";
import { Clock, Flame, Layers, Trophy } from "lucide-react";

import { PageHeader } from "@/components/app-shell";
import { Progress } from "@/components/ui/progress";
import { courses, heatmap } from "@/lib/mock-data";

export const Route = createFileRoute("/app/progress")({
  head: () => ({
    meta: [
      { title: "Progress & Streaks — AceHub" },
      { name: "description", content: "Study heatmap, streaks, total hours and per-course progress." },
      { property: "og:title", content: "Progress & Streaks — AceHub" },
      { property: "og:description", content: "See your study activity heatmap and streak stats." },
    ],
  }),
  component: ProgressPage,
});

const levels = [
  "bg-secondary",
  "bg-[oklch(0.90_0.04_195)]",
  "bg-[oklch(0.80_0.07_195)]",
  "bg-[oklch(0.66_0.09_195)]",
  "bg-[oklch(0.52_0.09_195)]",
];

function ProgressPage() {
  return (
    <div>
      <PageHeader title="Progress" subtitle="Six months of study activity at a glance." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Flame, label: "Current streak", value: "14 days" },
          { icon: Trophy, label: "Longest streak", value: "38 days" },
          { icon: Clock, label: "Total study hours", value: "126h" },
          { icon: Layers, label: "Cards reviewed", value: "3,482" },
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

      <section className="card-soft mt-6 overflow-x-auto p-6">
        <h2 className="text-base font-semibold">Study activity</h2>
        <div className="mt-5 flex gap-1">
          {Array.from({ length: 26 }, (_, w) => (
            <div key={w} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, d) => {
                const v = heatmap[w * 7 + d] ?? 0;
                return (
                  <span
                    key={d}
                    title={`${v * 25} minutes studied`}
                    className={`h-3 w-3 rounded-[3px] ${levels[v] ?? levels[0]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          Less
          {levels.map((l) => (
            <span key={l} className={`h-3 w-3 rounded-[3px] ${l}`} />
          ))}
          More
        </div>
      </section>

      <section className="card-soft mt-6 p-6">
        <h2 className="text-base font-semibold">Per-course progress</h2>
        <div className="mt-5 space-y-5">
          {courses.map((c) => (
            <div key={c.id}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{c.title}</span>
                <span className="text-muted-foreground">{c.progress}%</span>
              </div>
              <Progress value={c.progress} className="mt-2 h-1.5" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
