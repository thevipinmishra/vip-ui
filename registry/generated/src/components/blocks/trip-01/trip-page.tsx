"use client";

import {
  ArrowRightIcon,
  BedIcon,
  CalendarBlankIcon,
  CameraIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleIcon,
  CloudIcon,
  CloudSunIcon,
  CompassIcon,
  CompassRoseIcon,
  CopyIcon,
  ForkKnifeIcon,
  MapPinIcon,
  MountainsIcon,
  NotePencilIcon,
  PlusIcon,
  ShareNetworkIcon,
  ShoppingBagIcon,
  SparkleIcon,
  SunIcon,
  TicketIcon,
  TrainIcon,
  UmbrellaIcon,
  UsersIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { type FormEvent, useState } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { ButtonLink } from "../../vip-ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import { Checkbox } from "../../vip-ui/checkbox";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import { NumberField } from "../../vip-ui/number-field";
import { ProgressBar } from "../../vip-ui/progress-bar";
import { Select } from "../../vip-ui/select";
import { Tab, TabList, TabPanel, Tabs } from "../../vip-ui/tabs";
import { TextArea } from "../../vip-ui/text-area";
import { TextField } from "../../vip-ui/text-field";
import { showToast } from "../../vip-ui/toast";
import { cn } from "../../vip-ui/utils";
import {
  type Activity,
  type ActivityKind,
  days,
  initialNotes,
  trip as initialTrip,
  kindTone,
  money,
  packing,
  reservations,
  type TripDay,
  tips,
} from "./data";

const activityIcons = {
  food: ForkKnifeIcon,
  sight: CameraIcon,
  stay: BedIcon,
  transport: TrainIcon,
  nature: MountainsIcon,
  shop: ShoppingBagIcon,
} as const;

const weatherIcons = {
  sun: SunIcon,
  "cloud-sun": CloudSunIcon,
  cloud: CloudIcon,
  rain: UmbrellaIcon,
} as const;

const kindLabels: Record<ActivityKind, string> = {
  food: "Food",
  sight: "Sight",
  stay: "Stay",
  transport: "Transport",
  nature: "Nature",
  shop: "Shop",
};

const tripCover = "https://vip-ui.dev/blocks/images/lisbon.webp";

function toneStyle(tone: string) {
  return {
    color: tone,
    backgroundColor: `color-mix(in oklab, ${tone} 16%, transparent)`,
  };
}

function isActivityKind(value: unknown): value is ActivityKind {
  return typeof value === "string" && Object.hasOwn(kindLabels, value);
}

export function TripPage() {
  const [trip, setTrip] = useState(initialTrip);
  const [itinerary, setItinerary] = useState(days);
  const [dayId, setDayId] = useState(days[0].id);
  const [editor, setEditor] = useState<"trip" | "stop" | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set(["d1-1"]),
  );
  const [packed, setPacked] = useState<Set<string>>(
    () => new Set(packing.filter((item) => item.done).map((item) => item.id)),
  );
  const [notes, setNotes] = useState(initialNotes);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const activeDay = itinerary.find((day) => day.id === dayId) ?? itinerary[0];
  const dayNotes = notes.filter((note) => note.dayId === activeDay.id);
  const noteDraft = drafts[activeDay.id] ?? "";

  function toggleActivity(id: string) {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function togglePacked(id: string, isSelected: boolean) {
    setPacked((current) => {
      const next = new Set(current);
      if (isSelected) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function setNoteDraft(value: string) {
    setDrafts((current) => ({ ...current, [activeDay.id]: value }));
  }

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = noteDraft.trim();
    if (!text) return;
    setNotes((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        dayId: activeDay.id,
        text,
        author: "Ana",
        time: "Just now",
      },
    ]);
    setNoteDraft("");
    showToast({
      title: "Note added",
      description: "The note is saved to this day.",
      variant: "success",
    });
  }

  function saveEditor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    if (editor === "trip") {
      const name = String(fields.get("name")).trim();
      if (!name) return;
      setTrip((current) => ({
        ...current,
        name,
        summary: String(fields.get("summary")).trim(),
        budget: Number(fields.get("budget")),
      }));
      showToast({ title: "Trip updated", variant: "success" });
    } else {
      const title = String(fields.get("title")).trim();
      const location = String(fields.get("location")).trim();
      const kind = fields.get("kind");
      if (!title || !location || !isActivityKind(kind)) return;
      const activity: Activity = {
        id: crypto.randomUUID(),
        title,
        location,
        kind,
        time: String(fields.get("time")),
        duration: `${fields.get("duration")} min`,
      };
      setItinerary((current) =>
        current.map((day) =>
          day.id === activeDay.id
            ? {
                ...day,
                activities: [...day.activities, activity].sort((a, b) =>
                  a.time.localeCompare(b.time),
                ),
              }
            : day,
        ),
      );
      showToast({ title: "Stop added", variant: "success" });
    }
    setEditor(null);
  }

  async function shareTrip() {
    try {
      const url = new URL(window.location.pathname, window.location.origin);
      await navigator.clipboard.writeText(url.href);
      showToast({
        title: "Trip link copied",
        description: "Anyone with the link can open this itinerary preview.",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Could not copy the link",
        description: "Allow clipboard access and try again.",
        variant: "error",
      });
    }
  }

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      showToast({
        title: "Confirmation copied",
        description: code,
        variant: "success",
      });
    } catch {
      showToast({
        title: "Could not copy the code",
        description: "Allow clipboard access and try again.",
        variant: "error",
      });
    }
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <TripHeader travelers={trip.travelers} onShare={shareTrip} />

      <main className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 lg:py-8">
        <TripCover
          trip={trip}
          onShare={shareTrip}
          onEdit={() => setEditor("trip")}
        />

        <Tabs
          id="itinerary"
          selectedKey={dayId}
          onSelectionChange={(key) => setDayId(String(key))}
          className="mt-6 scroll-mt-4"
        >
          <TabList
            aria-label="Trip days"
            size="sm"
            className="w-full justify-start bg-muted/60 p-1"
          >
            {itinerary.map((day) => (
              <Tab
                key={day.id}
                id={day.id}
                className="min-w-28 flex-1 flex-col items-start justify-center gap-0.5 px-3 py-2 text-start sm:px-4"
              >
                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {day.label}
                </span>
                <span className="text-sm font-semibold">
                  {day.date} · {day.city}
                </span>
                <span className="text-xs text-muted-foreground">
                  {day.weekday}
                </span>
              </Tab>
            ))}
          </TabList>

          {itinerary.map((day) => {
            return (
              <TabPanel
                key={day.id}
                id={day.id}
                className="mt-4 grid gap-5 bg-transparent p-0 shadow-none ring-0 lg:grid-cols-[minmax(0,1fr)_20rem]"
              >
                <TripDayContent
                  day={day}
                  completed={completed}
                  onToggle={toggleActivity}
                  onAddStop={() => setEditor("stop")}
                  dayNotes={dayNotes}
                  noteDraft={noteDraft}
                  onDraftChange={setNoteDraft}
                  onAddNote={addNote}
                />
                <TripSidebar
                  trip={trip}
                  itinerary={itinerary}
                  dayId={dayId}
                  onSelectDay={setDayId}
                  packed={packed}
                  onTogglePacked={togglePacked}
                  onCopyCode={copyCode}
                />
              </TabPanel>
            );
          })}
        </Tabs>

        <p className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CheckIcon size={13} aria-hidden="true" />
          Times are local to Portugal.
        </p>
      </main>

      <footer className="border-t border-border/70 bg-card">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:px-6">
          <span className="flex items-center gap-2">
            <CompassIcon size={14} aria-hidden="true" />
            Roam
          </span>
          <span>
            {trip.name} · {trip.dates}
          </span>
        </div>
      </footer>
      <TripEditorDialog
        editor={editor}
        trip={trip}
        day={activeDay}
        onClose={() => setEditor(null)}
        onSubmit={saveEditor}
      />
    </div>
  );
}

