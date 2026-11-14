"use client";

import {
  ArrowSquareOutIcon,
  ArrowsOutSimpleIcon,
  CodeIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { PreviewFrame } from "@/components/docs/preview-frame";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Spinner } from "@/components/ui/spinner";
import type { Block } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { useBlockPreview } from "./block-preview";
import {
  releasePreview,
  requestPreview,
  retainPreview,
} from "./preview-scheduler";

const frameWidth = 1024;
const frameHeight = 640;

export function BlockCard({ block }: { block: Block }) {
  const preview = useBlockPreview();
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [inRange, setInRange] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = `/blocks/${block.name}`;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const resize = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / frameWidth),
    );
    const range = new IntersectionObserver(
      ([entry]) => setInRange(entry.isIntersecting),
      { rootMargin: "800px 0px" },
    );
    resize.observe(stage);
    range.observe(stage);
    return () => {
      resize.disconnect();
      range.disconnect();
      releasePreview(stage);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !inRange || mounted) return;
    return requestPreview(stage, () => setMounted(true));
  }, [inRange, mounted]);

  const handleLoad = () => {
    const stage = stageRef.current;
    if (!stage) return;
    setLoaded(true);
    retainPreview(stage, () => {
      setMounted(false);
      setLoaded(false);
    });
  };

  return (
    <article className="group relative isolate flex w-full min-w-0 flex-col rounded-2xl bg-card shadow-(--shadow-card) ring-1 ring-border/70 outline-offset-2 outline-transparent transition-[box-shadow,outline-color] duration-300 ease-out-quint hover:shadow-(--shadow-float) has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-ring has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-ring">
      <div
        ref={stageRef}
        className="relative aspect-16/10 overflow-hidden rounded-t-2xl bg-muted/50"
      >
        <div
          inert
          aria-hidden="true"
          className="absolute inset-0 [content-visibility:auto]"
        >
          {!loaded && mounted && (
            <div className="absolute inset-0 grid place-items-center transition-opacity delay-500 duration-300 ease-out-quint starting:opacity-0">
              <Spinner size="sm" decorative className="text-muted-foreground" />
            </div>
          )}
          {mounted && scale > 0 && (
            <div
              className={cn(
                "absolute inset-s-0 top-0 origin-top-left transition-opacity duration-500 ease-out-quint rtl:origin-top-right",
                loaded ? "opacity-100" : "opacity-0",
              )}
              style={{
                width: frameWidth,
                height: frameHeight,
                transform: `scale(${scale})`,
              }}
            >
              <PreviewFrame
                src={src}
                title={`${block.title} preview`}
                height={frameHeight}
                scrolling="no"
                loading="eager"
                onLoad={handleLoad}
              />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => preview(block)}
          aria-label={`Preview ${block.title}`}
          className="absolute inset-0 z-10 grid place-items-center rounded-t-2xl outline-none transition-colors duration-200 ease-out-quint hover:bg-foreground/5 focus-visible:bg-foreground/5"
        >
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-(--shadow-card) ring-1 ring-border/70 backdrop-blur-sm transition-opacity duration-200 ease-out-quint group-focus-within:opacity-100 group-hover:opacity-100"
          >
            <ArrowsOutSimpleIcon size={14} />
            Preview
          </span>
        </button>
      </div>
      <div className="flex min-h-12 items-center gap-2 border-t border-border/70 py-1.5 pe-2 ps-4 sm:ps-5">
        <h4 className="min-w-0 flex-1 truncate text-[13px] font-medium">
          <button
            type="button"
            onClick={() => preview(block)}
            className="block w-full truncate rounded-sm text-start outline-none focus-visible:underline focus-visible:underline-offset-4"
          >
            {block.title}
          </button>
        </h4>
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
          {block.name}
        </span>
        <Button
          variant="minimal"
          size="sm"
          iconOnly
          aria-label={`Code and install for ${block.title}`}
          onPress={() => preview(block, "code")}
        >
          <CodeIcon size={15} aria-hidden="true" />
        </Button>
        <ButtonLink
          href={src}
          target="_blank"
          rel="noopener"
          variant="minimal"
          size="sm"
          iconOnly
          aria-label={`Open ${block.title} in a new tab`}
        >
          <ArrowSquareOutIcon size={15} aria-hidden="true" />
        </ButtonLink>
      </div>
    </article>
  );
}
