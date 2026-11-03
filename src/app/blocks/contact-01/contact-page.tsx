"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";
import { Form } from "@/components/ui/form";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Radio,
  RadioGroup,
  RadioGroupItems,
} from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import {
  TextArea,
  TextAreaDescription,
  TextAreaError,
  TextAreaInput,
  TextAreaLabel,
} from "@/components/ui/text-area";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";

const companySizes = [
  { value: "1-25", label: "1–25 people" },
  { value: "26-100", label: "26–100 people" },
  { value: "101-500", label: "101–500 people" },
  { value: "501-2000", label: "501–2,000 people" },
  { value: "2000+", label: "More than 2,000 people" },
];

const timelines = [
  { value: "this-month", label: "This month" },
  { value: "this-quarter", label: "This quarter" },
  { value: "next-quarter", label: "Next quarter" },
  { value: "no-date", label: "No date yet" },
];

const topics = [
  { value: "migration", label: "Move from another tool" },
  { value: "pilot", label: "Start a pilot" },
  { value: "security", label: "Security review" },
  { value: "pricing", label: "Pricing and procurement" },
];

const topicLabels = Object.fromEntries(
  topics.map((topic) => [topic.value, topic.label]),
) as Record<string, string>;

const steps = [
  "We read your request and check your use case.",
  "You get a short plan and a time for a call.",
  "We set up a test workspace for your team.",
];

interface FormValues {
  name: string;
  email: string;
  company: string;
  size: string;
  timeline: string;
  topic: string;
  details: string;
  consent: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

interface SentRequest {
  reference: string;
  email: string;
  company: string;
  topic: string;
}

const emptyForm: FormValues = {
  name: "",
  email: "",
  company: "",
  size: "",
  timeline: "",
  topic: "",
  details: "",
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const detailsLimit = 600;
const detailsMinimum = 20;
const errorOrder: (keyof FormValues)[] = [
  "name",
  "email",
  "company",
  "size",
  "timeline",
  "topic",
  "details",
  "consent",
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const email = values.email.trim();
  const details = values.details.trim();

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!email) {
    errors.email = "Enter your work email.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Use the format name@company.com.";
  }
  if (!values.company.trim()) errors.company = "Enter your company name.";
  if (!values.size) errors.size = "Select a company size.";
  if (!values.timeline) errors.timeline = "Select a timeline.";
  if (!values.topic) errors.topic = "Select one option.";
  if (!details) {
    errors.details = "Tell us about your project.";
  } else if (details.length < detailsMinimum) {
    errors.details = `Use ${detailsMinimum} characters or more.`;
  }
  if (!values.consent) {
    errors.consent = "You must agree before you send the request.";
  }
  return errors;
}

function VelaLogo() {
  return (
    <a
      href="/"
      aria-label="Vela home"
      className="inline-flex w-fit items-center gap-2 rounded-md outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="size-4.5"
        >
          <path
            d="M5.5 5.5 12 19l6.5-13.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-base font-semibold tracking-[-0.04em]">Vela</span>
    </a>
  );
}

export function ContactPage() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState<SentRequest | null>(null);
  const [requestNumber, setRequestNumber] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const submittingRef = useRef(false);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const errorCount = Object.keys(errors).length;

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function focusFirstError(next: FormErrors) {
    const field = errorOrder.find((key) => next[key]);
    if (!field) return;
    const wrapper = formRef.current?.querySelector<HTMLElement>(
      `[data-field="${field}"]`,
    );
    const target = wrapper?.querySelector<HTMLElement>(
      "input, select, textarea, button",
    );
    if (target) {
      target.focus();
    } else {
      alertRef.current?.focus();
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() => focusFirstError(next));
      return;
    }

