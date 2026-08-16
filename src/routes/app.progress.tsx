import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Clock, Flame, Layers, Loader2, NotebookPen, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMyCourses, type MyCourse } from "@/hooks/use-courses";
import { attemptsForCourse, decksForCourse, statsForCourse } from "@/lib/course-content";
import { heatmap, tagColor } from "@/lib/mock-data";

export const Route = createFileRoute("/app/progress")({
  head: () => ({
    meta: [
      { title: "Progress & Streaks — AceHub" },
      { name: "description", content: "Per-course progress, streaks and quiz averages across your nine courses." },
      { property: "og:title", content: "Progress & Streaks — AceHub" },
      { property: "og:description", content: "Track notes, cards and quiz scores for every course you take." },
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

function StatCard({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string }) {
  return (
    <div className="card-soft p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}

function CourseDetail({ course, onBack }: { course: MyCourse; onBack: () => void }) {
  const stats = statsForCourse(course);
  const decks = decksForCourse(course);
  const attempts = attemptsForCourse(course);

  return (
    <div>
      <Button variant="ghost" className="mb-4" onClick={onBack}>
        <ArrowLeft className="mr-1.5 h-4 w-4" /> All courses
      </Button>
      <PageHeader title={course.title} subtitle={`${course.code} · ${course.level} level`} />

      {!stats.started ? (
        <EmptyState
          icon={NotebookPen}
          title="Not started yet"
          body={`You have no activity in ${course.code} yet. Add a note or generate flashcards to start tracking progress.`}
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={NotebookPen} label="Notes created" value={String(stats.notes)} />
            <StatCard icon={Layers} label="Cards reviewed" value={String(stats.cardsReviewed)} />
            <StatCard
              icon={Trophy}
              label="Quiz average"
              value={stats.quizAverage === null ? "—" : `${stats.quizAverage}%`}
            />
            <StatCard icon={Flame} label="Streak days" value={`${stats.streakDays} days`} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="card-soft p-6">
              <h2 className="text-base font-semibold">Decks</h2>
              {decks.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">No decks yet for {course.code}.</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {decks.map((d) => (
                    <div key={d.id}>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{d.title}</span>
                        <span className="text-muted-foreground">
                          {d.mastered}/{d.total}
                        </span>
                      </div>
                      <Progress value={(d.mastered / d.total) * 100} className="mt-2 h-1.5" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="card-soft p-6">
              <h2 className="text-base font-semibold">Quiz attempts</h2>
              {attempts.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">No quizzes taken in {course.code} yet.</p>
              ) : (
                <ul className="mt-4 space-y-2.5">
                  {attempts.map((a) => (
                    <li key={a.id} className="flex justify-between text-sm">
                      <span className="truncate text-muted-foreground">
                        {a.title} · {a.when}
                      </span>
                      <span className="font-medium">
                        {a.score}/{a.total}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}

function ProgressPage() {
  const { data: courses, isLoading } = useMyCourses();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = useMemo(
    () => (courses ?? []).map((c) => ({ course: c, stats: statsForCourse(c) })),
    [courses],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!courses?.length) {
    return (
      <div>
        <PageHeader title="Progress" subtitle="Progress is tracked per course." />
        <EmptyState
          icon={Flame}
          title="No courses yet"
          body="Pick your department, level and nine courses to start tracking progress."
          action={
            <Button asChild>
              <Link to="/onboarding">Set up my courses</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const selected = courses.find((c) => c.id === selectedId);
  if (selected) return <CourseDetail course={selected} onBack={() => setSelectedId(null)} />;

  const active = rows.filter((r) => r.stats.started);
  const totalMinutes = rows.reduce((s, r) => s + r.stats.minutes, 0);
  const totalCards = rows.reduce((s, r) => s + r.stats.cardsReviewed, 0);
  const totalNotes = rows.reduce((s, r) => s + r.stats.notes, 0);
  const averages = active.map((r) => r.stats.quizAverage).filter((v): v is number => v !== null);
  const overallAvg = averages.length
    ? Math.round(averages.reduce((s, v) => s + v, 0) / averages.length)
    : null;
  const streak = Math.max(0, ...rows.map((r) => r.stats.streakDays));

  return (
    <div>
      <PageHeader
        title="Progress"
        subtitle={`Across your ${courses.length} courses — ${active.length} with activity so far.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Flame} label="Current streak" value={`${streak} days`} />
        <StatCard icon={Clock} label="Total study time" value={`${Math.round(totalMinutes / 60)}h`} />
        <StatCard icon={Layers} label="Cards reviewed" value={totalCards.toLocaleString()} />
        <StatCard icon={Trophy} label="Quiz average" value={overallAvg === null ? "—" : `${overallAvg}%`} />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{totalNotes} notes written across all courses.</p>

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

      <h2 className="mb-4 mt-8 text-base font-semibold">Per-course breakdown</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map(({ course, stats }) => (
          <button
            key={course.id}
            type="button"
            onClick={() => setSelectedId(course.id)}
            className="card-soft card-hover p-5 text-left"
          >
            <span className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${tagColor[course.tag]}`} />
                <span className="text-xs font-medium text-muted-foreground">{course.code}</span>
              </span>
              {stats.started ? (
                <span className="text-xs text-muted-foreground">
                  {stats.quizAverage === null ? "No quizzes" : `${stats.quizAverage}% quiz avg`}
                </span>
              ) : (
                <span className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground">
                  Not started
                </span>
              )}
            </span>
            <h3 className="mt-2 text-base font-semibold">{course.title}</h3>
            <Progress value={stats.started ? course.progress : 0} className="mt-4 h-1.5" />
            <span className="mt-2 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
              <span>{stats.notes} notes</span>
              <span>{stats.cardsReviewed} cards reviewed</span>
              <span>{stats.streakDays}-day streak</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
