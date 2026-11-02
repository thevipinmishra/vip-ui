"use client";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  type DialogSize,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sizes: { size: DialogSize; label: string; use: string }[] = [
  { size: "sm", label: "Small", use: "Use for a short question." },
  { size: "md", label: "Medium", use: "Use for most forms and messages." },
  { size: "lg", label: "Large", use: "Use for forms with two columns." },
  { size: "xl", label: "Extra large", use: "Use for tables and previews." },
  {
    size: "full",
    label: "Full screen",
    use: "Use for a long task. On phones, the dialog fills the screen.",
  },
];

export function DialogSizesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sizes.map(({ size, label, use }) => (
        <Dialog key={size}>
          <DialogTrigger variant="outline">{label}</DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{label}</DialogTitle>
              <DialogDescription>{use}</DialogDescription>
              <DialogClose />
            </DialogHeader>
            <DialogBody className="grid">
              <div className="grid min-h-28 place-items-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                Content
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose variant="outline">Close</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
