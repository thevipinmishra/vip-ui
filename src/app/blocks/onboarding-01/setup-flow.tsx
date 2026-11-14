"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-swatch-picker";
import { Form } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { Stepper } from "@/components/ui/stepper";
import {
  TextField,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";
import {
  TagFieldValue,
  Token,
  TokenField,
  TokenFieldDescription,
  TokenFieldInput,
  TokenFieldLabel,
} from "@/components/ui/token-field";
import { cn } from "@/lib/utils";
import {
  accentColors,
  emailPattern,
  setupSteps,
  slugify,
  slugProblem,
  topicLabels,
  topicOptions,
  WORKSPACE_KEY,
  type WorkspaceSetup,
} from "./workspace";
import { WorkspacePreview } from "./workspace-preview";

const defaultInvites = ["ana@lumen.co", "leo@northwind.com"];

function initialInvites(emails: readonly string[]) {
  return new TagFieldValue(
    emails.map((text) => ({ type: "token" as const, text })),
  );
}

function emailsIn(value: TagFieldValue) {
  return value.segments
    .filter((segment) => segment.type === "token")
    .map((segment) => segment.text.trim())
    .filter(Boolean);
}

export function SetupFlow() {
  const [name, setName] = useState("Marlow Research");
  const [slug, setSlug] = useState("marlow-research");
  const [slugEdited, setSlugEdited] = useState(false);
  const [accent, setAccent] = useState<Color>(parseColor("#1f7a66"));
  const [invites, setInvites] = useState(() => initialInvites(defaultInvites));
  const [topics, setTopics] = useState<string[]>(["discovery", "design"]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [nameError, setNameError] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [topicError, setTopicError] = useState("");
  const nameRef = useRef<HTMLDivElement>(null);
  const slugRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);

  const color = accent.toString("hex").toLowerCase();
  const colorName =
    accentColors.find((item) => item.value === color)?.name ?? "Custom";
  const problem = slugProblem(slug);
  const invited = emailsIn(invites);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORKSPACE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<WorkspaceSetup>;
      if (typeof saved.name === "string") setName(saved.name);
      if (typeof saved.slug === "string") {
        setSlug(saved.slug);
        setSlugEdited(true);
      }
      if (typeof saved.color === "string") {
        try {
          setAccent(parseColor(saved.color));
        } catch {}
      }
      if (Array.isArray(saved.invites)) {
        setInvites(
          initialInvites(
            saved.invites.filter(
              (email): email is string => typeof email === "string",
            ),
          ),
        );
      }
      if (Array.isArray(saved.topics)) {
        setTopics(
          saved.topics.filter(
            (topic): topic is string => typeof topic === "string",
          ),
        );
      }
    } catch {}
  }, []);

  function focusHeading() {
    window.setTimeout(() => {
      document
        .querySelector<HTMLElement>(
          '[data-slot="layout-morph-content"]:not([aria-hidden="true"]) [data-step-heading]',
        )
        ?.focus();
    }, 320);
  }

  function changeName(value: string) {
    setName(value);
    setNameError("");
    if (!slugEdited) setSlug(slugify(value));
  }

  function changeSlug(value: string) {
    setSlug(value.toLowerCase());
    setSlugEdited(true);
  }

  function focusField(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.querySelector<HTMLElement>("input")?.focus();
  }

  function goNext() {
    if (step === 0) {
      if (name.trim().length < 2) {
        setNameError("Enter a name with 2 or more characters.");
        focusField(nameRef);
        return;
      }
      if (problem) {
        focusField(slugRef);
        return;
      }
      setStep(1);
      focusHeading();
      return;
    }
    if (step === 1) {
      const committed = invites.commit();
      setInvites(committed);
      const emails = [...new Set(emailsIn(committed))];
      const invalid = emails.filter((email) => !emailPattern.test(email));
      if (invalid.length > 0) {
        setInviteError(
          `Check ${invalid.join(", ")}. Use a full email address.`,
        );
        inviteRef.current
          ?.querySelector<HTMLElement>("[data-slot=token-field-input]")
          ?.focus();
        return;
      }
      setInviteError("");
      setStep(2);
      focusHeading();
      return;
    }
    if (topics.length === 0) {
      setTopicError("Select at least one topic.");
      return;
    }
    setTopicError("");
    finish();
  }

  function skipInvites() {
    setInvites(new TagFieldValue([]));
    setInviteError("");
    setStep(2);
    focusHeading();
  }

  function finish() {
    const committed = invites.commit();
    setInvites(committed);
    const setup: WorkspaceSetup = {
      name: name.trim(),
      slug,
      color,
      colorName,
      invites: [...new Set(emailsIn(committed))],
      topics,
    };
    try {
      window.localStorage.setItem(WORKSPACE_KEY, JSON.stringify(setup));
    } catch {}
    setDone(true);
    setStep(setupSteps.length);
    focusHeading();
    showToast({
      title: `${setup.name} is ready`,
      description: "Open the checklist to start your first project.",
      variant: "success",
    });
  }

  function editSetup() {
    setDone(false);
    setStep(0);
    focusHeading();
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
          <a
            href="/blocks"
            className="inline-flex min-w-0 items-center gap-2.5 rounded-md outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground"
            >
              F
            </span>
            <span className="truncate text-sm font-semibold tracking-[-0.02em]">
              Fieldnote
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Setup
            </span>
          </a>
          <a
            href="mailto:support@fieldnote.app"
            className="rounded-md text-sm text-muted-foreground outline-offset-4 outline-transparent transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Need help?
          </a>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-12 lg:px-8 lg:py-10">
        <div className="w-full max-w-2xl">
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              if (!done) goNext();
            }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle as="h1" className="text-2xl">
                      Set up Fieldnote
                    </CardTitle>
                    <CardDescription>
                      {done ? "Setup is complete." : "Three short steps."}
                    </CardDescription>
                  </div>
                  <p className="shrink-0 pt-1 text-xs font-medium tabular-nums text-muted-foreground">
                    {done
                      ? "Complete"
                      : `Step ${step + 1} of ${setupSteps.length}`}
                  </p>
                </div>
                <Stepper
                  steps={setupSteps}
                  currentStep={done ? setupSteps.length : step}
                  aria-label="Workspace setup steps"
                  className="mt-4 -mx-1.5"
                />
              </CardHeader>
              <CardContent className="border-t border-border/70 pt-5">
                <LayoutMorph contentKey={done ? "done" : step}>
                  {done ? (
                    <DonePanel
                      setup={{
                        name: name.trim(),
                        slug,
                        color,
                        colorName,
                        invites: invited,
                        topics,
                      }}
                      onEdit={editSetup}
                    />
                  ) : step === 0 ? (
                    <WorkspaceStep
                      name={name}
                      nameError={nameError}
                      slug={slug}
                      slugProblem={problem}
                      accent={accent}
                      colorName={colorName}
                      nameRef={nameRef}
                      slugRef={slugRef}
                      onNameChange={changeName}
                      onSlugChange={changeSlug}
                      onAccentChange={setAccent}
                    />
                  ) : step === 1 ? (
                    <InviteStep
                      invites={invites}
                      invitesError={inviteError}
                      inviteRef={inviteRef}
                      onInvitesChange={(value) => {
                        setInvites(value);
                        setInviteError("");
                      }}
                    />
                  ) : (
                    <TopicsStep
                      topics={topics}
                      topicsError={topicError}
                      name={name.trim()}
                      slug={slug}
                      inviteCount={invited.length}
                      onTopicsChange={(value) => {
                        setTopics(value);
                        setTopicError("");
                      }}
                    />
                  )}
                </LayoutMorph>
              </CardContent>
              {!done && (
                <CardFooter className="justify-between gap-3 border-t border-border/70 pt-5">
                  <Button
                    variant="ghost"
                    isDisabled={step === 0}
                    onPress={() => {
                      setStep((current) => current - 1);
                      focusHeading();
                    }}
                  >
                    <ArrowLeftIcon size={16} aria-hidden="true" />
                    Back
                  </Button>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {step === 1 && (
                      <Button variant="ghost" onPress={skipInvites}>
                        Skip for now
                      </Button>
                    )}
                    <Button type="submit">
                      {step === setupSteps.length - 1
                        ? "Finish setup"
                        : "Continue"}
                      <ArrowRightIcon size={16} aria-hidden="true" />
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </Form>
        </div>
        <aside className="w-full max-w-2xl lg:sticky lg:top-10">
          <WorkspacePreview
            name={name}
            slug={slug}
            color={color}
            invites={invited}
          />
        </aside>
      </main>
    </div>
  );
}

function StepHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-1.5">
      <h2
        data-step-heading=""
        tabIndex={-1}
        className="rounded-sm text-base font-semibold tracking-tight outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {title}
      </h2>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

function WorkspaceStep({
  name,
  nameError,
  slug,
  slugProblem: problem,
  accent,
  colorName,
  nameRef,
  slugRef,
  onNameChange,
  onSlugChange,
  onAccentChange,
}: {
  name: string;
  nameError: string;
  slug: string;
  slugProblem: string;
  accent: Color;
  colorName: string;
  nameRef: React.RefObject<HTMLDivElement | null>;
  slugRef: React.RefObject<HTMLDivElement | null>;
  onNameChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onAccentChange: (color: Color) => void;
}) {
  return (
    <div className="grid gap-5">
      <StepHeading
        title="Name your workspace"
        description="Your team sees this name in invites and in the app."
      />
      <TextField
        ref={nameRef}
        name="workspace-name"
        size="md"
        autoComplete="organization"
        value={name}
        onChange={onNameChange}
      >
        <TextFieldLabel>Workspace name</TextFieldLabel>
        <TextFieldInput
          aria-invalid={Boolean(nameError) || undefined}
          className={cn(nameError && "border-destructive")}
          placeholder="Marlow Research"
        />
        <TextFieldDescription className={cn(nameError && "text-destructive")}>
          {nameError || "Use the name your team knows."}
        </TextFieldDescription>
      </TextField>
      <TextField
        ref={slugRef}
        name="workspace-address"
        size="md"
        value={slug}
        onChange={onSlugChange}
      >
        <TextFieldLabel>Workspace address</TextFieldLabel>
        <InputGroup size="md" className={cn(problem && "border-destructive")}>
          <InputGroupAddon>fieldnote.app/</InputGroupAddon>
          <InputGroupInput
            aria-invalid={Boolean(problem) || undefined}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="marlow-research"
          />
        </InputGroup>
        <TextFieldDescription className={cn(problem && "text-destructive")}>
          {problem || `fieldnote.app/${slug} is available.`}
        </TextFieldDescription>
      </TextField>
      <div className="grid gap-2">
        <span id="accent-color-label" className="text-sm font-medium">
          Accent color
        </span>
        <ColorSwatchPicker
          aria-labelledby="accent-color-label"
          value={accent}
          onChange={onAccentChange}
          className="gap-2"
        >
          {accentColors.map((item) => (
            <ColorSwatchPickerItem
              key={item.value}
              color={item.value}
              aria-label={item.name}
            />
          ))}
        </ColorSwatchPicker>
        <p className="text-xs leading-5 text-muted-foreground">
          {colorName} marks buttons, links, and selected rows.
        </p>
      </div>
    </div>
  );
}

