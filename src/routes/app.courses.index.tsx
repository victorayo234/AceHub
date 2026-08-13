import { Link, createFileRoute } from "@tanstack/react-router";
import { FileText, Loader2, Pencil } from "lucide-react";

import { EmptyState, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMyCourses } from "@/hooks/use-courses";
import { tagColor } from "@/lib/mock-data";

export const Route = createFileRoute("/app/courses/")({
  head: () => ({
    meta: [
      { title: "My Courses — AceHub" },
      { name: "description", content: "All your courses with progress, notes and uploaded files." },
      { property: "og:title", content: "My Courses — AceHub" },
      { property: "og:description", content: "Organise every course, note and PDF in one place." },
    ],
  }),
  component: Courses,
});

function Courses() {
  const { data: courses, isLoading } = useMyCourses();

  return (
    <div>
      <PageHeader
        title="My Courses"
        subtitle={
          courses?.length
            ? `${courses.length} courses selected for this semester.`
            : "The courses you picked during setup live here."
        }
        action={
          <Button asChild variant="outline">
            <Link to="/onboarding">
              <Pencil className="mr-1.5 h-4 w-4" /> Edit selection
            </Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : !courses?.length ? (
        <EmptyState
          icon={FileText}
          title="No courses yet"
          body="Run the quick setup to pick your department, level and nine courses."
          action={
            <Button asChild>
              <Link to="/onboarding">Set up my courses</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link
              key={c.id}
              to="/app/courses/$courseId"
              params={{ courseId: c.id }}
              className="card-soft card-hover block p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${tagColor[c.tag]}`} />
                  <span className="text-xs font-medium text-muted-foreground">{c.code}</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> {c.notes + c.files}
                </span>
              </div>
              <h3 className="mt-2.5 text-lg font-semibold">{c.title}</h3>
              <Progress value={c.progress} className="mt-5 h-1.5" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{c.progress}% complete</span>
                <span>
                  {c.notes} notes · {c.files} files
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

