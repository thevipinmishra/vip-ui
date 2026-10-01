"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "reicon-react";
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  const [action, setAction] = useState("");

  return (
    <div className="flex w-full max-w-[590px] flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onPress={() => setAction("Created a project")}>
          Create project <ArrowRight size={16} aria-hidden="true" />
        </Button>
        <Button
          variant="secondary"
          onPress={() => setAction("Saved your changes")}
        >
          Save changes
        </Button>
        <Button variant="outline" onPress={() => setAction("Opened settings")}>
          Open settings
        </Button>
        <Button variant="ghost" onPress={() => setAction("Viewed details")}>
          View details
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 border-t border-border/70 pt-6">
        <Button size="sm" onPress={() => setAction("Added an item")}>
          Add item
        </Button>
        <Button
          size="lg"
          variant="outline"
          onPress={() => setAction("Continued")}
        >
          Continue
        </Button>
        <Button
          size="icon"
          variant="outline"
          aria-label="Add new item"
          onPress={() => setAction("Added a new item")}
        >
          <Plus size={17} aria-hidden="true" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onPress={() => setAction("Delete requested")}
        >
          Delete item
        </Button>
        <Button isDisabled>Unavailable</Button>
      </div>
      <output className="block min-h-5 text-xs text-muted-foreground">
        {action || "Choose an action to try the buttons."}
      </output>
    </div>
  );
}
