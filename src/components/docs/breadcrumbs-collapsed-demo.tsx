"use client";

import { DotsThreeIcon } from "@phosphor-icons/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Breadcrumbs,
} from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";

const hidden = [
  { id: "docs", name: "Docs", href: "/docs" },
  { id: "components", name: "Components", href: "/components" },
  { id: "navigation", name: "Navigation", href: "/components" },
];

export function BreadcrumbsCollapsedDemo() {
  return (
    <nav aria-label="Breadcrumbs">
      <Breadcrumbs>
        <Breadcrumb href="/">Home</Breadcrumb>
        <BreadcrumbItem id="more">
          <MenuTrigger>
            <Button
              variant="minimal"
              size="xs"
              iconOnly
              aria-label="More pages"
            >
              <DotsThreeIcon weight="bold" aria-hidden="true" />
            </Button>
            <Menu aria-label="More pages" items={hidden}>
              {(item) => <MenuItem href={item.href}>{item.name}</MenuItem>}
            </Menu>
          </MenuTrigger>
        </BreadcrumbItem>
        <Breadcrumb href="/components/breadcrumbs">Breadcrumbs</Breadcrumb>
        <Breadcrumb>Examples</Breadcrumb>
      </Breadcrumbs>
    </nav>
  );
}
