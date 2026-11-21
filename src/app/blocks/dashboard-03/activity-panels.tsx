"use client";

import {
  ArrowsClockwiseIcon,
  RocketLaunchIcon,
  SlidersHorizontalIcon,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import { alerts, deploys, formatDayClock } from "./data";

export function AlertsCard() {
  const firing = alerts.filter((alert) => alert.state === "firing").length;
  return (
    <Card id="alerts" className="min-w-0 scroll-mt-24">
      <CardHeader>
        <CardTitle as="h2">Alerts</CardTitle>
        <CardDescription>
          {firing} firing · {alerts.length - firing} resolved in the last 24
          hours
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ul className="divide-y divide-border/70 border-t border-border/70">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 px-5 py-3"
            >
              <span
                aria-hidden="true"
                className={
                  alert.state === "resolved"
                    ? "mt-1.5 size-2 rounded-full bg-muted-foreground/40"
                    : alert.severity === "critical"
                      ? "mt-1.5 size-2 rounded-full bg-destructive ring-4 ring-destructive/15"
                      : "mt-1.5 size-2 rounded-full bg-warning ring-4 ring-warning/15"
                }
              />
              <div className="min-w-0">
                <p
                  className={
                    alert.state === "resolved"
                      ? "truncate text-sm text-muted-foreground"
                      : "truncate text-sm font-medium"
                  }
                >
                  {alert.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  <span className="font-mono">{alert.service}</span> · started{" "}
                  {alert.started} · {alert.duration}
                </p>
              </div>
              {alert.state === "firing" ? (
                <Badge
                  variant={alert.severity === "critical" ? "error" : "warning"}
                >
                  {alert.severity === "critical" ? "Critical" : "Warning"}
                </Badge>
              ) : (
                <Badge variant="neutral">Resolved</Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

const icons = {
  "Restart node rc-3": ArrowsClockwiseIcon,
};

export function ChangesCard() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle as="h2">Changes</CardTitle>
        <CardDescription>Deploys and operator actions, UTC</CardDescription>
      </CardHeader>
      <CardContent>
        <Timeline aria-label="Recent changes">
          {deploys.map((deploy) => {
            const Icon =
              icons[deploy.title as keyof typeof icons] ??
              (deploy.kind === "deploy"
                ? RocketLaunchIcon
                : SlidersHorizontalIcon);
            return (
              <TimelineItem
                key={deploy.id}
                status="complete"
                icon={<Icon weight="bold" />}
                className="pb-4"
              >
                <TimelineTitle className="text-sm">
                  <span className="font-mono text-[13px]">
                    {deploy.service}
                  </span>{" "}
                  · {deploy.title}
                </TimelineTitle>
                <TimelineTime dateTime={new Date(deploy.time).toISOString()}>
                  {formatDayClock(deploy.time)}
                </TimelineTime>
                <TimelineDescription className="text-xs">
                  {deploy.author}
                </TimelineDescription>
              </TimelineItem>
            );
          })}
        </Timeline>
      </CardContent>
    </Card>
  );
}
