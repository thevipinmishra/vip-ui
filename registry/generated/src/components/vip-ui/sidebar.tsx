"use client";

import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import {
  Children,
  type ComponentProps,
  cloneElement,
  createContext,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-aria/mergeRefs";
import { Link as AriaLink, composeRenderProps } from "react-aria-components";
import { springLayout, transitionFor } from "./motion";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";
import { ItemHighlight } from "./item-highlight";
import { ScrollFade } from "./scroll-fade";
import { Sheet, SheetBody, SheetClose, SheetHeader, SheetTitle } from "./sheet";
import { Tooltip, TooltipTrigger } from "./tooltip";

export type SidebarCollapsible = "icon" | "none";
export type SidebarState = "expanded" | "collapsed";

const SIDEBAR_QUERY = 768;

const sidebarFade =
  "transition-opacity delay-100 duration-200 ease-out-quint @3xl/sidebar-shell:in-data-[state=collapsed]:opacity-0 @3xl/sidebar-shell:in-data-[state=collapsed]:delay-0 @3xl/sidebar-shell:in-data-[state=collapsed]:duration-100";

interface SidebarContextValue {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toggle: () => void;
  isMobileOpen: boolean;
  setMobileOpen: (isOpen: boolean) => void;
  state: SidebarState;
  sidebarId: string;
  isWide: boolean;
  isRtl: boolean;
  collapsible: SidebarCollapsible;
  setCollapsible: (collapsible: SidebarCollapsible) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  providerRef: React.RefObject<HTMLDivElement | null>;
}

export interface SidebarHookValue {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toggle: () => void;
  isMobileOpen: boolean;
  setMobileOpen: (isOpen: boolean) => void;
  state: SidebarState;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);
const SidebarRailContext = createContext(false);
const SidebarSheetContext = createContext(false);
const SidebarGroupContext = createContext<string | undefined>(undefined);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error(
      "Sidebar parts must render inside a SidebarProvider. Wrap the layout in <SidebarProvider>.",
    );
  return context;
}

export function useSidebar(): SidebarHookValue {
  const context = useSidebarContext();
  return {
    isOpen: context.isOpen,
    setOpen: context.setOpen,
    toggle: context.toggle,
    isMobileOpen: context.isMobileOpen,
    setMobileOpen: context.setMobileOpen,
    state: context.state,
  };
}

function railHidesFocus(root: HTMLElement | null) {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || !root?.contains(active)) return false;
  const footer = active.closest('[data-slot="sidebar-footer"]');
  if (footer && !footer.querySelector('[data-rail="keep"]')) return true;
  return Boolean(active.closest('[data-slot="sidebar-group-label"]'));
}

export interface SidebarProviderProps extends ComponentProps<"div"> {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  shortcut?: boolean;
}

