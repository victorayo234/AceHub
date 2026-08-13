import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { initials, useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AceHub" },
      { name: "description", content: "Manage your profile, daily study goal and notifications." },
      { property: "og:title", content: "Settings — AceHub" },
      { property: "og:description", content: "Profile, study goal and notification preferences." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const { user, profile, avatarSrc, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [goal, setGoal] = useState(60);
  const [prefs, setPrefs] = useState({ streak: true, flashcards: true, groups: false });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name ?? "");
    setGoal(profile.daily_goal_minutes ?? 60);
    setPrefs({
      streak: profile.notify_streak,
      flashcards: profile.notify_flashcards,
      groups: profile.notify_groups,
    });
  }, [profile]);

  const handleUpload = async (file: File) => {
    if (!user) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (uploadError) throw uploadError;

      const { error } = await supabase.from("profiles").update({ avatar_url: path }).eq("id", user.id);
      if (error) throw error;

      await refreshProfile();
      toast.success("Profile photo updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          daily_goal_minutes: Number(goal) || 60,
          notify_streak: prefs.streak,
          notify_flashcards: prefs.flashcards,
          notify_groups: prefs.groups,
        })
        .eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    void navigate({ to: "/auth", replace: true, search: { mode: undefined } });
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" subtitle="Tune AceHub to fit the way you study." />

      <section className="card-soft p-6">
        <h2 className="text-base font-semibold">Profile</h2>
        <div className="mt-5 flex items-center gap-4">
          <Avatar className="h-14 w-14">
            {avatarSrc ? <AvatarImage src={avatarSrc} alt={fullName || "Profile photo"} /> : null}
            <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
              {initials(profile?.full_name, user?.email)}
            </AvatarFallback>
          </Avatar>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
              e.target.value = "";
            }}
          />
          <Button variant="outline" size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {uploading ? "Uploading" : "Change photo"}
          </Button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user?.email ?? ""} disabled />
          </div>
        </div>
      </section>

      <section className="card-soft mt-6 p-6">
        <h2 className="text-base font-semibold">Study preferences</h2>
        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Daily study goal (minutes)</Label>
            <Input
              id="goal"
              type="number"
              min={5}
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="max-w-40"
            />
          </div>
          {(
            [
              ["streak", "Daily streak reminder", "A nudge at 7pm if you haven't studied."],
              ["flashcards", "Flashcard due alerts", "Tell me when reviews pile up."],
              ["groups", "Study group activity", "New messages and shared notes."],
            ] as const
          ).map(([key, title, body]) => (
            <div key={key} className="flex items-center justify-between gap-4 border-t border-border pt-4">
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{body}</p>
              </div>
              <Switch
                checked={prefs[key]}
                onCheckedChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="card-soft mt-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-base font-semibold">Department & courses</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Change your department, level or the nine courses on your dashboard.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/onboarding">Edit course selection</Link>
        </Button>
      </section>

      <section className="card-soft mt-6 flex flex-wrap items-center justify-between gap-4 p-6">

        <div>
          <h2 className="text-base font-semibold">Account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign out of AceHub on this device.</p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" /> Log out
        </Button>
      </section>

      <div className="mt-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save changes
        </Button>
      </div>
    </div>
  );
}
