"use client";

import { GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { PasswordField } from "@/components/ui/password-field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";

export function LoginForm() {
  const [account, setAccount] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  function signIn(method: string, email: string) {
    setPending(method);
    window.setTimeout(() => {
      setPending(null);
      setAccount(email);
    }, 800);
  }

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <CardTitle as="h1" className="text-xl">
          Sign in
        </CardTitle>
        <CardDescription>Use your work account to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        {account ? (
          <Alert variant="success" title="You are signed in" role="status">
            Account: {account}
          </Alert>
        ) : (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              signIn("email", String(data.get("email")));
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                isPending={pending === "github"}
                isDisabled={pending !== null && pending !== "github"}
                onPress={() => signIn("github", "maya@northwind.com")}
              >
                {pending === "github" ? (
                  <Spinner size="sm" decorative />
                ) : (
                  <GithubLogoIcon size={16} aria-hidden="true" />
                )}
                GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                isPending={pending === "google"}
                isDisabled={pending !== null && pending !== "google"}
                onPress={() => signIn("google", "maya@northwind.com")}
              >
                {pending === "google" ? (
                  <Spinner size="sm" decorative />
                ) : (
                  <GoogleLogoIcon size={16} aria-hidden="true" />
                )}
                Google
              </Button>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Separator className="flex-1" />
              or
              <Separator className="flex-1" />
            </div>
            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              isRequired
            />
            <PasswordField label="Password" name="password" isRequired />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Checkbox name="remember" defaultSelected>
                Keep me signed in
              </Checkbox>
              <Link href="#" className="text-sm">
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
        )}
      </CardContent>
      <CardFooter className="justify-center gap-1 border-t border-border/70 pt-5 text-sm text-muted-foreground">
        No account?
        <Link href="#">Create one</Link>
      </CardFooter>
    </Card>
  );
}
