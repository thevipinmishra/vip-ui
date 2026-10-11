"use client";

import {
  type CalendarDate,
  getDayOfWeek,
  parseDate,
  Time,
} from "@internationalized/date";
import { KeyIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/ui/copy-button";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@/components/ui/fieldset";
import { Form } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { PasswordField } from "@/components/ui/password-field";
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { RatingInput } from "@/components/ui/rating-input";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import { TimeField } from "@/components/ui/time-field";
import { showToast } from "@/components/ui/toast";
import {
  TagFieldValue,
  TokenField,
  TokenFieldDescription,
  TokenFieldInput,
  TokenFieldLabel,
} from "@/components/ui/token-field";
import { Block, BlockBody, BlockFooter } from "./block";
import { Part } from "./part";

export function AccountBlock() {
  const [mode, setMode] = useState<"create" | "sign-in">("create");
  const [password, setPassword] = useState("");
  const creating = mode === "create";

  return (
    <Block as="h3" title={creating ? "Create an account" : "Sign in"}>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          showToast(
            creating
              ? {
                  title: "Account created",
                  description:
                    "We sent a link to your email. Open it to continue.",
                  variant: "success",
                }
              : { title: "Signed in", variant: "success" },
          );
        }}
      >
        <BlockBody>
          <Button variant="outline" className="w-full">
            <KeyIcon size={16} aria-hidden="true" />
            Continue with a passkey
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Separator className="flex-1" />
            or
            <Separator className="flex-1" />
          </div>
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            isRequired
          />
          <div className="grid gap-3">
            <PasswordField
              label="Password"
              name="password"
              autoComplete={creating ? "new-password" : "current-password"}
              value={password}
              onChange={setPassword}
              isRequired
            />
            {creating && <PasswordStrengthMeter password={password} />}
          </div>
          {creating && <Checkbox name="news">Send me product news</Checkbox>}
        </BlockBody>
        <BlockFooter className="flex-col items-stretch gap-3">
          <Button type="submit" className="w-full">
            {creating ? "Create account" : "Sign in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {creating ? "Have an account? " : "No account? "}
            <Link onPress={() => setMode(creating ? "sign-in" : "create")}>
              {creating ? "Sign in" : "Create one"}
            </Link>
          </p>
        </BlockFooter>
      </Form>
    </Block>
  );
}

const alerts = [
  {
    id: "mentions",
    label: "Mentions",
    description: "A person tags you in a comment.",
    on: true,
  },
  {
    id: "deploys",
    label: "Failed deploys",
    description: "A build stops because of an error.",
    on: true,
  },
  {
    id: "report",
    label: "Weekly report",
    description: "A summary of your projects each Monday.",
    on: false,
  },
];

export function NotificationsBlock() {
  return (
    <Block title="Notifications">
      <BlockBody className="gap-0 pt-2">
        <Part slug="switch">
          {alerts.map((alert) => (
            <Switch
              key={alert.id}
              defaultChecked={alert.on}
              description={alert.description}
              className="w-full py-2"
            >
              {alert.label}
            </Switch>
          ))}
        </Part>
      </BlockBody>
      <BlockFooter className="block border-t border-border/70 pt-4">
        <Part slug="fieldset">
          <Fieldset
            aria-describedby="quiet-hours-help"
            className="rounded-none bg-transparent p-0 shadow-none ring-0"
          >
            <FieldsetLegend className="px-0">Quiet hours</FieldsetLegend>
            <FieldsetDescription id="quiet-hours-help" className="mb-3">
              We keep messages until this period ends.
            </FieldsetDescription>
            <div className="grid grid-cols-2 gap-3">
              <Part slug="time-field">
                <TimeField
                  label="Start"
                  hourCycle={24}
                  defaultValue={new Time(22, 0)}
                />
              </Part>
              <TimeField
                label="End"
                hourCycle={24}
                defaultValue={new Time(7, 0)}
              />
            </div>
          </Fieldset>
        </Part>
      </BlockFooter>
    </Block>
  );
}

const topics = ["Speed", "Design", "Docs", "Keyboard"];

