import type { Accordion, AccordionItem } from "@/components/ui/accordion";
import type { AgentStep, AgentSteps } from "@/components/ui/agent-steps";
import type { Alert } from "@/components/ui/alert";
import type { AnimatedNumber } from "@/components/ui/animated-number";
import type { Attachment, AttachmentList } from "@/components/ui/attachment";
import type { Autocomplete } from "@/components/ui/autocomplete";
import type { Avatar } from "@/components/ui/avatar";
import type { Badge } from "@/components/ui/badge";
import type { BorderBeam } from "@/components/ui/border-beam";
import type { Button } from "@/components/ui/button";
import type { ButtonGroup } from "@/components/ui/button-group";
import type { ButtonLink } from "@/components/ui/button-link";
import type {
  CalendarHeader,
  CalendarMonthPicker,
  CalendarYearPicker,
} from "@/components/ui/calendar";
import type { CardTitle } from "@/components/ui/card";
import type {
  Carousel,
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselStatus,
  CarouselThumbnail,
  CarouselThumbnails,
  CarouselViewport,
} from "@/components/ui/carousel";
import type { Checkbox } from "@/components/ui/checkbox";
import type { CheckboxGroup } from "@/components/ui/checkbox-group";
import type {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockCopy,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockWrap,
} from "@/components/ui/code-block";
import type { ColorField } from "@/components/ui/color-field";
import type { ColorPicker } from "@/components/ui/color-picker";
import type { ColorWheel } from "@/components/ui/color-wheel";
import type { ComboBoxProps, ComboBoxTags } from "@/components/ui/combo-box";
import type {
  CommandPalette,
  CommandPaletteItem,
  CommandPaletteSection,
} from "@/components/ui/command-palette";
import type {
  Conversation,
  ConversationContent,
  ConversationEmpty,
  ConversationJump,
  ConversationLoadOlder,
} from "@/components/ui/conversation";
import type { CopyButton } from "@/components/ui/copy-button";
import type {
  DataTable,
  DataTableColumn,
  DataTableSelectionState,
} from "@/components/ui/data-table";
import type { DateField } from "@/components/ui/date-field";
import type { DatePicker } from "@/components/ui/date-picker";
import type { DateRangePicker } from "@/components/ui/date-range-picker";
import type { DialogClose, DialogContent } from "@/components/ui/dialog";
import type { EmptyStateTitle } from "@/components/ui/empty-state";
import type {
  EventCalendar,
  EventCalendarGrid,
  EventCalendarHeader,
} from "@/components/ui/event-calendar";
import type { FileTrigger } from "@/components/ui/file-trigger";
import type { Highlighter } from "@/components/ui/highlighter";
import type { IconSwap } from "@/components/ui/icon-swap";
import type {
  InlineEdit,
  InlineEditArea,
  InlineEditCancelTrigger,
  InlineEditContext,
  InlineEditControl,
  InlineEditEditTrigger,
  InlineEditInput,
  InlineEditLabel,
  InlineEditPreview,
  InlineEditRoot,
  InlineEditSubmitTrigger,
} from "@/components/ui/inline-edit";
import type { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import type { LayoutMorph } from "@/components/ui/layout-morph";
import type {
  Lightbox,
  LightboxClose,
  LightboxContent,
  LightboxCount,
  LightboxImage,
  LightboxTrigger,
} from "@/components/ui/lightbox";
import type {
  Marquee,
  MarqueeContent,
  MarqueeContext,
  MarqueeEdge,
  MarqueeItem,
  MarqueePauseTrigger,
  MarqueeRoot,
  MarqueeViewport,
} from "@/components/ui/marquee";
import type { MenuItem, MenuSection } from "@/components/ui/menu";
import type { Message } from "@/components/ui/message";
import type { Meter } from "@/components/ui/meter";
import type { NativeSelect } from "@/components/ui/native-select";
import type { NumberField } from "@/components/ui/number-field";
import type {
  OtpInput,
  OtpInputContext,
  OtpInputDescription,
  OtpInputError,
  OtpInputGroup,
  OtpInputLabel,
  OtpInputSeparator,
  OtpInputSlot,
  OtpInputSlots,
} from "@/components/ui/otp-input";
import type {
  Pagination,
  PaginationContext,
  PaginationFirstTrigger,
  PaginationLastTrigger,
  PaginationLink,
  PaginationNextTrigger,
  PaginationPages,
  PaginationPrevTrigger,
} from "@/components/ui/pagination";
import type { PasswordField } from "@/components/ui/password-field";
import type { Popover, PopoverDialog } from "@/components/ui/popover";
import type { Presence } from "@/components/ui/presence";
import type { PresenceList } from "@/components/ui/presence-list";
import type { ProgressBar } from "@/components/ui/progress-bar";
import type { ProgressRing } from "@/components/ui/progress-ring";
import type { ProgressiveBlur } from "@/components/ui/progressive-blur";
import type {
  PromptInput,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/components/ui/prompt-input";
import type {
  QrCode,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRoot,
} from "@/components/ui/qr-code";
import type { Radio, RadioGroup } from "@/components/ui/radio-group";
import type { RatingInput } from "@/components/ui/rating-input";
import type { Reasoning, ReasoningPanel } from "@/components/ui/reasoning";
import type {
  ResizableContext,
  ResizableGroup,
  ResizableHandle,
  ResizableHandleIndicator,
  ResizablePanel,
} from "@/components/ui/resizable";
import type { Response, ResponseContent } from "@/components/ui/response";
import type {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaContext,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/components/ui/scroll-area";
import type { ScrollFade } from "@/components/ui/scroll-fade";
import type { SearchField } from "@/components/ui/search-field";
import type {
  SegmentedControl,
  SegmentedControlContext,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";
import type { Select, SelectSection } from "@/components/ui/select";
import type { Sheet, SheetClose } from "@/components/ui/sheet";
import type {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type {
  SignaturePad,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadDescription,
  SignaturePadError,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadPath,
  SignaturePadRoot,
  SignaturePadSegment,
} from "@/components/ui/signature-pad";
import type { Slider, SliderMarks } from "@/components/ui/slider";
import type { Spinner } from "@/components/ui/spinner";
import type { SpotlightCard } from "@/components/ui/spotlight-card";
import type { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";
import type { StatTrend } from "@/components/ui/stat";
import type { Stepper } from "@/components/ui/stepper";
import type { Switch } from "@/components/ui/switch";
import type { Column, TableLoadMoreItem } from "@/components/ui/table";
import type { Tab, TabList, TabPanel } from "@/components/ui/tabs";
import type { TagGroup } from "@/components/ui/tag-group";
import type { TextArea } from "@/components/ui/text-area";
import type { TextField } from "@/components/ui/text-field";
import type { TextLoop } from "@/components/ui/text-loop";
import type { TextReveal } from "@/components/ui/text-reveal";
import type { TextScramble } from "@/components/ui/text-scramble";
import type { TextShimmer } from "@/components/ui/text-shimmer";
import type { TextSwap } from "@/components/ui/text-swap";
import type { TimeField } from "@/components/ui/time-field";
import type { TimelineItem, TimelineTitle } from "@/components/ui/timeline";
import type {
  showToast,
  ToastMessage,
  ToastViewport,
} from "@/components/ui/toast";
import type { ToggleButton } from "@/components/ui/toggle-button";
import type { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import type { TokenField } from "@/components/ui/token-field";
import type {
  ToolCallSection,
  ToolCallTrigger,
} from "@/components/ui/tool-call";
import type { Toolbar } from "@/components/ui/toolbar";
import type { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import type { Tour, TourTarget } from "@/components/ui/tour";
import type { TreeItem } from "@/components/ui/tree";
import generatedApi from "./component-api.generated.json";

interface ApiEntry {
  type: string;
  description: string;
}

export interface ApiProp extends ApiEntry {
  name: string;
  required?: boolean;
  default?: string;
}

export interface ApiPart {
  name: string;
  description?: string;
  props: readonly ApiProp[];
}

type PropsOf<T> = T extends (props: infer P) => unknown ? P : T;
type Keys<P> = Extract<keyof P, string>;

type GeneratedProp = Partial<Pick<ApiProp, "type" | "required" | "default">>;

const generatedProps: Record<
  string,
  Record<string, GeneratedProp>
> = generatedApi;

type TypedProp<P> =
  | {
      name: Keys<P>;
      type?: string;
      default?: string;
      description: string;
    }
  | (ApiEntry & {
      name: `--${string}` | `data-${string}`;
      default?: string;
    });

export function apiPart<T>(part: {
  name: string;
  description?: string;
  props: readonly TypedProp<PropsOf<T>>[];
}): ApiPart {
  const generated = generatedProps[part.name] ?? {};
  return {
    ...part,
    props: part.props.map((prop) => {
      const merged = { ...generated[prop.name], ...prop };
      if (!merged.type)
        throw new Error(`No type for ${part.name}.${prop.name}`);
      return { ...merged, type: merged.type };
    }),
  };
}

export function showsPartHeadings(parts: readonly ApiPart[], slug: string) {
  return (
    parts.length > 1 ||
    parts[0]?.name.toLowerCase() !== slug.replaceAll("-", "")
  );
}

export const componentApi: Record<string, readonly ApiPart[]> = {
  "code-block": [
    apiPart<typeof CodeBlock>({
      name: "CodeBlock",
      props: [
        {
          name: "code",
          description: "The code text. The copy button writes it as given.",
        },
        {
          name: "language",
          description:
            "The language name. It shows in the default header when you do not render a title.",
        },
        {
          name: "lineNumbers",
          description:
            "Shows a gutter with line numbers. The numbers are not copied or selected. Ignored when you pass children.",
        },
        {
          name: "highlight",
          description:
            "Highlights these 1-based line numbers. Ignored when you pass children.",
        },
        {
          name: "wrap",
          description: "Wraps long lines, controlled.",
        },
        {
          name: "defaultWrap",
          description: "Wraps long lines at first, uncontrolled.",
        },
        {
          name: "onWrapChange",
          description: "Receives the new wrap state from the toggle.",
        },
        {
          name: "maxLines",
          description:
            "Collapses the body at this many lines and adds a Show more button.",
        },
        {
          name: "isStreaming",
          description:
            "Marks the frame busy and keeps the gutter wide while the code arrives.",
        },
      ],
    }),
    apiPart<typeof CodeBlockBody>({
      name: "CodeBlockBody",
      props: [
        {
          name: "children",
          description:
            "Highlighted output from your highlighter. Without it, the body shows the code as plain text.",
        },
      ],
    }),
    apiPart<typeof CodeBlockHeader>({
      name: "CodeBlockHeader",
      description:
        "Holds the title and actions. It shows the language name and the default actions when you pass no children.",
      props: [
        {
          name: "children",
          description:
            "Replaces the default title and action row with custom content.",
        },
      ],
    }),
    apiPart<typeof CodeBlockTitle>({
      name: "CodeBlockTitle",
      description:
        "Names the code in the header. A string also names the code region for assistive technology.",
      props: [
        {
          name: "children",
          description: "The title text, usually the file name.",
        },
      ],
    }),
    apiPart<typeof CodeBlockActions>({
      name: "CodeBlockActions",
      description:
        "Holds the header actions. It renders the wrap toggle and the copy button by default.",
      props: [
        {
          name: "children",
          description: "Replaces the default wrap and copy actions.",
        },
      ],
    }),
    apiPart<typeof CodeBlockWrap>({
      name: "CodeBlockWrap",
      description:
        "Toggles line wrapping. It takes the ToggleButton props and is icon-only.",
      props: [],
    }),
    apiPart<typeof CodeBlockCopy>({
      name: "CodeBlockCopy",
      description:
        "Copies the code from the frame. It takes the CopyButton props except value.",
      props: [],
    }),
  ],
  "text-reveal": [
    apiPart<typeof TextReveal>({
      name: "TextReveal",
      props: [
        {
          name: "text",
          description:
            "Sets the text to reveal. Screen readers read it once, as plain text.",
        },
        {
          name: "split",
          description:
            "Reveal by word or by character. Use words for scripts that join letters, such as Arabic.",
        },
        {
          name: "trigger",
          description:
            "Start on mount, or the first time the text comes into view.",
        },
        {
          name: "stagger",
          description:
            "Delay in seconds between units. Long text uses a shorter delay, so the last unit starts within 0.6 seconds of the first.",
        },
        {
          name: "delay",
          description: "Delay in seconds before the first unit starts.",
        },
      ],
    }),
  ],
  "text-scramble": [
    apiPart<typeof TextScramble>({
      name: "TextScramble",
      props: [
        {
          name: "value",
          description:
            "Sets the text to show. A change starts a scramble; the first value shows without one. Add `aria-live` to announce the final text.",
        },
        {
          name: "duration",
          description:
            "Sets the time in seconds to resolve the text. Set 0 to change the text without a scramble.",
        },
        {
          name: "glyphs",
          default: '"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"',
          description:
            "Sets the characters that show during the scramble. The default monospace font keeps the width the same.",
        },
      ],
    }),
  ],
  presence: [
    apiPart<typeof Presence>({
      name: "Presence",
      props: [
        {
          name: "show",
          description:
            "Shows or hides the content. The content is inert during its exit. Move focus before you hide focused content.",
        },
        {
          name: "as",
          default: '"div"',
          description: "Outer element. A span is inline-block, so it can move.",
        },
        {
          name: "distance",
          default: "8",
          description: "Travel in pixels for the entrance and the exit.",
        },
        {
          name: "duration",
          default: "0.2",
          description:
            "Entrance time in seconds. The exit takes 70% of this time.",
        },
        {
          name: "collapse",
          default: "false",
          description:
            "Animates the height with the content, so the content below moves smoothly.",
        },
      ],
    }),
  ],
  "stagger-group": [
    apiPart<typeof StaggerGroup>({
      name: "StaggerGroup",
      props: [
        {
          name: "as",
          description:
            "Use ul or ol with li StaggerItem children for a semantic list.",
        },
        {
          name: "trigger",
          description:
            "Start the sequence on mount, or the first time the group comes into view.",
        },
        {
          name: "stagger",
          description:
            "Delay in seconds between StaggerItem children. A long group uses a shorter delay, so the last item starts within 0.6 seconds.",
        },
      ],
    }),
    apiPart<typeof StaggerItem>({
      name: "StaggerItem",
      props: [
        {
          name: "as",
          description: "Element that receives the group animation.",
        },
      ],
    }),
  ],
  "layout-morph": [
    apiPart<typeof LayoutMorph>({
      name: "LayoutMorph",
      props: [
        {
          name: "contentKey",
          description:
            "Change it with the content to crossfade the content and animate the size. The width animates only when the morph fits its content, such as with w-fit. Other size changes, such as a window resize, do not animate.",
        },
      ],
    }),
  ],
  marquee: [
    apiPart<typeof Marquee>({
      name: "Marquee",
      props: [
        {
          name: "speed",
          description:
            "Movement in pixels per second. Hover, focus, and the built-in button pause it. Set 0 to stop it and wrap the items. Reduced motion does the same.",
        },
        {
          name: "reverse",
          description:
            "Move the content toward the end edge instead of the start edge.",
        },
        {
          name: "side",
          default: '"start"',
          description:
            "Sets the side the content scrolls toward. `top` and `bottom` scroll vertically.",
        },
        {
          name: "delay",
          default: "0",
          description: "Waits this many seconds before the animation starts.",
        },
        {
          name: "loopCount",
          default: "0",
          description:
            "Sets the number of loops. `0` loops forever; a finite count fires onComplete at the end.",
        },
        {
          name: "spacing",
          default: '"1.5rem"',
          description:
            "Sets the space between items. Marquee writes it to `--marquee-gap`; composed parts use `--marquee-spacing`.",
        },
        {
          name: "pauseOnInteraction",
          description:
            "Pauses while the pointer is over the frame or focus is inside it.",
        },
        {
          name: "paused",
          description: "The pause state, controlled.",
        },
        {
          name: "defaultPaused",
          default: "false",
          description: "The pause state at first, uncontrolled.",
        },
        {
          name: "onPauseChange",
          description: "Called when the pause state changes.",
        },
        {
          name: "onLoopComplete",
          description: "Called when one loop finishes.",
        },
        {
          name: "onComplete",
          description:
            "Called when a finite loopCount finishes. It does not fire for an infinite loop.",
        },
        {
          name: "translations",
          description:
            "Sets the accessible name of the marquee region. `aria-label` does the same.",
        },
        {
          name: "dir",
          description:
            "Sets the writing direction. By default, the direction comes from the page.",
        },
        {
          name: "children",
          description:
            "Items to loop. Do not put IDs in them, because the copies repeat them. The copies are inert and hidden from assistive technology. A focused item moves into view.",
        },
        {
          name: "--marquee-gap",
          type: "CSS length",
          default: "1.5rem",
          description:
            "Space between items in Marquee. Set it in className, or use the spacing prop.",
        },
      ],
    }),
    apiPart<typeof MarqueeRoot>({
      name: "MarqueeRoot",
      description:
        "Owns the machine and the frame. It takes every Marquee prop except the convenience defaults, plus `footer` for a control row outside the frame. Compose the track with MarqueeViewport and the parts below.",
      props: [
        {
          name: "footer",
          description:
            "Renders after the frame, inside the marquee context, such as a pause button.",
        },
      ],
    }),
    apiPart<typeof MarqueeViewport>({
      name: "MarqueeViewport",
      description:
        "Holds the animated copies inside MarqueeRoot. Spreads the machine viewport props.",
      props: [],
    }),
    apiPart<typeof MarqueeContent>({
      name: "MarqueeContent",
      description:
        "Renders one copy of the track. Render one for each entry in `api.contentCount`; copies after the first are inert and hidden from screen readers.",
      props: [
        {
          name: "index",
          description: "Sets the copy index. `0` is the original.",
        },
      ],
    }),
    apiPart<typeof MarqueeItem>({
      name: "MarqueeItem",
      description:
        "Wraps one item and reads `--marquee-spacing` for its margin.",
      props: [],
    }),
    apiPart<typeof MarqueeEdge>({
      name: "MarqueeEdge",
      description:
        "Draws a fade at one edge. Place it before or after MarqueeViewport.",
      props: [
        {
          name: "side",
          description: "Sets the edge that fades.",
        },
      ],
    }),
    apiPart<typeof MarqueePauseTrigger>({
      name: "MarqueePauseTrigger",
      description:
        'Toggles the machine pause state. The label reads "Pause motion" or "Play motion" and ignores a hover pause.',
      props: [
        {
          name: "children",
          description: "Replaces the default label.",
        },
      ],
    }),
    apiPart<typeof MarqueeContext>({
      name: "MarqueeContext",
      description:
        "Renders no DOM. Its children receive the marquee api: paused, orientation, side, multiplier, contentCount, pause, resume, togglePause, and restart.",
      props: [
        {
          name: "children",
          description: "Draws the custom content inside MarqueeRoot.",
        },
      ],
    }),
  ],
  "combo-box": [
    apiPart<ComboBoxProps>({
      name: "ComboBox",
      props: [
        {
          name: "size",
          default: '"lg"',
          description:
            "Sets the size of the input and of the trigger. The list keeps one row height.",
        },
        {
          name: "options",
          description: "Options for the default list layout.",
        },
        {
          name: "label",
          description: "Label above the input in the default layout.",
        },
        {
          name: "description",
          description: "Help text below the input in the default layout.",
        },
        {
          name: "placeholder",
          default: '"Search options"',
          description: "Input placeholder in the default layout.",
        },
        {
          name: "selectionMode",
          type: '"single" | "multiple"',
          default: '"single"',
          description:
            'Set "multiple" to let the user select more than one option. The default layout then shows the selected options as tags. value and defaultValue then take an array of option ids, and onChange receives the new array.',
        },
        {
          name: "value",
          type: "Key | null",
          description: "The selected option id, controlled.",
        },
        {
          name: "defaultValue",
          type: "Key | null",
          description: "The option id that is selected at first, uncontrolled.",
        },
        {
          name: "onChange",
          type: "(value: Key | null) => void",
          description:
            "Receives the selected option id, or null when the selection is cleared.",
        },
      ],
    }),
    apiPart<typeof ComboBoxTags>({
      name: "ComboBoxTags",
      props: [
        {
          name: "label",
          description: "Accessible name for the selected tags.",
        },
        {
          name: "emptyText",
          description: "Text shown when no tags are selected.",
        },
      ],
    }),
  ],
  attachment: [
    apiPart<typeof AttachmentList>({
      name: "AttachmentList",
      props: [
        {
          name: "children",
          description: "Attachment items. Give each one a unique key.",
        },
      ],
    }),
    apiPart<typeof Attachment>({
      name: "Attachment",
      props: [
        {
          name: "name",
          description: "Filename shown in the row.",
        },
        {
          name: "size",
          description:
            "Sets the size of the row. The small size fits a prompt input.",
        },
        {
          name: "fileSize",
          description: "File size in bytes.",
        },
        {
          name: "previewUrl",
          description:
            "Image preview URL. Without it, the row shows a file icon.",
        },
        {
          name: "status",
          description: "Upload state. Your app sets it.",
        },
        {
          name: "progress",
          description:
            "Upload percentage from 0 to 100. The status text shows it. Without it, the progress bar is indeterminate.",
        },
        {
          name: "errorMessage",
          default: '"Could not upload"',
          description: "Message shown when status is error.",
        },
        {
          name: "onRemove",
          description: "Shows a remove button and handles its press.",
        },
        {
          name: "onRetry",
          description: "Shows a retry button when status is error.",
        },
      ],
    }),
  ],
  "native-select": [
    apiPart<typeof NativeSelect>({
      name: "NativeSelect",
      props: [
        {
          name: "label",
          description: "Visible label for the select.",
        },
        {
          name: "size",
          default: '"lg"',
          description:
            "Sets the size of the select box. The HTML size attribute is not available.",
        },
        {
          name: "description",
          description:
            "Help text below the select. Linked with aria-describedby.",
        },
        {
          name: "error",
          description:
            "Validation text below the select. Linked with aria-describedby. A value also marks the select invalid.",
        },
        {
          name: "isInvalid",
          default: "false",
          description:
            "Marks the select invalid. A value for error does the same.",
        },
        {
          name: "placeholder",
          description: "Adds an empty option.",
        },
        {
          name: "containerClassName",
          description: "Classes for the outer field layout.",
        },
      ],
    }),
  ],
  select: [
    apiPart<typeof Select>({
      name: "Select",
      props: [
        {
          name: "size",
          default: '"lg"',
          description:
            "Sets the size of the trigger. The list keeps one row height.",
        },
        {
          name: "options",
          description:
            "Options for the default layout. Each option has an id, a name, and an optional description.",
        },
        {
          name: "label",
          description:
            "Label above the trigger in the default layout. When you compose the parts, add SelectLabel or pass aria-label.",
        },
        {
          name: "description",
          description: "Help text below the trigger in the default layout.",
        },
        {
          name: "value",
          type: "Key | null",
          description: "The selected option id, not its name.",
        },
        {
          name: "defaultValue",
          type: "Key | null",
          description: "The option id that is selected at first, not its name.",
        },
        {
          name: "onChange",
          type: "(value: Key | null) => void",
          description: "Receives the selected option id.",
        },
        {
          name: "placeholder",
          description: "Text in the trigger when no option is selected.",
        },
      ],
    }),
    apiPart<typeof SelectSection>({
      name: "SelectSection",
      props: [
        {
          name: "title",
          description:
            "The section heading. It stays at the top while the list scrolls.",
        },
      ],
    }),
  ],
  menu: [
    apiPart<typeof MenuItem>({
      name: "MenuItem",
      props: [
        {
          name: "variant",
          description:
            "destructive colors the text and icon for an action that deletes or removes data.",
        },
      ],
    }),
    apiPart<typeof MenuSection>({
      name: "MenuSection",
      props: [
        {
          name: "title",
          description: "The section heading.",
        },
      ],
    }),
  ],
  "agent-steps": [
    apiPart<typeof AgentSteps>({
      name: "AgentSteps",
      props: [
        {
          name: "status",
          description: "The status of the run.",
        },
        {
          name: "label",
          description:
            "The summary of the run. Screen readers announce changes with the status.",
        },
        {
          name: "detail",
          description: "Text after the label, for example the step count.",
        },
        {
          name: "autoCollapse",
          description:
            "Closes the steps when the run ends and opens them when it starts again.",
        },
      ],
    }),
    apiPart<typeof AgentStep>({
      name: "AgentStep",
      props: [
        {
          name: "title",
          description: "What the agent did or does in this step.",
        },
        {
          name: "status",
          description: "The status of the step.",
        },
        {
          name: "description",
          description: "Text below the title.",
        },
      ],
    }),
  ],
  message: [
    apiPart<typeof Message>({
      name: "Message",
      props: [
        {
          name: "sender",
          description:
            'The sender name. Shows above an incoming message. The default accessible name is "Message from {sender}".',
        },
        {
          name: "side",
          description: "Sets the alignment and the style.",
        },
        {
          name: "avatar",
          description: "Shows beside an incoming message.",
        },
        { name: "timestamp", description: "The visible time." },
        {
          name: "dateTime",
          description:
            "The machine-readable time. Set it to render the timestamp in a time element.",
        },
        {
          name: "status",
          description: 'The delivery status, for example "Sent".',
        },
        {
          name: "actions",
          description:
            "Buttons below the message. On devices that can hover, they show on hover or focus.",
        },
      ],
    }),
  ],
  conversation: [
    apiPart<typeof Conversation>({
      name: "Conversation",
      props: [
        {
          name: "aria-label",
          default: '"Conversation"',
          description: "Names the log region for screen readers.",
        },
        {
          name: "initialScroll",
          description: "Sets the first scroll position, with no animation.",
        },
        {
          name: "threshold",
          description:
            "Sets how close to the bottom the reader must scroll to pin the view again.",
        },
      ],
    }),
    apiPart<typeof ConversationContent>({
      name: "ConversationContent",
      props: [
        {
          name: "className",
          description:
            "Sets the width, padding, and gap of the message list inside the scroller.",
        },
      ],
    }),
    apiPart<typeof ConversationEmpty>({
      name: "ConversationEmpty",
      props: [
        {
          name: "children",
          description:
            "The empty content, usually an EmptyState. It shows until the first message renders.",
        },
      ],
    }),
    apiPart<typeof ConversationLoadOlder>({
      name: "ConversationLoadOlder",
      props: [
        {
          name: "onLoad",
          description:
            "Loads the older messages. Runs when the sentinel enters view and when the button is pressed. A pending promise shows a spinner.",
        },
        {
          name: "hasMore",
          description:
            "Renders the sentinel. Set it to false after the last page loads.",
        },
        {
          name: "children",
          description: "Replaces the button label.",
        },
      ],
    }),
    apiPart<typeof ConversationJump>({
      name: "ConversationJump",
      props: [
        {
          name: "children",
          default: '"Jump to latest"',
          description:
            "Replaces the visible label. The new message count stays in the accessible name.",
        },
      ],
    }),
  ],
  "tool-call": [
    apiPart<typeof ToolCallTrigger>({
      name: "ToolCallTrigger",
      props: [
        {
          name: "name",
          description: "The tool name.",
        },
        {
          name: "status",
          description:
            "Sets the icon and the status text. A change crossfades both. Screen readers announce changes.",
        },
        {
          name: "summary",
          description: "Short text beside the name.",
        },
      ],
    }),
    apiPart<typeof ToolCallSection>({
      name: "ToolCallSection",
      props: [
        {
          name: "label",
          description: "Heading above the section, such as Input or Output.",
        },
      ],
    }),
  ],
  "prompt-input": [
    apiPart<typeof PromptInput>({
      name: "PromptInput",
      props: [
        {
          name: "label",
          description:
            "An accessible name for the textarea. The label is visually hidden. Without it, the textarea is named Message.",
        },
        {
          name: "placeholder",
          description:
            "Placeholder text in the default textarea. Pass it to PromptInputTextArea when you compose the children.",
        },
        {
          name: "submitKey",
          description:
            "Controls which key sends. Enter sends with Shift+Enter for a line, or Mod+Enter sends with Enter for a line. IME composition never submits.",
        },
        {
          name: "isPending",
          description:
            "Changes Send to Stop when onStop is set. Without onStop, Send is disabled.",
        },
        {
          name: "onSubmit",
          description:
            "Called with the textarea value on send. Focus returns to the textarea. If value is not set, the textarea clears after each send.",
        },
        {
          name: "onStop",
          description: "Called when the user stops a pending run.",
        },
        {
          name: "onFilesDropped",
          description:
            "Called with files dropped on the frame. Without it, the frame ignores drops and no overlay shows.",
        },
        {
          name: "dropLabel",
          description:
            "Copy shown in the overlay while files are dragged over the frame.",
        },
        {
          name: "size",
          description: "Sets the height, text size, and padding of the frame.",
        },
      ],
    }),
    apiPart<typeof PromptInputHeader>({
      name: "PromptInputHeader",
      description:
        "Holds content above the textarea, such as attachments. Its inset matches the footer.",
      props: [],
    }),
    apiPart<typeof PromptInputTextArea>({
      name: "PromptInputTextArea",
      props: [
        {
          name: "minRows",
          description: "Rows shown at rest.",
        },
        {
          name: "maxRows",
          description: "Rows shown before the textarea starts to scroll.",
        },
      ],
    }),
    apiPart<typeof PromptInputSubmit>({
      name: "PromptInputSubmit",
      description:
        "Renders Send, or Stop while isPending and onStop are set. Accepts Button props for variant, size, and aria-label.",
      props: [
        {
          name: "isDisabled",
          description:
            "Disables the button. Send is also disabled while the textarea is empty.",
        },
      ],
    }),
  ],
  "event-calendar": [
    apiPart<typeof EventCalendar>({
      name: "EventCalendar",
      props: [
        {
          name: "events",
          description:
            "The events to show. Each event has an id, title, start, end, and an optional color, isReadOnly flag, or label. Set label when renderEvent shows more than the title and time, so the accessible name includes that content.",
        },
        {
          name: "aria-label",
          description: "Names the scrollable region that holds the days.",
        },
        {
          name: "onEventChange",
          description:
            "Receives a move or a resize on release. Update events with the new range. Without it, events cannot move.",
        },
        {
          name: "view",
          description:
            "Shows one day or the seven days of the week, controlled.",
        },
        {
          name: "defaultView",
          description: "The view at first, uncontrolled.",
        },
        {
          name: "onViewChange",
          description: "Called when the Day or Week button changes the view.",
        },
        {
          name: "date",
          description:
            "Sets the visible date. Set onDateChange to let the header move it.",
        },
        {
          name: "defaultDate",
          description:
            "Sets the visible date at first. The default is today, so pass it to keep screenshots stable.",
        },
        {
          name: "onDateChange",
          description: "Receives requests from Today, Previous, and Next.",
        },
        {
          name: "timeZone",
          default: "getLocalTimeZone()",
          description:
            "Places events in the grid with this time zone. Pass it in server rendering so both sides agree.",
        },
        {
          name: "step",
          description:
            "Sets the snap size in minutes for a drag, a resize, a keyboard move, and a slot press.",
        },
        {
          name: "dayStart",
          description: "Sets the first hour that the grid shows.",
        },
        {
          name: "dayEnd",
          description: "Sets the last hour that the grid shows.",
        },
        {
          name: "scrollToHour",
          description: "Scrolls the grid to this hour when it mounts.",
        },
        {
          name: "onEventAction",
          description: "Receives a press on an event. A drag does not call it.",
        },
        {
          name: "onSlotAction",
          description:
            "Receives a press on an empty slot with a range of one step.",
        },
        {
          name: "renderEvent",
          description:
            "Replaces the title and time inside an event. The accessible name stays the title and time.",
        },
        {
          name: "className",
          description: "Sets the width and the outer spacing.",
        },
      ],
    }),
    apiPart<typeof EventCalendarHeader>({
      name: "EventCalendarHeader",
      description:
        "Shows the title, Today, Previous, Next, and the Day and Week buttons. Pass children to replace them.",
      props: [
        {
          name: "children",
          description:
            "Replaces the default controls. Keep the title, the date buttons, and the view buttons reachable.",
        },
      ],
    }),
    apiPart<typeof EventCalendarGrid>({
      name: "EventCalendarGrid",
      description:
        "The scroll area with the time gutter, the day headers, the events, and the current-time line.",
      props: [
        {
          name: "children",
          description: "Replaces the grid content.",
        },
      ],
    }),
  ],
  reasoning: [
    apiPart<typeof Reasoning>({
      name: "Reasoning",
      props: [
        {
          name: "status",
          description:
            "Sets the trigger text and icon. Thinking animates unless reduced motion is on.",
        },
        {
          name: "duration",
          description:
            "Seconds of reasoning. Without it, a thinking run counts its own time and the count stops when the run ends. 60 seconds or more show as minutes and seconds.",
        },
        {
          name: "autoCollapse",
          description:
            "Collapses the panel when the status leaves thinking, and expands it when a new run starts. Set isExpanded to control the panel yourself.",
        },
        {
          name: "defaultExpanded",
          description:
            "Opens the panel at first. The default is open while status is thinking.",
        },
        {
          name: "isExpanded",
          description: "Controls the panel.",
        },
        {
          name: "onExpandedChange",
          description: "Receives requests to open or close the panel.",
        },
      ],
    }),
    apiPart<typeof ReasoningPanel>({
      name: "ReasoningPanel",
      props: [
        {
          name: "scrollable",
          description:
            "Caps the body at 16rem and makes it scrollable and focusable from the keyboard.",
        },
        {
          name: "autoScroll",
          description:
            "Keeps the newest line in view while a scrollable panel is thinking. Scroll up to pause it, and scroll to the end to start it again.",
        },
      ],
    }),
  ],
  response: [
    apiPart<typeof Response>({
      name: "Response",
      props: [
        {
          name: "status",
          description:
            "Sets the streaming state on the content, and announces the end once as Response complete, Response stopped, or Response failed.",
        },
      ],
    }),
    apiPart<typeof ResponseContent>({
      name: "ResponseContent",
      props: [
        {
          name: "caret",
          description:
            "Shows the caret at the end while the status is streaming.",
        },
      ],
    }),
  ],
  "inline-edit": [
    apiPart<typeof InlineEdit>({
      name: "InlineEdit",
      props: [
        {
          name: "label",
          description: "Visible label in display and edit modes.",
        },
        {
          name: "value",
          description: "The saved value, controlled.",
        },
        {
          name: "defaultValue",
          description: "The saved value at first, uncontrolled.",
        },
        {
          name: "placeholder",
          description:
            "Text shown when the value is empty. Use the object form for a different edit hint.",
        },
        {
          name: "onSave",
          description:
            "Called when you save a changed value. While its promise is pending, the save button shows a spinner. If it throws, the editor stays open and shows the error message. When controlled, update value here.",
        },
        {
          name: "disabled",
          default: "false",
          description: "Prevents opening the editor.",
        },
        {
          name: "readOnly",
          default: "false",
          description: "Shows the value without opening the editor.",
        },
        {
          name: "edit",
          description: "The edit mode, controlled.",
        },
        {
          name: "defaultEdit",
          default: "false",
          description: "Opens the editor at first, uncontrolled.",
        },
        {
          name: "onEditChange",
          description: "Called when the edit mode changes.",
        },
        {
          name: "activationMode",
          description:
            'Sets how the preview opens the editor. "none" uses the edit trigger or api.edit. The default keeps the explicit edit button.',
        },
        {
          name: "submitMode",
          description:
            "Sets which action commits the draft. The save pipeline still runs onSave first.",
        },
        {
          name: "selectOnFocus",
          default: "true",
          description: "Selects the text when the input receives focus.",
        },
        {
          name: "invalid",
          description: "Marks the field as invalid.",
        },
        {
          name: "autoResize",
          description: "Grows the input with its content.",
        },
        {
          name: "translations",
          description: "Overrides the accessible labels of the controls.",
        },
        {
          name: "name",
          description: "The form field name.",
        },
        {
          name: "form",
          description: "Associates the input with a form.",
        },
        {
          name: "maxLength",
          description: "Limits the number of characters.",
        },
        {
          name: "required",
          default: "false",
          description: "Marks the field as required.",
        },
        {
          name: "autoComplete",
          description: "Hints the browser with an autofill value.",
        },
        {
          name: "onValueChange",
          description: "Called as the draft changes.",
        },
        {
          name: "onValueCommit",
          description: "Called when the draft is committed.",
        },
        {
          name: "onValueRevert",
          description: "Called when the draft is discarded.",
        },
        {
          name: "onInteractOutside",
          description:
            "Called on an outside interaction. By default it prevents one, so a click does not close the editor.",
        },
        {
          name: "dir",
          description: "Sets the writing direction in the machine.",
        },
        {
          name: "ids",
          description:
            "Sets the ids of the label, input, preview, and controls.",
        },
      ],
    }),
    apiPart<typeof InlineEditRoot>({
      name: "InlineEditRoot",
      description:
        "Renders the machine root. It owns the edit state and the data-editing attribute.",
      props: [],
    }),
    apiPart<typeof InlineEditArea>({
      name: "InlineEditArea",
      description: "Holds the preview and the input.",
      props: [],
    }),
    apiPart<typeof InlineEditLabel>({
      name: "InlineEditLabel",
      description: "Names the field and focuses the input when pressed.",
      props: [],
    }),
    apiPart<typeof InlineEditPreview>({
      name: "InlineEditPreview",
      description:
        "Shows the committed value. Its machine props open the editor when activationMode allows it.",
      props: [
        {
          name: "children",
          description: "Replaces the value text.",
        },
      ],
    }),
    apiPart<typeof InlineEditInput>({
      name: "InlineEditInput",
      description:
        "Renders the machine input. Enter and Escape keep the machine behaviour; Enter runs the save pipeline first.",
      props: [],
    }),
    apiPart<typeof InlineEditEditTrigger>({
      name: "InlineEditEditTrigger",
      description:
        "Opens the editor with the machine edit-trigger props. It is the default preview control.",
      props: [
        {
          name: "children",
          description: "Replaces the value and the pencil icon.",
        },
      ],
    }),
    apiPart<typeof InlineEditControl>({
      name: "InlineEditControl",
      description: "Holds the submit and cancel triggers in edit mode.",
      props: [],
    }),
    apiPart<typeof InlineEditSubmitTrigger>({
      name: "InlineEditSubmitTrigger",
      description:
        "Commits the draft through the save pipeline. The machine submit-trigger props are applied.",
      props: [
        {
          name: "children",
          description: "Replaces the check icon.",
        },
      ],
    }),
    apiPart<typeof InlineEditCancelTrigger>({
      name: "InlineEditCancelTrigger",
      description:
        "Discards the draft and returns to preview mode. The machine cancel-trigger props are applied.",
      props: [
        {
          name: "children",
          description: "Replaces the close icon.",
        },
      ],
    }),
    apiPart<typeof InlineEditContext>({
      name: "InlineEditContext",
      description:
        "Renders no DOM. Its children receive the editable api: editing, empty, value, valueText, edit, cancel, submit, and the part props.",
      props: [
        {
          name: "children",
          description: "Draws custom content inside InlineEdit.",
        },
      ],
    }),
  ],
  "password-field": [
    apiPart<typeof PasswordField>({
      name: "PasswordField",
      props: [
        {
          name: "label",
          description: "Visible label for the field.",
        },
        {
          name: "size",
          default: '"lg"',
          description: "Sets the size of the field and of the reveal button.",
        },
        {
          name: "description",
          description: "Help text below the field.",
        },
        {
          name: "placeholder",
          description: "Input placeholder.",
        },
        {
          name: "autoComplete",
          description: "Use new-password when creating a credential.",
        },
      ],
    }),
  ],
  "otp-input": [
    apiPart<typeof OtpInput>({
      name: "OtpInput",
      props: [
        {
          name: "length",
          description: "Sets the number of characters and boxes.",
        },
        {
          name: "pattern",
          description:
            "Keeps digits only, or letters and numbers. Letters are uppercased.",
        },
        {
          name: "size",
          description: "Sets the height of each box: 32px, 40px, or 48px.",
        },
        {
          name: "value",
          type: "string",
          description: "The code value, controlled.",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "The code value at first, uncontrolled.",
        },
        {
          name: "placeholder",
          description: "The placeholder shown in each empty box.",
        },
        {
          name: "isDisabled",
          description: "Disables every box and the hidden input.",
        },
        {
          name: "isReadOnly",
          description: "Keeps the value but stops changes.",
        },
        {
          name: "isRequired",
          description: "Requires a value before the owning form submits.",
        },
        {
          name: "isInvalid",
          description: "Marks the boxes and the error message as invalid.",
        },
        {
          name: "children",
          description:
            "Draws a custom label, control, description, or error. Without it, the field draws the label, one row of boxes, and the hidden input.",
        },
        {
          name: "getRootNode",
          description:
            "Resolves the document in custom environments such as iframes.",
        },
        {
          name: "onComplete",
          description:
            "Called once each time the value reaches the full length.",
        },
        {
          name: "onChange",
          description: "Called with the filtered value after each change.",
        },
        {
          name: "name",
          description: "Sets the form field name on the hidden input.",
        },
        {
          name: "form",
          description: "Associates the hidden input with a form.",
        },
        {
          name: "autoFocus",
          description: "Focuses the first box on mount.",
        },
        {
          name: "autoSubmit",
          description: "Submits the owning form when the code is full.",
        },
        {
          name: "blurOnComplete",
          description: "Blurs the boxes when the code is full.",
        },
        {
          name: "mask",
          description: "Masks each box like a password input.",
        },
        {
          name: "selectOnFocus",
          description: "Selects the value of a box when it receives focus.",
        },
        {
          name: "otp",
          description: 'Signals autocomplete="one-time-code" to the browser.',
        },
        {
          name: "sanitizeValue",
          description:
            "Strips formatting before the pattern filter runs, such as dashes from a pasted code.",
        },
        {
          name: "onValueInvalid",
          description: "Called when a character does not match the pattern.",
        },
        {
          name: "translations",
          description: "Localizes the accessible label of each box.",
        },
        {
          name: "dir",
          description:
            "Sets the writing direction. By default, it comes from the page.",
        },
        {
          name: "ids",
          description: "Sets the ids of the label, control, and boxes.",
        },
      ],
    }),
    apiPart<typeof OtpInputSlots>({
      name: "OtpInputSlots",
      description:
        "Draws the row of boxes. Without children, it draws one box for each character.",
      props: [
        {
          name: "children",
          description:
            "Draws a custom run of boxes with `OtpInputGroup`, `OtpInputSlot`, and `OtpInputSeparator`.",
        },
      ],
    }),
    apiPart<typeof OtpInputContext>({
      name: "OtpInputContext",
      description:
        "Renders no DOM. Its children receive the pin-input api, including value, valueAsString, complete, setValue, clearValue, focus, and the part props.",
      props: [
        {
          name: "children",
          description: "Draws custom content inside OtpInput.",
        },
      ],
    }),
    apiPart<typeof OtpInputSlot>({
      name: "OtpInputSlot",
      description:
        "Renders one input. It takes the typing, paste, autofill, and arrow keys for its position.",
      props: [
        {
          name: "index",
          description: "Sets the character position that the input shows.",
        },
      ],
    }),
    apiPart<typeof OtpInputGroup>({
      name: "OtpInputGroup",
      description: "Groups boxes in a run.",
      props: [],
    }),
    apiPart<typeof OtpInputSeparator>({
      name: "OtpInputSeparator",
      description: "Shows a short dash between groups.",
      props: [],
    }),
    apiPart<typeof OtpInputLabel>({
      name: "OtpInputLabel",
      description: "Names the field. A press on the label focuses the input.",
      props: [],
    }),
    apiPart<typeof OtpInputDescription>({
      name: "OtpInputDescription",
      description: "Shows help text below the boxes.",
      props: [],
    }),
    apiPart<typeof OtpInputError>({
      name: "OtpInputError",
      description:
        "Shows the error below the boxes and announces it once when it appears.",
      props: [],
    }),
  ],
  "copy-button": [
    apiPart<typeof CopyButton>({
      name: "CopyButton",
      props: [
        {
          name: "value",
          description: "The exact text written to the clipboard.",
        },
        {
          name: "children",
          description:
            'The button content. Without it, the button shows an icon and status text. Pass a function to show content for each status. CopyButtonStatus is "idle", "copied", or "error".',
        },
        {
          name: "aria-label",
          description:
            'The accessible name. Without it, the name comes from text children in the idle status. Other children give the name "Copy". It does not change after a copy. A live region announces the result.',
        },
        {
          name: "variant",
          description: "Uses the Button variants.",
        },
        {
          name: "size",
          default: '"md"',
          description: "Uses the Button sizes.",
        },
        {
          name: "iconOnly",
          description: "Shows only the icon.",
        },
      ],
    }),
  ],
  "button-group": [
    apiPart<typeof ButtonGroup>({
      name: "ButtonGroup",
      props: [
        {
          name: "orientation",
          description: "Joins buttons in a row or column.",
        },
        {
          name: "size",
          description:
            "Sets the size of each button in the group. A size on a button overrides it.",
        },
      ],
    }),
  ],
  "icon-swap": [
    apiPart<typeof IconSwap>({
      name: "IconSwap",
      props: [
        {
          name: "contentKey",
          description:
            "Identifies the current icon. A change animates the new icon in and the old icon out.",
        },
        {
          name: "children",
          description:
            "The icon to show. It is hidden from assistive technology, so label the control that contains it.",
        },
      ],
    }),
  ],
  "text-shimmer": [
    apiPart<typeof TextShimmer>({
      name: "TextShimmer",
      props: [
        {
          name: "active",
          description: "Runs the highlight. Set false when the work is done.",
        },
        {
          name: "duration",
          default: "1.6",
          description:
            "Time in seconds for one pass of the highlight. A short pause follows each pass.",
        },
        {
          name: "--text-shimmer-highlight",
          type: "CSS color",
          default: "var(--color-foreground)",
          description: "Color of the highlight. Set it in className.",
        },
      ],
    }),
  ],
  "scroll-area": [
    apiPart<typeof ScrollArea>({
      name: "ScrollArea",
      props: [
        {
          name: "orientation",
          description:
            "Sets which axes scroll. Content on the other axis is clipped.",
        },
        {
          name: "dir",
          description:
            "Sets the scroll direction. By default, the direction comes from the page.",
        },
        {
          name: "aria-label",
          description:
            "Names the scroll region for screen readers. Add it when there is no visible heading.",
        },
        {
          name: "tabIndex",
          description:
            "Overrides the tab stop. By default, the viewport takes focus only while content overflows.",
        },
        {
          name: "className",
          description:
            "Sets the height and the frame around the content. A fixed height makes the area scroll.",
        },
        {
          name: "ids",
          description:
            "Sets the ids of the root, viewport, content, scrollbar, and thumb.",
        },
      ],
    }),
    apiPart<typeof ScrollAreaRoot>({
      name: "ScrollAreaRoot",
      description:
        "Owns the machine and the frame. Compose the viewport, the content, and the scrollbars inside it.",
      props: [
        {
          name: "orientation",
          description:
            "Sets the axes that scroll. The scrollbar parts also read it from context.",
        },
      ],
    }),
    apiPart<typeof ScrollAreaViewport>({
      name: "ScrollAreaViewport",
      description:
        "The scrolling element. It hides the native scrollbar and takes focus while content overflows.",
      props: [
        {
          name: "aria-label",
          description: "Names the scroll region when it has no heading.",
        },
      ],
    }),
    apiPart<typeof ScrollAreaContent>({
      name: "ScrollAreaContent",
      description: "Holds the content that scrolls inside the viewport.",
      props: [],
    }),
    apiPart<typeof ScrollAreaScrollbar>({
      name: "ScrollAreaScrollbar",
      description:
        "Draws one machine scrollbar. Without children it draws a matching thumb.",
      props: [
        {
          name: "orientation",
          description: "Sets the axis of the scrollbar.",
        },
      ],
    }),
    apiPart<typeof ScrollAreaThumb>({
      name: "ScrollAreaThumb",
      description:
        "Draws the draggable thumb. Put it inside a ScrollAreaScrollbar of the same orientation.",
      props: [
        {
          name: "orientation",
          description: "Sets the axis of the thumb.",
        },
      ],
    }),
    apiPart<typeof ScrollAreaCorner>({
      name: "ScrollAreaCorner",
      description:
        "Fills the corner where both scrollbars meet. Render it when both axes scroll.",
      props: [],
    }),
    apiPart<typeof ScrollAreaContext>({
      name: "ScrollAreaContext",
      description:
        "Renders no DOM. Its children receive the full scroll-area api: isAtTop, isAtBottom, isAtLeft, isAtRight, hasOverflowX, hasOverflowY, getScrollProgress, getScrollbarState, scrollTo, and scrollToEdge.",
      props: [
        {
          name: "children",
          description: "Draws custom content inside ScrollArea.",
        },
      ],
    }),
  ],
  "scroll-fade": [
    apiPart<typeof ScrollFade>({
      name: "ScrollFade",
      props: [
        {
          name: "orientation",
          description: "Direction in which the content scrolls.",
        },
        {
          name: "--scroll-fade-size",
          type: "CSS length",
          default: "1.5rem",
          description:
            "Maximum length of each fade. A fade grows as the content scrolls away from that edge. Set it in className.",
        },
      ],
    }),
  ],
  "text-swap": [
    apiPart<typeof TextSwap>({
      name: "TextSwap",
      props: [
        {
          name: "value",
          description:
            "Sets the text to show. A change animates; the first value shows without animation. Add `aria-live` to announce changes. A long value truncates where text cannot wrap, such as in a button.",
        },
      ],
    }),
  ],
  "text-loop": [
    apiPart<typeof TextLoop>({
      name: "TextLoop",
      props: [
        {
          name: "values",
          description:
            "Sets the words to cycle through. The first value shows when motion is reduced.",
        },
        {
          name: "interval",
          description: "Time in seconds that each value stays on screen.",
        },
        {
          name: "active",
          description:
            "Runs the loop. Set false to stop on the current value. The loop also stops when it is off screen.",
        },
      ],
    }),
  ],
  highlighter: [
    apiPart<typeof Highlighter>({
      name: "Highlighter",
      props: [
        {
          name: "variant",
          description:
            "Sets the mark to draw. A highlight wraps with the text. An underline or a circle keeps the phrase together.",
        },
        {
          name: "trigger",
          description: "Draws the mark on mount or when the phrase is in view.",
        },
        {
          name: "delay",
          description: "Time in seconds to wait before the mark draws.",
        },
        {
          name: "--highlighter-color",
          type: "CSS color",
          default: "var(--chart-3)",
          description: "Color of the mark. Set it in className.",
        },
      ],
    }),
  ],
  stepper: [
    apiPart<typeof Stepper>({
      name: "Stepper",
      props: [
        {
          name: "steps",
          type: "readonly { label: string; description?: string }[]",
          description:
            "Steps in display order. Keep labels short; if the list overflows, it scrolls and keeps the current step in view.",
        },
        {
          name: "currentStep",
          type: "number (zero-based)",
          description:
            "Sets the current step by zero-based index. Earlier steps show as complete; set it to steps.length to complete them all.",
        },
      ],
    }),
  ],
  "animated-number": [
    apiPart<typeof AnimatedNumber>({
      name: "AnimatedNumber",
      props: [
        {
          name: "value",
          description:
            "Sets the number to show. A change animates. Add `aria-live` to announce the formatted value; a number wider than its container wraps.",
        },
        {
          name: "variant",
          description:
            "count counts to the new value. slide moves only the digits that change.",
        },
        {
          name: "locale",
          description: "Locale for the number format.",
        },
        {
          name: "formatOptions",
          type: "Intl.NumberFormatOptions",
          default: "{ maximumFractionDigits: 0 }",
          description:
            "Options for Intl.NumberFormat, such as a currency or a unit.",
        },
      ],
    }),
  ],
  "progress-ring": [
    apiPart<typeof ProgressRing>({
      name: "ProgressRing",
      props: [
        {
          name: "label",
          description: "Shows a label below the ring.",
        },
        {
          name: "size",
          description: "Sets the diameter: 40, 64, or 96 pixels.",
        },
        {
          name: "showValue",
          description:
            "Shows the value in the center. Keep valueLabel short so it fits.",
        },
      ],
    }),
  ],
  "presence-list": [
    apiPart<typeof PresenceList>({
      name: "PresenceList",
      props: [
        {
          name: "items",
          description: "Items to show in the list.",
        },
        {
          name: "getKey",
          description:
            "Returns a unique key for an item. Keep the key the same while the item is in the list.",
        },
        {
          name: "children",
          description:
            "Renders the content of each list item. Move focus before you remove a focused item.",
        },
      ],
    }),
  ],
  "input-group": [
    apiPart<typeof InputGroup>({
      name: "InputGroup",
      props: [
        {
          name: "size",
          default: '"lg"',
          description:
            "Sets the size of the group. Without a size, the group uses the size of its parent field.",
        },
      ],
    }),
    apiPart<typeof InputGroupAddon>({
      name: "InputGroupAddon",
      props: [
        {
          name: "align",
          description:
            "Place text, an icon, or a button beside the input, or in a full-width row below a textarea.",
        },
      ],
    }),
  ],
  "command-palette": [
    apiPart<typeof CommandPalette>({
      name: "CommandPalette",
      props: [
        {
          name: "isOpen",
          description: "Controls the dialog's visibility.",
        },
        {
          name: "onOpenChange",
          description: "Receives requests to open or close the dialog.",
        },
        {
          name: "shortcut",
          description:
            "Ctrl+K or Command+K opens and closes the palette. Disable it when another palette owns that shortcut.",
        },
        {
          name: "title",
          description: "Accessible dialog name.",
        },
        {
          name: "placeholder",
          description: "Search input placeholder and label.",
        },
        {
          name: "emptyMessage",
          description: "Text shown when search has no results.",
        },
      ],
    }),
    apiPart<typeof CommandPaletteSection>({
      name: "CommandPaletteSection",
      props: [
        {
          name: "title",
          description:
            "Heading for a group of items. A section with no matching items is hidden.",
        },
      ],
    }),
    apiPart<typeof CommandPaletteItem>({
      name: "CommandPaletteItem",
      props: [
        {
          name: "textValue",
          description:
            "Text that search matches. Without it, search uses the text children. Set it when the item has an icon or other elements.",
        },
        {
          name: "shortcut",
          description:
            "A key hint at the end of the item. Screen readers hear it as the item description. It does not add a key handler.",
        },
        {
          name: "variant",
          default: '"default"',
          description:
            "Destructive colors the item for actions you cannot undo.",
        },
      ],
    }),
  ],
  button: [
    apiPart<typeof Button>({
      name: "Button",
      props: [
        {
          name: "variant",
          description:
            "Sets the visual emphasis. Minimal is for a quiet icon action.",
        },
        {
          name: "size",
          default: '"md"',
          description:
            "Sets the height from 28px (xs) to 56px (xl). A size on the button overrides the group; otherwise the group size applies.",
        },
        {
          name: "iconOnly",
          description:
            "Makes the button a square for one icon. Give the button an aria-label.",
        },
        {
          name: "static",
          description:
            "Disables press scaling while keeping the button interactive.",
        },
      ],
    }),
    apiPart<typeof ButtonLink>({
      name: "ButtonLink",
      description:
        "Renders an anchor with the button styles. It accepts anchor attributes instead of React Aria Button props.",
      props: [
        {
          name: "href",
          description: "Sets the destination.",
        },
        {
          name: "as",
          description: "Renders a router link component, such as Next.js Link.",
        },
        {
          name: "variant",
          description: "Uses the Button variants.",
        },
        {
          name: "size",
          description: "Uses the Button sizes.",
        },
        {
          name: "iconOnly",
          description:
            "Makes the link a square for one icon. Give the link an aria-label.",
        },
      ],
    }),
  ],
  card: [
    apiPart<typeof CardTitle>({
      name: "CardTitle",
      props: [
        {
          name: "as",
          description: "Heading level for the card title.",
        },
      ],
    }),
  ],
  carousel: [
    apiPart<typeof Carousel>({
      name: "Carousel",
      props: [
        {
          name: "aria-label",
          description: "Names the carousel region.",
        },
        {
          name: "index",
          description:
            "Sets the current slide. A change scrolls the viewport to that slide.",
        },
        {
          name: "defaultIndex",
          description:
            "Sets the slide that shows first. `opts.startIndex` takes precedence.",
        },
        {
          name: "onIndexChange",
          description:
            "Receives the slide that becomes current from a swipe, a button, a plugin, or the keyboard.",
        },
        {
          name: "opts",
          description:
            "Embla options, such as `align`, `axis`, `loop`, `slidesToScroll`, and `dragFree`.",
        },
        {
          name: "plugins",
          description:
            "Embla plugins, such as Autoplay, Auto Height, or Wheel Gestures. The carousel adds no plugin of its own.",
        },
        {
          name: "setApi",
          description:
            "Receives the Embla API after mount. Call any Embla method from it.",
        },
      ],
    }),
    apiPart<typeof CarouselViewport>({
      name: "CarouselViewport",
      description:
        "The Embla viewport and its flex track. It takes focus, so the arrow keys move one slide, and it fades the edges that have more slides.",
      props: [
        {
          name: "trackClassName",
          description:
            "Adds classes to the inner flex track, such as a different gap or alignment.",
        },
      ],
    }),
    apiPart<typeof CarouselSlide>({
      name: "CarouselSlide",
      props: [
        {
          name: "aria-label",
          description:
            "Names the slide. The default is the slide number and the total, such as 2 of 5.",
        },
      ],
    }),
    apiPart<typeof CarouselPrevious>({
      name: "CarouselPrevious",
      description:
        "Renders an icon-only outline Button. It takes Button props and is disabled when no earlier slide is reachable.",
      props: [],
    }),
    apiPart<typeof CarouselNext>({
      name: "CarouselNext",
      description:
        "Renders an icon-only outline Button. It takes Button props and is disabled when no later slide is reachable.",
      props: [],
    }),
    apiPart<typeof CarouselIndicators>({
      name: "CarouselIndicators",
      description:
        "Shows one dot per scroll snap in a group named Slides. The current dot stretches.",
      props: [],
    }),
    apiPart<typeof CarouselThumbnails>({
      name: "CarouselThumbnails",
      description: "Holds a row of thumbnail buttons.",
      props: [],
    }),
    apiPart<typeof CarouselThumbnail>({
      name: "CarouselThumbnail",
      props: [
        {
          name: "index",
          description: "Sets the slide that a press shows.",
        },
        {
          name: "aria-label",
          description: "Names the view that the thumbnail shows.",
        },
      ],
    }),
    apiPart<typeof CarouselStatus>({
      name: "CarouselStatus",
      description: "Shows the current slide as text, such as 2 / 5.",
      props: [],
    }),
  ],
  lightbox: [
    apiPart<typeof Lightbox>({
      name: "Lightbox",
      description:
        "Owns the open state and the index. Returns focus to the trigger of the current image.",
      props: [
        {
          name: "isOpen",
          description: "Controls the open state.",
        },
        {
          name: "defaultOpen",
          description: "Opens the viewer at first.",
        },
        {
          name: "onOpenChange",
          description: "Receives requests to open or close the viewer.",
        },
        {
          name: "index",
          description:
            "Sets the current image. A change moves the carousel to that image.",
        },
        {
          name: "defaultIndex",
          description:
            "Sets the image that opens first when no thumbnail is pressed.",
        },
        {
          name: "onIndexChange",
          description:
            "Receives the image that becomes current from an arrow key, a side button, or a swipe.",
        },
      ],
    }),
    apiPart<typeof LightboxTrigger>({
      name: "LightboxTrigger",
      description:
        "Renders a thumbnail button. Its image is the zoom origin and the focus target after close.",
      props: [
        {
          name: "index",
          description: "Sets the image that a press opens.",
        },
        {
          name: "aria-label",
          description:
            "Names the thumbnail. The image inside it is decorative.",
        },
        {
          name: "className",
          description: "Styles the thumbnail frame.",
        },
      ],
    }),
    apiPart<typeof LightboxContent>({
      name: "LightboxContent",
      description:
        "Renders the modal, the image carousel, the count, the side buttons, and the close button. Its children are the slides.",
      props: [
        {
          name: "aria-label",
          default: '"Image viewer"',
          description: "Names the dialog.",
        },
        {
          name: "className",
          description: "Styles the dialog surface.",
        },
      ],
    }),
    apiPart<typeof LightboxImage>({
      name: "LightboxImage",
      description:
        "One slide. Pass children instead of src for a custom graphic.",
      props: [
        {
          name: "src",
          description: "The image URL.",
        },
        {
          name: "alt",
          description: "Describes the image for screen readers.",
        },
        {
          name: "width",
          description:
            "The image width in pixels. The image never upscales past it.",
        },
        {
          name: "height",
          description: "The image height in pixels.",
        },
        {
          name: "caption",
          description: "Shows text under the image.",
        },
      ],
    }),
    apiPart<typeof LightboxCount>({
      name: "LightboxCount",
      description:
        "Shows the current image, such as 2 of 5. Renders nothing for a single image.",
      props: [],
    }),
    apiPart<typeof LightboxClose>({
      name: "LightboxClose",
      description:
        "Renders an icon-only ghost Button named Close. It takes Button props.",
      props: [],
    }),
  ],
  stat: [
    apiPart<typeof StatTrend>({
      name: "StatTrend",
      props: [
        {
          name: "direction",
          description: "Sets the arrow.",
        },
        {
          name: "invert",
          description:
            "Shows a fall as good and a rise as bad. Use it for values such as churn or response time.",
        },
      ],
    }),
  ],
  avatar: [
    apiPart<typeof Avatar>({
      name: "Avatar",
      props: [
        {
          name: "name",
          description: "Accessible name. Avatar takes the initials from it.",
        },
        {
          name: "src",
          description:
            "Image URL. Avatar shows initials if the image is missing or does not load.",
        },
        {
          name: "initials",
          description:
            'Replaces the initials that Avatar takes from name. Set "" to show a person icon.',
        },
        {
          name: "size",
          description:
            "Diameter of the avatar: 24, 32, 40, 48, or 64 pixels. The initials scale with it.",
        },
      ],
    }),
  ],
  "empty-state": [
    apiPart<typeof EmptyStateTitle>({
      name: "EmptyStateTitle",
      props: [
        {
          name: "as",
          description:
            "Sets the heading level. Match the level to the page outline.",
        },
      ],
    }),
  ],
  spinner: [
    apiPart<typeof Spinner>({
      name: "Spinner",
      props: [
        {
          name: "variant",
          description: "Sets the indicator style.",
        },
        {
          name: "size",
          description: "Sets the size: 14, 16, 24, 40, or 56 pixels.",
        },
        {
          name: "decorative",
          description:
            "Hides the spinner from screen readers. Use it when nearby text names the wait.",
        },
        {
          name: "aria-label",
          default: '"Loading"',
          description: "Names the wait for screen readers.",
        },
      ],
    }),
  ],
  "rating-input": [
    apiPart<typeof RatingInput>({
      name: "RatingInput",
      props: [
        {
          name: "label",
          description:
            "The visible label of the group. Without it, pass aria-label.",
        },
        {
          name: "max",
          description: "Number of steps. Use a positive whole number.",
        },
        {
          name: "icon",
          default: "StarIcon",
          description:
            "A Phosphor icon for each step. Steps up to the rating use the fill weight.",
        },
        {
          name: "size",
          default: '"md"',
          description: "Sets the size of each step.",
        },
        {
          name: "value",
          description:
            "The selected rating, controlled. 0 means no rating. A decimal value, such as an average, fills part of a step.",
        },
        {
          name: "defaultValue",
          description:
            "The selected rating at first, uncontrolled. 0 means no rating.",
        },
        {
          name: "onChange",
          description: "Called when a step is selected.",
        },
      ],
    }),
  ],
  table: [
    apiPart<typeof Column>({
      name: "Column",
      props: [
        {
          name: "allowsResizing",
          description:
            "Adds a resize handle at the end of the column. The table must be in TableContainer.",
        },
      ],
    }),
    apiPart<typeof TableLoadMoreItem>({
      name: "TableLoadMoreItem",
      props: [
        {
          name: "onLoadMore",
          type: "() => void",
          description:
            "Loads the next page. Called when the row scrolls into view.",
        },
        {
          name: "isLoading",
          default: "false",
          description:
            "Shows a spinner and loading text until the next page arrives.",
        },
      ],
    }),
  ],
  tree: [
    apiPart<typeof TreeItem>({
      name: "TreeItem",
      props: [
        {
          name: "title",
          description:
            "The row label. Typeahead uses it unless you set textValue.",
        },
        {
          name: "content",
          description:
            "Replaces the visible label. Without it, the row shows title. Use it to add details, such as a file size.",
        },
        {
          name: "icon",
          description:
            "Replaces the default icon. A row with child items shows a folder. Other rows show a file.",
        },
        {
          name: "children",
          description:
            "Nested TreeItem elements. A row with children shows an expand button.",
        },
        {
          name: "textValue",
          description:
            "Text for typeahead when it must be different from title.",
        },
      ],
    }),
  ],
  "data-table": [
    apiPart<typeof DataTable>({
      name: "DataTable",
      props: [
        {
          name: "label",
          description:
            "Names the table and its search and pagination controls.",
        },
        {
          name: "rows",
          description:
            "All the rows. The table searches, filters, sorts, and pages them in the browser.",
        },
        {
          name: "columns",
          type: "readonly DataTableColumn<T>[]",
          description: "Column definitions. The first column labels each row.",
        },
        {
          name: "getRowId",
          description: "Returns a unique, stable key for each row.",
        },
        {
          name: "getSearchText",
          description:
            "Shows a search field. Return all the text that search can find in a row.",
        },
        {
          name: "pageSize",
          description: "Rows on each page.",
        },
        {
          name: "selectable",
          description:
            "Shows a selection checkbox in each row. Select all selects only the rows on the current page.",
        },
        {
          name: "selectedKeys",
          description:
            "The selected row keys, controlled. The selection stays when the page, search, or filters change.",
        },
        {
          name: "defaultSelectedKeys",
          description:
            "The row keys that are selected at first, uncontrolled. Without it, no rows are selected.",
        },
        {
          name: "onSelectionChange",
          description:
            "Receives selected row keys, including keys on other pages.",
        },
        {
          name: "disabledKeys",
          description: "Rows that cannot be selected or focused.",
        },
        {
          name: "onRowAction",
          description:
            "Called when a user clicks a row or presses Enter on it. The checkbox still selects the row.",
        },
        {
          name: "resizable",
          description: "Adds a resize handle to each column header.",
        },
        {
          name: "showClearSelection",
          description:
            "Shows the Clear selection button in the header while rows are selected.",
        },
        {
          name: "renderSelectionActions",
          description:
            "Shows a bar with the selected count and your bulk actions while rows are selected. The bar replaces the header Clear selection button.",
        },
        {
          name: "renderFooter",
          description:
            "Replaces the row count and page controls below the table. The state has the visible row range, the filtered and total counts, the page index and count, and setPageIndex.",
        },
      ],
    }),
    apiPart<DataTableSelectionState>({
      name: "DataTableSelectionState",
      description: "The selection state that renderSelectionActions receives.",
      props: [
        {
          name: "selectedKeys",
          description:
            "Every selected row key, including rows on other pages and filters.",
        },
        {
          name: "selectedCount",
          description: "The number of selected rows.",
        },
        {
          name: "clearSelection",
          description: "Clears the selection.",
        },
      ],
    }),
    apiPart<DataTableColumn<unknown>>({
      name: "DataTableColumn",
      props: [
        {
          name: "id",
          description: "A stable key for the column.",
        },
        {
          name: "header",
          description:
            "The visible column header. A column filter uses it as its label.",
        },
        {
          name: "cell",
          description: "Renders the cell for a row.",
        },
        {
          name: "sortValue",
          description:
            "Turns on sorting for the column. Return a string or a number. Column filters use this value too.",
        },
        {
          name: "align",
          default: '"start"',
          description: "Aligns the header and cells. Use end for numbers.",
        },
        {
          name: "width",
          type: "number | string",
          description:
            'Starting width in pixels, a percentage, or a fraction such as "2fr".',
        },
        {
          name: "minWidth",
          type: "number | string",
          description: "Smallest width the column can resize to.",
        },
        {
          name: "filter",
          type: '{ type: "text" } | { type: "select"; options: readonly SelectOption[] }',
          description:
            "Adds a text or single-choice filter for a column with sortValue. Filters combine with search before sorting and pagination.",
        },
      ],
    }),
  ],
  "segmented-control": [
    apiPart<typeof SegmentedControl>({
      name: "SegmentedControl",
      props: [
        {
          name: "size",
          default: '"md"',
          description:
            "Sets the height, padding, and text size of every segment.",
        },
        {
          name: "fullWidth",
          description:
            "Stretches the control and its segments to the width of the parent.",
        },
        {
          name: "aria-label",
          default: '"Segments"',
          description:
            "Names the radio group. Change it to match the choice, such as View or Billing period.",
        },
        {
          name: "value",
          description: "The selected value, controlled.",
        },
        {
          name: "defaultValue",
          description: "The selected value at first, uncontrolled.",
        },
        {
          name: "onValueChange",
          description: "Called with the new value when the selection changes.",
        },
        {
          name: "name",
          description:
            "Submits the selected value with a form. Each segment renders a hidden radio input.",
        },
        {
          name: "form",
          description: "Associates the hidden inputs with a form by id.",
        },
        {
          name: "disabled",
          default: "false",
          description: "Disables every segment.",
        },
        {
          name: "invalid",
          default: "false",
          description: "Marks the group as invalid.",
        },
        {
          name: "required",
          default: "false",
          description: "Requires a selection before the form submits.",
        },
        {
          name: "readOnly",
          default: "false",
          description: "Keeps the value but stops changes.",
        },
        {
          name: "orientation",
          description: "Lays the segments in a row or a column.",
        },
        {
          name: "dir",
          description:
            "Sets the writing direction. The control also inherits the direction of its parent.",
        },
        {
          name: "ids",
          description: "Sets the ids of the group, indicator, and segments.",
        },
        {
          name: "getRootNode",
          description:
            "Resolves the document in custom environments such as iframes.",
        },
      ],
    }),
    apiPart<typeof SegmentedControlItem>({
      name: "SegmentedControlItem",
      props: [
        {
          name: "value",
          description: "The value that this segment sets.",
        },
        {
          name: "disabled",
          default: "false",
          description: "Disables this segment only.",
        },
        {
          name: "children",
          description:
            "The segment content. Add an icon and a label when the label alone is not clear.",
        },
      ],
    }),
    apiPart<typeof SegmentedControlContext>({
      name: "SegmentedControlContext",
      description:
        "Renders no DOM. Its children receive the radio-group api, including value, setValue, clearValue, focus, and getItemState.",
      props: [
        {
          name: "children",
          type: "(api: SegmentedControlApi) => ReactNode",
          description:
            "Draws custom content for the current api. Call it inside SegmentedControl.",
        },
      ],
    }),
  ],
  pagination: [
    apiPart<typeof Pagination>({
      name: "Pagination",
      props: [
        {
          name: "size",
          default: '"md"',
          description:
            "Uses the Button heights for each link and the ellipsis. Set it on Pagination or on one PaginationLink.",
        },
        {
          name: "aria-label",
          default: '"Pagination"',
          description:
            "Names the navigation landmark. Change it when a page has more than one pagination.",
        },
        {
          name: "count",
          default: "0",
          description:
            "The total number of items. The machine calculates the pages and ellipses from it.",
        },
        {
          name: "page",
          description: "The active page, controlled.",
        },
        {
          name: "defaultPage",
          default: "1",
          description: "The active page at first, uncontrolled.",
        },
        {
          name: "pageSize",
          default: "10",
          description: "The number of items on a page, controlled.",
        },
        {
          name: "defaultPageSize",
          default: "10",
          description: "The number of items on a page at first, uncontrolled.",
        },
        {
          name: "siblingCount",
          default: "1",
          description:
            "The number of pages shown on each side of the active page.",
        },
        {
          name: "boundaryCount",
          default: "1",
          description:
            "The number of pages shown at the start and the end of the list.",
        },
        {
          name: "getPageUrl",
          description:
            "Builds the URL of a page. Without it, PaginationPages renders buttons that change the page in place.",
        },
        {
          name: "type",
          description:
            'Chooses the trigger element. It defaults to "link" when getPageUrl is set, otherwise "button".',
        },
        {
          name: "onPageChange",
          description:
            "Called when the page changes. Update page here when it is controlled.",
        },
        {
          name: "onPageSizeChange",
          description: "Called when setPageSize changes the page size.",
        },
        {
          name: "translations",
          type: "{ rootLabel?: string; firstTriggerLabel?: string; prevTriggerLabel?: string; nextTriggerLabel?: string; lastTriggerLabel?: string; itemLabel?: (details: { page: number; totalPages: number }) => string }",
          description:
            "Localizes the navigation label, the trigger labels, and the page labels.",
        },
        {
          name: "dir",
          description: "Sets the writing direction in the machine.",
        },
        {
          name: "ids",
          description:
            "Sets the ids of the root, items, ellipses, and triggers for composition.",
        },
      ],
    }),
    apiPart<typeof PaginationPages>({
      name: "PaginationPages",
      description:
        "Renders the page links and ellipses from count, page, and pageSize.",
      props: [],
    }),
    apiPart<typeof PaginationLink>({
      name: "PaginationLink",
      props: [
        {
          name: "href",
          type: "string",
          description:
            "The URL of the page. Without it, handle onPress to change the page.",
        },
        {
          name: "value",
          description:
            "The page number. Inside Pagination with count, the machine sets the current page, the label, and the URL.",
        },
        {
          name: "isCurrent",
          default: "false",
          description:
            'Shows the link as the current page and sets aria-current="page". The current-page marker glides to the new link.',
        },
        {
          name: "isDisabled",
          default: "false",
          description:
            "Keeps the link visible but stops navigation. The link leaves the Tab order.",
        },
        {
          name: "onPress",
          description: "Called when the link is pressed.",
        },
        {
          name: "size",
          description:
            "Sets the size of this link. Without it, the link uses the size of the Pagination, or md.",
        },
      ],
    }),
    apiPart<typeof PaginationFirstTrigger>({
      name: "PaginationFirstTrigger",
      description:
        "Moves to the first page with the machine trigger props. It renders a link when the type is link, otherwise a button.",
      props: [
        {
          name: "size",
          description: "Uses the Pagination size when omitted.",
        },
      ],
    }),
    apiPart<typeof PaginationPrevTrigger>({
      name: "PaginationPrevTrigger",
      description: "Moves to the previous page with the machine trigger props.",
      props: [
        {
          name: "size",
          description: "Uses the Pagination size when omitted.",
        },
      ],
    }),
    apiPart<typeof PaginationNextTrigger>({
      name: "PaginationNextTrigger",
      description: "Moves to the next page with the machine trigger props.",
      props: [
        {
          name: "size",
          description: "Uses the Pagination size when omitted.",
        },
      ],
    }),
    apiPart<typeof PaginationLastTrigger>({
      name: "PaginationLastTrigger",
      description:
        "Moves to the last page with the machine trigger props. It renders a link when the type is link, otherwise a button.",
      props: [
        {
          name: "size",
          description: "Uses the Pagination size when omitted.",
        },
      ],
    }),
    apiPart<typeof PaginationContext>({
      name: "PaginationContext",
      description:
        "Renders no DOM. Its children receive the pagination api, including page, totalPages, pageRange, pages, setPage, setPageSize, and the trigger props.",
      props: [
        {
          name: "children",
          description:
            "Draws the custom content for the current api. Call it inside Pagination.",
        },
      ],
    }),
  ],
  timeline: [
    apiPart<typeof TimelineItem>({
      name: "TimelineItem",
      props: [
        {
          name: "status",
          description:
            'Sets the marker. Screen readers announce "Latest" or "Upcoming" before the item.',
        },
        {
          name: "icon",
          description:
            "Replaces the check or dot in the marker. Use a 14 pixel icon.",
        },
      ],
    }),
    apiPart<typeof TimelineTitle>({
      name: "TimelineTitle",
      props: [
        {
          name: "as",
          description: "Heading level for the event title.",
        },
      ],
    }),
  ],
  accordion: [
    apiPart<typeof Accordion>({
      name: "Accordion",
      props: [
        {
          name: "variant",
          description:
            "Shows sections as separate cards, or as rows with lines.",
        },
      ],
    }),
    apiPart<typeof AccordionItem>({
      name: "AccordionItem",
      props: [
        {
          name: "title",
          description:
            "Renders an AccordionTrigger with this text. The children go into an AccordionContent.",
        },
      ],
    }),
  ],
  alert: [
    apiPart<typeof Alert>({
      name: "Alert",
      props: [
        {
          name: "title",
          description:
            "Shows the variant icon and a heading, and moves the children into the description. Without it, compose the parts yourself.",
        },
        {
          name: "variant",
          description: "Sets the color and icon for the message.",
        },
        {
          name: "action",
          description:
            "Adds controls after the text, such as a button. Requires title.",
        },
        {
          name: "onDismiss",
          description:
            "Shows a close button and calls this function on press. Remove the alert here.",
        },
        {
          name: "dismissLabel",
          description: "Names the close button for screen readers.",
        },
        {
          name: "children",
          description:
            "The message. With title, it renders as the description.",
        },
        {
          name: "role",
          type: '"status" | "alert"',
          description:
            'Adds a live region role. Use "status" after an action and "alert" for an urgent error; without a role, a new alert is not announced.',
        },
      ],
    }),
  ],
  dialog: [
    apiPart<typeof DialogContent>({
      name: "DialogContent",
      props: [
        {
          name: "size",
          description:
            "The maximum width from 640px up: 24rem, 28rem, 36rem, or 48rem. full fills the screen less a 1rem gutter. On phones, every size is full width, and full also fills the height.",
        },
        {
          name: "children",
          description:
            "A function receives close, for example to close the dialog after a form submits.",
        },
        {
          name: "overlayProps",
          type: "ModalOverlayProps",
          default: "{ isDismissable: true }",
          description:
            'React Aria ModalOverlay props, such as isDismissable and isKeyboardDismissDisabled. With role="alertdialog", outside clicks never close the dialog.',
        },
        {
          name: "modalProps",
          type: "ModalProps",
          description:
            "Props for the panel. For a width that is not in size, set className here, for example sm:max-w-2xl.",
        },
      ],
    }),
    apiPart<typeof DialogClose>({
      name: "DialogClose",
      description: "Takes all Button props.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            'Text for the button. Without children, it shows an X icon labeled "Close dialog".',
        },
        {
          name: "variant",
          default: '"ghost"',
          description: "The Button variant.",
        },
        {
          name: "iconOnly",
          description:
            "Makes the button a square for one icon. The default is true without children and false with children.",
        },
        {
          name: "size",
          default: '"sm" without children, "md" with children',
          description:
            "The Button size. An icon-only close button uses sm to stay compact.",
        },
      ],
    }),
  ],
  popover: [
    apiPart<typeof Popover>({
      name: "Popover",
      props: [
        {
          name: "className",
          type: "string | ((values) => string)",
          description:
            "Set a width here, for example w-72. Without a width, the panel grows with its content, up to the viewport width minus 2rem. Use w-(--trigger-width) to match the trigger.",
        },
        {
          name: "maxHeight",
          description:
            "Caps the panel height. The panel always fits the viewport and scrolls when its content is taller. With PopoverArrow, the content scrolls inside the panel padding.",
        },
        {
          name: "arrowBoundaryOffset",
          description:
            "The minimum distance from the arrow to the panel edge. It keeps the arrow off the rounded corner.",
        },
        {
          name: "data-placement",
          type: '"top" | "bottom" | "left" | "right"',
          description:
            "Set on the panel. The side of the trigger that the panel opened on. The panel scales from --trigger-anchor-point.",
        },
        {
          name: "data-trigger",
          type: "string",
          description:
            "Set on the panel. The name of the component that opened it, for example DialogTrigger or PreviewTrigger.",
        },
      ],
    }),
    apiPart<typeof PopoverDialog>({
      name: "PopoverDialog",
      props: [
        {
          name: "children",
          description:
            'Moves focus into the panel and keeps it there. Name it with PopoverTitle or aria-label. Use the function form to close after an action. A Button with slot="close" inside it closes the popover.',
        },
      ],
    }),
  ],
  sheet: [
    apiPart<typeof Sheet>({
      name: "Sheet",
      props: [
        {
          name: "position",
          description:
            "The edge the sheet comes from. start and end mirror in right-to-left locales. A top or bottom sheet fits its content up to a maximum height. Set a fixed height with className.",
        },
        {
          name: "size",
          description:
            "A left or right sheet is 20rem, 26rem, 36rem, or 48rem wide, and always leaves 3.5rem of the page visible. A top or bottom sheet has a maximum width of 28rem, 42rem, 56rem, or 72rem. full fills the screen.",
        },
        {
          name: "inset",
          description:
            "Moves the sheet 0.5rem in from the screen edges and rounds all corners.",
        },
        {
          name: "swipeDirection",
          description:
            "The direction of a swipe or handle drag that closes the sheet. vertical and horizontal close toward either edge. Without it, the direction is the same as position. A center sheet uses vertical.",
        },
        {
          name: "snapPoints",
          description:
            "The visible size at each stop. Numbers are pixels. Strings are CSS lengths, and percentages are relative to the sheet. The sheet opens at the first stop. You can always drag it to full size. Below full size, a swipe on SheetBody resizes the sheet.",
        },
        {
          name: "preventDismissal",
          description:
            "Stops swipes, Escape, and outside clicks from closing the sheet. Snap points still work.",
        },
        {
          name: "isOpen",
          description:
            "Whether the sheet is open, controlled. Without isOpen and defaultOpen, a SheetTrigger can own the state instead. Then the Button inside the SheetTrigger opens the sheet.",
        },
        {
          name: "defaultOpen",
          description: "Whether the sheet is open at first, uncontrolled.",
        },
        {
          name: "onOpenChange",
          description:
            "Receives the new open state. When a SheetTrigger owns the state, set onOpenChange on the SheetTrigger.",
        },
        {
          name: "--sheet-stack-scale",
          type: "number",
          description:
            "How much the sheet shrinks while a nested sheet is open. The default is 0.94, or 0.96 for a side sheet. Set it in className. Set 1 to keep the size.",
        },
        {
          name: "--sheet-stack-x",
          type: "CSS length",
          description:
            "How far the sheet moves horizontally while a nested sheet is open. The default moves a side sheet 0.75rem away from its edge. Other sheets do not move horizontally. Set it in className. Set 0 to keep the position.",
        },
        {
          name: "--sheet-stack-y",
          type: "CSS length",
          description:
            "How far the sheet moves vertically while a nested sheet is open. The default moves a top or bottom sheet 0.5rem away from its edge. Other sheets do not move vertically. Set it in className. Set 0 to keep the position.",
        },
      ],
    }),
    apiPart<typeof SheetClose>({
      name: "SheetClose",
      description: "Takes all Button props.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            'Text for the button. Without children, it shows an X icon labeled "Close sheet".',
        },
        {
          name: "variant",
          description:
            "Choose default for a primary action, outline for a secondary action, or ghost for dismissal.",
        },
        {
          name: "iconOnly",
          description:
            "Makes the button a square for one icon. The default is true without children and false with children.",
        },
        {
          name: "size",
          default: '"sm" without children, "md" with children',
          description:
            "The Button size. An icon-only close button uses sm to stay compact.",
        },
      ],
    }),
  ],
  sidebar: [
    apiPart<typeof SidebarProvider>({
      name: "SidebarProvider",
      description:
        "Lays out the sidebar and the page area, and owns the collapsed state and the sheet state.",
      props: [
        {
          name: "isOpen",
          description: "Controls the collapsed state.",
        },
        {
          name: "defaultOpen",
          description:
            "Opens the wide sidebar at first. Set it to false to start as a rail.",
        },
        {
          name: "onOpenChange",
          description:
            "Receives the new collapsed state. Use it to save the state in a cookie or a parent.",
        },
        {
          name: "shortcut",
          description:
            "Toggles the sidebar with Mod+B. The shortcut does not fire in a field or while an event is already handled.",
        },
        {
          name: "--sidebar-width",
          type: "CSS length",
          default: "16rem",
          description:
            "Sets the width of the expanded sidebar. Set it on the provider.",
        },
        {
          name: "--sidebar-width-rail",
          type: "CSS length",
          default: "3.5rem",
          description: "Sets the width of the rail. Set it on the provider.",
        },
      ],
    }),
    apiPart<typeof Sidebar>({
      name: "Sidebar",
      props: [
        {
          name: "collapsible",
          description:
            "Sets icon to collapse to a rail, or none to keep the sidebar at full width.",
        },
        {
          name: "aria-label",
          default: '"Sidebar"',
          description: "Names the navigation landmark.",
        },
      ],
    }),
    apiPart<typeof SidebarMenu>({
      name: "SidebarMenu",
      props: [
        {
          name: "aria-label",
          description:
            "Names the nav landmark. Set it when the sidebar has more than one menu.",
        },
      ],
    }),
    apiPart<typeof SidebarHeader>({
      name: "SidebarHeader",
      description: "Holds the brand and the trigger at the top of the sidebar.",
      props: [],
    }),
    apiPart<typeof SidebarContent>({
      name: "SidebarContent",
      description:
        "The scrolling middle of the sidebar. It fades the top and bottom edges.",
      props: [],
    }),
    apiPart<typeof SidebarFooter>({
      name: "SidebarFooter",
      description:
        'Holds account or version content at the bottom. It hides in the rail unless a child sets data-rail="keep".',
      props: [],
    }),
    apiPart<typeof SidebarGroup>({
      name: "SidebarGroup",
      description: "Groups items under a label.",
      props: [
        {
          name: "aria-label",
          description: "Names the group when it has no SidebarGroupLabel.",
        },
        {
          name: "aria-labelledby",
          description:
            "Points to the label element. The group uses its SidebarGroupLabel by default.",
        },
      ],
    }),
    apiPart<typeof SidebarGroupLabel>({
      name: "SidebarGroupLabel",
      description:
        "Names a group. It becomes screen-reader-only in the rail so the icon items keep their context.",
      props: [],
    }),
    apiPart<typeof SidebarItem>({
      name: "SidebarItem",
      props: [
        {
          name: "href",
          description: "The link target.",
        },
        {
          name: "icon",
          description:
            "The icon before the label. It uses an 18px size and fills when isCurrent is set.",
        },
        {
          name: "isCurrent",
          description:
            'Marks the current page with aria-current="page" and the accent fill.',
        },
        {
          name: "badge",
          description:
            "A badge after the label. In the rail it shrinks to a 6px dot, and the text stays in the accessible name.",
        },
        {
          name: "tooltip",
          description:
            "The rail tooltip text. Without it, a string label is the text.",
        },
        {
          name: "onPress",
          description:
            "Runs on press. In the mobile sheet, the sheet closes after it.",
        },
      ],
    }),
    apiPart<typeof SidebarInset>({
      name: "SidebarInset",
      props: [
        {
          name: "render",
          description:
            "Renders a different element, such as main. The state argument is expanded or collapsed.",
        },
      ],
    }),
    apiPart<typeof SidebarTrigger>({
      name: "SidebarTrigger",
      description:
        "Toggles the rail in the wide layout, and opens the sheet in the narrow layout. Accepts Button props for variant and size.",
      props: [
        {
          name: "aria-label",
          description:
            'Names the button. The default is "Collapse sidebar", "Expand sidebar", or "Open navigation".',
        },
      ],
    }),
  ],
  resizable: [
    apiPart<typeof ResizableGroup>({
      name: "ResizableGroup",
      description:
        "Collects the panels and handles. Zag owns the sizes, the drag and key handling, and the collapse state.",
      props: [
        {
          name: "orientation",
          description:
            "Sets the axis. A horizontal group puts panels in a row, with vertical separators.",
        },
        {
          name: "layout",
          type: "number[]",
          description:
            "Controls the sizes as percentages that sum to 100. The group calls onLayoutChange for each change.",
        },
        {
          name: "defaultLayout",
          type: "number[]",
          description:
            "Sets the sizes at first and after a double-click on a handle.",
        },
        {
          name: "onLayoutChange",
          description:
            "Receives every size change, including each frame of a drag.",
        },
        {
          name: "onLayoutEnd",
          description:
            "Receives the final sizes at the end of a drag or a key press. Use it to save the layout.",
        },
        {
          name: "onResizeStart",
          description: "Called when a drag or a key resize starts.",
        },
        {
          name: "keyboardResizeBy",
          description: "Sets the pixel step for the arrow keys.",
        },
        {
          name: "nonce",
          description: "Sets the nonce for the injected cursor stylesheet.",
        },
        {
          name: "onCollapse",
          description: "Called when a panel collapses.",
        },
        {
          name: "onExpand",
          description: "Called when a panel expands.",
        },
        {
          name: "registry",
          description:
            "Shares drag state between nested splitters so an intersection resizes both.",
        },
        {
          name: "dir",
          description: "Sets the writing direction in the machine.",
        },
        {
          name: "ids",
          description: "Sets the ids of the root, panels, and triggers.",
        },
      ],
    }),
    apiPart<typeof ResizablePanel>({
      name: "ResizablePanel",
      description:
        "Sets its starting share of the group. Put padding on a child so a collapsed panel can reach zero.",
      props: [
        {
          name: "id",
          description:
            "Sets the panel DOM id, so a handle points at it with aria-controls. Panels without it get a generated id.",
        },
        {
          name: "order",
          description:
            "Orders the panel in the machine when panels render conditionally.",
        },
        {
          name: "defaultSize",
          type: "number | string",
          description:
            "Sets the share of the group. Panels without it share the free space equally.",
        },
        {
          name: "minSize",
          type: "number | string",
          description:
            "Sets the smallest size a drag or a key press can give the panel.",
        },
        {
          name: "maxSize",
          type: "number | string",
          description:
            "Sets the largest size a drag or a key press can give the panel.",
        },
        {
          name: "collapsible",
          description:
            "Lets the panel collapse to collapsedSize when it is dragged past half of minSize, or with Enter on the handle.",
        },
        {
          name: "collapsedSize",
          type: "number | string",
          description: "Sets the size of a collapsed panel.",
        },
        {
          name: "resizeBehavior",
          description: "Sets how the panel behaves when the group resizes.",
        },
      ],
    }),
    apiPart<typeof ResizableHandle>({
      name: "ResizableHandle",
      description:
        "Drags with a pointer, moves with the arrow keys, and resets the layout on a double-click.",
      props: [
        {
          name: "withGrip",
          description: "Shows a grip pill in the middle of the line.",
        },
        {
          name: "disabled",
          description: "Stops the handle from resizing.",
        },
        {
          name: "aria-label",
          default: '"Resize panels"',
          description: "Names the separator.",
        },
      ],
    }),
    apiPart<typeof ResizableHandleIndicator>({
      name: "ResizableHandleIndicator",
      description:
        "Draws the machine resize-trigger indicator inside a handle. The handle supplies the trigger id.",
      props: [
        {
          name: "triggerId",
          type: "string",
          description: "Overrides the trigger id from the enclosing handle.",
        },
      ],
    }),
    apiPart<typeof ResizableContext>({
      name: "ResizableContext",
      description:
        "Renders no DOM. Its children receive the splitter api: dragging, getSizes, setSizes, getPanels, getPanelSize, collapsePanel, expandPanel, resizePanel, getLayout, and resetSizes.",
      props: [
        {
          name: "children",
          description: "Draws custom content inside ResizableGroup.",
        },
      ],
    }),
  ],
  badge: [
    apiPart<typeof Badge>({
      name: "Badge",
      props: [
        {
          name: "variant",
          description: "Sets the color and emphasis.",
        },
        {
          name: "dot",
          description:
            "Shows a dot before the label. The dot is hidden from screen readers.",
        },
        {
          name: "children",
          description:
            "The label. It stays on one line and truncates when space is short.",
        },
      ],
    }),
  ],
  checkbox: [
    apiPart<typeof Checkbox>({
      name: "Checkbox",
      props: [
        {
          name: "children",
          description:
            "The label. Without it, pass aria-label so the checkbox has a name.",
        },
        {
          name: "description",
          description:
            "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
        },
        {
          name: "errorMessage",
          description:
            "Shown below the label when isRequired, validate, or isInvalid makes the checkbox invalid. Without it, the browser validation message shows.",
        },
        {
          name: "variant",
          default: '"default"',
          description:
            "Selects the plain or card appearance. A card toggles the checkbox from anywhere inside it, so keep its description plain text. CheckboxField takes the same prop.",
        },
      ],
    }),
  ],
  "checkbox-group": [
    apiPart<typeof CheckboxGroup>({
      name: "CheckboxGroup",
      props: [
        {
          name: "label",
          description:
            "The label of the group. Without it, pass aria-label or compose CheckboxGroupLabel.",
        },
        {
          name: "description",
          description: "Help text for the group, below the label.",
        },
        {
          name: "errorMessage",
          description:
            "Shown below the options when the group is invalid. Without it, the browser validation message shows. With label, description, or errorMessage, the group adds CheckboxGroupError for you.",
        },
        {
          name: "orientation",
          description: "Lays out the options in a column or a wrapping row.",
        },
      ],
    }),
  ],
  autocomplete: [
    apiPart<typeof Autocomplete>({
      name: "Autocomplete",
      props: [
        {
          name: "filter",
          description:
            "Decides which items match the input. Without it, an item matches when its text contains the input. The default ignores case and accents.",
        },
      ],
    }),
  ],
  switch: [
    apiPart<typeof Switch>({
      name: "Switch",
      props: [
        {
          name: "children",
          description:
            "The label. Without it, pass aria-label so the switch has a name.",
        },
        {
          name: "description",
          description:
            "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
        },
        {
          name: "errorMessage",
          description:
            "Shown below the label when isRequired, validate, or isInvalid makes the switch invalid. Without it, the browser validation message shows.",
        },
      ],
    }),
  ],
  tabs: [
    apiPart<typeof TabList>({
      name: "TabList",
      props: [
        {
          name: "size",
          description:
            "Uses the Button heights for each tab. Without a size, tabs are 44 pixels high on small screens and 36 pixels from 640 pixels.",
        },
      ],
    }),
    apiPart<typeof Tab>({
      name: "Tab",
      props: [
        {
          name: "id",
          description: "Connects the tab to the TabPanel with the same id.",
        },
        {
          name: "size",
          description:
            "Sets the size of this tab. It overrides the size of the TabList.",
        },
      ],
    }),
    apiPart<typeof TabPanel>({
      name: "TabPanel",
      props: [
        {
          name: "id",
          description: "Connects the panel to the Tab with the same id.",
        },
      ],
    }),
  ],
  "date-field": [
    apiPart<typeof DateField>({
      name: "DateField",
      props: [
        {
          name: "size",
          default: '"lg"',
          description: "Sets the size of the field.",
        },
        {
          name: "label",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          description: "Help text below the field.",
        },
      ],
    }),
  ],
  "time-field": [
    apiPart<typeof TimeField>({
      name: "TimeField",
      props: [
        {
          name: "size",
          default: '"lg"',
          description: "Sets the size of the field.",
        },
        {
          name: "label",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          description: "Help text below the field.",
        },
      ],
    }),
  ],
  calendar: [
    apiPart<typeof CalendarHeader>({
      name: "CalendarHeader",
      props: [
        {
          name: "children",
          description:
            "Replaces the month heading between the previous and next buttons.",
        },
      ],
    }),
    apiPart<typeof CalendarMonthPicker>({
      name: "CalendarMonthPicker",
      props: [
        {
          name: "format",
          default: '"short"',
          description: "Sets the format of the month names.",
        },
        {
          name: "children",
          description:
            "Renders a custom picker. Pass the picker props to a Select.",
        },
      ],
    }),
    apiPart<typeof CalendarYearPicker>({
      name: "CalendarYearPicker",
      props: [
        {
          name: "visibleYears",
          default: "20",
          description:
            "Sets the number of years in the list. minValue and maxValue limit the range.",
        },
        {
          name: "format",
          description: "Sets the format of the years.",
        },
        {
          name: "children",
          description:
            "Renders a custom picker. Pass the picker props to a Select.",
        },
      ],
    }),
  ],
  "date-picker": [
    apiPart<typeof DatePicker>({
      name: "DatePicker",
      props: [
        {
          name: "size",
          default: '"lg"',
          description: "Sets the size of the field and of the calendar button.",
        },
        {
          name: "presets",
          description:
            "Shortcuts beside the calendar, such as Today. Each has a label and a value. A preset sets the value and closes the calendar.",
        },
        {
          name: "label",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          description: "Help text below the field.",
        },
      ],
    }),
  ],
  "date-range-picker": [
    apiPart<typeof DateRangePicker>({
      name: "DateRangePicker",
      props: [
        {
          name: "size",
          default: '"lg"',
          description: "Sets the size of the field and of the calendar button.",
        },
        {
          name: "presets",
          description:
            "Shortcuts beside the calendar, such as Last 7 days. Each has a label and a start and end value. A preset sets the value and closes the calendar.",
        },
        {
          name: "label",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          description: "Help text below the field.",
        },
      ],
    }),
  ],
  "color-field": [
    apiPart<typeof ColorField>({
      name: "ColorField",
      props: [
        {
          name: "size",
          default: '"lg"',
          description: "Sets the size of the field.",
        },
        {
          name: "label",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          description: "Help text below the field.",
        },
      ],
    }),
  ],
  "color-picker": [
    apiPart<typeof ColorPicker>({
      name: "ColorPicker",
      props: [
        {
          name: "label",
          description:
            "Text on the trigger. The popover uses it in its accessible name.",
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Replaces the default trigger and popover. Without it, ColorPicker shows its built-in layout.",
        },
      ],
    }),
  ],
  "color-wheel": [
    apiPart<typeof ColorWheel>({
      name: "ColorWheel",
      props: [
        {
          name: "outerRadius",
          description: "Outer radius of the track, in pixels.",
        },
        {
          name: "innerRadius",
          default: "outerRadius - 24",
          description: "Inner radius of the track, in pixels.",
        },
        {
          name: "children",
          description: "Content in the center of the wheel.",
        },
      ],
    }),
  ],
  "file-trigger": [
    apiPart<typeof FileTrigger>({
      name: "FileTrigger",
      props: [
        {
          name: "label",
          description:
            "Text for the default outline button. To use a different trigger, pass it as children.",
        },
      ],
    }),
  ],
  meter: [
    apiPart<typeof Meter>({
      name: "Meter",
      props: [
        {
          name: "label",
          description:
            "Shows a label above the meter. Without it, pass aria-label.",
        },
      ],
    }),
  ],
  "progress-bar": [
    apiPart<typeof ProgressBar>({
      name: "ProgressBar",
      props: [
        {
          name: "label",
          description:
            "Shows a label above the bar. Without it, pass aria-label.",
        },
      ],
    }),
  ],
  "number-field": [
    apiPart<typeof NumberField>({
      name: "NumberField",
      props: [
        {
          name: "size",
          default: '"lg"',
          description: "Sets the size of the field and of the step buttons.",
        },
        {
          name: "steppers",
          description:
            "Puts the step buttons on each side of the value, or stacks them at the end.",
        },
        {
          name: "label",
          description: "Label above the field.",
        },
        {
          name: "description",
          description: "Help text below the field.",
        },
      ],
    }),
  ],
  "search-field": [
    apiPart<typeof SearchField>({
      name: "SearchField",
      props: [
        {
          name: "size",
          default: '"lg"',
          description:
            "Sets the size of the field, the search icon, and the clear button. The clear button shows only when the field has a value.",
        },
        {
          name: "label",
          description: "Label above the field in the default layout.",
        },
        {
          name: "description",
          description: "Help text below the field in the default layout.",
        },
        {
          name: "placeholder",
          description: "Input placeholder in the default layout.",
        },
      ],
    }),
  ],
  slider: [
    apiPart<typeof Slider>({
      name: "Slider",
      props: [
        {
          name: "label",
          description: "Label above the track, next to the value.",
        },
        {
          name: "thumbLabels",
          description:
            "Names each handle, in value order. Give one when defaultValue or value is an array.",
        },
        {
          name: "marks",
          description:
            "Values to label along the track. For custom labels, compose SliderMarks.",
        },
        {
          name: "fillOffset",
          description:
            "The value the fill starts from. Set 0 for a range that goes below zero.",
        },
        {
          name: "orientation",
          default: '"horizontal"',
          description:
            "A vertical slider is 14rem tall. Set the height with className.",
        },
      ],
    }),
    apiPart<typeof SliderMarks>({
      name: "SliderMarks",
      props: [
        {
          name: "values",
          description:
            "The values to label. Labels in the selected range use the foreground color.",
        },
        {
          name: "children",
          description:
            "Renders each label. Without it, the slider formatOptions format the value.",
        },
        {
          name: "offset",
          description:
            "The offset of the SliderRange fill, so labels in the filled part use the foreground color.",
        },
      ],
    }),
  ],
  "text-field": [
    apiPart<typeof TextField>({
      name: "TextField",
      props: [
        {
          name: "size",
          default: '"lg"',
          description:
            "Sets the height, padding, radius, text, and icon size of the field. The parts inside the field use it.",
        },
        {
          name: "label",
          description: "Label above the field in the default layout.",
        },
        {
          name: "description",
          description: "Help text below the field in the default layout.",
        },
        {
          name: "placeholder",
          description: "Input placeholder in the default layout.",
        },
      ],
    }),
  ],
  "text-area": [
    apiPart<typeof TextArea>({
      name: "TextArea",
      props: [
        {
          name: "size",
          default: '"lg"',
          description:
            "Sets the padding, radius, and text size. The height does not change.",
        },
        {
          name: "label",
          description: "Label above the field in the default layout.",
        },
        {
          name: "description",
          description: "Help text below the field in the default layout.",
        },
        {
          name: "placeholder",
          description: "Input placeholder in the default layout.",
        },
        {
          name: "rows",
          description: "Number of visible text lines.",
        },
      ],
    }),
  ],
  "radio-group": [
    apiPart<typeof RadioGroup>({
      name: "RadioGroup",
      props: [
        {
          name: "label",
          description:
            "The label of the group. Without it, pass aria-label or compose RadioGroupLabel.",
        },
        {
          name: "description",
          description: "Help text for the group, below the label.",
        },
        {
          name: "errorMessage",
          description:
            "Shown below the options when the group is invalid. Without it, the browser validation message shows. With label, description, or errorMessage, the group adds RadioGroupError for you.",
        },
      ],
    }),
    apiPart<typeof Radio>({
      name: "Radio",
      props: [
        {
          name: "children",
          description:
            "The label. Without it, pass aria-label so the option has a name.",
        },
        {
          name: "description",
          description:
            "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
        },
        {
          name: "variant",
          default: '"default"',
          description:
            "Selects the plain or card appearance. A card selects the option from anywhere inside it, so keep its description plain text. RadioField takes the same prop.",
        },
      ],
    }),
  ],
  toast: [
    apiPart<typeof ToastViewport>({
      name: "ToastViewport",
      props: [
        {
          name: "children",
          type: "({ toast }) => ReactElement",
          description:
            "Renders each toast. Build it from Toast, ToastIcon, ToastContent, ToastTitle, ToastDescription, ToastAction, and ToastClose.",
        },
      ],
    }),
    apiPart<ToastMessage>({
      name: "showToast message",
      description:
        "showToast(message, options) shows a toast and returns its key. To close that toast, call toastQueue.close(key).",
      props: [
        {
          name: "title",
          description: "The main text of the toast.",
        },
        {
          name: "description",
          description: "Text below the title.",
        },
        {
          name: "variant",
          default: '"info"',
          description: "Sets the icon and its colors.",
        },
        {
          name: "action",
          description:
            "Adds a button after the text. A press calls onAction and closes the toast.",
        },
      ],
    }),
    apiPart<NonNullable<Parameters<typeof showToast>[1]>>({
      name: "showToast options",
      props: [
        {
          name: "timeout",
          default: "5000",
          description:
            "Milliseconds before the toast closes. Values under 5000 become 5000. Set 0 to keep the toast open until the user closes it. A toast with an action defaults to 0. Hover and focus pause the timer.",
        },
      ],
    }),
  ],
  tooltip: [
    apiPart<typeof TooltipTrigger>({
      name: "TooltipTrigger",
      props: [
        {
          name: "delay",
          description:
            "Milliseconds of hover before the tooltip opens. Keyboard focus opens it at once.",
        },
      ],
    }),
    apiPart<typeof Tooltip>({
      name: "Tooltip",
      props: [
        {
          name: "offset",
          description: "Distance from the trigger in pixels.",
        },
        {
          name: "placement",
          type: '"top" | "bottom" | "left" | "right" | "start" | "end"',
          default: '"top"',
          description:
            "The side of the trigger that the tooltip opens on. If there is not sufficient space, the tooltip moves to the opposite side.",
        },
        {
          name: "arrowBoundaryOffset",
          description:
            "The minimum distance from TooltipArrow to the tooltip edge. It keeps the arrow off the rounded corner.",
        },
      ],
    }),
  ],
  tour: [
    apiPart<typeof Tour>({
      name: "Tour",
      description:
        "Owns the open state and the step. Renders one non-modal popover and one spotlight.",
      props: [
        {
          name: "steps",
          description:
            "Sets the guide. Each step needs an `id` that matches a `TourTarget`, a title, and a description.",
        },
        {
          name: "isOpen",
          description: "Controls the tour.",
        },
        {
          name: "defaultOpen",
          description: "Opens the tour at first, at `defaultStep`.",
        },
        {
          name: "onOpenChange",
          description: "Receives requests to open or close the tour.",
        },
        {
          name: "step",
          description: "Sets the current step, counted from zero.",
        },
        {
          name: "defaultStep",
          description: "Sets the step that opens first.",
        },
        {
          name: "onStepChange",
          description:
            "Receives each step change from Next, Back, or `start`. A step without a mounted target is skipped in the direction of travel.",
        },
        {
          name: "onComplete",
          description:
            "Runs when Done is pressed on the last reachable step. The consumer saves progress here.",
        },
        {
          name: "onSkip",
          description: "Runs on Skip tour and on Escape.",
        },
        {
          name: "spotlight",
          description:
            "Dims the page except for the target and blocks clicks outside it. Set it to `false` to keep the page usable.",
        },
      ],
    }),
    apiPart<typeof TourTarget>({
      name: "TourTarget",
      description:
        "Wraps the element that a step points at. Its first element child is the target. The id matches the step id.",
      props: [
        {
          name: "id",
          description: "Matches the `id` of the step that points here.",
        },
      ],
    }),
  ],
  "toggle-button": [
    apiPart<typeof ToggleButton>({
      name: "ToggleButton",
      props: [
        {
          name: "variant",
          description:
            "Sets the surface. Use segmented inside a ToggleButtonGroup. All variants show the selected state.",
        },
        {
          name: "size",
          default: '"md"',
          description:
            "Uses the Button heights. Without a size, a segmented toggle is 44 pixels high on small screens and 36 pixels from 640 pixels.",
        },
        {
          name: "iconOnly",
          description:
            "Makes the toggle a square for one icon. Give the toggle an aria-label.",
        },
      ],
    }),
  ],
  "toggle-button-group": [
    apiPart<typeof ToggleButtonGroup>({
      name: "ToggleButtonGroup",
      props: [
        {
          name: "size",
          description:
            "Sets the size of each toggle in the group. A size on a toggle overrides it.",
        },
      ],
    }),
  ],
  toolbar: [
    apiPart<typeof Toolbar>({
      name: "Toolbar",
      props: [
        {
          name: "size",
          description:
            "Sets the size of each button, toggle, and toggle group in the toolbar. Popovers and dialogs that open from the toolbar keep the default size.",
        },
      ],
    }),
  ],
  "token-field": [
    apiPart<typeof TokenField>({
      name: "TokenField",
      props: [
        {
          name: "size",
          default: '"lg"',
          description: "Sets the size of the input box. Tokens keep one size.",
        },
        {
          name: "label",
          description:
            "Label above the field in the default layout. Without it, pass aria-label.",
        },
        {
          name: "description",
          description: "Help text below the field in the default layout.",
        },
        {
          name: "placeholder",
          description: "Input placeholder in the default layout.",
        },
      ],
    }),
  ],
  "tag-group": [
    apiPart<typeof TagGroup>({
      name: "TagGroup",
      props: [
        {
          name: "size",
          default: '"md"',
          description:
            "Sets the size of each tag and its remove button. A size on a tag overrides it.",
        },
      ],
    }),
  ],
  "spotlight-card": [
    apiPart<typeof SpotlightCard>({
      name: "SpotlightCard",
      description:
        "Accepts the same props as `Card`. Compose it with the Card parts.",
      props: [
        {
          name: "--spotlight-color",
          type: "CSS color",
          default: "var(--color-foreground)",
          description: "Color of the glow and the border light.",
        },
        {
          name: "--spotlight-size",
          type: "CSS length",
          default: "20rem",
          description: "Radius of the light around the pointer.",
        },
      ],
    }),
  ],
  "border-beam": [
    apiPart<typeof BorderBeam>({
      name: "BorderBeam",
      props: [
        {
          name: "active",
          description: "Shows the beam. Set false to remove it.",
        },
        {
          name: "duration",
          description: "Time in seconds for one lap around the border.",
        },
        {
          name: "--border-beam-color",
          type: "CSS color",
          default: "var(--color-foreground)",
          description: "Color of the beam. Set it in className.",
        },
        {
          name: "--border-beam-width",
          type: "CSS length",
          default: "1px",
          description:
            "Width of the beam. Make it the same as the border width.",
        },
      ],
    }),
  ],
  "progressive-blur": [
    apiPart<typeof ProgressiveBlur>({
      name: "ProgressiveBlur",
      props: [
        {
          name: "side",
          description:
            "Edge with the strongest blur. The component sits on this edge of its positioned parent.",
        },
        {
          name: "blur",
          description: "Blur radius in pixels at the edge.",
        },
      ],
    }),
  ],
  "signature-pad": [
    apiPart<typeof SignaturePad>({
      name: "SignaturePad",
      props: [
        {
          name: "label",
          description: "Visible label above the drawing area.",
        },
        {
          name: "description",
          description: "Help text below the drawing area.",
        },
        {
          name: "error",
          description:
            "Message below the drawing area while `isInvalid` is true.",
        },
        {
          name: "placeholder",
          description: "Text in the empty drawing area.",
        },
        {
          name: "size",
          description: "Height of the drawing area.",
        },
        {
          name: "name",
          description:
            "Submits the PNG data URL in a hidden input. The value updates when a stroke ends. Validate the pad with `isInvalid`.",
        },
        {
          name: "form",
          description: "Associates the hidden input with a form by id.",
        },
        {
          name: "paths",
          description: "The committed strokes, controlled.",
        },
        {
          name: "defaultPaths",
          description: "The strokes to draw first, uncontrolled.",
        },
        {
          name: "drawing",
          description:
            "The stroke options. The defaults use `currentColor` and size 3.",
        },
        {
          name: "disabled",
          description: "Disables drawing and the clear button.",
        },
        {
          name: "readOnly",
          description: "Shows the strokes but stops changes.",
        },
        {
          name: "required",
          description:
            "Marks the pad as required. Validate it with `isInvalid`.",
        },
        {
          name: "invalid",
          description: "Marks the pad as invalid and shows the error.",
        },
        {
          name: "dataUrlType",
          default: '"image/png"',
          description: "The image type of the captured value.",
        },
        {
          name: "quality",
          description: "The quality of a lossy capture, from 0 to 1.",
        },
        {
          name: "onDraw",
          description: "Called with the committed strokes while drawing.",
        },
        {
          name: "onDrawEnd",
          description: "Called when a stroke ends.",
        },
        {
          name: "onValueChange",
          description:
            "Called with the data URL after a stroke ends or the pad is cleared.",
        },
        {
          name: "translations",
          description:
            "Overrides the accessible labels of the pad and clear button.",
        },
        {
          name: "dir",
          description: "Sets the writing direction of the pad.",
        },
        {
          name: "ids",
          description: "Sets the ids of the pad parts.",
        },
        {
          name: "getRootNode",
          description:
            "Resolves the document in custom environments such as iframes.",
        },
      ],
    }),
    apiPart<typeof SignaturePadRoot>({
      name: "SignaturePadRoot",
      description:
        "Owns the machine and renders the root. It takes the SignaturePad props without the default field content, plus `children`.",
      props: [
        {
          name: "children",
          description: "The composed parts.",
        },
      ],
    }),
    apiPart<typeof SignaturePadLabel>({
      name: "SignaturePadLabel",
      props: [],
    }),
    apiPart<typeof SignaturePadControl>({
      name: "SignaturePadControl",
      description:
        "The drawing surface. It takes focus and receives pointer input.",
      props: [],
    }),
    apiPart<typeof SignaturePadSegment>({
      name: "SignaturePadSegment",
      description:
        "Renders the strokes. Without children, it maps the committed and current paths.",
      props: [
        {
          name: "children",
          description: "Replaces the default paths with custom SVG content.",
        },
      ],
    }),
    apiPart<typeof SignaturePadPath>({
      name: "SignaturePadPath",
      props: [
        {
          name: "path",
          description: "The SVG path data of one stroke.",
        },
      ],
    }),
    apiPart<typeof SignaturePadGuide>({
      name: "SignaturePadGuide",
      description: "Draws the baseline guide. It takes no pointer events.",
      props: [],
    }),
    apiPart<typeof SignaturePadClearTrigger>({
      name: "SignaturePadClearTrigger",
      description:
        "Clears the pad. The machine hides it while the pad is empty or a stroke is in progress.",
      props: [
        {
          name: "children",
          description: 'Replaces the default "Clear" label.',
        },
      ],
    }),
    apiPart<typeof SignaturePadHiddenInput>({
      name: "SignaturePadHiddenInput",
      props: [
        {
          name: "value",
          description: "Overrides the captured data URL.",
        },
        {
          name: "form",
          description: "Associates the input with a form by id.",
        },
      ],
    }),
    apiPart<typeof SignaturePadDescription>({
      name: "SignaturePadDescription",
      props: [],
    }),
    apiPart<typeof SignaturePadError>({
      name: "SignaturePadError",
      props: [],
    }),
  ],
  "qr-code": [
    apiPart<typeof QrCode>({
      name: "QrCode",
      props: [
        {
          name: "value",
          description: "The value to encode, controlled.",
        },
        {
          name: "defaultValue",
          description: "The value to encode at first, uncontrolled.",
        },
        {
          name: "size",
          description: "The size of the code in the page.",
        },
        {
          name: "label",
          default: '"QR code"',
          description: "The accessible name of the code.",
        },
        {
          name: "overlay",
          description:
            "A logo centered over the code. Sets the error correction to H unless `encoding` overrides it.",
        },
        {
          name: "download",
          type: "boolean | { fileName?: string; mimeType?: string; quality?: number }",
          description: "Shows a download button with PNG, JPEG, or SVG output.",
        },
        {
          name: "pixelSize",
          default: "10",
          description: "The pixel size of one module.",
        },
        {
          name: "encoding",
          description: "The encoding options, such as `ecc` and `boostEcc`.",
        },
        {
          name: "onValueChange",
          description: "Called when the encoded value changes.",
        },
        {
          name: "children",
          description: "Renders below the code, such as a caption.",
        },
        {
          name: "dir",
          description: "Sets the writing direction.",
        },
        {
          name: "ids",
          description: "Sets the ids of the qr code parts.",
        },
        {
          name: "getRootNode",
          description:
            "Resolves the document in custom environments such as iframes.",
        },
      ],
    }),
    apiPart<typeof QrCodeRoot>({
      name: "QrCodeRoot",
      description:
        "Owns the encoded value and renders the root. Compose the frame, pattern, overlay, and trigger inside it.",
      props: [
        {
          name: "children",
          description: "The composed parts.",
        },
      ],
    }),
    apiPart<typeof QrCodeFrame>({
      name: "QrCodeFrame",
      description:
        "Renders the code on a white surface with a quiet zone. The download keeps both.",
      props: [
        {
          name: "label",
          description: "The accessible name of the code.",
        },
      ],
    }),
    apiPart<typeof QrCodePattern>({
      name: "QrCodePattern",
      description: "Draws the modules with `fill-current`.",
      props: [],
    }),
    apiPart<typeof QrCodeOverlay>({
      name: "QrCodeOverlay",
      description:
        "Centers its children in the nearest positioned element. Wrap it with the frame in a `relative` element when the root holds other parts.",
      props: [
        {
          name: "children",
          description: "The logo image.",
        },
      ],
    }),
    apiPart<typeof QrCodeDownloadTrigger>({
      name: "QrCodeDownloadTrigger",
      description:
        "Downloads the code. The file includes the overlay when it renders.",
      props: [
        {
          name: "fileName",
          description: "The name of the downloaded file.",
        },
        {
          name: "mimeType",
          description: "The image type of the downloaded file.",
        },
        {
          name: "quality",
          description: "The quality of a lossy download, from 0 to 1.",
        },
        {
          name: "variant",
          description: "The visual emphasis of the trigger.",
        },
        {
          name: "size",
          description: "The size of the trigger.",
        },
        {
          name: "children",
          description: 'Replaces the default "Download" label.',
        },
      ],
    }),
  ],
};
