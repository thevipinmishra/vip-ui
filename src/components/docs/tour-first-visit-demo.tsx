"use client";

import { NotePencilIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tour, type TourStep, TourTarget, useTour } from "@/components/ui/tour";

const steps: TourStep[] = [
  {
    id: "today",
    title: "Start from Today",
    description: "Your notes, tasks, and meetings for the day sit in one list.",
  },
  {
    id: "capture",
    title: "Capture a thought",
    description: "Press N anywhere to add a note without leaving the page.",
  },
  {
    id: "search",
    title: "Search everything",
    description: "Titles, body text, and comments all match the search.",
    placement: "bottom end",
  },
];

const storageKey = "vip-ui-tour-first-visit";

function hasSeen() {
  try {
    return window.localStorage.getItem(storageKey) === "done";
  } catch {
    return false;
  }
}

function remember() {
  try {
    window.localStorage.setItem(storageKey, "done");
  } catch {}
}

export function TourFirstVisitDemo() {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    setSeen(hasSeen());
  }, []);

  return (
    <Tour
      steps={steps}
      spotlight={false}
      onComplete={() => {
        remember();
        setSeen(true);
      }}
      onSkip={() => {
        remember();
        setSeen(true);
      }}
    >
      <FirstVisit seen={seen} onSeenChange={setSeen} />
    </Tour>
  );
}

function FirstVisit({
  seen,
  onSeenChange,
}: {
  seen: boolean;
  onSeenChange: (seen: boolean) => void;
}) {
  const tour = useTour();
  const rootRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || seen || started.current) return;
    started.current = true;
    tour.start();
  }, [seen, tour, visible]);

  return (
    <div ref={rootRef} className="grid w-full max-w-md gap-3">
      <div className="grid gap-2 rounded-xl border border-border bg-card p-3 shadow-(--shadow-card)">
        <TourTarget id="today">
          <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm font-medium">
            Today · 3 notes, 2 tasks
          </div>
        </TourTarget>
        <div className="flex flex-wrap gap-2">
          <TourTarget id="capture">
            <Button size="sm">
              <NotePencilIcon aria-hidden="true" />
              New note
            </Button>
          </TourTarget>
          <TourTarget id="search">
            <Button variant="outline" size="sm">
              Search
            </Button>
          </TourTarget>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onPress={() => {
            started.current = true;
            try {
              window.localStorage.removeItem(storageKey);
            } catch {}
            onSeenChange(false);
            tour.start();
          }}
        >
          Reset
        </Button>
        <p className="text-xs text-muted-foreground">
          {seen ? "Seen on this device." : "First visit."}
        </p>
      </div>
    </div>
  );
}