export function FeedbackBlock() {
  return (
    <Block as="h3" title="Rate this release">
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({
            title: "Feedback sent",
            description: "Thank you. Your notes help us make the next release.",
            variant: "success",
          });
        }}
      >
        <BlockBody>
          <RatingInput label="Score" name="score" defaultValue={4} />
          <TagGroup
            selectionMode="multiple"
            defaultSelectedKeys={["Speed", "Docs"]}
          >
            <TagGroupLabel>What works well?</TagGroupLabel>
            <TagListView items={topics.map((name) => ({ id: name, name }))}>
              {(item) => <Tag id={item.id}>{item.name}</Tag>}
            </TagListView>
          </TagGroup>
          <TextArea
            label="Comment"
            name="comment"
            placeholder="Tell us what to change. This is optional."
          />
        </BlockBody>
        <BlockFooter className="justify-end">
          <Button type="submit">Send feedback</Button>
        </BlockFooter>
      </Form>
    </Block>
  );
}

function countWorkDays(start: CalendarDate, end: CalendarDate) {
  let days = 0;
  for (let day = start; day.compare(end) <= 0; day = day.add({ days: 1 })) {
    const weekday = getDayOfWeek(day, "en-US");
    if (weekday !== 0 && weekday !== 6) days++;
  }
  return days;
}

export function TimeOffBlock() {
  const [range, setRange] = useState({
    start: parseDate("2026-10-19"),
    end: parseDate("2026-10-23"),
  });
  const days = countWorkDays(range.start, range.end);

  return (
    <Block as="h3" title="Time off">
      <BlockBody className="justify-items-center">
        <RangeCalendar
          aria-label="Days away"
          className="max-sm:[--spacing:0.22rem]"
          value={range}
          onChange={setRange}
        />
        <Switch
          defaultChecked
          description="People who write to you get your return date."
          className="w-full"
        >
          Send an automatic reply
        </Switch>
      </BlockBody>
      <BlockFooter className="justify-between border-t border-border/70 pt-4">
        <p className="text-sm">
          <span className="font-semibold tabular-nums">{days}</span>{" "}
          <span className="text-muted-foreground">
            work {days === 1 ? "day" : "days"}
          </span>
        </p>
        <Button
          isDisabled={days === 0}
          onPress={() =>
            showToast({
              title: "Request sent",
              description: "Your manager gets a notification.",
              variant: "success",
            })
          }
        >
          Send request
        </Button>
      </BlockFooter>
    </Block>
  );
}

const roles = [
  { id: "admin", name: "Admin", description: "Manage people and billing." },
  { id: "editor", name: "Editor", description: "Change projects and files." },
  { id: "viewer", name: "Viewer", description: "Read only." },
];

const members = ["Maya Chen", "Sam Rivera", "Jo Park", "Amina Shah"];

export function TeamBlock() {
  const [emails, setEmails] = useState(
    () =>
      new TagFieldValue([
        { type: "token", text: "lena@acme.co" },
        { type: "token", text: "tom@acme.co" },
      ]),
  );
  const count = emails.segments.filter(
    (segment) => segment.type === "token",
  ).length;

  return (
    <Block title="Invite people">
      <BlockBody>
        <Part slug="token-field">
          <TokenField
            allowsNewlines
            value={emails}
            onChange={setEmails}
            onSubmit={() => setEmails(emails.commit())}
          >
            <TokenFieldLabel>Email addresses</TokenFieldLabel>
            <TokenFieldInput placeholder="Add an email" />
            <TokenFieldDescription>
              Push Enter or type a comma after each address.
            </TokenFieldDescription>
          </TokenField>
        </Part>
        <Part slug="select">
          <Select label="Role" defaultValue="editor" options={roles} />
        </Part>
        <Button
          isDisabled={count === 0}
          onPress={() => {
            showToast({
              title: count === 1 ? "Invite sent" : `${count} invites sent`,
              variant: "success",
            });
            setEmails(new TagFieldValue([]));
          }}
        >
          Send {count === 1 ? "invite" : `${count} invites`}
        </Button>
      </BlockBody>
      <BlockFooter className="flex-nowrap justify-between gap-3 border-t border-border/70 pt-4">
        <Part slug="avatar" className="flex items-center gap-3">
          <AvatarGroup
            aria-label="Members"
            className="-space-x-1 [&_[data-slot=avatar]]:ring-card"
          >
            {members.map((name) => (
              <Avatar key={name} name={name} className="size-8 text-xs" />
            ))}
          </AvatarGroup>
          <span className="truncate text-sm text-muted-foreground">
            12 members
          </span>
        </Part>
        <Part slug="copy-button" className="shrink-0">
          <CopyButton
            value="https://acme.app/join/7fq2"
            size="sm"
            aria-label="Copy the invite link"
          >
            {(status) => (status === "copied" ? "Copied" : "Copy link")}
          </CopyButton>
        </Part>
      </BlockFooter>
    </Block>
  );
}
