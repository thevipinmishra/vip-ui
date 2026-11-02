"use client";

import { PulseIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  Stat,
  StatDetail,
  StatIcon,
  StatLabel,
  StatValue,
} from "@/components/ui/stat";

const readings = [1284, 1302, 1297, 1331, 1318, 1356, 1349, 1372];

export function StatLiveDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % readings.length),
      2200,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <Stat className="w-full max-w-xs">
      <StatIcon className="text-success">
        <PulseIcon />
      </StatIcon>
      <StatLabel>Visitors online</StatLabel>
      <StatValue>
        <AnimatedNumber value={readings[index]} variant="slide" />
      </StatValue>
      <StatDetail>Updates every few seconds</StatDetail>
    </Stat>
  );
}
