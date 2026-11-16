"use client";

import {
  CheckIcon,
  CopyIcon,
  TextAlignLeftIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { duration, easeOut, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { CopyButton, type CopyButtonProps } from "./copy-button";
import { IconSwap } from "./icon-swap";
import { ToggleButton } from "./toggle-button";

const codeLineRem = 1.421875;

interface CodeBlockContextValue {
  bodyId: string;
  canCollapse: boolean;
  code: string;
  collapsed: boolean;
  expanded: boolean;
  highlight: readonly number[];
  isStreaming: boolean;
  language?: string;
  lineCount: number;
  lineNumbers: boolean;
  maxLines?: number;
  setExpanded: (expanded: boolean) => void;
  setTitle: (title?: string) => void;
  setWrap: (wrap: boolean) => void;
  title?: string;
  wrap: boolean;
}

const CodeBlockContext = createContext<CodeBlockContextValue | null>(null);

function useCodeBlock() {
  const context = useContext(CodeBlockContext);
  if (!context)
    throw new Error(
      "CodeBlock parts must render inside a CodeBlock. Use the parts as the children of CodeBlock.",
    );
  return context;
}

function splitLines(code: string) {
  const lines = code.split("\n");
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

export interface CodeBlockProps
  extends Omit<ComponentProps<"figure">, "children"> {
  code: string;
  language?: string;
  lineNumbers?: boolean;
  highlight?: readonly number[];
  wrap?: boolean;
  defaultWrap?: boolean;
  onWrapChange?: (wrap: boolean) => void;
  maxLines?: number;
  isStreaming?: boolean;
  children?: ReactNode;
}

export function CodeBlock({
  code,
  language,
  lineNumbers = true,
  highlight = [],
  wrap: wrapProp,
  defaultWrap = false,
  onWrapChange,
  maxLines,
  isStreaming = false,
  children,
  className,
  ...props
}: CodeBlockProps) {
  const [uncontrolledWrap, setUncontrolledWrap] = useState(defaultWrap);
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState<string>();
  const bodyId = useId();
  const wrap = wrapProp ?? uncontrolledWrap;
  const lineCount = splitLines(code).length;
  const canCollapse =
    maxLines !== undefined && !isStreaming && lineCount > maxLines + 2;
  const collapsed = canCollapse && !expanded;

  const setWrap = (next: boolean) => {
    if (wrapProp === undefined) setUncontrolledWrap(next);
    onWrapChange?.(next);
  };

  return (
    <CodeBlockContext
      value={{
        bodyId,
        canCollapse,
        code,
        collapsed,
        expanded,
        highlight,
        isStreaming,
        language,
        lineCount,
        lineNumbers,
        maxLines,
        setExpanded,
        setTitle,
        setWrap,
        title,
        wrap,
      }}
    >
      <figure
        {...props}
        data-slot="code-block"
        data-language={language}
        aria-busy={isStreaming || undefined}
        className={cn(
          "min-w-0 overflow-hidden rounded-xl border border-border bg-muted/60 text-foreground",
          className,
        )}
      >
        {children ?? (
          <>
            <CodeBlockHeader />
            <CodeBlockBody />
          </>
        )}
      </figure>
    </CodeBlockContext>
  );
}

export function CodeBlockHeader({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const { language } = useCodeBlock();
  return (
    <div
      {...props}
      data-slot="code-block-header"
      className={cn(
        "flex min-h-11 items-center justify-between gap-3 border-b border-border/70 px-3",
        className,
      )}
    >
      {children ?? (
        <>
          <CodeBlockTitle>{language ?? "Code"}</CodeBlockTitle>
          <CodeBlockActions />
        </>
      )}
    </div>
  );
}

export function CodeBlockTitle({
  className,
  children,
  ...props
}: ComponentProps<"figcaption">) {
  const { setTitle } = useCodeBlock();
  const text = typeof children === "string" ? children : undefined;

  useEffect(() => {
    setTitle(text);
    return () => setTitle(undefined);
  }, [setTitle, text]);

  return (
    <figcaption
      {...props}
      data-slot="code-block-title"
      className={cn("min-w-0 truncate font-mono text-xs", className)}
    >
      {children}
    </figcaption>
  );
}

export function CodeBlockActions({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="code-block-actions"
      className={cn("flex shrink-0 items-center gap-1", className)}
    >
      {children ?? (
        <>
          <CodeBlockWrap />
          <CodeBlockCopy />
        </>
      )}
    </div>
  );
}

export type CodeBlockCopyProps = Omit<CopyButtonProps, "value" | "children">;

export function CodeBlockCopy({
  className,
  "aria-label": ariaLabel = "Copy code",
  ...props
}: CodeBlockCopyProps) {
  const { code } = useCodeBlock();
  return (
    <CopyButton
      {...props}
      data-slot="code-block-copy"
      value={code}
      aria-label={ariaLabel}
      iconOnly
      variant="minimal"
      size="sm"
      className={cn(
        "data-[status=copied]:text-foreground data-[status=error]:text-destructive",
        className,
      )}
    >
      {(status) => (
        <IconSwap contentKey={status}>
          {status === "copied" ? (
            <CheckIcon aria-hidden="true" />
          ) : status === "error" ? (
            <WarningIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
        </IconSwap>
      )}
    </CopyButton>
  );
}

export function CodeBlockWrap({ className }: { className?: string }) {
  const { setWrap, wrap } = useCodeBlock();
  return (
    <ToggleButton
      data-slot="code-block-wrap"
      variant="ghost"
      size="sm"
      iconOnly
      isSelected={wrap}
      onChange={setWrap}
      aria-label="Wrap lines"
      className={className}
    >
      <TextAlignLeftIcon aria-hidden="true" />
    </ToggleButton>
  );
}

export interface CodeBlockBodyProps
  extends Omit<ComponentProps<"div">, "children"> {
  children?: ReactNode;
}

function CodeLine({
  line,
  number,
  highlighted,
  lineNumbers,
  wrap,
}: {
  line: string;
  number: number;
  highlighted: boolean;
  lineNumbers: boolean;
  wrap: boolean;
}) {
  return (
    <span
      data-line={number}
      data-line-number={number}
      data-highlighted={highlighted || undefined}
      className={cn(
        "block",
        lineNumbers &&
          "grid grid-cols-[var(--code-block-gutter)_1fr] gap-x-5 rtl:grid-cols-[1fr_var(--code-block-gutter)] before:col-start-1 rtl:before:col-start-2 before:select-none before:text-end before:text-muted-foreground/70 before:content-[attr(data-line-number)]",
        wrap ? "whitespace-pre-wrap wrap-anywhere" : "whitespace-pre",
        highlighted &&
          "bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] shadow-[inset_2px_0_0_var(--ring)] rtl:shadow-[inset_-2px_0_0_var(--ring)] forced-colors:border-s-2 forced-colors:border-s-[Highlight]",
      )}
    >
      {line || " "}
    </span>
  );
}

function codeLabel(title: string | undefined) {
  if (!title || title === "Code") return "Code";
  return `Code, ${title}`;
}

function collapsedAnimation(
  canCollapse: boolean,
  expanded: boolean,
  collapsedHeight: string | undefined,
) {
  if (!collapsedHeight) return undefined;
  if (!canCollapse || expanded) return { height: "auto" };
  return { height: collapsedHeight };
}

function CodeBlockFade({ expanded }: { expanded: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-16 max-h-1/2 bg-linear-to-b from-muted/0 to-muted/60 transition-opacity duration-200 ease-out-quint",
        expanded && "opacity-0",
      )}
    />
  );
}

function CodeBlockExpand({
  bodyId,
  expanded,
  setExpanded,
}: {
  bodyId: string;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}) {
  return (
    <div
      data-slot="code-block-expand"
      className="flex justify-center pt-1 pb-2"
    >
      <Button
        variant="minimal"
        size="xs"
        aria-expanded={expanded}
        aria-controls={bodyId}
        onPress={() => setExpanded(!expanded)}
      >
        {expanded ? "Show less" : "Show more"}
      </Button>
    </div>
  );
}

export function CodeBlockBody({
  className,
  children,
  tabIndex = 0,
  ...props
}: CodeBlockBodyProps) {
  const {
    bodyId,
    canCollapse,
    code,
    collapsed,
    expanded,
    highlight,
    isStreaming,
    language,
    lineCount,
    lineNumbers,
    maxLines,
    setExpanded,
    title,
    wrap,
  } = useCodeBlock();
  const reduceMotion = useReducedMotion();
  const lines = splitLines(code);
  const digits = String(lineCount).length;
  const gutter = `${Math.max(isStreaming ? 3 : 2, digits)}ch`;
  const collapsedHeight =
    maxLines === undefined ? undefined : `${maxLines * codeLineRem + 1}rem`;
  const label = codeLabel(title);
  const highlighted = new Set(highlight);

  return (
    <div
      {...props}
      data-slot="code-block-body"
      data-language={language}
      className={cn("relative min-w-0", className)}
    >
      <motion.div
        className={cn("relative", canCollapse && "overflow-hidden")}
        initial={false}
        animate={collapsedAnimation(canCollapse, expanded, collapsedHeight)}
        transition={transitionFor(reduceMotion, {
          duration: duration.base,
          ease: easeOut,
        })}
      >
        <div id={bodyId} inert={collapsed} aria-hidden={collapsed || undefined}>
          <section
            data-slot="code-block-scroller"
            aria-label={label}
            tabIndex={tabIndex}
            dir="ltr"
            className="min-w-0 overflow-x-auto outline-2 -outline-offset-2 outline-transparent transition-[outline-color] duration-150 ease-out-quint [&:focus-visible]:outline-ring"
          >
            <pre
              data-slot="code-block-pre"
              className={cn(
                "[tab-size:2] py-4 pe-5 ps-4 font-mono text-[0.8125rem] leading-[1.75]",
                wrap ? "w-full" : "w-max min-w-full",
              )}
            >
              <code
                data-slot="code-block-code"
                className="block"
                style={{ "--code-block-gutter": gutter } as CSSProperties}
              >
                {children ??
                  lines.map((line, index) => {
                    const number = index + 1;
                    return (
                      <CodeLine
                        // Line numbers are the identity of a code line.
                        // react-doctor-disable-next-line react-doctor/no-array-index-as-key
                        key={number}
                        line={line}
                        number={number}
                        highlighted={highlighted.has(number)}
                        lineNumbers={lineNumbers}
                        wrap={wrap}
                      />
                    );
                  })}
              </code>
            </pre>
          </section>
        </div>
        {canCollapse && <CodeBlockFade expanded={expanded} />}
      </motion.div>
      {canCollapse && (
        <CodeBlockExpand
          bodyId={bodyId}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      )}
    </div>
  );
}
