import Link from "next/link";
import { SiteLogo } from "./site-logo";

const links = [
  { href: "/components", label: "Components" },
  { href: "/components/installation", label: "Installation" },
  { href: "/themes", label: "Themes" },
  { href: "/charts", label: "Charts" },
  { href: "/examples", label: "Examples" },
  { href: "/license", label: "MIT license" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href="/"
            aria-label="vip/ui home"
            className="inline-flex rounded-lg hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <SiteLogo />
          </Link>
          <p className="text-sm text-muted-foreground">© {year} vip/ui</p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-8 items-center rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
