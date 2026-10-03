"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useId, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { Code, Eye } from "reicon-react";
import { CodeFrame } from "./code-frame";

export function PreviewTabs({
  code,
  filename,
  preview,
  source,
}: {
  code: string;
  filename: string;
  preview: ReactNode;
  source: ReactNode;
}) {
  const [selectedKey, setSelectedKey] = useState("preview");
  const tabBackgroundId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <Tabs
      data-slot="component-preview"
      selectedKey={selectedKey}
      onSelectionChange={(key) => setSelectedKey(String(key))}
      className="min-w-0 overflow-hidden rounded-xl bg-card text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70"
    >
      <div className="flex min-h-16 items-center border-b border-border/70 px-3 sm:px-5">
        <TabList
          aria-label="Example view"
          className="inline-flex items-center gap-1 rounded-lg bg-muted/70 p-1 ring-1 ring-border/60"
        >
          <Tab
            id="preview"
            className="relative isolate inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-3.5 text-[13px] font-medium text-muted-foreground outline-none hover:bg-card/70 selected:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            {selectedKey === "preview" && (
              <motion.span
                layoutId={tabBackgroundId}
                className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", duration: 0.3, bounce: 0 }
                }
              />
            )}
            <Eye size={15} aria-hidden="true" /> Preview
          </Tab>
          <Tab
            id="code"
            className="relative isolate inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-3.5 text-[13px] font-medium text-muted-foreground outline-none hover:bg-card/70 selected:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            {selectedKey === "code" && (
              <motion.span
                layoutId={tabBackgroundId}
                className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", duration: 0.3, bounce: 0 }
                }
              />
            )}
            <Code size={15} aria-hidden="true" /> Code
          </Tab>
        </TabList>
      </div>
      <TabPanel id="preview" className="docs-tab-panel outline-none">
        <div className="relative flex min-h-72 items-center justify-center px-5 py-10 sm:px-10">
          <div className="relative z-10 flex w-full justify-center">
            {preview}
          </div>
        </div>
      </TabPanel>
      <TabPanel id="code" className="docs-tab-panel min-w-0 outline-none">
        <CodeFrame
          code={code}
          filename={filename}
          language="tsx"
          expandable
          embedded
        >
          {source}
        </CodeFrame>
      </TabPanel>
    </Tabs>
  );
}
