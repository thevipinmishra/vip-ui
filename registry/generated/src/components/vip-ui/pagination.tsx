"use client";

import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import * as pagination from "@zag-js/pagination";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type Ref,
  type RefObject,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
} from "react";
import { Link as AriaLink, type LinkProps } from "react-aria-components";
import { tv } from "tailwind-variants";
import { springLayout, springSnappyEasing } from "./motion";
import { cn } from "./utils";
import { buttonLabel, touchTarget } from "./button-styles";
import { ItemHighlight } from "./item-highlight";
import { type Size, SizeProvider, useSize } from "./size";

const paginationLinkStyles = tv({
  base: "relative isolate inline-flex max-w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg text-sm font-medium whitespace-nowrap text-foreground tabular-nums outline-offset-4 outline-transparent transition-[color,background-color,box-shadow,scale,outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 motion-safe:pressed:scale-[0.96] disabled:cursor-default disabled:text-muted-foreground/60 aria-disabled:cursor-default aria-disabled:text-muted-foreground/60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    size: {
      xs: `min-h-7 min-w-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5 ${touchTarget}`,
      sm: `min-h-9 min-w-9 rounded-md px-2.5 ${touchTarget}`,
      md: "min-h-11 min-w-11 px-3",
      lg: "min-h-12 min-w-12 px-3.5",
      xl: "min-h-14 min-w-14 rounded-xl px-4 text-base [&_svg:not([class*='size-'])]:size-5",
    },
    isCurrent: {
      true: "cursor-default text-primary forced-colors:border",
    },
  },
  defaultVariants: { size: "md" },
});

const ellipsisSizeStyles = {
  xs: "min-h-7 min-w-5 text-xs",
  sm: "min-h-9 min-w-6",
  md: "min-h-11 min-w-8",
  lg: "min-h-12 min-w-8",
  xl: "min-h-14 min-w-9 text-base",
} satisfies Record<Size, string>;

interface PaginationContextValue {
  api: pagination.Api;
  frame: RefObject<HTMLElement | null>;
}

const PaginationPartsContext = createContext<PaginationContextValue | null>(
  null,
);

export function usePagination() {
  const context = useContext(PaginationPartsContext);
  if (!context)
    throw new Error("usePagination must be used inside a <Pagination>.");
  return context;
}

export interface PaginationContextProps {
  children: (api: pagination.Api) => ReactNode;
}

export function PaginationContext({ children }: PaginationContextProps) {
  const { api } = usePagination();
  return <>{children(api)}</>;
}

const flipTiming = {
  duration: springLayout.duration * 1000,
  easing: springSnappyEasing.easing,
} satisfies KeyframeAnimationOptions;

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

export interface PaginationProps
  extends Omit<ComponentProps<"nav">, "dir" | "id">,
    Omit<pagination.Props, "id"> {
  size?: Size;
}

export function Pagination({
  className,
  children,
  size: sizeProp,
  count,
  page,
  defaultPage,
  pageSize,
  defaultPageSize,
  siblingCount,
  boundaryCount,
  onPageChange,
  onPageSizeChange,
  type,
  getPageUrl,
  translations,
  dir,
  ids,
  getRootNode,
  ref,
  "aria-label": ariaLabel,
  ...props
}: PaginationProps) {
  const size = useSize(sizeProp);
  const frame = useRef<HTMLElement | null>(null);
  const id = `pagination-${stableId(useId())}`;
  const label = ariaLabel ?? translations?.rootLabel ?? "Pagination";
  const service = useMachine(pagination.machine, {
    id,
    count,
    page,
    defaultPage,
    pageSize,
    defaultPageSize,
    siblingCount,
    boundaryCount,
    onPageChange,
    onPageSizeChange,
    type: type ?? (getPageUrl ? "link" : "button"),
    getPageUrl,
    translations: {
      ...translations,
      rootLabel: label,
      itemLabel:
        translations?.itemLabel ?? ((details) => `Page ${details.page}`),
    },
    dir,
    ids,
    getRootNode,
  });
  const api = pagination.connect(service, normalizeProps);
  const rootProps = api.getRootProps();

  return (
    <SizeProvider size={size}>
      <PaginationPartsContext value={{ api, frame }}>
        <nav
          {...mergeProps(rootProps, props)}
          ref={ref}
          aria-label={label}
          data-slot="pagination"
          data-size={size}
          className={cn(
            "group/pagination relative isolate flex min-w-0 justify-center-safe",
            className,
          )}
        >
          <ItemHighlight
            placement="under"
            items="[data-slot=pagination-link]"
          />
          {children}
        </nav>
      </PaginationPartsContext>
    </SizeProvider>
  );
}

