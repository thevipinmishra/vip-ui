"use client";

import {
  ArrowClockwiseIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChartLineUpIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleNotchIcon,
  ClockIcon,
  CopyIcon,
  CubeIcon,
  GearIcon,
  GitBranchIcon,
  GlobeIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  SquaresFourIcon,
  TerminalWindowIcon,
  WarningCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { ButtonLink } from "../../vip-ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../vip-ui/empty-state";
import { ProgressBar } from "../../vip-ui/progress-bar";
import { SearchField } from "../../vip-ui/search-field";
import { Select } from "../../vip-ui/select";
import { Switch } from "../../vip-ui/switch";
import { TextField } from "../../vip-ui/text-field";
import { showToast } from "../../vip-ui/toast";
import { ToggleButton } from "../../vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../vip-ui/toggle-button-group";
import { cn } from "../../vip-ui/utils";
import {
  buildStepsFor,
  checksFor,
  type Deployment,
  type DeploymentStatus,
  domains,
  environmentOptions,
  environmentVariables,
  deployments as initialDeployments,
  logsFor,
  navItems,
  project,
  statusLabel,
  statusOptions,
  usage,
} from "./data";

const navIcons = {
  grid: SquaresFourIcon,
  rocket: RocketLaunchIcon,
  terminal: TerminalWindowIcon,
  chart: ChartLineUpIcon,
  gear: GearIcon,
} as const;

const logTone = {
  muted: "text-white/55",
  default: "text-white/85",
  success: "text-emerald-400",
  warning: "text-amber-300",
  error: "text-rose-400",
} as const;

const checkMarks = {
  passed: "complete",
  failed: "failed",
  running: "active",
  pending: "pending",
} as const;

const environmentBadge = {
  production: "success",
  preview: "accent",
  development: "neutral",
} as const;

const statusBadge = {
  ready: "success",
  building: "warning",
  error: "error",
  queued: "neutral",
} as const;

type ProjectDialog =
  | { kind: "settings" | "usage" | "workspace" }
  | { kind: "deploy"; deployment: Deployment };

const initialConfiguration = {
  buildCommand: project.buildCommand,
  outputDirectory: project.outputDirectory,
  autoDeploy: true,
};

const deploymentDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function DeploymentsPage() {
  const [items, setItems] = useState(initialDeployments);
  const [selectedId, setSelectedId] = useState(initialDeployments[0].id);
  const [environment, setEnvironment] = useState<
    "all" | Deployment["environment"]
  >("all");
  const [status, setStatus] = useState<"all" | DeploymentStatus>("all");
  const [query, setQuery] = useState("");
  const [logOpen, setLogOpen] = useState(false);
  const [buildingId, setBuildingId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [dialog, setDialog] = useState<ProjectDialog | null>(null);
  const [configuration, setConfiguration] = useState(initialConfiguration);
  const detailHeading = useRef<HTMLHeadingElement>(null);

  const search = query.trim().toLocaleLowerCase();
  const filtered = items.filter((item) => {
    const matchesQuery =
      !search ||
      `${item.message} ${item.commit} ${item.branch} ${item.author}`
        .toLocaleLowerCase()
        .includes(search);
    const matchesEnvironment =
      environment === "all" || item.environment === environment;
    const matchesStatus = status === "all" || item.status === status;
    return matchesQuery && matchesEnvironment && matchesStatus;
  });
  const selected =
    filtered.find((item) => item.id === selectedId) ?? filtered[0];
  const live =
    items.find(
      (item) => item.environment === "production" && item.status === "ready",
    ) ?? initialDeployments[0];
  const filtersActive =
    environment !== "all" || status !== "all" || query.trim().length > 0;
  const visibleHistory =
    showHistory || filtersActive ? filtered : filtered.slice(0, 4);

  useEffect(() => {
    if (!buildingId) return;
    const timer = window.setTimeout(() => {
      setItems((current) =>
        current.map((item) =>
          item.id === buildingId
            ? {
                ...item,
                status: "ready",
                duration: "40s",
                age: "Just now",
              }
            : item,
        ),
      );
      setBuildingId(null);
      showToast({
        title: "Deployment ready",
        description: "The new build is live on the edge.",
        variant: "success",
      });
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [buildingId]);

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      showToast({
        title: `${label} copied`,
        description: "The value is in your clipboard.",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Could not copy",
        description: "Allow clipboard access and try again.",
        variant: "error",
      });
    }
  }

  const clearFilters = () => {
    setEnvironment("all");
    setStatus("all");
    setQuery("");
    setSelectedId(items[0].id);
    setLogOpen(false);
  };

  function redeploy(source: Deployment) {
    if (buildingId) return;
    const id = crypto.randomUUID();
    const next: Deployment = {
      ...source,
      id,
      status: "building",
      buildCommand: configuration.buildCommand,
      outputDirectory: configuration.outputDirectory,
      duration: "In progress",
      age: "Just now",
      createdAt: deploymentDate.format(new Date()),
    };
    clearFilters();
    setItems((current) => [next, ...current]);
    setSelectedId(id);
    setBuildingId(id);
    setLogOpen(true);
    setDialog(null);
    showToast({
      title: "Deployment started",
      description: `Building ${source.commit} on ${source.branch}.`,
      variant: "success",
    });
  }

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setConfiguration({
      buildCommand: String(fields.get("buildCommand")).trim(),
      outputDirectory: String(fields.get("outputDirectory")).trim(),
      autoDeploy: fields.has("autoDeploy"),
    });
    setDialog(null);
    showToast({ title: "Project settings updated", variant: "success" });
  }

  function selectDeployment(id: string) {
    setSelectedId(id);
    setLogOpen(false);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => detailHeading.current?.focus());
    }
  }

  function toggleHistory() {
    if (
      showHistory &&
      !filtered.slice(0, 4).some((item) => item.id === selectedId)
    ) {
      setSelectedId(filtered[0].id);
      setLogOpen(false);
    }
    setShowHistory(!showHistory);
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex min-h-svh max-w-[1600px]">
        <ProjectSidebar
          onOpen={setDialog}
          hasSelection={Boolean(selected)}
          onOpenLogs={() => setLogOpen(true)}
        />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-md">
            <div className="flex h-14 items-center gap-2 px-4 sm:px-6">
              <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground xl:hidden">
                <CubeIcon size={15} weight="fill" aria-hidden="true" />
              </span>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {project.team}
              </span>
              <span
                aria-hidden="true"
                className="hidden text-muted-foreground/50 sm:inline"
              >
                /
              </span>
              <span className="text-xs font-medium">{project.name}</span>
              <div className="ms-auto flex items-center gap-2">
                <Button
                  size="xs"
                  onPress={() =>
                    setDialog({ kind: "deploy", deployment: live })
                  }
                  isDisabled={Boolean(buildingId)}
                >
                  <RocketLaunchIcon
                    data-icon="inline-start"
                    size={13}
                    aria-hidden="true"
                  />
                  Deploy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label="MC, workspace details"
                  onPress={() => setDialog({ kind: "workspace" })}
                >
                  <span aria-hidden="true">
                    <Avatar name="Maya Chen" size="sm" />
                  </span>
                </Button>
              </div>
            </div>
            <nav
              aria-label="Project"
              className="flex gap-1 overflow-x-auto px-4 pb-2 xl:hidden"
            >
              <ProjectNavigation
                hasSelection={Boolean(selected)}
                onOpen={setDialog}
                onOpenLogs={() => setLogOpen(true)}
              />
            </nav>
          </header>

          <main
            id="overview"
            className="scroll-mt-28 px-4 py-5 sm:px-6 xl:px-8 xl:py-7"
          >
            <ProjectOverview
              live={live}
              onCopy={() => copy(`https://${live.url}`, "Production URL")}
              onSettings={() => setDialog({ kind: "settings" })}
            />

            <DeploymentFilters
              environment={environment}
              status={status}
              query={query}
              onEnvironmentChange={setEnvironment}
              onStatusChange={setStatus}
              onQueryChange={setQuery}
            />

            <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(17rem,0.9fr)_minmax(0,1.8fr)] 2xl:grid-cols-[minmax(22rem,1fr)_minmax(0,2fr)]">
              <BuildHistory
                items={visibleHistory}
                total={items.length}
                selectedId={selected?.id}
                filtersActive={filtersActive}
                showHistory={showHistory}
                onSelect={selectDeployment}
                onToggle={toggleHistory}
                onClear={clearFilters}
              />
              {selected && (
                <DeploymentDetail
                  selected={selected}
                  detailHeading={detailHeading}
                  logOpen={logOpen}
                  onToggleLog={() => setLogOpen((value) => !value)}
                  copy={copy}
                  isDeploying={Boolean(buildingId)}
                  onRedeploy={() =>
                    setDialog({ kind: "deploy", deployment: selected })
                  }
                />
              )}
            </div>
          </main>
        </div>
      </div>
      <DeploymentDialog
        dialog={dialog}
        configuration={configuration}
        isDeploying={Boolean(buildingId)}
        onClose={() => setDialog(null)}
        onSave={saveSettings}
        onDeploy={redeploy}
      />
    </div>
  );
}

