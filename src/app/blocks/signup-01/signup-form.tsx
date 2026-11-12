"use client";

import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { Link } from "@/components/ui/link";
import { Meter } from "@/components/ui/meter";
import { PasswordField } from "@/components/ui/password-field";
import { Presence } from "@/components/ui/presence";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";
import { TextSwap } from "@/components/ui/text-swap";
import { showToast } from "@/components/ui/toast";

const teamSizes = [
  { id: "1", name: "Only me" },
  { id: "2-10", name: "2 to 10 people" },
  { id: "11-50", name: "11 to 50 people" },
  { id: "51+", name: "More than 50 people" },
];

const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];
const minPasswordLength = 12;
const resendDelay = 30;

function passwordStrength(password: string) {
  if (password.length < minPasswordLength) return 0;
  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((kind) =>
    kind.test(password),
  ).length;
  return Math.min(4, kinds + (password.length >= 16 ? 1 : 0));
}

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("2-10");
  const [pending, setPending] = useState(false);
  const [created, setCreated] = useState(false);
  const [returned, setReturned] = useState(false);
  const cooldown = useCooldown();
  const strength = passwordStrength(password);

  function createAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setPassword("");
      cooldown.start(resendDelay);
      setCreated(true);
    }, 900);
  }

  return (
    <Card>
      <CardContent className="p-0">
        <LayoutMorph contentKey={created ? "confirm" : "form"}>
          {created ? (
            <div className="grid justify-items-center gap-5 p-5 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
                <EnvelopeSimpleIcon size={22} aria-hidden="true" />
              </span>
              <div className="grid gap-1">
                <ViewHeading focusOnMount>Confirm your email</ViewHeading>
                <CardDescription>
                  Welcome, {name.trim().split(/\s+/)[0]}. We sent a link to{" "}
                  <span className="font-medium text-foreground">{email}</span>.
                  Open it to start your trial.
                </CardDescription>
              </div>
              <div className="grid w-full gap-2">
                <Button
                  variant="outline"
                  isDisabled={cooldown.secondsLeft > 0}
                  onPress={() => {
                    cooldown.start(resendDelay);
                    showToast({
                      title: "We sent a new link",
                      description: "Only the newest link works.",
                    });
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
                <Button
                  variant="ghost"
                  onPress={() => {
                    cooldown.stop();
                    setReturned(true);
                    setCreated(false);
                  }}
                >
                  Change the email
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 p-5">
              <div className="grid justify-items-center gap-1 text-center">
                <span
                  aria-hidden="true"
                  className="mb-2 grid size-9 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
                >
                  N
                </span>
                <ViewHeading focusOnMount={returned}>
                  Create your Northwind account
                </ViewHeading>
                <CardDescription>
                  Start a free trial for 14 days. You do not need a card.
                </CardDescription>
              </div>
              <Form onSubmit={createAccount}>
                <TextField
                  label="Full name"
                  name="name"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={setName}
                  isRequired
                />
                <TextField
                  label="Work email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ada@company.com"
                  value={email}
                  onChange={setEmail}
                  isRequired
                />
                <div>
                  <PasswordField
                    label="Password"
                    name="password"
                    autoComplete="new-password"
                    description="Use 12 or more characters. Mix letters with numbers or symbols."
                    value={password}
                    onChange={setPassword}
                    minLength={minPasswordLength}
                    isRequired
                  />
                  <Presence show={password.length > 0} collapse>
                    <Meter
                      label="Password strength"
                      value={strength}
                      maxValue={4}
                      valueLabel={strengthLabels[strength]}
                      className="pt-3"
                    />
                  </Presence>
                </div>
                <Select
                  label="Team size"
                  name="team"
                  options={teamSizes}
                  value={team}
                  onValueChange={setTeam}
                />
                <Checkbox
                  name="terms"
                  isRequired
                  errorMessage="Accept the terms to create an account."
                >
                  I agree to the <Link href="#">terms</Link> and the{" "}
                  <Link href="#">privacy policy</Link>
                </Checkbox>
                <Button type="submit" className="w-full" isPending={pending}>
                  {pending && <Spinner size="sm" decorative />}
                  Create account
                </Button>
              </Form>
              <p className="-mx-5 -mb-5 border-t border-border/70 p-5 text-center text-sm text-muted-foreground">
                Have an account? <Link href="/blocks/login-01">Sign in</Link>
              </p>
            </div>
          )}
        </LayoutMorph>
      </CardContent>
    </Card>
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
    <CardTitle
      as="h1"
      ref={ref}
      tabIndex={-1}
      className="rounded-sm text-xl outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {children}
    </CardTitle>
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
