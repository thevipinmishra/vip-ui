"use client";

import { useState } from "react";
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
import { Meter } from "@/components/ui/meter";
import { PasswordField } from "@/components/ui/password-field";
import { Presence } from "@/components/ui/presence";
import { Spinner } from "@/components/ui/spinner";
import { showToast } from "@/components/ui/toast";

const minLength = 12;

const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];

function strengthOf(password: string) {
  if (password.length < minLength) return 0;
  let score = 1;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export function PasswordCard({
  otherSessions,
  onSignOutOthers,
}: {
  otherSessions: number;
  onSignOutOthers: () => void;
}) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [signOut, setSignOut] = useState(true);
  const [pending, setPending] = useState(false);
  const [lastChanged, setLastChanged] = useState("Oct 12, 2026");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const strength = strengthOf(next);

  function clearError(field: string) {
    setErrors(({ [field]: _, ...rest }) => rest);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Password</CardTitle>
        <CardDescription>Last changed {lastChanged}.</CardDescription>
      </CardHeader>
      <Form
        className="contents"
        validationErrors={errors}
        onSubmit={(event) => {
          event.preventDefault();
          const found: Record<string, string> = {};
          if (next.length < minLength)
            found.next = `Use at least ${minLength} characters.`;
          else if (next === current)
            found.next = "Use a password that you do not use now.";
          if (confirm !== next)
            found.confirm = "The two passwords are different.";
          setErrors(found);
          if (Object.keys(found).length > 0) return;
          setPending(true);
          window.setTimeout(() => {
            setPending(false);
            setCurrent("");
            setNext("");
            setConfirm("");
            setLastChanged("Nov 3, 2026");
            if (signOut && otherSessions > 0) onSignOutOthers();
            showToast({
              title: "Password updated",
              description:
                signOut && otherSessions > 0
                  ? "Your other sessions are signed out."
                  : "Your other sessions stay signed in.",
              variant: "success",
            });
          }, 700);
        }}
      >
        <CardContent className="grid max-w-md gap-4">
          <PasswordField
            size="sm"
            name="current"
            label="Current password"
            autoComplete="current-password"
            value={current}
            onChange={setCurrent}
            isRequired
          />
          <div className="grid gap-2">
            <PasswordField
              size="sm"
              name="next"
              label="New password"
              autoComplete="new-password"
              value={next}
              onChange={(value) => {
                setNext(value);
                clearError("next");
              }}
              isRequired
            />
            <Presence show={next.length > 0} collapse>
              <Meter
                label="Strength"
                value={strength}
                maxValue={4}
                valueLabel={strengthLabels[strength]}
                className="pt-1 **:data-[slot=meter-value]:font-sans"
              />
            </Presence>
          </div>
          <PasswordField
            size="sm"
            name="confirm"
            label="Confirm new password"
            autoComplete="new-password"
            value={confirm}
            onChange={(value) => {
              setConfirm(value);
              clearError("confirm");
            }}
            isRequired
          />
          <Checkbox checked={signOut} onCheckedChange={setSignOut}>
            Sign out of my other sessions
          </Checkbox>
        </CardContent>
        <CardFooter className="justify-between border-t border-border/70 pt-4">
          <p className="text-xs leading-5 text-muted-foreground">
            Use at least {minLength} characters.
          </p>
          <Button type="submit" size="sm" isDisabled={pending}>
            {pending && <Spinner size="sm" decorative />}
            Update password
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
