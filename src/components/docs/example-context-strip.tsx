"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getComponent } from "@/lib/catalog";

/**
 * Slim strip above an example workspace: a breadcrumb back to Examples and the
 * vip/ui components the workspace is built with. Component names and links come
 * from the catalog, so they stay in sync with the docs. It renders only for
 * example routes; the Examples hub keeps its own heading.
 */
const exampleMeta = [
  {
    href: "/examples/repository",
    title: "Repository desk",
    components: [
      "table",
      "search-field",
      "select",
      "date-picker",
      "badge",
      "avatar",
      "pagination",
      "empty-state",
      "stat",
    ],
  },
  {
    href: "/examples/business",
    title: "Billing operations",
    components: [
      "form",
      "select",
      "search-field",
      "card",
      "badge",
      "button",
      "stat",
    ],
  },
  {
    href: "/examples/chat",
    title: "Chat workspace",
    components: ["avatar", "button", "card", "search-field", "text-area"],
  },
  {
    href: "/examples/studio",
    title: "Asset studio",
    components: [
      "tree",
      "drop-zone",
      "file-trigger",
      "token-field",
      "color-picker",
      "command-palette",
      "card",
    ],
  },
] as const;

export function ExampleContextStrip() {
  const pathname = usePathname();
  const example = exampleMeta.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  if (!example) return null;

  const listed = example.components.flatMap((slug) => {
    const component = getComponent(slug);
    return component ? [{ slug, name: component.name }] : [];
  });

  return (
    <div className="border-b border-border/70 bg-muted/40">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2.5 sm:px-8">
        <Breadcrumbs aria-label="Breadcrumb" className="text-xs">
          <Breadcrumb href="/examples">Examples</Breadcrumb>
          <Breadcrumb>{example.title}</Breadcrumb>
        </Breadcrumbs>
        {listed.length > 0 && (
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Built with</span>
            <ul className="flex flex-wrap items-center gap-1.5">
              {listed.map((component) => (
                <li key={component.slug}>
                  <Link
                    href={`/components/${component.slug}`}
                    className="inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Badge
                      variant="outline"
                      className="min-h-6 px-2.5 text-[11px]"
                    >
                      {component.name}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
