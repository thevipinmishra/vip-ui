"use client";

import {
  type CalendarDate,
  getDayOfWeek,
  parseDate,
} from "@internationalized/date";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { RatingInput } from "@/components/ui/rating-input";
import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";
import { TextArea } from "@/components/ui/text-area";
import { showToast } from "@/components/ui/toast";
import { Block, BlockBody, BlockFooter } from "./block";

const topics = ["Speed", "Design", "Docs"];

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
      <BlockBody className="@container grid-cols-1 justify-items-center">
        <RangeCalendar
          aria-label="Days away"
          className="max-w-none max-sm:[--spacing:0.22rem] @max-[18rem]:[--spacing:0.22rem]"
          value={range}
          onChange={setRange}
        />
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
