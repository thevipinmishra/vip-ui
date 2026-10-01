"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Moon, Sun } from "reicon-react";
import { updateSiteTheme } from "@/lib/update-site-theme";

const storageKey = "vip-ui-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    updateSiteTheme((root) => root.classList.toggle("dark", next));
    try {
      window.localStorage.setItem(storageKey, next ? "dark" : "light");
    } catch {
      // Private browsing may block storage; the current appearance still works.
    }
    setIsDark(next);
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    >
      {isDark ? (
        <Sun size={17} aria-hidden="true" />
      ) : (
        <Moon size={17} aria-hidden="true" />
      )}
    </motion.button>
  );
}
