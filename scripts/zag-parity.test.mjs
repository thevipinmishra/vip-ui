import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Static contract for the Zag-backed components. The Zag docs are the source of
 * truth; this test keeps the public surface from silently drifting from them.
 */
const contracts = {
  pagination: {
    exports: [
      "Pagination",
      "PaginationList",
      "PaginationItem",
      "PaginationLink",
      "PaginationPages",
      "PaginationEllipsis",
      "PaginationFirstTrigger",
      "PaginationPrevTrigger",
      "PaginationNextTrigger",
      "PaginationLastTrigger",
      "PaginationContext",
      "usePagination",
    ],
    anatomy: [
      "getRootProps",
      "getItemProps",
      "getEllipsisProps",
      "getFirstTriggerProps",
      "getPrevTriggerProps",
      "getNextTriggerProps",
      "getLastTriggerProps",
    ],
    props: [
      "count",
      "page",
      "defaultPage",
      "pageSize",
      "defaultPageSize",
      "siblingCount",
      "boundaryCount",
      "onPageChange",
      "onPageSizeChange",
      "getPageUrl",
      "translations",
      "dir",
      "ids",
      "getRootNode",
    ],
  },
  marquee: {
    exports: [
      "Marquee",
      "MarqueeRoot",
      "MarqueeViewport",
      "MarqueeContent",
      "MarqueeItem",
      "MarqueeEdge",
      "MarqueePauseTrigger",
      "MarqueeContext",
      "useMarquee",
    ],
    anatomy: [
      "getRootProps",
      "getViewportProps",
      "getContentProps",
      "getItemProps",
      "getEdgeProps",
    ],
    props: [
      "side",
      "speed",
      "delay",
      "loopCount",
      "spacing",
      "autoFill",
      "pauseOnInteraction",
      "reverse",
      "paused",
      "defaultPaused",
      "onPauseChange",
      "onLoopComplete",
      "onComplete",
      "translations",
      "dir",
      "ids",
      "getRootNode",
    ],
  },
  "otp-input": {
    exports: [
      "OtpInput",
      "OtpInputLabel",
      "OtpInputSlots",
      "OtpInputSlot",
      "OtpInputGroup",
      "OtpInputSeparator",
      "OtpInputDescription",
      "OtpInputError",
      "OtpInputContext",
      "useOtpInput",
    ],
    anatomy: [
      "getRootProps",
      "getLabelProps",
      "getControlProps",
      "getInputProps",
      "getHiddenInputProps",
    ],
    props: [
      "name",
      "form",
      "ids",
      "autoFocus",
      "isInvalid",
      "mask",
      "autoSubmit",
      "blurOnComplete",
      "selectOnFocus",
      "onValueInvalid",
      "sanitizeValue",
      "translations",
      "dir",
      "getRootNode",
      "isRequired",
      "isReadOnly",
      "isDisabled",
      "onChange",
      "onComplete",
    ],
  },
  "inline-edit": {
    exports: [
      "InlineEdit",
      "InlineEditRoot",
      "InlineEditArea",
      "InlineEditLabel",
      "InlineEditInput",
      "InlineEditPreview",
      "InlineEditEditTrigger",
      "InlineEditControl",
      "InlineEditSubmitTrigger",
      "InlineEditCancelTrigger",
      "InlineEditContext",
      "useInlineEdit",
    ],
    anatomy: [
      "getRootProps",
      "getAreaProps",
      "getLabelProps",
      "getInputProps",
      "getPreviewProps",
      "getEditTriggerProps",
      "getControlProps",
      "getSubmitTriggerProps",
      "getCancelTriggerProps",
    ],
    props: [
      "activationMode",
      "submitMode",
      "selectOnFocus",
      "edit",
      "defaultEdit",
      "onEditChange",
      "isInvalid",
      "autoResize",
      "finalFocusEl",
      "translations",
      "onValueChange",
      "onValueRevert",
      "onValueCommit",
      "onInteractOutside",
      "dir",
      "ids",
      "getRootNode",
    ],
  },
  resizable: {
    exports: [
      "ResizableGroup",
      "ResizablePanel",
      "ResizableHandle",
      "ResizableHandleIndicator",
      "ResizableContext",
      "useResizable",
    ],
    anatomy: [
      "getRootProps",
      "getPanelProps",
      "getResizeTriggerProps",
      "getResizeTriggerIndicator",
    ],
    props: [
      "orientation",
      "layout",
      "defaultLayout",
      "onLayoutChange",
      "onResizeStart",
      "onLayoutEnd",
      "keyboardResizeBy",
      "nonce",
      "onCollapse",
      "onExpand",
      "registry",
      "dir",
      "ids",
      "getRootNode",
    ],
  },
  "scroll-area": {
    exports: [
      "ScrollArea",
      "ScrollAreaRoot",
      "ScrollAreaViewport",
      "ScrollAreaContent",
      "ScrollAreaScrollbar",
      "ScrollAreaThumb",
      "ScrollAreaCorner",
      "ScrollAreaContext",
      "useScrollArea",
    ],
    anatomy: [
      "getRootProps",
      "getViewportProps",
      "getContentProps",
      "getScrollbarProps",
      "getThumbProps",
      "getCornerProps",
      "getScrollProgress",
      "getScrollbarState",
    ],
    props: ["ids", "dir", "getRootNode"],
  },
  "segmented-control": {
    exports: [
      "SegmentedControl",
      "SegmentedControlItem",
      "SegmentedControlContext",
      "useSegmentedControl",
    ],
    anatomy: [
      "getRootProps",
      "getIndicatorProps",
      "getItemProps",
      "getItemTextProps",
      "getItemHiddenInputProps",
    ],
    props: [
      "value",
      "defaultValue",
      "onChange",
      "onValueChange",
      "name",
      "form",
      "isDisabled",
      "isInvalid",
      "isRequired",
      "isReadOnly",
      "orientation",
      "dir",
      "ids",
      "getRootNode",
    ],
  },
};

