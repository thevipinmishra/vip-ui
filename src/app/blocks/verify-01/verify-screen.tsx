"use client";

import {
  CheckCircleIcon,
  ClockIcon,
  DeviceMobileIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  TextField,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { TextSwap } from "@/components/ui/text-swap";
import { showToast } from "@/components/ui/toast";

const account = {
  name: "Maya Chen",
  email: "maya@marlow.studio",
};

const recoveryPattern = /^[A-Za-z0-9]{4}-?[A-Za-z0-9]{4}$/;

export function VerifyScreen() {
  const [mode, setMode] = useState<"code" | "recovery">("code");
  const [code, setCode] = useState("");
  const [recovery, setRecovery] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [resendAt, setResendAt] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const recoveryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resendAt === null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((resendAt - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) setResendAt(null);
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [resendAt]);

  function focusHeading() {
    window.setTimeout(() => headingRef.current?.focus(), 120);
  }

  function resend() {
    setResendAt(Date.now() + 30_000);
    setSecondsLeft(30);
    setNotice("A new code is on its way.");
    setError("");
    showToast({
      title: "We sent a new code",
      description: `Check ${account.email}. Older codes do not work.`,
    });
  }

  function switchMode(next: "code" | "recovery") {
    setMode(next);
    setError("");
    setNotice("");
    focusHeading();
  }

  function verify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (mode === "code") {
      if (!/^\d{6}$/.test(code.trim())) {
        setError("Enter the 6-digit code. Use numbers only.");
        codeRef.current?.querySelector<HTMLInputElement>("input")?.focus();
        return;
      }
    } else if (!recoveryPattern.test(recovery.trim())) {
      setError("Enter an 8-character recovery code, for example 4F7A-2C9D.");
      recoveryRef.current?.querySelector<HTMLInputElement>("input")?.focus();
      return;
    }
    setError("");
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setVerified(true);
      focusHeading();
    }, 900);
  }

  function signOut() {
    setVerified(false);
    setMode("code");
    setCode("");
    setRecovery("");
    setError("");
    setPending(false);
    setNotice("");
    setResendAt(null);
    setSecondsLeft(0);
    focusHeading();
    showToast({ title: "You are signed out" });
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
            {verified ? "Signed in" : "Step 2 of 2"}
          </span>
        </header>

        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            {verified ? (
              <div className="grid gap-6" role="status">
                <span className="grid size-12 place-items-center rounded-full bg-success-subtle text-success">
                  <CheckCircleIcon size={26} weight="fill" aria-hidden="true" />
                </span>
                <div className="grid gap-2">
                  <h1
                    ref={headingRef}
                    tabIndex={-1}
                    className="rounded-sm text-2xl font-semibold tracking-[-0.04em] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    You are signed in
                  </h1>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Welcome back, Maya.
                  </p>
                </div>
                <Alert variant="success" title="Trusted device">
                  This browser is trusted for 30 days.
                </Alert>
                <div className="grid gap-2">
                  <Button variant="outline" size="md" onPress={signOut}>
                    Sign out
                  </Button>
                  <Link href="/blocks/login-01" className="text-center text-sm">
                    Return to sign in
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <h1
                    id="recovery"
                    ref={headingRef}
                    tabIndex={-1}
                    className="rounded-sm text-2xl font-semibold tracking-[-0.04em] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {mode === "code"
                      ? "Enter your code"
                      : "Use a recovery code"}
                  </h1>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {mode === "code" ? (
                      <>
                        We sent a 6-digit code to{" "}
                        <span className="font-medium text-foreground">
                          {account.email}
                        </span>
                        . It expires in 10 minutes.
                      </>
                    ) : (
                      "Enter one of the 10 codes you saved."
                    )}
                  </p>
                </div>

                {error && (
                  <Alert variant="error" title="Check the code" role="alert">
                    {error}
                  </Alert>
                )}

                <Form className="gap-4" onSubmit={verify}>
                  {mode === "code" ? (
                    <TextField
                      ref={codeRef}
                      size="md"
                      value={code}
                      onChange={(value) => {
                        setCode(value);
                        setError("");
                      }}
                      isInvalid={Boolean(error)}
                    >
                      <TextFieldLabel>6-digit code</TextFieldLabel>
                      <TextFieldInput
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="000000"
                        className="ps-[0.35em] text-center font-mono text-lg tracking-[0.35em]"
                      />
                    </TextField>
                  ) : (
                    <TextField
                      ref={recoveryRef}
                      size="md"
                      value={recovery}
                      onChange={(value) => {
                        setRecovery(value);
                        setError("");
                      }}
                      isInvalid={Boolean(error)}
                    >
                      <TextFieldLabel>Recovery code</TextFieldLabel>
                      <TextFieldInput
                        autoCapitalize="characters"
                        autoComplete="off"
                        spellCheck={false}
                        maxLength={9}
                        placeholder="4F7A-2C9D"
                        className="text-center font-mono uppercase tracking-[0.12em]"
                      />
                      <TextFieldDescription>
                        Letters and numbers only.
                      </TextFieldDescription>
                    </TextField>
                  )}
                  <Button
                    type="submit"
                    size="md"
                    className="w-full"
                    isPending={pending}
                    isDisabled={pending}
                  >
                    {pending && <Spinner size="sm" decorative />}
                    {pending ? "Checking…" : "Verify"}
                  </Button>
                </Form>

                {mode === "code" ? (
                  <div className="grid gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground">No code?</span>
                      {secondsLeft > 0 ? (
                        <span className="inline-flex items-baseline gap-1 text-muted-foreground">
                          Send a new code in{" "}
                          <TextSwap
                            value={`${secondsLeft} s`}
                            className="font-medium text-foreground tabular-nums"
                          />
                        </span>
                      ) : (
                        <Button
                          variant="minimal"
                          size="sm"
                          className="h-auto p-0 text-sm font-medium text-primary underline underline-offset-4 hover:bg-transparent hover:text-primary/80"
                          isDisabled={pending}
                          onPress={resend}
                        >
                          Send a new code
                        </Button>
                      )}
                    </div>
                    {notice && (
                      <p
                        role="status"
                        className="text-xs leading-5 text-muted-foreground"
                      >
                        {notice}
                      </p>
                    )}
                  </div>
                ) : null}

                <div className="border-t border-border/70 pt-4 text-center text-sm">
                  {mode === "code" ? (
                    <Link
                      href="#recovery"
                      className="text-sm"
                      onPress={() => switchMode("recovery")}
                    >
                      Use a recovery code
                    </Link>
                  ) : (
                    <Link
                      href="#"
                      className="text-sm"
                      onPress={() => switchMode("code")}
                    >
                      Use a code from your app
                    </Link>
                  )}
                </div>
              </div>
            )}
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
        <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-card)] ring-1 ring-border/70">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Signing in as
          </p>
          <div className="mt-3 flex min-w-0 items-center gap-3">
            <Avatar name={account.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{account.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {account.email}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground">
            Not you?{" "}
            <Link href="/blocks/login-01" className="text-xs">
              Use another account
            </Link>
          </p>
        </div>

        <div className="grid gap-4">
          <h2 className="text-sm font-semibold tracking-[-0.02em]">
            Why this step?
          </h2>
          <ul className="grid gap-4">
            <SecurityPoint
              icon={<DeviceMobileIcon size={18} aria-hidden="true" />}
              title="A second proof"
              text="The code proves you have your device."
            />
            <SecurityPoint
              icon={<ClockIcon size={18} aria-hidden="true" />}
              title="Short life"
              text="Codes work one time and expire in 10 minutes."
            />
            <SecurityPoint
              icon={<ShieldCheckIcon size={18} aria-hidden="true" />}
              title="Protected session"
              text="A trusted browser skips this step for 30 days."
            />
          </ul>
        </div>

        <div className="mt-auto grid gap-2 rounded-xl bg-card p-4 ring-1 ring-border/70">
          <p className="text-sm font-semibold">Lost your device?</p>
          <p className="text-xs leading-5 text-muted-foreground">
            Use a recovery code or ask support to reset the second step.
          </p>
          <Link href="mailto:support@fernway.app" className="w-fit text-xs">
            support@fernway.app
          </Link>
        </div>
      </aside>
    </div>
  );
}

function SecurityPoint({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-card text-muted-foreground ring-1 ring-border/70">
        {icon}
      </span>
      <span className="grid min-w-0 gap-0.5">
        <span className="text-xs font-semibold text-foreground">{title}</span>
        <span className="text-xs leading-5 text-muted-foreground">{text}</span>
      </span>
    </li>
  );
}
