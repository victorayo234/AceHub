import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { useState } from "react";

import { AiLoading, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { quizQuestions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/quizzes")({
  head: () => ({
    meta: [
      { title: "Quizzes — AceHub" },
      { name: "description", content: "Generate practice quizzes from your notes and review your mistakes." },
      { property: "og:title", content: "Quizzes — AceHub" },
      { property: "og:description", content: "Practice quizzes generated from your own course material." },
    ],
  }),
  component: Quizzes,
});

function Quizzes() {
  const [phase, setPhase] = useState<"setup" | "generating" | "quiz" | "result">("setup");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const q = quizQuestions[index]!;
  const correct = answers.filter((a, i) => a === quizQuestions[i]!.answer).length;

  const reset = () => {
    setPhase("setup");
    setIndex(0);
    setPicked(null);
    setAnswers([]);
  };

  return (
    <div>
      <PageHeader title="Quizzes" subtitle="Test yourself on what you just studied." />

      {phase === "setup" ? (
        <div className="card-soft mx-auto max-w-xl p-6">
          <h2 className="text-base font-semibold">Generate a quiz</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            From “Mitochondria & ATP synthesis” · BIO 201
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Questions</Label>
              <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 questions</SelectItem>
                  <SelectItem value="10">10 questions</SelectItem>
                  <SelectItem value="20">20 questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="mt-6 w-full"
            onClick={() => {
              setPhase("generating");
              setTimeout(() => setPhase("quiz"), 2200);
            }}
          >
            <Sparkles className="mr-1.5 h-4 w-4" /> Generate quiz
          </Button>
        </div>
      ) : null}

      {phase === "generating" ? (
        <div className="mx-auto max-w-xl">
          <AiLoading label="Writing questions from your note…" />
        </div>
      ) : null}

      {phase === "quiz" ? (
        <div className="card-soft mx-auto max-w-xl p-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Question {index + 1} of {quizQuestions.length}
            </span>
            <span>BIO 201</span>
          </div>
          <Progress value={((index + 1) / quizQuestions.length) * 100} className="mt-3 h-1.5" />

          <h2 className="mt-6 font-display text-xl font-semibold">{q.q}</h2>
          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => {
              const revealed = picked !== null;
              const isAnswer = i === q.answer;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={revealed}
                  onClick={() => setPicked(i)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors",
                    !revealed && "hover:border-primary hover:bg-primary-soft/50",
                    revealed && isAnswer && "border-primary bg-primary-soft",
                    revealed && !isAnswer && picked === i && "border-destructive/40 bg-destructive/10",
                  )}
                >
                  {opt}
                  {revealed && isAnswer ? <CheckCircle2 className="h-4 w-4 text-primary" /> : null}
                  {revealed && !isAnswer && picked === i ? (
                    <XCircle className="h-4 w-4 text-destructive" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {picked !== null ? (
            <>
              <p className="mt-4 rounded-xl bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
                {q.why}
              </p>
              <Button
                className="mt-5 w-full"
                onClick={() => {
                  const nextAnswers = [...answers, picked];
                  setAnswers(nextAnswers);
                  setPicked(null);
                  if (index + 1 >= quizQuestions.length) setPhase("result");
                  else setIndex(index + 1);
                }}
              >
                {index + 1 >= quizQuestions.length ? "See results" : "Next question"}
              </Button>
            </>
          ) : null}
        </div>
      ) : null}

      {phase === "result" ? (
        <div className="mx-auto max-w-xl space-y-6">
          <div className="card-soft p-8 text-center">
            <p className="text-sm text-muted-foreground">You scored</p>
            <p className="mt-2 font-display text-5xl font-extrabold">
              {correct}/{quizQuestions.length}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {correct === quizQuestions.length
                ? "Flawless. Your future self says thanks."
                : "Solid work — review the misses below and try again tomorrow."}
            </p>
            <Button className="mt-6" onClick={reset}>
              <RotateCcw className="mr-1.5 h-4 w-4" /> Take another quiz
            </Button>
          </div>

          {answers.some((a, i) => a !== quizQuestions[i]!.answer) ? (
            <div className="card-soft p-6">
              <h2 className="text-base font-semibold">Review your mistakes</h2>
              <ul className="mt-4 space-y-4">
                {answers.map((a, i) =>
                  a === quizQuestions[i]!.answer ? null : (
                    <li key={i} className="rounded-xl bg-secondary/60 p-4">
                      <p className="text-sm font-medium">{quizQuestions[i]!.q}</p>
                      <p className="mt-2 text-xs text-destructive">
                        You said: {quizQuestions[i]!.options[a]}
                      </p>
                      <p className="mt-1 text-xs text-primary">
                        Correct: {quizQuestions[i]!.options[quizQuestions[i]!.answer]}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">{quizQuestions[i]!.why}</p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
