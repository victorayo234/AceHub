import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Edit2,
  FileText,
  Flame,
  Layers,
  NotebookPen,
  Sparkles,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { PageHeader } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useMyCourses, useMyDepartment } from "@/hooks/use-courses";
import { useRecentActivity } from "@/hooks/use-recent-activity";
import { useStudyTracker } from "@/hooks/use-study-tracker";
import { notes as initialNotes, tagColor } from "@/lib/mock-data";

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

const GOAL_PRESETS = [30, 45, 60, 90, 120];

function Dashboard() {
  const { user, profile } = useAuth();
  const { data: myCourses } = useMyCourses();
  const { departmentName } = useMyDepartment();
  const { recentItems, recordActivity } = useRecentActivity();
  const {
    todayGoalMinutes,
    setTodayGoalMinutes,
    studiedTodayMinutes,
    progressPercent,
    remainingMinutes,
    streak,
    cardsTackled,
    notesActivity,
    weeklyData,
  } = useStudyTracker();

  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [tempGoalMinutes, setTempGoalMinutes] = useState(todayGoalMinutes);

  // Personalized First Name
  const firstName = useMemo(() => {
    const raw =
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      profile?.full_name ||
      user?.email?.split("@")[0] ||
      "Scholar";
    return raw.trim().split(" ")[0];
  }, [user, profile]);

  // Subtitle greeting with real dynamic streak and remaining goal time
  const subtitle = useMemo(() => {
    if (remainingMinutes === 0 && studiedTodayMinutes > 0) {
      return `You're on a ${streak}-day streak! 🎉 Daily goal achieved today.`;
    }
    return `You're on a ${streak}-day streak. ${remainingMinutes} min left on today's goal.`;
  }, [streak, remainingMinutes, studiedTodayMinutes]);

  // Dynamic "Coming Up" tasks tailored to user's enrolled courses and department
  const dynamicUpcoming = useMemo(() => {
    if (!myCourses || myCourses.length === 0) {
      return [
        {
          id: "u1",
          title: "Select semester courses",
          when: "Today",
          meta: `${departmentName} · 9 courses recommended`,
        },
        {
          id: "u2",
          title: "Review foundational decks",
          when: "Tomorrow",
          meta: "Spaced repetition practice",
        },
      ];
    }

    const courseA = myCourses[0];
    const courseB = myCourses[1] || myCourses[0];

    return [
      {
        id: "u-1",
        title: `${courseA.code} Flashcards Review`,
        when: "Today, 6:00 PM",
        meta: `${courseA.title} · 15 cards due`,
      },
      {
        id: "u-2",
        title: `${courseB.code} Practice Quiz`,
        when: "Tomorrow, 10:00 AM",
        meta: `${courseB.title} · 10 questions`,
      },
      {
        id: "u-3",
        title: `${departmentName} Study Session`,
        when: "Friday, 4:30 PM",
        meta: "Group revision & summaries",
      },
    ];
  }, [myCourses, departmentName]);

  // Real recent notes connected to courses
  const dynamicNotes = useMemo(() => {
    if (!myCourses || myCourses.length === 0) {
      return initialNotes.slice(0, 4);
    }
    // Filter notes matching enrolled courses where possible, fallback to clean list
    const enrolledIds = new Set(myCourses.map((c) => c.id));
    const matching = initialNotes.filter((n) => enrolledIds.has(n.courseId));
    return matching.length > 0 ? matching.slice(0, 4) : initialNotes.slice(0, 4);
  }, [myCourses]);

  const handleSaveGoal = () => {
    if (tempGoalMinutes > 0) {
      setTodayGoalMinutes(tempGoalMinutes);
      setIsGoalDialogOpen(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle={subtitle}
        action={
          <Button asChild>
            <Link to="/app/flashcards">Start reviewing</Link>
          </Button>
        }
      />

      {/* 4 Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Current Streak */}
        <div className="card-soft p-5 transition-shadow hover:shadow-md">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flame className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium uppercase tracking-wide">Current streak</span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold">
            {streak} {streak === 1 ? "day" : "days"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Logged in consistently</p>
        </div>

        {/* Metric 2: Today's Goal with interactive selector */}
        <div className="card-soft relative p-5 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wide">Today's goal</span>
            </div>
            <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  onClick={() => setTempGoalMinutes(todayGoalMinutes)}
                  className="inline-flex items-center gap-1 text-xs text-primary transition-colors hover:underline"
                >
                  <Edit2 className="h-3 w-3" /> Edit
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Set Today's Study Goal</DialogTitle>
                  <DialogDescription>
                    Choose how many minutes you plan to study today. The active timer automatically
                    counts your time while using AceHub.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {GOAL_PRESETS.map((m) => (
                      <Button
                        key={m}
                        type="button"
                        variant={tempGoalMinutes === m ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTempGoalMinutes(m)}
                      >
                        {m} min
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="custom-goal">Custom minutes</Label>
                    <Input
                      id="custom-goal"
                      type="number"
                      min={5}
                      max={720}
                      value={tempGoalMinutes}
                      onChange={(e) => setTempGoalMinutes(Math.max(1, parseInt(e.target.value, 10) || 0))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsGoalDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveGoal}>Save Goal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="mt-3 font-display text-2xl font-bold">
            {studiedTodayMinutes} / {todayGoalMinutes} min
          </p>
          <div className="mt-2.5">
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        </div>

        {/* Metric 3: Flashcards Tackled (renamed from Cards due) */}
        <div className="card-soft p-5 transition-shadow hover:shadow-md">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wide">Flashcards Tackled</span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold">{cardsTackled}</p>
          <p className="mt-1 text-xs text-muted-foreground">Total reviewed cards</p>
        </div>

        {/* Metric 4: Notes Uploaded/Downloaded (renamed from Notes this week) */}
        <div className="card-soft p-5 transition-shadow hover:shadow-md">
          <div className="flex items-center gap-2 text-muted-foreground">
            <NotebookPen className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Notes Uploaded/Downloaded
            </span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold">{notesActivity}</p>
          <p className="mt-1 text-xs text-muted-foreground">Course documents active</p>
        </div>
      </div>

      {/* Middle Grid: Weekly Study Time & Coming Up */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Weekly Study Time (Live Session Graph) */}
        <section className="card-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Weekly study time</h2>
              <p className="text-xs text-muted-foreground">Live minutes logged per day (Mon–Sun)</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <Clock className="h-3 w-3 animate-spin duration-3000" /> Active Session
            </span>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ left: 0, right: 8, top: 4 }}>
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

        {/* Dynamic Coming Up Section */}
        <section className="card-soft p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Coming up</h2>
            <span className="text-xs text-muted-foreground">{departmentName}</span>
          </div>
          <ul className="mt-4 space-y-3">
            {dynamicUpcoming.map((u) => (
              <li
                key={u.id}
                className="group flex items-start justify-between rounded-lg bg-secondary/70 p-3.5 transition-colors hover:bg-secondary"
              >
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {u.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {u.when} · {u.meta}
                  </p>
                </div>
                <span className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Continue where you left off */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Continue where you left off</h2>
            <p className="text-xs text-muted-foreground">Resume your most recent subjects and decks</p>
          </div>
          <Link
            to="/app/courses"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            All courses <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {recentItems.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={item.url}
              onClick={() => recordActivity(item)}
              className="card-soft card-hover group block p-5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      item.tag && tagColor[item.tag] ? tagColor[item.tag] : "bg-primary"
                    }`}
                  />
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {item.code}
                  </span>
                </div>
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                  {item.type}
                </Badge>
              </div>

              <h3 className="mt-3 truncate text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{item.progress ?? 45}%</span>
                </div>
                <Progress value={item.progress ?? 45} className="mt-1.5 h-1.5" />
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Last active: {item.updatedAt}</span>
                <span className="inline-flex items-center gap-0.5 font-medium text-primary">
                  Resume <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Notes Section */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Recent notes</h2>
            <p className="text-xs text-muted-foreground">Course materials, summaries & lecture handouts</p>
          </div>
          <Link
            to="/app/notes"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            All notes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="card-soft divide-y divide-border">
          {dynamicNotes.map((n) => (
            <Link
              key={n.id}
              to="/app/notes"
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/60"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground">
                {n.kind === "pdf" ? (
                  <FileText className="h-4 w-4 text-primary" />
                ) : (
                  <NotebookPen className="h-4 w-4 text-primary" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {n.kind}
                  </span>
                </div>
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

