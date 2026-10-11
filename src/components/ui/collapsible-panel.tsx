"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext } from "react";
import { DisclosureStateContext } from "react-aria-components";
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const CollapsibleIdsContext = createContext<{
  triggerId: string;
  panelId: string;
} | null>(null);

type CollapsiblePanelProps = Omit<
  HTMLMotionProps<"div">,
  | "animate"
  | "initial"
  | "transition"
  | "id"
  | "aria-hidden"
  | "inert"
  | "children"
> & { children?: ReactNode };

export function CollapsiblePanel({
  children,
  className,
  role = "group",
  ...props
}: CollapsiblePanelProps) {
  const ids = useContext(CollapsibleIdsContext);
  const isExpanded = useContext(DisclosureStateContext)?.isExpanded;
  const reduceMotion = useReducedMotion();
  if (!ids) throw new Error("CollapsiblePanel must be inside a disclosure.");

  return (
    <motion.div
      data-slot="collapsible-panel"
      {...props}
      id={ids.panelId}
      role={role}
      aria-labelledby={ids.triggerId}
      aria-hidden={!isExpanded}
      inert={!isExpanded}
      className={cn("overflow-hidden", className)}
      initial={false}
      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
      transition={{
        height: { duration: reduceMotion ? 0 : duration.base, ease: easeOut },
        opacity: { duration: reduceMotion ? 0 : duration.fast, ease: easeOut },
      }}
    >
      {children}
    </motion.div>
  );
}
