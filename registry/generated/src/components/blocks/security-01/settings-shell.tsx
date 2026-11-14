"use client";

import {
  KeyIcon,
  PaletteIcon,
  PlugsConnectedIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { cn } from "../../vip-ui/utils";

const groups = [
  {
    title: "Account",
    items: [
      {
        id: "security",
        label: "Security",
        href: "/blocks/security-01",
        icon: ShieldCheckIcon,
      },
      {
        id: "appearance",
        label: "Appearance",
        href: "/blocks/appearance-01",
        icon: PaletteIcon,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        id: "api-keys",
        label: "API keys",
        href: "/blocks/api-keys-01",
        icon: KeyIcon,
      },
      {
        id: "integrations",
        label: "Integrations",
        href: "/blocks/integrations-01",
        icon: PlugsConnectedIcon,
      },
    ],
  },
];

const items = groups.flatMap((group) => group.items);

export type SettingsSection =
  | "security"
  | "appearance"
  | "api-keys"
  | "integrations";

interface SettingsShellProps {
  current: SettingsSection;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function SettingsShell({
  current,
  title,
  description,
  actions,
  children,
}: SettingsShellProps) {
  return (
    <div className="min-h-svh bg-muted/30">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-6 lg:px-8">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-(--shadow-card)"
          >
            K
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Kestrel</p>
            <p className="truncate text-xs text-muted-foreground">Settings</p>
          </div>
          <div className="ms-auto flex min-w-0 items-center gap-3">
            <Badge variant="outline" className="max-sm:hidden">
              Pro plan
            </Badge>
            <div className="hidden min-w-0 text-end sm:block">
              <p className="truncate text-sm font-medium leading-5">
                Nadia Okafor
              </p>
              <p className="truncate text-xs leading-4 text-muted-foreground">
                Workspace admin
              </p>
            </div>
            <Avatar name="Nadia Okafor" />
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-6 md:py-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-10 lg:px-8">
        <aside className="min-w-0 lg:sticky lg:top-22">
          <nav aria-label="Settings">
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:hidden">
              {items.map((item) => (
                <SettingsLink
                  key={item.id}
                  item={item}
                  active={item.id === current}
                  pill
                />
              ))}
            </div>
            <div className="hidden lg:grid lg:gap-6">
              {groups.map((group) => (
                <div key={group.title} className="min-w-0">
                  <p className="px-2.5 pb-1.5 text-[11px] font-semibold tracking-[0.09em] text-muted-foreground uppercase">
                    {group.title}
                  </p>
                  <ul className="grid gap-0.5">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <SettingsLink
                          item={item}
                          active={item.id === current}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
          <div className="mt-7 hidden rounded-xl bg-card p-3.5 shadow-(--shadow-card) ring-1 ring-border/70 lg:block">
            <p className="text-xs font-medium text-muted-foreground">
              Workspace
            </p>
            <p className="mt-2 truncate text-sm font-semibold">
              Kestrel Insights
            </p>
            <p className="truncate text-xs text-muted-foreground">
              12 members · 3 environments
            </p>
          </div>
        </aside>
        <main className="min-w-0">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                {title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
            {actions}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function SettingsLink({
  item,
  active,
  pill = false,
}: {
  item: (typeof items)[number];
  active: boolean;
  pill?: boolean;
}) {
  return (
    <a
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-10 min-w-0 items-center gap-2.5 rounded-lg px-3 text-sm font-medium outline-offset-2 outline-transparent transition-[color,background-color] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-ring",
        pill
          ? "shrink-0 border border-border bg-card shadow-[var(--shadow-card)]"
          : "w-full",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
      )}
    >
      <item.icon
        size={17}
        weight={active ? "fill" : "regular"}
        aria-hidden="true"
      />
      <span className="truncate">{item.label}</span>
    </a>
  );
}
