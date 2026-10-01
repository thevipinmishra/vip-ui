"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ButtonBasicDemo() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onPress={() => setPressed(true)}>Save changes</Button>
      <output className="text-xs text-muted-foreground">
        {pressed ? "Changes saved." : "Press the button to save."}
      </output>
    </div>
  );
}
