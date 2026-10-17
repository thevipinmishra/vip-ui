"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

type InstallMethod = "cli" | "manual";

const methods: InstallMethod[] = ["cli", "manual"];
const storageKey = "vip-ui-install-method";
const changeEvent = "vip-ui-install-method-change";
let fallbackMethod: InstallMethod | undefined;

function getMethod(): InstallMethod | undefined {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (methods.some((method) => method === saved)) {
      return saved as InstallMethod;
    }
  } catch {}
  return fallbackMethod;
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

function selectMethod(method: InstallMethod) {
  fallbackMethod = method;
  try {
    window.localStorage.setItem(storageKey, method);
  } catch {}
  window.dispatchEvent(new Event(changeEvent));
}

export function InstallTabs({
  cli,
  custom,
  cliAvailable,
}: {
  cli: ReactNode;
  custom: ReactNode;
  cliAvailable: boolean;
}) {
  const pageDefault: InstallMethod = cliAvailable ? "cli" : "manual";
  const selected = useSyncExternalStore(
    subscribe,
    () => getMethod() ?? pageDefault,
    () => pageDefault,
  );

  return (
    <Tabs
      value={selected}
      onValueChange={(value) => selectMethod(value as InstallMethod)}
    >
      <TabList aria-label="Installation method">
        <Tab id="cli">CLI</Tab>
        <Tab id="manual">Manual</Tab>
      </TabList>
      <TabPanel
        id="cli"
        className="docs-tab-panel mt-5 min-w-0 rounded-none bg-transparent p-0 shadow-none ring-0"
      >
        {cli}
      </TabPanel>
      <TabPanel
        id="manual"
        className="docs-tab-panel mt-5 min-w-0 rounded-none bg-transparent p-0 shadow-none ring-0"
      >
        {custom}
      </TabPanel>
    </Tabs>
  );
}