export function SidebarProvider({
  isOpen: isOpenProp,
  defaultOpen = true,
  onOpenChange,
  shortcut = true,
  className,
  children,
  ref,
  ...props
}: SidebarProviderProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [collapsible, setCollapsible] = useState<SidebarCollapsible>("icon");
  const sidebarId = useId();
  const providerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const open = isOpenProp ?? internalOpen;
  const isOpen = collapsible === "icon" ? open : true;
  const state: SidebarState = isOpen ? "expanded" : "collapsed";

  const setOpen = (next: boolean) => {
    if (next === isOpen) return;
    if (!next) {
      if (collapsible !== "icon") return;
      restoreFocus.current = railHidesFocus(providerRef.current);
    }
    if (isOpenProp === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const toggle = () => setOpen(!isOpen);

  useEffect(() => {
    const node = providerRef.current;
    if (!node) return;
    const update = () => {
      const wide = node.getBoundingClientRect().width >= SIDEBAR_QUERY;
      setIsWide(wide);
      if (wide) setMobileOpen(false);
    };
    update();
    setIsRtl(getComputedStyle(node).direction === "rtl");
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen || !restoreFocus.current) return;
    restoreFocus.current = false;
    triggerRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "b" ||
        !(event.metaKey || event.ctrlKey) ||
        event.altKey ||
        event.shiftKey ||
        event.repeat ||
        event.defaultPrevented
      )
        return;
      if (
        event.target instanceof Element &&
        event.target.closest("input, textarea, select, [contenteditable]")
      )
        return;
      const node = providerRef.current;
      if (!node) return;
      event.preventDefault();
      if (
        node.getBoundingClientRect().width >= SIDEBAR_QUERY &&
        collapsible === "icon"
      )
        setOpen(!isOpen);
      else setMobileOpen((open) => !open);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <SidebarContext
      value={{
        isOpen,
        setOpen,
        toggle,
        isMobileOpen,
        setMobileOpen,
        state,
        sidebarId,
        isWide,
        isRtl,
        collapsible,
        setCollapsible,
        triggerRef,
        providerRef,
      }}
    >
      <div
        {...props}
        ref={mergeRefs(providerRef, ref)}
        data-slot="sidebar-provider"
        data-state={state}
        className={cn(
          "@container/sidebar-shell relative h-full w-full min-w-0 [--sidebar-shift:var(--sidebar-width)] [--sidebar-width:16rem] [--sidebar-width-rail:3.5rem] data-[state=collapsed]:[--sidebar-shift:var(--sidebar-width-rail)]",
          className,
        )}
      >
        <div
          data-slot="sidebar-shell"
          className="relative grid h-full min-h-0 w-full grid-cols-[var(--shell-shift)_minmax(0,1fr)] [--shell-shift:0px] @3xl/sidebar-shell:[--shell-shift:var(--sidebar-shift)] motion-safe:@3xl/sidebar-shell:transition-[grid-template-columns] motion-safe:@3xl/sidebar-shell:duration-350 motion-safe:@3xl/sidebar-shell:ease-spring"
        >
          {children}
        </div>
      </div>
    </SidebarContext>
  );
}

export interface SidebarProps extends ComponentProps<"aside"> {
  collapsible?: SidebarCollapsible;
}

const sidebarStyles =
  "group/sidebar hidden h-svh shrink-0 flex-col overflow-clip border-border/70 bg-card px-0 py-0 @3xl/sidebar-shell:sticky @3xl/sidebar-shell:top-0 @3xl/sidebar-shell:z-20 @3xl/sidebar-shell:flex @3xl/sidebar-shell:self-start @3xl/sidebar-shell:border-e @3xl/sidebar-shell:in-data-[state=expanded]:w-(--sidebar-width) @3xl/sidebar-shell:in-data-[state=collapsed]:w-(--sidebar-width-rail) motion-safe:@3xl/sidebar-shell:transition-[width] motion-safe:@3xl/sidebar-shell:duration-350 motion-safe:@3xl/sidebar-shell:ease-spring";

export function Sidebar({
  collapsible = "icon",
  "aria-label": ariaLabel = "Sidebar",
  className,
  children,
  ...props
}: SidebarProps) {
  const {
    isMobileOpen,
    setMobileOpen,
    isRtl,
    sidebarId,
    isWide,
    isOpen,
    setCollapsible,
  } = useSidebarContext();
  const rail = collapsible === "icon" && !isOpen && isWide;

  useEffect(() => {
    setCollapsible(collapsible);
  }, [collapsible, setCollapsible]);

  return (
    <>
      <aside
        {...props}
        id={sidebarId}
        aria-label={ariaLabel}
        data-slot="sidebar"
        data-collapsible={collapsible}
        className={cn(sidebarStyles, className)}
      >
        <div className="flex h-full min-h-0 w-(--sidebar-width) flex-col">
          <SidebarRailContext value={rail}>{children}</SidebarRailContext>
        </div>
      </aside>
      <Sheet
        isOpen={isMobileOpen}
        onOpenChange={setMobileOpen}
        position={isRtl ? "right" : "left"}
        size="sm"
      >
        <SheetHeader className="flex justify-end">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <SheetBody className="flex min-h-0 flex-1 flex-col overflow-y-hidden px-0 py-0">
          <SidebarSheetContext value={true}>
            <SidebarRailContext value={false}>
              <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            </SidebarRailContext>
          </SidebarSheetContext>
        </SheetBody>
      </Sheet>
    </>
  );
}

export function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="sidebar-header"
      className={cn("flex shrink-0 flex-col gap-2 px-3 pt-3.5 pb-3", className)}
    />
  );
}

export function SidebarContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <ScrollFade
      {...props}
      data-slot="sidebar-content"
      className={cn("min-h-0 flex-1 px-2", className)}
    />
  );
}

