"use client";

import { DeviceMobileIcon, KeyIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { InlineCode } from "@/components/ui/kbd-code";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { Presence } from "@/components/ui/presence";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { TextSwap } from "@/components/ui/text-swap";
import { showToast } from "@/components/ui/toast";

const authenticatorKey = "JBSW Y3DP EHPK 3PXP";

const initialRecoveryCodes = [
  "7Q4M-2K9P",
  "B8XR-5T1N",
  "F2WD-8J6C",
  "L9YA-3H7S",
  "P4NE-6V2R",
  "T6CU-9M3B",
  "X7GA-1D8K",
  "Z3HF-5W9L",
];

function newRecoveryCodes() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () =>
      alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
    ).join(""),
  ).map((code) => `${code.slice(0, 4)}-${code.slice(4)}`);
}

function MethodIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border/70"
    >
      {children}
    </span>
  );
}

function RecoveryCodes({ codes }: { codes: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg bg-muted/60 p-4 font-mono text-sm tracking-wide ring-1 ring-border/70">
      {codes.map((code) => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  );
}

export function TwoStepCard() {
  const [enabled, setEnabled] = useState(false);
  const [alerts, setAlerts] = useState(true);
  const [setupOpen, setSetupOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState(initialRecoveryCodes);
  const [codesOpen, setCodesOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);
  const copyCodesRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!(setupOpen && step === 2)) return;
    const frame = requestAnimationFrame(() => copyCodesRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [setupOpen, step]);

  function openSetup() {
    setStep(1);
    setCode("");
    setCodeError("");
    setSetupOpen(true);
  }

  function verifyCode() {
    if (code.length !== 6) {
      setCodeError("Enter the 6-digit code from your app.");
      return;
    }
    if (code === "000000") {
      setCodeError("That code is not correct. Wait for the next code.");
      return;
    }
    setCodeError("");
    setStep(2);
  }

  function finishSetup() {
    setEnabled(true);
    setSetupOpen(false);
    showToast({
      title: "Two-step sign-in is on",
      description: "We ask for a code each time you sign in.",
      variant: "success",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Two-step sign-in</CardTitle>
        <CardDescription>
          Add a second step to keep your account safe.
        </CardDescription>
        <CardAction>
          <Badge variant={enabled ? "success" : "neutral"} dot={enabled}>
            {enabled ? "On" : "Off"}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="flex min-w-0 items-center gap-3">
            <MethodIcon>
              <DeviceMobileIcon size={18} />
            </MethodIcon>
            <div className="min-w-0">
              <p className="text-sm font-medium">Authenticator app</p>
              <p className="text-xs leading-5 text-muted-foreground">
                <TextSwap
                  value={
                    enabled
                      ? "Added Nov 3, 2026"
                      : "Use a 6-digit code from an app on your phone."
                  }
                />
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={enabled ? "outline" : "default"}
            onPress={enabled ? () => setDisableOpen(true) : openSetup}
          >
            {enabled ? "Turn off" : "Set up"}
          </Button>
        </div>
        <Presence show={enabled} collapse>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-border/70 pt-4">
            <div className="flex min-w-0 items-center gap-3">
              <MethodIcon>
                <KeyIcon size={18} />
              </MethodIcon>
              <div className="min-w-0">
                <p className="text-sm font-medium">Recovery codes</p>
                <p className="text-xs leading-5 text-muted-foreground">
                  {recoveryCodes.length} codes left. Each code works one time.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setCodesOpen(true)}
            >
              View codes
            </Button>
          </div>
        </Presence>
        <div className="border-t border-border/70 pt-4">
          <Switch
            checked={alerts}
            onCheckedChange={setAlerts}
            description="We send an email when a new device signs in."
            className="w-full"
          >
            Sign-in alerts
          </Switch>
        </div>
      </CardContent>

      <DialogContent
        size="md"
        overlayProps={{
          isOpen: setupOpen,
          onOpenChange: (open) => {
            if (!open) setSetupOpen(false);
          },
        }}
      >
        <Form
          className="contents"
          validationErrors={codeError ? { code: codeError } : undefined}
          onSubmit={(event) => {
            event.preventDefault();
            verifyCode();
          }}
        >
          <DialogHeader>
            <DialogTitle level={2}>
              <TextSwap
                value={
                  step === 1
                    ? "Set up two-step sign-in"
                    : "Save your recovery codes"
                }
              />
            </DialogTitle>
            <DialogDescription>
              {step === 1
                ? "Step 1 of 2. Add this key to your authenticator app."
                : "Step 2 of 2. Use a code if you lose your phone."}
            </DialogDescription>
            <DialogClose />
          </DialogHeader>
          <DialogBody>
            <LayoutMorph contentKey={step}>
              {step === 1 ? (
                <div className="grid gap-4">
                  <div className="rounded-lg bg-muted/60 p-4 ring-1 ring-border/70">
                    <p className="text-sm font-medium">Setup key</p>
                    <div className="mt-2 flex min-w-0 items-center gap-2">
                      <InlineCode className="min-w-0 flex-1 px-2.5 py-1.5 text-sm tracking-[0.14em]">
                        {authenticatorKey}
                      </InlineCode>
                      <CopyButton
                        value={authenticatorKey}
                        iconOnly
                        size="sm"
                        variant="ghost"
                        aria-label="Copy setup key"
                      />
                    </div>
                  </div>
                  <TextField
                    name="code"
                    label="6-digit code"
                    value={code}
                    onChange={(value) => {
                      setCode(value.replace(/\D/g, "").slice(0, 6));
                      setCodeError("");
                    }}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="123456"
                    description="The code changes every 30 seconds."
                    autoFocus
                  />
                </div>
              ) : (
                <div className="grid gap-4">
                  <Alert variant="warning" title="Store these codes now">
                    We do not show them again after you close this window.
                  </Alert>
                  <RecoveryCodes codes={recoveryCodes} />
                </div>
              )}
            </LayoutMorph>
          </DialogBody>
          {step === 1 ? (
            <DialogFooter>
              <DialogClose variant="outline">Cancel</DialogClose>
              <Button type="submit">Verify code</Button>
            </DialogFooter>
          ) : (
            <DialogFooter>
              <CopyButton
                ref={copyCodesRef}
                value={recoveryCodes.join("\n")}
                variant="outline"
              >
                Copy codes
              </CopyButton>
              <Button onPress={finishSetup}>Finish setup</Button>
            </DialogFooter>
          )}
        </Form>
      </DialogContent>

      <DialogContent
        size="md"
        overlayProps={{
          isOpen: codesOpen,
          onOpenChange: (open) => {
            if (!open) setCodesOpen(false);
          },
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Recovery codes</DialogTitle>
          <DialogDescription>
            Use a code to sign in when you do not have your phone.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogBody>
          <RecoveryCodes codes={recoveryCodes} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="ghost"
            className="sm:me-auto"
            onPress={() => {
              setRecoveryCodes(newRecoveryCodes());
              showToast({
                title: "New recovery codes are ready",
                description: "The old codes no longer work.",
              });
            }}
          >
            Make new codes
          </Button>
          <CopyButton value={recoveryCodes.join("\n")} variant="outline">
            Copy codes
          </CopyButton>
          <DialogClose variant="default">Done</DialogClose>
        </DialogFooter>
      </DialogContent>

      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{
          isOpen: disableOpen,
          onOpenChange: (open) => {
            if (!open) setDisableOpen(false);
          },
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Turn off two-step sign-in?</DialogTitle>
          <DialogDescription>
            Your password becomes the only sign-in step. Your recovery codes
            stop working.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button
            variant="destructive"
            onPress={() => {
              setEnabled(false);
              setDisableOpen(false);
              setRecoveryCodes(initialRecoveryCodes);
              showToast({ title: "Two-step sign-in is off" });
            }}
          >
            Turn off
          </Button>
        </DialogFooter>
      </DialogContent>
    </Card>
  );
}
