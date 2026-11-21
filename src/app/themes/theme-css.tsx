"use client";

import { createContext, use } from "react";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import {
  defaultRadius,
  findTheme,
  type RingStyle,
  themeCss,
  withRing,
} from "./themes";

export const TweaksContext = createContext<{
  radius: string;
  ring: RingStyle;
}>({ radius: defaultRadius, ring: "accent" });

export function ThemeCssCode({ slug }: { slug: string }) {
  const { radius, ring } = use(TweaksContext);
  const theme = findTheme(slug);
  if (!theme) return null;
  const css = themeCss(withRing(theme, ring), radius);
  return (
    <CodeFrame
      code={css}
      filename="globals.css"
      copyText="Copy CSS"
      previewCode
    >
      <CodeSnippet code={css} language="css" />
    </CodeFrame>
  );
}
