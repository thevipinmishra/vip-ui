"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import type { Block } from "@/lib/blocks";
import { BlockPreviewSheet } from "./block-preview-sheet";

export type BlockPreviewView = "preview" | "code";

const BlockPreviewContext = createContext<
  ((block: Block, view?: BlockPreviewView) => void) | null
>(null);

export function useBlockPreview() {
  const preview = useContext(BlockPreviewContext);
  if (!preview) {
    throw new Error(
      "useBlockPreview must be used within BlockPreviewProvider.",
    );
  }
  return preview;
}

export function BlockPreviewProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<{
    block: Block;
    view: BlockPreviewView;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const preview = useCallback(
    (block: Block, view: BlockPreviewView = "preview") => {
      setSelected({ block, view });
      setIsOpen(true);
    },
    [],
  );

  return (
    <BlockPreviewContext.Provider value={preview}>
      {children}
      {selected && (
        <BlockPreviewSheet
          block={selected.block}
          initialView={selected.view}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </BlockPreviewContext.Provider>
  );
}