function TripHeader({
  travelers,
  onShare,
}: {
  travelers: string[];
  onShare: () => Promise<void>;
}) {
  return (
    <header className="border-b border-border/70 bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-3 px-4 sm:px-6">
        <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
          <CompassIcon size={19} weight="fill" aria-hidden="true" />
        </span>
        <span className="text-base font-semibold tracking-[-0.02em]">Roam</span>
        <nav
          aria-label="Primary"
          className="ms-6 hidden items-center gap-1 md:flex"
        >
          <ButtonLink href="#itinerary" size="sm" variant="ghost">
            Itinerary
          </ButtonLink>
          <ButtonLink href="#packing" size="sm" variant="ghost">
            Packing
          </ButtonLink>
          <ButtonLink href="#reservations" size="sm" variant="ghost">
            Reservations
          </ButtonLink>
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <Button
            variant="minimal"
            size="sm"
            iconOnly
            aria-label="Copy trip link"
            onPress={onShare}
          >
            <ShareNetworkIcon size={18} aria-hidden="true" />
          </Button>
          <div className="flex -space-x-2">
            {travelers.map((traveler) => (
              <Avatar
                key={traveler}
                name={traveler}
                size="sm"
                className="ring-2 ring-card"
              />
            ))}
          </div>
        </div>
      </div>
      <nav
        aria-label="Trip sections"
        className="mx-auto flex max-w-[1240px] gap-1 px-4 pb-2 md:hidden"
      >
        <ButtonLink href="#itinerary" size="sm" variant="ghost">
          Itinerary
        </ButtonLink>
        <ButtonLink href="#packing" size="sm" variant="ghost">
          Packing
        </ButtonLink>
        <ButtonLink href="#reservations" size="sm" variant="ghost">
          Reservations
        </ButtonLink>
      </nav>
    </header>
  );
}

