"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "reicon-react";
import { Button } from "../../../components/vip-ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(
    () => setIsDark(document.documentElement.classList.contains("dark")),
    [],
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onPress={() => {
        const next = !isDark;
        document.documentElement.classList.toggle("dark", next);
        try {
          localStorage.setItem("vip-ui-theme", next ? "dark" : "light");
        } catch {
          /* Browsing without storage still works. */
        }
        setIsDark(next);
      }}
    >
      {isDark ? (
        <Sun size={17} aria-hidden="true" />
      ) : (
        <Moon size={17} aria-hidden="true" />
      )}
    </Button>
  );
}
