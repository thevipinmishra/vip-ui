"use client";

import { XIcon } from "@phosphor-icons/react";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/react";
import * as signaturePad from "@zag-js/signature-pad";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
} from "./field-styles";

export type SignaturePadSize = "sm" | "md" | "lg";
export type SignaturePadDataUrlType = signaturePad.DataUrlType;

export interface SignaturePadRuntime {
  /** The connected signature pad machine. */
  api: signaturePad.Api;
  /** The latest capture as a data URL. Empty while the pad is empty. */
  dataUrl: string;
  /** The height of the drawing area. */
  size: SignaturePadSize;
  /** Marks the pad as invalid. */
  invalid: boolean;
  /** Keeps the drawing but stops changes. */
  readOnly: boolean;
  /** Captures the current signature and stores the data URL. */
  capture: (
    type?: SignaturePadDataUrlType,
    quality?: number,
  ) => Promise<string>;
  /** Clears the drawing and the stored data URL. */
  clear: () => void;
}

const SignaturePadPartsContext = createContext<SignaturePadRuntime | null>(
  null,
);

export function useSignaturePad(): SignaturePadRuntime {
  const context = useContext(SignaturePadPartsContext);
  if (!context)
    throw new Error(
      "useSignaturePad must be used inside a <SignaturePad> or <SignaturePadRoot>.",
    );
  return context;
}

export interface SignaturePadContextProps {
  children: (api: signaturePad.Api) => ReactNode;
}

export function SignaturePadContext({ children }: SignaturePadContextProps) {
  const { api } = useSignaturePad();
  return <>{children(api)}</>;
}

const controlHeights: Record<SignaturePadSize, string> = {
  sm: "h-32",
  md: "h-44",
  lg: "h-56",
};

const clearTriggerStyles =
  "inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted-foreground outline-transparent outline-offset-4 transition-[color,background-color,scale,outline-color,outline-offset] duration-150 ease-out-quint hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted-foreground motion-reduce:outline-offset-2 motion-safe:active:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 forced-colors:border";

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

interface SignaturePadMachineProps {
  paths?: string[];
  defaultPaths?: string[];
  drawing?: signaturePad.DrawingOptions;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  name?: string;
  translations?: signaturePad.IntlTranslations;
  dir?: "ltr" | "rtl";
  ids?: signaturePad.ElementIds;
  getRootNode?: signaturePad.Props["getRootNode"];
  size?: SignaturePadSize;
  dataUrlType?: SignaturePadDataUrlType;
  quality?: number;
  onDraw?: (details: signaturePad.DrawDetails) => void;
  onDrawEnd?: (details: signaturePad.DrawEndDetails) => void;
  onValueChange?: (value: string) => void;
}

