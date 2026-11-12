"use client";

import {
  CheckCircleIcon,
  ClockIcon,
  DeviceMobileIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { Link } from "@/components/ui/link";
import { Spinner } from "@/components/ui/spinner";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { TextSwap } from "@/components/ui/text-swap";
import { showToast } from "@/components/ui/toast";
import { CodeInput } from "./code-input";

type View = "code" | "recovery" | "done";

const account = {
  name: "Maya Chen",
  email: "maya@marlow.studio",
  phoneEnd: "4127",
};

const rejectedCode = "000000";
const recoveryPattern = /^[A-Za-z0-9]{4}-?[A-Za-z0-9]{4}$/;
const resendDelay = 30;

export function VerifyScreen() {
  const [view, setView] = useState<View>("code");
  const [code, setCode] = useState("");
  const [recovery, setRecovery] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [trusted, setTrusted] = useState(true);
  const [moved, setMoved] = useState(false);
  const cooldown = useCooldown();
  const codeRef = useRef<HTMLDivElement>(null);
  const recoveryRef = useRef<HTMLDivElement>(null);

  function show(next: View) {
    setError("");
    setMoved(true);
    setView(next);
  }

  function resend() {
    cooldown.start(resendDelay);
    setCode("");
    setError("");
    codeRef.current?.querySelector("input")?.focus();
    showToast({
      title: "We sent a new code",
      description: "Older codes do not work.",
    });
  }

  function verify(value: string) {
    if (pending) return;
    if (view === "code" && value.length < 6) {
      setError("Enter all 6 digits.");
      codeRef.current?.querySelector("input")?.focus();
      return;
    }
    if (view === "recovery" && !recoveryPattern.test(value.trim())) {
      setError("Enter an 8-character recovery code, for example 4F7A-2C9D.");
      recoveryRef.current?.querySelector("input")?.focus();
      return;
    }
    setError("");
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      if (view === "code" && value === rejectedCode) {
        setCode("");
        setError(
          "That code is not correct. Enter it again or send a new code.",
        );
        codeRef.current?.querySelector("input")?.focus();
        return;
      }
      show("done");
    }, 900);
  }

  function signOut() {
    setCode("");
    setRecovery("");
    cooldown.stop();
    show("code");
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
          <TextSwap
            value={view === "done" ? "Signed in" : "Step 2 of 2"}
            className="shrink-0 text-xs font-medium text-muted-foreground"
          />
        </header>

        <main className="flex flex-1 items-center justify-center py-10">
          <LayoutMorph contentKey={view} className="w-full max-w-sm">
            {view === "done" ? (
              <div className="grid gap-6">
                <span className="grid size-12 place-items-center rounded-full bg-success-subtle text-success">
                  <CheckCircleIcon size={26} weight="fill" aria-hidden="true" />
                </span>
                <div className="grid gap-2">
                  <ViewHeading focusOnMount>You are signed in</ViewHeading>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Welcome back, Maya.
                  </p>
                </div>
                {trusted && (
                  <Alert variant="success" title="Trusted browser">
                    Fernway does not ask for a code on this browser for 30 days.
                  </Alert>
                )}
                <Button variant="outline" onPress={signOut}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                <div className="flex min-w-0 items-center gap-3 rounded-xl bg-card p-3 shadow-[var(--shadow-card)] ring-1 ring-border/70">
                  <Avatar name={account.name} size="sm" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {account.email}
                  </span>
                  <Link href="/blocks/login-01" className="shrink-0 text-sm">
                    Not you?
                  </Link>
                </div>

                <div className="grid gap-2">
                  <ViewHeading focusOnMount={moved}>
                    {view === "code"
                      ? "Enter your code"
                      : "Use a recovery code"}
                  </ViewHeading>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {view === "code" ? (
                      <>
                        We sent a 6-digit code to the phone number that ends in{" "}
                        <span className="font-medium text-foreground">
                          {account.phoneEnd}
                        </span>
                        . The code expires in 10 minutes.
                      </>
                    ) : (
                      "Enter one of the 10 codes you saved. Each code works one time."
                    )}
                  </p>
                </div>

                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    verify(view === "code" ? code : recovery);
                  }}
                >
                  {view === "code" ? (
                    <CodeInput
                      ref={codeRef}
                      label="6-digit code"
                      value={code}
                      error={error}
                      isReadOnly={pending}
                      onChange={(value) => {
                        setCode(value);
                        setError("");
                      }}
                      onComplete={verify}
                    />
                  ) : (
                    <TextField
                      ref={recoveryRef}
                      name="recovery"
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
                        className="font-mono uppercase tracking-[0.12em] placeholder:tracking-[0.12em]"
                      />
                      <TextFieldDescription>
                        Letters and numbers only.
                      </TextFieldDescription>
                      <TextFieldError>{error}</TextFieldError>
                    </TextField>
                  )}
                  <Checkbox isSelected={trusted} onChange={setTrusted}>
                    Trust this browser for 30 days
                  </Checkbox>
                  <Button type="submit" className="w-full" isPending={pending}>
                    {pending && <Spinner size="sm" decorative />}
                    Verify
                  </Button>
                </Form>

                {view === "code" && (
                  <div className="flex min-h-9 flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">No code?</span>
                    {cooldown.secondsLeft > 0 ? (
                      <span className="inline-flex items-baseline gap-1 text-muted-foreground">
                        Send a new code in
                        <TextSwap
                          value={`${cooldown.secondsLeft} s`}
                          className="font-medium text-foreground tabular-nums"
                        />
                      </span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-me-3.5"
                        isDisabled={pending}
                        onPress={resend}
                      >
                        Send a new code
                      </Button>
                    )}
                  </div>
                )}

                <div className="grid border-t border-border/70 pt-4">
                  <Button
                    variant="ghost"
                    isDisabled={pending}
                    onPress={() => show(view === "code" ? "recovery" : "code")}
                  >
                    {view === "code"
                      ? "Use a recovery code"
                      : "Use a text message code"}
                  </Button>
                </div>
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
        <div className="grid gap-4">
          <h2 className="text-sm font-semibold tracking-[-0.02em]">
            Why this step?
          </h2>
          <ul className="grid gap-4">
            <SecurityPoint
              icon={<DeviceMobileIcon size={18} aria-hidden="true" />}
              title="A second proof"
              text="The code proves you have your phone."
            />
            <SecurityPoint
              icon={<ClockIcon size={18} aria-hidden="true" />}
              title="Short life"
              text="Codes work one time and expire in 10 minutes."
            />
            <SecurityPoint
              icon={<ShieldCheckIcon size={18} aria-hidden="true" />}
              title="Trusted browsers"
              text="A trusted browser skips this step for 30 days."
            />
          </ul>
        </div>

        <div className="mt-auto grid gap-2 rounded-xl bg-card p-4 ring-1 ring-border/70">
          <p className="text-sm font-semibold">Lost your phone?</p>
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

function SecurityPoint({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
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
