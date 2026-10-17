export interface NavLink {
  href: string;
  label: string;
}

export const docsGuides = [
  {
    href: "/components/installation",
    label: "Installation",
    description:
      "Set up your project. Then add components with the shadcn CLI, or copy the files.",
  },
  {
    href: "/components/styling",
    label: "Styling",
    description:
      "Change the theme, dark mode, and the styles of a component. vip/ui uses your shadcn theme.",
  },
  {
    href: "/components/react-aria",
    label: "React Aria",
    description:
      "Interactive components wrap React Aria Components. React Aria supplies their behavior, state, and accessibility.",
  },
] as const satisfies readonly (NavLink & { description: string })[];

export type Guide = (typeof docsGuides)[number];

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
];

export function activeSection(pathname: string) {
  if (docsGuides.some((guide) => guide.href === pathname))
    return mainNav[0].href;
  return mainNav.find(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  )?.href;
}
