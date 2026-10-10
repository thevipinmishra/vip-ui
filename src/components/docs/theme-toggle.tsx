"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { updateSiteTheme } from "@/lib/update-site-theme";

const storageKey = "vip-ui-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    setAnimateIcon(event.detail > 0);
    const next = !isDark;
    updateSiteTheme((root) => root.classList.toggle("dark", next));
    try {
      window.localStorage.setItem(storageKey, next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 36 }}
    >
      <span
        className="relative grid size-5 place-items-center"
        aria-hidden="true"
      >
        <motion.span
          className="col-start-1 row-start-1"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.9,
            rotate: isDark ? 0 : -12,
          }}
          transition={{
            duration: reduceMotion || !animateIcon ? 0 : 0.16,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <SunIcon size={17} />
        </motion.span>
        <motion.span
          className="col-start-1 row-start-1"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.9 : 1,
            rotate: isDark ? 12 : 0,
          }}
          transition={{
            duration: reduceMotion || !animateIcon ? 0 : 0.16,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <MoonIcon size={17} />
        </motion.span>
      </span>
    </motion.button>
  );
}
