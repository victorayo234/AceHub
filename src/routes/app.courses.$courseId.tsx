import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, FileText, Loader2, NotebookPen, Sparkles } from "lucide-react";

import { EmptyState, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMyCourses } from "@/hooks/use-courses";
import { notes, tagColor } from "@/lib/mock-data";

export const Route = createFileRoute("/app/courses/$courseId")({
  head: () => ({
    meta: [
      { title: "Course — AceHub" },
      { name: "description", content: "All notes, PDFs and decks inside this course." },
      { property: "og:title", content: "Course — AceHub" },
      { property: "og:description", content: "All notes, PDFs and decks inside this course." },
    ],
  }),
  component: CourseDetail,
});

function CourseDetail() {
  const { courseId } = Route.useParams();
  const { data: courses, isLoading } = useMyCourses();
  const course = courses?.find((c) => c.id === courseId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!course) {
    return (
      <EmptyState
        icon={NotebookPen}
        title="Course not found"
        body="This course isn't part of your current selection."
        action={
          <Button asChild>
            <Link to="/app/courses">Back to my courses</Link>
          </Button>
        }
      />
    );
  }

  const items = notes.slice(0, (course.notes % 4) + 1);

  return (
    <div>
      <Link
        to="/app/courses"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All courses
      </Link>

      <PageHeader
        title={course.title}
        subtitle={`${course.code} · ${course.level} Level · ${course.notes} notes · ${course.files} files`}
        action={
          <Button asChild>
            <Link to="/app/notes">
              <Sparkles className="mr-1.5 h-4 w-4" /> New note
            </Link>
          </Button>
        }
      />

      <div className="card-soft mb-8 flex flex-wrap items-center gap-6 p-6">
        <div className="min-w-48 flex-1">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${tagColor[course.tag]}`} />
            <span className="text-sm font-medium">Course progress</span>
          </div>
          <Progress value={course.progress} className="mt-3 h-2" />
        </div>
        <p className="font-display text-3xl font-bold">{course.progress}%</p>
      </div>

      <h2 className="mb-4 text-base font-semibold">Material</h2>
      {items.length === 0 ? (
        <EmptyState
          icon={NotebookPen}
          title="Nothing here yet"
          body="No notes yet — upload your first PDF or write a note to get started."
          action={
            <Button asChild>
              <Link to="/app/notes">Add material</Link>
            </Button>
          }
        />
      ) : (
        <div className="card-soft divide-y divide-border">
          {items.map((n) => (
            <Link
              key={n.id}
              to="/app/notes"
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/60"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground">
                {n.kind === "pdf" ? (
                  <FileText className="h-4 w-4" />
                ) : (
                  <NotebookPen className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{n.title}</p>
                <p className="truncate text-xs text-muted-foreground">{n.excerpt}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.updated}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
