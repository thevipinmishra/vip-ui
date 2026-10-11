"use client";

import { XIcon } from "@phosphor-icons/react";
import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
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
import { easeOut } from "./motion";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";

type DialogAnimation = "unmounted" | "hidden" | "visible";

const mobileQuery = "(max-width: 639px)";

function subscribeToMobile(onChange: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isMobileViewport() {
  return window.matchMedia(mobileQuery).matches;
}

const CloseContext = createContext<(() => void) | null>(null);
const DialogAnimationContext = createContext<{
  animation: DialogAnimation;
  complete: (state: string) => void;
}>({ animation: "unmounted", complete: () => {} });

export function Dialog({
  defaultOpen,
  isOpen,
  onOpenChange,
  ...props
}: DialogTriggerProps) {
  const [animation, setAnimation] = useState<DialogAnimation>(
    defaultOpen || isOpen ? "visible" : "unmounted",
  );
  const [previousIsOpen, setPreviousIsOpen] = useState(isOpen);

  if (isOpen !== previousIsOpen) {
    setPreviousIsOpen(isOpen);
    if (isOpen !== undefined) setAnimation(isOpen ? "visible" : "hidden");
  }

  return (
    <DialogAnimationContext.Provider
      value={{
        animation,
        complete: (state) => {
          if (state === "hidden") {
            setAnimation((current) =>
              current === "hidden" ? "unmounted" : current,
            );
          }
        },
      }}
    >
      <AriaDialogTrigger
        {...props}
        defaultOpen={defaultOpen}
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (isOpen === undefined) setAnimation(open ? "visible" : "hidden");
          onOpenChange?.(open);
        }}
      />
    </DialogAnimationContext.Provider>
  );
}

export function DialogTrigger({ className, ...props }: ButtonProps) {
  return <Button {...props} data-slot="dialog-trigger" className={className} />;
}

export interface DialogContentProps extends Omit<AriaDialogProps, "children"> {
  ref?: React.Ref<HTMLElement>;
  children: ReactNode;
  overlayProps?: Omit<ModalOverlayProps, "children" | "render" | "isExiting">;
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
  const reduceMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    isMobileViewport,
    () => false,
  );
  const { animation, complete } = useContext(DialogAnimationContext);
  return (
    <ModalOverlay
      {...overlayProps}
      isDismissable={
        props.role === "alertdialog"
          ? false
          : (overlayProps?.isDismissable ?? true)
      }
      isExiting={animation === "hidden"}
      data-slot="dialog-overlay"
      className={composeRenderProps(overlayProps?.className, (className) =>
        cn(
          "fixed inset-x-0 top-0 z-50 grid h-[var(--visual-viewport-height,100dvh)] items-end overflow-y-auto sm:place-items-center sm:p-4",
          className,
        ),
      )}
    >
      <motion.div
        aria-hidden="true"
        data-slot="dialog-backdrop"
        className="pointer-events-none fixed inset-0 bg-foreground/40 backdrop-blur-sm dark:bg-foreground/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: animation === "hidden" ? 0 : 1 }}
        transition={{
          duration: reduceMotion ? 0.12 : animation === "hidden" ? 0.16 : 0.24,
          ease: easeOut,
        }}
      />
      <Modal
        {...modalProps}
        render={(domProps) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : isMobile
                  ? { opacity: 0, y: "100%" }
                  : { opacity: 0, y: 12, scale: 0.96 }
            }
            animate={
              animation === "hidden"
                ? reduceMotion
                  ? { opacity: 0 }
                  : isMobile
                    ? { opacity: 0, y: "100%", scale: 1 }
                    : { opacity: 0, y: 6, scale: 0.985 }
                : { opacity: 1, y: isMobile ? "0%" : 0, scale: 1 }
            }
            transition={{
              duration: reduceMotion
                ? 0.12
                : isMobile
                  ? animation === "hidden"
                    ? 0.24
                    : 0.32
                  : animation === "hidden"
                    ? 0.18
                    : 0.26,
              ease: easeOut,
            }}
            onAnimationComplete={() => {
              if (animation === "hidden") complete("hidden");
            }}
          />
        )}
        data-slot={modalSlot}
        className={cn(
          "relative max-h-[calc(var(--visual-viewport-height,100dvh)-1rem)] w-full min-w-0 max-w-full overflow-y-auto overscroll-contain rounded-t-2xl bg-card p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-card-foreground shadow-[var(--shadow-float)] outline-none ring-1 ring-border/70 forced-colors:border sm:max-h-[calc(var(--visual-viewport-height,100dvh)-2rem)] sm:max-w-md sm:rounded-xl sm:p-7",
          modalProps?.className,
        )}
      >
        <AriaDialog
          {...props}
          data-slot="dialog-content"
          className={cn("outline-none", className)}
        >
          {({ close }) => (
            <CloseContext.Provider value={close}>
              {children}
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
      className={cn("flex items-start justify-between gap-4", className)}
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
      className={cn("mt-6 flex flex-wrap justify-end gap-2", className)}
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
      size={props.size ?? (children ? "default" : "icon")}
      aria-label={
        props["aria-label"] ?? (children ? undefined : "Close dialog")
      }
      onPress={(event) => {
        onPress?.(event);
        close?.();
      }}
      className={className}
    >
      {children ?? <XIcon size={17} aria-hidden="true" />}
    </Button>
  );
}
