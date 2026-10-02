"use client";

import { useState } from "react";
import { Check } from "reicon-react";
import { Button } from "@/components/ui/button";

export function ButtonBasicDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <Button onPress={() => setSaved(true)} isDisabled={saved}>
      {saved && <Check size={16} aria-hidden="true" />}
      <span aria-live="polite">{saved ? "Saved" : "Save changes"}</span>
    </Button>
  );
}
