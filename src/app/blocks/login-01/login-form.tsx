"use client";

import { GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { IconSwap } from "@/components/ui/icon-swap";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { Link } from "@/components/ui/link";
import { PasswordField } from "@/components/ui/password-field";
import { Presence } from "@/components/ui/presence";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";

type Method = "github" | "google" | "email";

const providers = [
  { id: "github", name: "GitHub", icon: GithubLogoIcon },
  { id: "google", name: "Google", icon: GoogleLogoIcon },
] as const;

const providerAccount = "maya@northwind.com";
const minPasswordLength = 8;

export function LoginForm() {
  const [account, setAccount] = useState<string | null>(null);
  const [pending, setPending] = useState<Method | null>(null);
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const [returned, setReturned] = useState(false);
  const passwordRef = useRef<HTMLDivElement>(null);

  function signInWith(method: Method) {
    setFailed(false);
    setPending(method);
    window.setTimeout(() => {
      setPending(null);
      setPassword("");
      setAccount(providerAccount);
    }, 800);
  }

  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email"));
    setFailed(false);
    setPending("email");
    window.setTimeout(() => {
      setPending(null);
      setPassword("");
      if (password.length < minPasswordLength) {
        setFailed(true);
        passwordRef.current?.querySelector("input")?.focus();
        return;
      }
      setAccount(email);
    }, 800);
  }

  return (
    <Card>
      <CardContent className="p-0">
        <LayoutMorph contentKey={account ? "account" : "form"}>
          {account ? (
            <div className="grid justify-items-center gap-5 p-5 text-center">
              <Avatar name={account} size="lg" />
              <div className="grid gap-1">
                <ViewHeading focusOnMount>You are signed in</ViewHeading>
                <CardDescription>{account}</CardDescription>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onPress={() => {
                  setReturned(true);
                  setAccount(null);
                }}
              >
                Sign out
              </Button>
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
                  Sign in to Northwind
                </ViewHeading>
                <CardDescription>Use your work account.</CardDescription>
              </div>
              <Form onSubmit={signIn}>
                <div className="grid grid-cols-2 gap-3">
                  {providers.map((provider) => (
                    <Button
                      key={provider.id}
                      variant="outline"
                      className="w-full"
                      isPending={pending === provider.id}
                      isDisabled={pending !== null && pending !== provider.id}
                      onPress={() => signInWith(provider.id)}
                    >
                      <IconSwap
                        contentKey={
                          pending === provider.id ? "pending" : "idle"
                        }
                      >
                        {pending === provider.id ? (
                          <Spinner size="sm" decorative />
                        ) : (
                          <provider.icon />
                        )}
                      </IconSwap>
                      {provider.name}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Separator className="flex-1" />
                  or
                  <Separator className="flex-1" />
                </div>
                <Presence show={failed} collapse>
                  <Alert variant="error" title="Sign-in failed" role="alert">
                    The email or password is not correct.
                  </Alert>
                </Presence>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  isRequired
                />
                <PasswordField
                  ref={passwordRef}
                  label="Password"
                  name="password"
                  value={password}
                  onChange={setPassword}
                  isRequired
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Checkbox name="remember" defaultSelected>
                    Keep me signed in
                  </Checkbox>
                  <Link href="/blocks/reset-01" className="text-sm">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  isPending={pending === "email"}
                  isDisabled={pending !== null && pending !== "email"}
                >
                  {pending === "email" && <Spinner size="sm" decorative />}
                  Sign in
                </Button>
              </Form>
              <p className="-mx-5 -mb-5 border-t border-border/70 p-5 text-center text-sm text-muted-foreground">
                No account? <Link href="/blocks/signup-01">Create one</Link>
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
