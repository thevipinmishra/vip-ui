"use client";

import { ListIcon } from "@phosphor-icons/react";
import { Button } from "../../../components/vip-ui/button";
import { ButtonLink } from "../../../components/vip-ui/button-link";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../../components/vip-ui/menu";
import { brand } from "./data";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
        >
          <span className="flex items-end gap-[3px]">
            <span className="h-2 w-[3px] rounded-full bg-current" />
            <span className="h-3.5 w-[3px] rounded-full bg-current" />
            <span className="h-5 w-[3px] rounded-full bg-current" />
          </span>
        </span>
        <span className="text-[17px] font-semibold tracking-[-0.04em]">
          {brand.name}
        </span>
      </span>
    </span>
  );
}

const navItems = [
  { label: "Product", href: "/blocks/landing-01#features", key: "product" },
  { label: "Pricing", href: "/blocks/pricing-02", key: "pricing" },
  { label: "Changelog", href: "/blocks/changelog-01", key: "changelog" },
  {
    label: "Customers",
    href: "/blocks/landing-01#customers",
    key: "customers",
  },
];

export function SiteHeader({
  active,
}: {
  active?: "product" | "pricing" | "changelog";
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="/blocks/landing-01"
          aria-label={`${brand.name} home`}
          className="rounded-md outline-offset-4 outline-transparent focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
        >
          <BrandMark />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? "page" : undefined}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out-quint hover:bg-muted hover:text-foreground aria-[current=page]:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1.5">
          <ButtonLink
            href="/blocks/login-01"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Sign in
          </ButtonLink>
          <ButtonLink href="/blocks/signup-01" size="sm">
            Start free
          </ButtonLink>
          <MenuTrigger>
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Open site menu"
              className="md:hidden"
            >
              <ListIcon size={20} aria-hidden="true" />
            </Button>
            <MenuPopover placement="bottom end">
              <MenuContent aria-label="Site menu">
                <MenuItem href="/blocks/landing-01#features">Product</MenuItem>
                <MenuItem href="/blocks/pricing-02">Pricing</MenuItem>
                <MenuItem href="/blocks/changelog-01">Changelog</MenuItem>
                <MenuItem href="/blocks/landing-01#customers">
                  Customers
                </MenuItem>
                <MenuSeparator />
                <MenuItem href="/blocks/login-01">Sign in</MenuItem>
                <MenuItem href="/blocks/landing-01#newsletter">
                  Newsletter
                </MenuItem>
              </MenuContent>
            </MenuPopover>
          </MenuTrigger>
        </div>
      </div>
    </header>
  );
}

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/blocks/landing-01#features" },
      { label: "Pricing", href: "/blocks/pricing-02" },
      { label: "Changelog", href: "/blocks/changelog-01" },
      { label: "FAQ", href: "/blocks/landing-01#faq" },
    ],
  },
  {
    title: "Plans",
    links: [
      { label: "Starter", href: "/blocks/pricing-02" },
      { label: "Team", href: "/blocks/pricing-02" },
      { label: "Scale", href: "/blocks/pricing-02" },
      { label: "Compare plans", href: "/blocks/pricing-02#compare" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/blocks/login-01" },
      { label: "Start free", href: "/blocks/signup-01" },
      { label: "Talk to sales", href: "mailto:sales@trellis.app" },
      { label: "Block catalog", href: "/blocks" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
        <div className="max-w-xs">
          <BrandMark />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {brand.tagline}
          </p>
          <a
            href="mailto:hello@trellis.app"
            className="mt-3 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            hello@trellis.app
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-14">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {column.title}
              </h2>
              <ul className="mt-3 grid gap-2">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-150 ease-out-quint hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>© 2026 Trellis Labs, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
