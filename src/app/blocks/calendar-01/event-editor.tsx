"use client";

import type { CalendarDate, Time } from "@internationalized/date";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { TimeField } from "@/components/ui/time-field";
import { type CalendarId, calendars, people } from "./data";

export interface EventDraft {
  id?: string;
  title: string;
  calendar: CalendarId;
  date: CalendarDate;
  start: Time;
  end: Time;
  location: string;
  guests: string[];
}

const calendarOptions = calendars
  .filter((calendar) => calendar.id !== "time-off")
  .map((calendar) => ({ id: calendar.id, name: calendar.name }));

const guestOptions = people.map((name) => ({ id: name, name }));

export function EventEditor({
  draft,
  isOpen,
  onOpenChange,
  onSave,
}: {
  draft: EventDraft;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (draft: EventDraft) => void;
}) {
  const [title, setTitle] = useState(draft.title);
  const [calendar, setCalendar] = useState<CalendarId>(draft.calendar);
  const [date, setDate] = useState(draft.date);
  const [start, setStart] = useState(draft.start);
  const [end, setEnd] = useState(draft.end);
  const [location, setLocation] = useState(draft.location);
  const [guests, setGuests] = useState<(string | number)[]>(draft.guests);
  const isNew = draft.id === undefined;

  return (
    <DialogContent size="md" overlayProps={{ isOpen, onOpenChange }}>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          onSave({
            id: draft.id,
            title: title.trim(),
            calendar,
            date,
            start,
            end,
            location: location.trim(),
            guests: guests.map(String),
          });
        }}
      >
        <DialogHeader>
          <DialogTitle>{isNew ? "New event" : "Edit event"}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="grid grid-cols-1 gap-4">
          <TextField
            label="Title"
            placeholder="Add a title"
            value={title}
            onChange={setTitle}
            isRequired
            autoFocus
            validate={(value) =>
              value.trim() ? null : "Enter a title for the event."
            }
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={(value) => {
              if (value) setDate(value);
            }}
            isRequired
          />
          <div className="grid grid-cols-2 gap-4">
            <TimeField
              label="Start"
              value={start}
              onChange={(value) => {
                if (value) setStart(value);
              }}
              isRequired
            />
            <TimeField
              label="End"
              value={end}
              onChange={(value) => {
                if (value) setEnd(value);
              }}
              isRequired
              validate={(value) =>
                value && value.compare(start) <= 0
                  ? "Set an end time after the start time."
                  : null
              }
            />
          </div>
          <Select
            label="Calendar"
            options={calendarOptions}
            value={calendar}
            onChange={(key) => setCalendar(key as CalendarId)}
          />
          <TextField
            label="Location"
            placeholder="Room or video call"
            value={location}
            onChange={setLocation}
          />
          <ComboBox
            selectionMode="multiple"
            label="Guests"
            placeholder="Add people"
            options={guestOptions}
            value={guests}
            onChange={setGuests}
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button type="submit">{isNew ? "Add event" : "Save changes"}</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
