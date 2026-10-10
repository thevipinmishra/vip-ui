"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Avatar } from "../../../components/vip-ui/avatar";
import { Button } from "../../../components/vip-ui/button";
import { Card } from "../../../components/vip-ui/card";
import { FileTrigger } from "../../../components/vip-ui/file-trigger";
import { Form } from "../../../components/vip-ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/vip-ui/input-group";
import { Select } from "../../../components/vip-ui/select";
import { TextArea } from "../../../components/vip-ui/text-area";
import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
} from "../../../components/vip-ui/text-field";

interface Profile {
  name: string;
  username: string;
  email: string;
  bio: string;
  timezone: string;
}

const initialProfile: Profile = {
  name: "Maya Chen",
  username: "maya",
  email: "maya@northwind.com",
  bio: "Product designer. I work on billing and onboarding.",
  timezone: "europe-berlin",
};

const timezones = [
  { id: "america-los-angeles", name: "Pacific Time (Los Angeles)" },
  { id: "america-new-york", name: "Eastern Time (New York)" },
  { id: "europe-london", name: "Greenwich Mean Time (London)" },
  { id: "europe-berlin", name: "Central European Time (Berlin)" },
  { id: "asia-kolkata", name: "India Standard Time (Kolkata)" },
  { id: "asia-tokyo", name: "Japan Standard Time (Tokyo)" },
];

const bioLimit = 160;

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
    <section className="grid gap-5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10">
      <div>
        <h2 className="text-base font-semibold tracking-[-0.025em]">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      <Card className="grid gap-5 p-5 sm:p-6">{children}</Card>
    </section>
  );
}

export function ProfileForm() {
  const [saved, setSaved] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [photo, setPhoto] = useState<string | undefined>();
  const [notice, setNotice] = useState("");
  const reduceMotion = useReducedMotion();
  const dirty = (Object.keys(saved) as (keyof Profile)[]).some(
    (key) => saved[key] !== draft[key],
  );

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo);
    };
  }, [photo]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function update(field: keyof Profile) {
    return (value: string) => {
      setNotice("");
      setDraft((current) => ({ ...current, [field]: value }));
    };
  }

  return (
    <Form
      className="gap-10 pb-24"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(draft);
        setNotice("Your profile is saved.");
      }}
    >
      <Section
        title="Profile"
        description="Other people in your workspace see this information."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name={draft.name || "?"} src={photo} className="size-16" />
          <div className="flex flex-wrap gap-2">
            <FileTrigger
              acceptedFileTypes={["image/png", "image/jpeg"]}
              onSelect={(files) => {
                const file = files?.[0];
                if (file) setPhoto(URL.createObjectURL(file));
              }}
            >
              <Button variant="outline" size="sm">
                Change photo
              </Button>
            </FileTrigger>
            {photo && (
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setPhoto(undefined)}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
        <TextField
          label="Display name"
          name="name"
          autoComplete="name"
          value={draft.name}
          onChange={update("name")}
          isRequired
        />
        <TextField
          name="username"
          value={draft.username}
          onChange={update("username")}
          isRequired
        >
          <TextFieldLabel>Username</TextFieldLabel>
          <InputGroup>
            <InputGroupAddon>northwind.app/</InputGroupAddon>
            <InputGroupInput autoComplete="username" />
          </InputGroup>
          <TextFieldDescription>
            Use letters, numbers, and hyphens.
          </TextFieldDescription>
        </TextField>
        <TextArea
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
        title="Contact and region"
        description="We use these for sign-in emails and for dates and times."
      >
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={draft.email}
          onChange={update("email")}
          description="We send a link to confirm a new address."
          isRequired
        />
        <Select
          label="Time zone"
          name="timezone"
          options={timezones}
          value={draft.timezone}
          onValueChange={update("timezone")}
        />
      </Section>
      <output aria-live="polite" className="sr-only">
        {notice}
      </output>
      <AnimatePresence>
        {(dirty || notice) && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 bottom-4 z-30 mx-auto flex w-[calc(100%-2rem)] max-w-xl flex-wrap items-center justify-between gap-3 rounded-xl bg-popover px-4 py-3 text-popover-foreground shadow-[var(--shadow-float)] ring-1 ring-border/70"
          >
            <p className="text-sm font-medium">
              {dirty ? "You have changes that are not saved." : notice}
            </p>
            {dirty && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => {
                    setDraft(saved);
                    setNotice("");
                  }}
                >
                  Discard
                </Button>
                <Button type="submit" size="sm">
                  Save changes
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Form>
  );
}
