import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader } from "@/components/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" subtitle="Tune AceHub to fit the way you study." />

      <section className="card-soft p-6">
        <h2 className="text-base font-semibold">Profile</h2>
        <div className="mt-5 flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
              AO
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            Change photo
          </Button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" defaultValue="Ada Okoye" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="ada@university.edu" />
          </div>
        </div>
      </section>

      <section className="card-soft mt-6 p-6">
        <h2 className="text-base font-semibold">Study preferences</h2>
        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Daily study goal (minutes)</Label>
            <Input id="goal" type="number" defaultValue={60} className="max-w-40" />
          </div>
          {[
            ["Daily streak reminder", "A nudge at 7pm if you haven't studied."],
            ["Flashcard due alerts", "Tell me when reviews pile up."],
            ["Study group activity", "New messages and shared notes."],
          ].map(([title, body], i) => (
            <div key={title} className="flex items-center justify-between gap-4 border-t border-border pt-4">
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{body}</p>
              </div>
              <Switch defaultChecked={i !== 2} />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6">
        <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
      </div>
    </div>
  );
}
