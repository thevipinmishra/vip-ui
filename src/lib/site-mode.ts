"use client";

import { useSyncExternalStore } from "react";

export type SiteMode = "light" | "dark";

const storageKey = "vip-ui-theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function currentSiteMode(): SiteMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useSiteMode() {
  return useSyncExternalStore(
    subscribe,
    currentSiteMode,
    (): SiteMode => "light",
  );
}

export function applySiteMode(mode: SiteMode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  try {
    window.localStorage.setItem(storageKey, mode);
  } catch {}
}
