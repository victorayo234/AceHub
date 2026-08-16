import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, Loader2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { AiLoading, EmptyState, PageHeader } from "@/components/app-shell";
import { ALL_COURSES, CourseFilter } from "@/components/course-filter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMyCourses, type MyCourse } from "@/hooks/use-courses";
import { attemptsForCourse, questionsForCourse } from "@/lib/course-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/quizzes")({
  head: () => ({
    meta: [
      { title: "Quizzes — AceHub" },
      { name: "description", content: "Generate practice quizzes from your own courses and review your mistakes." },
      { property: "og:title", content: "Quizzes — AceHub" },
      { property: "og:description", content: "Practice quizzes scoped to the nine courses you are taking." },
    ],
  }),
  component: Quizzes,
});

function Quizzes() {
  const { data: courses, isLoading } = useMyCourses();
  const [filter, setFilter] = useState<string>(ALL_COURSES);
  const [sourceId, setSourceId] = useState<string | null>(null);
  const [count, setCount] = useState("4");
  const [phase, setPhase] = useState<"setup" | "generating" | "quiz" | "result">("setup");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const selected = filter === ALL_COURSES ? null : courses?.find((c) => c.id === filter) ?? null;
  const activeCourse: MyCourse | null =
    courses?.find((c) => c.id === sourceId) ?? selected ?? courses?.[0] ?? null;

  const questions = useMemo(
    () => (activeCourse ? questionsForCourse(activeCourse, Number(count)) : []),
    [activeCourse, count],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!courses?.length || !activeCourse) {
    return (
      <div>
        <PageHeader title="Quizzes" subtitle="Quizzes are built from the courses you selected." />
        <EmptyState
          icon={ClipboardList}
          title="No courses yet"
          body="Pick your department, level and nine courses to start generating quizzes."
          action={
            <Button asChild>
              <Link to="/onboarding">Set up my courses</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const scoped = selected ? [selected] : courses;
  const history = scoped
    .map((c) => ({ course: c, attempts: attemptsForCourse(c) }))
    .filter((g) => g.attempts.length > 0);

  const correct = answers.filter((a, i) => a === questions[i]?.answer).length;
  const q = questions[index];

  const reset = () => {
    setPhase("setup");
    setIndex(0);
    setPicked(null);
    setAnswers([]);
  };

  return (
    <div>
      <PageHeader title="Quizzes" subtitle="Test yourself on the courses you are actually taking." />

      <div className="mb-6">
        <CourseFilter courses={courses} value={filter} onChange={setFilter} />
      </div>

      {phase === "setup" ? (
        <div className="card-soft mx-auto max-w-xl p-6">
          <h2 className="text-base font-semibold">Generate a quiz</h2>
          <p className="mt-1 text-sm text-muted-foreground">Questions are drawn from your own course material.</p>
          <div className="mt-5 space-y-2">
            <Label>Course</Label>
            <CourseFilter
              courses={courses}
              value={activeCourse.id}
              onChange={setSourceId}
              includeAll={false}
              className="w-full"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
              <Select value={count} onValueChange={setCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 questions</SelectItem>
                  <SelectItem value="4">4 questions</SelectItem>
                  <SelectItem value="5">5 questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="mt-6 w-full"
            onClick={() => {
              setPhase("generating");
              setTimeout(() => setPhase("quiz"), 2000);
            }}
          >
            <Sparkles className="mr-1.5 h-4 w-4" /> Generate {activeCourse.code} quiz
          </Button>
        </div>
      ) : null}

      {phase === "generating" ? (
        <div className="mx-auto max-w-xl">
          <AiLoading label={`Writing ${activeCourse.code} questions…`} />
        </div>
      ) : null}

      {phase === "quiz" && q ? (
        <div className="card-soft mx-auto max-w-xl p-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Question {index + 1} of {questions.length}
            </span>
            <span>{activeCourse.code}</span>
          </div>
          <Progress value={((index + 1) / questions.length) * 100} className="mt-3 h-1.5" />

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
              <p className="mt-4 rounded-xl bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">{q.why}</p>
              <Button
                className="mt-5 w-full"
                onClick={() => {
                  setAnswers([...answers, picked]);
                  setPicked(null);
                  if (index + 1 >= questions.length) setPhase("result");
                  else setIndex(index + 1);
                }}
              >
                {index + 1 >= questions.length ? "See results" : "Next question"}
              </Button>
            </>
          ) : null}
        </div>
      ) : null}

      {phase === "result" ? (
        <div className="mx-auto max-w-xl space-y-6">
          <div className="card-soft p-8 text-center">
            <p className="text-sm text-muted-foreground">
              {activeCourse.code} · you scored
            </p>
            <p className="mt-2 font-display text-5xl font-extrabold">
              {correct}/{questions.length}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {correct === questions.length
                ? "Flawless. Your future self says thanks."
                : "Solid work — review the misses below and try again tomorrow."}
            </p>
            <Button className="mt-6" onClick={reset}>
              <RotateCcw className="mr-1.5 h-4 w-4" /> Take another quiz
            </Button>
          </div>

          {answers.some((a, i) => a !== questions[i]?.answer) ? (
            <div className="card-soft p-6">
              <h2 className="text-base font-semibold">Review your mistakes</h2>
              <ul className="mt-4 space-y-4">
                {answers.map((a, i) => {
                  const item = questions[i];
                  if (!item || a === item.answer) return null;
                  return (
                    <li key={i} className="rounded-xl bg-secondary/60 p-4">
                      <p className="text-sm font-medium">{item.q}</p>
                      <p className="mt-2 text-xs text-destructive">You said: {item.options[a]}</p>
                      <p className="mt-1 text-xs text-primary">Correct: {item.options[item.answer]}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{item.why}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <h2 className="mb-4 mt-10 text-base font-semibold">
        {selected ? `${selected.code} history` : "Quiz history by course"}
      </h2>
      {history.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={selected ? `No quizzes yet for ${selected.title}` : "No quiz attempts yet"}
          body={
            selected
              ? `Generate a quiz from your ${selected.code} notes and your scores will appear here.`
              : "Your scores will be grouped by course once you take a quiz."
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {history.map(({ course, attempts }) => {
            const avg = Math.round(
              (attempts.reduce((s, a) => s + a.score / a.total, 0) / attempts.length) * 100,
            );
            return (
              <div key={course.id} className="card-soft p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{course.code}</p>
                    <h3 className="text-base font-semibold">{course.title}</h3>
                  </div>
                  <span className="rounded-md bg-primary-soft px-2.5 py-1 text-sm font-semibold text-accent-foreground">
                    {avg}% avg
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {attempts.map((a) => (
                    <li key={a.id} className="flex items-center justify-between text-sm">
                      <span className="truncate text-muted-foreground">
                        {a.title} · {a.when}
                      </span>
                      <span className="font-medium">
                        {a.score}/{a.total}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
