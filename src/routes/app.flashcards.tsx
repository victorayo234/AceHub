import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { AiLoading, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cards, courses, decks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — AceHub" },
      { name: "description", content: "Generate decks from your notes and review them with spaced repetition." },
      { property: "og:title", content: "Flashcards — AceHub" },
      { property: "og:description", content: "Spaced-repetition decks generated from your own notes." },
    ],
  }),
  component: Flashcards,
});

function StudyMode() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index]!;

  const next = useCallback(
    (label?: string) => {
      if (label) toast.success(`Marked ${label}`);
      setFlipped(false);
      setIndex((i) => (i + 1) % cards.length);
    },
    [],
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
  }, [next]);

  return (
    <div className="card-soft p-6">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">Cell organelles</span>
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
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Question
            </span>
            <span className="mt-3 font-display text-xl font-semibold">{card.front}</span>
            <span className="mt-6 text-xs text-muted-foreground">Click or press space to flip</span>
          </span>
          <span className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-primary-soft px-8 text-center [transform:rotateY(180deg)]">
            <span className="text-xs font-medium uppercase tracking-wide text-accent-foreground">
              Answer
            </span>
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
      <p className="mt-4 text-xs text-muted-foreground">
        Keyboard: space to flip, ← → to move between cards.
      </p>
    </div>
  );
}

function GenerateDeck() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  return (
    <div className="card-soft p-6">
      <h2 className="text-base font-semibold">Generate a deck</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a note and AceHub writes the cards for you.
      </p>
      <div className="mt-4 space-y-2">
        {["Mitochondria & ATP synthesis", "Lecture 6 — Balanced trees", "Cold War timeline"].map(
          (n, i) => (
            <label
              key={n}
              className="flex cursor-pointer items-center gap-3 rounded-lg bg-secondary/60 px-4 py-3 text-sm"
            >
              <input type="radio" name="note" defaultChecked={i === 0} className="accent-[var(--color-primary)]" />
              {n}
            </label>
          ),
        )}
      </div>
      <div className="mt-5">
        {state === "loading" ? (
          <AiLoading label="Writing your flashcards…" />
        ) : state === "done" ? (
          <div className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-medium text-accent-foreground">
            24 cards ready — added to Cell organelles.
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
  return (
    <div>
      <PageHeader title="Flashcards" subtitle="41 cards are due for review today." />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <StudyMode />
        <GenerateDeck />
      </div>

      <h2 className="mb-4 mt-8 text-base font-semibold">Your decks</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {decks.map((d) => {
          const course = courses.find((c) => c.id === d.courseId);
          return (
            <div key={d.id} className="card-soft card-hover p-5">
              <p className="text-xs font-medium text-muted-foreground">{course?.code}</p>
              <h3 className="mt-1.5 text-base font-semibold">{d.title}</h3>
              <Progress value={(d.mastered / d.total) * 100} className="mt-4 h-1.5" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{d.mastered} mastered</span>
                <span className={d.due > 0 ? "font-medium text-primary" : ""}>
                  {d.due > 0 ? `${d.due} due` : "All caught up"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
