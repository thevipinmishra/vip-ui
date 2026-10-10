"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const notifications = [
  { id: "review", text: "Amina Shah asked you to review the homepage." },
  { id: "comment", text: "Leo Park commented on the pricing draft." },
  { id: "upload", text: "Maya Chen added four images." },
];

export function CardActionDemo() {
  const [isRead, setRead] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          {isRead ? "No unread messages" : "3 unread messages"}
        </CardDescription>
        <CardAction>
          <Button
            variant="secondary"
            size="sm"
            isDisabled={isRead}
            onPress={() => setRead(true)}
          >
            Mark as read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex gap-3 text-sm leading-6">
              <span
                aria-hidden="true"
                className={
                  isRead
                    ? "mt-2.5 size-1.5 shrink-0 rounded-full bg-border"
                    : "mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                }
              />
              {notification.text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
