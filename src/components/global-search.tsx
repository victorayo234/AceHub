import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Layers, NotebookPen, Search, Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { courses, decks, groups, notes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Result = {
  id: string;
  label: string;
  meta: string;
  group: string;
  icon: React.ElementType;
  to: string;
  params?: Record<string, string>;
};

function buildIndex(): Result[] {
  return [
    ...courses.map((c) => ({
      id: `course-${c.id}`,
      label: c.title,
      meta: `${c.code} · ${c.notes} notes`,
      group: "Courses",
      icon: BookOpen,
      to: "/app/courses/$courseId",
      params: { courseId: c.id },
    })),
    ...notes.map((n) => ({
      id: `note-${n.id}`,
      label: n.title,
      meta: `${n.kind === "pdf" ? "PDF" : "Note"} · ${n.updated}`,
      group: "Notes",
      icon: NotebookPen,
      to: "/app/notes",
    })),
    ...decks.map((d) => ({
      id: `deck-${d.id}`,
      label: d.title,
      meta: `${d.total} cards · ${d.due} due`,
      group: "Flashcards",
      icon: Layers,
      to: "/app/flashcards",
    })),
    ...groups.map((g) => ({
      id: `group-${g.id}`,
      label: g.name,
      meta: `${g.members} members`,
      group: "Study Groups",
      icon: Users,
      to: "/app/groups",
    })),
  ];
}

export function GlobalSearch({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((r) => `${r.label} ${r.meta} ${r.group}`.toLowerCase().includes(q))
      .slice(0, 8);
  }, [index, query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function go(r: Result) {
    setOpen(false);
    setQuery("");
    onNavigate?.();
    navigate({ to: r.to, params: r.params as never });
  }

  return (
    <div ref={containerRef} className="relative max-w-md flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!results.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => (a + 1) % results.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => (a - 1 + results.length) % results.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            const hit = results[active];
            if (hit) go(hit);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        placeholder="Search notes, decks, courses…"
        className="h-10 rounded-lg border-transparent bg-secondary pl-9 pr-14 focus-visible:bg-card"
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
        ⌘K
      </kbd>

      {open && query.trim() ? (
        <div className="card-soft absolute left-0 right-0 top-12 z-50 max-h-96 overflow-y-auto p-1.5">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No matches for “{query}”
            </p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                  i === active ? "bg-secondary" : "hover:bg-secondary",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground">
                  <r.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{r.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{r.meta}</span>
                </span>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {r.group}
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
