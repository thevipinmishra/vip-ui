"use client";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  CheckIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Accordion, AccordionItem } from "../../vip-ui/accordion";
import { Avatar, AvatarGroup } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { ButtonLink } from "../../vip-ui/button-link";
import { Form } from "../../vip-ui/form";
import { Link } from "../../vip-ui/link";
import { Marquee } from "../../vip-ui/marquee";
import { Spinner } from "../../vip-ui/spinner";
import { StaggerGroup, StaggerItem } from "../../vip-ui/stagger-group";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "../../vip-ui/text-field";
import { TextReveal } from "../../vip-ui/text-reveal";
import { TextSwap } from "../../vip-ui/text-swap";
import { showToast } from "../../vip-ui/toast";
import { cn } from "../../vip-ui/utils";
import { audiences, faqs, formatMoney, logotypes, plans, stats } from "./data";
import { FeatureTabs } from "./feature-tabs";
import { SiteFooter, SiteHeader } from "./site-chrome";

const funnel = [
  { label: "Opened checkout", count: 24180 },
  { label: "Added payment", count: 9842 },
  { label: "Confirmed order", count: 6116 },
  { label: "Returned in 30 days", count: 1204 },
];

const heroAvatars = ["Maya Chen", "Jonas Weber", "Priya Nair", "Luis Ortega"];

const ratingStars = ["one", "two", "three", "four", "five"];

