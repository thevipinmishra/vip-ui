"use client";

import { useLayoutEffect } from "react";
import { updateSiteTheme } from "@/lib/update-site-theme";

const storageKey = "vip-ui-theme";

function storedTheme() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

export function SiteThemeSync() {
  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = () => {
      const theme = storedTheme();
      return theme ? theme === "dark" : media.matches;
    };
    const root = document.documentElement;
    root.classList.toggle("dark", isDark());

    const sync = () => {
      const dark = isDark();
      if (root.classList.contains("dark") === dark) return;
      updateSiteTheme((target) => target.classList.toggle("dark", dark));
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === storageKey) sync();
    };
    media.addEventListener("change", sync);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
