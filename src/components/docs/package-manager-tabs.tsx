"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { CodeFrame } from "./code-frame";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

const managers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];
const storageKey = "vip-ui-package-manager";
const changeEvent = "vip-ui-package-manager-change";
let fallbackManager: PackageManager = "pnpm";

function getManager(): PackageManager {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (managers.some((manager) => manager === saved)) {
      return saved as PackageManager;
    }
  } catch {}
  return fallbackManager;
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, callback);
  };
}

function selectManager(manager: PackageManager) {
  fallbackManager = manager;
  try {
    window.localStorage.setItem(storageKey, manager);
  } catch {}
  window.dispatchEvent(new Event(changeEvent));
}

export function PackageManagerTabs({
  commands,
  children,
}: {
  commands: Record<PackageManager, string>;
  children: ReactNode[];
}) {
  const selected = useSyncExternalStore(
    subscribe,
    getManager,
    (): PackageManager => "pnpm",
  );

  return (
    <Tabs
      selectedKey={selected}
      onSelectionChange={(key) => selectManager(key as PackageManager)}
      className="min-w-0"
    >
      <CodeFrame
        code={commands[selected]}
        filename=""
        codeLabel={`${selected} command`}
        header={
          <TabList
            aria-label="Package manager"
            className="flex min-w-0 flex-1 items-center gap-0.5"
          >
            {managers.map((manager) => (
              <Tab
                key={manager}
                id={manager}
                className="inline-flex h-8 min-w-0 cursor-pointer items-center justify-center rounded-md px-2 font-mono text-[11px] text-muted-foreground outline-none hover:text-foreground selected:bg-foreground/8 selected:font-medium selected:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {manager}
              </Tab>
            ))}
          </TabList>
        }
      >
        {managers.map((manager, index) => (
          <TabPanel
            key={manager}
            id={manager}
            className="docs-tab-panel min-w-0 outline-none"
          >
            {children[index]}
          </TabPanel>
        ))}
      </CodeFrame>
    </Tabs>
  );
}
