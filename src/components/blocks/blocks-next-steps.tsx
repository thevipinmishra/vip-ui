"use client";

import {
  PaletteIcon,
  PuzzlePieceIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import { NextSteps } from "@/components/docs/next-steps";

const steps = [
  {
    label: "Set up your project",
    href: "/components/installation",
    icon: TerminalWindowIcon,
  },
  { label: "Add a block", href: "#gallery", icon: PuzzlePieceIcon },
  { label: "Make it yours", href: "/themes", icon: PaletteIcon },
];

export function BlocksNextSteps() {
  return <NextSteps steps={steps} title="From block to app" />;
}
