"use client";

import { CalendarDate } from "@internationalized/date";
import {
  ArrowCounterClockwiseIcon,
  CalendarBlankIcon,
  CalendarPlusIcon,
  CheckCircleIcon,
  ClockIcon,
  GlobeHemisphereWestIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { ComboBox } from "@/components/ui/combo-box";
import { Form } from "@/components/ui/form";
import { Presence } from "@/components/ui/presence";
import { Separator } from "@/components/ui/separator";
import { TextArea } from "@/components/ui/text-area";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  calendarFile,
  formatDate,
  host,
  isUnavailable,
  meeting,
  slotLabel,
  slotsFor,
  timeZones,
} from "./data";

interface Confirmed {
  date: CalendarDate;
  slot: string;
  zone: string;
  name: string;
  email: string;
}

const minDate = new CalendarDate(2026, 10, 5);
const maxDate = new CalendarDate(2026, 10, 30);

export function BookingPage() {
  const [date, setDate] = useState<CalendarDate | null>(
    new CalendarDate(2026, 10, 12),
  );
  const [slot, setSlot] = useState<string | null>(null);
  const [zone, setZone] = useState("europe-london");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [slotError, setSlotError] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);
  const [pending, setPending] = useState(false);
  const confirmHeading = useRef<HTMLHeadingElement>(null);
  const formHeading = useRef<HTMLHeadingElement>(null);
  const pendingTimer = useRef<number | undefined>(undefined);

  const selectedZone =
    timeZones.find((item) => item.id === zone) ?? timeZones[0];
  const slots = slotsFor(date);

  useEffect(() => {
    return () => window.clearTimeout(pendingTimer.current);
  }, []);

  useEffect(() => {
    if (confirmed) confirmHeading.current?.focus();
  }, [confirmed]);

  function book(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    const bookingName = String(data.get("name") ?? "").trim();
    const bookingEmail = String(data.get("email") ?? "").trim();
    const nextErrors: { name?: string; email?: string } = {};
    if (!bookingName) nextErrors.name = "Enter your name.";
    if (!bookingEmail) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingEmail)) {
      nextErrors.email = "Use the format name@company.com.";
    }
    const nextSlotError = !date
      ? "Select a date."
      : !slot
        ? "Select a time."
        : "";
    setErrors(nextErrors);
    setSlotError(nextSlotError);
    if (Object.keys(nextErrors).length > 0 || nextSlotError) return;
    if (!date || !slot) return;
    setPending(true);
    pendingTimer.current = window.setTimeout(() => {
      setPending(false);
      setConfirmed({
        date,
        slot,
        zone,
        name: bookingName,
        email: bookingEmail,
      });
    }, 650);
  }

  function download() {
    if (!confirmed) return;
    const file = calendarFile(
      confirmed.date,
      confirmed.slot,
      confirmed.name,
      confirmed.email,
    );
    const url = URL.createObjectURL(
      new Blob([file], { type: "text/calendar;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "arbor-intro-call.ics";
    anchor.click();
    URL.revokeObjectURL(url);
    showToast({
      title: "Calendar file downloaded",
      description: "Open it to add the call to your calendar.",
      variant: "success",
    });
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-base font-semibold text-primary-foreground"
            >
              A
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                Arbor
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Design system consulting
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Badge variant="outline" className="max-sm:hidden">
              <ClockIcon size={13} aria-hidden="true" />
              30 min
            </Badge>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Intro call with {host.name}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:py-12">
        <aside className="grid gap-4 lg:sticky lg:top-8">
          <Card className="grid gap-5 p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <Avatar name={host.name} size="xl" />
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-[-0.02em]">
                  {host.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {host.role} at {host.company}
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                {meeting.title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {meeting.description}
              </p>
            </div>
            <ul className="grid gap-2.5 text-sm">
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <ClockIcon size={17} aria-hidden="true" />
                {meeting.duration} minutes
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <VideoCameraIcon size={17} aria-hidden="true" />
                {meeting.location}
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <GlobeHemisphereWestIcon size={17} aria-hidden="true" />
                {selectedZone.name} time
              </li>
            </ul>
          </Card>
          {!confirmed && (
            <Card className="grid gap-4 p-5 sm:p-6">
              <div className="grid gap-1">
                <p className="text-sm font-semibold">Before the call</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Send a short note about your team.
                </p>
              </div>
              <TextArea
                label="Note"
                name="topic"
                size="md"
                rows={2}
                className="md:max-w-md"
                placeholder="Optional. Add a link or a note."
                value={topic}
                onChange={setTopic}
                maxLength={300}
              />
              <p className="text-xs leading-5 text-muted-foreground">
                Questions? Write to{" "}
                <a
                  href={`mailto:${host.email}`}
                  className="rounded-sm underline underline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {host.email}
                </a>
                .
              </p>
            </Card>
          )}
        </aside>

        <Card className="min-w-0 p-5 sm:p-6">
          <div className="grid">
            <Presence show={!confirmed} className="col-start-1 row-start-1">
              <div className="grid gap-5">
                <h2
                  ref={formHeading}
                  tabIndex={-1}
                  className="text-base font-semibold tracking-[-0.02em] outline-none"
                >
                  Select a date and time
                </h2>
                <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:gap-5 lg:gap-7">
                  <div className="min-w-0">
                    <Calendar
                      aria-label="Choose a date"
                      value={date}
                      onChange={(next) => {
                        setDate(next);
                        setSlot(null);
                        setSlotError("");
                      }}
                      minValue={minDate}
                      maxValue={maxDate}
                      isDateUnavailable={isUnavailable}
                      className="mx-auto md:mx-0"
                    />
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground md:justify-start">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="size-2 rounded-full bg-primary"
                        />
                        Available
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="size-2 rounded-full bg-muted-foreground/40"
                        />
                        Unavailable
                      </span>
                    </div>
                  </div>

                  <div className="grid min-w-0 content-start gap-5">
                    <ComboBox
                      label="Time zone"
                      size="md"
                      options={timeZones}
                      value={zone}
                      onValueChange={(value) => {
                        if (value) setZone(value);
                      }}
                    />
                    <div className="grid gap-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-xs text-muted-foreground">
                          {date ? formatDate(date) : "Select a date"}
                        </p>
                      </div>
                      {date ? (
                        <ToggleButtonGroup
                          aria-label="Time"
                          selectionMode="single"
                          selectedKeys={slot ? [slot] : []}
                          onSelectionChange={(keys) => {
                            const [next] = keys;
                            setSlot(next ? String(next) : null);
                            setSlotError("");
                          }}
                          className="grid w-full grid-cols-2 gap-1"
                        >
                          {slots.map((time) => (
                            <ToggleButton
                              key={time}
                              id={time}
                              className="w-full justify-center tabular-nums"
                            >
                              {slotLabel(time, selectedZone.offset)}
                            </ToggleButton>
                          ))}
                        </ToggleButtonGroup>
                      ) : (
                        <p className="rounded-lg border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">
                          Select a date to see times.
                        </p>
                      )}
                      {slotError && (
                        <p
                          role="alert"
                          className="text-xs leading-5 text-destructive"
                        >
                          {slotError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <Form className="gap-5" onSubmit={book}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      name="name"
                      size="md"
                      isInvalid={Boolean(errors.name)}
                      value={name}
                      onChange={(value) => {
                        setName(value);
                        if (errors.name) {
                          setErrors((current) => ({
                            ...current,
                            name: undefined,
                          }));
                        }
                      }}
                    >
                      <TextFieldLabel>Name</TextFieldLabel>
                      <TextFieldInput
                        placeholder="Your name"
                        autoComplete="name"
                        aria-required="true"
                      />
                      <TextFieldError>{errors.name}</TextFieldError>
                    </TextField>
                    <TextField
                      name="email"
                      size="md"
                      isInvalid={Boolean(errors.email)}
                      value={email}
                      onChange={(value) => {
                        setEmail(value);
                        if (errors.email) {
                          setErrors((current) => ({
                            ...current,
                            email: undefined,
                          }));
                        }
                      }}
                    >
                      <TextFieldLabel>Email</TextFieldLabel>
                      <TextFieldInput
                        type="text"
                        inputMode="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        aria-required="true"
                      />
                      <TextFieldError>{errors.email}</TextFieldError>
                    </TextField>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="submit"
                      size="md"
                      className="min-w-44 max-sm:w-full"
                      isPending={pending}
                    >
                      {!pending && (
                        <CalendarBlankIcon size={16} aria-hidden="true" />
                      )}
                      {pending ? "Booking…" : "Confirm booking"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      You can reschedule at no cost.
                    </p>
                  </div>
                </Form>
              </div>
            </Presence>

            <Presence
              show={confirmed !== null}
              className="col-start-1 row-start-1"
            >
              {confirmed && (
                <div className="grid gap-6">
                  <div className="grid justify-items-start gap-4">
                    <span className="grid size-12 place-items-center rounded-full bg-success-subtle text-success ring-1 ring-success/20">
                      <CheckCircleIcon
                        size={28}
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h2
                        ref={confirmHeading}
                        tabIndex={-1}
                        className="text-xl font-semibold tracking-[-0.035em] outline-none"
                      >
                        You are booked
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        A calendar invite goes to {confirmed.email}.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 rounded-xl bg-muted/50 p-4 ring-1 ring-border/70 sm:p-5">
                    <div className="flex items-center gap-3">
                      <Avatar name={host.name} size="lg" />
                      <div className="min-w-0">
                        <p className="font-medium">{host.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {host.role} at {host.company}
                        </p>
                      </div>
                      <Badge variant="success" className="ms-auto">
                        Confirmed
                      </Badge>
                    </div>
                    <Separator />
                    <dl className="grid gap-3 text-sm">
                      <div className="flex items-start gap-2.5">
                        <CalendarBlankIcon
                          size={17}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-muted-foreground"
                        />
                        <div>
                          <dt className="sr-only">Date</dt>
                          <dd className="font-medium">
                            {formatDate(confirmed.date)}
                          </dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <ClockIcon
                          size={17}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-muted-foreground"
                        />
                        <div>
                          <dt className="sr-only">Time</dt>
                          <dd className="font-medium">
                            {slotLabel(
                              confirmed.slot,
                              timeZones.find(
                                (item) => item.id === confirmed.zone,
                              )?.offset ?? 1,
                            )}
                            <span className="font-normal text-muted-foreground">
                              {" · "}
                              {
                                timeZones.find(
                                  (item) => item.id === confirmed.zone,
                                )?.name
                              }{" "}
                              time
                            </span>
                          </dd>
                          <dd className="text-xs text-muted-foreground">
                            {meeting.duration} minutes · {meeting.location}
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button onPress={download}>
                      <CalendarPlusIcon size={16} aria-hidden="true" />
                      Add to calendar
                    </Button>
                    <Button
                      variant="outline"
                      onPress={() => {
                        setConfirmed(null);
                        setSlotError("");
                        window.setTimeout(
                          () => formHeading.current?.focus(),
                          120,
                        );
                      }}
                    >
                      <ArrowCounterClockwiseIcon size={16} aria-hidden="true" />
                      Reschedule
                    </Button>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    Need to cancel? Write to{" "}
                    <a
                      href={`mailto:${host.email}`}
                      className="rounded-sm underline underline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {host.email}
                    </a>
                    .
                  </p>
                </div>
              )}
            </Presence>
          </div>
        </Card>
      </main>
    </div>
  );
}
