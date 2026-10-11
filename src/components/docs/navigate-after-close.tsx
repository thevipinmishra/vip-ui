"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef } from "react";

export function useNavigateAfterClose(close: () => void) {
  const router = useRouter();
  const pendingHref = useRef<string | null>(null);

  return {
    onNavigate: (event: { preventDefault: () => void }, href: string) => {
      event.preventDefault();
      pendingHref.current = href;
      close();
    },
    onClosed: () => {
      const href = pendingHref.current;
      pendingHref.current = null;
      if (href) router.push(href);
    },
  };
}

export function OnUnmount({ onUnmount }: { onUnmount: () => void }) {
  const unmount = useEffectEvent(onUnmount);
  useEffect(() => () => unmount(), []);
  return null;
}
