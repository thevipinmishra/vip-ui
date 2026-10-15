"use client";

import { ClockIcon, MapPinIcon } from "@phosphor-icons/react";
import { useId } from "react";
import { PreviewTrigger } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Popover, PopoverArrow } from "@/components/ui/popover";

export function PopoverPreviewDemo() {
  const nameId = useId();
  return (
    <p className="max-w-sm text-center text-sm leading-6 text-muted-foreground">
      Review requested by{" "}
      <PreviewTrigger>
        <Link href="#maya-chen">@mayachen</Link>
        <Popover
          placement="bottom"
          aria-labelledby={nameId}
          className="w-72 p-4"
        >
          <PopoverArrow />
          <div className="flex items-center gap-3">
            <Avatar name="Maya Chen" />
            <div className="min-w-0">
              <p id={nameId} className="font-semibold leading-5">
                Maya Chen
              </p>
              <p className="text-sm leading-5 text-muted-foreground">
                Design lead · @mayachen
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-5">
            Owns the design system and the pricing page redesign.
          </p>
          <dl className="mt-3 grid gap-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <dt>
                <MapPinIcon size={16} aria-hidden="true" />
                <span className="sr-only">Location</span>
              </dt>
              <dd>Lisbon</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt>
                <ClockIcon size={16} aria-hidden="true" />
                <span className="sr-only">Local time</span>
              </dt>
              <dd>4:12 PM local time</dd>
            </div>
          </dl>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            Message Maya
          </Button>
        </Popover>
      </PreviewTrigger>{" "}
      for the pricing page redesign.
    </p>
  );
}
