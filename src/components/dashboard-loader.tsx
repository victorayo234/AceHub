import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export function DashboardLoader({ onComplete, duration = 1200 }: DashboardLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-2xl bg-primary/20 duration-1000" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-500 hover:scale-105 animate-in zoom-in-95">
            <GraduationCap className="h-7 w-7 animate-pulse" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="font-display text-xl font-bold tracking-tight text-foreground">
            AceHub
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Preparing your study workspace...
          </p>
        </div>

        {/* Thin Sleek Progress Bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
