import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Flame,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Sparkles,
  Twitter,
  Upload,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-study.jpg";
import { ThemeToggle } from "@/components/theme-toggle";
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
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/auth" search={{ mode: "signup" }}>Get Started</Link>
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
              <Link to="/auth" search={{ mode: "signup" }}>
                Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/auth">Sign In</Link>
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
        {/* Newsletter strip */}
        <div className="border-b border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold tracking-tight">Study tips, every other week</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Revision techniques, product updates and exam-season playbooks. No spam, unsubscribe anytime.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("You're subscribed — check your inbox for a welcome note.");
                (e.currentTarget as HTMLFormElement).reset();
              }}
              className="flex w-full max-w-md items-center gap-2"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@university.edu"
                className="h-11 bg-background"
              />
              <Button type="submit" size="lg" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

            {/* Brand column */}
            <div className="flex flex-col gap-5 lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="h-[18px] w-[18px]" />
                </span>
                <span className="font-display text-base font-bold tracking-tight">AceHub</span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                The ultimate learning workspace for students to track grades, calculate GPA, and organise their academic life.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">{col.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((item) =>
                    "to" in item ? (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {item.label}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-border bg-background px-5 py-4">
            <span className="text-sm font-medium">Need a hand?</span>
            <a
              href="mailto:victorayo234@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" /> victorayo234@gmail.com
            </a>
            <a
              href="https://discord.com/users/1298397081555435564"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Chat on Discord
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 md:px-6">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AceHub. Made for students who care about their grades.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
