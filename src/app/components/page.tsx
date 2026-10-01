import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Search } from "reicon-react";
import { CatalogCard } from "@/components/docs/catalog-card";
import { catalogGroups } from "@/components/docs/catalog-groups";

export const metadata: Metadata = {
  title: "Components | vip/ui",
  description:
    "Browse copyable React components, try live examples, and read installation and API guidance for each component.",
};

const components = [
  {
    href: "/components/button",
    name: "Button",
    description: "Clear actions in a deliberate visual hierarchy.",
    kind: "button",
  },
  {
    href: "/components/text-field",
    name: "Text field",
    description: "A labeled input with helpful and invalid states.",
    kind: "field",
  },
  {
    href: "/components/select",
    name: "Select",
    description: "A choice field with descriptions and keyboard navigation.",
    kind: "select",
  },
  {
    href: "/components/checkbox",
    name: "Checkbox",
    description: "Independent choices with a generous target.",
    kind: "checkbox",
  },
  {
    href: "/components/switch",
    name: "Switch",
    description: "Immediate settings with a clear on and off state.",
    kind: "switch",
  },
  {
    href: "/components/badge",
    name: "Badge",
    description: "Compact status labels with clear meaning.",
    kind: "badge",
  },
  {
    href: "/components/alert",
    name: "Alert",
    description: "Inline information near the task it affects.",
    kind: "alert",
  },
  {
    href: "/components/radio-group",
    name: "Radio group",
    description: "One choice from a visible set of options.",
    kind: "radio",
  },
  {
    href: "/components/text-area",
    name: "Text area",
    description: "Longer answers with guidance close to the field.",
    kind: "textarea",
  },
  {
    href: "/components/slider",
    name: "Slider",
    description: "A bounded value with a readable current setting.",
    kind: "slider",
  },
  {
    href: "/components/tabs",
    name: "Tabs",
    description: "Related panels in one compact view.",
    kind: "tabs",
  },
  {
    href: "/components/accordion",
    name: "Accordion",
    description: "Answers and details revealed on demand.",
    kind: "accordion",
  },
  {
    href: "/components/dialog",
    name: "Dialog",
    description: "A short focused task above the page.",
    kind: "dialog",
  },
  {
    href: "/components/drawer",
    name: "Drawer",
    description: "A draggable sheet for longer tasks and details.",
    kind: "drawer",
  },
  {
    href: "/components/search-field",
    name: "Search field",
    description: "A query field with a clear way back to all results.",
    kind: "search",
  },
  {
    href: "/components/menu",
    name: "Menu",
    description: "Several actions behind one clear trigger.",
    kind: "menu",
  },
  {
    href: "/components/combo-box",
    name: "Combo box",
    description: "Search and select from a longer list.",
    kind: "combo",
  },
  {
    href: "/components/tooltip",
    name: "Tooltip",
    description: "Short supporting help on hover or focus.",
    kind: "tooltip",
  },
  {
    href: "/components/toast",
    name: "Toast",
    description: "Brief feedback after an action.",
    kind: "toast",
  },
  {
    href: "/components/separator",
    name: "Separator",
    description: "A quiet boundary between content groups.",
    kind: "separator",
  },
  {
    href: "/components/progress-bar",
    name: "Progress bar",
    description: "Task completion with a readable value.",
    kind: "progress",
  },
  {
    href: "/components/meter",
    name: "Meter",
    description: "A quantity measured against a known range.",
    kind: "meter",
  },
  {
    href: "/components/number-field",
    name: "Number field",
    description: "Precise entry with stepper controls.",
    kind: "number",
  },
  {
    href: "/components/toggle-button",
    name: "Toggle button",
    description: "A button that keeps its selected state.",
    kind: "toggle",
  },
  {
    href: "/components/toggle-button-group",
    name: "Toggle button group",
    description: "Compact selection between related options.",
    kind: "toggle-group",
  },
  {
    href: "/components/breadcrumbs",
    name: "Breadcrumbs",
    description: "Links back through a page hierarchy.",
    kind: "breadcrumbs",
  },
  {
    href: "/components/tag-group",
    name: "Tag group",
    description: "Removable topics in a navigable group.",
    kind: "tags",
  },
  {
    href: "/components/list-box",
    name: "List box",
    description: "Visible choices with keyboard selection.",
    kind: "list",
  },
  {
    href: "/components/color-swatch",
    name: "Color swatch",
    description: "A color sample with a readable name.",
    kind: "swatch",
  },
  {
    href: "/components/checkbox-group",
    name: "Checkbox group",
    description: "Related choices with a shared label.",
    kind: "checkbox",
  },
  {
    href: "/components/disclosure",
    name: "Disclosure",
    description: "Optional details that open on demand.",
    kind: "accordion",
  },
  {
    href: "/components/popover",
    name: "Popover",
    description: "Contextual content beside its trigger.",
    kind: "dialog",
  },
  {
    href: "/components/toolbar",
    name: "Toolbar",
    description: "Related actions in a keyboard-friendly row.",
    kind: "toggle-group",
  },
  {
    href: "/components/grid-list",
    name: "Grid list",
    description: "Selectable, interactive rows.",
    kind: "list",
  },
  {
    href: "/components/color-field",
    name: "Color field",
    description: "Type a precise color value.",
    kind: "field",
  },
  {
    href: "/components/form",
    name: "Form",
    description: "Collect and validate related fields.",
    kind: "field",
  },
  {
    href: "/components/link",
    name: "Link",
    description: "Accessible text navigation.",
    kind: "breadcrumbs",
  },
  {
    href: "/components/color-swatch-picker",
    name: "Color swatch picker",
    description: "Choose from named colors.",
    kind: "swatch",
  },
  {
    href: "/components/color-picker",
    name: "Color picker",
    description: "Edit a color visually or enter its hex value.",
    kind: "swatch",
  },
  {
    href: "/components/date-field",
    name: "Date field",
    description: "A date entered through editable segments.",
    kind: "number",
  },
  {
    href: "/components/file-trigger",
    name: "File trigger",
    description: "Choose files using an accessible button.",
    kind: "button",
  },
  {
    href: "/components/command-palette",
    name: "Command palette",
    description: "Find an action with a few keystrokes.",
    kind: "search",
  },
  {
    href: "/components/time-field",
    name: "Time field",
    description: "Edit hours and minutes separately.",
    kind: "number",
  },
  {
    href: "/components/calendar",
    name: "Calendar",
    description: "Browse and select a day.",
    kind: "calendar",
  },
  {
    href: "/components/range-calendar",
    name: "Range calendar",
    description: "Select a span of days.",
    kind: "calendar",
  },
  {
    href: "/components/date-picker",
    name: "Date picker",
    description: "Type or choose a date.",
    kind: "calendar",
  },
  {
    href: "/components/date-range-picker",
    name: "Date range picker",
    description: "Type or choose two dates.",
    kind: "calendar",
  },
  {
    href: "/components/preview-trigger",
    name: "Preview trigger",
    description: "Interactive previews on focus or hover.",
    kind: "dialog",
  },
  {
    href: "/components/tree",
    name: "Tree",
    description: "Browse and select nested files or folders.",
    kind: "list",
  },
  {
    href: "/components/drop-zone",
    name: "Drop zone",
    description: "Add files by dropping them or browsing.",
    kind: "card",
  },
  {
    href: "/components/table",
    name: "Table",
    description: "Data arranged in selectable rows.",
    kind: "table",
  },
  {
    href: "/components/autocomplete",
    name: "Autocomplete",
    description: "Filter a collection as you type.",
    kind: "search",
  },
  {
    href: "/components/token-field",
    name: "Token field",
    description: "Enter editable tags in one field.",
    kind: "field",
  },
  {
    href: "/components/card",
    name: "Card",
    description: "A section for related content and actions.",
    kind: "card",
  },
  {
    href: "/components/avatar",
    name: "Avatar",
    description: "A person pictured or identified by initials.",
    kind: "avatar",
  },
  {
    href: "/components/skeleton",
    name: "Skeleton",
    description: "A placeholder for content still loading.",
    kind: "skeleton",
  },
  {
    href: "/components/spinner",
    name: "Spinner",
    description: "Motion-driven indicators for work in progress.",
    kind: "spinner",
  },
  {
    href: "/components/empty-state",
    name: "Empty state",
    description: "Explain an empty collection and what to do next.",
    kind: "empty-state",
  },
  {
    href: "/components/pagination",
    name: "Pagination",
    description: "Links between pages of results.",
    kind: "pagination",
  },
  {
    href: "/components/description-list",
    name: "Description list",
    description: "Labels paired with their values.",
    kind: "description-list",
  },
  {
    href: "/components/kbd-code",
    name: "Kbd & code",
    description: "Shortcuts and inline code in prose.",
    kind: "kbd-code",
  },
  {
    href: "/components/stat",
    name: "Stat",
    description: "A labeled metric with useful context.",
    kind: "stat",
  },
] as const;