function InviteStep({
  invites,
  invitesError,
  inviteRef,
  onInvitesChange,
}: {
  invites: TagFieldValue;
  invitesError: string;
  inviteRef: React.RefObject<HTMLDivElement | null>;
  onInvitesChange: (value: TagFieldValue) => void;
}) {
  return (
    <div className="grid gap-5">
      <StepHeading
        title="Invite your team"
        description="Add the people who collect notes with you."
      />
      <TokenField
        ref={inviteRef}
        size="md"
        value={invites}
        onChange={onInvitesChange}
        onSubmit={() => onInvitesChange(invites.commit())}
      >
        <TokenFieldLabel>Email addresses</TokenFieldLabel>
        <TokenFieldInput placeholder="name@company.com, …">
          {(segment) => (
            <Token
              className={cn(
                !emailPattern.test(segment.text) &&
                  "bg-destructive/10 text-destructive",
              )}
            >
              {segment.text}
            </Token>
          )}
        </TokenFieldInput>
        <TokenFieldDescription
          className={cn(invitesError && "text-destructive")}
        >
          {invitesError ||
            "Press Enter after each address. Invites expire in 7 days."}
        </TokenFieldDescription>
      </TokenField>
      <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/40 p-3">
        <EnvelopeSimpleIcon
          size={18}
          className="mt-0.5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="text-xs leading-5 text-muted-foreground">
          Each person gets an email with a join link.
        </p>
      </div>
    </div>
  );
}

