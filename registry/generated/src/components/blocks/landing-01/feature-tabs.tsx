"use client";

import {
  ArrowRightIcon,
  BellRingingIcon,
  CheckIcon,
  FunnelIcon,
  PathIcon,
  RepeatIcon,
} from "@phosphor-icons/react";
import { Badge } from "../../vip-ui/badge";
import { ButtonLink } from "../../vip-ui/button-link";
import { StaggerGroup, StaggerItem } from "../../vip-ui/stagger-group";
import { Tab, TabList, TabPanel, Tabs } from "../../vip-ui/tabs";

const features = [
  {
    id: "funnels",
    label: "Funnels",
    icon: FunnelIcon,
    title: "Find the step that loses people.",
    body: "Build a funnel in four clicks. Compare two periods. Share the link with your team.",
    points: [
      "Drop-off by step, device, and plan",
      "Compare two date ranges side by side",
      "Export to CSV or send to Slack",
    ],
  },
  {
    id: "journeys",
    label: "Journeys",
    icon: PathIcon,
    title: "Follow the path, not the pageview.",
    body: "See where people go after they sign up. Split the path by channel and plan.",
    points: [
      "Branch on any event or property",
      "See the ten most common paths",
      "Pin a path to a dashboard",
    ],
  },
  {
    id: "retention",
    label: "Retention",
    icon: RepeatIcon,
    title: "Know who comes back, and why.",
    body: "Group users by the week they join. Find the habit that holds them.",
    points: [
      "Weekly and monthly cohorts",
      "Break down by feature use",
      "Save a cohort for alerts",
    ],
  },
  {
    id: "alerts",
    label: "Alerts",
    icon: BellRingingIcon,
    title: "Hear about the drop first.",
    body: "Set a rule on any metric. Trellis tells you in Slack before the standup.",
    points: [
      "Threshold and change alerts",
      "Quiet hours for each channel",
      "Links to the exact segment",
    ],
  },
] as const;

const funnel = [
  { label: "Opened checkout", count: 24180 },
  { label: "Added payment", count: 9842 },
  { label: "Confirmed order", count: 6116 },
  { label: "Returned in 30 days", count: 1204 },
];

const journey = [
  { label: "Viewed pricing", count: 9842, share: "40.7%" },
  { label: "Started a trial", count: 3116, share: "31.7%" },
  { label: "Invited a teammate", count: 1204, share: "38.6%" },
  { label: "Upgraded to Team", count: 486, share: "40.4%" },
];

const cohorts = [
  { week: "Sep 7", values: [100, 61, 47, 39, 34, 31] },
  { week: "Sep 14", values: [100, 63, 48, 41, 36] },
  { week: "Sep 21", values: [100, 60, 46, 38] },
  { week: "Sep 28", values: [100, 64, 49] },
  { week: "Oct 5", values: [100, 62] },
  { week: "Oct 12", values: [100] },
];

const weekColumns = [0, 1, 2, 3, 4, 5];

const activeAlerts = [
  {
    id: "drop",
    title: "Checkout conversion fell 18%",
    detail: "Oct 28, 09:14 · #growth",
    variant: "warning" as const,
  },
  {
    id: "lift",
    title: "Trial to paid is up 9%",
    detail: "Oct 27, 16:02 · Email",
    variant: "success" as const,
  },
  {
    id: "digest",
    title: "Weekly digest sent",
    detail: "Oct 26, 08:00 · #product",
    variant: "neutral" as const,
  },
];

