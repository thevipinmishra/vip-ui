"use client";

import { EnvelopeSimpleIcon, KeyIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IconSwap } from "@/components/ui/icon-swap";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { Link } from "@/components/ui/link";
import { Presence } from "@/components/ui/presence";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";
import { TextSwap } from "@/components/ui/text-swap";

type View = "form" | "sent" | "account";

const passkeyAccount = "maya@northwind.com";
const resendDelay = 30;

export function EmailLinkForm() {
  const [view, setView] = useState<View>("form");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState<"link" | "passkey" | null>(null);
  const [resent, setResent] = useState(false);
  const [returned, setReturned] = useState(false);
  const cooldown = useCooldown();

  function sendLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending("link");
    window.setTimeout(() => {
      setPending(null);
      setResent(false);
      cooldown.start(resendDelay);
      setView("sent");
    }, 800);
  }

  function signInWithPasskey() {
    setPending("passkey");
    window.setTimeout(() => {
      setPending(null);
      setView("account");
    }, 1100);
  }

  function showForm() {
    cooldown.stop();
    setReturned(true);
    setView("form");
  }

  return (
    <LayoutMorph contentKey={view}>
      {view === "account" ? (
        <div className="grid justify-items-center gap-6 text-center">
          <Avatar name={passkeyAccount} size="lg" />
          <div className="grid gap-2">
            <ViewHeading focusOnMount>You are signed in</ViewHeading>
            <p className="text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
              {passkeyAccount}
            </p>
          </div>
          <Button variant="outline" className="w-full" onPress={showForm}>
            Sign out
          </Button>
        </div>
      ) : view === "sent" ? (
        <div className="grid gap-6 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
            <EnvelopeSimpleIcon size={22} aria-hidden="true" />
          </span>
          <div className="grid gap-2">
            <ViewHeading focusOnMount>Check your email</ViewHeading>
            <p className="text-sm leading-6 text-muted-foreground">
              We sent a sign-in link to{" "}
              <span className="font-medium text-foreground [overflow-wrap:anywhere]">
                {email}
              </span>
              . The link expires in 10 minutes.
            </p>
          </div>
          <div className="grid gap-2">
            <Button
              variant="outline"
              isDisabled={cooldown.secondsLeft > 0}
              onPress={() => {
                setResent(true);
                cooldown.start(resendDelay);
              }}
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
            <Button variant="ghost" onPress={showForm}>
              Use a different email
            </Button>
          </div>
          <Presence show={resent} collapse>
            <p
              role="status"
              className="text-xs leading-5 text-muted-foreground"
            >
              We sent a new link. Only the newest link works.
            </p>
          </Presence>
        </div>
      ) : (
        <Form onSubmit={sendLink}>
          <div className="grid gap-2 text-center">
            <ViewHeading focusOnMount={returned}>
              Sign in to Northwind
            </ViewHeading>
            <p className="text-sm leading-6 text-muted-foreground">
              Enter your email. We send you a link to sign in.
            </p>
          </div>
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={setEmail}
            isRequired
          />
          <Button
            type="submit"
            className="w-full"
            isPending={pending === "link"}
            isDisabled={pending === "passkey"}
          >
            {pending === "link" && <Spinner size="sm" decorative />}
            Email me a link
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Separator className="flex-1" />
            or
            <Separator className="flex-1" />
          </div>
          <Button
            variant="outline"
            className="w-full"
            isPending={pending === "passkey"}
            isDisabled={pending === "link"}
            onPress={signInWithPasskey}
          >
            <IconSwap contentKey={pending === "passkey" ? "pending" : "idle"}>
              {pending === "passkey" ? (
                <Spinner size="sm" decorative />
              ) : (
                <KeyIcon />
              )}
            </IconSwap>
            Sign in with a passkey
          </Button>
          <p className="text-center text-xs leading-5 text-muted-foreground">
            When you continue, you agree to the <Link href="#">terms</Link> and
            the <Link href="#">privacy policy</Link>.
          </p>
        </Form>
      )}
    </LayoutMorph>
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
