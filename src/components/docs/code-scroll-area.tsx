"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as scrollArea from "@zag-js/scroll-area";
import { type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

export function CodeScrollArea({
  children,
  label,
  showScrollbar = true,
  scrollable = false,
}: {
  children: ReactNode;
  label: string;
  showScrollbar?: boolean;
  scrollable?: boolean;
}) {
  const service = useMachine(scrollArea.machine, { id: useId() });
  const api = scrollArea.connect(service, normalizeProps);
  const { role: viewportRole, ...viewportProps } = api.getViewportProps();
  void viewportRole;

  return (
    <div
      {...api.getRootProps()}
      data-scrollbar-visible={showScrollbar || undefined}
      className="code-scroll-area min-w-0 w-full max-w-full overflow-hidden"
    >
      <section
        {...viewportProps}
        aria-label={label}
        tabIndex={api.hasOverflowX || api.hasOverflowY ? 0 : -1}
        className={cn(
          "code-scroll-viewport min-w-0 w-full max-w-full",
          scrollable && "max-h-[min(42dvh,25rem)] overscroll-contain",
        )}
      >
        <div {...api.getContentProps()}>{children}</div>
      </section>
      {scrollable && (
        <div
          {...api.getScrollbarProps({ orientation: "vertical" })}
          className="code-scrollbar code-scrollbar-y"
        >
          <div
            {...api.getThumbProps({ orientation: "vertical" })}
            className="code-scroll-thumb"
          />
        </div>
      )}
      <div
        {...api.getScrollbarProps({ orientation: "horizontal" })}
        className="code-scrollbar code-scrollbar-x"
      >
        <div
          {...api.getThumbProps({ orientation: "horizontal" })}
          className="code-scroll-thumb"
        />
      </div>
    </div>
  );
}
