"use client";

import {
  ArrowsLeftRightIcon,
  CalculatorIcon,
  CheckCircleIcon,
  DownloadSimpleIcon,
  FileTextIcon,
  ListChecksIcon,
  PlayIcon,
  StopIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { AgentStatus } from "@/components/ui/agent-status";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/ui/disclosure";
import { InlineCode, Kbd } from "@/components/ui/kbd-code";
import { ProgressRing } from "@/components/ui/progress-ring";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import { showToast } from "@/components/ui/toast";
import {
  ToolCall,
  ToolCallCode,
  ToolCallPanel,
  ToolCallSection,
  ToolCallTrigger,
} from "@/components/ui/tool-call";
import {
  exceptionCsv,
  exceptions,
  formatElapsed,
  formatMoney,
  formatStamp,
  invoiceTotal,
  logLines,
  logText,
  purchaseOrderTotal,
  run,
  toolCalls,
} from "./data";

const steps = [
  {
    id: "received",
    title: "Invoice received",
    time: "10:38:02 AM",
    dateTime: "2026-10-30T10:38:02Z",
    description: "INV-8841.pdf · 6 pages",
    icon: FileTextIcon,
  },
  {
    id: "extracted",
    title: "Line items extracted",
    time: "10:38:09 AM",
    dateTime: "2026-10-30T10:38:09Z",
    description: "24 lines read at 98% confidence",
    icon: ListChecksIcon,
  },
  {
    id: "matched",
    title: "Purchase order matched",
    time: "10:38:16 AM",
    dateTime: "2026-10-30T10:38:16Z",
    description: "22 of 24 lines match PO-4471",
    icon: ArrowsLeftRightIcon,
  },
  {
    id: "totals",
    title: "Totals check",
    time: "10:38:19 AM",
    dateTime: "2026-10-30T10:38:19Z",
    description: "2 lines need review",
    icon: CalculatorIcon,
  },
  {
    id: "approval",
    title: "Approval",
    description: "Waits for your review",
    icon: CheckCircleIcon,
  },
] as const;

const difference = invoiceTotal - purchaseOrderTotal;

export function AgentRun() {
  const [status, setStatus] = useState<"working" | "stopped">("working");
  const [elapsed, setElapsed] = useState(run.elapsed);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (status !== "working") return;
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status !== "working") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setStatus("stopped");
      showToast({
        title: "Run stopped",
        description: "The invoice is unchanged. Resume when you are ready.",
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status]);

  function stopRun() {
    if (status !== "working") return;
    setStatus("stopped");
    showToast({
      title: "Run stopped",
      description: "The invoice is unchanged. Resume when you are ready.",
    });
  }

  function resumeRun() {
    setStatus("working");
    showToast({
      title: "Run resumed",
      description: "Fernway continues from the totals check.",
      variant: "success",
    });
  }

  function downloadExceptions() {
    const url = URL.createObjectURL(
      new Blob([exceptionCsv()], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "INV-8841-exceptions.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    showToast({
      title: "Exceptions exported",
      description: "The CSV file is in your downloads folder.",
      variant: "success",
    });
  }

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1120px] gap-5">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="grid gap-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                {run.agent}
              </h1>
              <Badge variant={status === "working" ? "accent" : "warning"} dot>
                {status === "working" ? "Running" : "Stopped"}
              </Badge>
              <span className="inline-flex items-center gap-0.5 font-mono text-xs text-muted-foreground">
                {run.id}
                <CopyButton
                  value={run.id}
                  iconOnly
                  variant="ghost"
                  size="xs"
                  aria-label="Copy run ID"
                />
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {run.vendor} · {run.invoice} · {formatMoney(invoiceTotal)}
            </p>
          </div>
          {status === "working" ? (
            <Button variant="outline" size="sm" onPress={stopRun}>
              <StopIcon size={16} weight="fill" aria-hidden="true" />
              Stop run
            </Button>
          ) : (
            <Button size="sm" onPress={resumeRun}>
              <PlayIcon size={16} weight="fill" aria-hidden="true" />
              Resume run
            </Button>
          )}
        </header>

        <h2 className="sr-only">Run status</h2>
        {showAlert && (
          <Alert
            variant="warning"
            title={`2 lines exceed ${run.purchaseOrder} by ${formatMoney(difference)}`}
            action={
              <Button variant="ghost" size="sm" onPress={downloadExceptions}>
                <DownloadSimpleIcon size={16} aria-hidden="true" />
                Download
              </Button>
            }
            onDismiss={() => setShowAlert(false)}
          >
            Review lines 12 and 18 before you approve the invoice.
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
          <AgentStatus
            state={status === "working" ? "working" : "error"}
            label={
              status === "working" ? "Checking line totals" : "Run stopped"
            }
            detail={
              status === "working"
                ? "Step 4 of 5 · 24 line totals"
                : "Stopped by you. Resume to continue from step 4."
            }
            className="items-center"
          />
          <Card className="flex flex-wrap items-center gap-4 px-4 py-3">
            <ProgressRing
              size="sm"
              value={run.progress}
              label="Progress"
              valueLabel={`${run.progress}%`}
              className="[&_[data-slot=progress-ring-label]]:sr-only"
            />
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div>
                <p className="text-xs text-muted-foreground">Elapsed</p>
                <p className="text-sm font-semibold tabular-nums">
                  {formatElapsed(elapsed)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Exceptions</p>
                <p className="text-sm font-semibold tabular-nums">
                  {exceptions.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid content-start gap-5">
            <Card>
              <CardHeader>
                <CardTitle as="h2">Run steps</CardTitle>
                <CardDescription>
                  {run.invoice} against {run.purchaseOrder}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-3">
                <Timeline aria-label="Run steps">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCurrent = step.id === "totals";
                    const stepStatus =
                      index < 3
                        ? "complete"
                        : isCurrent
                          ? status === "working"
                            ? "latest"
                            : "upcoming"
                          : "upcoming";
                    return (
                      <TimelineItem
                        key={step.id}
                        status={stepStatus}
                        className="pb-4"
                        icon={<Icon weight="bold" />}
                      >
                        <TimelineTitle className="text-sm leading-5">
                          {step.title}
                        </TimelineTitle>
                        {"time" in step && (
                          <TimelineTime
                            className="mt-0.5 leading-4"
                            dateTime={step.dateTime}
                          >
                            {step.time}
                          </TimelineTime>
                        )}
                        <TimelineDescription className="mt-0.5 text-[13px] leading-5">
                          {isCurrent && status === "stopped"
                            ? "Stopped before the check finished."
                            : step.description}
                        </TimelineDescription>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </CardContent>
            </Card>

            <section aria-labelledby="tools-title" className="grid gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="tools-title" className="text-sm font-semibold">
                  Tool calls
                </h2>
                <p className="text-xs text-muted-foreground">
                  {status === "working" ? "3 of 3 started" : "2 of 3 complete"}
                </p>
              </div>
              <ToolCall className="w-full">
                <ToolCallTrigger
                  name={toolCalls.extract.name}
                  status="complete"
                  summary={toolCalls.extract.summary}
                  className="min-h-11 py-2"
                />
                <ToolCallPanel>
                  <ToolCallSection label="Input">
                    <ToolCallCode>{toolCalls.extract.input}</ToolCallCode>
                  </ToolCallSection>
                  <ToolCallSection label="Output">
                    <ToolCallCode>{toolCalls.extract.output}</ToolCallCode>
                  </ToolCallSection>
                </ToolCallPanel>
              </ToolCall>
              <ToolCall className="w-full">
                <ToolCallTrigger
                  name={toolCalls.match.name}
                  status="complete"
                  summary={toolCalls.match.summary}
                  className="min-h-11 py-2"
                />
                <ToolCallPanel>
                  <ToolCallSection label="Input">
                    <ToolCallCode>{toolCalls.match.input}</ToolCallCode>
                  </ToolCallSection>
                  <ToolCallSection label="Output">
                    <ToolCallCode>{toolCalls.match.output}</ToolCallCode>
                  </ToolCallSection>
                </ToolCallPanel>
              </ToolCall>
              <ToolCall className="w-full">
                <ToolCallTrigger
                  name={toolCalls.totals.name}
                  status={status === "working" ? "running" : "error"}
                  summary={
                    status === "working"
                      ? toolCalls.totals.summary
                      : "Stopped before the check finished"
                  }
                  className="min-h-11 py-2"
                />
                <ToolCallPanel>
                  <ToolCallSection label="Input">
                    <ToolCallCode>{toolCalls.totals.input}</ToolCallCode>
                  </ToolCallSection>
                  <ToolCallSection label="Output">
                    <ToolCallCode>{toolCalls.totals.output}</ToolCallCode>
                  </ToolCallSection>
                </ToolCallPanel>
              </ToolCall>
            </section>

            <section aria-labelledby="log-title" className="grid gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="log-title" className="text-sm font-semibold">
                  Run log
                </h2>
                <CopyButton value={logText} size="xs" variant="ghost" />
              </div>
              <Disclosure defaultExpanded>
                <DisclosureHeader>
                  <span className="flex flex-wrap items-baseline gap-2">
                    Events
                    <span className="text-xs font-normal text-muted-foreground">
                      {logLines.length} entries
                    </span>
                  </span>
                </DisclosureHeader>
                <DisclosurePanel>
                  <div className="grid gap-1 font-mono text-xs">
                    {logLines.map((line) => (
                      <div
                        key={`${line.time}-${line.event}`}
                        className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5"
                      >
                        <span className="shrink-0 text-muted-foreground tabular-nums">
                          {line.time}
                        </span>
                        <InlineCode className="shrink-0 text-[11px]">
                          {line.event}
                        </InlineCode>
                        <span className="min-w-0 text-muted-foreground [overflow-wrap:anywhere]">
                          {line.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-border/70 pt-3">
                    {status === "working" ? (
                      <p className="text-xs text-muted-foreground">
                        Press <Kbd>Esc</Kbd> to stop the run.
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Run stopped. Resume to continue.
                      </p>
                    )}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </section>
          </div>

          <aside className="grid content-start gap-5">
            <Card>
              <CardHeader>
                <CardTitle as="h2">Run details</CardTitle>
              </CardHeader>
              <CardContent>
                <DescriptionList className="gap-y-2">
                  <DescriptionTerm>Agent</DescriptionTerm>
                  <DescriptionDetail>{run.agent}</DescriptionDetail>
                  <DescriptionTerm>Started</DescriptionTerm>
                  <DescriptionDetail>
                    {formatStamp(run.startedAt)}
                  </DescriptionDetail>
                  <DescriptionTerm>Elapsed</DescriptionTerm>
                  <DescriptionDetail className="tabular-nums">
                    {formatElapsed(elapsed)}
                  </DescriptionDetail>
                  <DescriptionTerm>Model</DescriptionTerm>
                  <DescriptionDetail className="font-mono text-xs font-normal">
                    {run.model}
                  </DescriptionDetail>
                  <DescriptionTerm>Cost</DescriptionTerm>
                  <DescriptionDetail className="tabular-nums">
                    {formatMoney(run.cost)}
                  </DescriptionDetail>
                </DescriptionList>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Output</CardTitle>
                <CardDescription>{run.purchaseOrder}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <DescriptionList className="gap-y-2">
                  <DescriptionTerm>Lines read</DescriptionTerm>
                  <DescriptionDetail className="tabular-nums">
                    {run.lines}
                  </DescriptionDetail>
                  <DescriptionTerm>Matched</DescriptionTerm>
                  <DescriptionDetail className="tabular-nums">
                    {run.matched}
                  </DescriptionDetail>
                  <DescriptionTerm>Invoice total</DescriptionTerm>
                  <DescriptionDetail className="tabular-nums">
                    {formatMoney(invoiceTotal)}
                  </DescriptionDetail>
                  <DescriptionTerm>PO total</DescriptionTerm>
                  <DescriptionDetail className="tabular-nums">
                    {formatMoney(purchaseOrderTotal)}
                  </DescriptionDetail>
                </DescriptionList>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onPress={downloadExceptions}
                >
                  <DownloadSimpleIcon size={16} aria-hidden="true" />
                  Download exceptions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Files</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <FileTextIcon
                    size={16}
                    aria-hidden="true"
                    className="text-muted-foreground"
                  />
                  <span className="min-w-0 flex-1 truncate">INV-8841.pdf</span>
                  <span className="text-xs text-muted-foreground">1.2 MB</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileTextIcon
                    size={16}
                    aria-hidden="true"
                    className="text-muted-foreground"
                  />
                  <span className="min-w-0 flex-1 truncate">PO-4471.pdf</span>
                  <span className="text-xs text-muted-foreground">842 KB</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
