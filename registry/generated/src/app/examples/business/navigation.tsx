"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ChartBar,
  CreditCard,
  FileText,
  Refresh,
  Settings,
  Users,
} from "reicon-react";
import { base } from "./ui";

const sections = [
  { href: base, label: "Overview", icon: ChartBar },
  { href: `${base}/customers`, label: "Customers", icon: Users },
  { href: `${base}/subscriptions`, label: "Subscriptions", icon: Refresh },
  { href: `${base}/invoices`, label: "Invoices", icon: FileText },
  { href: `${base}/payments`, label: "Payments", icon: CreditCard },
  { href: `${base}/reports`, label: "Reports", icon: Activity },
  { href: `${base}/settings`, label: "Settings", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Business sections"
      className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
    >
      {sections.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={
            pathname === href ||
            (href !== base && pathname.startsWith(`${href}/`))
              ? "page"
              : undefined
          }
          className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-lg px-3.5 text-[13px] font-medium focus-visible:outline-2 focus-visible:outline-ring ${pathname === href || (href !== base && pathname.startsWith(`${href}/`)) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
          <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