function useSignaturePadMachine({
  paths,
  defaultPaths,
  drawing,
  disabled,
  readOnly,
  required,
  invalid = false,
  name,
  translations,
  dir,
  ids,
  getRootNode,
  size = "md",
  dataUrlType = "image/png",
  quality,
  onDraw,
  onDrawEnd,
  onValueChange,
}: SignaturePadMachineProps) {
  const generatedId = stableId(useId());
  const [dataUrl, setDataUrl] = useState("");
  const captureId = useRef(0);
  const liveApi = useRef<signaturePad.Api | null>(null);

  const service = useMachine(signaturePad.machine, {
    id: `signature-pad-${generatedId}`,
    paths,
    defaultPaths,
    drawing: { fill: "currentColor", size: 3, ...drawing },
    disabled,
    readOnly,
    required,
    name,
    translations,
    dir,
    ids,
    getRootNode,
    onDraw: (details) => {
      if (!details.paths.length) {
        captureId.current++;
        setDataUrl("");
        onValueChange?.("");
      }
      onDraw?.(details);
    },
    onDrawEnd: (details) => {
      const id = ++captureId.current;
      void details
        .getDataUrl(dataUrlType, quality)
        .then((url) => {
          if (id !== captureId.current) return;
          setDataUrl(url);
          onValueChange?.(url);
        })
        .catch(() => undefined);
      onDrawEnd?.(details);
    },
  });
  const api = signaturePad.connect(service, normalizeProps);

  useEffect(() => {
    liveApi.current = api;
  }, [api]);

  useEffect(() => {
    if (!api.paths.length) {
      setDataUrl("");
      return;
    }
    let active = true;
    void liveApi.current
      ?.getDataUrl(dataUrlType, quality)
      .then((url) => {
        if (active) setDataUrl(url);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [api.paths.length, dataUrlType, quality]);

  const capture = useCallback(
    async (type: SignaturePadDataUrlType = dataUrlType, value?: number) => {
      const url = await api.getDataUrl(type, value ?? quality);
      setDataUrl(url);
      onValueChange?.(url);
      return url;
    },
    [api, dataUrlType, onValueChange, quality],
  );

  const clear = useCallback(() => {
    captureId.current++;
    setDataUrl("");
    api.clear();
    onValueChange?.("");
  }, [api, onValueChange]);

  const context: SignaturePadRuntime = {
    api,
    dataUrl,
    size,
    invalid,
    readOnly: readOnly ?? false,
    capture,
    clear,
  };

  return context;
}

export interface SignaturePadProps
  extends Omit<ComponentProps<"div">, "dir" | "id" | "onChange" | "onDraw"> {
  /** The visible label. */
  label: string;
  /** Help text below the pad. */
  description?: string;
  /** Error text below the pad. It shows only while `invalid` is true. */
  error?: string;
  /** Text shown in the empty pad. */
  placeholder?: string;
  /** The height of the drawing area. */
  size?: SignaturePadSize;
  /** Submits the signature with a form. */
  name?: string;
  /** Associates the hidden input with a form by id. */
  form?: string;
  /** The committed paths, controlled. */
  paths?: string[];
  /** The paths to draw first, uncontrolled. */
  defaultPaths?: string[];
  /** The stroke options. The machine sets `fill` to `currentColor`. */
  drawing?: signaturePad.DrawingOptions;
  /** Disables the pad. */
  disabled?: boolean;
  /** Keeps the drawing but stops changes. */
  readOnly?: boolean;
  /** Marks the pad as required. */
  required?: boolean;
  /** Marks the pad as invalid. */
  invalid?: boolean;
  /** The image type of the capture. */
  dataUrlType?: SignaturePadDataUrlType;
  /** The quality of a lossy capture, from 0 to 1. */
  quality?: number;
  /** Called with the committed paths while drawing. */
  onDraw?: (details: signaturePad.DrawDetails) => void;
  /** Called when a stroke ends. */
  onDrawEnd?: (details: signaturePad.DrawEndDetails) => void;
  /** Called with the data URL after a stroke ends or the pad is cleared. */
  onValueChange?: (value: string) => void;
  /** Overrides the accessible labels of the pad and its clear button. */
  translations?: signaturePad.IntlTranslations;
  /** Sets the writing direction of the pad. */
  dir?: "ltr" | "rtl";
  /** Sets the ids of the pad parts. */
  ids?: signaturePad.ElementIds;
  /** Resolves the document in custom environments such as iframes. */
  getRootNode?: signaturePad.Props["getRootNode"];
  ref?: Ref<HTMLDivElement>;
}

export function SignaturePad({
  label,
  description,
  error,
  placeholder = "Sign here",
  size = "md",
  name,
  form,
  paths,
  defaultPaths,
  drawing,
  disabled,
  readOnly,
  required,
  invalid,
  dataUrlType,
  quality,
  onDraw,
  onDrawEnd,
  onValueChange,
  translations,
  dir,
  ids,
  getRootNode,
  className,
  children,
  ref,
  ...props
}: SignaturePadProps) {
  const generatedId = stableId(useId());
  const descriptionId = `signature-pad-description-${generatedId}`;
  const errorId = `signature-pad-error-${generatedId}`;
  const showError = Boolean(invalid && error);
  const describedBy =
    [description ? descriptionId : null, showError ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const context = useSignaturePadMachine({
    paths,
    defaultPaths,
    drawing,
    disabled,
    readOnly,
    required,
    invalid,
    name,
    translations: { control: label, ...translations },
    dir,
    ids,
    getRootNode,
    size,
    dataUrlType,
    quality,
    onDraw,
    onDrawEnd,
    onValueChange,
  });
  const { api } = context;

  return (
    <SignaturePadPartsContext value={context}>
      <div
        {...api.getRootProps()}
        {...props}
        ref={ref}
        data-slot="signature-pad"
        data-size={size}
        data-invalid={invalid || undefined}
        className={cn("grid min-w-0 gap-2", className)}
      >
        {children ?? (
          <>
            <SignaturePadLabel>{label}</SignaturePadLabel>
            <SignaturePadControl aria-describedby={describedBy}>
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground/80 transition-opacity duration-200 ease-out-quint",
                  (!api.empty || api.drawing) && "opacity-0",
                )}
              >
                {placeholder}
              </span>
              <SignaturePadGuide />
              <SignaturePadSegment />
              <SignaturePadClearTrigger className="absolute end-2 top-2" />
            </SignaturePadControl>
            {description ? (
              <SignaturePadDescription id={descriptionId}>
                {description}
              </SignaturePadDescription>
            ) : null}
            {showError ? (
              <SignaturePadError id={errorId}>{error}</SignaturePadError>
            ) : null}
            {name ? <SignaturePadHiddenInput form={form} /> : null}
          </>
        )}
      </div>
    </SignaturePadPartsContext>
  );
}

export interface SignaturePadRootProps
  extends Omit<
    SignaturePadProps,
    "children" | "description" | "error" | "label" | "placeholder" | "ref"
  > {
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function SignaturePadRoot({
  size = "md",
  invalid,
  paths,
  defaultPaths,
  drawing,
  disabled,
  readOnly,
  required,
  name,
  dataUrlType,
  quality,
  onDraw,
  onDrawEnd,
  onValueChange,
  translations,
  dir,
  ids,
  getRootNode,
  className,
  children,
  ref,
  ...props
}: SignaturePadRootProps) {
  const context = useSignaturePadMachine({
    paths,
    defaultPaths,
    drawing,
    disabled,
    readOnly,
    required,
    invalid,
    name,
    translations,
    dir,
    ids,
    getRootNode,
    size,
    dataUrlType,
    quality,
    onDraw,
    onDrawEnd,
    onValueChange,
  });
  const { api } = context;

  return (
    <SignaturePadPartsContext value={context}>
      <div
        {...api.getRootProps()}
        {...props}
        ref={ref}
        data-slot="signature-pad"
        data-size={size}
        data-invalid={invalid || undefined}
        className={cn("grid min-w-0 gap-2", className)}
      >
        {children}
      </div>
    </SignaturePadPartsContext>
  );
}

export interface SignaturePadLabelProps extends ComponentProps<"label"> {}

export function SignaturePadLabel({
  className,
  ...props
}: SignaturePadLabelProps) {
  const { api } = useSignaturePad();
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: The machine sets htmlFor through getLabelProps.
    <label
      {...api.getLabelProps()}
      {...props}
      data-slot="signature-pad-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export interface SignaturePadControlProps
  extends Omit<ComponentProps<"div">, "role"> {}

export function SignaturePadControl({
  className,
  ...props
}: SignaturePadControlProps) {
  const { api, size, invalid, readOnly } = useSignaturePad();
  return (
    <div
      {...api.getControlProps()}
      {...props}
      aria-invalid={invalid || undefined}
      data-slot="signature-pad-control"
      data-invalid={invalid || undefined}
      data-readonly={readOnly || undefined}
      className={cn(
        "group/pad relative w-full cursor-crosshair overflow-hidden rounded-xl border border-input bg-card text-foreground shadow-(--shadow-card) outline-transparent outline-offset-4 transition-[border-color,box-shadow,outline-color,outline-offset] duration-150 ease-out-quint hover:border-primary/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:cursor-not-allowed data-[disabled]:bg-muted data-[disabled]:opacity-60 data-[disabled]:hover:border-input data-[invalid]:border-destructive data-[invalid]:hover:border-destructive data-[invalid]:focus-visible:outline-destructive data-[readonly]:cursor-default data-[readonly]:hover:border-input motion-reduce:outline-offset-2 forced-colors:border",
        controlHeights[size],
        className,
      )}
    />
  );
}

export interface SignaturePadSegmentProps
  extends Omit<ComponentProps<"svg">, "children"> {
  children?: ReactNode;
}

export function SignaturePadSegment({
  className,
  children,
  ...props
}: SignaturePadSegmentProps) {
  const { api } = useSignaturePad();
  return (
    <svg
      {...api.getSegmentProps()}
      {...props}
      aria-hidden="true"
      focusable="false"
      data-slot="signature-pad-segment"
      className={cn("pointer-events-none", className)}
    >
      {children ?? (
        <>
          {api.paths.map((path, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Committed strokes have no stable identity.
            <SignaturePadPath key={`${index}-${path.length}`} path={path} />
          ))}
          {api.currentPath ? <SignaturePadPath path={api.currentPath} /> : null}
        </>
      )}
    </svg>
  );
}

export interface SignaturePadPathProps extends ComponentProps<"path"> {
  path: string;
}

export function SignaturePadPath({
  path,
  className,
  ...props
}: SignaturePadPathProps) {
  const { api } = useSignaturePad();
  return (
    <path
      {...api.getSegmentPathProps({ path })}
      {...props}
      data-slot="signature-pad-path"
      className={cn("stroke-none", className)}
    />
  );
}

export interface SignaturePadGuideProps extends ComponentProps<"div"> {}

export function SignaturePadGuide({
  className,
  ...props
}: SignaturePadGuideProps) {
  const { api } = useSignaturePad();
  return (
    <div
      {...api.getGuideProps()}
      {...props}
      aria-hidden="true"
      data-slot="signature-pad-guide"
      className={cn(
        "pointer-events-none absolute inset-x-6 bottom-[18%] border-b border-dashed border-border forced-colors:border-[CanvasText]",
        className,
      )}
    />
  );
}

export interface SignaturePadClearTriggerProps
  extends ComponentProps<"button"> {}

export function SignaturePadClearTrigger({
  className,
  children,
  ...props
}: SignaturePadClearTriggerProps) {
  const { api, readOnly } = useSignaturePad();
  const merged = mergeProps(api.getClearTriggerProps(), props);
  return (
    <button
      {...merged}
      hidden={readOnly ? true : merged.hidden}
      data-slot="signature-pad-clear-trigger"
      className={cn(clearTriggerStyles, className)}
    >
      {children ?? (
        <>
          <XIcon weight="bold" aria-hidden="true" />
          Clear
        </>
      )}
    </button>
  );
}

export interface SignaturePadHiddenInputProps
  extends Omit<ComponentProps<"input">, "value" | "type"> {
  value?: string;
}

export function SignaturePadHiddenInput({
  value,
  className,
  ...props
}: SignaturePadHiddenInputProps) {
  const { api, dataUrl } = useSignaturePad();
  const input = api.getHiddenInputProps({ value: value ?? dataUrl });
  return (
    <input
      {...mergeProps(input, props)}
      type="hidden"
      data-slot="signature-pad-hidden-input"
      className={cn(className)}
    />
  );
}

export interface SignaturePadDescriptionProps extends ComponentProps<"p"> {}

export function SignaturePadDescription({
  className,
  ...props
}: SignaturePadDescriptionProps) {
  return (
    <p
      {...props}
      data-slot="signature-pad-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export interface SignaturePadErrorProps extends ComponentProps<"p"> {}

export function SignaturePadError({
  className,
  ...props
}: SignaturePadErrorProps) {
  return (
    <p
      {...props}
      role="alert"
      data-slot="signature-pad-error"
      className={cn(fieldErrorStyles, className)}
    />
  );
}
