import { Link, createFileRoute } from "@tanstack/react-router";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { courses, tagColor } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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

function CreateCourseDialog() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("teal");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" /> New course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a course</DialogTitle>
          <DialogDescription>Group your notes, PDFs and decks by subject.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="course-title">Course title</Label>
            <Input
              id="course-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Microeconomics"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-code">Course code</Label>
            <Input id="course-code" placeholder="e.g. ECON 210" />
          </div>
          <div className="space-y-2">
            <Label>Colour tag</Label>
            <div className="flex gap-2">
              {Object.keys(tagColor).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-label={t}
                  onClick={() => setTag(t)}
                  className={cn(
                    "h-7 w-7 rounded-full ring-offset-2 transition-all",
                    tagColor[t],
                    tag === t && "ring-2 ring-ring",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              toast.success(`${title || "Course"} created`);
              setTitle("");
            }}
          >
            Create course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Courses() {
  return (
    <div>
      <PageHeader
        title="My Courses"
        subtitle="Six courses in progress this semester."
        action={<CreateCourseDialog />}
      />
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
    </div>
  );
}
