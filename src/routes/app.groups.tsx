import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader2, Plus, Send, Sparkles, Target, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { EmptyState, PageHeader } from "@/components/app-shell";
import { CourseFilter } from "@/components/course-filter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useMyCourses, useMyDepartment, type MyCourse } from "@/hooks/use-courses";
import { departmentGroups, recommendedGroups, type StudyGroup } from "@/lib/course-content";
import { chat } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/groups")({
  head: () => ({
    meta: [
      { title: "Study Groups — AceHub" },
      { name: "description", content: "Study groups for your own courses, department and level." },
      { property: "og:title", content: "Study Groups — AceHub" },
      { property: "og:description", content: "Join groups tied to the courses you are actually taking." },
    ],
  }),
  component: Groups,
});

function GroupDialog({ courses }: { courses: MyCourse[] }) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [name, setName] = useState("");
  const course = courses.find((c) => c.id === courseId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!courses.length}>
          <Plus className="mr-1.5 h-4 w-4" /> New group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create or join a group</DialogTitle>
          <DialogDescription>Groups are tied to one of your nine selected courses.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Course</Label>
            <CourseFilter
              courses={courses}
              value={courseId}
              onChange={setCourseId}
              includeAll={false}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="group-name">Group name</Label>
            <Input
              id="group-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={course ? `${course.code} Study Squad` : "Study group name"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite">Or join with an invite code</Label>
            <Input id="invite" placeholder="AB-1234" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              toast.success(`${course?.code ?? "Group"} group created — invite code copied`);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function GroupCard({
  group,
  active,
  onSelect,
}: {
  group: StudyGroup;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn("card-soft card-hover p-5 text-left", active && "ring-2 ring-ring")}
    >
      <span className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground">
          <Users className="h-4 w-4" />
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground">
          {group.courseCode}
        </span>
      </span>
      <h3 className="mt-3 text-base font-semibold">{group.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {group.department}
        {group.level ? ` · ${group.level} level` : ""}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {group.members} members · {group.notes} shared notes
      </p>
    </button>
  );
}

function Groups() {
  const { data: courses, isLoading } = useMyCourses();
  const { departmentName, level } = useMyDepartment();

  const recommended = useMemo(
    () => (courses?.length ? recommendedGroups(courses, departmentName, level) : []),
    [courses, departmentName, level],
  );
  const deptGroups = useMemo(
    () => departmentGroups(departmentName, level),
    [departmentName, level],
  );

  const all = [...recommended, ...deptGroups];
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = all.find((g) => g.id === activeId) ?? all[0] ?? null;

  const [messages, setMessages] = useState(chat);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { id: m.length + 1, name: "You", initials: "YO", time: "now", text: draft.trim() },
    ]);
    setDraft("");
  };

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
        <PageHeader title="Study Groups" subtitle="Groups follow the courses you selected." />
        <EmptyState
          icon={Users}
          title="No courses yet"
          body="Pick your department, level and nine courses to see groups for them."
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
      <PageHeader
        title="Study Groups"
        subtitle={`${departmentName}${level ? ` · ${level} level` : ""}`}
        action={<GroupDialog courses={courses} />}
      />

      <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
        <Sparkles className="h-4 w-4 text-primary" /> Recommended for you
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">Groups for the courses you are taking this semester.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((g) => (
          <GroupCard key={g.id} group={g} active={active?.id === g.id} onSelect={() => setActiveId(g.id)} />
        ))}
      </div>

      <h2 className="mb-4 mt-8 text-base font-semibold">More in {departmentName}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deptGroups.map((g) => (
          <GroupCard key={g.id} group={g} active={active?.id === g.id} onSelect={() => setActiveId(g.id)} />
        ))}
      </div>

      {active ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="card-soft flex flex-col p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">{active.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {active.courseCode} · {active.department}
                  {active.level ? ` · ${active.level} level` : ""}
                </p>
              </div>
              <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs">{active.code}</span>
            </div>

            <div className="mt-5 flex-1 space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-[11px] font-semibold">
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">{m.name}</span> · {m.time}
                    </p>
                    <p className="mt-1 rounded-xl rounded-tl-sm bg-secondary/70 px-3.5 py-2.5 text-sm leading-relaxed">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Message the group…"
              />
              <Button size="icon" onClick={send}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="card-soft p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Target className="h-4 w-4 text-primary" /> Shared goal
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{active.goal}</p>
            </div>
            <div className="card-soft p-6">
              <h3 className="text-sm font-semibold">Your courses</h3>
              <ul className="mt-3 space-y-2.5">
                {courses.slice(0, 6).map((c) => (
                  <li key={c.id} className="truncate text-sm text-muted-foreground">
                    {c.code} — {c.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