function Hero() {
  const [audience, setAudience] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setAudience((current) => (current + 1) % audiences.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 -top-88 h-168 w-5xl -translate-x-1/2 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 14%, transparent), transparent)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center lg:gap-10 lg:px-8 lg:pb-20">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge variant="accent" dot>
              New
            </Badge>
            <a
              href="/blocks/changelog-01"
              className="group inline-flex items-center gap-1 rounded-sm text-sm font-medium text-muted-foreground outline-offset-4 transition-colors duration-150 ease-out-quint hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
            >
              Journeys 2.0 is live
              <ArrowUpRightIcon
                size={14}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-150 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
          <p className="mt-7 text-sm font-medium text-muted-foreground">
            Built for{" "}
            <TextSwap
              value={audiences[audience]}
              className="font-medium text-foreground"
            />
          </p>
          <h1 className="mt-3 text-balance text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-[3.5rem]">
            <TextReveal text="See what your" />
            <br className="hidden sm:block" />{" "}
            <span className="text-muted-foreground">
              <TextReveal text="users do next." delay={0.14} />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Trellis shows the paths, drops, and habits in your product. Find the
            problem. Ship the fix.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ButtonLink href="/blocks/signup-01" size="lg">
              Start free
              <ArrowRightIcon size={16} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/blocks/pricing-02" size="lg" variant="outline">
              See pricing
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Free for one seat. No card.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <AvatarGroup>
              {heroAvatars.map((name) => (
                <Avatar key={name} name={name} size="sm" />
              ))}
            </AvatarGroup>
            <div>
              <div className="flex items-center gap-0.5 text-warning">
                {ratingStars.map((star) => (
                  <StarIcon
                    key={star}
                    size={13}
                    weight="fill"
                    aria-hidden="true"
                  />
                ))}
                <span className="ms-1.5 text-xs font-medium text-foreground">
                  4.8
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                From 620 reviews.
              </p>
            </div>
          </div>
        </div>
        <div className="relative min-w-0">
          <div className="rounded-2xl bg-card p-4 shadow-(--shadow-float) ring-1 ring-border/70 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Checkout journey</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Sep 1 – Oct 31, 2026
                </p>
              </div>
              <Badge variant="success" dot>
                Live
              </Badge>
            </div>
            <div className="mt-5 grid gap-4">
              {funnel.map((step) => {
                const percent = Math.round(
                  (step.count / funnel[0].count) * 100,
                );
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
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3.5 text-xs text-muted-foreground">
              <span>24,180 sessions</span>
              <span>Updated 2 min ago</span>
            </div>
          </div>
          <div className="relative z-10 -mt-4 ms-4 hidden w-56 rounded-xl bg-card p-3.5 shadow-[var(--shadow-float)] ring-1 ring-border/70 sm:block">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-success-subtle text-success-foreground">
                <CheckIcon size={13} weight="bold" aria-hidden="true" />
              </span>
              <p className="text-[11px] font-medium text-muted-foreground">
                Alert · Oct 28
              </p>
            </div>
            <p className="mt-2 text-sm font-semibold leading-5">
              Checkout up 6.2%
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Seven days after the payment fix
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoBand() {
  return (
    <section
      aria-label="Customers"
      className="group/logo relative border-y border-border/70 bg-card/40 py-8"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          Teams that use Trellis each week
        </p>
        <Marquee
          speed={36}
          className="relative mt-5 [&>div:last-child]:pointer-events-none [&>div:last-child]:absolute [&>div:last-child]:end-0 [&>div:last-child]:-bottom-7 [&>div:last-child]:opacity-0 [&>div:last-child]:transition-opacity [&>div:last-child]:duration-150 [&>div:last-child]:ease-out-quint group-focus-within/logo:[&>div:last-child]:pointer-events-auto group-focus-within/logo:[&>div:last-child]:opacity-100 group-hover/logo:[&>div:last-child]:pointer-events-auto group-hover/logo:[&>div:last-child]:opacity-100"
        >
          {logotypes.map((logo) => (
            <span
              key={logo.name}
              className={cn(
                "select-none text-muted-foreground/80 transition-colors duration-150 ease-out-quint hover:text-foreground",
                logo.className,
              )}
            >
              {logo.name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Customers() {
  return (
    <section
      id="customers"
      className="scroll-mt-20 border-t border-border/70 py-14 sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14 lg:px-8">
        <div className="min-w-0">
          <h2 className="sr-only">Customer stories</h2>
          <blockquote className="text-balance text-2xl font-medium leading-8 tracking-[-0.035em] sm:text-[1.75rem] sm:leading-9">
            We found the drop before lunch. The fix shipped on Friday, and
            checkout conversion rose 6.2%.
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <Avatar name="Maya Chen" size="lg" />
            <div>
              <p className="text-sm font-semibold">Maya Chen</p>
              <p className="text-sm text-muted-foreground">
                VP Product, Northwind
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
            <Link href="/blocks/changelog-01" className="text-xs">
              Read the release notes
            </Link>
          </div>
        </div>
        <StaggerGroup
          trigger="mount"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border/70 ring-1 ring-border/70"
        >
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="bg-card px-5 py-6 sm:px-6 sm:py-7"
            >
              <p className="text-2xl font-semibold tracking-[-0.05em] tabular-nums sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-border/70 bg-muted/30 py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
            Start small. Grow when it works.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            All plans include funnels, journeys, and unlimited viewers. Yearly
            billing saves 20%.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col rounded-2xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70",
                plan.popular && "ring-2 ring-primary",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold tracking-[-0.03em]">
                  {plan.name}
                </h3>
                {plan.popular && <Badge variant="accent">Most popular</Badge>}
              </div>
              <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
                {plan.description}
              </p>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold tracking-[-0.05em] tabular-nums">
                  {formatMoney(plan.monthly)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.monthly === 0 ? "forever" : "per seat / month"}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {plan.monthly === 0
                  ? "No card needed"
                  : `Yearly: ${formatMoney(plan.yearly)} per seat / month`}
              </p>
              <ButtonLink
                href={plan.href}
                variant={plan.popular ? "default" : "outline"}
                className="mt-4 w-full"
              >
                {plan.action}
              </ButtonLink>
              <ul className="mt-5 grid gap-2 border-t border-border/70 pt-4 text-[13px]">
                {[plan.seats, plan.events, plan.history].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-7 text-center text-sm text-muted-foreground">
          <Link href="/blocks/pricing-02">Compare all plans and features</Link>
        </p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border/70 py-14 sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 lg:px-8">
        <div>
          <h2 className="text-balance text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
            Answers before you ask.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Need more detail? Write to{" "}
            <a
              href="mailto:hello@trellis.app"
              className="font-medium text-foreground underline underline-offset-4"
            >
              hello@trellis.app
            </a>
            . A person answers each message.
          </p>
        </div>
        <Accordion variant="divided" className="min-w-0">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} id={faq.id} title={faq.question}>
              {faq.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "sent">("idle");
  const [subscribed, setSubscribed] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;
    const address = email.trim();
    const message = !address
      ? "Enter your email address."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)
        ? "Enter a valid email address, like you@company.com."
        : null;
    if (message) {
      setError(message);
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setSubscribed(address);
    setStatus("pending");
    timer.current = window.setTimeout(() => {
      setStatus("sent");
      showToast({
        title: "You are on the list",
        description: `The next product note goes to ${address}.`,
        variant: "success",
      });
    }, 650);
  }

  function reset() {
    setEmail("");
    setError(null);
    setSubscribed("");
    setStatus("idle");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-5"
      >
        <span className="grid size-10 place-items-center rounded-full bg-success-subtle text-success-foreground">
          <CheckCircleIcon size={22} weight="fill" aria-hidden="true" />
        </span>
        <p className="mt-3 text-base font-semibold tracking-[-0.02em]">
          You are on the list.
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          The next note goes to {subscribed}. It arrives on the first Tuesday of
          the month.
        </p>
        <Button variant="outline" size="sm" className="mt-4" onPress={reset}>
          Use another email
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={submit}>
      <div className="rounded-xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-5">
        <TextField
          name="email"
          size="md"
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (error) setError(null);
          }}
          isDisabled={status === "pending"}
          isInvalid={Boolean(error)}
        >
          <TextFieldLabel className="sr-only">Email address</TextFieldLabel>
          <div className="flex flex-col gap-2 sm:flex-row">
            <TextFieldInput
              ref={inputRef}
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="min-w-0 flex-1"
            />
            <Button
              type="submit"
              isDisabled={status === "pending"}
              className="shrink-0"
            >
              {status === "pending" ? (
                <>
                  <Spinner size="sm" decorative />
                  Sending
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRightIcon size={16} aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
          {error && <TextFieldError>{error}</TextFieldError>}
          <p className="text-xs leading-5 text-muted-foreground">
            Unsubscribe at any time.
          </p>
        </TextField>
      </div>
    </Form>
  );
}

function Newsletter() {
  return (
    <section id="newsletter" className="scroll-mt-20 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl bg-primary px-6 py-9 text-primary-foreground sm:px-10 sm:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_70%)]"
          />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                One short note each month.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/70">
                Product changes, customer stories, and one metric worth a look.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteHeader active="product" />
      <main>
        <Hero />
        <LogoBand />
        <section
          id="features"
          className="scroll-mt-20 py-14 sm:py-16"
          aria-labelledby="features-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="features-title"
                className="text-balance text-2xl font-semibold tracking-[-0.05em] sm:text-3xl"
              >
                Answers before the meeting.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Four views. One workspace. No SQL.
              </p>
            </div>
            <FeatureTabs />
          </div>
        </section>
        <Customers />
        <PricingTeaser />
        <Faq />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