async function source(name) {
  return readFile(path.join(root, "src/components/ui", `${name}.tsx`), "utf8");
}

function exported(source, name) {
  const escaped = name.replaceAll("-", "\\-");
  return new RegExp(
    `export (?:function|const|class) ${escaped}\\b|export \\{[^}]*\\b${escaped}\\b`,
  ).test(source);
}

for (const [file, contract] of Object.entries(contracts)) {
  test(`${file} exports the composed Zag surface`, async () => {
    const text = await source(file);
    for (const name of contract.exports) {
      assert.ok(exported(text, name), `${file} must export ${name}`);
    }
  });

  test(`${file} wires every anatomy part to the machine`, async () => {
    const text = await source(file);
    for (const part of contract.anatomy) {
      assert.match(
        text,
        new RegExp(`\\b${part}\\(`),
        `${file} must call api.${part}()`,
      );
    }
  });

  test(`${file} forwards the documented machine props`, async () => {
    const text = await source(file);
    for (const prop of contract.props) {
      assert.match(
        text,
        new RegExp(`\\b${prop}\\b`),
        `${file} must accept and forward ${prop}`,
      );
    }
  });

  test(`${file} exposes a render-prop context component`, async () => {
    const text = await source(file);
    const component = file
      .split("-")
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join("");
    assert.match(
      text,
      new RegExp(
        `export function ${component}Context\\(\\{\\s*children[^}]*\\}[^)]*\\)`,
      ),
      `${file} must export a ${component}Context component`,
    );
    assert.match(
      text,
      /children: \(api: [^)]+\) => ReactNode/,
      `${file} must type children as a render prop that receives the api`,
    );
    assert.match(
      text,
      /return <>\{children\(api\)\}<\/>;/,
      `${file} must call children(api)`,
    );
  });
}
