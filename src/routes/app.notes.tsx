import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronDown, FileText, Loader2, NotebookPen, Sparkles, UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AiLoading, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/app-shell";
import { ALL_COURSES, CourseFilter } from "@/components/course-filter";
import { useMyCourses } from "@/hooks/use-courses";
import { notesForCourse } from "@/lib/course-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notes")({
  head: () => ({
    meta: [
      { title: "Notes & PDFs — AceHub" },
      { name: "description", content: "Write notes, upload lecture PDFs and generate AI summaries." },
      { property: "og:title", content: "Notes & PDFs — AceHub" },
      { property: "og:description", content: "Write notes, upload PDFs and summarise them with AI." },
    ],
  }),
  component: Notes,
});

const SUMMARY = [
  "ATP synthesis depends on a proton gradient built by the electron transport chain across the inner mitochondrial membrane.",
  "Complexes I–IV pump protons into the intermembrane space; ATP synthase lets them flow back and captures the energy.",
  "Oxygen is the terminal electron acceptor — without it the chain backs up and the gradient collapses.",
];

function SummaryCard() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [open, setOpen] = useState(true);

  if (state === "loading") return <AiLoading label="Analyzing your notes…" />;

  if (state === "done") {
    return (
      <div className="rounded-xl border border-border bg-primary-soft/60 p-4">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">
            <Sparkles className="h-4 w-4" /> AI summary
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
          />
        </button>
        {open ? (
          <ul className="mt-3 space-y-2">
            {SUMMARY.map((s) => (
              <li key={s} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => {
        setState("loading");
        setTimeout(() => setState("done"), 2200);
      }}
    >
      <Sparkles className="mr-1.5 h-4 w-4" /> Generate AI summary
    </Button>
  );
}

function UploadZone() {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [file, setFile] = useState<string | null>(null);

  const startUpload = (name = "lecture-09-metabolism.pdf") => {
    setFile(name);
    setProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += 12;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(timer);
        setProgress(null);
        toast.success("PDF processed and ready");
      }
    }, 180);
  };

  return (
    <div className="card-soft p-6">
      <h2 className="text-base font-semibold">Upload a PDF</h2>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          startUpload(e.dataTransfer.files[0]?.name);
        }}
        className={cn(
          "mt-4 flex flex-col items-center rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors",
          dragging && "border-primary bg-primary-soft/60",
        )}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground">
          <UploadCloud className="h-5 w-5" />
        </span>
        <p className="mt-3 text-sm font-medium">Drag & drop your lecture PDF</p>
        <p className="mt-1 text-xs text-muted-foreground">or browse from your device · max 50 MB</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => startUpload()}>
          Choose file
        </Button>
      </div>

      {file ? (
        <div className="mt-4 rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file}</p>
              <p className="text-xs text-muted-foreground">
                {progress === null ? "Processed · 24 pages" : "Extracting text…"}
              </p>
            </div>
          </div>
          {progress !== null ? <Progress value={progress} className="mt-3 h-1.5" /> : null}
          {progress === null ? (
            <div className="mt-4">
              <SummaryCard />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Notes() {
  const { data: courses, isLoading } = useMyCourses();
  const [filter, setFilter] = useState<string>(ALL_COURSES);
  const [selected, setSelected] = useState<string | null>(null);

  const scoped = useMemo(() => {
    const list = courses ?? [];
    return filter === ALL_COURSES ? list : list.filter((c) => c.id === filter);
  }, [courses, filter]);

  const notes = useMemo(() => scoped.flatMap((c) => notesForCourse(c)), [scoped]);
  const active = notes.find((n) => n.id === selected) ?? notes[0] ?? null;
  const course = courses?.find((c) => c.id === active?.courseId);
  const selectedCourse = courses?.find((c) => c.id === filter) ?? null;

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
        <PageHeader title="Notes" subtitle="Notes are organised by the courses you selected." />
        <EmptyState
          icon={NotebookPen}
          title="No courses yet"
          body="Pick your department, level and nine courses to start writing notes."
          action={
            <Button asChild>
              <Link to="/onboarding">Set up my courses</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Notes" subtitle="Write, upload and summarise material for your own courses." />

      <div className="mb-6">
        <CourseFilter courses={courses} value={filter} onChange={(v) => { setFilter(v); setSelected(null); }} />
      </div>

      {!active ? (
        <EmptyState
          icon={NotebookPen}
          title={selectedCourse ? `No notes yet for ${selectedCourse.title}` : "No notes yet"}
          body={
            selectedCourse
              ? `Create your first ${selectedCourse.code} note or upload a lecture PDF.`
              : "Create a note or upload a lecture PDF for any of your courses."
          }
        />
      ) : (
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="card-soft h-fit p-2">
          {notes.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setSelected(n.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                n.id === active.id ? "bg-accent" : "hover:bg-secondary",
              )}
            >
              {n.kind === "pdf" ? (
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              ) : (
                <NotebookPen className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              )}
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{n.title}</span>
                <span className="block text-xs text-muted-foreground">{n.updated}</span>
              </span>
            </button>
          ))}
        </aside>

        <div className="space-y-6">
          <div className="card-soft p-6">
            <Input
              defaultValue={active.title}
              key={active.id}
              className="border-0 px-0 font-display !text-2xl font-bold shadow-none focus-visible:ring-0"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {course?.code} · edited {active.updated}
            </p>
            <div className="mt-4 flex flex-wrap gap-1 border-y border-border py-2 text-xs text-muted-foreground">
              {["B", "I", "U", "H1", "H2", "• List", "1. List", "Quote", "Code"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className="rounded px-2.5 py-1 font-medium transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {t}
                </button>
              ))}
            </div>
            <Textarea
              key={`body-${active.id}`}
              defaultValue={`${active.excerpt}\n\nKey points\n• Define the core terms in your own words.\n• Work through one example end to end.\n• Note the questions the lecturer hinted at.`}
              className="mt-4 min-h-64 resize-none border-0 px-0 text-sm leading-relaxed shadow-none focus-visible:ring-0"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <SummaryCard />
              <Button variant="ghost" onClick={() => toast.success("Note saved")}>
                Save note
              </Button>
            </div>
          </div>

          <UploadZone />
        </div>
      </div>
      )}
    </div>
  );
}
