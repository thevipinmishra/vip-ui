"use client";

import { useState } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";

const options = ["Email", "SMS", "Push"];

export function ToggleButtonProjectsDemo() {
  const [selected, setSelected] = useState(new Set(["Email"]));

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <ToggleButton
          key={option}
          variant="ghost"
          isSelected={selected.has(option)}
          onChange={(isSelected) =>
            setSelected((current) => {
              const next = new Set(current);
              if (isSelected) next.add(option);
              else next.delete(option);
              return next;
            })
          }
        >
          {option}
        </ToggleButton>
      ))}
    </div>
  );
}
