"use client";

import {
  CopyIcon,
  DesktopIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  DotsThreeIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { useRef } from "react";
import { AnimatedNumber } from "../../vip-ui/animated-number";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../vip-ui/menu";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "../../vip-ui/table";
import { showToast } from "../../vip-ui/toast";

export interface Session {
  id: string;
  device: string;
  browser: string;
  kind: "computer" | "phone" | "tablet";
  location: string;
  ip: string;
  lastActive: string | null;
  current?: boolean;
  isNew?: boolean;
}

export const initialSessions: Session[] = [
  {
    id: "macbook",
    device: "MacBook Pro",
    browser: "Chrome 141 on macOS 15",
    kind: "computer",
    location: "Berlin, Germany",
    ip: "85.214.62.18",
    lastActive: null,
    current: true,
  },
  {
    id: "iphone",
    device: "iPhone 15",
    browser: "Safari on iOS 26",
    kind: "phone",
    location: "Berlin, Germany",
    ip: "85.214.62.40",
    lastActive: "2026-11-03T08:12:00Z",
  },
  {
    id: "dell",
    device: "Dell XPS 15",
    browser: "Edge 142 on Windows 11",
    kind: "computer",
    location: "Lagos, Nigeria",
    ip: "197.210.53.7",
    lastActive: "2026-10-30T21:08:00Z",
    isNew: true,
  },
  {
    id: "ipad",
    device: "iPad Air",
    browser: "Safari on iPadOS 26",
    kind: "tablet",
    location: "Lisbon, Portugal",
    ip: "89.152.18.204",
    lastActive: "2026-09-28T16:20:00Z",
  },
];

const sessionTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

const deviceIcons = {
  computer: DesktopIcon,
  phone: DeviceMobileIcon,
  tablet: DeviceTabletIcon,
};

export function SessionsCard({
  sessions,
  onChange,
}: {
  sessions: Session[];
  onChange: (sessions: Session[]) => void;
}) {
  const headingRef = useRef<HTMLSpanElement>(null);
  const others = sessions.filter((session) => !session.current);

  function signOut(removed: Session[]) {
    const snapshot = sessions;
    onChange(sessions.filter((session) => !removed.includes(session)));
    showToast({
      title:
        removed.length === 1
          ? `${removed[0].device} is signed out`
          : `${removed.length} sessions are signed out`,
      action: { label: "Undo", onAction: () => onChange(snapshot) },
    });
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function copyIp(session: Session) {
    try {
      await navigator.clipboard.writeText(session.ip);
      showToast({ title: "IP address copied" });
    } catch {
      showToast({
        title: "Copy failed",
        description: "Select the address in the table.",
        variant: "error",
      });
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle as="h2">
          <span ref={headingRef} tabIndex={-1} className="outline-none">
            Sessions
          </span>
        </CardTitle>
        <CardDescription>
          <AnimatedNumber value={sessions.length} variant="slide" />{" "}
          {sessions.length === 1 ? "device is" : "devices are"} signed in to
          your account.
        </CardDescription>
        <CardAction>
          <Button
            size="sm"
            variant="outline"
            isDisabled={others.length === 0}
            onPress={() => signOut(others)}
          >
            <SignOutIcon aria-hidden="true" />
            Sign out others
          </Button>
        </CardAction>
      </CardHeader>
      <TableContainer className="rounded-none border-x-0 border-b-0 shadow-none">
        <Table aria-label="Sessions" className="min-w-[44rem] [width:100%]!">
          <TableHeader>
            <Column isRowHeader width={280}>
              Device
            </Column>
            <Column width={220}>Location</Column>
            <Column width={150}>Last active</Column>
            <Column width={130}>IP address</Column>
            <Column width={56}>
              <span className="sr-only">Actions</span>
            </Column>
          </TableHeader>
          <TableBody items={sessions}>
            {(session) => {
              const DeviceIcon = deviceIcons[session.kind];
              return (
                <Row id={session.id}>
                  <Cell>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border/60"
                      >
                        <DeviceIcon size={18} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="min-w-0 truncate font-medium">
                            {session.device}
                          </span>
                          {session.current && (
                            <Badge variant="accent">This device</Badge>
                          )}
                        </div>
                        <span className="block truncate text-xs text-muted-foreground">
                          {session.browser}
                        </span>
                      </div>
                    </div>
                  </Cell>
                  <Cell>
                    <div className="flex flex-wrap items-center gap-2">
                      <span>{session.location}</span>
                      {session.isNew && (
                        <Badge variant="warning">New location</Badge>
                      )}
                    </div>
                  </Cell>
                  <Cell className="tabular-nums text-muted-foreground">
                    {session.lastActive ? (
                      <time dateTime={session.lastActive}>
                        {sessionTime.format(new Date(session.lastActive))}
                      </time>
                    ) : (
                      <span className="flex items-center gap-1.5 text-foreground">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-success"
                        />
                        Active now
                      </span>
                    )}
                  </Cell>
                  <Cell className="font-mono text-xs text-muted-foreground">
                    {session.ip}
                  </Cell>
                  <Cell className="text-end">
                    {!session.current && (
                      <MenuTrigger>
                        <Button
                          variant="ghost"
                          iconOnly
                          size="sm"
                          aria-label={`Actions for ${session.device}`}
                        >
                          <DotsThreeIcon weight="bold" aria-hidden="true" />
                        </Button>
                        <MenuPopover placement="bottom end">
                          <MenuContent
                            aria-label={`Actions for ${session.device}`}
                          >
                            <MenuItem onAction={() => void copyIp(session)}>
                              <CopyIcon size={16} aria-hidden="true" />
                              Copy IP address
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem
                              variant="destructive"
                              onAction={() => signOut([session])}
                            >
                              <SignOutIcon size={16} aria-hidden="true" />
                              Sign out
                            </MenuItem>
                          </MenuContent>
                        </MenuPopover>
                      </MenuTrigger>
                    )}
                  </Cell>
                </Row>
              );
            }}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
