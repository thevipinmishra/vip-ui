"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";
import * as qrCode from "@zag-js/qr-code";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type Ref,
  useContext,
  useId,
} from "react";
import { cn } from "./utils";
import { type ButtonVariant, buttonLabel, buttonStyles } from "./button-styles";
import type { Size } from "./size";

export type QrCodeSize = "sm" | "md" | "lg";
export type QrCodeDownloadType = qrCode.DownloadTriggerProps["mimeType"];

export interface QrCodeDownloadOptions {
  /** The name of the downloaded file. */
  fileName?: string;
  /** The image type of the downloaded file. */
  mimeType?: QrCodeDownloadType;
  /** The quality of a lossy download, from 0 to 1. */
  quality?: number;
}

const QrCodePartsContext = createContext<qrCode.Api | null>(null);
const QrCodePixelSizeContext = createContext(10);

export function useQrCode(): qrCode.Api {
  const context = useContext(QrCodePartsContext);
  if (!context)
    throw new Error(
      "useQrCode must be used inside a <QrCode> or <QrCodeRoot>.",
    );
  return context;
}

export interface QrCodeContextProps {
  children: (api: qrCode.Api) => ReactNode;
}

export function QrCodeContext({ children }: QrCodeContextProps) {
  const api = useQrCode();
  return <>{children(api)}</>;
}

const frameSizes: Record<QrCodeSize, string> = {
  sm: "size-32",
  md: "size-40",
  lg: "size-48",
};

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

export interface QrCodeRootProps
  extends Omit<
    ComponentProps<"div">,
    "defaultValue" | "dir" | "id" | "onChange" | "value"
  > {
  /** The value to encode, controlled. */
  value?: string;
  /** The value to encode at first, uncontrolled. */
  defaultValue?: string;
  /** The pixel size of one module. */
  pixelSize?: number;
  /** The encoding options, such as `ecc` and `boostEcc`. */
  encoding?: qrCode.QrCodeGenerateOptions;
  /** Called when the encoded value changes. */
  onValueChange?: (details: qrCode.ValueChangeDetails) => void;
  /** Sets the writing direction. */
  dir?: "ltr" | "rtl";
  /** Sets the ids of the qr code parts. */
  ids?: qrCode.ElementIds;
  /** Resolves the document in custom environments such as iframes. */
  getRootNode?: qrCode.Props["getRootNode"];
  ref?: Ref<HTMLDivElement>;
}

export function QrCodeRoot({
  value,
  defaultValue,
  pixelSize = 10,
  encoding,
  onValueChange,
  dir,
  ids,
  getRootNode,
  className,
  children,
  ref,
  ...props
}: QrCodeRootProps) {
  const generatedId = stableId(useId());
  const service = useMachine(qrCode.machine, {
    id: `qr-code-${generatedId}`,
    value,
    defaultValue,
    pixelSize,
    encoding,
    onValueChange,
    dir,
    ids,
    getRootNode,
  });
  const api = qrCode.connect(service, normalizeProps);

  return (
    <QrCodePartsContext value={api}>
      <QrCodePixelSizeContext value={pixelSize}>
        <div
          {...api.getRootProps()}
          {...props}
          ref={ref}
          data-slot="qr-code"
          className={cn("relative inline-grid", className)}
        >
          {children}
        </div>
      </QrCodePixelSizeContext>
    </QrCodePartsContext>
  );
}

export interface QrCodeFrameProps extends ComponentProps<"svg"> {
  /** The accessible name of the code. */
  label?: string;
}

const quietZone = 2;

export function QrCodeFrame({
  label = "QR code",
  className,
  children,
  ...props
}: QrCodeFrameProps) {
  const api = useQrCode();
  const frame = api.getFrameProps();
  const [, , width = 0, height = 0] = String(frame.viewBox)
    .split(" ")
    .map(Number);
  const margin = quietZone * useContext(QrCodePixelSizeContext);

  return (
    <svg
      {...frame}
      viewBox={`0 0 ${width + margin * 2} ${height + margin * 2}`}
      {...props}
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
      data-slot="qr-code-frame"
      className={cn(
        "block size-40 shrink-0 rounded-xl bg-white text-neutral-950 shadow-(--shadow-card) ring-1 ring-border/70 forced-colors:bg-[Canvas] forced-colors:text-[CanvasText] forced-colors:ring-[CanvasText]",
        className,
      )}
    >
      <rect
        width="100%"
        height="100%"
        fill="#fff"
        className="forced-colors:fill-[Canvas]"
      />
      <g transform={`translate(${margin} ${margin})`}>{children}</g>
    </svg>
  );
}

