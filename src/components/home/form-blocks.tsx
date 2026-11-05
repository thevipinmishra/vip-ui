"use client";

import {
  type CalendarDate,
  getDayOfWeek,
  parseDate,
} from "@internationalized/date";
import { useState } from "react";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import { CopyButton } from "@/components/ui/copy-button";
import { Form } from "@/components/ui/form";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { RatingInput } from "@/components/ui/rating-input";
import { Switch } from "@/components/ui/switch";
import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";
import { TextArea } from "@/components/ui/text-area";
import { showToast } from "@/components/ui/toast";
import {
  TagFieldValue,
  TokenField,
  TokenFieldDescription,
  TokenFieldInput,
  TokenFieldLabel,
} from "@/components/ui/token-field";
import { Block, BlockBody, BlockFooter } from "./block";

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
      </BlockBody>
    </Block>
  );
}

const topics = ["Speed", "Design", "Docs", "Keyboard"];

export function FeedbackBlock() {
  return (
    <Block title="Rate this release">
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
    <Block title="Time off">
      <BlockBody className="grid-cols-1 justify-items-center">
        <RangeCalendar
          aria-label="Days away"
          className="max-w-none max-sm:[--spacing:0.22rem]"
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
        <ComboBox
          label="Role"
          defaultValue="editor"
          options={roles}
          description="Choose what this person can change."
        />
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
      <BlockFooter className="flex-wrap justify-between gap-3 border-t border-border/70 pt-4">
        <div className="flex min-w-0 items-center gap-3">
          <AvatarGroup
            aria-label="Members"
            className="-space-x-1 [&_[data-slot=avatar]]:ring-card"
          >
            {members.map((name) => (
              <Avatar key={name} name={name} className="size-8 text-xs" />
            ))}
          </AvatarGroup>
          <span className="truncate text-xs text-muted-foreground">
            12 members
          </span>
        </div>
        <CopyButton
          className="shrink-0"
          value="https://acme.app/join/7fq2"
          size="sm"
          aria-label="Copy the invite link"
        >
          {(status) => (status === "copied" ? "Copied" : "Copy link")}
        </CopyButton>
      </BlockFooter>
    </Block>
  );
}
