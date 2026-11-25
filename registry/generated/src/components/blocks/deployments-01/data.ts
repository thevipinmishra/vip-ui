export type DeploymentStatus = "ready" | "building" | "error" | "queued";
export type Environment = "production" | "preview" | "development";

export interface Deployment {
  id: string;
  message: string;
  branch: string;
  commit: string;
  author: string;
  environment: Environment;
  status: DeploymentStatus;
  duration: string;
  age: string;
  region: string;
  url: string;
  createdAt: string;
  buildCommand?: string;
  outputDirectory?: string;
}

export const deployments: Deployment[] = [
  {
    id: "dpl_9f3a1c",
    message: "Add usage-based billing to the workspace plan",
    branch: "main",
    commit: "a91f3c2",
    author: "Maya Chen",
    environment: "production",
    status: "ready",
    duration: "42s",
    age: "2m ago",
    region: "iad1",
    url: "atlas.acme.com",
    createdAt: "Nov 24, 2026 at 9:41 AM",
  },
  {
    id: "dpl_7b2e88",
    message: "Cache the customer lookup on the billing page",
    branch: "perf/customer-cache",
    commit: "f80d61a",
    author: "Leo Park",
    environment: "preview",
    status: "ready",
    duration: "38s",
    age: "18m ago",
    region: "iad1",
    url: "atlas-git-perf-customer-cache.acme.dev",
    createdAt: "Nov 24, 2026 at 9:23 AM",
  },
  {
    id: "dpl_4c9d02",
    message: "Fix empty state on the invoices table",
    branch: "fix/invoice-empty-state",
    commit: "2c7be14",
    author: "Priya Raman",
    environment: "preview",
    status: "building",
    duration: "12s",
    age: "1m ago",
    region: "iad1",
    url: "atlas-git-fix-invoice-empty-state.acme.dev",
    createdAt: "Nov 24, 2026 at 9:40 AM",
  },
  {
    id: "dpl_1e8f44",
    message: "Update onboarding copy and add the import step",
    branch: "main",
    commit: "7d3a9f0",
    author: "Ana Souza",
    environment: "production",
    status: "ready",
    duration: "44s",
    age: "3h ago",
    region: "iad1",
    url: "atlas.acme.com",
    createdAt: "Nov 24, 2026 at 6:32 AM",
  },
  {
    id: "dpl_5a0c71",
    message: "Try the new chart palette in the revenue report",
    branch: "design/chart-palette",
    commit: "c4e2b81",
    author: "Devon Ellis",
    environment: "preview",
    status: "error",
    duration: "1m 08s",
    age: "5h ago",
    region: "iad1",
    url: "atlas-git-design-chart-palette.acme.dev",
    createdAt: "Nov 24, 2026 at 4:08 AM",
  },
  {
    id: "dpl_8d6b23",
    message: "Raise the audit log retention to 90 days",
    branch: "main",
    commit: "9b1f7d3",
    author: "Maya Chen",
    environment: "production",
    status: "ready",
    duration: "39s",
    age: "Yesterday",
    region: "iad1",
    url: "atlas.acme.com",
    createdAt: "Nov 23, 2026 at 4:16 PM",
  },
  {
    id: "dpl_3f7c90",
    message: "Add a development seed for demo workspaces",
    branch: "chore/demo-seed",
    commit: "e63a2c9",
    author: "Leo Park",
    environment: "development",
    status: "ready",
    duration: "31s",
    age: "Yesterday",
    region: "iad1",
    url: "atlas-git-chore-demo-seed.acme.dev",
    createdAt: "Nov 23, 2026 at 1:02 PM",
  },
  {
    id: "dpl_6c4a12",
    message: "Remove the unused legacy billing worker",
    branch: "chore/remove-billing-worker",
    commit: "5a8e0f4",
    author: "Priya Raman",
    environment: "preview",
    status: "queued",
    duration: "—",
    age: "Queued",
    region: "iad1",
    url: "atlas-git-chore-remove-billing-worker.acme.dev",
    createdAt: "Nov 24, 2026 at 9:42 AM",
  },
];

export const environmentOptions: {
  id: "all" | Environment;
  name: string;
}[] = [
  { id: "all", name: "All environments" },
  { id: "production", name: "Production" },
  { id: "preview", name: "Preview" },
  { id: "development", name: "Development" },
];

export const statusOptions: {
  id: "all" | DeploymentStatus;
  name: string;
}[] = [
  { id: "all", name: "All statuses" },
  { id: "ready", name: "Ready" },
  { id: "building", name: "Building" },
  { id: "error", name: "Error" },
  { id: "queued", name: "Queued" },
];

export interface BuildStep {
  name: string;
  detail: string;
  duration: string;
  status: "complete" | "active" | "pending" | "failed";
}

