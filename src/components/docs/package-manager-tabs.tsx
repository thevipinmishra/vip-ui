"use client";

import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useId, useSyncExternalStore } from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
} from "react-aria-components";
import { withItemHighlight } from "@/components/ui/item-highlight";
import { springLayout, transitionFor } from "@/lib/motion";
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
  const reduceMotion = useReducedMotion();
  const groupId = useId();

  return (
    <LayoutGroup id={groupId}>
      <AriaTabs
        selectedKey={selected}
        onSelectionChange={(key) => selectManager(key as PackageManager)}
        className="min-w-0"
      >
        <CodeFrame
          code={commands[selected]}
          filename=""
          codeLabel={`${selected} command`}
          header={
            <AriaTabList
              aria-label="Package manager"
              className="relative isolate inline-flex min-w-0 items-center gap-0.5"
              render={withItemHighlight(undefined, {
                placement: "under",
                items: "[role=tab]",
                className: "bg-highlight",
              })}
            >
              {managers.map((manager) => (
                <AriaTab
                  key={manager}
                  id={manager}
                  className="relative isolate inline-flex h-7 min-w-0 cursor-pointer items-center justify-center rounded-md px-2.5 font-mono text-[11px] text-muted-foreground outline-none transition-[color,scale] duration-150 ease-out-quint hover:text-foreground selected:text-foreground motion-safe:pressed:scale-[0.96] focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring"
                >
                  {({ isSelected }) => (
                    <>
                      {isSelected && (
                        <motion.span
                          layoutId="package-manager-selection"
                          initial={false}
                          aria-hidden="true"
                          transition={transitionFor(reduceMotion, springLayout)}
                          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70 forced-colors:border forced-colors:border-[Highlight]"
                        />
                      )}
                      {manager}
                    </>
                  )}
                </AriaTab>
              ))}
            </AriaTabList>
          }
        >
          {managers.map((manager, index) => (
            <AriaTabPanel
              key={manager}
              id={manager}
              className="docs-tab-panel min-w-0 outline-none"
            >
              {children[index]}
            </AriaTabPanel>
          ))}
        </CodeFrame>
      </AriaTabs>
    </LayoutGroup>
  );
}