export function PaginationList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      {...props}
      data-slot="pagination-list"
      className={cn(
        "flex min-w-0 flex-wrap items-center justify-center-safe gap-2 group-data-[size=sm]/pagination:gap-1.5 group-data-[size=xs]/pagination:gap-1",
        className,
      )}
    />
  );
}

export function PaginationItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      {...props}
      data-slot="pagination-item"
      className={cn("flex min-w-0", className)}
    />
  );
}

export interface PaginationLinkProps
  extends Omit<LinkProps, "className" | "children"> {
  isCurrent?: boolean;
  size?: Size;
  value?: number;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

function PaginationCurrent({ current }: { current: boolean }) {
  const frame = useContext(PaginationPartsContext)?.frame;
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!current) return;
    const indicator = indicatorRef.current;
    const link = indicator?.parentElement;
    if (!indicator || !link) return;
    const previous = frame?.current ?? null;
    if (frame) frame.current = link;
    if (!previous || previous === link || !previous.isConnected) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = link.getBoundingClientRect();
    const from = previous.getBoundingClientRect();
    const x = from.x - box.x;
    const y = from.y - box.y;
    if (!x && !y) return;
    indicator.animate(
      { transform: [`translate(${x}px, ${y}px)`, "translate(0px, 0px)"] },
      flipTiming,
    );
  }, [current, frame]);

  if (!current) return null;
  return (
    <span
      aria-hidden="true"
      ref={indicatorRef}
      data-slot="pagination-current"
      className="absolute inset-0 -z-10 rounded-[inherit] bg-card shadow-(--shadow-card) ring-1 ring-primary/25"
    />
  );
}

export function PaginationLink({
  isCurrent,
  className,
  children,
  size: sizeProp,
  value,
  onPress,
  href,
  ref,
  ...props
}: PaginationLinkProps) {
  const size = useSize(sizeProp) ?? "md";
  const { api } = usePagination();
  const item = value != null ? api.getItemProps({ type: "page", value }) : null;
  const current = isCurrent ?? (value != null ? value === api.page : false);
  const classes = paginationLinkStyles({ isCurrent: current, size, className });

  if (item && api.type === "button") {
    return (
      <button
        {...(props as ComponentProps<"button">)}
        {...item}
        ref={ref as Ref<HTMLButtonElement>}
        data-slot="pagination-link"
        data-size={size}
        aria-current={current ? "page" : undefined}
        className={classes}
      >
        <PaginationCurrent current={current} />
        {buttonLabel(children)}
      </button>
    );
  }

  return (
    <AriaLink
      {...props}
      {...item}
      ref={ref}
      href={item?.href ?? href}
      aria-label={props["aria-label"] ?? item?.["aria-label"]}
      aria-current={current ? "page" : undefined}
      data-slot="pagination-link"
      data-size={size}
      data-selected={current ? true : undefined}
      onPress={onPress}
      className={classes}
    >
      <PaginationCurrent current={current} />
      {buttonLabel(children)}
    </AriaLink>
  );
}

