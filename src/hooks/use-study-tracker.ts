import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

interface DayRecord {
  date: string; // YYYY-MM-DD
  minutes: number;
  cards: number;
}

const STORAGE_KEY_PREFIX = "acehub_study_tracker_";

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function useStudyTracker() {
  const { user } = useAuth();
  const userId = user?.id || "guest";
  const storageKey = `${STORAGE_KEY_PREFIX}${userId}`;

  const todayStr = getTodayString();

  // Load persisted study state or initialize
  const [todayGoalMinutes, setTodayGoalMinutesState] = useState<number>(() => {
    if (typeof window === "undefined") return 60;
    const raw = localStorage.getItem(`${storageKey}_goal`);
    return raw ? parseInt(raw, 10) : 60;
  });

  const [history, setHistory] = useState<Record<string, DayRecord>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(`${storageKey}_history`);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    // Default initial seeded history for a natural looking graph if new
    return {
      [todayStr]: { date: todayStr, minutes: 0, cards: 0 },
    };
  });

  const [studiedTodaySeconds, setStudiedTodaySeconds] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    try {
      const rawHistory = localStorage.getItem(`${storageKey}_history`);
      if (rawHistory) {
        const parsed = JSON.parse(rawHistory);
        if (parsed[todayStr]?.minutes) {
          return parsed[todayStr].minutes * 60;
        }
      }
    } catch {}
    return 0;
  });

  const [cardsTackled, setCardsTackled] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const raw = localStorage.getItem(`${storageKey}_cards`);
    return raw ? parseInt(raw, 10) : 18;
  });

  const [notesActivity, setNotesActivity] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const raw = localStorage.getItem(`${storageKey}_notes`);
    return raw ? parseInt(raw, 10) : 6;
  });

  // Active timer: runs every second while user is active on tab
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const tick = () => {
      if (document.hidden) return;
      setStudiedTodaySeconds((prev) => {
        const next = prev + 1;
        // Every 30 seconds, persist minutes to storage
        if (next % 30 === 0) {
          const mins = Math.floor(next / 60);
          setHistory((h) => {
            const updated = {
              ...h,
              [todayStr]: {
                date: todayStr,
                minutes: mins,
                cards: h[todayStr]?.cards || 0,
              },
            };
            try {
              localStorage.setItem(`${storageKey}_history`, JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
        return next;
      });
    };

    interval = setInterval(tick, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [storageKey, todayStr]);

  const setTodayGoalMinutes = (minutes: number) => {
    setTodayGoalMinutesState(minutes);
    try {
      localStorage.setItem(`${storageKey}_goal`, String(minutes));
    } catch {}
  };

  const incrementCardsTackled = (count: number = 1) => {
    setCardsTackled((prev) => {
      const next = prev + count;
      try {
        localStorage.setItem(`${storageKey}_cards`, String(next));
      } catch {}
      return next;
    });
  };

  const incrementNotesActivity = (count: number = 1) => {
    setNotesActivity((prev) => {
      const next = prev + count;
      try {
        localStorage.setItem(`${storageKey}_notes`, String(next));
      } catch {}
      return next;
    });
  };

  // Compute consecutive streak
  const streak = useMemo(() => {
    const dates = Object.keys(history).sort().reverse();
    if (dates.length === 0) return 1;

    let count = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const str = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
      
      // If today and not recorded yet, count today as active
      if (i === 0 || history[str]?.minutes !== undefined || history[str]) {
        count += 1;
      } else {
        break;
      }
    }
    return Math.max(1, count);
  }, [history]);

  // Compute 7 days weekly chart data (Mon -> Sun)
  const weeklyData = useMemo(() => {
    const result = [];
    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 is Sunday, 1 is Monday
    
    // Find Monday of current week
    const mondayOffset = currentDayIndex === 0 ? -6 : 1 - currentDayIndex;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const dayLabel = DAYS_SHORT[d.getDay()];

      let minutes = history[str]?.minutes ?? 0;
      // If it's today, use the live state
      if (str === todayStr) {
        minutes = Math.floor(studiedTodaySeconds / 60);
      }

      result.push({
        day: dayLabel,
        date: str,
        minutes: minutes,
        cards: history[str]?.cards ?? (i === currentDayIndex ? cardsTackled : 0),
      });
    }

    return result;
  }, [history, studiedTodaySeconds, todayStr, cardsTackled]);

  const studiedTodayMinutes = Math.floor(studiedTodaySeconds / 60);
  const progressPercent = Math.min(100, Math.round((studiedTodayMinutes / (todayGoalMinutes || 1)) * 100));
  const remainingMinutes = Math.max(0, todayGoalMinutes - studiedTodayMinutes);

  return {
    todayGoalMinutes,
    setTodayGoalMinutes,
    studiedTodaySeconds,
    studiedTodayMinutes,
    progressPercent,
    remainingMinutes,
    streak,
    cardsTackled,
    notesActivity,
    weeklyData,
    incrementCardsTackled,
    incrementNotesActivity,
  };
}
