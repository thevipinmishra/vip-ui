"use client";

import { GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Alert } from "../../../components/vip-ui/alert";
import { Button } from "../../../components/vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/vip-ui/card";
import { Checkbox } from "../../../components/vip-ui/checkbox";
import { Form } from "../../../components/vip-ui/form";
import { Link } from "../../../components/vip-ui/link";
import { PasswordField } from "../../../components/vip-ui/password-field";
import { Separator } from "../../../components/vip-ui/separator";
import { TextField } from "../../../components/vip-ui/text-field";

export function LoginForm() {
  const [account, setAccount] = useState<string | null>(null);

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
            The account {account} is active on this device.
          </Alert>
        ) : (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              setAccount(String(data.get("email")));
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <GithubLogoIcon size={16} aria-hidden="true" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full">
                <GoogleLogoIcon size={16} aria-hidden="true" />
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
            <Button type="submit" className="w-full">
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
