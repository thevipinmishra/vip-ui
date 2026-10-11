export interface NavLink {
  href: string;
  label: string;
}

export const docsGuides: NavLink[] = [
  { href: "/components/installation", label: "Installation" },
  { href: "/components/react-aria", label: "React Aria" },
];

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
