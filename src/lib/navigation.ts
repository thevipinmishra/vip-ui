export interface NavLink {
  href: string;
  label: string;
}

export const docsGuides = [
  {
    group: "Get started",
    href: "/components/installation",
    label: "Installation",
    description:
      "Set up your project. Then add components with the shadcn CLI, or copy the files.",
  },
  {
    group: "Get started",
    href: "/components/from-shadcn",
    label: "From shadcn/ui",
    description:
      "Install vip/ui beside shadcn/ui. Keep your theme, and map each shadcn name to its vip/ui name.",
  },
  {
    group: "Get started",
    href: "/components/ai-and-mcp",
    label: "AI and MCP",
    description:
      "Build with vip/ui through AI tools: the shadcn MCP server, llms.txt, the Markdown pages, and the CLI.",
  },
  {
    group: "Get started",
    href: "/components/updating",
    label: "Updating",
    description:
      "See what changed before you update an installed component, then overwrite it with the registry version.",
  },
  {
    group: "Foundations",
    href: "/components/styling",
    label: "Styling",
    description:
      "Change the theme, color scales, dark mode, and the styles of a component. vip/ui uses your shadcn theme.",
  },
  {
    group: "Foundations",
    href: "/components/typography",
    label: "Typography",
    description:
      "Style HTML and rendered markdown with one CSS file. A preset sets the fonts, size, line height, and spacing.",
  },
  {
    group: "Foundations",
    href: "/components/motion",
    label: "Motion",
    description:
      "Components share one set of durations, curves, and springs. Motion shows a change of state and obeys the reduced motion setting.",
  },
  {
    group: "Foundations",
    href: "/components/react-aria",
    label: "React Aria",
    description:
      "Interactive components wrap React Aria Components. React Aria supplies their behavior, state, and accessibility.",
  },
  {
    group: "Foundations",
    href: "/components/rtl",
    label: "RTL",
    description:
      "Components use logical CSS classes, so a right-to-left document mirrors them with no transform.",
  },
] as const satisfies readonly (NavLink & {
  group: string;
  description: string;
})[];

export type Guide = (typeof docsGuides)[number];

export const guideGroups = Object.entries(
  Object.groupBy(docsGuides, (guide) => guide.group),
).map(([title, guides]) => ({ title, guides: guides ?? [] }));

export const allComponents: NavLink = {
  href: "/components",
  label: "All components",
};

export function guideNeighbors(href: Guide["href"]) {
  const index = docsGuides.findIndex((guide) => guide.href === href);
  return {
    guide: docsGuides[index],
    previous: docsGuides[index - 1] as NavLink | undefined,
    next: (docsGuides[index + 1] as NavLink | undefined) ?? allComponents,
  };
}

export const mainNav: NavLink[] = [
  { href: "/components/installation", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/blocks", label: "Blocks" },
  { href: "/charts", label: "Charts" },
  { href: "/themes", label: "Themes" },
  { href: "/typography", label: "Typography" },
  { href: "/colors", label: "Colors" },
];

export function activeSection(pathname: string) {
  if (docsGuides.some((guide) => guide.href === pathname))
    return mainNav[0].href;
  return mainNav.find(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  )?.href;
}