    submittingRef.current = true;
    const cleaned: FormValues = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      details: values.details.trim(),
    };
    setValues(cleaned);
    setPending(true);

    timeoutRef.current = window.setTimeout(() => {
      const reference = `REQ-${48217 + requestNumber}`;
      submittingRef.current = false;
      setPending(false);
      setSent({
        reference,
        email: cleaned.email,
        company: cleaned.company,
        topic: cleaned.topic,
      });
      setRequestNumber((count) => count + 1);
      showToast({
        title: "Request sent",
        description: `We sent a copy to ${cleaned.email}.`,
        variant: "success",
      });
    }, 900);
  }

  function startAnother() {
    window.clearTimeout(timeoutRef.current);
    submittingRef.current = false;
    setValues(emptyForm);
    setErrors({});
    setSent(null);
    setPending(false);
    window.setTimeout(() => {
      formRef.current
        ?.querySelector<HTMLInputElement>('input[name="name"]')
        ?.focus();
    }, 0);
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <VelaLogo />
          <nav aria-label="Site" className="flex items-center gap-3 sm:gap-5">
            <a
              href="/blocks/login-01"
              className="rounded-sm text-sm font-medium text-muted-foreground underline-offset-4 outline-offset-4 outline-transparent transition-colors duration-150 ease-out-quint hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
            >
              Sign in
            </a>
            <ButtonLink
              href="mailto:support@vela.app"
              variant="outline"
              size="sm"
            >
              Contact support
            </ButtonLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pt-10 pb-16 md:px-8 md:pt-14 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:gap-12">
          <div className="min-w-0">
            <h1 className="text-balance text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.055em]">
              Talk to our team.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
              Tell us about your team and your rollout.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                1,200 product teams
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-border" />
              <span>SOC 2 Type II</span>
              <span aria-hidden="true" className="h-3 w-px bg-border" />
              <span>EU data region</span>
            </div>
          </div>

          <Card className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            {sent ? (
              <div className="grid gap-5 p-5 transition-[opacity,translate] duration-300 starting:translate-y-2 starting:opacity-0 sm:p-7">
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-full bg-success-subtle text-success shadow-[var(--shadow-card)] ring-1 ring-success/20"
                >
                  <CheckCircleIcon size={26} weight="fill" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    Request {sent.reference}
                  </p>
                  <h2
                    ref={successRef}
                    tabIndex={-1}
                    className="mt-2 text-2xl font-semibold tracking-[-0.04em] outline-none"
                  >
                    Request sent.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    We sent a copy to{" "}
                    <span className="font-medium break-all text-foreground">
                      {sent.email}
                    </span>
                    . Maya Chen from our team will reply in one business day.
                  </p>
                </div>
                <DescriptionList className="rounded-lg bg-muted/60 px-4 py-3">
                  <DescriptionTerm>Topic</DescriptionTerm>
                  <DescriptionDetail>
                    {topicLabels[sent.topic] ?? sent.topic}
                  </DescriptionDetail>
                  <DescriptionTerm>Company</DescriptionTerm>
                  <DescriptionDetail>{sent.company}</DescriptionDetail>
                  <DescriptionTerm>Reference</DescriptionTerm>
                  <DescriptionDetail className="font-mono text-xs">
                    {sent.reference}
                  </DescriptionDetail>
                </DescriptionList>
                <div className="flex flex-wrap gap-2">
                  <Button onPress={startAnother}>Send another request</Button>
                  <ButtonLink href="mailto:sales@vela.app" variant="outline">
                    Email sales
                  </ButtonLink>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">
                  Need to change a detail? Reply to the email. Your request
                  stays in the queue.
                </p>
              </div>
            ) : (
              <>
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                    <CardTitle as="h2">Tell us about your project</CardTitle>
                    <Badge
                      variant="success"
                      dot
                      className="ms-auto hidden sm:inline-flex"
                    >
                      One-day reply
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Form
                    ref={formRef}
                    className="gap-6"
                    validationBehavior="aria"
                    onSubmit={submit}
                  >
                    {errorCount > 0 && (
                      <div
                        ref={alertRef}
                        tabIndex={-1}
                        className="outline-none"
                      >
                        <Alert
                          variant="error"
                          title="Check your request."
                          role="alert"
                        >
                          {errorCount === 1
                            ? "One field needs your attention. The form shows the error."
                            : `${errorCount} fields need your attention. The form shows each error.`}
                        </Alert>
                      </div>
                    )}

                    <Fieldset className="rounded-none bg-transparent p-0 shadow-none ring-0">
                      <FieldsetLegend className="mb-4">
                        Your details
                      </FieldsetLegend>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div data-field="name" className="min-w-0">
                          <TextField
                            name="name"
                            size="md"
                            autoComplete="name"
                            value={values.name}
                            onChange={(value) => update("name", value)}
                            isInvalid={Boolean(errors.name)}
                          >
                            <TextFieldLabel>Full name</TextFieldLabel>
                            <TextFieldInput
                              placeholder="Maya Chen"
                              aria-required="true"
                            />
                            <TextFieldError>{errors.name}</TextFieldError>
                          </TextField>
                        </div>
                        <div data-field="email" className="min-w-0">
                          <TextField
                            name="email"
                            size="md"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(value) => update("email", value)}
                            isInvalid={Boolean(errors.email)}
                          >
                            <TextFieldLabel>Work email</TextFieldLabel>
                            <TextFieldInput
                              placeholder="maya@company.com"
                              aria-required="true"
                            />
                            <TextFieldError>{errors.email}</TextFieldError>
                          </TextField>
                        </div>
                        <div
                          data-field="company"
                          className="min-w-0 sm:col-span-2"
                        >
                          <TextField
                            name="company"
                            size="md"
                            autoComplete="organization"
                            value={values.company}
                            onChange={(value) => update("company", value)}
                            isInvalid={Boolean(errors.company)}
                          >
                            <TextFieldLabel>Company</TextFieldLabel>
                            <TextFieldInput
                              placeholder="Meridian Labs"
                              aria-required="true"
                            />
                            <TextFieldError>{errors.company}</TextFieldError>
                          </TextField>
                        </div>
                        <div data-field="size" className="min-w-0">
                          <NativeSelect
                            label="Company size"
                            name="size"
                            size="md"
                            placeholder="Select a size"
                            aria-required="true"
                            value={values.size}
                            onChange={(event) =>
                              update("size", event.target.value)
                            }
                            isInvalid={Boolean(errors.size)}
                            error={errors.size}
                          >
                            {companySizes.map((size) => (
                              <option key={size.value} value={size.value}>
                                {size.label}
                              </option>
                            ))}
                          </NativeSelect>
                        </div>
                        <div data-field="timeline" className="min-w-0">
                          <NativeSelect
                            label="Timeline"
                            name="timeline"
                            size="md"
                            placeholder="Select a timeline"
                            aria-required="true"
                            value={values.timeline}
                            onChange={(event) =>
                              update("timeline", event.target.value)
                            }
                            isInvalid={Boolean(errors.timeline)}
                            error={errors.timeline}
                          >
                            {timelines.map((timeline) => (
                              <option
                                key={timeline.value}
                                value={timeline.value}
                              >
                                {timeline.label}
                              </option>
                            ))}
                          </NativeSelect>
                        </div>
                      </div>
                    </Fieldset>

                    <Fieldset className="rounded-none bg-transparent p-0 shadow-none ring-0">
                      <FieldsetLegend className="mb-4">
                        Your project
                      </FieldsetLegend>
                      <div data-field="topic" className="min-w-0">
                        <RadioGroup
                          label="What do you need first?"
                          name="topic"
                          value={values.topic}
                          onValueChange={(value) => update("topic", value)}
                          isInvalid={Boolean(errors.topic)}
                          errorMessage={errors.topic}
                        >
                          <RadioGroupItems className="grid gap-2 sm:grid-cols-2">
                            {topics.map((topic) => (
                              <Radio
                                key={topic.value}
                                value={topic.value}
                                variant="card"
                              >
                                {topic.label}
                              </Radio>
                            ))}
                          </RadioGroupItems>
                        </RadioGroup>
                      </div>
                      <div data-field="details" className="mt-4 min-w-0">
                        <TextArea
                          name="details"
                          size="md"
                          value={values.details}
                          onChange={(value) => update("details", value)}
                          isInvalid={Boolean(errors.details)}
                        >
                          <TextAreaLabel>
                            What do you want to solve?
                          </TextAreaLabel>
                          <TextAreaInput
                            rows={4}
                            maxLength={detailsLimit}
                            aria-required="true"
                            placeholder="We collect feedback in three tools. We want one place to find themes and plan the next quarter."
                          />
                          <TextAreaDescription>
                            {detailsLimit - values.details.length} characters
                            left
                          </TextAreaDescription>
                          <TextAreaError>{errors.details}</TextAreaError>
                        </TextArea>
                      </div>
                    </Fieldset>

                    <div data-field="consent" className="min-w-0">
                      <Checkbox
                        name="consent"
                        checked={values.consent}
                        onCheckedChange={(checked) =>
                          update("consent", checked)
                        }
                        isInvalid={Boolean(errors.consent)}
                        errorMessage={errors.consent}
                        description="This is required. We do not add you to a mailing list."
                      >
                        I agree that Vela may store and use these details to
                        answer my request.
                      </Checkbox>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row sm:items-center">
                      <Button
                        type="submit"
                        isPending={pending}
                        isDisabled={pending}
                        className="w-full sm:w-auto"
                      >
                        {pending && <Spinner size="sm" decorative />}
                        {pending ? "Sending request" : "Send request"}
                        {!pending && (
                          <ArrowRightIcon size={16} aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </Form>
                </CardContent>
              </>
            )}
          </Card>

          <div className="grid min-w-0 content-start gap-4 lg:col-start-1 lg:row-start-2">
            <div className="flex items-center gap-3.5 rounded-xl bg-card px-4 py-3.5 shadow-[var(--shadow-card)] ring-1 ring-border/70">
              <AvatarGroup>
                <Avatar name="Maya Chen" size="sm" />
                <Avatar name="Leo Park" size="sm" />
                <Avatar name="Ana Souza" size="sm" />
              </AvatarGroup>
              <div className="min-w-0 text-xs leading-5">
                <p className="flex items-center gap-1.5 font-medium">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-success"
                  />
                  Maya, Leo, and Ana are online
                </p>
                <p className="text-muted-foreground">
                  Average reply time is 4 hours.
                </p>
              </div>
            </div>
            <Card className="p-5">
              <h2 className="text-sm font-semibold">What happens next</h2>
              <ol className="mt-4 grid gap-3">
                {steps.map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[1.5rem_1fr] items-start gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-6 place-items-center rounded-full bg-secondary font-mono text-[10px] font-semibold text-secondary-foreground"
                    >
                      {index + 1}
                    </span>
                    <p className="min-w-0 text-sm leading-5">{step}</p>
                  </li>
                ))}
              </ol>
            </Card>

            <div className="grid gap-2.5">
              <a
                href="mailto:sales@vela.app"
                className="group flex items-center gap-3 rounded-lg text-sm outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
              >
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-lg bg-card text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 transition-colors duration-150 ease-out-quint group-hover:text-foreground"
                >
                  <EnvelopeSimpleIcon size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">
                    Email sales
                  </span>
                  <span className="block font-medium">sales@vela.app</span>
                </span>
              </a>
              <a
                href="tel:+14155550138"
                className="group flex items-center gap-3 rounded-lg text-sm outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
              >
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-lg bg-card text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 transition-colors duration-150 ease-out-quint group-hover:text-foreground"
                >
                  <PhoneIcon size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">
                    Call sales
                  </span>
                  <span className="block font-medium">+1 (415) 555-0138</span>
                </span>
              </a>
              <p className="mt-1 text-xs text-muted-foreground">
                Monday to Friday, 9:00–18:00 PT.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© 2026 Vela Labs, Inc. San Francisco</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-success"
              />
              All systems operational
            </span>
            <a
              href="mailto:support@vela.app"
              className="rounded-sm underline-offset-4 outline-offset-4 outline-transparent transition-colors duration-150 ease-out-quint hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
            >
              support@vela.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
