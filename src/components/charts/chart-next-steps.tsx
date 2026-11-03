"use client";

import {
  DatabaseIcon,
  PaletteIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import { NextSteps } from "@/components/docs/next-steps";

const steps = [
  { label: "Install", href: "#installation", icon: TerminalWindowIcon },
  { label: "Your data", href: "#usage", icon: DatabaseIcon },
  { label: "Make it yours", href: "#theming", icon: PaletteIcon },
];

export function ChartNextSteps() {
  return (
    <NextSteps steps={steps} title="From gallery to app" className="pb-14" />
  );
}
