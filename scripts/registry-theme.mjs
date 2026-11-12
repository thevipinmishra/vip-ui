export const themeVars = {
  light: {
    success: "oklch(0.43 0.12 155)",
    "success-subtle": "oklch(0.955 0.035 155)",
    "success-foreground": "oklch(0.32 0.09 155)",
    warning: "oklch(0.54 0.13 75)",
    "warning-subtle": "oklch(0.965 0.045 85)",
    "warning-foreground": "oklch(0.36 0.09 75)",
    highlight: "color-mix(in oklab, var(--foreground) 6%, transparent)",
    "chart-6": "oklch(0.43 0.12 280)",
    "shadow-card":
      "0 1px 2px -1px oklch(0 0 0 / 0.08), 0 3px 8px -4px oklch(0 0 0 / 0.07)",
    "shadow-float":
      "0 2px 4px -2px oklch(0 0 0 / 0.1), 0 8px 18px -9px oklch(0 0 0 / 0.11)",
    "shadow-inset": "inset 0 1px 2px oklch(0 0 0 / 0.045)",
  },
  dark: {
    success: "oklch(0.74 0.13 155)",
    "success-subtle": "oklch(0.24 0.045 155)",
    "success-foreground": "oklch(0.86 0.085 155)",
    warning: "oklch(0.78 0.11 75)",
    "warning-subtle": "oklch(0.27 0.045 75)",
    "warning-foreground": "oklch(0.89 0.07 75)",
    highlight: "color-mix(in oklab, var(--foreground) 6%, transparent)",
    "chart-6": "oklch(0.66 0.12 280)",
    "shadow-card":
      "0 1px 2px -1px oklch(0 0 0 / 0.24), 0 3px 8px -4px oklch(0 0 0 / 0.25)",
    "shadow-float":
      "0 2px 4px -2px oklch(0 0 0 / 0.3), 0 8px 18px -9px oklch(0 0 0 / 0.34)",
    "shadow-inset": "inset 0 1px 2px oklch(0 0 0 / 0.15)",
  },
};

export const themeTokens = {
  "ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
  "ease-spring":
    "linear(0, 0.1251, 0.3554, 0.5737, 0.7411, 0.8551, 0.9259, 0.9666, 0.988, 0.9981, 1.002, 1)",
};

