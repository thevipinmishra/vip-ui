"use client";

import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Button } from "../../vip-ui/button";
import { Card } from "../../vip-ui/card";
import { ComboBox } from "../../vip-ui/combo-box";
import { FileTrigger } from "../../vip-ui/file-trigger";
import { Form } from "../../vip-ui/form";
import { IconSwap } from "../../vip-ui/icon-swap";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../vip-ui/input-group";
import { Presence } from "../../vip-ui/presence";
import { Select } from "../../vip-ui/select";
import { Spinner } from "../../vip-ui/spinner";
import { TextArea } from "../../vip-ui/text-area";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldLabel,
} from "../../vip-ui/text-field";
import { TextSwap } from "../../vip-ui/text-swap";
import { ToggleButton } from "../../vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../vip-ui/toggle-button-group";
import { cn } from "../../vip-ui/utils";
import { timezones } from "./timezones";

interface Profile {
  name: string;
  title: string;
  username: string;
  bio: string;
  email: string;
  language: string;
  timezone: string;
  timeFormat: string;
}

const initialProfile: Profile = {
  name: "Nadia Okafor",
  title: "Head of data",
  username: "nadia",
  bio: "I own the metrics, the alerts, and the warehouse sync.",
  email: "nadia@kestrel.app",
  language: "en-us",
  timezone: "europe-berlin",
  timeFormat: "24",
};

const languages = [
  { id: "en-us", name: "English (United States)" },
  { id: "en-gb", name: "English (United Kingdom)" },
  { id: "de", name: "Deutsch" },
  { id: "es", name: "Español" },
  { id: "fr", name: "Français" },
  { id: "ja", name: "日本語" },
];

const takenUsernames = new Set(["admin", "ana", "kestrel", "leo", "support"]);
const usernamePattern = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/;
const bioLimit = 160;

type UsernameCheck = "idle" | "checking" | "available" | "taken";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] xl:gap-10">
      <div>
        <h2 className="text-base font-semibold tracking-[-0.025em]">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      <Card className="grid gap-4 p-5">{children}</Card>
    </section>
  );
}