export default function ComponentsPage() {
  return (
    <article>
      <div className="relative overflow-hidden rounded-[28px] bg-foreground px-6 py-12 text-background shadow-[var(--shadow-float)] sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute -end-24 -top-28 size-80 rounded-full bg-[radial-gradient(circle,var(--primary),transparent_70%)] opacity-25" />
        <div className="relative max-w-[670px]">
          <h1 className="text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.065em] [text-wrap:balance]">
            Find the right component.
          </h1>
          <Link
            href="/components/installation"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-background px-5 text-sm font-semibold text-foreground hover:bg-background/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Read installation <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <section className="mt-16" aria-labelledby="catalog-heading">
        <h2
          id="catalog-heading"
          className="text-[30px] font-semibold tracking-[-0.05em]"
        >
          Browse by task
        </h2>
        <div className="mt-10 space-y-14">
          {catalogGroups.map((group) => (
            <section
              key={group.title}
              aria-labelledby={`group-${group.title.replaceAll(" ", "-")}`}
            >
              <div className="mb-5">
                <h3
                  id={`group-${group.title.replaceAll(" ", "-")}`}
                  className="text-xl font-semibold tracking-[-0.04em]"
                >
                  {group.title}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.hrefs.map((slug) => {
                  const component = components.find(
                    (item) => item.href === `/components/${slug}`,
                  );
                  if (!component) return null;
                  return (
                    <CatalogCard key={component.href}>
                      <Link
                        href={component.href}
                        className="group flex h-full min-h-[216px] flex-col overflow-hidden rounded-[20px] bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/60 hover:ring-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-6"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className="flex min-h-20 max-w-[230px] items-center"
                            aria-hidden="true"
                          >
                            <ComponentIllustration kind={component.kind} />
                          </div>
                          <ArrowRight
                            size={17}
                            aria-hidden="true"
                            className="shrink-0 text-muted-foreground group-hover:text-primary"
                          />
                        </div>
                        <h4 className="mt-auto pt-5 text-[17px] font-semibold tracking-[-0.035em]">
                          {component.name}
                        </h4>
                        <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
                          {component.description}
                        </p>
                      </Link>
                    </CatalogCard>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}

function ComponentIllustration({
  kind,
}: {
  kind: (typeof components)[number]["kind"];
}) {
  if (kind === "card")
    return (
      <div className="w-full max-w-[200px] rounded-lg bg-card p-3 text-xs shadow-[var(--shadow-card)] ring-1 ring-border/70">
        <span className="font-semibold">Studio North</span>
        <span className="mt-1 block text-muted-foreground">Team workspace</span>
        <span className="mt-3 block border-t border-border pt-2">
          8 members
        </span>
      </div>
    );
  if (kind === "avatar")
    return (
      <div className="flex -space-x-2">
        <span className="grid size-9 place-items-center rounded-full bg-primary text-xs text-primary-foreground ring-2 ring-background">
          AS
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-accent text-xs ring-2 ring-background">
          MC
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-success-subtle text-xs ring-2 ring-background">
          LP
        </span>
      </div>
    );
  if (kind === "skeleton")
    return (
      <div className="w-full max-w-[200px] space-y-2">
        <div className="h-3 w-2/3 rounded bg-muted" />
        <div className="h-3 rounded bg-muted" />
        <div className="h-3 w-4/5 rounded bg-muted" />
      </div>
    );
  if (kind === "spinner")
    return (
      <div className="flex size-12 items-center justify-center rounded-full border-2 border-primary/20 text-primary">
        <span className="size-3 rounded-full bg-current" />
      </div>
    );
  if (kind === "empty-state")
    return (
      <div className="w-full max-w-[200px] rounded-lg border border-dashed border-border p-3 text-center text-xs">
        <span className="font-medium">No projects yet</span>
        <span className="mt-1 block text-muted-foreground">
          Create your first project
        </span>
      </div>
    );
  if (kind === "pagination")
    return (
      <div className="flex gap-1 text-xs">
        <span className="rounded bg-accent px-3 py-2">1</span>
        <span className="rounded bg-muted px-3 py-2">2</span>
        <span className="rounded bg-muted px-3 py-2">3</span>
      </div>
    );
  if (kind === "description-list")
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <span className="text-muted-foreground">Owner</span>
        <span>Amina</span>
        <span className="text-muted-foreground">Status</span>
        <span>Active</span>
      </div>
    );
  if (kind === "kbd-code")
    return (
      <span className="text-xs">
        Press{" "}
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono">
          Ctrl
        </span>{" "}
        +{" "}
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono">
          K
        </span>
      </span>
    );
  if (kind === "stat")
    return (
      <div className="text-xs">
        <span className="text-muted-foreground">Active projects</span>
        <span className="mt-1 block text-2xl font-semibold tabular-nums">
          24
        </span>
        <span className="text-muted-foreground">Up 3 this month</span>
      </div>
    );
  if (kind === "calendar")
    return (
      <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
        {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => (
          <span
            key={day}
            className={`grid size-6 place-items-center rounded-sm ${day === 12 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            {day}
          </span>
        ))}
      </div>
    );
  if (kind === "table")
    return (
      <div className="w-full max-w-[230px] rounded-md border border-border text-[10px]">
        <div className="grid grid-cols-2 border-b border-border bg-muted px-3 py-2 font-semibold">
          <span>Project</span>
          <span>Status</span>
        </div>
        <div className="grid grid-cols-2 px-3 py-2">
          <span>Atlas</span>
          <span>Review</span>
        </div>
        <div className="grid grid-cols-2 border-t border-border px-3 py-2">
          <span>North</span>
          <span>Active</span>
        </div>
      </div>
    );
  if (kind === "separator")
    return (
      <div className="w-full max-w-[230px] space-y-3 text-xs">
        <span>Account</span>
        <div className="h-px bg-border" />
        <span>Notifications</span>
      </div>
    );
  if (kind === "progress" || kind === "meter")
    return (
      <div className="w-full max-w-[230px]">
        <div className="flex justify-between text-xs">
          <span>{kind === "meter" ? "Storage used" : "Upload"}</span>
          <span>65%</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-secondary">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
      </div>
    );
  if (kind === "number")
    return (
      <div className="flex items-center gap-5 rounded-md border border-input bg-card px-4 py-2 text-sm">
        <span>−</span>
        <span>2</span>
        <span>+</span>
      </div>
    );
  if (kind === "toggle" || kind === "toggle-group")
    return (
      <div className="flex gap-1 rounded-lg bg-secondary p-1 text-xs">
        <span className="rounded-md bg-accent px-3 py-2 text-accent-foreground">
          {kind === "toggle" ? "Pinned" : "Day"}
        </span>
        {kind === "toggle-group" && <span className="px-3 py-2">Week</span>}
      </div>
    );
  if (kind === "breadcrumbs")
    return (
      <span className="text-xs text-muted-foreground">
        Home / Projects / <strong className="text-foreground">Details</strong>
      </span>
    );
  if (kind === "tags")
    return (
      <div className="flex gap-2 text-xs">
        <span className="rounded-md border border-border px-3 py-2">
          Design ×
        </span>
        <span className="rounded-md border border-border px-3 py-2">
          Research ×
        </span>
      </div>
    );
  if (kind === "list")
    return (
      <div className="w-full max-w-[200px] rounded-lg border border-border bg-card p-1 text-xs">
        <span className="block rounded-md bg-accent px-3 py-2">Design ✓</span>
        <span className="block px-3 py-2">Engineering</span>
      </div>
    );
  if (kind === "swatch")
    return (
      <div className="flex gap-3">
        <span className="size-9 rounded-md bg-primary" />
        <span className="size-9 rounded-md bg-success" />
        <span className="size-9 rounded-md bg-warning" />
      </div>
    );
  if (kind === "button")
    return (
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground">
          Save changes
        </span>
        <span className="rounded-md border border-border bg-card px-4 py-2.5 text-xs font-medium">
          Cancel
        </span>
      </div>
    );
  if (kind === "field")
    return (
      <div className="w-full max-w-[230px]">
        <span className="mb-2 block text-[11px] font-medium">Project name</span>
        <span className="block rounded-md border border-input bg-background px-3 py-2.5 text-xs text-muted-foreground shadow-[var(--shadow-inset)]">
          Studio North
        </span>
      </div>
    );
  if (kind === "select")
    return (
      <span className="flex w-full max-w-[230px] items-center justify-between rounded-md border border-input bg-background px-3 py-2.5 text-xs shadow-[var(--shadow-inset)]">
        Next.js <ChevronDown size={14} />
      </span>
    );
  if (kind === "checkbox")
    return (
      <div className="flex items-center gap-3">
        <span className="grid size-5 place-items-center rounded-[6px] bg-primary text-primary-foreground">
          <Check size={13} strokeWidth={2.5} />
        </span>
        <span className="text-xs">Weekly digest</span>
      </div>
    );
  if (kind === "badge")
    return (
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
          In progress
        </span>
        <span className="rounded-full bg-success-subtle px-2.5 py-1 text-[11px] font-medium text-success-foreground">
          Published
        </span>
      </div>
    );
  if (kind === "alert")
    return (
      <div className="w-full max-w-[230px] rounded-lg bg-warning-subtle p-3 text-warning-foreground ring-1 ring-warning/20">
        <span className="text-xs font-semibold">Review required</span>
        <p className="mt-1 text-[10px]">Check the details before publishing.</p>
      </div>
    );
  if (kind === "radio")
    return (
      <div className="grid gap-2 text-xs">
        <span className="flex items-center gap-2">
          <span className="grid size-4 place-items-center rounded-full border border-primary">
            <span className="size-2 rounded-full bg-primary" />
          </span>{" "}
          Team
        </span>
        <span className="flex items-center gap-2">
          <span className="size-4 rounded-full border border-input" /> Personal
        </span>
      </div>
    );
  if (kind === "textarea")
    return (
      <div className="w-full max-w-[230px] rounded-md border border-input bg-background px-3 py-2.5 text-[11px] leading-5 text-muted-foreground shadow-[var(--shadow-inset)]">
        A short project summary
        <br />
        for your team...
      </div>
    );
  if (kind === "slider")
    return (
      <div className="w-full max-w-[230px]">
        <div className="flex justify-between text-[11px]">
          <span>Volume</span>
          <span>40</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-secondary">
          <div className="relative h-2 w-2/5 rounded-full bg-primary">
            <span className="absolute -right-2 -top-1.5 size-5 rounded-full border-[5px] border-primary bg-card shadow-[var(--shadow-card)]" />
          </div>
        </div>
      </div>
    );
  if (kind === "tabs")
    return (
      <div className="flex rounded-lg bg-muted p-1 text-[11px]">
        <span className="rounded-md bg-card px-3 py-2 font-medium shadow-[var(--shadow-card)]">
          Overview
        </span>
        <span className="px-3 py-2 text-muted-foreground">Activity</span>
        <span className="px-3 py-2 text-muted-foreground">Settings</span>
      </div>
    );
  if (kind === "accordion")
    return (
      <div className="w-full max-w-[230px] space-y-1.5 text-[11px]">
        <span className="flex justify-between rounded-md bg-card px-3 py-2 ring-1 ring-border/70">
          How do I get started?
          <ChevronDown size={13} />
        </span>
        <span className="flex justify-between rounded-md bg-card px-3 py-2 ring-1 ring-border/70">
          Can I invite my team?
          <ChevronDown size={13} />
        </span>
      </div>
    );
  if (kind === "drawer")
    return (
      <div className="w-full max-w-[200px] overflow-hidden rounded-lg border border-border bg-muted pt-5">
        <div className="rounded-t-lg bg-card p-3 shadow-[var(--shadow-float)]">
          <span className="mx-auto mb-3 block h-1 w-8 rounded-full bg-input" />
          <span className="text-xs font-semibold">Order summary</span>
          <span className="mt-2 block text-[10px] text-muted-foreground">
            Review your order.
          </span>
        </div>
      </div>
    );
  if (kind === "dialog")
    return (
      <div className="w-full max-w-[200px] rounded-lg bg-card p-3 shadow-[var(--shadow-float)] ring-1 ring-border/70">
        <span className="block text-xs font-semibold">Project details</span>
        <span className="mt-2 block text-[10px] text-muted-foreground">
          Review your project information.
        </span>
        <span className="mt-3 inline-block rounded-md bg-primary px-2.5 py-1.5 text-[10px] text-primary-foreground">
          Close
        </span>
      </div>
    );
  if (kind === "search")
    return (
      <div className="flex w-full max-w-[230px] items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 text-xs text-muted-foreground shadow-[var(--shadow-inset)]">
        <Search size={14} aria-hidden="true" />
        Search projects
      </div>
    );
  if (kind === "menu")
    return (
      <div className="w-full max-w-[185px] rounded-lg bg-popover p-1.5 text-[11px] shadow-[var(--shadow-float)] ring-1 ring-border/70">
        <span className="block rounded-sm bg-muted px-2.5 py-1.5">
          Open project
        </span>
        <span className="block px-2.5 py-1.5">Duplicate project</span>
        <span className="block px-2.5 py-1.5">Archive project</span>
      </div>
    );
  if (kind === "combo")
    return (
      <div className="w-full max-w-[230px]">
        <span className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs">
          Astro <ChevronDown size={13} aria-hidden="true" />
        </span>
        <span className="mt-1 block rounded-md bg-accent px-3 py-1.5 text-[11px] text-accent-foreground">
          Astro
        </span>
      </div>
    );
  if (kind === "tooltip")
    return (
      <div className="flex flex-col items-center gap-2 text-[11px]">
        <span className="rounded-md bg-foreground px-3 py-1.5 text-background shadow-[var(--shadow-float)]">
          Keep changes private
        </span>
        <span className="rounded-md border border-border bg-card px-3 py-2 font-medium">
          Save draft
        </span>
      </div>
    );
  if (kind === "toast")
    return (
      <div className="flex w-full max-w-[230px] items-center gap-2.5 rounded-lg bg-popover p-3 shadow-[var(--shadow-float)] ring-1 ring-border/70">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success-subtle text-success-foreground">
          <Check size={13} aria-hidden="true" />
        </span>
        <span className="text-xs font-medium">Draft saved</span>
      </div>
    );
  return (
    <div className="flex items-center gap-4 text-xs">
      <span>Public profile</span>
      <span className="flex h-6 w-11 items-center rounded-full bg-primary p-[3px]">
        <span className="ml-auto size-[18px] rounded-full bg-card shadow-sm" />
      </span>
    </div>
  );
}
