"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSection,
  SelectTrigger,
} from "@/components/ui/select";

const regions = [
  {
    name: "Americas",
    zones: [
      { id: "America/Los_Angeles", name: "Los Angeles" },
      { id: "America/Denver", name: "Denver" },
      { id: "America/Chicago", name: "Chicago" },
      { id: "America/New_York", name: "New York" },
      { id: "America/Sao_Paulo", name: "São Paulo" },
    ],
  },
  {
    name: "Europe",
    zones: [
      { id: "Europe/London", name: "London" },
      { id: "Europe/Paris", name: "Paris" },
      { id: "Europe/Berlin", name: "Berlin" },
      { id: "Europe/Istanbul", name: "Istanbul" },
    ],
  },
  {
    name: "Asia and Pacific",
    zones: [
      { id: "Asia/Dubai", name: "Dubai" },
      { id: "Asia/Kolkata", name: "Kolkata" },
      { id: "Asia/Singapore", name: "Singapore" },
      { id: "Asia/Tokyo", name: "Tokyo" },
      { id: "Australia/Sydney", name: "Sydney" },
    ],
  },
];

export function SelectSectionsDemo() {
  return (
    <div className="w-full max-w-[340px]">
      <Select defaultValue="Europe/London">
        <SelectLabel>Time zone</SelectLabel>
        <SelectTrigger />
        <SelectContent>
          {regions.map((region) => (
            <SelectSection
              key={region.name}
              id={region.name}
              title={region.name}
            >
              {region.zones.map((zone) => (
                <SelectItem key={zone.id} id={zone.id}>
                  {zone.name}
                </SelectItem>
              ))}
            </SelectSection>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
