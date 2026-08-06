import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Flame,
  GraduationCap,
  Layers,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-study.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AceHub — Study smarter, not longer" },
      {
        name: "description",
        content:
          "Turn your notes and PDFs into AI summaries, flashcards and quizzes. Track streaks, hit study goals and revise with your group on AceHub.",
      },
      { property: "og:title", content: "AceHub — Study smarter, not longer" },
      {
        property: "og:description",
        content:
          "AI summaries, flashcards and quizzes generated from your own course material.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Sparkles, title: "AI summaries", body: "Drop in a 40-page PDF and get the key ideas in plain language." },
  { icon: Layers, title: "Instant flashcards", body: "Turn any note into a spaced-repetition deck in one click." },
  { icon: GraduationCap, title: "Practice quizzes", body: "Choose difficulty and length, get instant feedback and review." },
  { icon: Flame, title: "Streaks & goals", body: "Small daily targets that keep momentum through exam season." },
  { icon: Users, title: "Group spaces", body: "Share notes, decks and goals with your study crew." },
  { icon: Upload, title: "Everything in one place", body: "Courses, notes and files organised the way you actually study." },
];

const steps = [
  { n: "01", title: "Add your material", body: "Create a course, write notes or upload lecture PDFs." },
  { n: "02", title: "Let AI do the grunt work", body: "Summaries, flashcards and quizzes generated from your own content." },
  { n: "03", title: "Revise and track", body: "Study daily, build a streak and watch your progress climb." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-[18px] w-[18px]" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">AceHub</span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/app">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app">Get Started</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-20 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Built for exam season
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            Study smarter,
            <br />
            not longer.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            AceHub turns your notes and lecture PDFs into summaries, flashcards and quizzes —
            so the hours you spend revising actually count.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/app">
                Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/app">Sign In</Link>
            </Button>
          </div>
        </div>
        <div className="card-soft overflow-hidden p-0">
          <img
            src={heroImage}
            alt="A calm study desk with notes, a laptop showing the AceHub dashboard and a mug"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-xl text-2xl font-bold tracking-tight md:text-3xl">
            Everything you need between the lecture and the exam
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card-soft card-hover p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground">
                  <f.icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">How it works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="font-display text-sm font-bold text-primary">{s.n}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 md:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <GraduationCap className="h-4 w-4 text-primary" /> AceHub
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AceHub. Made for students who care about their grades.
          </p>
        </div>
      </footer>
    </div>
  );
}
