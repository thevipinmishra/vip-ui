"use client";

import { useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Presence } from "@/components/ui/presence";
import { TextField } from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";
import { PasswordCard } from "./password-card";
import { initialSessions, SessionsCard } from "./sessions-card";
import { SettingsShell } from "./settings-shell";
import { TwoStepCard } from "./two-step-card";

const email = "nadia@kestrel.app";

export function SecuritySettings() {
  const [sessions, setSessions] = useState(initialSessions);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleted, setDeleted] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <SettingsShell
      current="security"
      title="Security"
      description="Manage your password, two-step sign-in, and sessions."
    >
      <div className="grid gap-5">
        <Presence show={deleted} collapse>
          <div
            ref={alertRef}
            tabIndex={-1}
            className="outline-none [&>div]:outline-none"
          >
            <Alert
              variant="warning"
              title="Your account closes on Nov 10, 2026"
              action={
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => {
                    setDeleted(false);
                    showToast({
                      title: "Deletion canceled",
                      description: "Your account stays open.",
                      variant: "success",
                    });
                    requestAnimationFrame(() =>
                      deleteButtonRef.current?.focus(),
                    );
                  }}
                >
                  Keep account
                </Button>
              }
            >
              You can sign in and cancel until that date.
            </Alert>
          </div>
        </Presence>

        <PasswordCard
          otherSessions={sessions.length - 1}
          onSignOutOthers={() =>
            setSessions((current) =>
              current.filter((session) => session.current),
            )
          }
        />
        <TwoStepCard />
        <SessionsCard sessions={sessions} onChange={setSessions} />

        <Card>
          <CardHeader>
            <CardTitle as="h2">Delete account</CardTitle>
            <CardDescription>
              We remove your profile and personal data after 7 days. Kestrel
              Insights stays with its other admins.
            </CardDescription>
            <CardAction>
              <Button
                ref={deleteButtonRef}
                size="sm"
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10 pressed:bg-destructive/10"
                isDisabled={deleted}
                onPress={() => {
                  setConfirmText("");
                  setDeleteOpen(true);
                }}
              >
                Delete account
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{
          isOpen: deleteOpen,
          onOpenChange: (open) => {
            if (!open) setDeleteOpen(false);
          },
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Delete your account?</DialogTitle>
          <DialogDescription>
            Your account closes on Nov 10, 2026. You cannot undo this after that
            date.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <TextField
            label={`Type ${email} to confirm`}
            value={confirmText}
            onChange={setConfirmText}
            autoComplete="off"
            spellCheck="false"
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button
            variant="destructive"
            isDisabled={confirmText.trim().toLowerCase() !== email}
            onPress={() => {
              setDeleteOpen(false);
              setDeleted(true);
              showToast({
                title: "Deletion scheduled",
                description: "Your account closes on Nov 10, 2026.",
              });
              window.setTimeout(() => alertRef.current?.focus(), 80);
            }}
          >
            Delete account
          </Button>
        </DialogFooter>
      </DialogContent>
    </SettingsShell>
  );
}
