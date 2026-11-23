"use client";

import { DotsThreeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardLink,
  CardTitle,
} from "@/components/ui/card";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";

export function CardLinkDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle as="h4">
          <CardLink href="/components">Component library</CardLink>
        </CardTitle>
        <CardDescription>
          Shared components for the checkout and account projects.
        </CardDescription>
        <CardAction className="relative z-10">
          <MenuTrigger>
            <Button
              variant="minimal"
              size="sm"
              iconOnly
              aria-label="Component library actions"
            >
              <DotsThreeIcon weight="bold" aria-hidden="true" />
            </Button>
            <Menu aria-label="Component library actions">
              <MenuItem href="/components/installation">
                Installation guide
              </MenuItem>
              <MenuItem href="/themes">Browse themes</MenuItem>
            </Menu>
          </MenuTrigger>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
