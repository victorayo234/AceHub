import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, GraduationCap, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";

import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    mode: typeof search["mode"] === "string" ? (search["mode"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in or sign up — AceHub" },
      {
        name: "description",
        content: "Create your AceHub account or sign in to your AI-powered study workspace.",
      },
      { property: "og:title", content: "Sign in or sign up — AceHub" },
      { property: "og:description", content: "Access your courses, notes, flashcards and quizzes." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "verify" | "forgot" | "reset";

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const search = useRouterState({ select: (s) => s.location.search }) as { mode?: string };

  const [mode, setMode] = useState<Mode>(search?.mode === "signup" ? "signup" : "signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const redirectUrl =
    import.meta.env.VITE_SUPABASE_REDIRECT_URL ??
    import.meta.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
    `${window.location.origin}/auth`;

  useEffect(() => {
    if (!loading && session) void navigate({ to: "/app", replace: true });
  }, [session, loading, navigate]);

  useEffect(() => {
    if (loading || session) return;

    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const authError = url.searchParams.get("error_description");
    const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");

    if (authError) {
      toast.error("Google sign-in was cancelled or could not be completed.");
      window.history.replaceState({}, document.title, url.pathname);
      return;
    }

    if (!code && (!accessToken || !refreshToken)) return;

    setBusy(true);
    const finish = async () => {
      const result = code
        ? await supabase.auth.exchangeCodeForSession(code)
        : await supabase.auth.setSession({ access_token: accessToken!, refresh_token: refreshToken! });

      if (result.error) {
        toast.error("That sign-in link is invalid or has expired.");
        return;
      }

      window.history.replaceState({}, document.title, url.pathname);
      toast.success("Welcome to AceHub");
      await navigate({ to: "/app", replace: true });
    };

    void finish().catch(() => toast.error("We couldn't complete sign-in. Please try again.")).finally(() => setBusy(false));
  }, [loading, navigate, session]);

  const authErrorMessage = (error: { message: string }) => {
    const message = error.message.toLowerCase();
    if (message.includes("not confirmed")) return "Please confirm your email before signing in.";
    if (message.includes("invalid login credentials")) return "Invalid email or password.";
    if (message.includes("rate limit") || message.includes("too many")) return "Too many attempts. Please try again later.";
    return "We couldn't complete that request. Please try again.";
  };

  const wrap = (fn: () => Promise<void>) => async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await fn();
    } catch (err) {
      toast.error(err && typeof err === "object" && "message" in err ? authErrorMessage(err as { message: string }) : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const handleSignIn = wrap(async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.toLowerCase().includes("not confirmed")) {
        await supabase.auth.resend({ type: "signup", email });
        setMode("verify");
        toast.message("Confirm your email", { description: "We sent you a verification code." });
        return;
      }
      throw new Error(authErrorMessage(error));
    }
    toast.success("Welcome back");
    void navigate({ to: "/app", replace: true });
  });

  const handleSignUp = wrap(async () => {
    if (password.length < 8) throw new Error("Password must be at least 8 characters");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: name },
      },
    });
    if (error) throw error;
    if (data.session) {
      void navigate({ to: "/app", replace: true });
      return;
    }
    setMode("verify");
    toast.message("Check your inbox", { description: "We emailed you a verification code." });
  });

  const handleVerify = wrap(async () => {
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "signup" });
    if (error) throw error;
    toast.success("Email verified");
    void navigate({ to: "/app", replace: true });
  });

  const handleForgot = wrap(async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    if (error) throw error;
    setMode("reset");
    toast.message("Code sent", { description: "Enter the code from your email to reset your password." });
  });

  const handleReset = wrap(async () => {
    if (password.length < 8) throw new Error("Password must be at least 8 characters");
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    if (error) throw error;
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) throw updateError;
    toast.success("Password updated");
    void navigate({ to: "/app", replace: true });
  });

  const handleGoogle = async () => {
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) {
        toast.error(error.message ?? "Google sign-in failed");
      }
      // Supabase will redirect the browser — no manual navigation needed
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const copy = {
    signin: { title: "Welcome back", sub: "Sign in to pick up where you left off." },
    signup: { title: "Create your account", sub: "Start turning notes into flashcards in minutes." },
    verify: { title: "Verify your email", sub: `Enter the 6-digit code we sent to ${email}.` },
    forgot: { title: "Reset your password", sub: "We'll email you a one-time code." },
    reset: { title: "Set a new password", sub: `Enter the code sent to ${email} and your new password.` },
  }[mode];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 md:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-[18px] w-[18px]" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">AceHub</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="card-soft w-full max-w-md p-7">
          <h1 className="text-2xl font-bold tracking-tight">{copy.title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{copy.sub}</p>

          {(mode === "signin" || mode === "signup") && (
            <>
              <Button
                variant="outline"
                className="mt-6 w-full"
                onClick={handleGoogle}
                disabled={busy}
                type="button"
              >
                <GoogleMark /> Continue with Google
              </Button>
              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or use email <span className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          <form
            className="space-y-4"
            onSubmit={
              mode === "signin"
                ? handleSignIn
                : mode === "signup"
                  ? handleSignUp
                  : mode === "verify"
                    ? handleVerify
                    : mode === "forgot"
                      ? handleForgot
                      : handleReset
            }
          >
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ada Okoye" />
              </div>
            )}

            {(mode === "signin" || mode === "signup" || mode === "forgot") && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@university.edu"
                />
              </div>
            )}

            {(mode === "verify" || mode === "reset") && (
              <div className="space-y-2">
                <Label>Verification code</Label>
                <InputOTP maxLength={6} value={code} onChange={setCode}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-xs text-muted-foreground">
                  Didn&apos;t get it? Check spam — or click the confirmation link in the email.
                </p>
              </div>
            )}

            {(mode === "signin" || mode === "signup" || mode === "reset") && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{mode === "reset" ? "New password" : "Password"}</Label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline"
                      onClick={() => setMode("forgot")}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "signin"
                ? "Sign in"
                : mode === "signup"
                  ? "Create account"
                  : mode === "verify"
                    ? "Verify email"
                    : mode === "forgot"
                      ? "Send code"
                      : "Update password"}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" && (
              <>
                New to AceHub?{" "}
                <button className="font-medium text-primary hover:underline" onClick={() => setMode("signup")}>
                  Create an account
                </button>
              </>
            )}
            {mode === "signup" && (
              <>
                Already have an account?{" "}
                <button className="font-medium text-primary hover:underline" onClick={() => setMode("signin")}>
                  Sign in
                </button>
              </>
            )}
            {(mode === "verify" || mode === "forgot" || mode === "reset") && (
              <button
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                onClick={() => {
                  setCode("");
                  setMode("signin");
                }}
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
              </button>
            )}
          </div>

          {mode === "verify" && (
            <button
              className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              onClick={async () => {
                await supabase.auth.resend({ type: "signup", email });
                toast.success("Code resent");
              }}
            >
              <Mail className="h-3.5 w-3.5" /> Resend code
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.4v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8z" />
    </svg>
  );
}