function FunnelPreview() {
  return (
    <div className="rounded-xl bg-background/70 p-4 ring-1 ring-border/70 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Checkout funnel</p>
          <p className="text-xs text-muted-foreground">Sep 1 – Oct 31, 2026</p>
        </div>
        <Badge variant="outline">4 steps</Badge>
      </div>
      <div className="mt-5 grid gap-4">
        {funnel.map((step, index) => {
          const percent = Math.round((step.count / funnel[0].count) * 100);
          return (
            <div key={step.label} className="grid gap-1.5">
              <div className="flex items-baseline justify-between gap-3 text-xs">
                <span className="font-medium">{step.label}</span>
                <span className="tabular-nums text-muted-foreground">
                  {step.count.toLocaleString("en-US")}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary/85"
                  style={{ width: `${Math.max(percent, 4)}%` }}
                />
              </div>
              {index < funnel.length - 1 && (
                <p className="text-[11px] text-muted-foreground">
                  {percent}% of sessions reach this step
                </p>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 border-t border-border/70 pt-3 text-xs text-muted-foreground">
        24,180 sessions · 5.0% finish checkout
      </p>
    </div>
  );
}

function JourneyPreview() {
  return (
    <div className="rounded-xl bg-background/70 p-4 ring-1 ring-border/70 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Signup path</p>
          <p className="text-xs text-muted-foreground">Paid search · 30 days</p>
        </div>
        <Badge variant="accent">Top path</Badge>
      </div>
      <ol className="relative mt-5 grid gap-2">
        <span
          aria-hidden="true"
          className="absolute start-[15px] top-5 bottom-5 w-px bg-border"
        />
        {journey.map((step, index) => (
          <li
            key={step.label}
            className="relative flex items-center gap-3 rounded-lg bg-card px-3 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-border/60"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold tabular-nums">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{step.label}</p>
              <p className="text-xs tabular-nums text-muted-foreground">
                {step.count.toLocaleString("en-US")} people
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-success-subtle px-2 py-0.5 text-[11px] font-medium text-success-foreground">
              {step.share}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t border-border/70 pt-3 text-xs text-muted-foreground">
        The share is the part of people who move to the next step.
      </p>
    </div>
  );
}

function RetentionPreview() {
  return (
    <div className="rounded-xl bg-background/70 p-4 ring-1 ring-border/70 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Weekly retention</p>
          <p className="text-xs text-muted-foreground">
            New teams · Sep 7 – Oct 12
          </p>
        </div>
        <Badge variant="outline">Week 0 to week 5</Badge>
      </div>
      <div className="mt-5 grid grid-cols-[3.5rem_repeat(6,minmax(0,1fr))] gap-1 text-[10px]">
        <span aria-hidden="true" />
        {weekColumns.map((column) => (
          <span
            key={`head-${column}`}
            className="text-center font-medium text-muted-foreground"
          >
            W{column}
          </span>
        ))}
        {cohorts.map((cohort) => (
          <div key={cohort.week} className="contents">
            <span className="flex items-center text-muted-foreground">
              {cohort.week}
            </span>
            {weekColumns.map((column) => {
              const value = cohort.values[column];
              return (
                <span
                  key={`${cohort.week}-w${column}`}
                  className="grid aspect-square place-items-center rounded-[4px] text-[10px] font-medium tabular-nums text-foreground/90"
                  style={{
                    backgroundColor:
                      value === undefined
                        ? "transparent"
                        : `color-mix(in oklab, var(--primary) ${Math.round(value * 0.28)}%, var(--card))`,
                  }}
                >
                  {value ?? ""}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-border/70 pt-3 text-xs text-muted-foreground">
        Week 4 holds at 34%. Teams that invite a teammate stay longer.
      </p>
    </div>
  );
}

function AlertsPreview() {
  return (
    <div className="rounded-xl bg-background/70 p-4 ring-1 ring-border/70 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Active alerts</p>
          <p className="text-xs text-muted-foreground">Last 3 days</p>
        </div>
        <Badge variant="outline">3 rules</Badge>
      </div>
      <div className="mt-5 grid gap-2.5">
        {activeAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 rounded-lg bg-card px-3 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-border/60"
          >
            <span className="mt-0.5 size-2 shrink-0 rounded-full bg-current text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{alert.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {alert.detail}
              </p>
            </div>
            <Badge variant={alert.variant}>
              {alert.variant === "warning"
                ? "Check"
                : alert.variant === "success"
                  ? "Good"
                  : "Info"}
            </Badge>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-border/70 pt-3 text-xs text-muted-foreground">
        Quiet hours run from 20:00 to 08:00 in your local time.
      </p>
    </div>
  );
}

function FeaturePreview({ id }: { id: string }) {
  if (id === "journeys") return <JourneyPreview />;
  if (id === "retention") return <RetentionPreview />;
  if (id === "alerts") return <AlertsPreview />;
  return <FunnelPreview />;
}

export function FeatureTabs() {
  return (
    <Tabs defaultValue="funnels" className="mt-8">
      <div className="flex justify-center">
        <TabList aria-label="Trellis features" size="md">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Tab key={feature.id} id={feature.id} className="px-3 sm:px-4">
                <Icon
                  size={16}
                  aria-hidden="true"
                  className="hidden sm:block"
                />
                {feature.label}
              </Tab>
            );
          })}
        </TabList>
      </div>
      {features.map((feature) => (
        <TabPanel
          key={feature.id}
          id={feature.id}
          className="mt-6 bg-transparent p-0 shadow-none ring-0 focus-visible:shadow-none"
        >
          <div className="grid items-center gap-8 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:p-8">
            <FeaturePreview id={feature.id} />
            <div className="min-w-0 lg:ps-2">
              <h3 className="text-balance text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {feature.body}
              </p>
              <StaggerGroup
                as="ul"
                trigger="mount"
                className="mt-5 grid gap-2.5"
              >
                {feature.points.map((point) => (
                  <StaggerItem
                    as="li"
                    key={point}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                      <CheckIcon size={12} weight="bold" aria-hidden="true" />
                    </span>
                    {point}
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <ButtonLink
                href="/blocks/pricing-02"
                variant="minimal"
                size="sm"
                className="mt-6 -ms-2"
              >
                See plans
                <ArrowRightIcon size={16} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
}
