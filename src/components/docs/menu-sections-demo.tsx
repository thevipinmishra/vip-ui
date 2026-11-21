"use client";

import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export function MenuSectionsDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">Notifications</Button>
      <Menu aria-label="Notifications" shouldCloseOnSelect={false}>
        <MenuSection
          title="Delivery"
          selectionMode="single"
          defaultSelectedKeys={["daily"]}
          disallowEmptySelection
        >
          <MenuItem id="instant">Immediately</MenuItem>
          <MenuItem id="daily">Daily digest</MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuSection
          title="Topics"
          selectionMode="multiple"
          defaultSelectedKeys={["mentions"]}
        >
          <MenuItem id="mentions">Mentions</MenuItem>
          <MenuItem id="reviews">Review requests</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  );
}
