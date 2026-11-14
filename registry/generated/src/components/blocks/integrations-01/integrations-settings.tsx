"use client";

import {
  ChartLineUpIcon,
  CheckIcon,
  FigmaLogoIcon,
  GithubLogoIcon,
  GoogleLogoIcon,
  KanbanIcon,
  LightningIcon,
  MegaphoneIcon,
  NotionLogoIcon,
  PlugsConnectedIcon,
  PulseIcon,
  SlackLogoIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Alert } from "../../vip-ui/alert";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../vip-ui/empty-state";
import { GridList, GridListItem } from "../../vip-ui/grid-list";
import { SearchField } from "../../vip-ui/search-field";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../vip-ui/sheet";
import { Spinner } from "../../vip-ui/spinner";
import { Tab, TabList, TabPanel, Tabs } from "../../vip-ui/tabs";
import { showToast } from "../../vip-ui/toast";
import { cn } from "../../vip-ui/utils";
import { SettingsShell } from "./settings-shell";

const categories = [
  { id: "all", label: "All" },
  { id: "analytics", label: "Analytics" },
  { id: "communication", label: "Communication" },
  { id: "developer", label: "Developer" },
  { id: "design", label: "Design" },
] as const;

type Category = (typeof categories)[number]["id"];

interface App {
  id: string;
  name: string;
  publisher: string;
  category: Exclude<Category, "all">;
  tagline: string;
  description: string;
  permissions: string[];
  connected: boolean;
  beta?: boolean;
  needsAttention?: boolean;
  connectedBy?: string;
  connectedOn?: string;
  lastSync?: string;
  icon: typeof SlackLogoIcon;
}

const initialApps: App[] = [
  {
    id: "slack",
    name: "Slack",
    publisher: "Salesforce, Inc.",
    category: "communication",
    tagline: "Alerts and mentions",
    description:
      "Send Kestrel alerts to team channels and mention people from a customer record.",
    permissions: [
      "Post messages to selected channels",
      "Read channel names and members",
    ],
    connected: true,
    connectedBy: "Nadia Okafor",
    connectedOn: "Sep 18, 2026",
    lastSync: "2 min ago",
    icon: SlackLogoIcon,
  },
  {
    id: "github",
    name: "GitHub",
    publisher: "GitHub, Inc.",
    category: "developer",
    tagline: "Deploys and pull requests",
    description:
      "Link deploys and pull requests to the release that includes them.",
    permissions: ["Read repositories and deployments", "Write commit statuses"],
    connected: true,
    connectedBy: "Leo Park",
    connectedOn: "Aug 4, 2026",
    lastSync: "12 min ago",
    icon: GithubLogoIcon,
  },
  {
    id: "figma",
    name: "Figma",
    publisher: "Figma, Inc.",
    category: "design",
    tagline: "Design previews",
    description: "Show live design previews and open a frame in Figma.",
    permissions: ["Read file names and previews", "Read comments"],
    connected: true,
    needsAttention: true,
    connectedBy: "Nadia Okafor",
    connectedOn: "Oct 9, 2026",
    lastSync: "Paused",
    icon: FigmaLogoIcon,
  },
  {
    id: "notion",
    name: "Notion",
    publisher: "Notion Labs, Inc.",
    category: "communication",
    tagline: "Shared reports",
    description: "Publish weekly reports to a Notion database.",
    permissions: ["Read selected pages", "Create pages in one database"],
    connected: true,
    connectedBy: "Ana Souza",
    connectedOn: "Sep 30, 2026",
    lastSync: "1 h ago",
    icon: NotionLogoIcon,
  },
  {
    id: "segment",
    name: "Segment",
    publisher: "Twilio, Inc.",
    category: "analytics",
    tagline: "Product events",
    description: "Send product events to Kestrel and map them to metrics.",
    permissions: ["Read event sources", "Write destination settings"],
    connected: true,
    connectedBy: "Nadia Okafor",
    connectedOn: "Oct 2, 2026",
    lastSync: "4 min ago",
    icon: ChartLineUpIcon,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    publisher: "HubSpot, Inc.",
    category: "analytics",
    tagline: "Companies and deals",
    description: "Sync companies and deal stages with Kestrel accounts.",
    permissions: ["Read contacts and companies", "Read deal stages"],
    connected: false,
    icon: MegaphoneIcon,
  },
  {
    id: "datadog",
    name: "Datadog",
    publisher: "Datadog, Inc.",
    category: "analytics",
    tagline: "Usage metrics",
    description: "Send Kestrel usage metrics to Datadog.",
    permissions: ["Write metrics", "Read monitors"],
    connected: true,
    connectedBy: "Leo Park",
    connectedOn: "Sep 12, 2026",
    lastSync: "6 min ago",
    icon: PulseIcon,
  },
  {
    id: "zapier",
    name: "Zapier",
    publisher: "Zapier, Inc.",
    category: "developer",
    tagline: "Task automation",
    description: "Start a task when a customer record changes.",
    permissions: ["Read and write selected records"],
    connected: true,
    beta: true,
    connectedBy: "Kwame Mensah",
    connectedOn: "Oct 21, 2026",
    lastSync: "18 min ago",
    icon: LightningIcon,
  },
  {
    id: "linear",
    name: "Linear",
    publisher: "Linear Orbit, Inc.",
    category: "developer",
    tagline: "Issue sync",
    description:
      "Create Linear issues from feedback and keep the status in sync.",
    permissions: ["Read teams", "Create issues"],
    connected: false,
    beta: true,
    icon: KanbanIcon,
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    publisher: "Google LLC",
    category: "analytics",
    tagline: "Site traffic",
    description: "Compare Kestrel use with site traffic and campaigns.",
    permissions: ["Read property reports"],
    connected: false,
    icon: GoogleLogoIcon,
  },
];

