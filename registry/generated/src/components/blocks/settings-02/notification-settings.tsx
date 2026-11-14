"use client";

import { Time } from "@internationalized/date";
import { CheckIcon } from "@phosphor-icons/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Card } from "../../vip-ui/card";
import { Checkbox } from "../../vip-ui/checkbox";
import { IconSwap } from "../../vip-ui/icon-swap";
import { Presence } from "../../vip-ui/presence";
import { Radio, RadioGroup } from "../../vip-ui/radio-group";
import { Spinner } from "../../vip-ui/spinner";
import { Switch } from "../../vip-ui/switch";
import { TextSwap } from "../../vip-ui/text-swap";
import { TimeField } from "../../vip-ui/time-field";
import { cn } from "../../vip-ui/utils";
import { SettingsShell } from "./settings-shell";

const channels = ["Email", "Push", "Slack"] as const;
type Channel = (typeof channels)[number];

interface NotificationEvent {
  id: string;
  label: string;
  description: string;
  channels?: readonly Channel[];
}

const groups: { title: string; events: NotificationEvent[] }[] = [
  {
    title: "Activity",
    events: [
      {
        id: "mentions",
        label: "Mentions",
        description: "Someone mentions you in a comment.",
      },
      {
        id: "replies",
        label: "Replies",
        description: "Someone replies in a thread that you follow.",
      },
      {
        id: "shares",
        label: "Shared reports",
        description: "Someone shares a report or a dashboard with you.",
      },
    ],
  },
  {
    title: "Data",
    events: [
      {
        id: "alerts",
        label: "Metric alerts",
        description: "A metric goes above or below a limit that you set.",
      },
      {
        id: "syncs",
        label: "Failed syncs",
        description: "An integration stops sending data.",
      },
      {
        id: "digest",
        label: "Weekly digest",
        description: "A summary of your key metrics each Monday.",
        channels: ["Email", "Slack"],
      },
    ],
  },
];

const initialMatrix: Record<string, Channel[]> = {
  mentions: ["Email", "Push", "Slack"],
  replies: ["Push"],
  shares: ["Email"],
  alerts: ["Email", "Push", "Slack"],
  syncs: ["Email", "Slack"],
  digest: ["Email"],
};

type SaveStatus = "idle" | "saving" | "saved";

const statusText: Record<SaveStatus, string> = {
  idle: "Changes save automatically",
  saving: "Saving",
  saved: "All changes saved",
};

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
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      <Card className="min-w-0">{children}</Card>
    </section>
  );
}

