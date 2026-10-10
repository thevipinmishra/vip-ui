"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const channels = ["Email", "Push", "Slack"] as const;
type Channel = (typeof channels)[number];

const events = [
  { id: "mentions", label: "Mentions", description: "Someone tags you." },
  { id: "comments", label: "Comments", description: "On items you follow." },
  { id: "assigned", label: "Assignments", description: "A task is yours." },
  { id: "deploys", label: "Failed deploys", description: "A build stops." },
  { id: "summary", label: "Weekly summary", description: "Each Monday." },
] as const;
type EventId = (typeof events)[number]["id"];

const initialMatrix: Record<EventId, Channel[]> = {
  mentions: ["Email", "Push", "Slack"],
  comments: ["Push"],
  assigned: ["Email", "Slack"],
  deploys: ["Email", "Push", "Slack"],
  summary: ["Email"],
};

export function NotificationSettings() {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [paused, setPaused] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggle(event: EventId, channel: Channel, on: boolean) {
    setSaved(false);
    setMatrix((current) => ({
      ...current,
      [event]: on
        ? [...current[event], channel]
        : current[event].filter((item) => item !== channel),
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h1" className="text-xl">
          Notifications
        </CardTitle>
        <CardDescription>
          Choose where we tell you about each event.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Switch
          checked={paused}
          onCheckedChange={(value) => {
            setSaved(false);
            setPaused(value);
          }}
          description="We keep all events and send nothing until you turn this off."
          className="w-full rounded-lg bg-muted/60 px-4 py-3 ring-1 ring-border/70"
        >
          Pause all notifications
        </Switch>
        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-[420px] border-separate border-spacing-0 text-sm">
            <caption className="sr-only">
              Notification channels for each event
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-b border-border pb-3 text-start text-xs font-semibold text-muted-foreground"
                >
                  Event
                </th>
                {channels.map((channel) => (
                  <th
                    key={channel}
                    scope="col"
                    className="w-20 border-b border-border pb-3 text-center text-xs font-semibold text-muted-foreground"
                  >
                    {channel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <th
                    scope="row"
                    className="border-b border-border/70 py-3 pe-4 text-start font-normal"
                  >
                    <span className="block font-medium">{event.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {event.description}
                    </span>
                  </th>
                  {channels.map((channel) => (
                    <td
                      key={channel}
                      className="border-b border-border/70 text-center"
                    >
                      <Checkbox
                        aria-label={`${event.label} by ${channel}`}
                        isDisabled={paused}
                        checked={matrix[event.id].includes(channel)}
                        onCheckedChange={(on) => toggle(event.id, channel, on)}
                        className="justify-center"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <RadioGroup
          label="Email delivery"
          defaultValue="hourly"
          isDisabled={paused}
          onChange={() => setSaved(false)}
        >
          <Radio value="instant" label="Right away" />
          <Radio
            value="hourly"
            label="Once an hour"
            description="One email with all events from the last hour."
          />
          <Radio
            value="daily"
            label="Once a day"
            description="One email at 9:00 in your time zone."
          />
        </RadioGroup>
      </CardContent>
      <CardFooter className="justify-end border-t border-border/70 pt-5">
        <output className="me-auto text-sm text-muted-foreground">
          {saved ? "Settings saved." : ""}
        </output>
        <Button
          variant="ghost"
          onPress={() => {
            setMatrix(initialMatrix);
            setPaused(false);
            setSaved(false);
          }}
        >
          Reset
        </Button>
        <Button onPress={() => setSaved(true)}>Save</Button>
      </CardFooter>
    </Card>
  );
}