export const themeAnimations = {
  caret: {
    value: "caret-breathe 1.1s ease-in-out infinite",
    keyframes: {
      "caret-breathe": {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.25" },
      },
    },
  },
  skeleton: {
    value: "skeleton-sweep 1.6s linear infinite",
    keyframes: {
      "skeleton-sweep": {
        from: { transform: "translateX(-100%)" },
        to: { transform: "translateX(100%)" },
      },
    },
  },
  "progress-indeterminate": {
    value: "progress-sweep 1.6s linear infinite",
    keyframes: {
      "progress-sweep": {
        from: { transform: "translateX(-100%)" },
        to: { transform: "translateX(300%)" },
      },
    },
  },
  "agent-status": {
    value: "agent-status-pulse 1.1s cubic-bezier(0.77, 0, 0.175, 1) infinite",
    keyframes: {
      "agent-status-pulse": {
        "0%, 100%": { opacity: "0.35", transform: "translateY(0px)" },
        "50%": { opacity: "1", transform: "translateY(-2px)" },
      },
    },
  },
  "border-beam": {
    value: "border-beam-spin 6s linear infinite",
    keyframes: {
      "border-beam-spin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
  "text-shimmer": {
    value:
      "text-shimmer-sweep var(--text-shimmer-duration, 2.1333s) ease-in-out infinite",
    keyframes: {
      "text-shimmer-sweep": {
        "0%": { transform: "translateX(var(--shimmer-from, -65%))" },
        "75%": { transform: "translateX(var(--shimmer-to, 65%))" },
        "100%": { transform: "translateX(var(--shimmer-to, 65%))" },
      },
    },
  },
  "scroll-edges": {
    keyframes: {
      "vip-edge-start": {
        from: { "border-top-color": "transparent" },
        to: { "border-top-color": "var(--color-border)" },
      },
      "vip-edge-end": {
        from: { "border-bottom-color": "var(--color-border)" },
        to: { "border-bottom-color": "transparent" },
      },
    },
  },
  sheet: {
    keyframes: {
      "vip-sheet-backdrop": {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
      "vip-sheet-stack": {
        from: { transform: "translate(0px, 0px) scale(1)" },
        to: {
          transform:
            "translate(var(--sheet-stack-x, 0px), var(--sheet-stack-y, 0px)) scale(var(--sheet-stack-scale, 0.94))",
        },
      },
    },
  },
};

export const themeRules = {
  "theme-switching": {
    ".theme-switching *, .theme-switching *::before, .theme-switching *::after":
      { transition: "none !important" },
  },
  "data-sheet-unsnapped": {
    "[data-sheet-scroll][data-sheet-unsnapped]": {
      "scroll-snap-type": "none !important",
    },
  },
};

export const reactAriaPlugin = "tailwindcss-react-aria-components";

const word = (name) => new RegExp(`(?<![\\w-])${name}(?![\\w-])`);

export function referencedRules(content) {
  return Object.keys(themeRules).filter((name) =>
    new RegExp(`(?<=["'\`\\s])${name}(?=["'\`\\s])`).test(content),
  );
}

export function referencedAnimations(content) {
  return Object.keys(themeAnimations).filter((name) => {
    const { value, keyframes } = themeAnimations[name];
    return (
      (value !== undefined && word(`(?:--)?animate-${name}`).test(content)) ||
      Object.keys(keyframes).some((keyframe) => word(keyframe).test(content))
    );
  });
}

export function referencedVars(content) {
  const used = Object.keys(themeVars.light).filter((name) =>
    new RegExp(`(?:--|[a-z]-)${name}(?![\\w-])`).test(content),
  );
  const tokens = Object.keys(themeTokens).filter((name) =>
    word(`(?:--)?${name}`).test(content),
  );
  const animations = referencedAnimations(content);
  const rules = referencedRules(content);
  if (!used.length && !tokens.length && !animations.length && !rules.length)
    return undefined;
  return {
    theme: Object.fromEntries([
      ...tokens.map((name) => [name, themeTokens[name]]),
      ...animations
        .filter((name) => themeAnimations[name].value !== undefined)
        .map((name) => [`animate-${name}`, themeAnimations[name].value]),
    ]),
    light: Object.fromEntries(
      used.map((name) => [name, themeVars.light[name]]),
    ),
    dark: Object.fromEntries(used.map((name) => [name, themeVars.dark[name]])),
    css: Object.fromEntries([
      ...animations.flatMap((name) =>
        Object.entries(themeAnimations[name].keyframes).map(
          ([keyframe, steps]) => [`@keyframes ${keyframe}`, steps],
        ),
      ),
      ...rules.flatMap((name) => Object.entries(themeRules[name])),
    ]),
  };
}

function keyframesCss(name, steps, indent = "  ") {
  return `${indent}@keyframes ${name} {\n${Object.entries(steps)
    .map(
      ([selector, declarations]) =>
        `${indent}  ${selector} {\n${Object.entries(declarations)
          .map(([property, value]) => `${indent}    ${property}: ${value};`)
          .join("\n")}\n${indent}  }`,
    )
    .join("\n")}\n${indent}}`;
}

export function setupCss() {
  const block = (selector, vars) =>
    `${selector} {\n${Object.entries(vars)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n")}\n}`;
  const colors = Object.keys(themeVars.light).filter(
    (name) => !name.startsWith("shadow-"),
  );
  const theme = [
    ...colors.map((name) => `  --color-${name}: var(--${name});`),
    ...Object.entries(themeTokens).map(
      ([name, value]) => `  --${name}: ${value};`,
    ),
    ...Object.entries(themeAnimations)
      .filter(([, animation]) => animation.value !== undefined)
      .flatMap(([name, animation]) => [
        `  --animate-${name}: ${animation.value};`,
        ...Object.entries(animation.keyframes).map(([keyframe, steps]) =>
          keyframesCss(keyframe, steps),
        ),
      ]),
  ];
  const named = Object.values(themeAnimations)
    .filter((animation) => animation.value === undefined)
    .flatMap((animation) =>
      Object.entries(animation.keyframes).map(([keyframe, steps]) =>
        keyframesCss(keyframe, steps, ""),
      ),
    );
  const rules = Object.entries(themeRules["data-sheet-unsnapped"]).map(
    ([selector, declarations]) =>
      `${selector} {\n${Object.entries(declarations)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join("\n")}\n}`,
  );
  return `@plugin "${reactAriaPlugin}";

${block(":root", themeVars.light)}

${block(".dark", themeVars.dark)}

@theme inline {
${theme.join("\n")}
}

${[...named, ...rules].join("\n\n")}
`;
}
