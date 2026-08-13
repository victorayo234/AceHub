import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/app")({
  ssr: false,
  component: AppGate,
});

function AppGate() {
  const { session, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      void navigate({ to: "/auth", replace: true, search: { mode: undefined } });
      return;
    }
    if (profile && !profile.onboarding_completed) {
      void navigate({ to: "/onboarding", replace: true });
    }
  }, [loading, session, profile, navigate]);

  if (loading || !session || (profile && !profile.onboarding_completed)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <AppShell />;
}