function ProjectNavigation({
  hasSelection,
  onOpen,
  onOpenLogs,
}: {
  hasSelection: boolean;
  onOpen: (dialog: ProjectDialog) => void;
  onOpenLogs: () => void;
}) {
  return navItems.map((item) => {
    const Icon = navIcons[item.icon];
    const content = (
      <>
        <Icon
          data-icon="inline-start"
          size={15}
          className="hidden sm:inline"
          aria-hidden="true"
        />
        {item.label}
      </>
    );
    const className = "shrink-0 justify-start text-xs";
    if (item.id === "settings" || item.id === "analytics") {
      const kind = item.id === "settings" ? "settings" : "usage";
      return (
        <Button
          key={item.id}
          size="sm"
          variant="ghost"
          className={className}
          onPress={() => onOpen({ kind })}
        >
          {content}
        </Button>
      );
    }
    return (
      <ButtonLink
        key={item.id}
        href={`#${item.id === "logs" && !hasSelection ? "deployments" : item.id}`}
        size="sm"
        variant="ghost"
        className={cn(
          className,
          item.id === "deployments" && "bg-accent text-accent-foreground",
        )}
        onClick={() => {
          if (item.id === "logs") onOpenLogs();
        }}
      >
        {content}
      </ButtonLink>
    );
  });
}