function PaginationPageButton({ value }: { value: number }) {
  const size = useSize() ?? "md";
  const { api } = usePagination();
  const item = api.getItemProps({ type: "page", value });
  const current = api.page === value;

  return (
    <button
      {...item}
      data-slot="pagination-link"
      data-size={size}
      aria-current={current ? "page" : undefined}
      className={paginationLinkStyles({ isCurrent: current, size })}
    >
      <PaginationCurrent current={current} />
      {value}
    </button>
  );
}

export function PaginationPages() {
  const { api } = usePagination();
  return api.pages.map((entry, index) => {
    if (entry.type === "ellipsis")
      return (
        <PaginationItem
          // biome-ignore lint/suspicious/noArrayIndexKey: An ellipsis has no page number to key by.
          key={`ellipsis-${index}`}
        >
          <PaginationEllipsis index={index} />
        </PaginationItem>
      );
    return (
      <PaginationItem key={entry.value}>
        {api.type === "link" ? (
          <PaginationLink
            href={api.getPageUrl(entry.value)}
            value={entry.value}
          >
            {entry.value}
          </PaginationLink>
        ) : (
          <PaginationPageButton value={entry.value} />
        )}
      </PaginationItem>
    );
  });
}

export interface PaginationEllipsisProps extends ComponentProps<"span"> {
  index?: number;
}

export function PaginationEllipsis({
  className,
  index,
  ...props
}: PaginationEllipsisProps) {
  const size = useSize() ?? "md";
  const context = useContext(PaginationPartsContext);
  const machineProps =
    context && index != null
      ? context.api.getEllipsisProps({ index })
      : undefined;
  return (
    <span
      {...machineProps}
      {...props}
      data-slot="pagination-ellipsis"
      className={cn(
        "inline-flex items-center justify-center text-muted-foreground",
        ellipsisSizeStyles[size],
        className,
      )}
    >
      <span aria-hidden="true">…</span>
      <span className="sr-only">More pages</span>
    </span>
  );
}

type PaginationTriggerPart = "first" | "prev" | "next" | "last";

const triggerContent: Record<PaginationTriggerPart, ReactNode> = {
  first: <CaretDoubleLeftIcon aria-hidden="true" />,
  prev: <CaretLeftIcon aria-hidden="true" />,
  next: <CaretRightIcon aria-hidden="true" />,
  last: <CaretDoubleRightIcon aria-hidden="true" />,
};

export interface PaginationTriggerProps
  extends Omit<ComponentProps<"a">, "href" | "part" | "type"> {
  size?: Size;
}

function PaginationTrigger({
  part,
  className,
  children,
  size: sizeProp,
  ...props
}: PaginationTriggerProps & { part: PaginationTriggerPart }) {
  const size = useSize(sizeProp) ?? "md";
  const { api } = usePagination();
  const machineProps =
    part === "first"
      ? api.getFirstTriggerProps()
      : part === "prev"
        ? api.getPrevTriggerProps()
        : part === "next"
          ? api.getNextTriggerProps()
          : api.getLastTriggerProps();
  const merged = mergeProps(props, machineProps);
  const content = children ?? triggerContent[part];
  const dataSlot = `pagination-${part}-trigger`;
  const classes = paginationLinkStyles({ size, className });

  if (api.type === "link")
    return (
      <AriaLink
        {...(merged as ComponentProps<typeof AriaLink>)}
        data-slot={dataSlot}
        data-size={size}
        className={classes}
      >
        {content}
      </AriaLink>
    );

  return (
    <button
      {...merged}
      data-slot={dataSlot}
      data-size={size}
      className={classes}
    >
      {content}
    </button>
  );
}

export function PaginationFirstTrigger(props: PaginationTriggerProps) {
  return <PaginationTrigger part="first" {...props} />;
}

export function PaginationPrevTrigger(props: PaginationTriggerProps) {
  return <PaginationTrigger part="prev" {...props} />;
}

export function PaginationNextTrigger(props: PaginationTriggerProps) {
  return <PaginationTrigger part="next" {...props} />;
}

export function PaginationLastTrigger(props: PaginationTriggerProps) {
  return <PaginationTrigger part="last" {...props} />;
}