function TopicsStep({
  topics,
  topicsError,
  name,
  slug,
  inviteCount,
  onTopicsChange,
}: {
  topics: string[];
  topicsError: string;
  name: string;
  slug: string;
  inviteCount: number;
  onTopicsChange: (value: string[]) => void;
}) {
  const labels = topicLabels(topics);

  return (
    <div className="grid gap-5">
      <StepHeading
        title="Choose your research topics"
        description="We use these topics to suggest sample projects."
      />
      <CheckboxGroup
        label="Research topics"
        value={topics}
        onChange={onTopicsChange}
      >
        {topicOptions.map((topic) => (
          <Checkbox key={topic.value} value={topic.value}>
            {topic.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
      {topicsError && (
        <p role="alert" className="text-xs leading-5 text-destructive">
          {topicsError}
        </p>
      )}
      <div className="grid gap-2 rounded-lg border border-border/70 bg-muted/40 p-3.5 text-xs leading-5 text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">{name}</span> at
          fieldnote.app/{slug}
        </p>
        <p>
          {inviteCount} {inviteCount === 1 ? "invite" : "invites"} ·{" "}
          {labels.length > 0 ? labels.join(", ") : "No topics selected"}
        </p>
      </div>
    </div>
  );
}

function DonePanel({
  setup,
  onEdit,
}: {
  setup: WorkspaceSetup;
  onEdit: () => void;
}) {
  return (
    <div className="grid gap-5">
      <span className="grid size-12 place-items-center rounded-full bg-success-subtle text-success">
        <CheckCircleIcon size={26} weight="fill" aria-hidden="true" />
      </span>
      <div className="grid gap-1.5">
        <h2
          data-step-heading=""
          tabIndex={-1}
          className="rounded-sm text-base font-semibold tracking-[-0.025em] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {setup.name} is ready
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Next, do the tasks in the checklist.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <ButtonLink href="/blocks/checklist-01">
          Open the checklist
          <ArrowRightIcon size={16} aria-hidden="true" />
        </ButtonLink>
        <Button variant="outline" onPress={onEdit}>
          Edit setup
        </Button>
      </div>
      <dl className="grid gap-4 rounded-xl border border-border/70 p-4 sm:grid-cols-2">
        <SummaryItem label="Name" value={setup.name} />
        <SummaryItem label="Address" value={`fieldnote.app/${setup.slug}`} />
        <SummaryItem
          label="Accent"
          value={setup.colorName}
          swatch={setup.color}
        />
        <SummaryItem
          label="Invites"
          value={`${setup.invites.length} ${setup.invites.length === 1 ? "person" : "people"}`}
        />
      </dl>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  swatch,
}: {
  label: string;
  value: string;
  swatch?: string;
}) {
  return (
    <div className="grid gap-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="flex min-w-0 items-center gap-2 text-sm font-medium">
        {swatch && (
          <span
            aria-hidden="true"
            className="size-3 shrink-0 rounded-full ring-1 ring-foreground/20"
            style={{ backgroundColor: swatch }}
          />
        )}
        <span className="min-w-0 [overflow-wrap:anywhere]">{value}</span>
      </dd>
    </div>
  );
}
