import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, GraduationCap, Loader2, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

function getPasswordStrength(p: string): { score: number; label: string; color: string } {
  if (!p) return { score: 0, label: "", color: "bg-muted" };
  let score = 0;
  if (p.length >= 8) score += 1;
  if (p.length >= 10 && /[a-z]/.test(p) && /[A-Z]/.test(p)) score += 1;
  if (/\d/.test(p)) score += 1;
  if (/[^a-zA-Z0-9]/.test(p)) score += 1;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500" };
  if (score <= 3) return { score: 2, label: "Medium", color: "bg-amber-500" };
  return { score: 3, label: "Strong", color: "bg-emerald-500" };
}

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const search = useRouterState({ select: (s) => s.location.search }) as { mode?: string };

  const [mode, setMode] = useState<Mode>(search?.mode === "signup" ? "signup" : "signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const passwordsMatch = mode !== "signup" || !confirmPassword || password === confirmPassword;

  useEffect(() => {
    if (!loading && session) void navigate({ to: "/app", replace: true });
  }, [session, loading, navigate]);

  const wrap = (fn: () => Promise<void>) => async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await fn();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
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
      throw error;
    }
    toast.success("Welcome back");
    void navigate({ to: "/app", replace: true });
  });

  const handleSignUp = wrap(async () => {
    if (password.length < 8) throw new Error("Password must be at least 8 characters");
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
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
          redirectTo: `${window.location.origin}/app`,
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator (Signup / Reset Mode) */}
                {(mode === "signup" || mode === "reset") && password.length > 0 && (
                  <div className="mt-2 space-y-1.5 animate-in fade-in-50">
                    <div className="flex h-1.5 w-full gap-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          strength.score >= 1 ? strength.color : "bg-transparent"
                        }`}
                      />
                      <div
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          strength.score >= 2 ? strength.color : "bg-transparent"
                        }`}
                      />
                      <div
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          strength.score >= 3 ? strength.color : "bg-transparent"
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>
                        Strength:{" "}
                        <strong
                          className={
                            strength.score === 1
                              ? "text-red-500 font-semibold"
                              : strength.score === 2
                                ? "text-amber-500 font-semibold"
                                : "text-emerald-500 font-semibold"
                          }
                        >
                          {strength.label}
                        </strong>
                      </span>
                      <span>Min 8 chars, mix cases & numbers</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Confirm Password Field (Signup only) */}
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className={`pr-10 ${
                      confirmPassword && !passwordsMatch ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs font-medium text-destructive animate-in fade-in-50">
                    Passwords do not match.
                  </p>
                )}
                {confirmPassword && passwordsMatch && confirmPassword.length >= 8 && (
                  <p className="flex items-center gap-1 text-xs font-medium text-emerald-500 animate-in fade-in-50">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Passwords match
                  </p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={busy || (mode === "signup" && !passwordsMatch)}>
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
