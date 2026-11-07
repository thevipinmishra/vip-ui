import type { Accordion, AccordionItem } from "@/components/ui/accordion";
import type { AgentStatus } from "@/components/ui/agent-status";
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
import type { Checkbox } from "@/components/ui/checkbox";
import type { CheckboxGroup } from "@/components/ui/checkbox-group";
import type { ColorField } from "@/components/ui/color-field";
import type { ColorPicker } from "@/components/ui/color-picker";
import type { ComboBoxProps, ComboBoxTags } from "@/components/ui/combo-box";
import type {
  CommandPalette,
  CommandPaletteItem,
  CommandPaletteSection,
} from "@/components/ui/command-palette";
import type { CopyButton } from "@/components/ui/copy-button";
import type { DataTable, DataTableColumn } from "@/components/ui/data-table";
import type { DateField } from "@/components/ui/date-field";
import type { DatePicker } from "@/components/ui/date-picker";
import type { DateRangePicker } from "@/components/ui/date-range-picker";
import type { DialogClose, DialogContent } from "@/components/ui/dialog";
import type { EmptyStateTitle } from "@/components/ui/empty-state";
import type { FileTrigger } from "@/components/ui/file-trigger";
import type { Highlighter } from "@/components/ui/highlighter";
import type { IconSwap } from "@/components/ui/icon-swap";
import type { InlineEdit } from "@/components/ui/inline-edit";
import type { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import type { LayoutMorph } from "@/components/ui/layout-morph";
import type { Marquee } from "@/components/ui/marquee";
import type { MenuItem, MenuSection } from "@/components/ui/menu";
import type { Message } from "@/components/ui/message";
import type { Meter } from "@/components/ui/meter";
import type { NativeSelect } from "@/components/ui/native-select";
import type { NumberField } from "@/components/ui/number-field";
import type { Pagination, PaginationLink } from "@/components/ui/pagination";
import type { PasswordField } from "@/components/ui/password-field";
import type { Popover, PopoverDialog } from "@/components/ui/popover";
import type { Presence } from "@/components/ui/presence";
import type { PresenceList } from "@/components/ui/presence-list";
import type { ProgressBar } from "@/components/ui/progress-bar";
import type { ProgressRing } from "@/components/ui/progress-ring";
import type { ProgressiveBlur } from "@/components/ui/progressive-blur";
import type {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/components/ui/prompt-input";
import type { Radio, RadioGroup } from "@/components/ui/radio-group";
import type { RatingInput } from "@/components/ui/rating-input";
import type { Reasoning, ReasoningPanel } from "@/components/ui/reasoning";
import type { Response, ResponseContent } from "@/components/ui/response";
import type { ScrollFade } from "@/components/ui/scroll-fade";
import type { SearchField } from "@/components/ui/search-field";
import type { Select, SelectSection } from "@/components/ui/select";
import type { Sheet, SheetClose } from "@/components/ui/sheet";
import type { Slider, SliderMarks } from "@/components/ui/slider";
import type { SourceLink } from "@/components/ui/source-link";
import type { Spinner } from "@/components/ui/spinner";
import type { SpotlightCard } from "@/components/ui/spotlight-card";
import type { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";
import type { StatTrend } from "@/components/ui/stat";
import type { Stepper } from "@/components/ui/stepper";
import type { Switch } from "@/components/ui/switch";
import type { Column, TableLoadMoreItem } from "@/components/ui/table";
import type {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import type { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { TreeItem } from "@/components/ui/tree";

interface ApiEntry {
  type: string;
  description: string;
}

export interface ApiProp extends ApiEntry {
  name: string;
  required?: true;
  default?: string;
}

export interface ApiPart {
  name: string;
  description?: string;
  props: readonly ApiProp[];
}

type PropsOf<T> = T extends (props: infer P) => unknown ? P : T;
type Keys<P> = Extract<keyof P, string>;
type RequiredKeys<P> = {
  [K in Keys<P>]-?: object extends Pick<P, K> ? never : K;
}[Keys<P>];

type TypedProp<P> =
  | (ApiEntry & { name: RequiredKeys<P>; required: true })
  | (ApiEntry & {
      name:
        | Exclude<Keys<P>, RequiredKeys<P>>
        | `--${string}`
        | `data-${string}`;
      required?: never;
      default?: string;
    });

export function apiPart<T>(part: {
  name: string;
  description?: string;
  props: readonly TypedProp<PropsOf<T>>[];
}): ApiPart {
  return part;
}

export function showsPartHeadings(parts: readonly ApiPart[], slug: string) {
  return (
    parts.length > 1 ||
    parts[0]?.name.toLowerCase() !== slug.replaceAll("-", "")
  );
}

export const componentApi: Record<string, readonly ApiPart[]> = {
  "text-reveal": [
    apiPart<typeof TextReveal>({
      name: "TextReveal",
      props: [
        {
          name: "text",
          type: "string",
          required: true,
          description:
            "Sets the text to reveal. Screen readers read it once, as plain text.",
        },
        {
          name: "split",
          type: '"words" | "characters"',
          default: '"words"',
          description:
            "Reveal by word or by character. Use words for scripts that join letters, such as Arabic.",
        },
        {
          name: "trigger",
          type: '"mount" | "in-view"',
          default: '"in-view"',
          description:
            "Start on mount, or the first time the text comes into view.",
        },
        {
          name: "stagger",
          type: "number",
          default: "0.045",
          description:
            "Delay in seconds between units. Long text uses a shorter delay, so the last unit starts within 0.6 seconds of the first.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
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
          type: "string",
          required: true,
          description:
            "Sets the text to show. A change starts a scramble; the first value shows without one. Add `aria-live` to announce the final text.",
        },
        {
          name: "duration",
          type: "number",
          default: "0.7",
          description:
            "Sets the time in seconds to resolve the text. Set 0 to change the text without a scramble.",
        },
        {
          name: "glyphs",
          type: "string",
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
          type: "boolean",
          required: true,
          description:
            "Shows or hides the content. The content is inert during its exit. Move focus before you hide focused content.",
        },
        {
          name: "as",
          type: '"div" | "span"',
          default: '"div"',
          description: "Outer element. A span is inline-block, so it can move.",
        },
        {
          name: "distance",
          type: "number",
          default: "8",
          description: "Travel in pixels for the entrance and the exit.",
        },
        {
          name: "duration",
          type: "number",
          default: "0.2",
          description:
            "Entrance time in seconds. The exit takes 70% of this time.",
        },
        {
          name: "collapse",
          type: "boolean",
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
          type: '"div" | "ul" | "ol"',
          default: '"div"',
          description:
            "Use ul or ol with li StaggerItem children for a semantic list.",
        },
        {
          name: "trigger",
          type: '"mount" | "in-view"',
          default: '"in-view"',
          description:
            "Start the sequence on mount, or the first time the group comes into view.",
        },
        {
          name: "stagger",
          type: "number",
          default: "0.08",
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
          type: '"div" | "li"',
          default: '"div"',
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
          type: "string | number",
          required: true,
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
          type: "number",
          default: "50",
          description:
            "Movement in pixels per second. Hover, focus, and the built-in button pause it. Set 0 to stop it and wrap the items. Reduced motion does the same.",
        },
        {
          name: "reverse",
          type: "boolean",
          default: "false",
          description:
            "Move the content toward the end edge instead of the start edge.",
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Items to loop. Do not put IDs in them, because the copies repeat them. The copies are inert and hidden from assistive technology. A focused item moves into view.",
        },
        {
          name: "--marquee-gap",
          type: "CSS length",
          default: "1.5rem",
          description: "Space between items. Set it in className.",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description:
            "Sets the size of the input and of the trigger. The list keeps one row height.",
        },
        {
          name: "options",
          type: "ComboBoxOption[]",
          description: "Options for the default list layout.",
        },
        {
          name: "label",
          type: "string",
          description: "Label above the input in the default layout.",
        },
        {
          name: "description",
          type: "string",
          description: "Help text below the input in the default layout.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Search options"',
          description: "Input placeholder in the default layout.",
        },
        {
          name: "selectionMode",
          type: '"single" | "multiple"',
          default: '"single"',
          description:
            'Set "multiple" to let the user select more than one option. The default layout then shows the selected options as tags. value, defaultValue, and onValueChange work only in single-selection mode. In multiple-selection mode, value and defaultValue take an array of option ids, and onChange receives the new array.',
        },
        {
          name: "value",
          type: "string",
          description:
            "The selected option id, controlled. Use it only in single-selection mode.",
        },
        {
          name: "defaultValue",
          type: "string",
          description:
            "The option id that is selected at first, uncontrolled. Use it only in single-selection mode.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description:
            "Receives the selected id in single-selection mode, or an empty string when the selection is cleared.",
        },
      ],
    }),
    apiPart<typeof ComboBoxTags>({
      name: "ComboBoxTags",
      props: [
        {
          name: "label",
          type: "string",
          default: '"Selected options"',
          description: "Accessible name for the selected tags.",
        },
        {
          name: "emptyText",
          type: "string",
          default: '"No options selected."',
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
          type: "ReactNode",
          required: true,
          description: "Attachment items. Give each one a unique key.",
        },
      ],
    }),
    apiPart<typeof Attachment>({
      name: "Attachment",
      props: [
        {
          name: "name",
          type: "string",
          required: true,
          description: "Filename shown in the row.",
        },
        {
          name: "fileSize",
          type: "number",
          description: "File size in bytes.",
        },
        {
          name: "previewUrl",
          type: "string",
          description:
            "Image preview URL. Without it, the row shows a file icon.",
        },
        {
          name: "status",
          type: '"ready" | "uploading" | "complete" | "error"',
          default: '"ready"',
          description: "Upload state. Your app sets it.",
        },
        {
          name: "progress",
          type: "number",
          description:
            "Upload percentage from 0 to 100. The status text shows it. Without it, the progress bar is indeterminate.",
        },
        {
          name: "errorMessage",
          type: "string",
          default: '"Could not upload"',
          description: "Message shown when status is error.",
        },
        {
          name: "onRemove",
          type: "() => void",
          description: "Shows a remove button and handles its press.",
        },
        {
          name: "onRetry",
          type: "() => void",
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
          type: "string",
          required: true,
          description: "Visible label for the select.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description:
            "Sets the size of the select box. The HTML size attribute is not available.",
        },
        {
          name: "description",
          type: "string",
          description:
            "Help text below the select. Linked with aria-describedby.",
        },
        {
          name: "error",
          type: "string",
          description:
            "Validation text below the select. Linked with aria-describedby. A value also marks the select invalid.",
        },
        {
          name: "isInvalid",
          type: "boolean",
          default: "false",
          description:
            "Marks the select invalid. A value for error does the same.",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Adds an empty option.",
        },
        {
          name: "containerClassName",
          type: "string",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description:
            "Sets the size of the trigger. The list keeps one row height.",
        },
        {
          name: "options",
          type: "SelectOption[]",
          description:
            "Options for the default layout. Each option has an id, a name, and an optional description.",
        },
        {
          name: "label",
          type: "string",
          description:
            "Label above the trigger in the default layout. When you compose the parts, add SelectLabel or pass aria-label.",
        },
        {
          name: "description",
          type: "string",
          description: "Help text below the trigger in the default layout.",
        },
        {
          name: "value",
          type: "string",
          description:
            "The selected option id, not its name. Sets selectedKey.",
        },
        {
          name: "defaultValue",
          type: "string",
          description:
            "The option id that is selected at first, not its name. Sets defaultSelectedKey.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description:
            "Receives the selected option id, or an empty string when the selection is cleared. onSelectionChange also runs.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Select an option"',
          description: "Text in the trigger when no option is selected.",
        },
      ],
    }),
    apiPart<typeof SelectSection>({
      name: "SelectSection",
      props: [
        {
          name: "title",
          type: "string",
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
          type: '"default" | "destructive"',
          default: '"default"',
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
          type: "string",
          description: "The section heading.",
        },
      ],
    }),
  ],
  "agent-status": [
    apiPart<typeof AgentStatus>({
      name: "AgentStatus",
      props: [
        {
          name: "state",
          type: '"thinking" | "working" | "complete" | "error"',
          required: true,
          description:
            "Sets the icon and the state text. Thinking and working animate unless reduced motion is on.",
        },
        {
          name: "label",
          type: "string",
          required: true,
          description: "The current step. Screen readers announce changes.",
        },
        {
          name: "detail",
          type: "string",
          description: "Text below the label.",
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
          type: "string",
          required: true,
          description:
            'The sender name. The default accessible name is "Message from {sender}".',
        },
        {
          name: "side",
          type: '"incoming" | "outgoing" | "system"',
          default: '"incoming"',
          description: "Sets the alignment and the style.",
        },
        {
          name: "avatar",
          type: "ReactNode",
          description: "Shows beside an incoming message.",
        },
        { name: "timestamp", type: "string", description: "The visible time." },
        {
          name: "dateTime",
          type: "string",
          description:
            "The machine-readable time. Set it to render the timestamp in a time element.",
        },
        {
          name: "status",
          type: "string",
          description: 'The delivery status, for example "Sent".',
        },
        {
          name: "actions",
          type: "ReactNode",
          description: "Buttons below the message.",
        },
      ],
    }),
  ],
  "source-link": [
    apiPart<typeof SourceLink>({
      name: "SourceLink",
      props: [
        {
          name: "href",
          type: "string",
          required: true,
          description: "The URL of the source.",
        },
        {
          name: "label",
          type: "string",
          required: true,
          description: "The title of the page.",
        },
        {
          name: "source",
          type: "string",
          required: true,
          description: "The name of the site or document.",
        },
        {
          name: "index",
          type: "number",
          description: "The citation number. Shows before the label.",
        },
        {
          name: "description",
          type: "string",
          description: "Text below the source.",
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
          type: "string",
          required: true,
          description: "The tool name.",
        },
        {
          name: "status",
          type: '"running" | "complete" | "error"',
          required: true,
          description:
            "Sets the icon and the status text. A change crossfades both. Running pulses unless reduced motion is on. Screen readers announce changes.",
        },
        {
          name: "summary",
          type: "string",
          description: "Short text below the name.",
        },
      ],
    }),
    apiPart<typeof ToolCallSection>({
      name: "ToolCallSection",
      props: [
        {
          name: "label",
          type: "string",
          required: true,
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
          type: "string",
          description:
            "An accessible name for the textarea. The label is visually hidden. Without it, the textarea is named Message.",
        },
        {
          name: "placeholder",
          type: "string",
          description:
            "Placeholder text in the default textarea. Pass it to PromptInputTextArea when you compose the children.",
        },
        {
          name: "submitKey",
          type: '"enter" | "mod+enter"',
          default: '"enter"',
          description:
            "Controls which key sends. Enter sends with Shift+Enter for a line, or Mod+Enter sends with Enter for a line. IME composition never submits.",
        },
        {
          name: "isPending",
          type: "boolean",
          default: "false",
          description:
            "Changes Send to Stop when onStop is set. Without onStop, Send is disabled.",
        },
        {
          name: "onSubmit",
          type: "(value: string) => void",
          description:
            "Called with the textarea value on send. Focus returns to the textarea. If value is not set, the textarea clears after each send.",
        },
        {
          name: "onStop",
          type: "() => void",
          description: "Called when the user stops a pending run.",
        },
        {
          name: "onFilesDropped",
          type: "(files: File[]) => void",
          description:
            "Called with files dropped on the frame. Without it, the frame ignores drops and no overlay shows.",
        },
        {
          name: "dropLabel",
          type: "string",
          default: '"Drop files to attach"',
          description:
            "Copy shown in the overlay while files are dragged over the frame.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          description: "Sets the height, text size, and padding of the frame.",
        },
      ],
    }),
    apiPart<typeof PromptInputTextArea>({
      name: "PromptInputTextArea",
      props: [
        {
          name: "minRows",
          type: "number",
          default: "1",
          description: "Rows shown at rest.",
        },
        {
          name: "maxRows",
          type: "number",
          default: "8",
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
          type: "boolean",
          description:
            "Disables the button. Send is also disabled while the textarea is empty.",
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
          type: '"thinking" | "complete" | "error"',
          required: true,
          description:
            "Sets the trigger text and icon. Thinking animates unless reduced motion is on.",
        },
        {
          name: "duration",
          type: "number",
          description:
            "Seconds of reasoning. Without it, a thinking run counts its own time and the count stops when the run ends. 60 seconds or more show as minutes and seconds.",
        },
        {
          name: "autoCollapse",
          type: "boolean",
          default: "false",
          description:
            "Collapses the panel when the status leaves thinking, and expands it when a new run starts. Set isExpanded to control the panel yourself.",
        },
        {
          name: "defaultExpanded",
          type: "boolean",
          description:
            "Opens the panel at first. The default is open while status is thinking.",
        },
        {
          name: "isExpanded",
          type: "boolean",
          description: "Controls the panel.",
        },
        {
          name: "onExpandedChange",
          type: "(isExpanded: boolean) => void",
          description: "Receives requests to open or close the panel.",
        },
      ],
    }),
    apiPart<typeof ReasoningPanel>({
      name: "ReasoningPanel",
      props: [
        {
          name: "scrollable",
          type: "boolean",
          default: "false",
          description:
            "Caps the body at 16rem and makes it scrollable and focusable from the keyboard.",
        },
        {
          name: "autoScroll",
          type: "boolean",
          default: "true",
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
          type: '"streaming" | "complete" | "stopped" | "error"',
          required: true,
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
          type: "boolean",
          default: "true",
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
          type: "string",
          required: true,
          description: "Visible label in display and edit modes.",
        },
        {
          name: "value",
          type: "string",
          description: "The saved value, controlled.",
        },
        {
          name: "defaultValue",
          type: "string",
          default: '""',
          description: "The saved value at first, uncontrolled.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Not set"',
          description: "Text shown when the value is empty.",
        },
        {
          name: "onSave",
          type: "(value: string) => void | Promise<void>",
          description:
            "Called when you save a changed value. While its promise is pending, the save button shows a spinner. If it throws, the editor stays open and shows the error message. When controlled, update value here.",
        },
        {
          name: "isDisabled",
          type: "boolean",
          default: "false",
          description: "Prevents opening the editor.",
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
          type: "string",
          required: true,
          description: "Visible label for the field.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description: "Sets the size of the field and of the reveal button.",
        },
        {
          name: "description",
          type: "string",
          description: "Help text below the field.",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Input placeholder.",
        },
        {
          name: "autoComplete",
          type: "string",
          default: '"current-password"',
          description: "Use new-password when creating a credential.",
        },
      ],
    }),
  ],
  "copy-button": [
    apiPart<typeof CopyButton>({
      name: "CopyButton",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
          description: "The exact text written to the clipboard.",
        },
        {
          name: "children",
          type: "ReactNode | (status: CopyButtonStatus) => ReactNode",
          description:
            'The button content. Without it, the button shows an icon and status text. Pass a function to show content for each status. CopyButtonStatus is "idle", "copied", or "error".',
        },
        {
          name: "aria-label",
          type: "string",
          description:
            'The accessible name. Without it, the name comes from text children in the idle status. Other children give the name "Copy". It does not change after a copy. A live region announces the result.',
        },
        {
          name: "variant",
          type: "ButtonVariant",
          default: '"outline"',
          description: "Uses the Button variants.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Uses the Button sizes.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          default: "false",
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
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Joins buttons in a row or column.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
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
          type: "string | number",
          required: true,
          description:
            "Identifies the current icon. A change animates the new icon in and the old icon out.",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
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
          type: "boolean",
          default: "true",
          description: "Runs the highlight. Set false when the work is done.",
        },
        {
          name: "duration",
          type: "number",
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
  "scroll-fade": [
    apiPart<typeof ScrollFade>({
      name: "ScrollFade",
      props: [
        {
          name: "orientation",
          type: '"vertical" | "horizontal"',
          default: '"vertical"',
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
          type: "string",
          required: true,
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
          type: "readonly string[]",
          required: true,
          description:
            "Sets the words to cycle through. The first value shows when motion is reduced.",
        },
        {
          name: "interval",
          type: "number",
          default: "2.5",
          description: "Time in seconds that each value stays on screen.",
        },
        {
          name: "active",
          type: "boolean",
          default: "true",
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
          type: '"highlight" | "underline" | "circle"',
          default: '"highlight"',
          description:
            "Sets the mark to draw. A highlight wraps with the text. An underline or a circle keeps the phrase together.",
        },
        {
          name: "trigger",
          type: '"mount" | "in-view"',
          default: '"in-view"',
          description: "Draws the mark on mount or when the phrase is in view.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
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
          required: true,
          description:
            "Steps in display order. Keep labels short; if the list overflows, it scrolls and keeps the current step in view.",
        },
        {
          name: "currentStep",
          type: "number (zero-based)",
          required: true,
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
          type: "number",
          required: true,
          description:
            "Sets the number to show. A change animates. Add `aria-live` to announce the formatted value; a number wider than its container wraps.",
        },
        {
          name: "variant",
          type: '"count" | "slide"',
          default: '"count"',
          description:
            "count counts to the new value. slide moves only the digits that change.",
        },
        {
          name: "locale",
          type: "string",
          default: '"en-US"',
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
          type: "string",
          required: true,
          description: "Shows a label below the ring.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Sets the diameter: 40, 64, or 96 pixels.",
        },
        {
          name: "showValue",
          type: "boolean",
          default: "true",
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
          type: "readonly T[]",
          required: true,
          description: "Items to show in the list.",
        },
        {
          name: "getKey",
          type: "(item: T) => string | number",
          required: true,
          description:
            "Returns a unique key for an item. Keep the key the same while the item is in the list.",
        },
        {
          name: "children",
          type: "(item: T) => ReactNode",
          required: true,
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
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
          type: '"inline" | "block-end"',
          default: '"inline"',
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
          type: "boolean",
          required: true,
          description: "Controls the dialog's visibility.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          required: true,
          description: "Receives requests to open or close the dialog.",
        },
        {
          name: "shortcut",
          type: "boolean",
          default: "true",
          description:
            "Ctrl+K or Command+K opens and closes the palette. Disable it when another palette owns that shortcut.",
        },
        {
          name: "title",
          type: "string",
          default: '"Commands"',
          description: "Accessible dialog name.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Search commands"',
          description: "Search input placeholder and label.",
        },
        {
          name: "emptyMessage",
          type: "string",
          default: '"No matching commands."',
          description: "Text shown when search has no results.",
        },
      ],
    }),
    apiPart<typeof CommandPaletteSection>({
      name: "CommandPaletteSection",
      props: [
        {
          name: "title",
          type: "string",
          required: true,
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
          type: "string",
          description:
            "Text that search matches. Without it, search uses the text children. Set it when the item has an icon or other elements.",
        },
        {
          name: "shortcut",
          type: "string",
          description:
            "A key hint at the end of the item. Screen readers hear it as the item description. It does not add a key handler.",
        },
        {
          name: "variant",
          type: '"default" | "destructive"',
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
          type: '"default" | "secondary" | "outline" | "ghost" | "minimal" | "destructive"',
          default: '"default"',
          description:
            "Sets the visual emphasis. Minimal is for a quiet icon action.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description:
            "Sets the height from 28px (xs) to 56px (xl). A size on the button overrides the group; otherwise the group size applies.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          default: "false",
          description:
            "Makes the button a square for one icon. Give the button an aria-label.",
        },
        {
          name: "static",
          type: "boolean",
          default: "false",
          description:
            "Disables press scaling while keeping the button interactive.",
        },
        {
          name: "layout",
          type: 'MotionProps["layout"]',
          description:
            "Animate position or size changes when the button moves in the layout. Ignored when reduced motion is requested.",
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
          type: "string",
          required: true,
          description: "Sets the destination.",
        },
        {
          name: "as",
          type: "ElementType",
          default: '"a"',
          description: "Renders a router link component, such as Next.js Link.",
        },
        {
          name: "variant",
          type: '"default" | "secondary" | "outline" | "ghost" | "minimal" | "destructive"',
          default: '"default"',
          description: "Uses the Button variants.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Uses the Button sizes.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          default: "false",
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
          type: '"h1" | "h2" | "h3" | "h4"',
          default: '"h3"',
          description: "Heading level for the card title.",
        },
      ],
    }),
  ],
  stat: [
    apiPart<typeof StatTrend>({
      name: "StatTrend",
      props: [
        {
          name: "direction",
          type: '"up" | "down" | "neutral"',
          required: true,
          description: "Sets the arrow.",
        },
        {
          name: "invert",
          type: "boolean",
          default: "false",
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
          type: "string",
          required: true,
          description: "Accessible name. Avatar takes the initials from it.",
        },
        {
          name: "src",
          type: "string",
          description:
            "Image URL. Avatar shows initials if the image is missing or does not load.",
        },
        {
          name: "initials",
          type: "string",
          description:
            'Replaces the initials that Avatar takes from name. Set "" to show a person icon.',
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
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
          type: '"h1" | "h2" | "h3" | "h4"',
          default: '"h3"',
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
          type: '"ring" | "dots" | "segments"',
          default: '"ring"',
          description: "Sets the indicator style.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Sets the size: 14, 16, 24, 40, or 56 pixels.",
        },
        {
          name: "decorative",
          type: "boolean",
          default: "false",
          description:
            "Hides the spinner from screen readers. Use it when nearby text names the wait.",
        },
        {
          name: "aria-label",
          type: "string",
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
          type: "ReactNode",
          description:
            "The visible label of the group. Without it, pass aria-label.",
        },
        {
          name: "max",
          type: "number",
          default: "5",
          description: "Number of steps. Use a positive whole number.",
        },
        {
          name: "icon",
          type: "Icon",
          default: "StarIcon",
          description:
            "A Phosphor icon for each step. Steps up to the rating use the fill weight.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Sets the size of each step.",
        },
        {
          name: "value",
          type: "number",
          description:
            "The selected rating, controlled. 0 means no rating. A decimal value, such as an average, fills part of a step.",
        },
        {
          name: "defaultValue",
          type: "number",
          default: "0",
          description:
            "The selected rating at first, uncontrolled. 0 means no rating.",
        },
        {
          name: "onValueChange",
          type: "(value: number) => void",
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
          type: "boolean",
          default: "false",
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
          type: "boolean",
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
          type: "string",
          required: true,
          description:
            "The row label. Typeahead uses it unless you set textValue.",
        },
        {
          name: "content",
          type: "ReactNode",
          description:
            "Replaces the visible label. Without it, the row shows title. Use it to add details, such as a file size.",
        },
        {
          name: "icon",
          type: "ReactNode",
          description:
            "Replaces the default icon. A row with child items shows a folder. Other rows show a file.",
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Nested TreeItem elements. A row with children shows an expand button.",
        },
        {
          name: "textValue",
          type: "string",
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
          type: "string",
          required: true,
          description:
            "Names the table and its search and pagination controls.",
        },
        {
          name: "rows",
          type: "readonly T[]",
          required: true,
          description:
            "All the rows. The table searches, filters, sorts, and pages them in the browser.",
        },
        {
          name: "columns",
          type: "readonly DataTableColumn<T>[]",
          required: true,
          description: "Column definitions. The first column labels each row.",
        },
        {
          name: "getRowId",
          type: "(row: T) => Key",
          required: true,
          description: "Returns a unique, stable key for each row.",
        },
        {
          name: "getSearchText",
          type: "(row: T) => string",
          description:
            "Shows a search field. Return all the text that search can find in a row.",
        },
        {
          name: "pageSize",
          type: "number",
          default: "5",
          description: "Rows on each page.",
        },
        {
          name: "selectable",
          type: "boolean",
          default: "true",
          description:
            "Shows a selection checkbox in each row. Select all selects only the rows on the current page.",
        },
        {
          name: "selectedKeys",
          type: "Iterable<Key>",
          description:
            "The selected row keys, controlled. The selection stays when the page, search, or filters change.",
        },
        {
          name: "defaultSelectedKeys",
          type: "Iterable<Key>",
          description:
            "The row keys that are selected at first, uncontrolled. Without it, no rows are selected.",
        },
        {
          name: "onSelectionChange",
          type: "(keys: Set<Key>) => void",
          description:
            "Receives selected row keys, including keys on other pages.",
        },
        {
          name: "disabledKeys",
          type: "Iterable<Key>",
          description: "Rows that cannot be selected or focused.",
        },
        {
          name: "onRowAction",
          type: "(key: Key) => void",
          description:
            "Called when a user clicks a row or presses Enter on it. The checkbox still selects the row.",
        },
        {
          name: "resizable",
          type: "boolean",
          default: "false",
          description: "Adds a resize handle to each column header.",
        },
        {
          name: "showClearSelection",
          type: "boolean",
          default: "true",
          description:
            "Shows the Clear selection button in the header while rows are selected.",
        },
        {
          name: "renderFooter",
          type: "(state: DataTableFooterState) => ReactNode",
          description:
            "Replaces the row count and page controls below the table. The state has the visible row range, the filtered and total counts, the page index and count, and setPageIndex.",
        },
      ],
    }),
    apiPart<DataTableColumn<unknown>>({
      name: "DataTableColumn",
      props: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "A stable key for the column.",
        },
        {
          name: "header",
          type: "string",
          required: true,
          description:
            "The visible column header. A column filter uses it as its label.",
        },
        {
          name: "cell",
          type: "(row: T) => ReactNode",
          required: true,
          description: "Renders the cell for a row.",
        },
        {
          name: "sortValue",
          type: "(row: T) => string | number",
          description:
            "Turns on sorting for the column. Return a string or a number. Column filters use this value too.",
        },
        {
          name: "align",
          type: '"start" | "end"',
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
  pagination: [
    apiPart<typeof Pagination>({
      name: "Pagination",
      props: [
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description:
            "Uses the Button heights for each link and the ellipsis. Set it on Pagination or on one PaginationLink.",
        },
        {
          name: "aria-label",
          type: "string",
          default: '"Pagination"',
          description:
            "Names the navigation landmark. Change it when a page has more than one pagination.",
        },
      ],
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
          name: "isCurrent",
          type: "boolean",
          default: "false",
          description:
            'Shows the link as the current page and sets aria-current="page". The current-page marker glides to the new link.',
        },
        {
          name: "isDisabled",
          type: "boolean",
          default: "false",
          description:
            "Keeps the link visible but stops navigation. The link leaves the Tab order.",
        },
        {
          name: "onPress",
          type: "(event: PressEvent) => void",
          description: "Called when the link is pressed.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          description:
            "Sets the size of this link. Without it, the link uses the size of the Pagination, or md.",
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
          type: '"complete" | "latest" | "upcoming"',
          default: '"complete"',
          description:
            'Sets the marker. Screen readers announce "Latest" or "Upcoming" before the item.',
        },
        {
          name: "icon",
          type: "ReactNode",
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
          type: '"h2" | "h3" | "h4"',
          default: '"h3"',
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
          type: '"card" | "divided"',
          default: '"card"',
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
          type: "string",
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
          type: "string",
          description:
            "Shows the variant icon and a heading, and moves the children into the description. Without it, compose the parts yourself.",
        },
        {
          name: "variant",
          type: '"info" | "success" | "warning" | "error" | "neutral"',
          default: '"info"',
          description: "Sets the color and icon for the message.",
        },
        {
          name: "action",
          type: "ReactNode",
          description:
            "Adds controls after the text, such as a button. Requires title.",
        },
        {
          name: "onDismiss",
          type: "() => void",
          description:
            "Shows a close button and calls this function on press. Remove the alert here.",
        },
        {
          name: "dismissLabel",
          type: "string",
          default: '"Dismiss"',
          description: "Names the close button for screen readers.",
        },
        {
          name: "children",
          type: "ReactNode",
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
          type: '"sm" | "md" | "lg" | "xl" | "full"',
          default: '"md"',
          description:
            "The maximum width from 640px up: 24rem, 28rem, 36rem, or 48rem. full fills the screen less a 1rem gutter. On phones, every size is full width, and full also fills the height.",
        },
        {
          name: "children",
          type: "ReactNode | ({ close }) => ReactNode",
          required: true,
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
          type: '"default" | "secondary" | "outline" | "ghost" | "minimal" | "destructive"',
          default: '"ghost"',
          description: "The Button variant.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          description:
            "Makes the button a square for one icon. The default is true without children and false with children.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
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
          type: "number",
          description:
            "Caps the panel height. The panel always fits the viewport and scrolls when its content is taller. With PopoverArrow, the content scrolls inside the panel padding.",
        },
        {
          name: "arrowBoundaryOffset",
          type: "number",
          default: "16",
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
          type: "ReactNode | ({ close }) => ReactNode",
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
          type: '"bottom" | "top" | "left" | "right" | "start" | "end" | "center"',
          default: '"bottom"',
          description:
            "The edge the sheet comes from. start and end mirror in right-to-left locales. A top or bottom sheet fits its content up to a maximum height. Set a fixed height with className.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl" | "full"',
          default: '"md"',
          description:
            "A left or right sheet is 20rem, 26rem, 36rem, or 48rem wide, and always leaves 3.5rem of the page visible. A top or bottom sheet has a maximum width of 28rem, 42rem, 56rem, or 72rem. full fills the screen.",
        },
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description:
            "Moves the sheet 0.5rem in from the screen edges and rounds all corners.",
        },
        {
          name: "swipeDirection",
          type: '"bottom" | "top" | "left" | "right" | "start" | "end" | "vertical" | "horizontal"',
          description:
            "The direction of a swipe or handle drag that closes the sheet. vertical and horizontal close toward either edge. Without it, the direction is the same as position. A center sheet uses vertical.",
        },
        {
          name: "snapPoints",
          type: "Array<number | string>",
          description:
            "The visible size at each stop. Numbers are pixels. Strings are CSS lengths, and percentages are relative to the sheet. The sheet opens at the first stop. You can always drag it to full size. Below full size, a swipe on SheetBody resizes the sheet.",
        },
        {
          name: "preventDismissal",
          type: "boolean",
          default: "false",
          description:
            "Stops swipes, Escape, and outside clicks from closing the sheet. Snap points still work.",
        },
        {
          name: "isOpen",
          type: "boolean",
          description:
            "Whether the sheet is open, controlled. Without isOpen and defaultOpen, a SheetTrigger can own the state instead. Then the Button inside the SheetTrigger opens the sheet.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          description: "Whether the sheet is open at first, uncontrolled.",
        },
        {
          name: "onOpenChange",
          type: "(isOpen: boolean) => void",
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
          type: '"default" | "secondary" | "outline" | "ghost" | "minimal" | "destructive"',
          default: '"ghost"',
          description:
            "Choose default for a primary action, outline for a secondary action, or ghost for dismissal.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          description:
            "Makes the button a square for one icon. The default is true without children and false with children.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"sm" without children, "md" with children',
          description:
            "The Button size. An icon-only close button uses sm to stay compact.",
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
          type: '"neutral" | "accent" | "success" | "warning" | "error" | "outline"',
          default: '"neutral"',
          description: "Sets the color and emphasis.",
        },
        {
          name: "dot",
          type: "boolean",
          default: "false",
          description:
            "Shows a dot before the label. The dot is hidden from screen readers.",
        },
        {
          name: "children",
          type: "ReactNode",
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
          type: "ReactNode",
          description:
            "The label. Without it, pass aria-label so the checkbox has a name.",
        },
        {
          name: "description",
          type: "ReactNode",
          description:
            "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
        },
        {
          name: "errorMessage",
          type: "string | ((validation: ValidationResult) => string)",
          description:
            "Shown below the label when isRequired, validate, or isInvalid makes the checkbox invalid. Without it, the browser validation message shows.",
        },
        {
          name: "checked",
          type: 'boolean | "indeterminate"',
          description:
            'Alias for isSelected. "indeterminate" sets isIndeterminate.',
        },
        {
          name: "defaultChecked",
          type: 'boolean | "indeterminate"',
          description:
            'Alias for defaultSelected. "indeterminate" shows the indeterminate state until the first change.',
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "Alias for onChange. Both run when both are set.",
        },
        {
          name: "variant",
          type: '"default" | "card"',
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
          type: "ReactNode",
          description:
            "The label of the group. Without it, pass aria-label or compose CheckboxGroupLabel.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Help text for the group, below the label.",
        },
        {
          name: "errorMessage",
          type: "string | ((validation: ValidationResult) => string)",
          description:
            "Shown below the options when the group is invalid. Without it, the browser validation message shows. With label, description, or errorMessage, the group adds CheckboxGroupError for you.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"vertical"',
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
          type: "(textValue: string, inputValue: string) => boolean",
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
          type: "ReactNode",
          description:
            "The label. Without it, pass aria-label so the switch has a name.",
        },
        {
          name: "description",
          type: "ReactNode",
          description:
            "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
        },
        {
          name: "errorMessage",
          type: "string | ((validation: ValidationResult) => string)",
          description:
            "Shown below the label when isRequired, validate, or isInvalid makes the switch invalid. Without it, the browser validation message shows.",
        },
        {
          name: "checked",
          type: "boolean",
          description: "Alias for isSelected.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          description: "Alias for defaultSelected.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "Alias for onChange. Both run when both are set.",
        },
      ],
    }),
  ],
  tabs: [
    apiPart<typeof TabsList>({
      name: "TabsList",
      props: [
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          description:
            "Uses the Button heights for each tab. Without a size, tabs are 44 pixels high on small screens and 36 pixels from 640 pixels.",
        },
      ],
    }),
    apiPart<typeof Tabs>({
      name: "Tabs",
      props: [
        {
          name: "value",
          type: "string",
          description:
            "The value of the selected tab, controlled. Same as selectedKey.",
        },
        {
          name: "defaultValue",
          type: "string",
          description:
            "The value of the tab that is selected at first, uncontrolled. Same as defaultSelectedKey.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description:
            "Gets the value of the selected tab as a string. onSelectionChange also works.",
        },
      ],
    }),
    apiPart<typeof TabsTrigger>({
      name: "TabsTrigger",
      props: [
        {
          name: "value",
          type: "string",
          description:
            "Connects the tab to the TabsContent with the same value.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          description:
            "Sets the size of this tab. It overrides the size of the TabsList.",
        },
      ],
    }),
    apiPart<typeof TabsContent>({
      name: "TabsContent",
      props: [
        {
          name: "value",
          type: "string",
          description:
            "Connects the panel to the TabsTrigger with the same value.",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description: "Sets the size of the field.",
        },
        {
          name: "label",
          type: "string",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          type: "string",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description: "Sets the size of the field.",
        },
        {
          name: "label",
          type: "string",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          type: "string",
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
          type: "ReactNode",
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
          type: '"numeric" | "2-digit" | "long" | "short" | "narrow"',
          default: '"short"',
          description: "Sets the format of the month names.",
        },
        {
          name: "children",
          type: "(picker: CalendarMonthPickerAria) => ReactElement",
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
          type: "number",
          default: "20",
          description:
            "Sets the number of years in the list. minValue and maxValue limit the range.",
        },
        {
          name: "format",
          type: "CalendarYearPickerFormatOptions",
          description: "Sets the format of the years.",
        },
        {
          name: "children",
          type: "(picker: CalendarYearPickerAria) => ReactElement",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description: "Sets the size of the field and of the calendar button.",
        },
        {
          name: "presets",
          type: "DatePickerPreset[]",
          description:
            "Shortcuts beside the calendar, such as Today. Each has a label and a value. A preset sets the value and closes the calendar.",
        },
        {
          name: "label",
          type: "string",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          type: "string",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description: "Sets the size of the field and of the calendar button.",
        },
        {
          name: "presets",
          type: "DateRangePickerPreset[]",
          description:
            "Shortcuts beside the calendar, such as Last 7 days. Each has a label and a start and end value. A preset sets the value and closes the calendar.",
        },
        {
          name: "label",
          type: "string",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          type: "string",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description: "Sets the size of the field.",
        },
        {
          name: "label",
          type: "string",
          description:
            "Label above the field. Without a label, pass aria-label.",
        },
        {
          name: "description",
          type: "string",
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
          type: "string",
          default: '"Choose color"',
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
  "file-trigger": [
    apiPart<typeof FileTrigger>({
      name: "FileTrigger",
      props: [
        {
          name: "label",
          type: "string",
          default: '"Choose files"',
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
          type: "string",
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
          type: "string",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description: "Sets the size of the field and of the step buttons.",
        },
        {
          name: "steppers",
          type: '"split" | "stacked"',
          default: '"split"',
          description:
            "Puts the step buttons on each side of the value, or stacks them at the end.",
        },
        {
          name: "label",
          type: "string",
          description: "Label above the field.",
        },
        {
          name: "description",
          type: "string",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description:
            "Sets the size of the field, the search icon, and the clear button. The clear button shows only when the field has a value.",
        },
        {
          name: "label",
          type: "string",
          description: "Label above the field in the default layout.",
        },
        {
          name: "description",
          type: "string",
          description: "Help text below the field in the default layout.",
        },
        {
          name: "placeholder",
          type: "string",
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
          type: "string",
          description: "Label above the track, next to the value.",
        },
        {
          name: "thumbLabels",
          type: "string[]",
          description:
            "Names each handle, in value order. Give one when defaultValue or value is an array.",
        },
        {
          name: "marks",
          type: "number[]",
          description:
            "Values to label along the track. For custom labels, compose SliderMarks.",
        },
        {
          name: "fillOffset",
          type: "number",
          description:
            "The value the fill starts from. Set 0 for a range that goes below zero.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
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
          type: "number[]",
          required: true,
          description:
            "The values to label. Labels in the selected range use the foreground color.",
        },
        {
          name: "children",
          type: "(value: number) => ReactNode",
          description:
            "Renders each label. Without it, the slider formatOptions format the value.",
        },
        {
          name: "offset",
          type: "number",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description:
            "Sets the height, padding, radius, text, and icon size of the field. The parts inside the field use it.",
        },
        {
          name: "label",
          type: "string",
          description: "Label above the field in the default layout.",
        },
        {
          name: "description",
          type: "string",
          description: "Help text below the field in the default layout.",
        },
        {
          name: "placeholder",
          type: "string",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description:
            "Sets the padding, radius, and text size. The height does not change.",
        },
        {
          name: "label",
          type: "string",
          description: "Label above the field in the default layout.",
        },
        {
          name: "description",
          type: "string",
          description: "Help text below the field in the default layout.",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Input placeholder in the default layout.",
        },
        {
          name: "rows",
          type: "number",
          default: "4",
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
          type: "ReactNode",
          description:
            "The label of the group. Without it, pass aria-label or compose RadioGroupLabel.",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Help text for the group, below the label.",
        },
        {
          name: "errorMessage",
          type: "string | ((validation: ValidationResult) => string)",
          description:
            "Shown below the options when the group is invalid. Without it, the browser validation message shows. With label, description, or errorMessage, the group adds RadioGroupError for you.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Alias for onChange. Both run when both are set.",
        },
      ],
    }),
    apiPart<typeof Radio>({
      name: "Radio",
      props: [
        {
          name: "children",
          type: "ReactNode",
          description:
            "The label. Without it, pass aria-label so the option has a name.",
        },
        {
          name: "description",
          type: "ReactNode",
          description:
            "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
        },
        {
          name: "variant",
          type: '"default" | "card"',
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
          type: "string",
          required: true,
          description: "The main text of the toast.",
        },
        {
          name: "description",
          type: "string",
          description: "Text below the title.",
        },
        {
          name: "variant",
          type: '"info" | "success" | "warning" | "error"',
          default: '"info"',
          description: "Sets the icon and its colors.",
        },
        {
          name: "action",
          type: "{ label: string; onAction: () => void }",
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
          type: "number",
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
          type: "number",
          default: "400",
          description:
            "Milliseconds of hover before the tooltip opens. Keyboard focus opens it at once.",
        },
      ],
    }),
    apiPart<typeof TooltipContent>({
      name: "TooltipContent",
      props: [
        {
          name: "offset",
          type: "number",
          default: "8",
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
          type: "number",
          default: "8",
          description:
            "The minimum distance from TooltipArrow to the tooltip edge. It keeps the arrow off the rounded corner.",
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
          type: '"default" | "segmented" | "ghost"',
          default: '"default"',
          description:
            "Sets the surface. Use segmented inside a ToggleButtonGroup. All variants show the selected state.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description:
            "Uses the Button heights. Without a size, a segmented toggle is 44 pixels high on small screens and 36 pixels from 640 pixels.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          default: "false",
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
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
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"lg"',
          description: "Sets the size of the input box. Tokens keep one size.",
        },
        {
          name: "label",
          type: "string",
          description:
            "Label above the field in the default layout. Without it, pass aria-label.",
        },
        {
          name: "description",
          type: "string",
          description: "Help text below the field in the default layout.",
        },
        {
          name: "placeholder",
          type: "string",
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
          type: '"xs" | "sm" | "md"',
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
          type: "boolean",
          default: "true",
          description: "Shows the beam. Set false to remove it.",
        },
        {
          name: "duration",
          type: "number",
          default: "6",
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
          type: '"top" | "bottom" | "left" | "right"',
          default: '"bottom"',
          description:
            "Edge with the strongest blur. The component sits on this edge of its positioned parent.",
        },
        {
          name: "blur",
          type: "number",
          default: "12",
          description: "Blur radius in pixels at the edge.",
        },
      ],
    }),
  ],
};
