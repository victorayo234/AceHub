import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowRight,
  Flame,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MessageCircle,
  Sparkles,
  Twitter,
  Upload,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import heroImage from "@/assets/hero-study.jpg";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const socials = [
  { label: "GitHub", href: "https://github.com/victorayo234", icon: Github },
  { label: "X / Twitter", href: "https://x.com/ayo__adebesin", icon: Twitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ayo-adebesin-is-him/", icon: Linkedin },
  { label: "Discord", href: "https://discord.com/users/1298397081555435564", icon: DiscordIcon },
];

type FooterLink = { label: string; to: "/" | "/app" } | { label: string; href: string };

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "AI Summaries", to: "/app" },
      { label: "Flashcards", to: "/app" },
      { label: "Practice Quizzes", to: "/app" },
      { label: "Study Planner", to: "/app" },
      { label: "Progress & Streaks", to: "/app" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Student Guide", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "https://discord.com/users/1298397081555435564" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "mailto:victorayo234@gmail.com" },
      { label: "Feature requests", href: "https://github.com/victorayo234" },
      { label: "Careers", href: "#" },
    ],
  },
];


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
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session) {
      void navigate({ to: "/app", replace: true });
    }
  }, [session, loading, navigate]);

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
          {session ? (
            <Button asChild size="sm">
              <Link to="/app">Dashboard <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth" search={{ mode: undefined }}>Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/auth" search={{ mode: "signup" }}>Get Started</Link>
              </Button>
            </>
          )}
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
              <Link to="/auth" search={{ mode: undefined }}>Sign In</Link>
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
