import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { DashboardLoader } from "@/components/dashboard-loader";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/app")({
  ssr: false,
  component: AppGate,
});

function AppGate() {
  const { session, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [introReady, setIntroReady] = useState(false);

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

  if (loading || !session || (profile && !profile.onboarding_completed) || !introReady) {
    return <DashboardLoader onComplete={() => setIntroReady(true)} duration={1200} />;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <AppShell />
    </div>
  );
}