export function buildStepsFor(status: DeploymentStatus): BuildStep[] {
  if (status === "queued")
    return [
      {
        name: "Queued",
        detail: "Waiting for a runner",
        duration: "—",
        status: "active",
      },
      {
        name: "Clone",
        detail: "Fetch the repository",
        duration: "—",
        status: "pending",
      },
      {
        name: "Install",
        detail: "Restore dependencies",
        duration: "—",
        status: "pending",
      },
      {
        name: "Build",
        detail: "Compile the app",
        duration: "—",
        status: "pending",
      },
      {
        name: "Upload",
        detail: "Publish the output",
        duration: "—",
        status: "pending",
      },
    ];
  if (status === "building")
    return [
      {
        name: "Queued",
        detail: "Runner assigned",
        duration: "1s",
        status: "complete",
      },
      {
        name: "Clone",
        detail: "main at 2c7be14",
        duration: "3s",
        status: "complete",
      },
      {
        name: "Install",
        detail: "1,284 packages",
        duration: "11s",
        status: "active",
      },
      {
        name: "Build",
        detail: "Next.js production build",
        duration: "—",
        status: "pending",
      },
      {
        name: "Upload",
        detail: "Publish the output",
        duration: "—",
        status: "pending",
      },
    ];
  if (status === "error")
    return [
      {
        name: "Queued",
        detail: "Runner assigned",
        duration: "1s",
        status: "complete",
      },
      {
        name: "Clone",
        detail: "design/chart-palette at c4e2b81",
        duration: "3s",
        status: "complete",
      },
      {
        name: "Install",
        detail: "1,291 packages",
        duration: "14s",
        status: "complete",
      },
      {
        name: "Build",
        detail: "Type error in revenue-chart.tsx",
        duration: "50s",
        status: "failed",
      },
      {
        name: "Upload",
        detail: "Publish the output",
        duration: "—",
        status: "pending",
      },
    ];
  return [
    {
      name: "Queued",
      detail: "Runner assigned",
      duration: "1s",
      status: "complete",
    },
    {
      name: "Clone",
      detail: "Repository ready",
      duration: "3s",
      status: "complete",
    },
    {
      name: "Install",
      detail: "1,284 packages",
      duration: "14s",
      status: "complete",
    },
    {
      name: "Build",
      detail: "Next.js production build",
      duration: "22s",
      status: "complete",
    },
    {
      name: "Upload",
      detail: "Published to the edge",
      duration: "2s",
      status: "complete",
    },
  ];
}

export type LogTone = "muted" | "default" | "success" | "warning" | "error";

export interface LogLine {
  time: string;
  text: string;
  tone: LogTone;
}

export type CheckStatus = "passed" | "failed" | "running" | "pending";

export interface DeploymentCheck {
  name: string;
  detail: string;
  status: CheckStatus;
}

export function checksFor(status: DeploymentStatus): DeploymentCheck[] {
  if (status === "ready")
    return [
      { name: "Lint", detail: "Biome · 2.1s", status: "passed" },
      { name: "Types", detail: "tsc · 6.4s", status: "passed" },
      { name: "Tests", detail: "Playwright · 11.8s", status: "passed" },
    ];
  if (status === "error")
    return [
      { name: "Lint", detail: "Biome · 2.4s", status: "passed" },
      { name: "Types", detail: "tsc · 0.8s", status: "failed" },
      { name: "Tests", detail: "Skipped after failure", status: "pending" },
    ];
  if (status === "building")
    return [
      { name: "Lint", detail: "Biome · running", status: "running" },
      { name: "Types", detail: "Waiting for lint", status: "pending" },
      { name: "Tests", detail: "Waiting for build", status: "pending" },
    ];
  return [
    { name: "Lint", detail: "Waiting for runner", status: "pending" },
    { name: "Types", detail: "Waiting for runner", status: "pending" },
    { name: "Tests", detail: "Waiting for runner", status: "pending" },
  ];
}

