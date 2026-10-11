import { type CnOptions, cn as mergeClasses } from "tailwind-variants";

export function cn(...classes: CnOptions): string {
  return mergeClasses(...classes) ?? "";
}
