"use client";

import { usePathname } from "next/navigation";
import { ToastViewport } from "@/components/ui/toast";

export function AppToastViewport() {
  // The theme studio mounts the same queue inside its scoped preview instead.
  return usePathname() === "/themes" ? null : <ToastViewport />;
}
