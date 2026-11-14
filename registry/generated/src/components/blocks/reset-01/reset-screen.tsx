"use client";

import { EnvelopeSimpleIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "../../vip-ui/button";
import { Form } from "../../vip-ui/form";
import { LayoutMorph } from "../../vip-ui/layout-morph";
import { Link } from "../../vip-ui/link";
import { Spinner } from "../../vip-ui/spinner";
import { TextField } from "../../vip-ui/text-field";
import { TextSwap } from "../../vip-ui/text-swap";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
} from "../../vip-ui/timeline";
import { showToast } from "../../vip-ui/toast";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resendDelay = 30;

export function ResetScreen() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [returned, setReturned] = useState(false);
  const cooldown = useCooldown();

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      cooldown.start(resendDelay);
      setSent(true);
    }, 900);
  }

  function resend() {
    cooldown.start(resendDelay);
    showToast({
      title: "We sent a new link",
      description: "Only the newest link works.",
    });
  }

  function changeEmail() {
    cooldown.stop();
    setReturned(true);
    setSent(false);
  }

  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_27rem]">
      <div className="flex min-w-0 flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <a
            href="/blocks"
            className="inline-flex min-w-0 items-center gap-2.5 rounded-md outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground"
            >
              F
            </span>
            <span className="truncate text-sm font-semibold tracking-[-0.02em]">
              Fernway
            </span>
          </a>
          <Link href="/blocks/login-01" className="shrink-0 text-sm">
            Back to sign in
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-10">
          <LayoutMorph
            contentKey={sent ? "sent" : "form"}
            className="w-full max-w-sm"
          >
            {sent ? (
              <div className="grid gap-6">
                <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
                  <EnvelopeSimpleIcon size={24} aria-hidden="true" />
                </span>
                <div className="grid gap-2">
                  <ViewHeading focusOnMount>Check your email</ViewHeading>
                  <p className="text-sm leading-6 text-muted-foreground">
                    If{" "}
                    <span className="font-medium text-foreground wrap-anywhere">
                      {email.trim()}
                    </span>{" "}
                    has a Fernway account, a reset link is on its way. The link
                    expires in 30 minutes.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    isDisabled={cooldown.secondsLeft > 0}
                    onPress={resend}
                  >
                    {cooldown.secondsLeft > 0 ? (
                      <span className="inline-flex items-baseline gap-1">
                        Send again in
                        <TextSwap
                          value={`${cooldown.secondsLeft} s`}
                          className="tabular-nums"
                        />
                      </span>
                    ) : (
                      "Send the link again"
                    )}
                  </Button>
                  <Button variant="ghost" onPress={changeEmail}>
                    Use a different email
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <ViewHeading focusOnMount={returned}>
                    Reset your password
                  </ViewHeading>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Enter your work email to get a reset link.
                  </p>
                </div>
                <Form onSubmit={send}>
                  <TextField
                    label="Work email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="maya@marlow.studio"
                    value={email}
                    onChange={setEmail}
                    validate={(value) =>
                      !value || emailPattern.test(value.trim())
                        ? null
                        : "Enter a full email address, for example maya@marlow.studio."
                    }
                    isRequired
                  />
                  <Button type="submit" className="w-full" isPending={pending}>
                    {pending && <Spinner size="sm" decorative />}
                    Send reset link
                  </Button>
                </Form>
                <p className="text-xs leading-5 text-muted-foreground">
                  Fernway never asks for your password in an email.
                </p>
              </div>
            )}
          </LayoutMorph>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© 2026 Fernway</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheckIcon size={14} aria-hidden="true" />
            Protected by Fernway Security
          </span>
        </footer>
      </div>

      <aside className="hidden border-s border-border/70 bg-muted/40 p-8 lg:flex lg:flex-col lg:gap-8">
        <div className="grid gap-4 rounded-xl bg-card p-4 shadow-[var(--shadow-card)] ring-1 ring-border/70">
          <h2 className="text-sm font-semibold tracking-[-0.02em]">
            How it works
          </h2>
          <Timeline>
            <TimelineItem status={sent ? "complete" : "latest"}>
              <TimelineTitle>Enter your email</TimelineTitle>
              <TimelineDescription>
                Use the address on your Fernway account.
              </TimelineDescription>
            </TimelineItem>
            <TimelineItem status={sent ? "latest" : "upcoming"}>
              <TimelineTitle>Open the link</TimelineTitle>
              <TimelineDescription>
                The link expires 30 minutes after we send it.
              </TimelineDescription>
            </TimelineItem>
            <TimelineItem status="upcoming">
              <TimelineTitle>Set a new password</TimelineTitle>
              <TimelineDescription>
                The link works one time.
              </TimelineDescription>
            </TimelineItem>
          </Timeline>
        </div>

        <div className="mt-auto grid gap-2 rounded-xl bg-card p-4 ring-1 ring-border/70">
          <p className="text-sm font-semibold">No email after 5 minutes?</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Check the spam folder, then ask support to check the address.
          </p>
          <Link href="mailto:support@fernway.app" className="w-fit text-xs">
            support@fernway.app
          </Link>
        </div>
      </aside>
    </div>
  );
}

function ViewHeading({
  focusOnMount = false,
  children,
}: {
  focusOnMount?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusOnMount) ref.current?.focus({ preventScroll: true });
  }, [focusOnMount]);

  return (
    <h1
      ref={ref}
      tabIndex={-1}
      className="rounded-sm text-2xl font-semibold tracking-[-0.04em] outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {children}
    </h1>
  );
}

function useCooldown() {
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (endsAt === null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) setEndsAt(null);
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [endsAt]);

  return {
    secondsLeft,
    start(seconds: number) {
      setSecondsLeft(seconds);
      setEndsAt(Date.now() + seconds * 1000);
    },
    stop() {
      setSecondsLeft(0);
      setEndsAt(null);
    },
  };
}