function categoryLabel(category: App["category"]) {
  return categories.find((item) => item.id === category)?.label ?? category;
}

export function IntegrationsSettings() {
  const [apps, setApps] = useState(initialApps);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [figmaAlert, setFigmaAlert] = useState(true);
  const [sheetId, setSheetId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const shown = apps.filter((app) => {
    if (category !== "all" && app.category !== category) return false;
    if (terms.length === 0) return true;
    const text = [app.name, app.tagline, app.description, app.publisher]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => text.includes(term));
  });
  const sheetApp = apps.find((app) => app.id === sheetId) ?? null;

  function connect(id: string) {
    const app = apps.find((item) => item.id === id);
    setConnecting(id);
    window.setTimeout(() => {
      setConnecting(null);
      setApps((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                connected: true,
                needsAttention: false,
                connectedBy: "Nadia Okafor",
                connectedOn: "Nov 3, 2026",
                lastSync: "just now",
              }
            : item,
        ),
      );
      if (app) {
        showToast({
          title: `${app.name} is connected`,
          description: "The first sync starts in a few seconds.",
          variant: "success",
        });
      }
    }, 900);
  }

  function disconnect(id: string) {
    const app = apps.find((item) => item.id === id);
    const snapshot = apps;
    setApps((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, connected: false, needsAttention: false }
          : item,
      ),
    );
    if (id === "figma") setFigmaAlert(false);
    setSheetOpen(false);
    if (app) {
      showToast({
        title: `${app.name} is disconnected`,
        description: "Kestrel no longer shares data with this app.",
        action: { label: "Undo", onAction: () => setApps(snapshot) },
      });
    }
  }

  function reconnect(id: string) {
    const app = apps.find((item) => item.id === id);
    setApps((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              connected: true,
              needsAttention: false,
              lastSync: "Just now",
            }
          : item,
      ),
    );
    setFigmaAlert(false);
    showToast({
      title: `${app?.name ?? "The app"} is reconnected`,
      description: "Sync starts again in a few seconds.",
      variant: "success",
    });
    if (!sheetOpen) {
      requestAnimationFrame(() =>
        searchRef.current?.querySelector("input")?.focus(),
      );
    }
  }

  function clearSearch() {
    setQuery("");
    requestAnimationFrame(() =>
      searchRef.current?.querySelector("input")?.focus(),
    );
  }

  return (
    <SettingsShell
      current="integrations"
      title="Connected apps"
      description="Connect Kestrel to the tools your team uses."
    >
      <div className="grid gap-5">
        <h2 className="sr-only">App directory</h2>
        {figmaAlert && (
          <Alert
            variant="warning"
            title="Figma needs a new sign-in"
            onDismiss={() => {
              setFigmaAlert(false);
              requestAnimationFrame(() =>
                searchRef.current?.querySelector("input")?.focus(),
              );
            }}
            action={
              <Button
                size="sm"
                variant="outline"
                onPress={() => reconnect("figma")}
              >
                Reconnect
              </Button>
            }
          >
            The access token ended on Oct 30, 2026. Design previews are paused.
          </Alert>
        )}

        <div className="grid gap-4">
          <Tabs
            selectedKey={category}
            onSelectionChange={(key) => setCategory(key as Category)}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <TabList aria-label="App category">
                {categories.map((item) => (
                  <Tab key={item.id} id={item.id} className="px-3">
                    {item.label}
                  </Tab>
                ))}
              </TabList>
              <div
                ref={searchRef}
                className="w-full md:w-44 md:shrink-0 xl:w-60"
              >
                <SearchField
                  size="sm"
                  label="Search"
                  placeholder="Search apps"
                  value={query}
                  onChange={setQuery}
                />
              </div>
            </div>
            <TabPanel
              id={category}
              className="mt-4 rounded-none bg-transparent p-0 shadow-none ring-0"
            >
              {shown.length === 0 ? (
                <EmptyState className="bg-card py-12">
                  <EmptyStateIcon>
                    <PlugsConnectedIcon aria-hidden="true" />
                  </EmptyStateIcon>
                  <EmptyStateTitle as="h2">
                    No apps match your search
                  </EmptyStateTitle>
                  <EmptyStateDescription>
                    Try a different name or show all categories.
                  </EmptyStateDescription>
                  <EmptyStateActions>
                    <Button variant="outline" size="sm" onPress={clearSearch}>
                      Clear search
                    </Button>
                  </EmptyStateActions>
                </EmptyState>
              ) : (
                <GridList
                  aria-label="Apps"
                  className="grid gap-3 border-0 bg-transparent p-0 shadow-none sm:grid-cols-2"
                >
                  {shown.map((app) => (
                    <GridListItem
                      key={app.id}
                      id={app.id}
                      textValue={app.name}
                      className="flex-col items-stretch gap-0 rounded-xl border border-border bg-card p-4 shadow-(--shadow-card)"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground ring-1 ring-border/60"
                        >
                          <app.icon size={20} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1">
                            <p className="truncate text-[15px] font-semibold">
                              {app.name}
                            </p>
                            {app.beta && <Badge variant="accent">Beta</Badge>}
                            {app.needsAttention && (
                              <Badge variant="warning">Sign in</Badge>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {app.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex min-h-9 items-center justify-between gap-3 border-t border-border/60 pt-3">
                        <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                          {app.connected && (
                            <span
                              aria-hidden="true"
                              className={cn(
                                "size-1.5 shrink-0 rounded-full",
                                app.needsAttention
                                  ? "bg-warning"
                                  : "bg-success",
                              )}
                            />
                          )}
                          <span className="truncate">
                            {app.needsAttention
                              ? "Sync is paused"
                              : app.connected
                                ? `Synced ${app.lastSync}`
                                : app.publisher}
                          </span>
                        </span>
                        <div className="flex shrink-0 gap-1.5">
                          {app.connected && (
                            <Button
                              variant="ghost"
                              size="sm"
                              aria-label={`Manage ${app.name}`}
                              onPress={() => {
                                setSheetId(app.id);
                                setSheetOpen(true);
                              }}
                            >
                              Manage
                            </Button>
                          )}
                          {app.needsAttention ? (
                            <Button
                              variant="outline"
                              size="sm"
                              aria-label={`Reconnect ${app.name}`}
                              onPress={() => reconnect(app.id)}
                            >
                              Reconnect
                            </Button>
                          ) : (
                            !app.connected && (
                              <Button
                                variant="outline"
                                size="sm"
                                aria-label={`Connect ${app.name}`}
                                isDisabled={connecting === app.id}
                                onPress={() => connect(app.id)}
                              >
                                {connecting === app.id && (
                                  <Spinner size="sm" decorative />
                                )}
                                Connect
                              </Button>
                            )
                          )}
                        </div>
                      </div>
                    </GridListItem>
                  ))}
                </GridList>
              )}
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <Sheet
        isOpen={sheetOpen}
        onOpenChange={setSheetOpen}
        position="right"
        size="md"
      >
        {sheetApp && (
          <>
            <SheetHeader>
              <div className="flex min-w-0 items-start gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground ring-1 ring-border/60"
                >
                  <sheetApp.icon size={20} />
                </span>
                <div className="min-w-0">
                  <SheetTitle level={2}>{sheetApp.name}</SheetTitle>
                  <p className="text-sm text-muted-foreground">
                    {sheetApp.publisher}
                  </p>
                </div>
              </div>
              <SheetClose />
            </SheetHeader>
            <SheetBody className="grid content-start gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">
                  {categoryLabel(sheetApp.category)}
                </Badge>
                <Badge
                  variant={sheetApp.connected ? "success" : "neutral"}
                  dot={sheetApp.connected}
                >
                  {sheetApp.connected ? "Connected" : "Not connected"}
                </Badge>
                {sheetApp.beta && <Badge variant="accent">Beta</Badge>}
              </div>
              <SheetDescription>{sheetApp.description}</SheetDescription>
              {sheetApp.needsAttention && (
                <Alert
                  variant="warning"
                  title="Sign in again"
                  action={
                    <Button
                      size="sm"
                      variant="outline"
                      onPress={() => reconnect(sheetApp.id)}
                    >
                      Reconnect
                    </Button>
                  }
                >
                  The Figma token ended on Oct 30, 2026.
                </Alert>
              )}
              <div>
                <h3 className="text-sm font-semibold">Permissions</h3>
                <ul className="mt-2 grid gap-2">
                  {sheetApp.permissions.map((permission) => (
                    <li
                      key={permission}
                      className="flex min-w-0 items-start gap-2 text-sm"
                    >
                      <CheckIcon
                        size={16}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-success"
                      />
                      <span className="min-w-0">{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <DescriptionList>
                <DescriptionTerm>Last sync</DescriptionTerm>
                <DescriptionDetail>
                  {sheetApp.connected ? sheetApp.lastSync : "Never"}
                </DescriptionDetail>
                {sheetApp.connected && sheetApp.connectedBy && (
                  <>
                    <DescriptionTerm>Connected by</DescriptionTerm>
                    <DescriptionDetail>
                      {sheetApp.connectedBy}
                    </DescriptionDetail>
                    <DescriptionTerm>Connected on</DescriptionTerm>
                    <DescriptionDetail>
                      {sheetApp.connectedOn}
                    </DescriptionDetail>
                  </>
                )}
              </DescriptionList>
            </SheetBody>
            <SheetFooter>
              {sheetApp.connected && (
                <Button
                  variant="outline"
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 pressed:bg-destructive/10 sm:me-auto"
                  onPress={() => disconnect(sheetApp.id)}
                >
                  Disconnect
                </Button>
              )}
              <SheetClose variant="default">Done</SheetClose>
            </SheetFooter>
          </>
        )}
      </Sheet>
    </SettingsShell>
  );
}