export function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="sidebar-footer"
      className={cn(
        "flex shrink-0 flex-col gap-2 px-2 pb-5 transition-[opacity,visibility] delay-100 duration-200 ease-out-quint",
        "@3xl/sidebar-shell:in-data-[state=collapsed]:invisible @3xl/sidebar-shell:in-data-[state=collapsed]:opacity-0 @3xl/sidebar-shell:in-data-[state=collapsed]:delay-0 @3xl/sidebar-shell:in-data-[state=collapsed]:duration-100 @3xl/sidebar-shell:in-data-[state=collapsed]:has-[[data-rail=keep]]:visible @3xl/sidebar-shell:in-data-[state=collapsed]:has-[[data-rail=keep]]:opacity-100",
        className,
      )}
    />
  );
}

export function SidebarGroup({
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: ComponentProps<"section">) {
  const labelId = useId();
  const hasLabel = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === SidebarGroupLabel,
  );
  const labelledBy =
    ariaLabelledBy ?? (hasLabel && !ariaLabel ? labelId : undefined);
  return (
    <SidebarGroupContext value={labelId}>
      <section
        {...props}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        data-slot="sidebar-group"
        className={cn(
          "grid min-w-0 gap-1 py-1 first:pt-0 last:pb-0",
          className,
        )}
      >
        {children}
      </section>
    </SidebarGroupContext>
  );
}

export function SidebarGroupLabel({
  className,
  id,
  children,
  ...props
}: ComponentProps<"h2">) {
  const labelId = useContext(SidebarGroupContext);
  return (
    <h2
      {...props}
      id={id ?? labelId}
      data-slot="sidebar-group-label"
      className={cn(
        "relative min-w-0 px-2.75 pb-1 text-xs font-semibold text-muted-foreground wrap-anywhere before:pointer-events-none before:absolute before:start-3 before:top-2 before:h-px before:w-4 before:bg-border before:opacity-0 before:transition-opacity before:duration-100 before:ease-out-quint forced-colors:before:bg-[CanvasText] in-[[data-slot=sidebar-group]:first-child]:before:hidden @3xl/sidebar-shell:in-data-[state=collapsed]:before:opacity-100 @3xl/sidebar-shell:in-data-[state=collapsed]:before:delay-150 @3xl/sidebar-shell:in-data-[state=collapsed]:before:duration-200",
        className,
      )}
    >
      <span className={cn("block", sidebarFade)}>{children}</span>
    </h2>
  );
}

export interface SidebarMenuProps extends ComponentProps<"nav"> {
  children: ReactNode;
}

export function SidebarMenu({
  className,
  children,
  ...props
}: SidebarMenuProps) {
  return (
    <nav
      {...props}
      data-slot="sidebar-menu"
      className={cn("relative isolate min-w-0", className)}
    >
      <ItemHighlight placement="under" items="a" />
      <ul className="grid min-w-0 gap-0.5">{children}</ul>
    </nav>
  );
}

export interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  badge?: ReactNode;
  isCurrent?: boolean;
  tooltip?: string;
  onPress?: ButtonProps["onPress"];
  children: ReactNode;
  className?: string;
}

const sidebarItemStyles =
  "group/item relative isolate flex min-h-10 w-full min-w-0 items-center gap-3 overflow-clip rounded-md ps-2.75 pe-2.5 text-sm font-medium text-muted-foreground outline-transparent transition-[color,background-color,outline-color,outline-offset] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-transparent aria-[current=page]:text-accent-foreground aria-[current=page]:focus-visible:text-primary-foreground forced-colors:aria-[current=page]:outline-1 forced-colors:aria-[current=page]:-outline-offset-1 forced-colors:aria-[current=page]:outline-[Highlight] forced-colors:focus-visible:outline-2 forced-colors:focus-visible:-outline-offset-2 forced-colors:focus-visible:outline-[Highlight] [&_svg:not([class*='size-'])]:size-4.5";

const sidebarItemRowStyles =
  "w-full min-w-0 motion-safe:@3xl/sidebar-shell:transition-[width] motion-safe:@3xl/sidebar-shell:duration-350 motion-safe:@3xl/sidebar-shell:ease-spring @3xl/sidebar-shell:in-data-[state=collapsed]:w-10";

