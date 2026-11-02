"use client";

import { XIcon } from "@phosphor-icons/react";
import { createContext, type ReactNode, useContext, useRef } from "react";
import { mergeRefs } from "react-aria/mergeRefs";
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
import { tv } from "tailwind-variants";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";
import { SizeProvider } from "./size";

const CloseContext = createContext<(() => void) | null>(null);

const scrollEdgeCss =
  "@keyframes vip-edge-start{from{border-top-color:transparent}to{border-top-color:var(--color-border)}}@keyframes vip-edge-end{from{border-bottom-color:var(--color-border)}to{border-bottom-color:transparent}}@supports (animation-timeline:scroll()){[data-scroll-edges]{animation:vip-edge-start linear both,vip-edge-end linear both;animation-timeline:scroll(self),scroll(self);animation-range:0px 1rem,calc(100% - 1rem) 100%}}";

const dialogModalStyles = tv({
  base: [
    "relative flex max-h-[calc(var(--visual-viewport-height,100dvh)-1rem)] w-full min-w-0 max-w-full flex-col overflow-clip rounded-t-2xl bg-card text-card-foreground [overflow-wrap:anywhere] shadow-[var(--shadow-float)] outline-none ring-1 ring-border/70 forced-colors:border sm:max-h-[calc(var(--visual-viewport-height,100dvh)-2rem)] sm:rounded-xl",
    "transition-[opacity,translate,scale] duration-260 ease-out-quint max-sm:duration-320 max-sm:ease-[cubic-bezier(0.32,0.72,0,1)]",
    "entering:opacity-0 motion-safe:max-sm:entering:translate-y-full motion-safe:sm:entering:translate-y-3 motion-safe:sm:entering:scale-96",
    "exiting:opacity-0 exiting:duration-180 max-sm:exiting:duration-240 motion-safe:max-sm:exiting:translate-y-full motion-safe:sm:exiting:translate-y-1.5 motion-safe:sm:exiting:scale-[0.985]",
  ],
  variants: {
    size: {
      sm: "sm:max-w-sm",
      md: "sm:max-w-md",
      lg: "sm:max-w-xl",
      xl: "sm:max-w-3xl",
      full: "h-[var(--visual-viewport-height,100dvh)] max-h-[var(--visual-viewport-height,100dvh)] rounded-none sm:h-[calc(var(--visual-viewport-height,100dvh)-2rem)] sm:max-w-none",
    },
  },
  defaultVariants: { size: "md" },
});

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

function nudge(panel: HTMLElement | null) {
  if (!panel || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const phone = !matchMedia("(min-width: 40rem)").matches;
  panel.animate(
    phone
      ? { translate: ["0 0", "0 -0.375rem", "0 0"] }
      : { scale: ["1", "1.015", "1"] },
    { duration: 320, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
  );
}

export function Dialog(props: DialogTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}

export function DialogTrigger({ className, ...props }: ButtonProps) {
  return <Button {...props} data-slot="dialog-trigger" className={className} />;
}

export interface DialogContentProps extends Omit<AriaDialogProps, "children"> {
  ref?: React.Ref<HTMLElement>;
  children: ReactNode | ((renderProps: { close: () => void }) => ReactNode);
  size?: DialogSize;
  overlayProps?: Omit<ModalOverlayProps, "children" | "render">;
  modalProps?: Omit<React.ComponentProps<typeof Modal>, "children" | "render">;
  modalSlot?: string;
}

export function DialogContent({
  children,
  className,
  size = "md",
  overlayProps,
  modalProps,
  modalSlot = "dialog-modal",
  ...props
}: DialogContentProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isDismissable =
    props.role === "alertdialog"
      ? false
      : (overlayProps?.isDismissable ?? true);

  return (
    <ModalOverlay
      {...overlayProps}
      isDismissable={isDismissable}
      data-slot="dialog-overlay"
      onPointerDown={(event) => {
        overlayProps?.onPointerDown?.(event);
        if (!isDismissable && event.target === event.currentTarget)
          nudge(panelRef.current);
      }}
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
        ref={mergeRefs(panelRef, modalProps?.ref)}
        data-slot={modalSlot}
        data-size={size}
        className={composeRenderProps(modalProps?.className, (className) =>
          dialogModalStyles({ size, className }),
        )}
      >
        <AriaDialog
          {...props}
          data-slot="dialog-content"
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] outline-none sm:p-6",
            size === "full" &&
              "pt-[max(1.25rem,env(safe-area-inset-top))] sm:pt-6",
            className,
          )}
        >
          {({ close }) => (
            <CloseContext.Provider value={close}>
              <SizeProvider size={undefined}>
                {typeof children === "function"
                  ? children({ close })
                  : children}
              </SizeProvider>
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
        "grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-start",
        "*:data-[slot=dialog-close]:col-start-2 *:data-[slot=dialog-close]:row-start-1 *:data-[slot=dialog-close]:-my-2 *:data-[slot=dialog-close]:ms-4 *:data-[slot=dialog-close]:-me-3 *:data-[slot=dialog-description]:col-span-full",
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

export function DialogBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <style href="vip-scroll-edges" precedence="default">
        {scrollEdgeCss}
      </style>
      <div
        {...props}
        data-slot="dialog-body"
        data-scroll-edges=""
        className={cn(
          "-mx-5 mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain border-y border-transparent px-5 py-2 sm:-mx-6 sm:px-6",
          className,
        )}
      />
    </>
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
      className={cn(
        "mt-5 flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end [[data-slot=dialog-body]+&]:mt-3",
        className,
      )}
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
