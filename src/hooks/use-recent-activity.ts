import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMyCourses } from "@/hooks/use-courses";

export interface RecentItem {
  id: string;
  type: "course" | "flashcard" | "note";
  title: string;
  code: string;
  tag?: string;
  progress?: number;
  url: string;
  updatedAt: string;
}

const STORAGE_KEY = "acehub_recent_activity_";

export function useRecentActivity() {
  const { user } = useAuth();
  const { data: myCourses } = useMyCourses();
  const storageKey = `${STORAGE_KEY}${user?.id || "guest"}`;

  const [recentItems, setRecentItems] = useState<RecentItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });

  // Seed with enrolled courses if user hasn't opened anything yet
  useEffect(() => {
    if (recentItems.length === 0 && myCourses && myCourses.length > 0) {
      const seeded: RecentItem[] = myCourses.slice(0, 3).map((c, i) => ({
        id: c.id,
        type: i === 0 ? "course" : i === 1 ? "flashcard" : "note",
        title: c.title,
        code: c.code,
        tag: c.tag,
        progress: c.progress || 35,
        url: i === 1 ? "/app/flashcards" : i === 2 ? "/app/notes" : `/app/courses/${c.id}`,
        updatedAt: i === 0 ? "10m ago" : i === 1 ? "1h ago" : "Yesterday",
      }));
      setRecentItems(seeded);
      try {
        localStorage.setItem(storageKey, JSON.stringify(seeded));
      } catch {}
    }
  }, [myCourses, recentItems.length, storageKey]);

  const recordActivity = useCallback(
    (item: Omit<RecentItem, "updatedAt">) => {
      setRecentItems((prev) => {
        const filtered = prev.filter((x) => x.id !== item.id);
        const newItem: RecentItem = {
          ...item,
          updatedAt: "Just now",
        };
        const updated = [newItem, ...filtered].slice(0, 6);
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    },
    [storageKey],
  );

  return {
    recentItems,
    recordActivity,
  };
}
