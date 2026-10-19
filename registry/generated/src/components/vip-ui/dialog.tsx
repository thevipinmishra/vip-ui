"use client";

import { XIcon } from "@phosphor-icons/react";
import { createContext, type ReactNode, useContext } from "react";
import {
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
  DialogTrigger as AriaDialogTrigger,
  composeRenderProps,
  type DialogTriggerProps,
  Heading,
  type HeadingProps,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";
import { SizeProvider } from "./size";

const CloseContext = createContext<(() => void) | null>(null);

export function Dialog(props: DialogTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}

export function DialogTrigger({ className, ...props }: ButtonProps) {
  return <Button {...props} data-slot="dialog-trigger" className={className} />;
}

export interface DialogContentProps extends Omit<AriaDialogProps, "children"> {
  ref?: React.Ref<HTMLElement>;
  children: ReactNode;
  overlayProps?: Omit<ModalOverlayProps, "children" | "render">;
  modalProps?: Omit<React.ComponentProps<typeof Modal>, "children" | "render">;
  modalSlot?: string;
}

export function DialogContent({
  children,
  className,
  overlayProps,
  modalProps,
  modalSlot = "dialog-modal",
  ...props
}: DialogContentProps) {
  return (
    <ModalOverlay
      {...overlayProps}
      isDismissable={
        props.role === "alertdialog"
          ? false
          : (overlayProps?.isDismissable ?? true)
      }
      data-slot="dialog-overlay"
      className={composeRenderProps(overlayProps?.className, (className) =>
        cn(
          "fixed inset-x-0 top-0 z-50 grid h-[var(--visual-viewport-height,100dvh)] items-end overflow-clip bg-foreground/40 backdrop-blur-sm transition-[background-color,backdrop-filter] duration-240 ease-out-quint dark:bg-foreground/20 sm:place-items-center sm:p-4",
          "entering:bg-transparent entering:backdrop-blur-none exiting:bg-transparent exiting:backdrop-blur-none exiting:duration-160",
          className,
        ),
      )}
    >
      <Modal
        {...modalProps}
        data-slot={modalSlot}
        className={composeRenderProps(modalProps?.className, (className) =>
          cn(
            "relative max-h-[calc(var(--visual-viewport-height,100dvh)-1rem)] w-full min-w-0 max-w-full overflow-y-auto overscroll-contain rounded-t-2xl bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-card-foreground [overflow-wrap:anywhere] shadow-[var(--shadow-float)] outline-none ring-1 ring-border/70 forced-colors:border sm:max-h-[calc(var(--visual-viewport-height,100dvh)-2rem)] sm:max-w-md sm:rounded-xl sm:p-6",
            "transition-[opacity,translate,scale] duration-260 ease-out-quint max-sm:duration-320 max-sm:ease-[cubic-bezier(0.32,0.72,0,1)]",
            "entering:opacity-0 motion-safe:max-sm:entering:translate-y-full motion-safe:sm:entering:translate-y-3 motion-safe:sm:entering:scale-96",
            "exiting:opacity-0 exiting:duration-180 max-sm:exiting:duration-240 motion-safe:max-sm:exiting:translate-y-full motion-safe:sm:exiting:translate-y-1.5 motion-safe:sm:exiting:scale-[0.985]",
            className,
          ),
        )}
      >
        <AriaDialog
          {...props}
          data-slot="dialog-content"
          className={cn("outline-none", className)}
        >
          {({ close }) => (
            <CloseContext.Provider value={close}>
              <SizeProvider size={undefined}>{children}</SizeProvider>
            </CloseContext.Provider>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="dialog-header"
      className={cn(
        "flex items-start justify-between gap-4 *:data-[slot=dialog-close]:-my-2 *:data-[slot=dialog-close]:-me-3",
        className,
      )}
    />
  );
}

export function DialogTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading
      {...props}
      slot="title"
      data-slot="dialog-title"
      className={cn(
        "min-w-0 text-xl font-semibold tracking-[-0.04em] [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function DialogDescription({ className, ...props }: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="dialog-description"
      className={cn(
        "mt-2 block text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="dialog-footer"
      className={cn("mt-5 flex flex-wrap justify-end gap-2", className)}
    />
  );
}

export function DialogClose({
  className,
  children,
  onPress,
  ...props
}: ButtonProps) {
  const close = useContext(CloseContext);
  return (
    <Button
      {...props}
      data-slot="dialog-close"
      variant={props.variant ?? "ghost"}
      iconOnly={props.iconOnly ?? !children}
      aria-label={
        props["aria-label"] ?? (children ? undefined : "Close dialog")
      }
      onPress={(event) => {
        onPress?.(event);
        close?.();
      }}
      className={className}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </Button>
  );
}
