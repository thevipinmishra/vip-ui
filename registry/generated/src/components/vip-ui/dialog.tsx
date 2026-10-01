"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext, useState } from "react";
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
import { X } from "reicon-react";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";

type DialogAnimation = "unmounted" | "hidden" | "visible";

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

  // Controlled changes don't call onOpenChange. Sync before rendering children
  // so an external close retains the overlay for its exit animation.
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
  const { animation, complete } = useContext(DialogAnimationContext);
  return (
    <ModalOverlay
      {...overlayProps}
      isExiting={animation === "hidden"}
      render={(domProps) => (
        <motion.div
          {...(domProps as HTMLMotionProps<"div">)}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          animate={animation === "unmounted" ? "hidden" : animation}
          transition={{
            duration: reduceMotion ? 0 : 0.22,
            ease: [0.23, 1, 0.32, 1],
          }}
          onAnimationComplete={complete}
        />
      )}
      data-slot="dialog-overlay"
      className={composeRenderProps(overlayProps?.className, (className) =>
        cn(
          "fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/45 p-4",
          className,
        ),
      )}
    >
      <Modal
        {...modalProps}
        render={(domProps) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }
            }
            animate={
              animation === "hidden"
                ? reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 5, scale: 0.99 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{
              duration: reduceMotion ? 0 : animation === "hidden" ? 0.16 : 0.22,
              ease: [0.23, 1, 0.32, 1],
            }}
          />
        )}
        data-slot={modalSlot}
        className={cn(
          "w-full max-w-md rounded-xl bg-card p-6 text-card-foreground shadow-[var(--shadow-float)] outline-none ring-1 ring-border/70 sm:p-7",
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
      className={cn("text-xl font-semibold tracking-[-0.04em]", className)}
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
        "mt-2 block text-[13px] leading-6 text-muted-foreground",
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
      className={cn("mt-6 flex justify-end gap-2", className)}
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
      {children ?? <X size={17} aria-hidden="true" />}
    </Button>
  );
}
