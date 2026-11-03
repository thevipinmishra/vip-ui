"use client";

import { EnvelopeSimpleIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { Presence } from "@/components/ui/presence";
import { Spinner } from "@/components/ui/spinner";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ResetScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  function focusForm() {
    window.setTimeout(
      () => emailRef.current?.querySelector<HTMLInputElement>("input")?.focus(),
      220,
    );
  }

  function focusSent() {
    window.setTimeout(() => sentHeadingRef.current?.focus(), 220);
  }

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!emailPattern.test(value)) {
      setError("Enter a full email address, for example maya@marlow.studio.");
      emailRef.current?.querySelector<HTMLInputElement>("input")?.focus();
      return;
    }
    setError("");
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setNotice("");
      setSent(value);
      focusSent();
      showToast({
        title: "Reset link sent",
        description: `Check ${value}. The link expires in 30 minutes.`,
        variant: "success",
      });
    }, 900);
  }

  function resend() {
    setNotice("A new link is on the way.");
    showToast({
      title: "We sent a new link",
      description: `Check ${sent}. Only the newest link works.`,
    });
  }

  function changeEmail() {
    setSent(null);
    setNotice("");
    setError("");
    focusForm();
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
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            Password help
          </span>
        </header>

        <main className="flex flex-1 items-center justify-center py-10">
          <div className="grid w-full max-w-sm">
            <Presence show={!sent} className="col-start-1 row-start-1">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                    Reset your password
                  </h1>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Enter your work email to get a reset link.
                  </p>
                </div>

                {error && (
                  <Alert variant="error" title="Check the email" role="alert">
                    {error}
                  </Alert>
                )}

                <Form className="gap-4" onSubmit={send}>
                  <TextField
                    ref={emailRef}
                    name="email"
                    size="md"
                    autoComplete="email"
                    value={email}
                    onChange={(value) => {
                      setEmail(value);
                      setError("");
                    }}
                    isInvalid={Boolean(error)}
                  >
                    <TextFieldLabel>Work email</TextFieldLabel>
                    <TextFieldInput
                      inputMode="email"
                      placeholder="maya@marlow.studio"
                    />
                  </TextField>
                  <Button
                    type="submit"
                    size="md"
                    className="w-full"
                    isPending={pending}
                    isDisabled={pending}
                  >
                    {pending && <Spinner size="sm" decorative />}
                    {pending ? "Sending…" : "Send reset link"}
                  </Button>
                </Form>

                <p className="text-xs leading-5 text-muted-foreground">
                  Fernway never asks for your password.
                </p>

                <div className="border-t border-border/70 pt-4 text-center text-sm">
                  <Link href="/blocks/login-01">Back to sign in</Link>
                </div>
              </div>
            </Presence>

            <Presence show={Boolean(sent)} className="col-start-1 row-start-1">
              <div className="grid gap-6" role="status">
                <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
                  <EnvelopeSimpleIcon size={24} aria-hidden="true" />
                </span>
                <div className="grid gap-2">
                  <h1
                    ref={sentHeadingRef}
                    tabIndex={-1}
                    className="rounded-sm text-2xl font-semibold tracking-[-0.04em] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    Check your email
                  </h1>
                  <p className="text-sm leading-6 text-muted-foreground">
                    We sent a reset link to{" "}
                    <span className="font-medium text-foreground [overflow-wrap:anywhere]">
                      {sent}
                    </span>
                    . It expires in 30 minutes.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Button variant="outline" size="md" onPress={resend}>
                    Send the link again
                  </Button>
                  <Button variant="ghost" size="md" onPress={changeEmail}>
                    Use a different email
                  </Button>
                </div>
                {notice && (
                  <p
                    role="status"
                    className="text-center text-xs leading-5 text-muted-foreground"
                  >
                    {notice}
                  </p>
                )}
                <div className="border-t border-border/70 pt-4 text-center text-sm">
                  <Link href="/blocks/login-01">Back to sign in</Link>
                </div>
              </div>
            </Presence>
          </div>
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
          <ol className="grid gap-4">
            <Step number="1" title="Enter your email">
              Use the address on your Fernway account.
            </Step>
            <Step number="2" title="Open the link">
              The link expires 30 minutes after we send it.
            </Step>
            <Step number="3" title="Set a new password">
              The link works one time.
            </Step>
          </ol>
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

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground"
      >
        {number}
      </span>
      <span className="grid min-w-0 gap-0.5">
        <span className="text-xs font-semibold text-foreground">{title}</span>
        <span className="text-xs leading-5 text-muted-foreground">
          {children}
        </span>
      </span>
    </li>
  );
}
