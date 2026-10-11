"use client";

import {
  CaretUpDownIcon,
  FolderSimpleIcon,
  GearSixIcon,
  LockSimpleIcon,
  SignOutIcon,
  SparkleIcon,
  SquaresFourIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { showToast } from "@/components/ui/toast";
import { AssistantScreen } from "./assistant-screen";
import { OverviewScreen } from "./overview-screen";
import { Part } from "./part";
import { ProjectsScreen } from "./projects-screen";
import { SettingsScreen } from "./settings-screen";

const screens = [
  {
    id: "overview",
    label: "Overview",
    icon: SquaresFourIcon,
    View: OverviewScreen,
  },
  {
    id: "assistant",
    label: "Assistant",
    icon: SparkleIcon,
    View: AssistantScreen,
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderSimpleIcon,
    View: ProjectsScreen,
  },
  {
    id: "settings",
    label: "Settings",
    icon: GearSixIcon,
    View: SettingsScreen,
  },
] as const;

type ScreenId = (typeof screens)[number]["id"];

const workspaces = [
  { id: "acme", name: "Acme Inc" },
  { id: "globex", name: "Globex" },
  { id: "initech", name: "Initech" },
];

export function HomeWindow() {
  const [screen, setScreen] = useState<ScreenId>("overview");
  const [inspect, setInspect] = useState(false);
  const [count, setCount] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parts = root.current?.querySelectorAll<HTMLElement>(
      `[data-chrome] [data-part], [data-screen="${screen}"] [data-part]`,
    );
    setCount(
      new Set(Array.from(parts ?? [], (part) => part.dataset.part)).size,
    );
  }, [screen]);

  return (
    <div
      ref={root}
      data-inspect={inspect ? "" : undefined}
      className="group/screens overflow-hidden rounded-2xl bg-card text-card-foreground shadow-[var(--shadow-float)] ring-1 ring-border/80"
    >
      <div className="flex min-h-13 items-center gap-3 border-b border-border/70 px-4">
        <div aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <div
          aria-hidden="true"
          className="mx-auto hidden min-h-7 w-full max-w-xs items-center justify-center gap-1.5 rounded-md bg-muted px-3 text-xs text-muted-foreground sm:flex"
        >
          <LockSimpleIcon size={12} weight="bold" />
          acme.app/{screen}
        </div>
        <div className="ms-auto flex shrink-0 items-center gap-3 sm:ms-0">
          <span
            aria-live="polite"
            className="hidden text-xs tabular-nums text-muted-foreground md:inline"
          >
            {inspect ? `${count} components` : ""}
          </span>
          <Switch
            isSelected={inspect}
            onChange={setInspect}
            className="min-h-9 gap-2.5 font-medium"
          >
            Show components
          </Switch>
        </div>
      </div>
      <Tabs
        orientation="vertical"
        selectedKey={screen}
        onSelectionChange={(key) => setScreen(key as ScreenId)}
        className="lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)]"
      >
        <div
          data-chrome
          className="flex min-w-0 flex-col gap-4 border-b border-border/70 bg-muted/40 p-2 lg:border-e lg:border-b-0 lg:p-3"
        >
          <Part slug="select" className="hidden lg:block">
            <Select
              aria-label="Workspace"
              defaultValue="acme"
              options={workspaces}
            />
          </Part>
          <Part slug="tabs">
            <TabList
              aria-label="Screens"
              className="flex w-full gap-1 rounded-none bg-transparent p-0 shadow-none ring-0 lg:flex-col lg:items-stretch lg:overflow-visible"
            >
              {screens.map((item) => (
                <Tab
                  key={item.id}
                  id={item.id}
                  className="justify-start gap-2.5 px-2.5 sm:px-3 lg:min-h-10"
                >
                  <item.icon
                    size={16}
                    aria-hidden="true"
                    className="max-sm:hidden"
                  />
                  {item.label}
                </Tab>
              ))}
            </TabList>
          </Part>
          <Part slug="menu" className="mt-auto hidden lg:block">
            <MenuTrigger>
              <Button
                variant="ghost"
                className="h-auto w-full justify-start gap-2.5 px-2 py-1.5 text-start"
              >
                <Avatar name="Maya Chen" className="size-8 text-xs" />
                <span className="grid min-w-0 flex-1 leading-tight">
                  <span className="truncate text-sm font-medium">
                    Maya Chen
                  </span>
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    maya@acme.app
                  </span>
                </span>
                <CaretUpDownIcon
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground"
                />
              </Button>
              <MenuPopover placement="top start">
                <MenuContent aria-label="Account">
                  <MenuItem onAction={() => setScreen("settings")}>
                    <UserCircleIcon size={16} aria-hidden="true" />
                    Profile
                  </MenuItem>
                  <MenuItem onAction={() => setScreen("settings")}>
                    <GearSixIcon size={16} aria-hidden="true" />
                    Settings
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem
                    onAction={() =>
                      showToast({
                        title: "Signed out",
                        description: "This is a preview. No data changed.",
                      })
                    }
                  >
                    <SignOutIcon size={16} aria-hidden="true" />
                    Sign out
                  </MenuItem>
                </MenuContent>
              </MenuPopover>
            </MenuTrigger>
          </Part>
        </div>
        <div className="min-w-0 bg-background lg:min-h-[54.5rem]">
          {screens.map(({ id, View }) => (
            <TabPanel
              key={id}
              id={id}
              data-screen={id}
              shouldForceMount
              className="mt-0 rounded-none bg-transparent p-0 shadow-none ring-0 data-inert:hidden"
            >
              <View />
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
