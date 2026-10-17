"use client";

import { createContext, type ReactNode, useContext } from "react";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

const SizeContext = createContext<Size | undefined>(undefined);

export function useSize(size?: Size) {
  const inherited = useContext(SizeContext);
  return size ?? inherited;
}

export function SizeProvider({
  size,
  children,
}: {
  size: Size | undefined;
  children: ReactNode;
}) {
  return <SizeContext value={size}>{children}</SizeContext>;
}