export function SidebarItem({
  href,
  icon,
  badge,
  isCurrent = false,
  tooltip,
  onPress,
  children,
  className,
}: SidebarItemProps) {
  const { isRtl, setMobileOpen, sidebarId } = useSidebarContext();
  const inSheet = useContext(SidebarSheetContext);
  const rail = useContext(SidebarRailContext);
  const reduceMotion = useReducedMotion();
  const label =
    tooltip ?? (typeof children === "string" ? children : undefined);
  const glyph =
    isCurrent && isValidElement(icon)
      ? cloneElement(icon as ReactElement<{ weight?: string }>, {
          weight: "fill",
        })
      : icon;

  const link = (
    <AriaLink
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      onPress={(event) => {
        onPress?.(event);
        if (inSheet) setMobileOpen(false);
      }}
      data-slot="sidebar-item-link"
      data-current={isCurrent || undefined}
      className={composeRenderProps(className, (className) =>
        cn(sidebarItemStyles, className),
      )}
    >
      {isCurrent && (
        <motion.span
          layoutId={`${sidebarId}-${inSheet ? "sheet" : "panel"}-current`}
          layoutDependency={href}
          initial={false}
          aria-hidden="true"
          data-slot="sidebar-item-indicator"
          transition={transitionFor(reduceMotion, springLayout)}
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-accent transition-colors duration-150 ease-out-quint group-focus-visible/item:bg-primary forced-colors:hidden"
        />
      )}
      <span
        aria-hidden="true"
        data-slot="sidebar-item-icon"
        className="relative grid size-4.5 shrink-0 place-items-center"
      >
        {glyph}
        {badge !== undefined && (
          <span className="absolute -end-0.5 -top-0.5 size-1.5 rounded-full bg-primary opacity-0 transition-opacity duration-100 ease-out-quint group-focus-visible/item:bg-primary-foreground forced-colors:bg-[CanvasText] @3xl/sidebar-shell:in-data-[state=collapsed]:opacity-100 @3xl/sidebar-shell:in-data-[state=collapsed]:delay-150 @3xl/sidebar-shell:in-data-[state=collapsed]:duration-200" />
        )}
      </span>
      <span
        data-slot="sidebar-item-label"
        className={cn("min-w-0 flex-1 truncate", sidebarFade)}
      >
        {children}
      </span>
      {badge !== undefined && (
        <span
          data-slot="sidebar-item-badge"
          className={cn("flex shrink-0", sidebarFade)}
        >
          {badge}
        </span>
      )}
    </AriaLink>
  );

  if (!label) {
    return (
      <li data-slot="sidebar-item" className={sidebarItemRowStyles}>
        {link}
      </li>
    );
  }

  return (
    <li data-slot="sidebar-item" className={sidebarItemRowStyles}>
      <TooltipTrigger isDisabled={!rail}>
        {link}
        <Tooltip placement={isRtl ? "left" : "right"}>{label}</Tooltip>
      </TooltipTrigger>
    </li>
  );
}

export function SidebarTrigger({ className, ref, ...props }: ButtonProps) {
  const {
    isOpen,
    toggle,
    isWide,
    isMobileOpen,
    setMobileOpen,
    collapsible,
    triggerRef,
    providerRef,
    sidebarId,
  } = useSidebarContext();
  const isCollapsible = collapsible === "icon";
  const isRailTrigger = isWide && isCollapsible;
  const label = isRailTrigger
    ? isOpen
      ? "Collapse sidebar"
      : "Expand sidebar"
    : "Open navigation";

  return (
    <Button
      {...props}
      ref={mergeRefs(triggerRef, ref)}
      data-slot="sidebar-trigger"
      variant="ghost"
      iconOnly
      aria-label={props["aria-label"] ?? label}
      aria-controls={sidebarId}
      aria-expanded={isRailTrigger ? isOpen : isMobileOpen}
      aria-haspopup={isRailTrigger ? undefined : "dialog"}
      onPress={(event) => {
        props.onPress?.(event);
        const node = providerRef.current;
        const wide =
          (node?.getBoundingClientRect().width ?? 0) >= SIDEBAR_QUERY;
        if (wide && isCollapsible) {
          toggle();
          return;
        }
        setMobileOpen(!isMobileOpen);
      }}
      className={className}
    >
      <SidebarSimpleIcon aria-hidden="true" />
    </Button>
  );
}

export interface SidebarInsetRenderProps {
  state: SidebarState;
}

export interface SidebarInsetProps
  extends Omit<ComponentProps<"div">, "data-slot"> {
  render?: (
    props: ComponentProps<"div"> & { "data-slot": string },
    renderProps: SidebarInsetRenderProps,
  ) => ReactElement;
}

export function SidebarInset({
  render,
  className,
  children,
  ...props
}: SidebarInsetProps) {
  const { state } = useSidebarContext();
  const finalProps = {
    ...props,
    "data-slot": "sidebar-inset",
    className: cn("relative col-start-2 min-w-0 bg-background", className),
    children,
  };
  if (render) return render(finalProps, { state });
  return <div {...finalProps} />;
}
