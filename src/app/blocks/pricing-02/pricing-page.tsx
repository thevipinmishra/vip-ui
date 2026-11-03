"use client";

import { ArrowRightIcon, CheckIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { cn } from "@/lib/utils";
import { ComparisonTable } from "./comparison-table";
import {
  type Cycle,
  comparison,
  currencyFormat,
  faqs,
  formatMoney,
  plans,
} from "./data";
import { SiteFooter, SiteHeader } from "./site-chrome";

function PlanCard({
  plan,
  cycle,
}: {
  plan: (typeof plans)[number];
  cycle: Cycle;
}) {
  const price = plan[cycle];
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col rounded-2xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70",
        plan.popular && "ring-2 ring-primary lg:-my-3 lg:py-8",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold tracking-[-0.03em]">
          {plan.name}
        </h2>
        {plan.popular && <Badge variant="accent">Most popular</Badge>}
      </div>
      <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
        {plan.description}
      </p>
      <p className="mt-5 flex items-baseline gap-1.5">
        <AnimatedNumber
          value={price}
          formatOptions={currencyFormat}
          className="text-3xl font-semibold tracking-[-0.05em]"
        />
        <span className="text-sm text-muted-foreground">
          {price === 0 ? "forever" : "/ seat / month"}
        </span>
      </p>
      <p className="mt-1 min-h-5 text-xs text-muted-foreground">
        {price === 0
          ? "No card needed"
          : cycle === "yearly"
            ? `${formatMoney(price * 12)} each year per seat`
            : "Billed each month"}
      </p>
      <ButtonLink
        href={plan.href}
        variant={plan.popular ? "default" : "outline"}
        className="mt-5 w-full"
      >
        {plan.action}
      </ButtonLink>
      <Separator className="my-5" />
      <ul className="grid gap-2 text-[13px]">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <CheckIcon size={12} weight="bold" aria-hidden="true" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CycleToggle({
  cycle,
  onCycleChange,
  idPrefix,
  label,
}: {
  cycle: Cycle;
  onCycleChange: (cycle: Cycle) => void;
  idPrefix: string;
  label: string;
}) {
  const monthlyId = `${idPrefix}-monthly`;
  const yearlyId = `${idPrefix}-yearly`;
  return (
    <ToggleButtonGroup
      aria-label={label}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[cycle === "monthly" ? monthlyId : yearlyId]}
      onSelectionChange={(keys) => {
        const [next] = keys;
        if (next === monthlyId) onCycleChange("monthly");
        if (next === yearlyId) onCycleChange("yearly");
      }}
    >
      <ToggleButton id={monthlyId} variant="segmented">
        Monthly
      </ToggleButton>
      <ToggleButton id={yearlyId} variant="segmented">
        Yearly
        <span className="rounded-sm bg-success-subtle px-2 py-0.5 text-[11px] font-semibold text-success-foreground">
          Save 20%
        </span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function Calculator({
  cycle,
  onCycleChange,
}: {
  cycle: Cycle;
  onCycleChange: (cycle: Cycle) => void;
}) {
  const [seats, setSeats] = useState(12);
  const teamRate = cycle === "monthly" ? 29 : 23;
  const scaleRate = cycle === "monthly" ? 79 : 63;
  const teamAvailable = seats <= 50;
  const teamMonthly = seats * teamRate;
  const scaleMonthly = seats * scaleRate;
  const yearlySaving = seats * (79 - 63) * 12;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-12">
      <div className="min-w-0">
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
          Estimate your bill.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          Move the slider to see the monthly cost for each plan.
        </p>
        <div className="mt-7 rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
          <Slider
            label="Seats"
            minValue={1}
            maxValue={100}
            step={1}
            value={seats}
            onChange={(value) =>
              setSeats(Array.isArray(value) ? value[0] : value)
            }
            marks={[1, 25, 50, 100]}
            formatOptions={{ maximumFractionDigits: 0 }}
          />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
            <p className="text-sm font-medium">Billing cycle</p>
            <CycleToggle
              cycle={cycle}
              onCycleChange={onCycleChange}
              idPrefix="calculator"
              label="Calculator billing cycle"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Need more than 100 seats?{" "}
          <a
            href="mailto:sales@trellis.app?subject=Trellis%20seats"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Talk to sales
          </a>
          .
        </p>
        <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-accent px-4 py-3 text-sm text-accent-foreground">
          <SparkleIcon
            size={16}
            weight="fill"
            aria-hidden="true"
            className="mt-0.5 shrink-0"
          />
          <p>
            Yearly billing saves {formatMoney(yearlySaving)} for {seats}{" "}
            {seats === 1 ? "seat" : "seats"} on Scale.
          </p>
        </div>
      </div>
      <div className="rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold">Team</p>
          <Badge variant={teamAvailable ? "outline" : "warning"}>
            {teamAvailable ? "Up to 50 seats" : "50 seat cap"}
          </Badge>
        </div>
        {teamAvailable ? (
          <>
            <p className="mt-2 flex items-baseline gap-1">
              <AnimatedNumber
                value={teamMonthly}
                formatOptions={currencyFormat}
                className="text-3xl font-semibold tracking-[-0.04em]"
              />
              <span className="text-sm text-muted-foreground">/ month</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {cycle === "yearly"
                ? `${formatMoney(teamMonthly * 12)} charged each year`
                : "Billed each month"}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Team stops at 50 seats. Scale covers larger teams.
          </p>
        )}
        <Separator className="my-5" />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold">Scale</p>
          <Badge variant="outline">Unlimited seats</Badge>
        </div>
        <p className="mt-2 flex items-baseline gap-1">
          <AnimatedNumber
            value={scaleMonthly}
            formatOptions={currencyFormat}
            className="text-3xl font-semibold tracking-[-0.04em]"
          />
          <span className="text-sm text-muted-foreground">/ month</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {cycle === "yearly"
            ? `${formatMoney(scaleMonthly * 12)} charged each year`
            : "Billed each month"}
        </p>
        <Separator className="my-5" />
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-muted-foreground">Seats</span>
          <span className="font-medium tabular-nums">{seats}</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-3 text-sm">
          <span className="text-muted-foreground">Billing</span>
          <span className="font-medium">
            {cycle === "yearly" ? "Yearly" : "Monthly"}
          </span>
        </div>
        <p className="mt-4 border-t border-border/70 pt-3 text-xs leading-5 text-muted-foreground">
          Prices in US dollars. Taxes can apply.
        </p>
      </div>
    </div>
  );
}

export function PricingPage() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <div className="min-h-svh bg-background">
      <SiteHeader active="pricing" />
      <main>
        <section className="relative isolate overflow-hidden border-b border-border/70">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div
              className="absolute left-1/2 top-[-24rem] h-[38rem] w-[60rem] -translate-x-1/2 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
              }}
            />
            <div className="absolute inset-0 opacity-[0.3] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
          </div>
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-14">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-[3.5rem]">
                Plans that grow with the work.
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Start free with unlimited viewers.
              </p>
              <div className="mt-7 flex justify-center">
                <CycleToggle
                  cycle={cycle}
                  onCycleChange={setCycle}
                  idPrefix="plans"
                  label="Billing cycle"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Prices in US dollars. Taxes can apply.
              </p>
            </div>
            <div className="mt-9 grid items-stretch gap-4 md:grid-cols-3 lg:mt-12">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} cycle={cycle} />
              ))}
            </div>
            <p className="mt-7 text-center text-sm text-muted-foreground">
              All prices are for one seat each month.{" "}
              <a
                href="#compare"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Compare every feature
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="calculator"
          className="scroll-mt-20 border-b border-border/70 bg-muted/30 py-12 sm:py-16"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <Calculator cycle={cycle} onCycleChange={setCycle} />
          </div>
        </section>

        <section
          id="compare"
          className="scroll-mt-20 border-b border-border/70 py-12 sm:py-16"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                Every detail, side by side.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {comparison.length} rows across four groups. Scroll inside the
                table.
              </p>
            </div>
            <div className="mt-6">
              <ComparisonTable />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              All plans include unlimited viewers. Session replay counts each
              month.
            </p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 py-12 sm:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 lg:px-8">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                Billing questions, answered.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Need a quote or a security review?{" "}
                <a
                  href="mailto:sales@trellis.app"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Talk to sales
                </a>
                .
              </p>
            </div>
            <Accordion variant="card" className="min-w-0">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} id={faq.id} title={faq.question}>
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="pb-12 sm:pb-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-primary px-6 py-8 text-primary-foreground sm:px-10">
              <div className="min-w-0">
                <h2 className="text-balance text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                  See Trellis on your data.
                </h2>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  Start free. Invite the team when you are ready.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href="/blocks/signup-01"
                  variant="outline"
                  className="border-transparent"
                >
                  Start free
                  <ArrowRightIcon size={16} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href="/blocks/landing-01"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Back to home
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