function ProjectSidebar({
  onOpen,
  hasSelection,
  onOpenLogs,
}: {
  onOpen: (dialog: ProjectDialog) => void;
  hasSelection: boolean;
  onOpenLogs: () => void;
}) {
  return (
    <aside className="sticky top-0 hidden h-svh w-52 shrink-0 flex-col overflow-y-auto border-e border-border/70 bg-card xl:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-border/70 px-5">
        <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
          <CubeIcon size={17} weight="fill" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold tracking-[-0.02em]">
          Halyard
        </span>
      </div>

      <div className="border-b border-border/70 p-3">
        <div className="flex items-center gap-2.5 rounded-md bg-muted/55 px-2.5 py-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-sm font-semibold text-accent-foreground">
            A
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{project.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {project.team} workspace
            </p>
          </div>
        </div>
      </div>

      <nav aria-label="Project" className="grid gap-1 p-3">
        <ProjectNavigation
          hasSelection={hasSelection}
          onOpen={onOpen}
          onOpenLogs={onOpenLogs}
        />
      </nav>

      <div className="mt-auto grid gap-3 border-t border-border/70 p-3">
        <Card className="bg-background p-3 shadow-none ring-border/70">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Usage
          </p>
          {usage.map((item) => (
            <div key={item.name} className="mt-3">
              <div className="flex items-baseline justify-between gap-2 text-[11px]">
                <span>{item.name}</span>
                <span className="text-muted-foreground tabular-nums">
                  {item.value}%
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {item.detail}
              </p>
            </div>
          ))}
        </Card>
        <div className="flex items-center gap-2">
          <Avatar name="Maya Chen" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">Maya Chen</p>
            <p className="truncate text-[10px] text-muted-foreground">
              Pro workspace
            </p>
          </div>
          <Button
            variant="minimal"
            size="xs"
            iconOnly
            aria-label="Workspace details"
            onPress={() => onOpen({ kind: "workspace" })}
          >
            <GearIcon size={14} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

function ProjectOverview({
  live,
  onCopy,
  onSettings,
}: {
  live: Deployment;
  onCopy: () => Promise<void>;
  onSettings: () => void;
}) {
  return (
    <section
      className="relative isolate grid gap-5 overflow-hidden rounded-xl bg-[#142238] px-5 py-5 text-white sm:px-7 sm:py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
      aria-labelledby="deployments-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#355784,transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(to_right,#afccff_1px,transparent_1px),linear-gradient(to_bottom,#afccff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_left,black,transparent_75%)]"
      />
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-mono text-xs text-blue-200">
          <GitBranchIcon size={15} aria-hidden="true" /> acme / atlas-web
        </p>
        <h1
          id="deployments-title"
          className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
        >
          Deployments
        </h1>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-blue-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-300/15 px-2.5 py-1 font-medium text-emerald-200">
            <span
              className="size-1.5 rounded-full bg-emerald-300"
              aria-hidden="true"
            />{" "}
            Production live
          </span>
          <span className="font-mono">{live.commit}</span>
          <span>{project.region}</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/10 text-white hover:bg-white/20 hover:text-white"
          onPress={onCopy}
        >
          <CopyIcon data-icon="inline-start" aria-hidden="true" /> Copy
          production URL
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/10 text-white hover:bg-white/20 hover:text-white"
          onPress={onSettings}
        >
          <GearIcon data-icon="inline-start" aria-hidden="true" /> Settings
        </Button>
      </div>
    </section>
  );
}

function DeploymentFilters({
  environment,
  status,
  query,
  onEnvironmentChange,
  onStatusChange,
  onQueryChange,
}: {
  environment: "all" | Deployment["environment"];
  status: "all" | DeploymentStatus;
  query: string;
  onEnvironmentChange: (value: "all" | Deployment["environment"]) => void;
  onStatusChange: (value: "all" | DeploymentStatus) => void;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div
      id="deployments"
      className="mt-5 flex scroll-mt-28 flex-wrap items-center gap-2"
    >
      <ToggleButtonGroup
        aria-label="Environment"
        size="sm"
        className="hidden sm:inline-flex"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[environment]}
        onSelectionChange={(keys) => {
          const [key] = keys;
          const option = environmentOptions.find((item) => item.id === key);
          if (option) onEnvironmentChange(option.id);
        }}
      >
        {environmentOptions.map((option) => (
          <ToggleButton key={option.id} id={option.id} variant="segmented">
            {option.id === "all" ? "All" : option.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className="grid w-full grid-cols-2 gap-2 sm:ms-auto sm:w-auto sm:flex">
        <SearchField
          size="sm"
          aria-label="Search deployments"
          placeholder="Search commits"
          value={query}
          onChange={onQueryChange}
          className="col-span-2 sm:w-56"
        />
        <Select
          size="sm"
          aria-label="Environment"
          options={environmentOptions}
          value={environment}
          onChange={(value) =>
            onEnvironmentChange(
              environmentOptions.find((option) => option.id === value)?.id ??
                "all",
            )
          }
          className="sm:hidden"
        />
        <Select
          size="sm"
          aria-label="Status"
          options={statusOptions}
          value={status}
          onChange={(value) =>
            onStatusChange(
              statusOptions.find((option) => option.id === value)?.id ?? "all",
            )
          }
          className="sm:w-36"
        />
      </div>
    </div>
  );
}

function BuildHistory({
  items,
  total,
  selectedId,
  filtersActive,
  showHistory,
  onSelect,
  onToggle,
  onClear,
}: {
  items: Deployment[];
  total: number;
  selectedId?: string;
  filtersActive: boolean;
  showHistory: boolean;
  onSelect: (id: string) => void;
  onToggle: () => void;
  onClear: () => void;
}) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 border-b border-border/70 py-3">
        <div className="grid gap-0.5">
          <CardTitle as="h2">Build history</CardTitle>
          <CardDescription>
            {items.length} of {total} builds
          </CardDescription>
        </div>
        {filtersActive && (
          <Button variant="minimal" size="xs" onPress={onClear}>
            Clear filters
          </Button>
        )}
      </CardHeader>
      {items.length === 0 ? (
        <CardContent>
          <EmptyState>
            <EmptyStateIcon>
              <MagnifyingGlassIcon aria-hidden="true" />
            </EmptyStateIcon>
            <EmptyStateTitle as="h3">No deployments match</EmptyStateTitle>
            <EmptyStateDescription>
              Change the environment, status, or search term.
            </EmptyStateDescription>
          </EmptyState>
        </CardContent>
      ) : (
        <ul className="divide-y divide-border/60">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-pressed={item.id === selectedId}
                className={cn(
                  "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-start transition-colors duration-150 ease-out-quint hover:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:px-5",
                  item.id === selectedId &&
                    "bg-accent/75 shadow-[inset_3px_0_0_#60a5fa]",
                )}
              >
                <StatusMark status={item.status} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.message}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[10px] text-muted-foreground sm:text-[11px]">
                    <span className="font-mono">{item.commit}</span>
                    <span aria-hidden="true">·</span>
                    <span className="max-w-32 truncate">{item.branch}</span>
                    <span className="hidden sm:inline" aria-hidden="true">
                      ·
                    </span>
                    <span className="hidden sm:inline">{item.author}</span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-end text-[10px] text-muted-foreground sm:gap-3 sm:text-[11px]">
                  <Badge
                    variant={environmentBadge[item.environment]}
                    className="hidden capitalize sm:inline-flex lg:hidden 2xl:inline-flex"
                  >
                    {item.environment}
                  </Badge>
                  <span className="hidden w-12 tabular-nums sm:inline lg:hidden 2xl:inline">
                    {item.duration}
                  </span>
                  <span className="tabular-nums">{item.age}</span>
                  <span className="sr-only">
                    {statusLabel(item.status)}, {item.environment}
                  </span>
                  <CaretRightIcon
                    size={13}
                    className="hidden text-muted-foreground/60 sm:block"
                    aria-hidden="true"
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
      {!filtersActive && total > 4 && (
        <div className="border-t border-border px-3 py-2">
          <Button
            variant="minimal"
            size="sm"
            className="w-full"
            onPress={onToggle}
            aria-expanded={showHistory}
          >
            {showHistory
              ? "Show recent deployments"
              : `Show all ${total} deployments`}
          </Button>
        </div>
      )}
    </Card>
  );
}

function DeploymentDialog({
  dialog,
  configuration,
  isDeploying,
  onClose,
  onSave,
  onDeploy,
}: {
  dialog: ProjectDialog | null;
  configuration: typeof initialConfiguration;
  isDeploying: boolean;
  onClose: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  onDeploy: (deployment: Deployment) => void;
}) {
  return (
    <DialogContent
      size="sm"
      overlayProps={{
        isOpen: dialog !== null,
        onOpenChange: (open) => {
          if (!open) onClose();
        },
      }}
    >
      {dialog?.kind === "deploy" && (
        <>
          <DialogHeader>
            <DialogTitle level={2}>Deploy this commit?</DialogTitle>
            <DialogDescription>
              A new demo build will run for {dialog.deployment.environment}.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4">
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-sm font-medium">{dialog.deployment.message}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {dialog.deployment.commit} · {dialog.deployment.branch}
              </p>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onPress={() => onClose()}>
              Cancel
            </Button>
            <Button
              onPress={() => onDeploy(dialog.deployment)}
              isDisabled={isDeploying}
            >
              Start deployment
            </Button>
          </DialogFooter>
        </>
      )}
      {dialog?.kind === "settings" && (
        <form onSubmit={onSave}>
          <DialogHeader>
            <DialogTitle level={2}>Project settings</DialogTitle>
            <DialogDescription>
              Build settings for {project.name}.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4 grid gap-4">
            <TextField
              name="buildCommand"
              label="Build command"
              defaultValue={configuration.buildCommand}
              maxLength={80}
              pattern=".*\S.*"
              isRequired
            />
            <TextField
              name="outputDirectory"
              label="Output directory"
              defaultValue={configuration.outputDirectory}
              maxLength={80}
              pattern=".*\S.*"
              isRequired
            />
            <Switch
              name="autoDeploy"
              defaultSelected={configuration.autoDeploy}
            >
              Deploy automatically on push
            </Switch>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onPress={() => onClose()}>
              Cancel
            </Button>
            <Button type="submit">Save settings</Button>
          </DialogFooter>
        </form>
      )}
      {dialog?.kind === "usage" && (
        <>
          <DialogHeader>
            <DialogTitle level={2}>Workspace usage</DialogTitle>
            <DialogDescription>Current billing period</DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4 grid gap-4">
            {usage.map((item) => (
              <div key={item.name}>
                <ProgressBar label={item.name} value={item.value} />
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </DialogBody>
        </>
      )}
      {dialog?.kind === "workspace" && (
        <>
          <DialogHeader>
            <DialogTitle level={2}>{project.team} workspace</DialogTitle>
            <DialogDescription>Pro plan</DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4 flex items-center gap-3">
            <Avatar name="Maya Chen" />
            <div>
              <p className="text-sm font-medium">Maya Chen</p>
              <p className="text-xs text-muted-foreground">Workspace owner</p>
            </div>
          </DialogBody>
        </>
      )}
    </DialogContent>
  );
}

function DeploymentDetail({
  selected,
  detailHeading,
  logOpen,
  onToggleLog,
  copy,
  isDeploying,
  onRedeploy,
}: {
  selected: Deployment;
  detailHeading: React.Ref<HTMLHeadingElement>;
  logOpen: boolean;
  onToggleLog: () => void;
  copy: (value: string, label: string) => Promise<void>;
  isDeploying: boolean;
  onRedeploy: () => void;
}) {
  const steps = buildStepsFor(selected.status);
  const checks = checksFor(selected.status);
  const logs = logsFor(selected);
  return (
    <Card className="min-w-0 overflow-hidden">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-3 border-b border-border/70 bg-muted/25 px-4 py-4 sm:px-5">
        <StatusMark status={selected.status} />
        <div className="min-w-0 flex-1">
          <h2
            ref={detailHeading}
            tabIndex={-1}
            className="scroll-mt-28 text-base font-semibold wrap-anywhere outline-none"
          >
            {selected.message}
          </h2>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
            <span className="font-mono">{selected.commit}</span>
            <span aria-hidden="true">·</span>
            <span>{selected.branch}</span>
            <span aria-hidden="true">·</span>
            <span>{selected.author}</span>
            <span aria-hidden="true">·</span>
            <span>{selected.age}</span>
          </p>
        </div>
        <div className="col-span-2 flex flex-wrap items-center gap-1.5 sm:ps-11">
          <Badge
            variant={environmentBadge[selected.environment]}
            className="capitalize"
          >
            {selected.environment}
          </Badge>
          <Badge variant={statusBadge[selected.status]} dot>
            {statusLabel(selected.status)}
          </Badge>
          <Button
            variant="outline"
            size="xs"
            onPress={() => copy(selected.commit, "Commit SHA")}
          >
            <CopyIcon data-icon="inline-start" size={13} aria-hidden="true" />
            Copy SHA
          </Button>
          <Button
            variant="outline"
            size="xs"
            onPress={() => copy(`https://${selected.url}`, "Deployment URL")}
          >
            <GlobeIcon data-icon="inline-start" aria-hidden="true" />
            Copy URL
          </Button>
          <Button size="xs" onPress={onRedeploy} isDisabled={isDeploying}>
            <ArrowClockwiseIcon
              data-icon="inline-start"
              size={13}
              aria-hidden="true"
            />
            Redeploy
          </Button>
        </div>
      </div>

      <div className="grid">
        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Build</h2>
            <span className="text-[11px] text-muted-foreground">
              {selected.status === "building"
                ? "In progress"
                : selected.duration}
            </span>
          </div>
          <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {steps.map((step) => (
              <li
                key={step.name}
                className={cn(
                  "relative rounded-md border p-2.5",
                  step.status === "failed"
                    ? "border-destructive/30 bg-destructive/5"
                    : step.status === "active"
                      ? "border-warning/30 bg-warning-subtle/60"
                      : "border-border/70 bg-muted/30",
                )}
              >
                <div className="flex items-center gap-1.5">
                  <StepMark status={step.status} />
                  <span className="truncate text-[11px] font-medium">
                    {step.name}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  {step.detail}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground tabular-nums">
                  {step.duration}
                </p>
              </li>
            ))}
          </ol>

          <div
            id="logs"
            className="mt-4 scroll-mt-28 overflow-hidden rounded-lg border border-white/10 bg-[#0a0d12] text-[#d8e0ea] shadow-(--shadow-card)"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
              <span aria-hidden="true" className="flex gap-1">
                <span className="size-2 rounded-full bg-[#ff5f57]/80" />
                <span className="size-2 rounded-full bg-[#febc2e]/80" />
                <span className="size-2 rounded-full bg-[#28c840]/80" />
              </span>
              <span className="ms-1 text-[10px] text-white/60">build.log</span>
              <span className="ms-auto text-[10px] text-white/55 tabular-nums">
                {selected.duration}
              </span>
              <button
                type="button"
                onClick={() =>
                  copy(
                    logs.map((line) => `${line.time}  ${line.text}`).join("\n"),
                    "Build log",
                  )
                }
                className="rounded-sm p-1 text-white/65 transition-colors hover:bg-white/10 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                aria-label="Copy build log"
              >
                <CopyIcon size={12} aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-64 overflow-auto p-3 font-mono text-[11px] leading-5">
              <div className="min-w-max">
                {(logOpen ? logs : logs.slice(0, 9)).map((line) => (
                  <div
                    key={`${line.time}-${line.text}`}
                    className="flex gap-3 whitespace-nowrap"
                  >
                    <span className="shrink-0 text-white/55">{line.time}</span>
                    <span className={logTone[line.tone]}>{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {logs.length > 9 && (
              <button
                type="button"
                aria-expanded={logOpen}
                onClick={onToggleLog}
                className="flex w-full items-center justify-center gap-1.5 border-t border-white/10 py-2.5 text-xs text-white/70 transition-colors hover:bg-white/5 hover:text-white/80 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/60"
              >
                {logOpen ? "Collapse log" : `Show all ${logs.length} lines`}
                <CaretDownIcon
                  size={10}
                  className={cn(
                    "transition-transform duration-200",
                    logOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">Checks</h2>
              <span className="text-[11px] text-muted-foreground">
                {checks.filter((check) => check.status === "passed").length} of{" "}
                {checks.length} passed
              </span>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {checks.map((check) => (
                <div
                  key={check.name}
                  className="flex items-start gap-2 rounded-md border border-border/70 bg-muted/30 p-2.5"
                >
                  <StepMark status={checkMarks[check.status]} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium">{check.name}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {check.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="my-4 h-px bg-border/70" />

          <h2 className="text-sm font-semibold">Project domains</h2>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {domains.map((domain) => (
              <li
                key={domain.name}
                className="flex items-center gap-2 rounded-md border border-border/70 bg-muted/30 px-2.5 py-2 text-[11px]"
              >
                <GlobeIcon
                  size={13}
                  className="shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate">{domain.name}</span>
                {domain.primary && (
                  <Badge variant="neutral" className="text-[10px]">
                    Primary
                  </Badge>
                )}
                <CheckCircleIcon
                  size={13}
                  className="shrink-0 text-success"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>

        <aside className="border-t border-border/70 p-4 sm:p-5 bg-muted/25 md:grid md:grid-cols-2 md:gap-6">
          <div>
            <h2 className="text-sm font-semibold">Details</h2>
            <DescriptionList layout="columns" className="mt-3 text-[11px]">
              <DescriptionTerm>Environment</DescriptionTerm>
              <DescriptionDetail className="capitalize">
                {selected.environment}
              </DescriptionDetail>
              <DescriptionTerm>Branch</DescriptionTerm>
              <DescriptionDetail className="font-mono text-[11px]">
                {selected.branch}
              </DescriptionDetail>
              <DescriptionTerm>Commit</DescriptionTerm>
              <DescriptionDetail className="font-mono text-[11px]">
                {selected.commit}
              </DescriptionDetail>
              <DescriptionTerm>Region</DescriptionTerm>
              <DescriptionDetail>{selected.region}</DescriptionDetail>
              <DescriptionTerm>Created</DescriptionTerm>
              <DescriptionDetail>{selected.createdAt}</DescriptionDetail>
              <DescriptionTerm>Duration</DescriptionTerm>
              <DescriptionDetail className="tabular-nums">
                {selected.duration}
              </DescriptionDetail>
            </DescriptionList>
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-sm font-semibold">Environment variables</h2>
            <ul className="mt-2 grid gap-2">
              {environmentVariables.map((variable) => (
                <li
                  key={variable.key}
                  className="rounded-md border border-border/70 bg-background px-2.5 py-2"
                >
                  <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium">
                    <KeyIcon
                      size={11}
                      className="text-muted-foreground"
                      aria-hidden="true"
                    />
                    {variable.key}
                  </p>
                  <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground">
                    {variable.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Card>
  );
}

function StatusMark({
  status,
  size = "md",
}: {
  status: DeploymentStatus;
  size?: "sm" | "md";
}) {
  const base = cn(
    "grid shrink-0 place-items-center rounded-full",
    size === "sm" ? "size-6" : "size-8",
  );
  if (status === "ready")
    return (
      <span className={cn(base, "bg-success-subtle text-success-foreground")}>
        <CheckIcon
          size={size === "sm" ? 12 : 15}
          weight="bold"
          aria-hidden="true"
        />
      </span>
    );
  if (status === "building")
    return (
      <span className={cn(base, "bg-warning-subtle text-warning-foreground")}>
        <CircleNotchIcon
          size={size === "sm" ? 12 : 15}
          className="motion-safe:animate-spin"
          aria-hidden="true"
        />
      </span>
    );
  if (status === "error")
    return (
      <span className={cn(base, "bg-destructive/10 text-destructive")}>
        <XCircleIcon size={size === "sm" ? 12 : 15} aria-hidden="true" />
      </span>
    );
  return (
    <span className={cn(base, "bg-muted text-muted-foreground")}>
      <ClockIcon size={size === "sm" ? 12 : 15} aria-hidden="true" />
    </span>
  );
}

function StepMark({
  status,
}: {
  status: "complete" | "active" | "pending" | "failed";
}) {
  if (status === "complete")
    return (
      <CheckCircleIcon
        size={12}
        className="shrink-0 text-success"
        aria-hidden="true"
      />
    );
  if (status === "active")
    return (
      <CircleNotchIcon
        size={12}
        className="shrink-0 text-warning-foreground motion-safe:animate-spin"
        aria-hidden="true"
      />
    );
  if (status === "failed")
    return (
      <WarningCircleIcon
        size={12}
        className="shrink-0 text-destructive"
        aria-hidden="true"
      />
    );
  return (
    <ClockIcon
      size={12}
      className="shrink-0 text-muted-foreground"
      aria-hidden="true"
    />
  );
}
