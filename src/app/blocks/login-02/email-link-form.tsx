"use client";

import { EnvelopeSimpleIcon, KeyIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { TextField } from "@/components/ui/text-field";

export function EmailLinkForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [resends, setResends] = useState(0);

  if (sentTo) {
    return (
      <div className="grid gap-6 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <EnvelopeSimpleIcon size={22} aria-hidden="true" />
        </span>
        <div className="grid gap-2">
          <h1 className="text-2xl font-semibold tracking-[-0.04em]">
            Check your email
          </h1>
          <output className="block text-sm leading-6 text-muted-foreground">
            We sent a sign-in link to{" "}
            <span className="font-medium text-foreground">{sentTo}</span>. The
            link expires in 10 minutes.
          </output>
        </div>
        <div className="grid gap-2">
          <Button variant="outline" onPress={() => setResends(resends + 1)}>
            Send the link again
          </Button>
          <Button variant="ghost" onPress={() => setSentTo(null)}>
            Use a different email
          </Button>
        </div>
        <output className="block min-h-4 text-xs text-muted-foreground">
          {resends > 0 && "We sent a new link. Only the latest link works."}
        </output>
      </div>
    );
  }

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setResends(0);
        setSentTo(String(data.get("email")));
      }}
    >
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-[-0.04em]">
          Sign in to Northwind
        </h1>
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
        isRequired
      />
      <Button type="submit" className="w-full">
        Email me a link
      </Button>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <Separator className="flex-1" />
        or
        <Separator className="flex-1" />
      </div>
      <Button variant="outline" className="w-full">
        <KeyIcon size={16} aria-hidden="true" />
        Sign in with a passkey
      </Button>
      <p className="text-center text-xs leading-5 text-muted-foreground">
        When you continue, you agree to the <Link href="#">terms</Link> and the{" "}
        <Link href="#">privacy policy</Link>.
      </p>
    </Form>
  );
}
