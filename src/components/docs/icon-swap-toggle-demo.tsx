"use client";

import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { IconSwap } from "@/components/ui/icon-swap";
import { ToggleButton } from "@/components/ui/toggle-button";

export function IconSwapToggleDemo() {
  const [muted, setMuted] = useState(false);

  return (
    <ToggleButton
      iconOnly
      aria-label="Mute"
      isSelected={muted}
      onChange={setMuted}
    >
      <IconSwap contentKey={muted ? "muted" : "sound"}>
        {muted ? <SpeakerSlashIcon /> : <SpeakerHighIcon />}
      </IconSwap>
    </ToggleButton>
  );
}
