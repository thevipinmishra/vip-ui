"use client";

import { CheckCircleIcon, PulseIcon, WarningIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Alert } from "../../../components/vip-ui/alert";
import { Badge } from "../../../components/vip-ui/badge";
import { Button } from "../../../components/vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/vip-ui/card";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "../../../components/vip-ui/disclosure";
import { Form } from "../../../components/vip-ui/form";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "../../../components/vip-ui/text-field";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "../../../components/vip-ui/timeline";
import { showToast } from "../../../components/vip-ui/toast";
import { incidents, type ServiceState, services, stateLabels } from "./data";
import { UptimeChart } from "./uptime-chart";

const badgeVariants: Record<ServiceState, "success" | "warning" | "error"> = {
  operational: "success",
  degraded: "warning",
  outage: "error",
};

function jumpTo(id: string, selector: string) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    node.querySelector<HTMLElement>(selector)?.focus();
  }, 420);
}

export function StatusPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const emailField = useRef<HTMLDivElement>(null);
  const anotherEmail = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (subscribed) anotherEmail.current?.focus();
  }, [subscribed]);

  const degraded = services.filter(
    (service) => service.state !== "operational",
  ).length;

  function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const address = String(data.get("email") ?? "").trim();
    if (!address) {
      setEmailError("Enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setEmailError("Use the format name@company.com.");
      return;
    }
    setEmailError("");
    setSubscribed(address);
    setEmail("");
    showToast({
      title: "You are subscribed",
      description: `We send updates to ${address}.`,
      variant: "success",
    });
  }

  function resetEmail() {
    setSubscribed(null);
    setEmailError("");
    requestAnimationFrame(() => {
      emailField.current?.querySelector("input")?.focus();
    });
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
            >
              <PulseIcon size={20} weight="bold" />
            </span>
            <div className="flex min-w-0 items-baseline gap-2">
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                Cobalt
              </p>
              <span className="text-sm text-muted-foreground">Status</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="mailto:support@cobalt.app"
              className="hidden rounded-sm px-2 py-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:block"
            >
              Contact support
            </a>
            <Button
              variant="outline"
              size="sm"
              onPress={() => jumpTo("subscribe", "input")}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 lg:py-10">
        <Card className="overflow-hidden bg-warning-subtle text-warning-foreground ring-warning/25">
          <div className="flex flex-wrap items-start gap-4 p-5 sm:p-6">
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-full bg-warning/15 text-warning"
            >
              <WarningIcon size={28} weight="fill" />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                Some services are degraded
              </h1>
              <p className="mt-1 text-sm leading-6">
                Report loads are slower than usual. Boards and search are not
                affected.
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end">
              <div className="text-sm sm:text-end">
                <p className="font-medium">Updated 2 minutes ago</p>
                <p className="mt-0.5 text-xs text-warning-foreground/80">
                  31 October 2026, 11:08 UTC
                </p>
              </div>
              <Button
                variant="outline"
                size="xs"
                onPress={() =>
                  jumpTo("incident-reports", "[data-slot=disclosure-header]")
                }
              >
                Read update
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div id="uptime" className="min-w-0 scroll-mt-24">
            <UptimeChart />
          </div>

          <Card className="min-w-0">
            <CardHeader>
              <CardTitle as="h2">Services</CardTitle>
              <CardDescription>
                {services.length} components · {degraded} degraded
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0 pt-2">
              <ul className="divide-y divide-border/70 border-t border-border/70">
                {services.map((service) => (
                  <li
                    key={service.name}
                    className="flex items-center justify-between gap-3 px-5 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                        {service.uptime} uptime
                      </p>
                    </div>
                    {service.state === "operational" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircleIcon
                          size={16}
                          weight="fill"
                          aria-hidden="true"
                          className="text-success"
                        />
                        <span className="sr-only">Operational</span>
                      </span>
                    ) : (
                      <Badge variant={badgeVariants[service.state]}>
                        {stateLabels[service.state]}
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <section
          id="incidents"
          aria-labelledby="incidents-title"
          className="grid scroll-mt-24 gap-4"
        >
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2
                id="incidents-title"
                className="text-lg font-semibold tracking-[-0.03em]"
              >
                Incident history
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Last 90 days. Newest first.
              </p>
            </div>
            <Badge variant="neutral">{incidents.length} incidents</Badge>
          </div>
          <div className="grid gap-3">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                id={`incident-${incident.id}`}
                className="scroll-mt-24"
              >
                <Disclosure defaultExpanded={incident.active}>
                  <DisclosureHeader>
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>{incident.title}</span>
                      <Badge
                        variant={
                          incident.status === "Monitoring"
                            ? "warning"
                            : "success"
                        }
                      >
                        {incident.status}
                      </Badge>
                      <span className="text-xs font-normal text-muted-foreground">
                        {incident.date}
                      </span>
                    </span>
                  </DisclosureHeader>
                  <DisclosurePanel>
                    <Timeline aria-label={`Updates for ${incident.title}`}>
                      {incident.updates.map((update, index) => (
                        <TimelineItem
                          key={update.dateTime}
                          className="pb-4"
                          status={
                            incident.active && index === 0
                              ? "latest"
                              : "complete"
                          }
                        >
                          <TimelineTitle className="text-sm">
                            {update.title}
                          </TimelineTitle>
                          <TimelineTime dateTime={update.dateTime}>
                            {update.time}
                          </TimelineTime>
                          <TimelineDescription className="text-[13px] leading-5">
                            {update.body}
                          </TimelineDescription>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            ))}
          </div>
        </section>

        <Card id="subscribe" className="scroll-mt-24 p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] sm:items-center sm:gap-8">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.025em]">
                Get status updates
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                We email you when an incident starts or changes.
              </p>
            </div>
            {subscribed ? (
              <Alert
                variant="success"
                title="You are subscribed"
                action={
                  <Button
                    ref={anotherEmail}
                    variant="outline"
                    size="sm"
                    onPress={resetEmail}
                  >
                    Use another email
                  </Button>
                }
              >
                Updates go to {subscribed}.
              </Alert>
            ) : (
              <Form
                className="gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
                onSubmit={subscribe}
              >
                <TextField
                  ref={emailField}
                  name="email"
                  size="sm"
                  value={email}
                  isInvalid={Boolean(emailError)}
                  onChange={(value) => {
                    setEmail(value);
                    if (emailError) setEmailError("");
                  }}
                >
                  <TextFieldLabel>Email</TextFieldLabel>
                  <TextFieldInput
                    type="text"
                    inputMode="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    aria-required="true"
                  />
                  <TextFieldError>{emailError}</TextFieldError>
                </TextField>
                <Button type="submit" size="sm" className="max-sm:w-full">
                  Subscribe
                </Button>
              </Form>
            )}
          </div>
        </Card>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircleIcon
            size={15}
            aria-hidden="true"
            className="text-success"
          />
          Uptime uses one-minute checks from three regions.
        </p>
      </main>

      <footer className="border-t border-border/70 bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:px-6">
          <p>© 2026 Cobalt.</p>
          <nav aria-label="Status links" className="flex flex-wrap gap-4">
            <a
              href="#uptime"
              className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Uptime
            </a>
            <a
              href="#incidents"
              className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              History
            </a>
            <a
              href="mailto:support@cobalt.app"
              className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