export function ProfileForm() {
  const [saved, setSaved] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [savedPhoto, setSavedPhoto] = useState<string | undefined>();
  const [photo, setPhoto] = useState<string | undefined>();
  const [check, setCheck] = useState<UsernameCheck>("idle");
  const [pending, setPending] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const savedTimer = useRef<number | undefined>(undefined);
  const checkTimer = useRef<number | undefined>(undefined);
  const timeFormatLabel = useId();
  const dirty =
    photo !== savedPhoto ||
    (Object.keys(saved) as (keyof Profile)[]).some(
      (key) => saved[key] !== draft[key],
    );

  useEffect(
    () => () => {
      window.clearTimeout(checkTimer.current);
      window.clearTimeout(savedTimer.current);
    },
    [],
  );

  function update(field: keyof Profile) {
    return (value: string) =>
      setDraft((current) => ({ ...current, [field]: value }));
  }

  function changeUsername(value: string) {
    const username = value.toLowerCase();
    update("username")(username);
    window.clearTimeout(checkTimer.current);
    if (username === saved.username || !usernamePattern.test(username)) {
      setCheck("idle");
      return;
    }
    setCheck("checking");
    checkTimer.current = window.setTimeout(
      () => setCheck(takenUsernames.has(username) ? "taken" : "available"),
      600,
    );
  }

  function changePhoto(next: string | undefined) {
    if (photo && photo !== savedPhoto) URL.revokeObjectURL(photo);
    setPhoto(next);
  }

  function discard() {
    window.clearTimeout(checkTimer.current);
    setCheck("idle");
    setDraft(saved);
    changePhoto(savedPhoto);
  }

  return (
    <Form
      className="gap-8"
      onSubmit={(event) => {
        event.preventDefault();
        if (check === "checking" || check === "taken") return;
        setPending(true);
        window.setTimeout(() => {
          if (savedPhoto && savedPhoto !== photo)
            URL.revokeObjectURL(savedPhoto);
          setSaved(draft);
          setSavedPhoto(photo);
          setCheck("idle");
          setPending(false);
          setJustSaved(true);
          window.clearTimeout(savedTimer.current);
          savedTimer.current = window.setTimeout(
            () => setJustSaved(false),
            2400,
          );
        }, 700);
      }}
    >
      <Section
        title="Public profile"
        description="Other people in Kestrel Insights see this information."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Avatar
            name={draft.name || "?"}
            src={photo}
            className="size-16 text-base"
          />
          <div className="grid gap-2">
            <div className="flex flex-wrap gap-2">
              <FileTrigger
                acceptedFileTypes={["image/png", "image/jpeg"]}
                onSelect={(files) => {
                  const file = files?.[0];
                  if (file) changePhoto(URL.createObjectURL(file));
                }}
              >
                <Button variant="outline" size="sm">
                  {photo ? "Change photo" : "Upload photo"}
                </Button>
              </FileTrigger>
              {photo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => changePhoto(undefined)}
                >
                  Remove
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              PNG or JPG, at least 256 px wide.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            size="sm"
            label="Display name"
            name="name"
            autoComplete="name"
            value={draft.name}
            onChange={update("name")}
            isRequired
          />
          <TextField
            size="sm"
            label="Job title"
            name="title"
            autoComplete="organization-title"
            value={draft.title}
            onChange={update("title")}
          />
        </div>
        <TextField
          size="sm"
          name="username"
          value={draft.username}
          onChange={changeUsername}
          validate={(value) =>
            usernamePattern.test(value)
              ? null
              : "Use 3 to 30 lowercase letters, numbers, or hyphens."
          }
          isInvalid={check === "taken" || undefined}
          isRequired
        >
          <TextFieldLabel>Username</TextFieldLabel>
          <InputGroup>
            <InputGroupAddon>kestrel.app/</InputGroupAddon>
            <InputGroupInput autoComplete="username" spellCheck="false" />
            {check !== "idle" && (
              <InputGroupAddon>
                <IconSwap contentKey={check}>
                  {check === "checking" ? (
                    <Spinner size="sm" decorative />
                  ) : check === "available" ? (
                    <CheckCircleIcon
                      size={18}
                      weight="fill"
                      className="text-success"
                    />
                  ) : (
                    <WarningCircleIcon
                      size={18}
                      weight="fill"
                      className="text-destructive"
                    />
                  )}
                </IconSwap>
              </InputGroupAddon>
            )}
          </InputGroup>
          <TextFieldDescription>
            {check === "available"
              ? `kestrel.app/${draft.username} is available.`
              : "Your profile address. Old links stop working when you change it."}
          </TextFieldDescription>
          <TextFieldError>
            {check === "taken" ? "This username is taken." : undefined}
          </TextFieldError>
        </TextField>
        <TextArea
          size="sm"
          label="Bio"
          name="bio"
          rows={3}
          value={draft.bio}
          onChange={update("bio")}
          maxLength={bioLimit}
          description={`${bioLimit - draft.bio.length} characters left`}
        />
      </Section>
      <Section
        title="Contact"
        description="We use this address for sign-in and for notification emails."
      >
        <TextField
          size="sm"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={draft.email}
          onChange={update("email")}
          description={
            draft.email === saved.email
              ? "This address is confirmed."
              : "We send a link to confirm the new address."
          }
          isRequired
        />
      </Section>
      <Section
        title="Language and region"
        description="These settings change how Kestrel shows text, dates, and times."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            size="sm"
            label="Language"
            name="language"
            options={languages}
            value={draft.language}
            onValueChange={update("language")}
          />
          <ComboBox
            size="sm"
            label="Time zone"
            name="timezone"
            formValue="key"
            placeholder="Search for a city"
            options={timezones}
            value={draft.timezone}
            onValueChange={(value) => {
              if (value) update("timezone")(value);
            }}
          />
        </div>
        <div className="grid justify-items-start gap-2">
          <span id={timeFormatLabel} className="text-sm font-medium">
            Time format
          </span>
          <ToggleButtonGroup
            size="sm"
            aria-labelledby={timeFormatLabel}
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={new Set([draft.timeFormat])}
            onSelectionChange={(keys) => {
              const next = Array.from(keys)[0];
              if (next) update("timeFormat")(String(next));
            }}
          >
            <ToggleButton id="12" variant="segmented">
              2:30 PM
            </ToggleButton>
            <ToggleButton id="24" variant="segmented">
              14:30
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Section>
      <output aria-live="polite" className="sr-only">
        {justSaved ? "Your profile is saved." : ""}
      </output>
      <Presence show={dirty || justSaved} className="sticky bottom-4 z-20">
        <div className="mx-auto flex min-h-14 w-full max-w-xl flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl bg-popover py-2.5 ps-4 pe-2.5 text-popover-foreground shadow-[var(--shadow-float)] ring-1 ring-border/70">
          <p className="flex items-center gap-2 text-sm font-medium">
            {!dirty && (
              <CheckCircleIcon
                size={18}
                weight="fill"
                aria-hidden="true"
                className="text-success"
              />
            )}
            <TextSwap
              value={
                dirty
                  ? "You have changes that are not saved."
                  : "Your profile is saved."
              }
            />
          </p>
          <div
            className={cn("flex gap-2 max-sm:ms-auto", !dirty && "invisible")}
          >
            <Button
              variant="ghost"
              size="sm"
              isDisabled={pending}
              onPress={discard}
            >
              Discard
            </Button>
            <Button
              type="submit"
              size="sm"
              isDisabled={pending || check === "checking" || check === "taken"}
            >
              {pending && <Spinner size="sm" decorative />}
              Save changes
            </Button>
          </div>
        </div>
      </Presence>
    </Form>
  );
}
