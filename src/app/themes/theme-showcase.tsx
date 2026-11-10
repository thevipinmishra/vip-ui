"use client";

import { parseDate } from "@internationalized/date";
import {
  ArrowUpRightIcon,
  DotsThreeIcon,
  DownloadSimpleIcon,
  EyeIcon,
  PaperPlaneRightIcon,
  PlusIcon,
  SparkleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { areaY, defineChart, lineY } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { pie, polar, radialArc } from "@tanstack/charts/polar";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useId, useMemo, useRef, useState } from "react";
import { ChartPlot } from "@/components/charts/chart-plot";
import { AgentStatus } from "@/components/ui/agent-status";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Chart,
  ChartCenter,
  ChartFrame,
  ChartTable,
  ChartValue,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Message } from "@/components/ui/message";
import { ProgressRing } from "@/components/ui/progress-ring";
import { SearchField } from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { TextField, TextFieldLabel } from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { ToolCall, ToolCallTrigger } from "@/components/ui/tool-call";
import { cn } from "@/lib/utils";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const moneyCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

type Period = "7d" | "30d" | "12m";
type RevenuePoint = { label: string; current: number; previous: number };

const revenue: Record<Period, RevenuePoint[]> = {
  "7d": [
    { label: "Mon", current: 6.2, previous: 5.4 },
    { label: "Tue", current: 7.1, previous: 6.1 },
    { label: "Wed", current: 6.8, previous: 6.6 },
    { label: "Thu", current: 8.4, previous: 6.2 },
    { label: "Fri", current: 9.6, previous: 7.4 },
    { label: "Sat", current: 5.3, previous: 4.9 },
    { label: "Sun", current: 4.8, previous: 4.4 },
  ],
  "30d": [
    { label: "Sep 10", current: 38, previous: 34 },
    { label: "Sep 15", current: 41, previous: 36 },
    { label: "Sep 20", current: 39, previous: 37 },
    { label: "Sep 25", current: 46, previous: 38 },
    { label: "Sep 30", current: 52, previous: 41 },
    { label: "Oct 5", current: 57, previous: 43 },
  ],
  "12m": [
    { label: "Nov", current: 142, previous: 118 },
    { label: "Dec", current: 156, previous: 131 },
    { label: "Jan", current: 149, previous: 127 },
    { label: "Feb", current: 163, previous: 134 },
    { label: "Mar", current: 171, previous: 140 },
    { label: "Apr", current: 168, previous: 151 },
    { label: "May", current: 184, previous: 155 },
    { label: "Jun", current: 197, previous: 162 },
    { label: "Jul", current: 205, previous: 170 },
    { label: "Aug", current: 214, previous: 181 },
    { label: "Sep", current: 229, previous: 186 },
    { label: "Oct", current: 241, previous: 195 },
  ],
};

const periodLabels: Record<Period, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "12m": "12 months",
};

