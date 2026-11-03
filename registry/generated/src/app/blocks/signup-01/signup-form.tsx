"use client";

import { CheckCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
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
import { PasswordStrengthMeter } from "../../../components/vip-ui/password-strength-meter";
import { Select } from "../../../components/vip-ui/select";
import { Spinner } from "../../../components/vip-ui/spinner";
import { TextField } from "../../../components/vip-ui/text-field";

const teamSizes = [
  { id: "1", name: "Only me" },
  { id: "2-10", name: "2 to 10 people" },
  { id: "11-50", name: "11 to 50 people" },
  { id: "51+", name: "More than 50 people" },
];

export function SignupForm() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (name) {
    return (
      <Card className="text-center" role="status">
        <CardHeader className="items-center">
          <CheckCircleIcon
            size={40}
            weight="fill"
            className="text-success"
            aria-hidden="true"
          />
          <CardTitle as="h1" className="mt-2 text-xl">
            Welcome, {name}
          </CardTitle>
          <CardDescription>
            Your account is ready. We sent a confirmation to your email.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button
            variant="outline"
            onPress={() => {
              setName(null);
              setPassword("");
            }}
          >
            Start again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h1" className="text-xl">
          Create an account
        </CardTitle>
        <CardDescription>
          Start a free trial for 14 days. You do not need a card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            const first = String(
              new FormData(event.currentTarget).get("name"),
            ).split(" ")[0];
            setPending(true);
            window.setTimeout(() => {
              setPending(false);
              setName(first);
            }, 900);
          }}
        >
          <TextField
            label="Full name"
            name="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            isRequired
          />
          <TextField
            label="Work email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ada@company.com"
            isRequired
          />
          <div className="grid gap-3">
            <PasswordField
              label="Password"
              name="password"
              autoComplete="new-password"
              description="Use 12 or more characters. Mix letters with numbers or symbols."
              value={password}
              onChange={setPassword}
              minLength={8}
              isRequired
            />
            <PasswordStrengthMeter password={password} />
          </div>
          <Select
            label="Team size"
            name="team"
            options={teamSizes}
            defaultValue="2-10"
          />
          <Checkbox
            name="terms"
            isRequired
            errorMessage="Accept the terms to create an account."
          >
            I agree to the terms of service
          </Checkbox>
          <Button type="submit" className="w-full" isPending={pending}>
            {pending && <Spinner size="sm" decorative />}
            Create account
          </Button>
        </Form>
      </CardContent>
      <CardFooter className="justify-center gap-1 border-t border-border/70 pt-5 text-sm text-muted-foreground">
        Have an account?
        <Link href="#">Sign in</Link>
      </CardFooter>
    </Card>
  );
}