export function logsFor(deployment: Deployment): LogLine[] {
  const base: LogLine[] = [
    {
      time: "09:41:02",
      text: `Cloning ${project.team}/${project.name} (commit ${deployment.commit})`,
      tone: "muted",
    },
    {
      time: "09:41:05",
      text: "Installing dependencies with pnpm 10.4.1",
      tone: "default",
    },
    {
      time: "09:41:18",
      text: "Lockfile is up to date, resolution step is skipped",
      tone: "muted",
    },
    { time: "09:41:19", text: "Packages: +1284", tone: "default" },
    {
      time: "09:41:33",
      text: `Running build command: ${deployment.buildCommand ?? project.buildCommand}`,
      tone: "default",
    },
    { time: "09:41:34", text: "▲ Next.js 16.4.6 (Turbopack)", tone: "default" },
    {
      time: "09:41:35",
      text: "Creating an optimized production build ...",
      tone: "muted",
    },
    {
      time: "09:41:48",
      text: "✓ Compiled successfully in 11.4s",
      tone: "success",
    },
    { time: "09:41:49", text: "Collecting page data ...", tone: "muted" },
    {
      time: "09:41:51",
      text: "Generating static pages (42/42)",
      tone: "default",
    },
    {
      time: "09:41:53",
      text: "Finalizing page optimization ...",
      tone: "muted",
    },
    {
      time: "09:41:54",
      text: "Route (app)                    Size    First Load JS",
      tone: "muted",
    },
    {
      time: "09:41:54",
      text: "○ /                            1.2 kB   104 kB",
      tone: "default",
    },
    {
      time: "09:41:54",
      text: "○ /settings/billing            4.8 kB   132 kB",
      tone: "default",
    },
    {
      time: "09:41:55",
      text: `Uploading ${deployment.outputDirectory ?? project.outputDirectory} (18.4 MB)`,
      tone: "default",
    },
    {
      time: "09:41:57",
      text: `✓ Deployment ready in ${deployment.duration}`,
      tone: "success",
    },
    {
      time: "09:41:57",
      text: `Deployment URL: https://${deployment.url}`,
      tone: "success",
    },
  ];
  if (deployment.status === "error")
    return [
      ...base.slice(0, 6),
      {
        time: "09:42:11",
        text: "✓ Compiled successfully in 9.8s",
        tone: "success",
      },
      { time: "09:42:12", text: "Failed to compile.", tone: "error" },
      {
        time: "09:42:12",
        text: "src/components/revenue-chart.tsx:184:24",
        tone: "muted",
      },
      {
        time: "09:42:12",
        text: "Type error: Property 'series' does not exist on type 'ChartProps'.",
        tone: "error",
      },
      { time: "09:42:12", text: " 182 | <Chart", tone: "muted" },
      { time: "09:42:12", text: " 183 |   data={rows}", tone: "muted" },
      { time: "09:42:12", text: "> 184 |   series={palette}", tone: "error" },
      {
        time: "09:42:12",
        text: "Build failed with exit code 1.",
        tone: "error",
      },
    ];
  if (deployment.status === "building")
    return [
      {
        time: "09:40:02",
        text: base[0].text,
        tone: "muted",
      },
      {
        time: "09:40:05",
        text: "Installing dependencies with pnpm 10.4.1",
        tone: "default",
      },
      { time: "09:40:12", text: "Packages: +1284", tone: "default" },
      {
        time: "09:40:14",
        text: "Progress: resolved 1284, reused 1180, downloaded 104",
        tone: "muted",
      },
    ];
  if (deployment.status === "queued")
    return [
      {
        time: "09:42:00",
        text: "Deployment queued. Waiting for an available runner.",
        tone: "muted",
      },
      {
        time: "09:42:00",
        text: "Region: iad1 · Runtime: Node 24",
        tone: "muted",
      },
    ];
  return base;
}

export const project = {
  name: "atlas-web",
  team: "acme",
  framework: "Next.js 16",
  domain: "atlas.acme.com",
  region: "Washington, D.C. (iad1)",
  runtime: "Node 24",
  buildCommand: "pnpm build",
  outputDirectory: ".next",
  nodeVersion: "24.x",
  createdAt: "Jan 12, 2026",
  lastDeploy: "2 minutes ago",
};

export const environmentVariables = [
  {
    key: "DATABASE_URL",
    value: "postgresql://••••••••@db.acme.com",
    scope: "Production",
  },
  {
    key: "STRIPE_SECRET_KEY",
    value: "sk_live_••••••••••••",
    scope: "Production",
  },
  { key: "NEXT_PUBLIC_APP_URL", value: "https://atlas.acme.com", scope: "All" },
];

export const domains = [
  { name: "atlas.acme.com", status: "Valid", primary: true },
  { name: "www.atlas.acme.com", status: "Valid", primary: false },
  { name: "atlas-git-main.acme.dev", status: "Valid", primary: false },
];

export const usage = [
  { name: "Bandwidth", value: 68, detail: "68 GB of 100 GB" },
  { name: "Build minutes", value: 42, detail: "420 of 1,000" },
];

export const navItems = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "deployments", label: "Deployments", icon: "rocket" },
  { id: "logs", label: "Logs", icon: "terminal" },
  { id: "analytics", label: "Usage", icon: "chart" },
  { id: "settings", label: "Settings", icon: "gear" },
] as const;

export function statusLabel(status: DeploymentStatus) {
  return status === "ready"
    ? "Ready"
    : status === "building"
      ? "Building"
      : status === "error"
        ? "Error"
        : "Queued";
}
