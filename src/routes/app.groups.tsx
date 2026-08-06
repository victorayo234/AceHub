import { createFileRoute } from "@tanstack/react-router";
import { Plus, Send, Target, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { chat, groups, notes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/groups")({
  head: () => ({
    meta: [
      { title: "Study Groups — AceHub" },
      { name: "description", content: "Shared notes, group goals and a discussion feed for your study crew." },
      { property: "og:title", content: "Study Groups — AceHub" },
      { property: "og:description", content: "Revise together with shared notes, goals and chat." },
    ],
  }),
  component: Groups,
});

function GroupDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" /> New group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create or join a group</DialogTitle>
          <DialogDescription>Share notes, decks and goals with classmates.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group name</Label>
            <Input id="group-name" placeholder="e.g. CHEM 101 Study Squad" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite">Or join with an invite code</Label>
            <Input id="invite" placeholder="ABC-1234" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              toast.success("Group created — invite code copied");
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Groups() {
  const [activeId, setActiveId] = useState(groups[0]!.id);
  const active = groups.find((g) => g.id === activeId)!;
  const [messages, setMessages] = useState(chat);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { id: m.length + 1, name: "You", initials: "YO", time: "now", text: draft.trim() },
    ]);
    setDraft("");
  };

  return (
    <div>
      <PageHeader
        title="Study Groups"
        subtitle="Three spaces you belong to."
        action={<GroupDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveId(g.id)}
            className={cn(
              "card-soft card-hover p-5 text-left",
              g.id === activeId && "ring-2 ring-ring",
            )}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground">
              <Users className="h-4 w-4" />
            </span>
            <h3 className="mt-3 text-base font-semibold">{g.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {g.members} members · {g.notes} shared notes
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="card-soft flex flex-col p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">{active.name}</h2>
            <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs">
              {active.code}
            </span>
          </div>

          <div className="mt-5 flex-1 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-[11px] font-semibold">
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{m.name}</span> · {m.time}
                  </p>
                  <p className="mt-1 rounded-xl rounded-tl-sm bg-secondary/70 px-3.5 py-2.5 text-sm leading-relaxed">
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Message the group…"
            />
            <Button size="icon" onClick={send}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="card-soft p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Target className="h-4 w-4 text-primary" /> Shared goal
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{active.goal}</p>
          </div>
          <div className="card-soft p-6">
            <h3 className="text-sm font-semibold">Shared notes</h3>
            <ul className="mt-3 space-y-2.5">
              {notes.slice(0, 4).map((n) => (
                <li key={n.id} className="truncate text-sm text-muted-foreground">
                  {n.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