function RevenueScene({ className }: { className?: string }) {
  const [period, setPeriod] = useState<Period>("30d");
  const rows = revenue[period];
  const total = rows.reduce((sum, row) => sum + row.current, 0) * 1000;
  const previous = rows.reduce((sum, row) => sum + row.previous, 0) * 1000;
  const change = ((total - previous) / previous) * 100;
  const max = Math.max(...rows.map((row) => row.current));
  const definition = useMemo(
    () =>
      defineChart({
        marks: [
          decorative(
            areaY(rows, {
              id: "revenue-fill",
              x: "label",
              y: "current",
              fill: "var(--ts-chart-1)",
              fillOpacity: 0.12,
            }),
          ),
          lineY(rows, {
            id: "revenue-previous",
            x: "label",
            y: "previous",
            stroke: "var(--muted-foreground)",
            strokeWidth: 1.5,
            strokeDasharray: "4 4",
          }),
          lineY(rows, {
            id: "revenue-current",
            x: "label",
            y: "current",
            stroke: "var(--ts-chart-1)",
            strokeWidth: 2.25,
          }),
        ],
        scales: {
          x: { scale: scalePoint },
          y: {
            scale: scaleLinear().domain([0, max * 1.15]),
            grid: true,
            axis: {
              ticks: {
                count: 4,
                format: (value: number) => moneyCompact.format(value * 1000),
              },
            },
          },
        },
        focus: "group-x",
        tooltip: {
          use: tooltip,
          content: ([point]) => ({
            title: point.datum.label,
            rows: [
              {
                label: "This period",
                value: money.format(point.datum.current * 1000),
                color: "var(--ts-chart-1)",
              },
              {
                label: "Last period",
                value: money.format(point.datum.previous * 1000),
                color: "var(--muted-foreground)",
              },
            ],
          }),
        },
      }),
    [rows, max],
  );

  return (
    <Card className={cn("flex min-w-0 flex-col", className)}>
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-4">
        <div className="grid gap-1">
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Net volume across every workspace.</CardDescription>
        </div>
        <ToggleButtonGroup
          aria-label="Revenue period"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[period]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next === "7d" || next === "30d" || next === "12m") {
              setPeriod(next);
            }
          }}
        >
          {(["7d", "30d", "12m"] as const).map((key) => (
            <ToggleButton
              key={key}
              id={key}
              variant="segmented"
              aria-label={periodLabels[key]}
            >
              {key.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </CardHeader>
      <CardContent className="grid gap-2 pb-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <AnimatedNumber
            value={total}
            formatOptions={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }}
            className="text-4xl font-semibold tracking-[-0.04em] tabular-nums"
          />
          <Badge variant="success">
            <ArrowUpRightIcon size={13} weight="bold" aria-hidden="true" />
            {change.toFixed(1)}%
          </Badge>
          <span className="text-sm text-muted-foreground">
            vs. the previous {periodLabels[period]}
          </span>
        </div>
        <div className="relative -mx-4 sm:-mx-5">
          <ChartPlot
            title={`Revenue over ${periodLabels[period]}, in thousands of dollars`}
            columns={["Period", "This period", "Last period"]}
            rows={rows.map((row) => [row.label, row.current, row.previous])}
            legend={[
              { label: "This period", color: "var(--ts-chart-1)" },
              { label: "Last period", color: "var(--muted-foreground)" },
            ]}
          >
            <Chart
              definition={definition}
              height={210}
              initialWidth={640}
              ariaLabel={`Revenue for this period and the last, over ${periodLabels[period]}`}
            />
          </ChartPlot>
        </div>
      </CardContent>
      <dl className="grid grid-cols-3 border-t border-border/70">
        {[
          { label: "Subscriptions", value: "2,431", detail: "+4.1%" },
          { label: "Average order", value: "$86.40", detail: "+$3.10" },
          { label: "Refund rate", value: "0.8%", detail: "−0.2 pts" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "grid gap-1 px-5 py-4",
              index > 0 && "border-l border-border/70",
            )}
          >
            <dt className="text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="flex flex-wrap items-baseline gap-x-2 text-lg font-semibold tracking-[-0.02em] tabular-nums">
              {stat.value}
              <span className="text-xs font-medium text-success-foreground">
                {stat.detail}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

const plans = [
  { plan: "Starter", revenue: 31400, color: "var(--chart-1)" },
  { plan: "Growth", revenue: 88200, color: "var(--chart-2)" },
  { plan: "Scale", revenue: 104900, color: "var(--chart-3)" },
  { plan: "Enterprise", revenue: 48500, color: "var(--chart-4)" },
];

const planTotal = plans.reduce((sum, row) => sum + row.revenue, 0);

const share = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 0,
});

const planDefinition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.92,
      marks: [
        radialArc(pie(plans, { value: "revenue", gapAngle: 0.03 }), {
          color: "plan",
          key: "plan",
          innerRadius: ({ radius }) => radius * 0.7,
          cornerRadius: 4,
        }),
      ],
      scales: { angle: null, radius: null },
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: plans.map((row) => row.plan),
    range: plans.map((row) => row.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.plan,
      rows: [
        {
          label: "Revenue",
          value: money.format(point.datum.revenue),
          color: point.color,
        },
        {
          label: "Share",
          value: share.format(point.datum.revenue / planTotal),
        },
      ],
    }),
  },
});