export interface QrCodePatternProps extends ComponentProps<"path"> {}

export function QrCodePattern({ className, ...props }: QrCodePatternProps) {
  const api = useQrCode();
  return (
    <path
      {...api.getPatternProps()}
      {...props}
      data-slot="qr-code-pattern"
      className={cn("fill-current", className)}
    />
  );
}

export interface QrCodeOverlayProps extends ComponentProps<"div"> {}

export function QrCodeOverlay({
  className,
  children,
  ...props
}: QrCodeOverlayProps) {
  const api = useQrCode();
  return (
    <div
      {...api.getOverlayProps()}
      {...props}
      data-slot="qr-code-overlay"
      className={cn(
        "grid place-items-center overflow-hidden rounded-lg bg-white p-1 text-neutral-950 shadow-(--shadow-card) ring-1 ring-border/70 forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface QrCodeDownloadTriggerProps
  extends Omit<ComponentProps<"button">, "type">,
    QrCodeDownloadOptions {
  /** The visual emphasis of the trigger. */
  variant?: ButtonVariant;
  /** The size of the trigger. */
  size?: Size;
}

export function QrCodeDownloadTrigger({
  fileName = "qr-code.png",
  mimeType = "image/png",
  quality,
  variant = "outline",
  size = "sm",
  className,
  children,
  ...props
}: QrCodeDownloadTriggerProps) {
  const api = useQrCode();
  return (
    <button
      {...mergeProps(
        api.getDownloadTriggerProps({ fileName, mimeType, quality }),
        props,
      )}
      data-slot="qr-code-download-trigger"
      className={buttonStyles({
        variant,
        size,
        className: cn(
          "cursor-pointer motion-safe:active:scale-[0.98]",
          className,
        ),
      })}
    >
      {children == null ? (
        <DownloadSimpleIcon data-icon="inline-start" aria-hidden="true" />
      ) : null}
      {buttonLabel(children ?? "Download")}
    </button>
  );
}

export interface QrCodeProps extends Omit<QrCodeRootProps, "children" | "ref"> {
  /** The size of the surface in the page. */
  size?: QrCodeSize;
  /** The accessible name of the code. */
  label?: string;
  /** A logo centered over the code. Set the error correction to H for a large overlay. */
  overlay?: { src: string; alt?: string };
  /** Shows a download button with PNG, JPEG, or SVG output. */
  download?: boolean | QrCodeDownloadOptions;
  /** Renders content below the code, such as a caption. */
  children?: ReactNode;
}

export function QrCode({
  size = "md",
  label,
  overlay,
  download = false,
  encoding,
  className,
  children,
  ...props
}: QrCodeProps) {
  const downloadOptions = download === true ? {} : download || undefined;

  return (
    <QrCodeRoot
      {...props}
      data-size={size}
      encoding={overlay ? { ecc: "H", ...encoding } : encoding}
      className={cn("inline-grid justify-items-center gap-3", className)}
    >
      <div data-slot="qr-code-panel" className="relative inline-grid">
        <QrCodeFrame label={label} className={cn(frameSizes[size], "relative")}>
          <QrCodePattern />
        </QrCodeFrame>
        {overlay ? (
          <QrCodeOverlay>
            {/* biome-ignore lint/performance/noImgElement: The overlay takes any image URL and also ships outside Next.js. */}
            <img
              src={overlay.src}
              alt={overlay.alt ?? ""}
              className="size-8 object-contain"
            />
          </QrCodeOverlay>
        ) : null}
      </div>
      {downloadOptions ? <QrCodeDownloadTrigger {...downloadOptions} /> : null}
      {children}
    </QrCodeRoot>
  );
}
