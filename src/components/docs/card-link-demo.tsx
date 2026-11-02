"use client";

import { BookOpenTextIcon, CodeIcon, PaletteIcon } from "@phosphor-icons/react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardLink,
  CardTitle,
} from "@/components/ui/card";

const guides = [
  {
    href: "/components/installation",
    title: "Installation",
    description: "Add the CLI and your first component.",
    icon: BookOpenTextIcon,
  },
  {
    href: "/themes",
    title: "Themes",
    description: "Change colors, radius, and fonts.",
    icon: PaletteIcon,
  },
  {
    href: "/components/react-aria",
    title: "React Aria",
    description: "Use the hooks and props under each part.",
    icon: CodeIcon,
  },
];

export function CardLinkDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      {guides.map(({ href, title, description, icon: Icon }) => (
        <Card key={href}>
          <CardHeader>
            <span
              aria-hidden="true"
              className="mb-2 grid size-9 place-items-center rounded-lg bg-muted text-foreground"
            >
              <Icon size={18} />
            </span>
            <CardTitle>
              <CardLink href={href}>{title}</CardLink>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