function PlanMixScene({ className }: { className?: string }) {
  return (
    <Card className={cn("flex min-w-0 flex-col", className)}>
      <CardHeader>
        <CardTitle>Revenue by plan</CardTitle>
        <CardDescription>Last 30 days.</CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 content-center gap-6">
        <ChartFrame variant="plain">
          <Chart
            definition={planDefinition}
            height={196}
            initialWidth={360}
            ariaLabel={`${money.format(planTotal)} in revenue across the Starter, Growth, Scale and Enterprise plans`}
          >
            <ChartCenter aria-hidden="true">
              <ChartValue>{moneyCompact.format(planTotal)}</ChartValue>
              <span className="text-xs text-muted-foreground">Total</span>
            </ChartCenter>
          </Chart>
          <ChartTable
            caption="Revenue by plan, last 30 days"
            columns={["Plan", "Revenue", "Share"]}
            rows={plans.map((row) => [
              row.plan,
              money.format(row.revenue),
              share.format(row.revenue / planTotal),
            ])}
          />
        </ChartFrame>
        <ul aria-hidden="true" className="grid gap-2.5 text-sm">
          {plans.map((row) => (
            <li key={row.plan} className="flex items-center gap-2.5">
              <span
                className="size-2.5 shrink-0 rounded-[3px]"
                style={{ background: row.color }}
              />
              <span className="min-w-0 flex-1 truncate">{row.plan}</span>
              <span className="text-muted-foreground tabular-nums">
                {share.format(row.revenue / planTotal)}
              </span>
              <span className="w-16 text-end font-medium tabular-nums">
                {moneyCompact.format(row.revenue)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

const payouts = [
  { week: "Aug 27", amount: 12140 },
  { week: "Sep 3", amount: 13420 },
  { week: "Sep 10", amount: 12860 },
  { week: "Sep 17", amount: 14910 },
  { week: "Sep 24", amount: 15630 },
  { week: "Oct 1", amount: 14280 },
  { week: "Oct 8", amount: 16790 },
  { week: "Oct 15", amount: 18420 },
];

const payoutMax = Math.max(...payouts.map((payout) => payout.amount));

const payoutSurface = cn(
  "[--payout-bg:var(--primary)] [--payout-text:var(--primary-foreground)] [--payout-ink:var(--primary-foreground)] [--payout-on-ink:var(--primary)]",
  "dark:[--payout-bg:color-mix(in_oklab,var(--primary)_14%,var(--card))] dark:[--payout-text:var(--card-foreground)] dark:[--payout-ink:var(--primary)] dark:[--payout-on-ink:var(--primary-foreground)]",
  "bg-(--payout-bg) text-(--payout-text) ring-[color-mix(in_oklab,var(--payout-ink)_18%,var(--payout-bg))]",
);

function PayoutScene({ className }: { className?: string }) {
  const next = payouts[payouts.length - 1];
  return (
    <Card className={cn("flex min-w-0 flex-col", payoutSurface, className)}>
      <CardHeader>
        <CardTitle>Next payout</CardTitle>
        <CardDescription className="text-(--payout-text)/75">
          Thursday, Oct 15 to Chase •• 4821
        </CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 grid-rows-[auto_minmax(5rem,1fr)] gap-5">
        <p className="text-4xl font-semibold tracking-[-0.04em] tabular-nums">
          {money.format(next.amount)}
        </p>
        <div
          role="img"
          aria-label={`Weekly payouts since ${payouts[0].week}, from ${money.format(payouts[0].amount)} to ${money.format(next.amount)}`}
          className="flex items-end gap-1.5"
        >
          {payouts.map((payout) => (
            <span
              key={payout.week}
              className="flex-1 rounded-sm bg-(--payout-ink)/25 last:bg-(--payout-ink)"
              style={{ height: `${(payout.amount / payoutMax) * 100}%` }}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-sm text-(--payout-text)/75">
          Paid out every Thursday
        </span>
        <Button
          size="sm"
          className="bg-(--payout-ink) text-(--payout-on-ink) hover:bg-(--payout-ink)/90 pressed:bg-(--payout-ink)/90 focus-visible:outline-(--payout-ink)"
          onPress={() =>
            showToast({
              title: "Payout started",
              description: `${money.format(next.amount)} is on its way to Chase •• 4821.`,
              variant: "success",
            })
          }
        >
          Pay out now
        </Button>
      </CardFooter>
    </Card>
  );
}

const roles = ["Owner", "Admin", "Editor", "Viewer"] as const;
type Role = (typeof roles)[number];

const initialMembers: {
  name: string;
  email: string;
  role: Role;
  tone: string;
  pending?: boolean;
}[] = [
  {
    name: "Maya Chen",
    email: "maya@northwind.co",
    role: "Owner",
    tone: "bg-primary text-primary-foreground",
  },
  {
    name: "Sam Rivera",
    email: "sam@northwind.co",
    role: "Admin",
    tone: "",
  },
  {
    name: "Jo Park",
    email: "jo@northwind.co",
    role: "Editor",
    tone: "bg-success-subtle text-success-foreground",
  },
  {
    name: "Amina Shah",
    email: "amina@northwind.co",
    role: "Viewer",
    tone: "bg-warning-subtle text-warning-foreground",
    pending: true,
  },
];

function TeamScene({ className }: { className?: string }) {
  const [members, setMembers] = useState(initialMembers);
  const [email, setEmail] = useState("");

  return (
    <Card className={cn("flex min-w-0 flex-col", className)}>
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>12 of 15 seats used.</CardDescription>
        <CardAction>
          <ProgressRing
            label="Seats used"
            value={80}
            size="sm"
            className="[&_[data-slot=progress-ring-label]]:sr-only"
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="grid gap-1">
          {members.map((member) => (
            <li
              key={member.email}
              className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2"
            >
              <Avatar name={member.name} className={member.tone} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate text-sm font-medium">
                  {member.name}
                  {member.pending && (
                    <Badge variant="warning" className="min-h-5 px-2 py-0">
                      Invited
                    </Badge>
                  )}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {member.email}
                </p>
              </div>
              <MenuTrigger>
                <Button
                  variant="minimal"
                  size="sm"
                  className="gap-1.5 px-2.5"
                  aria-label={`${member.name}'s role: ${member.role}`}
                >
                  {member.role}
                  <DotsThreeIcon size={14} weight="bold" aria-hidden="true" />
                </Button>
                <MenuPopover placement="bottom end">
                  <MenuContent
                    aria-label={`Role for ${member.name}`}
                    selectionMode="single"
                    selectedKeys={[member.role]}
                    onSelectionChange={(keys) => {
                      const [next] = [...keys];
                      if (roles.includes(next as Role)) {
                        setMembers((current) =>
                          current.map((item) =>
                            item.email === member.email
                              ? { ...item, role: next as Role }
                              : item,
                          ),
                        );
                      }
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} id={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </MenuContent>
                </MenuPopover>
              </MenuTrigger>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-t border-border/70 pt-5">
        <Form
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault();
            if (!email.trim()) return;
            showToast({
              title: "Invitation sent",
              description: `${email.trim()} can join Northwind once they accept.`,
              variant: "success",
            });
            setEmail("");
          }}
        >
          <TextField
            name="invite"
            type="email"
            value={email}
            onChange={setEmail}
            className="w-full"
          >
            <TextFieldLabel className="sr-only">Invite by email</TextFieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="name@company.com" />
              <InputGroupAddon>
                <Button type="submit" size="sm" isDisabled={!email.trim()}>
                  Invite
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </TextField>
        </Form>
      </CardFooter>
    </Card>
  );
}

type Chat = { id: number; side: "incoming" | "outgoing"; text: string };

const answers = [
  "Expansion revenue is up 18% this month. Most of it came from teams moving from Starter to Growth.",
  "Three invoices are overdue by more than 14 days. I drafted reminders for each customer.",
  "Support volume is flat, but first response time improved by 22 minutes.",
];

function AssistantScene({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Chat[]>([
    { id: 1, side: "outgoing", text: "Why did churn rise last week?" },
    {
      id: 2,
      side: "incoming",
      text: "Churn rose to 3.1% after the Starter price change on Oct 2. Pricing comes up in 62% of cancellation notes.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [working, setWorking] = useState(false);
  const replies = useRef(0);
  const nextId = useRef(3);

  function send() {
    const text = draft.trim();
    if (!text || working) return;
    const question: Chat = { id: nextId.current++, side: "outgoing", text };
    setMessages((current) => [...current, question]);
    setDraft("");
    setWorking(true);
    window.setTimeout(() => {
      const reply: Chat = {
        id: nextId.current++,
        side: "incoming",
        text: answers[replies.current++ % answers.length],
      };
      setMessages((current) => [...current, reply]);
      setWorking(false);
    }, 1600);
  }

  return (
    <Card
      className={cn("flex min-w-0 flex-col md:h-0 md:min-h-full", className)}
    >
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div className="grid gap-1">
          <CardTitle>Assistant</CardTitle>
          <CardDescription>Ask questions about your workspace.</CardDescription>
        </div>
        <Badge variant="accent">
          <SparkleIcon size={13} weight="fill" aria-hidden="true" />
          Beta
        </Badge>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col-reverse overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent,black_1.5rem)]">
        <div className="grid gap-3">
          <Message side="outgoing" sender="You" status="Read">
            {messages[0].text}
          </Message>
          <ToolCall>
            <ToolCallTrigger
              name="query_metrics"
              status="complete"
              summary="Read 4 weeks of cancellations"
            />
          </ToolCall>
          {messages.slice(1).map((message) => (
            <Message
              key={message.id}
              side={message.side}
              sender={message.side === "incoming" ? "Assistant" : "You"}
              avatar={
                message.side === "incoming" ? (
                  <Avatar name="Assistant" initials="AI" size="sm" />
                ) : undefined
              }
            >
              {message.text}
            </Message>
          ))}
          <AgentStatus
            state={working ? "working" : "complete"}
            label={
              working ? "Looking through your data" : "Win-back email drafted"
            }
            detail={
              working
                ? "Reading revenue, invoices, and support"
                : "Ready to review in Campaigns"
            }
          />
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/70 pt-5">
        <Form
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <TextField
            name="prompt"
            value={draft}
            onChange={setDraft}
            className="w-full"
          >
            <TextFieldLabel className="sr-only">
              Ask the assistant
            </TextFieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="Ask about revenue, invoices…" />
              <InputGroupAddon>
                <Button
                  type="submit"
                  iconOnly
                  className="size-9"
                  aria-label="Send"
                  isDisabled={!draft.trim() || working}
                >
                  <PaperPlaneRightIcon size={16} aria-hidden="true" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </TextField>
        </Form>
      </CardFooter>
    </Card>
  );
}

const slots = ["09:30", "11:00", "13:30", "16:00"];

function ScheduleScene({ className }: { className?: string }) {
  const [date, setDate] = useState(parseDate("2026-10-14"));
  const [slot, setSlot] = useState("11:00");
  const label = date.toDate("UTC").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <Card className={cn("flex min-w-0 flex-col", className)}>
      <CardHeader>
        <CardTitle>Book a walkthrough</CardTitle>
        <CardDescription>30 minutes with our solutions team.</CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 grid-cols-[minmax(0,1fr)] gap-6 px-2 pb-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:px-5">
        <Calendar
          aria-label="Walkthrough date"
          className="justify-self-center max-sm:[--spacing:0.22rem] sm:-ms-2"
          value={date}
          onChange={setDate}
          isDateUnavailable={(day) => day.toDate("UTC").getUTCDay() % 6 === 0}
        />
        <div className="flex min-w-0 flex-col gap-5 px-3 sm:border-s sm:border-border/70 sm:ps-6 sm:pe-0">
          <div className="flex items-center gap-3">
            <Avatar name="Sam Rivera" className="size-9" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Sam Rivera</p>
              <p className="truncate text-xs text-muted-foreground">
                Solutions engineer · Berlin (CEST)
              </p>
            </div>
            <Badge variant="success" dot>
              Available
            </Badge>
          </div>
          <div className="grid gap-2.5">
            <p className="text-sm font-medium">{label}</p>
            <ToggleButtonGroup
              aria-label="Time"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[slot]}
              onSelectionChange={(keys) => {
                const [next] = keys;
                if (typeof next === "string") setSlot(next);
              }}
              className="grid w-full min-w-0 grid-cols-2 gap-2"
            >
              {slots.map((time) => (
                <ToggleButton
                  key={time}
                  id={time}
                  className="px-2 tabular-nums"
                >
                  {time}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <dl className="grid gap-2 rounded-lg bg-muted/60 px-4 py-3 text-sm">
            {[
              ["Length", "30 minutes"],
              ["Location", "Video call"],
              ["Invite to", "maya@northwind.co"],
            ].map(([term, detail]) => (
              <div key={term} className="flex min-w-0 justify-between gap-4">
                <dt className="text-muted-foreground">{term}</dt>
                <dd className="truncate font-medium">{detail}</dd>
              </div>
            ))}
          </dl>
          <Dialog>
            <DialogTrigger className="mt-auto w-full">
              Book {slot}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm your walkthrough</DialogTitle>
                <DialogClose aria-label="Close" />
              </DialogHeader>
              <DialogDescription>
                {label} at {slot}. We will send a calendar invitation and a
                video link to maya@northwind.co.
              </DialogDescription>
              <DialogFooter>
                <DialogClose variant="outline">Back</DialogClose>
                <DialogClose
                  variant="default"
                  onPress={() =>
                    showToast({
                      title: "Walkthrough booked",
                      description: `${label} at ${slot}.`,
                      variant: "success",
                    })
                  }
                >
                  Confirm
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationsScene({ className }: { className?: string }) {
  const digestId = useId();
  const settings = [
    {
      id: "mentions",
      label: "Mentions",
      description: "When someone tags you in a comment.",
      on: true,
    },
    {
      id: "payments",
      label: "Failed payments",
      description: "As soon as a charge is declined.",
      on: true,
    },
    {
      id: "invoices",
      label: "Paid invoices",
      description: "A receipt for each payment you receive.",
      on: false,
    },
    {
      id: "product",
      label: "Product news",
      description: "New features, at most once a month.",
      on: false,
    },
  ];

  return (
    <Card className={cn("flex min-w-0 flex-col", className)}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what reaches your inbox.</CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 content-start gap-1 py-3">
        {settings.map((setting) => (
          <Switch
            key={setting.id}
            defaultChecked={setting.on}
            description={setting.description}
            className="-mx-2 rounded-lg px-2 py-2"
          >
            {setting.label}
          </Switch>
        ))}
      </CardContent>
      <CardFooter className="flex-nowrap justify-between border-t border-border/70 pt-4 pb-4">
        <p id={digestId} className="text-sm font-medium">
          Digest
        </p>
        <ToggleButtonGroup
          aria-labelledby={digestId}
          selectionMode="single"
          disallowEmptySelection
          defaultSelectedKeys={["daily"]}
        >
          <ToggleButton id="off" variant="segmented">
            Off
          </ToggleButton>
          <ToggleButton id="daily" variant="segmented">
            Daily
          </ToggleButton>
          <ToggleButton id="weekly" variant="segmented">
            Weekly
          </ToggleButton>
        </ToggleButtonGroup>
      </CardFooter>
    </Card>
  );
}

function ProjectScene({ className }: { className?: string }) {
  return (
    <Card className={cn("flex min-w-0 flex-col", className)}>
      <CardHeader>
        <CardTitle>New project</CardTitle>
        <CardDescription>Deploys from your main branch.</CardDescription>
      </CardHeader>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          const name = new FormData(event.currentTarget).get("name");
          showToast({
            title: "Project created",
            description: `${name || "Untitled"} is building its first deploy.`,
            variant: "success",
          });
        }}
      >
        <CardContent className="grid flex-1 content-start gap-5">
          <TextField name="name" label="Name" placeholder="marketing-site" />
          <Select
            label="Region"
            defaultValue="fra"
            options={[
              { id: "iad", name: "Washington, D.C." },
              { id: "fra", name: "Frankfurt" },
              { id: "sin", name: "Singapore" },
            ]}
          />
          <Slider
            label="Monthly budget"
            defaultValue={120}
            minValue={0}
            maxValue={500}
            step={10}
            formatOptions={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }}
          />
          <Checkbox defaultChecked>Preview every pull request</Checkbox>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="ghost" type="reset">
            Reset
          </Button>
          <Button type="submit">
            <PlusIcon size={16} aria-hidden="true" />
            Create project
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}

type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

const invoices: {
  id: string;
  customer: string;
  status: InvoiceStatus;
  amount: number;
  due: string;
}[] = [
  {
    id: "INV-2041",
    customer: "Lumen Labs",
    status: "Paid",
    amount: 4200,
    due: "Oct 2",
  },
  {
    id: "INV-2042",
    customer: "Harbor & Co.",
    status: "Pending",
    amount: 1850,
    due: "Oct 12",
  },
  {
    id: "INV-2043",
    customer: "Fieldwork",
    status: "Overdue",
    amount: 960,
    due: "Sep 28",
  },
  {
    id: "INV-2044",
    customer: "Kettle Studio",
    status: "Paid",
    amount: 12400,
    due: "Sep 30",
  },
  {
    id: "INV-2045",
    customer: "Northpeak",
    status: "Draft",
    amount: 3100,
    due: "Oct 20",
  },
];

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "error",
  Draft: "neutral",
} as const;

function InvoicesScene({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const rows = invoices.filter((invoice) =>
    `${invoice.id} ${invoice.customer} ${invoice.status}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <Card className={cn("flex min-w-0 flex-col", className)}>
      <CardHeader className="flex-row flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <CardTitle>Invoices</CardTitle>
          <CardDescription>
            {money.format(invoices.reduce((sum, row) => sum + row.amount, 0))}{" "}
            billed this month.
          </CardDescription>
        </div>
        <div className="flex w-full flex-wrap items-end gap-2 sm:w-auto">
          <SearchField
            aria-label="Search invoices"
            placeholder="Search invoices"
            value={query}
            onChange={setQuery}
            className="min-w-0 flex-1 sm:w-64"
          />
          <Button
            onPress={() =>
              showToast({
                title: "Draft created",
                description: "INV-2046 is ready to fill in.",
              })
            }
          >
            <PlusIcon size={16} aria-hidden="true" />
            New invoice
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-5">
        <div className="relative overflow-x-auto rounded-lg border border-border">
          <Table aria-label="Invoices" className="min-w-[36rem]">
            <TableHeader>
              <Column isRowHeader>Invoice</Column>
              <Column>Customer</Column>
              <Column>Status</Column>
              <Column>Due</Column>
              <Column className="text-right">Amount</Column>
              <Column className="w-12">
                <span className="sr-only">Actions</span>
              </Column>
            </TableHeader>
            <TableBody
              items={rows}
              renderEmptyState={() => (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No invoices match “{query}”.
                </p>
              )}
            >
              {(invoice) => (
                <Row id={invoice.id}>
                  <Cell className="font-mono text-xs">{invoice.id}</Cell>
                  <Cell className="font-medium">{invoice.customer}</Cell>
                  <Cell>
                    <Badge variant={statusVariant[invoice.status]} dot>
                      {invoice.status}
                    </Badge>
                  </Cell>
                  <Cell className="text-muted-foreground">{invoice.due}</Cell>
                  <Cell className="text-right tabular-nums">
                    {money.format(invoice.amount)}
                  </Cell>
                  <Cell>
                    <MenuTrigger>
                      <Button
                        variant="minimal"
                        iconOnly
                        className="size-8"
                        aria-label={`Actions for ${invoice.id}`}
                      >
                        <DotsThreeIcon size={16} aria-hidden="true" />
                      </Button>
                      <MenuPopover placement="bottom end">
                        <MenuContent aria-label={`${invoice.id} actions`}>
                          <MenuItem>
                            <EyeIcon
                              size={16}
                              aria-hidden="true"
                              className="text-muted-foreground"
                            />
                            View invoice
                          </MenuItem>
                          <MenuItem
                            onAction={() =>
                              showToast({
                                title: "Download started",
                                description: `${invoice.id}.pdf`,
                              })
                            }
                          >
                            <DownloadSimpleIcon
                              size={16}
                              aria-hidden="true"
                              className="text-muted-foreground"
                            />
                            Download PDF
                          </MenuItem>
                          <MenuSeparator />
                          <MenuItem className="text-destructive">
                            <TrashIcon size={16} aria-hidden="true" />
                            Void invoice
                          </MenuItem>
                        </MenuContent>
                      </MenuPopover>
                    </MenuTrigger>
                  </Cell>
                </Row>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export function ThemeShowcase() {
  return (
    <div className="grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RevenueScene className="md:col-span-2" />
      <PlanMixScene />
      <PayoutScene />
      <TeamScene />
      <NotificationsScene />
      <InvoicesScene className="md:col-span-2" />
      <AssistantScene />
      <ProjectScene />
      <ScheduleScene className="md:col-span-2" />
    </div>
  );
}
