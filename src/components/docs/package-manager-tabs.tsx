"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { TerminalSquare } from "reicon-react";
import { CodeFrame } from "./code-frame";
import { PackageManagerIcon } from "./package-manager-icon";

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
  } catch {
    // Storage may be unavailable in private or restricted contexts.
  }
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
  } catch {
    // Keep the current page usable when storage is blocked.
  }
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
        language="bash"
        codeLabel={`${selected} command`}
        header={
          <div className="flex min-w-0 items-center gap-4">
            <TerminalSquare size={15} aria-hidden="true" className="shrink-0" />
            <TabList
              aria-label="Package manager"
              className="flex min-w-0 items-center gap-0.5 overflow-x-auto"
            >
              {managers.map((manager) => (
                <Tab
                  key={manager}
                  id={manager}
                  className="inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-muted-foreground outline-none hover:bg-card/70 selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)] selected:ring-1 selected:ring-border/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <PackageManagerIcon manager={manager} className="size-3.5" />
                  {manager}
                </Tab>
              ))}
            </TabList>
          </div>
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
