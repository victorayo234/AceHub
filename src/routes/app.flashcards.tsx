import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Layers, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AiLoading, EmptyState, PageHeader } from "@/components/app-shell";
import { ALL_COURSES, CourseFilter } from "@/components/course-filter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useMyCourses, type MyCourse } from "@/hooks/use-courses";
import { cardsForCourse, decksForCourse } from "@/lib/course-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — AceHub" },
      { name: "description", content: "Generate decks from your own course notes and review them with spaced repetition." },
      { property: "og:title", content: "Flashcards — AceHub" },
      { property: "og:description", content: "Spaced-repetition decks for the nine courses you are taking." },
    ],
  }),
  component: Flashcards,
});

function StudyMode({ course }: { course: MyCourse }) {
  const cards = useMemo(() => cardsForCourse(course), [course]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [course.id]);

  const card = cards[index]!;

  const next = useCallback(
    (label?: string) => {
      if (label) toast.success(`Marked ${label}`);
      setFlipped(false);
      setIndex((i) => (i + 1) % cards.length);
    },
    [cards.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") {
        setFlipped(false);
        setIndex((i) => (i - 1 + cards.length) % cards.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, cards.length]);

  return (
    <div className="card-soft p-6">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">
          {course.code} · {course.title}
        </span>
        <span className="text-muted-foreground">
          {index + 1} / {cards.length}
        </span>
      </div>
      <Progress value={((index + 1) / cards.length) * 100} className="mt-3 h-1.5" />

      <div className="mt-6 [perspective:1400px]">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className={cn("flip-3d relative block h-64 w-full", flipped && "[transform:rotateY(180deg)]")}
        >
          <span className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-secondary/70 px-8 text-center">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Question</span>
            <span className="mt-3 font-display text-xl font-semibold">{card.front}</span>
            <span className="mt-6 text-xs text-muted-foreground">Click or press space to flip</span>
          </span>
          <span className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-primary-soft px-8 text-center [transform:rotateY(180deg)]">
            <span className="text-xs font-medium uppercase tracking-wide text-accent-foreground">Answer</span>
            <span className="mt-3 text-base leading-relaxed">{card.back}</span>
          </span>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIndex((i) => (i - 1 + cards.length) % cards.length)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => next()}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => next("Again")}>
            Again
          </Button>
          <Button variant="outline" onClick={() => next("Hard")}>
            Hard
          </Button>
          <Button onClick={() => next("Easy")}>Easy</Button>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Keyboard: space to flip, ← → to move between cards.</p>
    </div>
  );
}

function GenerateDeck({ courses, initialCourseId }: { courses: MyCourse[]; initialCourseId: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [courseId, setCourseId] = useState(initialCourseId);

  useEffect(() => setCourseId(initialCourseId), [initialCourseId]);
  const course = courses.find((c) => c.id === courseId) ?? courses[0]!;

  return (
    <div className="card-soft p-6">
      <h2 className="text-base font-semibold">Generate a deck</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick one of your courses and AceHub writes the cards from its notes.
      </p>
      <div className="mt-4 space-y-2">
        <Label>Course</Label>
        <CourseFilter
          courses={courses}
          value={course.id}
          onChange={setCourseId}
          includeAll={false}
          className="w-full"
        />
      </div>
      <div className="mt-5">
        {state === "loading" ? (
          <AiLoading label={`Writing ${course.code} flashcards…`} />
        ) : state === "done" ? (
          <div className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-medium text-accent-foreground">
            24 cards ready — added to {course.code}.
          </div>
        ) : (
          <Button
            onClick={() => {
              setState("loading");
              setTimeout(() => setState("done"), 2200);
            }}
          >
            <Sparkles className="mr-1.5 h-4 w-4" /> Generate flashcards
          </Button>
        )}
        {state === "done" ? (
          <Button variant="ghost" className="mt-3" onClick={() => setState("idle")}>
            <RotateCcw className="mr-1.5 h-4 w-4" /> Generate another
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function Flashcards() {
  const { data: courses, isLoading } = useMyCourses();
  const [filter, setFilter] = useState<string>(ALL_COURSES);

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
        <PageHeader title="Flashcards" subtitle="Decks are built from the courses you selected." />
        <EmptyState
          icon={Layers}
          title="No courses yet"
          body="Pick your department, level and nine courses to start generating flashcards."
          action={
            <Button asChild>
              <Link to="/onboarding">Set up my courses</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const selected = filter === ALL_COURSES ? null : courses.find((c) => c.id === filter) ?? null;
  const scoped = selected ? [selected] : courses;
  const decks = scoped.flatMap((c) => decksForCourse(c).map((d) => ({ ...d, course: c })));
  const due = decks.reduce((s, d) => s + d.due, 0);
  const studyCourse = selected ?? courses[0]!;

  return (
    <div>
      <PageHeader
        title="Flashcards"
        subtitle={
          selected
            ? `${due} cards due in ${selected.code}.`
            : `${due} cards due across your ${courses.length} courses.`
        }
      />

      <div className="mb-6">
        <CourseFilter courses={courses} value={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <StudyMode course={studyCourse} />
        <GenerateDeck courses={courses} initialCourseId={studyCourse.id} />
      </div>

      <h2 className="mb-4 mt-8 text-base font-semibold">
        {selected ? `${selected.code} decks` : "Your decks"}
      </h2>
      {decks.length === 0 ? (
        <EmptyState
          icon={Layers}
          title={selected ? `No flashcards yet for ${selected.title}` : "No flashcards yet"}
          body={
            selected
              ? `Generate some from your ${selected.code} notes and they'll show up here.`
              : "Generate a deck from any of your courses to get started."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {decks.map((d) => (
            <div key={d.id} className="card-soft card-hover p-5">
              <p className="text-xs font-medium text-muted-foreground">{d.course.code}</p>
              <h3 className="mt-1.5 text-base font-semibold">{d.title}</h3>
              <Progress value={(d.mastered / d.total) * 100} className="mt-4 h-1.5" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{d.mastered} mastered</span>
                <span className={d.due > 0 ? "font-medium text-primary" : ""}>
                  {d.due > 0 ? `${d.due} due` : "All caught up"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
