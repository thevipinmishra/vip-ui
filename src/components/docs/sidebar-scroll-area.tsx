"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as scrollArea from "@zag-js/scroll-area";
import { type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

export function SidebarScrollArea({
  children,
  className,
  contentClassName,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const service = useMachine(scrollArea.machine, { id: useId() });
  const api = scrollArea.connect(service, normalizeProps);

  return (
    <div className={cn("sticky top-(--header-height)", className)}>
      <div {...api.getRootProps()} className="sidebar-scroll-area">
        <div
          {...api.getViewportProps()}
          className="sidebar-scroll-viewport h-[calc(100dvh-var(--header-height))]"
        >
          <div
            {...api.getContentProps()}
            className={cn("pt-12 pb-10", contentClassName)}
          >
            {children}
          </div>
        </div>
        <div
          {...api.getScrollbarProps({ orientation: "vertical" })}
          className="sidebar-scrollbar"
        >
          <div
            {...api.getThumbProps({ orientation: "vertical" })}
            className="sidebar-scroll-thumb"
          />
        </div>
      </div>
    </div>
  );
}
