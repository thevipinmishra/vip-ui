"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as scrollArea from "@zag-js/scroll-area";
import { type ReactNode, useId } from "react";

export function SidebarScrollArea({ children }: { children: ReactNode }) {
  const service = useMachine(scrollArea.machine, { id: useId() });
  const api = scrollArea.connect(service, normalizeProps);

  return (
    <div className="sticky top-6">
      <div {...api.getRootProps()} className="sidebar-scroll-area">
        <div
          {...api.getViewportProps()}
          className="sidebar-scroll-viewport h-[calc(100dvh-1.5rem)]"
        >
          <div {...api.getContentProps()} className="pb-10 pr-5">
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