export function NotificationSettings() {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [paused, setPaused] = useState(false);
  const [delivery, setDelivery] = useState("hourly");
  const [quiet, setQuiet] = useState(true);
  const [quietFrom, setQuietFrom] = useState<Time | null>(new Time(22, 0));
  const [quietTo, setQuietTo] = useState<Time | null>(new Time(7, 0));
  const [status, setStatus] = useState<SaveStatus>("idle");
  const saveTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(saveTimer.current), []);

  function save() {
    setStatus("saving");
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => setStatus("saved"), 700);
  }

  function toggle(event: string, channel: Channel, on: boolean) {
    setMatrix((current) => ({
      ...current,
      [event]: on
        ? [...current[event], channel]
        : current[event].filter((item) => item !== channel),
    }));
    save();
  }

  return (
    <SettingsShell
      current="notifications"
      title="Notifications"
      description="Choose what Kestrel tells you about and where."
      actions={
        <output
          aria-live="polite"
          className="flex min-h-9 items-center gap-2 text-sm text-muted-foreground"
        >
          {status !== "idle" && (
            <IconSwap contentKey={status}>
              {status === "saving" ? (
                <Spinner size="sm" decorative />
              ) : (
                <CheckIcon size={16} weight="bold" className="text-success" />
              )}
            </IconSwap>
          )}
          <TextSwap value={statusText[status]} />
        </output>
      }
    >
      <div className="grid gap-8">
        <Section
          title="Pause"
          description="Take a break and keep your settings."
        >
          <Switch
            checked={paused}
            onCheckedChange={(value) => {
              setPaused(value);
              save();
            }}
            description="We keep all events in your inbox and send nothing until you turn this off."
            className="w-full p-5"
          >
            Pause all notifications
          </Switch>
        </Section>

        <Section
          title="Events"
          description="Slack messages go to the #alerts channel."
        >
          <table className="mb-2.5 w-full border-separate border-spacing-0 text-sm">
            <caption className="sr-only">
              Notification channels for each event
            </caption>
            <thead>
              <tr>
                <th scope="col" className="sr-only">
                  Event
                </th>
                {channels.map((channel) => (
                  <th
                    key={channel}
                    scope="col"
                    className="w-14 pt-4 pb-1 text-center text-xs font-medium text-muted-foreground last:w-19 last:pe-5 sm:w-18 sm:last:w-23"
                  >
                    {channel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group, groupIndex) => (
                <Fragment key={group.title}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={channels.length + 1}
                      className={cn(
                        "px-5 pb-1 text-start text-xs font-medium text-muted-foreground",
                        groupIndex > 0 && "border-t border-border/70 pt-4",
                      )}
                    >
                      {group.title}
                    </th>
                  </tr>
                  {group.events.map((event) => (
                    <tr key={event.id}>
                      <th
                        scope="row"
                        className="py-2.5 ps-5 pe-3 text-start font-normal last:pb-4"
                      >
                        <span className="block font-medium">{event.label}</span>
                        <span className="block text-xs leading-5 text-muted-foreground max-sm:hidden">
                          {event.description}
                        </span>
                      </th>
                      {channels.map((channel) => (
                        <td key={channel} className="text-center last:pe-5">
                          {event.channels &&
                          !event.channels.includes(channel) ? (
                            <span className="text-muted-foreground">
                              <span aria-hidden="true">–</span>
                              <span className="sr-only">Not available</span>
                            </span>
                          ) : (
                            <Checkbox
                              aria-label={`${event.label} by ${channel}`}
                              isDisabled={paused}
                              checked={matrix[event.id].includes(channel)}
                              onCheckedChange={(on) =>
                                toggle(event.id, channel, on)
                              }
                              className="w-full items-center"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </Section>

        <Section
          title="Email delivery"
          description="We send emails to nadia@kestrel.app."
        >
          <div className="p-5">
            <RadioGroup
              aria-label="Email delivery"
              value={delivery}
              isDisabled={paused}
              onChange={(value) => {
                setDelivery(value);
                save();
              }}
            >
              <Radio value="instant" description="One email for each event.">
                Right away
              </Radio>
              <Radio
                value="hourly"
                description="One email with all events from the last hour."
              >
                Once an hour
              </Radio>
              <Radio
                value="daily"
                description="One email at 09:00 in your time zone."
              >
                Once a day
              </Radio>
            </RadioGroup>
          </div>
        </Section>

        <Section
          title="Quiet hours"
          description="Kestrel uses your time zone, Berlin."
        >
          <div className="grid p-5">
            <Switch
              checked={quiet}
              isDisabled={paused}
              onCheckedChange={(value) => {
                setQuiet(value);
                save();
              }}
              description="We hold push and Slack messages and send them when quiet hours end."
              className="w-full"
            >
              Use quiet hours
            </Switch>
            <Presence show={quiet} collapse>
              <div className="flex flex-wrap gap-4 pt-4">
                <TimeField
                  size="sm"
                  label="From"
                  hourCycle={24}
                  value={quietFrom}
                  isDisabled={paused}
                  onChange={(value) => {
                    setQuietFrom(value);
                    if (value) save();
                  }}
                  className="w-32"
                />
                <TimeField
                  size="sm"
                  label="To"
                  hourCycle={24}
                  value={quietTo}
                  isDisabled={paused}
                  onChange={(value) => {
                    setQuietTo(value);
                    if (value) save();
                  }}
                  className="w-32"
                />
              </div>
            </Presence>
          </div>
        </Section>
      </div>
    </SettingsShell>
  );
}
