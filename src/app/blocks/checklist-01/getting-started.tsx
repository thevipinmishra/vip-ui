"use client";

import {
  CalendarCheckIcon,
  CheckCircleIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  FolderPlusIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/ui/disclosure";
import { Link } from "@/components/ui/link";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Spinner } from "@/components/ui/spinner";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";
import {
  TextField,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const WORKSPACE_KEY = "fieldnote.setup.v1";

interface WorkspaceSetup {
  name: string;
  slug: string;
  color: string;
  colorName: string;
  invites: string[];
  topics: string[];
}

const fallbackWorkspace: WorkspaceSetup = {
  name: "Marlow Research",
  slug: "marlow-research",
  color: "#1f7a66",
  colorName: "Teal",
  invites: [],
  topics: ["discovery", "design"],
};

const topicNames: Record<string, string> = {
  discovery: "Product discovery",
  design: "Design research",
  support: "Customer support",
  marketing: "Marketing",
};

const taskIds = [
  "workspace",
  "invite",
  "profile",
  "project",
  "calendar",
  "import",
] as const;

type TaskId = (typeof taskIds)[number];

const tasks: readonly {
  id: TaskId;
  title: string;
  summary: string;
  detail: string;
}[] = [
  {
    id: "workspace",
    title: "Set up your workspace",
    summary: "Name and address",
    detail: "The workspace is live. Change these details at any time.",
  },
  {
    id: "invite",
    title: "Invite your team",
    summary: "Send join links",
    detail: "Each person gets a join link. Invites expire in 7 days.",
  },
  {
    id: "profile",
    title: "Complete your profile",
    summary: "Set your display name",
    detail: "Your name shows on notes, comments, and invites.",
  },
  {
    id: "project",
    title: "Create your first project",
    summary: "Start one research study",
    detail: "A project holds notes and clips for one study.",
  },
  {
    id: "calendar",
    title: "Connect your calendar",
    summary: "See interviews with your meetings",
    detail: "Interviews show on your home view.",
  },
  {
    id: "import",
    title: "Import your notes",
    summary: "Use a CSV or sample notes",
    detail: "Imported notes go into your first project.",
  },
];

const sampleInvites = ["ana@lumen.co", "leo@northwind.com", "priya@arc.studio"];

const sampleProjects = [
  "Customer interview study",
  "Onboarding usability test",
  "Pricing feedback review",
];

const initialDone: Record<TaskId, boolean> = {
  workspace: true,
  invite: false,
  profile: false,
  project: false,
  calendar: false,
  import: false,
};

export function GettingStarted() {
  const [workspace, setWorkspace] = useState<WorkspaceSetup>(fallbackWorkspace);
  const [done, setDone] = useState<Record<TaskId, boolean>>(initialDone);
  const [profileName, setProfileName] = useState("Maya Chen");
  const [profileDraft, setProfileDraft] = useState("Maya Chen");
  const [profileError, setProfileError] = useState("");
  const [projects, setProjects] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORKSPACE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<WorkspaceSetup>;
      const next: WorkspaceSetup = {
        name:
          typeof saved.name === "string" && saved.name.trim()
            ? saved.name
            : fallbackWorkspace.name,
        slug:
          typeof saved.slug === "string" && saved.slug
            ? saved.slug
            : fallbackWorkspace.slug,
        color:
          typeof saved.color === "string"
            ? saved.color
            : fallbackWorkspace.color,
        colorName:
          typeof saved.colorName === "string"
            ? saved.colorName
            : fallbackWorkspace.colorName,
        invites: Array.isArray(saved.invites)
          ? saved.invites.filter(
              (email): email is string => typeof email === "string",
            )
          : [],
        topics: Array.isArray(saved.topics)
          ? saved.topics.filter(
              (topic): topic is string => typeof topic === "string",
            )
          : fallbackWorkspace.topics,
      };
      setWorkspace(next);
      if (next.invites.length > 0) {
        setDone((current) =>
          current.invite ? current : { ...current, invite: true },
        );
      }
    } catch {}
  }, []);

  const completed = tasks.filter((task) => done[task.id]).length;
  const percent = Math.round((completed / tasks.length) * 100);
  const initial = workspace.name.trim().charAt(0).toLocaleUpperCase() || "F";
  const focusAreas = workspace.topics
    .map((topic) => topicNames[topic])
    .filter(Boolean);

  function completeTask(id: TaskId, checked: boolean) {
    const task = tasks.find((item) => item.id === id);
    setDone((current) => ({ ...current, [id]: checked }));
    if (!task) return;
    showToast({
      title: checked ? "Task is done" : "Task is open again",
      description: task.title,
      variant: checked ? "success" : "info",
    });
  }

  function inviteTeam() {
    const next = [...new Set([...workspace.invites, ...sampleInvites])];
    setWorkspace((current) => ({ ...current, invites: next }));
    setDone((current) => ({ ...current, invite: true }));
    showToast({
      title: `We sent ${sampleInvites.length} invites`,
      description: "The invites expire in 7 days.",
      variant: "success",
    });
  }

  function resendInvites() {
    showToast({
      title: `We sent ${workspace.invites.length} invites again`,
      description: "Only the newest invite links work.",
    });
  }

  function saveProfile() {
    const value = profileDraft.trim();
    if (value.length < 2) {
      setProfileError("Enter a name with 2 or more characters.");
      return;
    }
    setProfileName(value);
    setProfileError("");
    setDone((current) => ({ ...current, profile: true }));
    showToast({ title: `Your name is now ${value}`, variant: "success" });
  }

  function createProject() {
    const name =
      sampleProjects[projects.length] ??
      `Research project ${projects.length + 1}`;
    setProjects((current) => [...current, name]);
    setDone((current) => ({ ...current, project: true }));
    showToast({
      title: `${name} is ready`,
      description: "Open the project to add your first note.",
      variant: "success",
    });
  }

  function toggleCalendar() {
    const next = !connected;
    setConnected(next);
    setDone((current) => ({ ...current, calendar: next }));
    showToast({
      title: next
        ? "Google Calendar is connected"
        : "Google Calendar is disconnected",
      description: next
        ? "Scheduled interviews now show on your home view."
        : "Meetings no longer show in Fieldnote.",
      variant: next ? "success" : "info",
    });
  }

  function importNotes() {
    setImporting(true);
    const amount = imported === 0 ? 12 : 5;
    window.setTimeout(() => {
      setImporting(false);
      setImported((current) => current + amount);
      setDone((current) => ({ ...current, import: true }));
      showToast({
        title: `${amount} notes imported`,
        description: "The notes are in your first project.",
        variant: "success",
      });
    }, 900);
  }

  function resetProgress() {
    setDone({ ...initialDone, invite: workspace.invites.length > 0 });
    setProjects([]);
    setConnected(false);
    setImported(0);
    setProfileName("Maya Chen");
    setProfileDraft("Maya Chen");
    setProfileError("");
    showToast({ title: "Checklist reset" });
  }

  function renderPanel(id: TaskId) {
    if (id === "workspace") {
      return (
        <div className="grid gap-3">
          <p>{tasks[0].detail}</p>
          <dl className="grid gap-3 rounded-lg border border-border/70 bg-card p-3 text-xs sm:grid-cols-2">
            <div className="min-w-0">
              <dt className="text-muted-foreground">Address</dt>
              <dd className="mt-0.5 truncate font-medium text-foreground">
                fieldnote.app/{workspace.slug}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-muted-foreground">Accent</dt>
              <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-foreground">
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full ring-1 ring-foreground/20"
                  style={{ backgroundColor: workspace.color }}
                />
                {workspace.colorName}
              </dd>
            </div>
            <div className="min-w-0 sm:col-span-2">
              <dt className="text-muted-foreground">Focus</dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {focusAreas.length > 0
                  ? focusAreas.join(", ")
                  : "No topics selected"}
              </dd>
            </div>
          </dl>
          <ButtonLink
            href="/blocks/onboarding-01"
            variant="outline"
            size="sm"
            className="w-fit"
          >
            Edit setup
          </ButtonLink>
        </div>
      );
    }

    if (id === "invite") {
      return (
        <div className="grid gap-3">
          <p>{tasks[1].detail}</p>
          {workspace.invites.length === 0 ? (
            <Button variant="outline" size="sm" onPress={inviteTeam}>
              <PaperPlaneTiltIcon size={16} aria-hidden="true" />
              Invite three teammates
            </Button>
          ) : (
            <>
              <ul className="grid gap-2">
                {workspace.invites.map((email) => (
                  <li
                    key={email}
                    className="flex min-w-0 flex-wrap items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-xs"
                  >
                    <EnvelopeSimpleIcon
                      size={15}
                      className="shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                      {email}
                    </span>
                    <Badge variant="warning" className="min-h-5 py-0">
                      Invited
                    </Badge>
                  </li>
                ))}
              </ul>
              <Button
                variant="ghost"
                size="sm"
                className="w-fit"
                onPress={resendInvites}
              >
                Send invites again
              </Button>
            </>
          )}
        </div>
      );
    }

    if (id === "profile") {
      return (
        <div className="grid gap-3">
          <p>{tasks[2].detail}</p>
          <TextField
            value={profileDraft}
            onChange={(value) => {
              setProfileDraft(value);
              setProfileError("");
            }}
            isInvalid={Boolean(profileError)}
          >
            <TextFieldLabel>Display name</TextFieldLabel>
            <TextFieldInput autoComplete="name" placeholder="Maya Chen" />
            <TextFieldDescription
              className={cn(profileError && "text-destructive")}
            >
              {profileError || "Use 2 or more characters."}
            </TextFieldDescription>
          </TextField>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onPress={saveProfile}>
              Save name
            </Button>
            {done.profile && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
                <CheckCircleIcon size={15} weight="fill" aria-hidden="true" />
                Saved as {profileName}
              </span>
            )}
          </div>
        </div>
      );
    }

    if (id === "project") {
      return (
        <div className="grid gap-3">
          <p>{tasks[3].detail}</p>
          {projects.length > 0 && (
            <ul className="grid gap-2">
              {projects.map((project) => (
                <li
                  key={project}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-lg border border-border/70 bg-card px-3 py-2 text-xs"
                >
                  <span className="truncate font-medium text-foreground">
                    {project}
                  </span>
                  <Badge variant="neutral" className="min-h-5 py-0">
                    Draft
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          <Button
            variant="outline"
            size="sm"
            className="w-fit"
            onPress={createProject}
          >
            <FolderPlusIcon size={16} aria-hidden="true" />
            {projects.length === 0
              ? "Create sample project"
              : "Create another project"}
          </Button>
        </div>
      );
    }

    if (id === "calendar") {
      return (
        <div className="grid gap-3">
          <p>{tasks[4].detail}</p>
          <p className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground">
            {connected
              ? "Google Calendar is connected."
              : "No calendar is connected."}
            {connected && (
              <Badge variant="success" className="min-h-5 py-0">
                Connected
              </Badge>
            )}
          </p>
          <Button
            variant={connected ? "outline" : "default"}
            size="sm"
            className="w-fit"
            onPress={toggleCalendar}
          >
            <CalendarCheckIcon size={16} aria-hidden="true" />
            {connected ? "Disconnect calendar" : "Connect Google Calendar"}
          </Button>
        </div>
      );
    }

    return (
      <div className="grid gap-3">
        <p>{tasks[5].detail}</p>
        {imported > 0 && (
          <p className="text-xs font-medium text-foreground">
            {imported} notes are in Customer interview study.
          </p>
        )}
        <Button
          variant="outline"
          size="sm"
          className="w-fit"
          isPending={importing}
          isDisabled={importing}
          onPress={importNotes}
        >
          {importing ? (
            <Spinner size="sm" decorative />
          ) : (
            <DownloadSimpleIcon size={16} aria-hidden="true" />
          )}
          {importing
            ? "Importing…"
            : imported > 0
              ? "Import 5 more notes"
              : "Import 12 sample notes"}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card/70">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-3 lg:px-8">
          <a
            href="/blocks"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-md outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground"
            >
              F
            </span>
            <span className="hidden text-sm font-semibold tracking-[-0.02em] sm:inline">
              Fieldnote
            </span>
          </a>
          <span aria-hidden="true" className="text-border">
            /
          </span>
          <div className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden="true"
              className="grid size-6 shrink-0 place-items-center rounded-md text-[10px] font-semibold text-white"
              style={{ backgroundColor: workspace.color }}
            >
              {initial}
            </span>
            <span className="truncate text-sm font-medium">
              {workspace.name}
            </span>
          </div>
          <div className="ms-auto flex shrink-0 items-center gap-2">
            <ButtonLink
              href="/blocks/onboarding-01"
              variant="outline"
              size="sm"
              className="max-sm:hidden"
            >
              Edit setup
            </ButtonLink>
            <Link
              href="mailto:support@fieldnote.app"
              className="hidden text-sm text-muted-foreground no-underline hover:text-foreground sm:inline"
            >
              Help
            </Link>
            <Avatar name={profileName} size="sm" />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-10 lg:px-8 lg:py-10">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-[-0.045em]">
            Get started with{" "}
            <span className="[overflow-wrap:anywhere]">{workspace.name}</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            About 15 minutes.
          </p>

          {percent === 100 && (
            <Alert
              variant="success"
              title="All tasks are done"
              className="mt-5"
              role="status"
            >
              Open a project to add your first note.
            </Alert>
          )}

          <h2 className="sr-only">Setup tasks</h2>
          <StaggerGroup
            as="ol"
            trigger="mount"
            stagger={0.06}
            className="mt-6 grid min-w-0 gap-2.5"
            aria-label="Setup tasks"
          >
            {tasks.map((task, index) => (
              <StaggerItem as="li" key={task.id} className="min-w-0">
                <Disclosure
                  defaultExpanded={index === 0}
                  className={cn(done[task.id] && "bg-muted/30")}
                >
                  <div className="flex items-center rounded-lg outline-transparent transition-[background-color,outline-color] duration-150 ease-out-quint has-[[data-slot=disclosure-header][data-hovered]]:bg-muted has-[[data-slot=disclosure-header][aria-expanded=true]]:rounded-b-none has-[[data-slot=disclosure-header][data-focus-visible]]:outline-2 has-[[data-slot=disclosure-header][data-focus-visible]]:-outline-offset-2 has-[[data-slot=disclosure-header][data-focus-visible]]:outline-ring">
                    <div className="flex shrink-0 ps-4">
                      <Checkbox
                        checked={done[task.id]}
                        onCheckedChange={(checked) =>
                          completeTask(task.id, checked)
                        }
                        aria-label={`Mark ${task.title} as done`}
                      />
                    </div>
                    <DisclosureHeader className="ps-3 hover:bg-transparent focus-visible:outline-transparent">
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span
                          className={cn(
                            "text-sm font-semibold [overflow-wrap:anywhere]",
                            done[task.id] && "text-muted-foreground",
                          )}
                        >
                          {task.title}
                        </span>
                        <span className="text-xs font-normal text-muted-foreground">
                          {task.summary}
                        </span>
                      </span>
                    </DisclosureHeader>
                  </div>
                  <DisclosurePanel>
                    <div className="ps-8">{renderPanel(task.id)}</div>
                  </DisclosurePanel>
                </Disclosure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-8">
          <Card className="grid justify-items-center gap-4 p-5">
            <ProgressRing
              label={`${completed} of ${tasks.length} tasks done`}
              value={percent}
              size="lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onPress={resetProgress}
            >
              Reset progress
            </Button>
          </Card>

          <Card className="grid gap-3 p-5">
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-lg text-xs font-semibold text-white"
                style={{ backgroundColor: workspace.color }}
              >
                {initial}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {workspace.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  fieldnote.app/{workspace.slug}
                </p>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-3 border-t border-border/70 pt-3 text-xs">
              <div>
                <dt className="text-muted-foreground">Members</dt>
                <dd className="mt-0.5 font-medium">1</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Invites</dt>
                <dd className="mt-0.5 font-medium">
                  {workspace.invites.length}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Projects</dt>
                <dd className="mt-0.5 font-medium">{projects.length}</dd>
              </div>
            </dl>
          </Card>

          <Card className="grid gap-2 p-5">
            <h2 className="text-sm font-semibold">Need a hand?</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Ask support about invites, imports, or roles.
            </p>
            <Link href="mailto:support@fieldnote.app" className="w-fit text-sm">
              support@fieldnote.app
            </Link>
          </Card>
        </aside>
      </main>
    </div>
  );
}
