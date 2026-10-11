"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectError,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

export function SelectInvalidDemo() {
  const [selected, setSelected] = useState("");

  return (
    <Select
      value={selected}
      onValueChange={setSelected}
      isInvalid={!selected}
      className="w-full max-w-[340px]"
    >
      <SelectLabel>Workspace</SelectLabel>
      <SelectTrigger />
      <SelectError>Choose a workspace to continue.</SelectError>
      <SelectContent>
        <SelectItem id="personal">Personal</SelectItem>
        <SelectItem id="team">Team</SelectItem>
      </SelectContent>
    </Select>
  );
}
