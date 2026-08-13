import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  REQUIRED_COURSES,
  useCatalogCourses,
  useDepartments,
  useInvalidateMyCourses,
  type CatalogCourse,
} from "@/hooks/use-courses";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set up your study space — AceHub" },
      {
        name: "description",
        content: "Pick your department, level and nine courses to personalise your AceHub dashboard.",
      },
      { property: "og:title", content: "Set up your study space — AceHub" },
      {
        property: "og:description",
        content: "A quick five-step setup that tailors AceHub to your department and level.",
      },
    ],
  }),
  component: Onboarding,
});

const LEVELS = [100, 200, 300, 400];
const STEPS = ["Welcome", "Department", "Level", "Courses", "Confirm"];

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={cn(
                "h-1.5 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-secondary",
              )}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Step {step + 1} of {STEPS.length} · {STEPS[step]}
      </p>
    </div>
  );
}

function Onboarding() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const invalidateMyCourses = useInvalidateMyCourses();

  const [step, setStep] = useState(0);
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const departments = useDepartments();
  const catalog = useCatalogCourses(departmentId, level);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/auth", replace: true, search: { mode: undefined } });
  }, [loading, user, navigate]);

  // Prefill when the user is editing an existing selection.
  useEffect(() => {
    if (hydrated || !profile || !user) return;
    setHydrated(true);
    if (profile.department_id) setDepartmentId(profile.department_id);
    if (profile.level) setLevel(profile.level);
    if (profile.onboarding_completed) {
      void supabase
        .from("user_courses")
        .select("course_id")
        .eq("user_id", user.id)
        .then(({ data }) => {
          if (data?.length) setSelected(data.map((r) => r.course_id));
        });
    }
  }, [hydrated, profile, user]);

  const department = departments.data?.find((d) => d.id === departmentId) ?? null;

  const { deptCourses, commonCourses } = useMemo(() => {
    const list = catalog.data ?? [];
    const q = query.trim().toLowerCase();
    const match = (c: CatalogCourse) =>
      !q || c.course_name.toLowerCase().includes(q) || c.course_code.toLowerCase().includes(q);
    return {
      deptCourses: list.filter((c) => !c.is_common && match(c)),
      commonCourses: list.filter((c) => c.is_common && match(c)),
    };
  }, [catalog.data, query]);

  const selectedCourses = useMemo(
    () => (catalog.data ?? []).filter((c) => selected.includes(c.id)),
    [catalog.data, selected],
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= REQUIRED_COURSES) return prev;
      return [...prev, id];
    });
  };

  const handleFinish = async () => {
    if (!user || !departmentId || !level || selected.length !== REQUIRED_COURSES) return;
    setSaving(true);
    try {
      const { error: delError } = await supabase.from("user_courses").delete().eq("user_id", user.id);
      if (delError) throw delError;

      const { error: insError } = await supabase
        .from("user_courses")
        .insert(selected.map((course_id) => ({ user_id: user.id, course_id })));
      if (insError) throw insError;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ department_id: departmentId, level, onboarding_completed: true })
        .eq("id", user.id);
      if (profileError) throw profileError;

      await refreshProfile();
      await invalidateMyCourses();
      toast.success("Your study space is ready");
      void navigate({ to: "/app", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your setup");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold">AceHub</span>
        </div>

        <StepIndicator step={step} />

        <div className="card-soft mt-8 p-6 sm:p-8">
          {step === 0 && (
            <div className="py-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-accent-foreground">
                <Sparkles className="h-6 w-6" />
              </span>
              <h1 className="mt-6 font-display text-3xl font-bold">
                Welcome{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}!
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Let's set up your study space. In under a minute you'll pick your department, your
                level and the nine courses you're taking this semester — everything else in AceHub
                builds on that.
              </p>
              <Button className="mt-8" size="lg" onClick={() => setStep(1)}>
                Continue <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="font-display text-2xl font-bold">What are you studying?</h1>
              <p className="mt-2 text-sm text-muted-foreground">Pick your department.</p>
              {departments.isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {departments.data?.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        if (d.id !== departmentId) setSelected([]);
                        setDepartmentId(d.id);
                      }}
                      className={cn(
                        "rounded-xl border border-border p-4 text-left transition-all hover:border-primary/60",
                        departmentId === d.id && "border-primary bg-primary-soft/60 ring-1 ring-primary",
                      )}
                    >
                      <p className="text-xs font-medium text-muted-foreground">{d.code}</p>
                      <p className="mt-1 text-sm font-semibold">{d.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="font-display text-2xl font-bold">What level are you in?</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {department?.name ?? "Your department"} — choose your current level.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      if (l !== level) setSelected([]);
                      setLevel(l);
                    }}
                    className={cn(
                      "rounded-xl border border-border p-5 text-center transition-all hover:border-primary/60",
                      level === l && "border-primary bg-primary-soft/60 ring-1 ring-primary",
                    )}
                  >
                    <p className="font-display text-2xl font-bold">{l}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Level</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="font-display text-2xl font-bold">Pick your courses</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {department?.name} · {level} Level — choose exactly {REQUIRED_COURSES} courses.
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-semibold",
                    selected.length === REQUIRED_COURSES
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {selected.length}/{REQUIRED_COURSES} selected
                </span>
              </div>

              <div className="relative mt-5">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by course name or code…"
                  className="pl-9"
                />
              </div>

              {catalog.isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <CourseGrid
                    heading={`${department?.name ?? "Department"} courses`}
                    courses={deptCourses}
                    selected={selected}
                    full={selected.length >= REQUIRED_COURSES}
                    onToggle={toggle}
                  />
                  <CourseGrid
                    heading="Common / General courses"
                    courses={commonCourses}
                    selected={selected}
                    full={selected.length >= REQUIRED_COURSES}
                    onToggle={toggle}
                  />
                </>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="font-display text-2xl font-bold">Does this look right?</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                You can change any of this later from Settings.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SummaryRow label="Department" value={department?.name ?? "—"} onEdit={() => setStep(1)} />
                <SummaryRow label="Level" value={level ? `${level} Level` : "—"} onEdit={() => setStep(2)} />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Your {REQUIRED_COURSES} courses</h2>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Edit
                </button>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {selectedCourses.map((c) => (
                  <div key={c.id} className="rounded-xl border border-border p-3">
                    <p className="text-xs font-medium text-muted-foreground">{c.course_code}</p>
                    <p className="mt-0.5 text-sm font-semibold">{c.course_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step > 0 && (
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))}>
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
              </Button>
              {step < 4 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={
                    (step === 1 && !departmentId) ||
                    (step === 2 && !level) ||
                    (step === 3 && selected.length !== REQUIRED_COURSES)
                  }
                >
                  Continue <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleFinish} disabled={saving || selected.length !== REQUIRED_COURSES}>
                  {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
                  Finish setup
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold">{value}</p>
      </div>
      <button type="button" onClick={onEdit} className="text-sm font-medium text-primary hover:underline">
        Edit
      </button>
    </div>
  );
}

function CourseGrid({
  heading,
  courses,
  selected,
  full,
  onToggle,
}: {
  heading: string;
  courses: CatalogCourse[];
  selected: string[];
  full: boolean;
  onToggle: (id: string) => void;
}) {
  if (courses.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{heading}</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => {
          const isSelected = selected.includes(c.id);
          const disabled = full && !isSelected;
          return (
            <button
              key={c.id}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(c.id)}
              className={cn(
                "relative rounded-xl border border-border p-4 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary-soft/60 ring-1 ring-primary"
                  : "hover:border-primary/60",
                disabled && "cursor-not-allowed opacity-45 hover:border-border",
              )}
            >
              {isSelected ? (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
              ) : null}
              <p className="text-xs font-medium text-muted-foreground">{c.course_code}</p>
              <p className="mt-1 pr-6 text-sm font-semibold leading-snug">{c.course_name}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
