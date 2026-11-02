"use client";

import { GlobeHemisphereWestIcon } from "@phosphor-icons/react";
import {
  ComboBox,
  ComboBoxContent,
  ComboBoxControl,
  ComboBoxIcon,
  ComboBoxInput,
  ComboBoxItem,
  ComboBoxLabel,
  ComboBoxTrigger,
} from "@/components/ui/combo-box";

const zones = [
  { id: "pst", name: "Pacific Time", offset: "UTC−08:00" },
  { id: "est", name: "Eastern Time", offset: "UTC−05:00" },
  { id: "gmt", name: "Greenwich Mean Time", offset: "UTC+00:00" },
  { id: "cet", name: "Central European Time", offset: "UTC+01:00" },
  { id: "ist", name: "India Standard Time", offset: "UTC+05:30" },
  { id: "jst", name: "Japan Standard Time", offset: "UTC+09:00" },
];

export function ComboBoxIconDemo() {
  return (
    <ComboBox
      items={zones}
      defaultSelectedKey="gmt"
      className="w-full max-w-[340px]"
    >
      <ComboBoxLabel>Time zone</ComboBoxLabel>
      <ComboBoxControl>
        <ComboBoxIcon>
          <GlobeHemisphereWestIcon />
        </ComboBoxIcon>
        <ComboBoxInput placeholder="Search time zones" />
        <ComboBoxTrigger />
      </ComboBoxControl>
      <ComboBoxContent<(typeof zones)[number]>>
        {(zone) => (
          <ComboBoxItem id={zone.id} textValue={zone.name}>
            <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
              <span className="truncate font-medium">{zone.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums group-selected/item:text-accent-foreground">
                {zone.offset}
              </span>
            </span>
          </ComboBoxItem>
        )}
      </ComboBoxContent>
    </ComboBox>
  );
}
