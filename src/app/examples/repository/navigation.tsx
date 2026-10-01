"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BranchUp,
  ChartBar,
  Clock,
  HelpCircle,
  Tag,
  Users,
} from "reicon-react";
import { repository } from "./config";

const base = "/examples/repository";
const routes = [
  { href: base, label: "Overview", icon: ChartBar },
  { href: `${base}/issues`, label: "Issues", icon: HelpCircle },
  { href: `${base}/pulls`, label: "Pull requests", icon: BranchUp },
  { href: `${base}/commits`, label: "Commits", icon: Clock },
  { href: `${base}/releases`, label: "Releases", icon: Tag },
  { href: `${base}/contributors`, label: "Contributors", icon: Users },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Repository sections"
      className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
    >
      {routes.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-lg px-3.5 text-[13px] font-medium focus-visible:outline-2 focus-visible:outline-ring ${pathname === href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
          <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function SourceLink() {
  return (
    <a
      href={repository.url}
      className="inline-flex min-h-10 items-center gap-2 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
    >
      View on GitHub
    </a>
  );
}