function TripCover({
  trip,
  onShare,
  onEdit,
}: {
  trip: typeof initialTrip;
  onShare: () => Promise<void>;
  onEdit: () => void;
}) {
  return (
    <section
      aria-labelledby="trip-title"
      className="grid overflow-hidden rounded-[1.5rem] border border-border/75 bg-card shadow-(--shadow-card) md:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="min-w-0 bg-[#f4ece1] px-5 py-6 dark:bg-[#29231f] sm:p-8 lg:p-10">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#8b472b] uppercase dark:text-[#f3b79b]">
          <CompassRoseIcon size={14} aria-hidden="true" />
          {trip.region}
        </p>
        <h1
          id="trip-title"
          className="mt-3 font-serif text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-balance wrap-anywhere sm:text-5xl xl:text-6xl"
        >
          {trip.name}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          {trip.summary}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5">
            <CalendarBlankIcon
              size={16}
              className="text-muted-foreground"
              aria-hidden="true"
            />
            {trip.dates}
          </span>
          <span className="flex items-center gap-1.5">
            <BedIcon
              size={16}
              className="text-muted-foreground"
              aria-hidden="true"
            />
            {trip.nights} nights
          </span>
          <span className="flex items-center gap-1.5">
            <UsersIcon
              size={16}
              className="text-muted-foreground"
              aria-hidden="true"
            />
            {trip.travelers.length} travelers
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            className="bg-[#863f27] text-white hover:bg-[#70301b] dark:bg-[#edaa8d] dark:text-[#291a14] dark:hover:bg-[#f7bea7]"
            onPress={onShare}
          >
            <ShareNetworkIcon
              data-icon="inline-start"
              size={15}
              aria-hidden="true"
            />
            Share trip
          </Button>
          <Button variant="outline" size="sm" onPress={onEdit}>
            <NotePencilIcon
              data-icon="inline-start"
              size={15}
              aria-hidden="true"
            />
            Edit trip
          </Button>
        </div>
      </div>
      <div
        className="relative -order-1 min-h-36 bg-[#bca68e] bg-cover bg-[center_57%] sm:min-h-48 md:order-0"
        style={{ backgroundImage: `url("${tripCover}")` }}
      >
        <p className="absolute end-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <MapPinIcon size={14} aria-hidden="true" /> Alfama, Lisbon
        </p>
      </div>
    </section>
  );
}

function TripSidebar({
  trip,
  itinerary,
  dayId,
  onSelectDay,
  packed,
  onTogglePacked,
  onCopyCode,
}: {
  trip: typeof initialTrip;
  itinerary: TripDay[];
  dayId: string;
  onSelectDay: (id: string) => void;
  packed: ReadonlySet<string>;
  onTogglePacked: (id: string, isSelected: boolean) => void;
  onCopyCode: (code: string) => Promise<void>;
}) {
  const packedCount = packing.filter((item) => packed.has(item.id)).length;
  return (
    <aside className="grid content-start gap-5">
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Trip at a glance</CardTitle>
            <CardDescription>{trip.region}</CardDescription>
          </div>
          <MapPinIcon
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{trip.route[0]}</span>
            <ArrowRightIcon
              size={13}
              className="text-muted-foreground"
              aria-hidden="true"
            />
            <span className="font-medium">{trip.route[1]}</span>
            <ArrowRightIcon
              size={13}
              className="text-muted-foreground"
              aria-hidden="true"
            />
            <span className="font-medium">{trip.route[2]}</span>
          </div>
          <DescriptionList layout="columns" className="text-xs">
            <DescriptionTerm>Dates</DescriptionTerm>
            <DescriptionDetail>{trip.dates}</DescriptionDetail>
            <DescriptionTerm>Travelers</DescriptionTerm>
            <DescriptionDetail>
              {trip.travelers.length} adults
            </DescriptionDetail>
            <DescriptionTerm>Pace</DescriptionTerm>
            <DescriptionDetail>{trip.pace}</DescriptionDetail>
            <DescriptionTerm>Weather</DescriptionTerm>
            <DescriptionDetail>Mild, light layers</DescriptionDetail>
          </DescriptionList>
          <div>
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <WalletIcon size={13} aria-hidden="true" />
                Budget
              </span>
              <span className="font-medium tabular-nums">
                {money(trip.spent)} of {money(trip.budget)}
              </span>
            </div>
            <ProgressBar
              aria-label="Trip budget used"
              value={trip.spent}
              maxValue={trip.budget}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Forecast</CardTitle>
            <CardDescription>October 12–16</CardDescription>
          </div>
          <SunIcon
            size={20}
            className="text-warning-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="grid gap-1">
          {itinerary.map((item) => {
            const Icon = weatherIcons[item.weather];
            const isActive = item.id === dayId;
            return (
              <ButtonLink
                key={item.id}
                href="#itinerary"
                variant="ghost"
                size="sm"
                aria-current={isActive ? "date" : undefined}
                onClick={() => onSelectDay(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-2 py-1.5 text-xs",
                  isActive && "bg-accent font-medium",
                )}
              >
                <span className="w-7 text-muted-foreground">
                  {item.weekday.slice(0, 3)}
                </span>
                <span className="sr-only">
                  {item.date}, {item.city}, high
                </span>
                <Icon
                  size={16}
                  className="shrink-0 text-warning-foreground"
                  aria-hidden="true"
                />
                <span className="ms-auto tabular-nums">{item.high}°</span>
                <span className="sr-only">, low</span>
                <span className="w-7 text-end text-muted-foreground tabular-nums">
                  {item.low}°
                </span>
              </ButtonLink>
            );
          })}
        </CardContent>
      </Card>

      <Card id="packing" className="scroll-mt-4">
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Packing</CardTitle>
            <CardDescription>
              {packedCount} of {packing.length} packed
            </CardDescription>
          </div>
          <ShoppingBagIcon
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="grid gap-1">
          <ProgressBar
            aria-label="Packing progress"
            value={packedCount}
            maxValue={packing.length}
            className="mb-3 [&_[data-slot=progress-bar-value]]:sr-only"
          />
          {packing.map((item) => (
            <Checkbox
              key={item.id}
              isSelected={packed.has(item.id)}
              onChange={(isSelected) => onTogglePacked(item.id, isSelected)}
              className="py-0.5 text-sm"
            >
              {item.label}
            </Checkbox>
          ))}
        </CardContent>
      </Card>

      <Card id="reservations" className="scroll-mt-4">
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Reservations</CardTitle>
            <CardDescription>{reservations.length} confirmed</CardDescription>
          </div>
          <TicketIcon
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="grid gap-2">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="rounded-lg border border-border/70 bg-background px-2.5 py-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">
                    {reservation.title}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {reservation.detail}
                  </p>
                </div>
                <Button
                  variant="minimal"
                  size="xs"
                  iconOnly
                  aria-label={`Copy ${reservation.title} confirmation`}
                  onPress={() => onCopyCode(reservation.code)}
                >
                  <CopyIcon size={13} aria-hidden="true" />
                </Button>
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <CalendarBlankIcon size={11} aria-hidden="true" />
                {reservation.date} · {reservation.time}
                <span className="ms-auto font-mono">{reservation.code}</span>
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Good to know</CardTitle>
            <CardDescription>Local tips</CardDescription>
          </div>
          <SparkleIcon
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="grid gap-2">
          {tips.map((tip) => (
            <p
              key={tip}
              className="flex gap-2 text-xs leading-5 text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="mt-2 size-1 shrink-0 rounded-full bg-warning-foreground"
              />
              {tip}
            </p>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}

function TripDayContent({
  day,
  completed,
  onToggle,
  onAddStop,
  dayNotes,
  noteDraft,
  onDraftChange,
  onAddNote,
}: {
  day: TripDay;
  completed: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onAddStop: () => void;
  dayNotes: typeof initialNotes;
  noteDraft: string;
  onDraftChange: (value: string) => void;
  onAddNote: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const WeatherIcon = weatherIcons[day.weather];
  const doneCount = day.activities.filter((activity) =>
    completed.has(activity.id),
  ).length;
  return (
    <div className="grid min-w-0 content-start gap-5">
      <Card>
        <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border/70">
          <div className="grid gap-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {day.weekday} · {day.date}
            </p>
            <CardTitle as="h2" className="mt-1 font-serif text-2xl font-medium">
              {day.city}
            </CardTitle>
            <CardDescription>{day.summary}</CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-warning-subtle px-3 py-2 text-warning-foreground">
            <WeatherIcon size={24} weight="fill" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">{day.high}°C</p>
              <p className="text-[10px]">Low {day.low}°C</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant={
                doneCount === day.activities.length ? "success" : "outline"
              }
            >
              {doneCount} of {day.activities.length} stops done
            </Badge>
            <Button variant="outline" size="sm" onPress={onAddStop}>
              <PlusIcon data-icon="inline-start" aria-hidden="true" />
              Add stop
            </Button>
          </div>
          <ol className="grid">
            {day.activities.map((activity) => (
              <ActivityRow
                key={activity.id}
                activity={activity}
                done={completed.has(activity.id)}
                onToggle={() => onToggle(activity.id)}
              />
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Notes</CardTitle>
            <CardDescription>
              {dayNotes.length} {dayNotes.length === 1 ? "note" : "notes"} for{" "}
              {day.date}
            </CardDescription>
          </div>
          <NotePencilIcon
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="grid gap-3">
          {dayNotes.length > 0 && (
            <div className="grid gap-2">
              {dayNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg bg-muted/45 px-3 py-2.5"
                >
                  <p className="text-sm leading-6 whitespace-pre-wrap wrap-anywhere">
                    {note.text}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {note.author} · {note.time}
                  </p>
                </div>
              ))}
            </div>
          )}
          <form className="grid gap-3" onSubmit={onAddNote}>
            <TextArea
              aria-label="Add a note"
              placeholder="Add a note for this day"
              size="sm"
              rows={2}
              maxLength={600}
              value={noteDraft}
              onChange={onDraftChange}
            />
            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              type="submit"
              isDisabled={!noteDraft.trim()}
            >
              <PlusIcon data-icon="inline-start" size={14} aria-hidden="true" />
              Add note
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Route</CardTitle>
            <CardDescription>
              {day.city} · {day.date}
            </CardDescription>
          </div>
          <CompassIcon
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent>
          <RouteMap activeCity={day.city} />
        </CardContent>
      </Card>
    </div>
  );
}

function TripEditorDialog({
  editor,
  trip,
  day,
  onClose,
  onSubmit,
}: {
  editor: "trip" | "stop" | null;
  trip: typeof initialTrip;
  day: TripDay;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <DialogContent
      size="sm"
      overlayProps={{
        isOpen: editor !== null,
        onOpenChange: (open) => {
          if (!open) onClose();
        },
      }}
    >
      {editor && (
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle level={2}>
              {editor === "trip" ? "Edit trip" : "Add stop"}
            </DialogTitle>
            <DialogDescription>
              {editor === "trip"
                ? "Update the name, description, and budget."
                : `${day.weekday}, ${day.date} · ${day.city}`}
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4 grid gap-4">
            {editor === "trip" ? (
              <>
                <TextField
                  label="Trip name"
                  name="name"
                  defaultValue={trip.name}
                  maxLength={64}
                  pattern=".*\S.*"
                  isRequired
                />
                <TextArea
                  label="Description"
                  name="summary"
                  defaultValue={trip.summary}
                  maxLength={180}
                  rows={3}
                />
                <NumberField
                  label="Budget (USD)"
                  name="budget"
                  defaultValue={trip.budget}
                  minValue={1}
                  maxValue={1_000_000}
                  steppers="stacked"
                  isRequired
                />
              </>
            ) : (
              <>
                <TextField
                  label="Stop name"
                  name="title"
                  pattern=".*\S.*"
                  maxLength={72}
                  isRequired
                />
                <TextField
                  label="Location"
                  name="location"
                  pattern=".*\S.*"
                  maxLength={72}
                  isRequired
                />
                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="Time"
                    name="time"
                    type="time"
                    defaultValue="10:00"
                    isRequired
                  />
                  <NumberField
                    label="Duration (min)"
                    name="duration"
                    defaultValue={60}
                    minValue={1}
                    maxValue={1440}
                    steppers="stacked"
                    isRequired
                  />
                </div>
                <Select
                  label="Type"
                  name="kind"
                  defaultValue="sight"
                  options={Object.entries(kindLabels).map(([id, name]) => ({
                    id,
                    name,
                  }))}
                />
              </>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onPress={() => onClose()}>
              Cancel
            </Button>
            <Button type="submit">
              {editor === "trip" ? "Save changes" : "Add stop"}
            </Button>
          </DialogFooter>
        </form>
      )}
    </DialogContent>
  );
}

function ActivityRow({
  activity,
  done,
  onToggle,
}: {
  activity: Activity;
  done: boolean;
  onToggle: () => void;
}) {
  const Icon = activityIcons[activity.kind];
  const tone = kindTone[activity.kind];
  return (
    <li className="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-2 pb-5 last:pb-0 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-3">
      <p className="pt-1 text-end text-[11px] font-medium text-muted-foreground tabular-nums">
        {activity.time}
      </p>
      <div className="relative border-s border-border/70 ps-5 pb-1">
        <span
          className="absolute -start-3 top-0.5 grid size-6 place-items-center rounded-full"
          style={toneStyle(tone)}
        >
          <Icon size={13} aria-hidden="true" />
        </span>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3
              className={cn(
                "text-sm font-semibold transition-colors",
                done && "text-muted-foreground line-through decoration-border",
              )}
            >
              {activity.title}
            </h3>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPinIcon size={12} aria-hidden="true" />
                {activity.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activity.duration}</span>
            </p>
          </div>
          <Button
            variant="ghost"
            size="xs"
            iconOnly
            aria-label={
              done
                ? `Mark ${activity.title} as not done`
                : `Mark ${activity.title} as done`
            }
            aria-pressed={done}
            onPress={onToggle}
          >
            {done ? (
              <CheckCircleIcon
                size={18}
                weight="fill"
                className="text-success"
                aria-hidden="true"
              />
            ) : (
              <CircleIcon
                size={18}
                className="text-muted-foreground"
                aria-hidden="true"
              />
            )}
          </Button>
        </div>
        {activity.booking && (
          <Badge variant="accent" className="mt-2">
            <TicketIcon size={12} aria-hidden="true" />
            {activity.booking}
          </Badge>
        )}
        {activity.note && (
          <p className="mt-2 rounded-lg bg-muted/40 px-3 py-2 text-xs leading-5 text-muted-foreground">
            {activity.note}
          </p>
        )}
        <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ backgroundColor: tone }}
          />
          {kindLabels[activity.kind]}
        </p>
      </div>
    </li>
  );
}

function RouteMap({ activeCity }: { activeCity: string }) {
  const stops = [
    { city: "Lisbon", x: 76, y: 100 },
    { city: "Sintra", x: 132, y: 44 },
    { city: "Cascais", x: 58, y: 42 },
  ];
  return (
    <div className="relative overflow-hidden rounded-xl bg-muted/40 p-2">
      <svg
        viewBox="0 0 220 132"
        role="img"
        aria-label={`Route between Lisbon, Sintra, and Cascais. Selected city: ${activeCity}.`}
        className="mx-auto h-auto w-full max-w-md"
      >
        <path
          d="M0 104 C34 96 48 80 76 100 C104 120 122 86 132 44 C142 12 176 8 220 18"
          fill="none"
          stroke="var(--border)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M0 104 C34 96 48 80 76 100 C104 120 122 86 132 44 C142 12 176 8 220 18"
          fill="none"
          stroke="var(--chart-2)"
          strokeWidth="2"
          strokeDasharray="4 5"
          opacity="0.6"
        />
        {stops.map((stop) => {
          const active = stop.city === activeCity;
          return (
            <g key={stop.city}>
              <circle
                cx={stop.x}
                cy={stop.y}
                r={active ? 9 : 6}
                fill={active ? "var(--chart-3)" : "var(--card)"}
                stroke={active ? "var(--chart-3)" : "var(--border)"}
                strokeWidth="2"
              />
              {active && (
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="15"
                  fill="none"
                  stroke="var(--chart-3)"
                  opacity="0.3"
                />
              )}
              <text
                x={stop.x}
                y={stop.y - 16}
                textAnchor="middle"
                fill="var(--foreground)"
                fontSize="8"
                fontWeight="600"
              >
                {stop.city}
              </text>
            </g>
          );
        })}
        <path
          d="M0 118 C40 110 70 122 110 114 C150 106 180 114 220 106"
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth="1"
          opacity="0.18"
        />
        <path
          d="M0 126 C50 118 90 128 130 120 C170 112 195 120 220 114"
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth="1"
          opacity="0.12"
        />
      </svg>
      <p className="px-1 pb-1 text-[10px] text-muted-foreground">
        <span className="font-medium text-foreground">{activeCity}</span>· 3
        stops on this trip
      </p>
    </div>
  );
}
