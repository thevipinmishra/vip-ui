"use client";

import { type Ref, useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PreviewFrameHandle {
  reload: () => void;
}

export function PreviewFrame({
  src,
  title,
  height,
  className,
  ref,
}: {
  src: string;
  title: string;
  height: number;
  className?: string;
  ref?: Ref<PreviewFrameHandle>;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useImperativeHandle(ref, () => ({
    reload: () => frameRef.current?.contentWindow?.location.reload(),
  }));

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const root = document.documentElement;
    const sync = () => {
      try {
        frame.contentDocument?.documentElement.classList.toggle(
          "dark",
          root.classList.contains("dark"),
        );
      } catch {}
    };
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    frame.addEventListener("load", sync);
    sync();
    return () => {
      observer.disconnect();
      frame.removeEventListener("load", sync);
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      loading="lazy"
      style={{ height }}
      className={cn("block w-full border-0 bg-background", className)}
    />
  );
}
