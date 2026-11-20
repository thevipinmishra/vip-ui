"use client";

import {
  ArrowSquareOutIcon,
  ArrowsOutSimpleIcon,
  CodeIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { NewBadge } from "@/components/docs/new-badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import type { Block } from "@/lib/blocks";
import { useBlockPreview } from "./block-preview";

const sizes = "(min-width: 1280px) 32vw, (min-width: 640px) 46vw, 100vw";

export function BlockCard({
  block,
  priority = false,
}: {
  block: Block;
  priority?: boolean;
}) {
  const preview = useBlockPreview();
  const src = `/blocks/${block.name}`;
  const poster = `/blocks/posters/${block.name}`;

  return (
    <article className="group relative isolate flex w-full min-w-0 flex-col rounded-2xl bg-card shadow-(--shadow-card) ring-1 ring-border/70 outline-offset-2 outline-transparent transition-[box-shadow,outline-color] duration-300 ease-out-quint hover:shadow-(--shadow-float) has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-ring has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-ring">
      <div className="relative aspect-16/10 overflow-hidden rounded-t-2xl bg-muted/50">
        <Image
          src={`${poster}-light.jpg`}
          alt=""
          fill
          sizes={sizes}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover object-top dark:hidden"
        />
        <Image
          src={`${poster}-dark.jpg`}
          alt=""
          fill
          sizes={sizes}
          fetchPriority={priority ? "high" : undefined}
          className="hidden object-cover object-top dark:block"
        />
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
        <h4 className="flex min-w-0 flex-1 items-center gap-2 text-[13px] font-medium">
          <button
            type="button"
            onClick={() => preview(block)}
            className="flex min-h-6 min-w-0 items-center rounded-sm text-start outline-none focus-visible:underline focus-visible:underline-offset-4"
          >
            <span className="truncate">{block.title}</span>
          </button>
          <NewBadge added={block.added} />
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
