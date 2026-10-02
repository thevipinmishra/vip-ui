import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "reicon-react";
import { readRegistryItem, registryUrl } from "@/lib/registry-docs";
import { anatomy } from "./anatomy";
import { CodeBlock } from "./code-block";
import { InstallTabs } from "./install-tabs";
import { PackageManagerCommand } from "./package-manager-command";
import { PreviewPanel } from "./preview-panel";

interface ApiProp {
  component: string;
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

function htmlPart(component: string, element: string): ApiProp {
  return {
    component,
    prop: "HTML attributes",
    type: `HTMLAttributes<${element}>`,
    defaultValue: "—",
    description: "Accepts children, className, and native HTML attributes.",
  };
}

const customComponentApi: Record<string, ApiProp[]> = {
  "button-group": [
    {
      component: "ButtonGroup",
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description: "Lay out independent actions in a row or column.",
    },
    {
      component: "ButtonGroup",
      prop: "aria-label / aria-labelledby",
      type: "string",
      defaultValue: "—",
      description:
        "Name the group when the purpose is not clear from nearby text.",
    },
  ],
  timeline: [
    htmlPart("Timeline", "HTMLOListElement"),
    htmlPart("TimelineItem", "HTMLLIElement"),
    htmlPart("TimelineTitle", "HTMLHeadingElement"),
    {
      component: "TimelineTime",
      prop: "dateTime",
      type: "string",
      defaultValue: "—",
      description: "Machine-readable date or time for a displayed timestamp.",
    },
    htmlPart("TimelineDescription", "HTMLParagraphElement"),
  ],
  "text-swap": [
    {
      component: "TextSwap",
      prop: "value",
      type: "string",
      defaultValue: "required",
      description:
        "The latest visible and accessible text; changes animate without an initial entrance.",
    },
    {
      component: "TextSwap",
      prop: "aria-live",
      type: '"polite" | "assertive" | "off"',
      defaultValue: "off",
      description:
        "Opt in to announcements when the updated label must be spoken.",
    },
  ],
  stepper: [
    {
      component: "Stepper",
      prop: "steps",
      type: "readonly { label: string; description?: string }[]",
      defaultValue: "required",
      description:
        "Steps in display order. Keep labels short; descriptions are optional.",
    },
    {
      component: "Stepper",
      prop: "currentStep",
      type: "number (zero-based)",
      defaultValue: "required",
      description: "Index of the current step; earlier steps show as complete.",
    },
    {
      component: "Stepper",
      prop: "ol attributes",
      type: 'ComponentProps<"ol">',
      defaultValue: "—",
      description:
        "Name multiple sequences. Lists with over three steps can receive focus for keyboard scrolling when they overflow.",
    },
  ],
  fieldset: [
    {
      component: "Fieldset",
      prop: "fieldset attributes",
      type: "FieldsetHTMLAttributes<HTMLFieldSetElement>",
      defaultValue: "—",
      description: "Native fieldset, including disabled and aria-describedby.",
    },
    htmlPart("FieldsetLegend", "HTMLLegendElement"),
    htmlPart("FieldsetDescription", "HTMLParagraphElement"),
  ],
  "animated-number": [
    {
      component: "AnimatedNumber",
      prop: "value",
      type: "number",
      defaultValue: "required",
      description:
        "Target value. The displayed number animates; accessible text uses the target immediately.",
    },
    {
      component: "AnimatedNumber",
      prop: "variant",
      type: '"count" | "slide"',
      defaultValue: '"count"',
      description:
        "Count toward the new value or slide only changed digits up on an increase and down on a decrease.",
    },
    {
      component: "AnimatedNumber",
      prop: "locale / formatOptions",
      type: "string / Intl.NumberFormatOptions",
      defaultValue: '"en-US" / whole numbers',
      description:
        "Format both displayed and accessible values with Intl.NumberFormat.",
    },
  ],
  "progress-ring": [
    {
      component: "ProgressRing",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Visible name for the React Aria progressbar.",
    },
    {
      component: "ProgressRing",
      prop: "value / isIndeterminate",
      type: "number / boolean",
      defaultValue: "0 / false",
      description:
        "Set a known value or show unknown progress. Supports minValue and maxValue.",
    },
    {
      component: "ProgressRing",
      prop: "size / showValue",
      type: '"sm" | "md" | "lg" / boolean',
      defaultValue: '"md" / true',
      description: "Set the ring size and optionally hide the center value.",
    },
  ],
  "presence-list": [
    {
      component: "PresenceList",
      prop: "items / getKey",
      type: "readonly T[] / (item: T) => string | number",
      defaultValue: "required",
      description:
        "Pass items with stable unique keys so exit animations track the right rows.",
    },
    {
      component: "PresenceList",
      prop: "children",
      type: "(item: T) => ReactNode",
      defaultValue: "required",
      description: "Render each item's contents inside a semantic list item.",
    },
  ],
  "typing-indicator": [
    {
      component: "TypingIndicator",
      prop: "label",
      type: "string",
      defaultValue: '"Typing"',
      description: "Visible status text announced when the indicator appears.",
    },
    {
      ...htmlPart("TypingIndicator", "HTMLOutputElement"),
      description:
        "Accepts output attributes and className; its dots are decorative.",
    },
  ],
  "input-group": [
    {
      component: "InputGroup",
      prop: "isDisabled / isInvalid",
      type: "boolean",
      defaultValue: "from parent field",
      description:
        "React Aria Group picks up disabled and invalid states from TextField or TextArea. Its border also responds to focus within.",
    },
    {
      component: "InputGroupInput",
      prop: "Input props",
      type: "ComponentProps<typeof Input>",
      defaultValue: "—",
      description:
        "A single-line React Aria input. Use inside InputGroup within a labeled TextField.",
    },
    {
      component: "InputGroupTextArea",
      prop: "TextArea props",
      type: "ComponentProps<typeof TextArea>",
      defaultValue: "—",
      description:
        "A multiline React Aria input. Use inside InputGroup within a labeled TextArea.",
    },
    {
      component: "InputGroupAddon",
      prop: "align",
      type: '"inline" | "block-end"',
      defaultValue: '"inline"',
      description:
        "Place text, an icon, or a button beside the input, or in a full-width row below a textarea.",
    },
  ],
  "command-palette": [
    {
      component: "CommandPalette",
      prop: "isOpen / onOpenChange",
      type: "boolean / (open: boolean) => void",
      defaultValue: "required",
      description:
        "Control visibility. Escape and outside press close the dialog.",
    },
    {
      component: "CommandPalette",
      prop: "shortcut",
      type: "boolean",
      defaultValue: "true",
      description:
        "Open with Ctrl+K or Command+K. Disable when another palette owns that shortcut.",
    },
    {
      component: "CommandPalette",
      prop: "title / placeholder / emptyMessage",
      type: "string",
      defaultValue: "built-in labels",
      description:
        "Name the dialog, search input, and empty results for the task.",
    },
    {
      component: "CommandPaletteItem",
      prop: "onAction / textValue",
      type: "MenuItemProps",
      defaultValue: "—",
      description:
        "Run an action on selection; provide textValue when the content is not plain text.",
    },
  ],
  button: [
    {
      component: "Button",
      prop: "variant",
      type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "nav"',
      defaultValue: '"default"',
      description: "Choose the action's visual priority.",
    },
    {
      component: "Button",
      prop: "size",
      type: '"default" | "sm" | "lg" | "icon" | "nav"',
      defaultValue: '"default"',
      description:
        "Set the button's height and padding. Name icon-only buttons with aria-label.",
    },
    {
      component: "Button",
      prop: "static",
      type: "boolean",
      defaultValue: "false",
      description:
        "Disable press scaling while keeping the button interactive.",
    },
  ],
  card: [
    htmlPart("Card", "HTMLDivElement"),
    htmlPart("CardHeader", "HTMLDivElement"),
    htmlPart("CardTitle", "HTMLHeadingElement"),
    {
      component: "CardTitle",
      prop: "as",
      type: '"h2" | "h3" | "h4"',
      defaultValue: '"h3"',
      description: "Match the card heading to the surrounding page hierarchy.",
    },
    htmlPart("CardDescription", "HTMLParagraphElement"),
    htmlPart("CardContent", "HTMLDivElement"),
    htmlPart("CardFooter", "HTMLDivElement"),
  ],
  avatar: [
    {
      component: "Avatar",
      prop: "name",
      type: "string",
      defaultValue: "required",
      description: "Accessible name and source of the fallback initials.",
    },
    {
      component: "Avatar",
      prop: "src",
      type: "string",
      defaultValue: "undefined",
      description: "Image URL; falls back to initials if missing or broken.",
    },
    {
      component: "Avatar",
      prop: "initials",
      type: "string",
      defaultValue: "derived from name",
      description: "Overrides the displayed initials.",
    },
    htmlPart("Avatar", "HTMLSpanElement"),
    htmlPart("AvatarGroup", "HTMLDivElement"),
  ],
  skeleton: [
    {
      ...htmlPart("Skeleton", "HTMLDivElement"),
      description:
        "Decorative placeholder. Put a loading label on the surrounding status container.",
    },
  ],
  spinner: [
    {
      component: "Spinner",
      prop: "variant",
      type: '"orbit" | "ring" | "pulse" | "dots" | "bars" | "spark" | "segments"',
      defaultValue: '"orbit"',
      description:
        "Choose a pattern to fit the context: compact controls, waiting screens, or AI activity.",
    },
    {
      component: "Spinner",
      prop: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      defaultValue: '"md"',
      description: "Set the indicator size.",
    },
    {
      component: "Spinner",
      prop: "decorative",
      type: "boolean",
      defaultValue: "false",
      description:
        "Hide the indicator from assistive technology when adjacent text already reports progress.",
    },
    {
      component: "Spinner",
      prop: "aria-label",
      type: "string",
      defaultValue: '"Loading"',
      description: "Name the status when the spinner stands alone.",
    },
  ],
  "empty-state": [
    htmlPart("EmptyState", "HTMLDivElement"),
    htmlPart("EmptyStateIcon", "HTMLDivElement"),
    htmlPart("EmptyStateTitle", "HTMLHeadingElement"),
    htmlPart("EmptyStateDescription", "HTMLParagraphElement"),
    htmlPart("EmptyStateActions", "HTMLDivElement"),
  ],
  pagination: [
    {
      ...htmlPart("Pagination", "HTMLElement"),
      description:
        "Navigation landmark; set aria-label when there are multiple paginations.",
    },
    htmlPart("PaginationList", "HTMLOListElement"),
    htmlPart("PaginationItem", "HTMLLIElement"),
    {
      component: "PaginationLink",
      prop: "href",
      type: "string",
      defaultValue: "required",
      description:
        "URL of the destination page; use real URLs for reload and keyboard navigation.",
    },
    {
      component: "PaginationLink",
      prop: "isCurrent",
      type: "boolean",
      defaultValue: "false",
      description:
        "Marks the current link with aria-current=page and a visible background.",
    },
    {
      ...htmlPart("PaginationLink", "HTMLAnchorElement"),
      description:
        "Accepts standard anchor attributes, including aria-label and className.",
    },
    {
      ...htmlPart("PaginationEllipsis", "HTMLSpanElement"),
      description: "Noninteractive marker for omitted pages.",
    },
  ],
  "description-list": [
    htmlPart("DescriptionList", "HTMLDListElement"),
    htmlPart("DescriptionTerm", "HTMLElement"),
    htmlPart("DescriptionDetail", "HTMLElement"),
  ],
  "kbd-code": [
    htmlPart("Kbd", "HTMLElement"),
    htmlPart("InlineCode", "HTMLElement"),
  ],
  stat: [
    htmlPart("Stat", "HTMLDivElement"),
    htmlPart("StatLabel", "HTMLParagraphElement"),
    htmlPart("StatValue", "HTMLParagraphElement"),
    htmlPart("StatDetail", "HTMLParagraphElement"),
  ],
  accordion: [
    {
      component: "Accordion",
      prop: "variant",
      type: '"card" | "divided"',
      defaultValue: '"card"',
      description:
        "Show separate cards or a flat list with dividers between rows.",
    },
  ],
  alert: [
    {
      component: "Alert",
      prop: "title",
      type: "string",
      defaultValue: "undefined",
      description:
        "Renders an icon, heading, and children as the description when provided. Omit to compose the parts yourself.",
    },
    {
      component: "Alert",
      prop: "variant",
      type: '"info" | "success" | "warning" | "error" | "neutral"',
      defaultValue: '"info"',
      description: "Selects the alert color and icon.",
    },
    {
      component: "Alert",
      prop: "children",
      type: "ReactNode",
      defaultValue: "undefined",
      description:
        "Content of the alert; used as the description when title is set.",
    },
    {
      component: "Alert",
      prop: "HTML div attributes",
      type: 'Omit<HTMLAttributes<HTMLDivElement>, "title">',
      defaultValue: "—",
      description:
        "Standard div attributes, including className and aria-* attributes.",
    },
    {
      component: "AlertIcon",
      prop: "className",
      type: "string",
      defaultValue: "undefined",
      description: "Additional classes for the decorative variant icon.",
    },
    {
      component: "AlertTitle",
      prop: "HTML heading attributes",
      type: "HTMLAttributes<HTMLHeadingElement>",
      defaultValue: "—",
      description: "Heading content and h3 attributes, including className.",
    },
    {
      component: "AlertDescription",
      prop: "HTML div attributes",
      type: "HTMLAttributes<HTMLDivElement>",
      defaultValue: "—",
      description:
        "Description content and div attributes, including className.",
    },
  ],
  dialog: [
    {
      component: "DialogContent",
      prop: "role",
      type: '"dialog" | "alertdialog"',
      defaultValue: '"dialog"',
      description:
        "Alert dialogs require an explicit action and do not close on outside press.",
    },
    {
      component: "DialogContent",
      prop: "overlayProps",
      type: "ModalOverlayProps",
      defaultValue: "outside press enabled for ordinary dialogs",
      description:
        "Pass React Aria overlay options such as isDismissable and isKeyboardDismissDisabled. Alert dialogs always ignore outside press.",
    },
  ],
  drawer: [
    {
      component: "Drawer",
      prop: "isOpen / defaultOpen / onOpenChange",
      type: "DialogTriggerProps",
      defaultValue: "false",
      description:
        "Control the drawer or let the trigger manage open state. Escape and outside press request closure.",
    },
    {
      component: "DrawerContent",
      prop: "placement",
      type: '"bottom" | "top" | "left" | "right"',
      defaultValue: '"bottom"',
      description:
        "Choose the edge. Side drawers swipe to dismiss; only bottom drawers use snap points.",
    },
    {
      component: "DrawerContent",
      prop: "snapPoints",
      type: "number[]",
      defaultValue: "[0.85]",
      description:
        "Bottom-only visible viewport fractions in (0, 1]. Invalid values are ignored. The first (smallest) valid point opens initially.",
    },
    {
      component: "DrawerContent",
      prop: "snapPoint / defaultSnapPoint / onSnapPointChange",
      type: "number / number / (point: number) => void",
      defaultValue: "first snap point",
      description:
        "Control or observe the bottom drawer height. Values outside the list resolve to the closest point.",
    },
    {
      component: "DrawerContent",
      prop: "overlayProps",
      type: "ModalOverlayProps",
      defaultValue: "isDismissable: true",
      description:
        "Pass React Aria overlay options such as isDismissable and isKeyboardDismissDisabled.",
    },
    {
      component: "DrawerHandle",
      prop: "keyboard",
      type: "Up / Down / Home / End",
      defaultValue: "—",
      description:
        "On bottom drawers, arrows move between snap points, Home expands, and End closes. Escape works anywhere inside the dialog.",
    },
    {
      component: "DrawerClose",
      prop: "variant / size",
      type: "ButtonProps",
      defaultValue: '"ghost" / "icon" (without children)',
      description:
        "Uses the shared Button variants. Choose default for a primary action, outline for a secondary action, or ghost for dismissal.",
    },
  ],
  badge: [
    {
      component: "Badge",
      prop: "variant",
      type: '"neutral" | "accent" | "success" | "warning" | "error" | "outline"',
      defaultValue: '"neutral"',
      description: "Sets the badge color role.",
    },
    {
      component: "Badge",
      prop: "dot",
      type: "boolean",
      defaultValue: "false",
      description: "Adds a BadgeDot before the content.",
    },
    {
      component: "Badge",
      prop: "HTML span attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      defaultValue: "—",
      description: "Badge text, className, and standard span attributes.",
    },
    {
      component: "BadgeDot",
      prop: "HTML span attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      defaultValue: "—",
      description:
        "Additional attributes for the decorative dot, including className.",
    },
  ],
};

const customGuidance: Record<string, string> = {
  "button-group":
    "Group independent actions with Button or ButtonLink. Each action stays in the normal tab order. Use Toggle button group for a persistent selection and Toolbar for arrow-key navigation; give an unlabeled group an accessible name.",
  dialog:
    'Ordinary dialogs close on outside press or Escape. Use role="alertdialog" for confirmations that must ignore outside press; provide a visible Cancel or confirm action. Escape remains available. Set overlayProps.isDismissable=false to disable outside press on an ordinary dialog.',
  timeline:
    "Put events in chronological or reverse-chronological order. Use a real time element with dateTime for timestamps and keep descriptions optional. Timeline is a plain ordered list, not a keyboard-managed control.",
  "text-swap":
    "Use TextSwap for short labels that change after an action. Its accessible text switches immediately; the outgoing visual text is hidden from screen readers. Set aria-live=polite only when the update needs announcing, not for constantly changing values.",
  stepper:
    "Pass a zero-based currentStep within the steps array. The ordered list marks the active item with aria-current=step and earlier items as complete. It shows progress but does not navigate: place real Button controls beside it if people can move through the workflow.",
  fieldset:
    "Use Fieldset for related native form controls and put FieldsetLegend first. Connect FieldsetDescription with aria-describedby. For a single React Aria selection group, use Radio group or Checkbox group instead; they already own their labels and keyboard behavior.",
  "animated-number":
    'Use AnimatedNumber for values that change after an action, not for a constantly updating timer. The default counts toward the new value; variant="slide" moves changed digits up for increases and down for decreases. Reduced motion shows the final value without movement. Its accessible text changes once per value change; add a live region only if the change needs to be announced.',
  accordion:
    'Use variant="divided" to place a single divider between rows without a card around each item. The trigger keeps its expanded cue, keyboard focus, and panel relationship in both variants.',
  "progress-ring":
    "Pass a visible label and use value for known progress. Use isIndeterminate when the amount remaining is unknown; the reduced-motion version keeps a static partial arc. For a long valueLabel, set showValue to false and display the detail nearby. Use Meter for a measurement rather than task progress.",
  "presence-list":
    "Use stable keys from your data, not array indexes. The component renders a plain ul; use Grid list or List box for keyboard-managed collections. Exiting rows become inert. If a removed row contains the focused control, move focus to a remaining control before removing it.",
  "typing-indicator":
    "Mount the indicator only while someone is composing. Pass a specific label such as 'Maya is typing'. It reuses Spinner's dots and remains readable without motion; do not use it for a task with measurable progress.",
  "input-group":
    "Use InputGroup inside TextField or TextArea, with a visible field label. React Aria keeps the label, description, error, and value attached to the input. The group supplies the shared border; it does not submit the form or disable independent buttons. Give icon-only actions an accessible name and mark decorative icons aria-hidden.",
  button:
    "Button and ButtonLink share the typed buttonStyles recipe in button-styles.tsx. Add a reusable variant or size there; use className for one-off layout changes, not a second button color or radius.",
  "checkbox-group":
    "Pass label and description for the ready-made layout, or compose CheckboxGroupLabel, CheckboxGroupItems, CheckboxGroupDescription, and CheckboxGroupError as children. Keep a visible label or supply aria-label.",
  "token-field":
    "TagFieldValue turns text into tokens when you type a comma or paste a newline. Wire onSubmit to value.commit() if Enter should add a tag. Compose TokenFieldLabel, TokenFieldInput, and TokenFieldDescription as children when you need a custom layout; keep a label or supply aria-label. Use TokenFieldValue for free-form text or extend it for a different syntax. The field does not upload or submit tags by itself.",
  tree: "Give each item a stable id and a text title for typeahead. Pass content to customize the visible row without using children, which holds nested items. React Aria manages expansion, keyboard navigation, and selection; use Tree for nested data and List box for a flat collection.",
  "drop-zone":
    "Restrict supported formats with getDropOperation and validate the files again in onDrop. Add FileTrigger for people who cannot drag files. Dropping a file does not upload it.",
  "color-picker":
    "Use value and onChange for a controlled picker, or defaultValue for an uncontrolled one. The swatch, color area, hue slider, and hex field share one React Aria color value.",
  "command-palette":
    "Mount one shortcut-enabled palette per page. Pass MenuItem actions as children; CommandPaletteItem uses the shared menu styles and closes the palette after an action. Escape and outside press dismiss it.",
  card: "Use Card to group one topic. Keep actions inside the card rather than making the entire card clickable when it contains other controls.",
  avatar:
    "Always pass a person's name. If the image is missing or fails, initials appear while assistive technology still reads the full name.",
  skeleton:
    "Match the space and shape of the content that will replace it. Skeleton is decorative; put a loading message in a stable status container and remove it when content arrives.",
  spinner:
    "Use ring or segments for small controls, dots or bars for inline activity, orbit or pulse for longer waits, and spark for AI responses. Set decorative when visible text already names the task; otherwise give the spinner a specific aria-label. Reduced motion keeps every variant visible without movement. Use Progress bar for measurable work.",
  "empty-state":
    "Say what is missing and give an action that resolves it when possible. The icon is decorative; the title and description carry the message.",
  pagination:
    "Link to actual page URLs and derive isCurrent from the active page. Omit Previous or Next at the ends. Use Ellipsis only when pages really have been omitted.",
  "description-list":
    "Keep each DescriptionTerm immediately before its DescriptionDetail so screen readers can associate labels and values. Use a table for comparable rows of records.",
  "kbd-code":
    "Use Kbd for a physical key and InlineCode for identifiers or short commands. Explain shortcuts in prose and adjust modifier names for the platform when needed.",
  stat: "Give each value a label and timeframe or denominator when it matters. Spell out changes in StatDetail instead of using color or arrows alone.",
};

export interface ComponentExample {
  title: string;
  description: string;
  preview: ReactNode;
  sourcePath: string;
}

interface ComponentPageProps {
  name: string;
  description: string;
  reactAriaDocsHref?: string;
  preview: ReactNode;
  previewHint: string;
  previewSourcePath: string;
  examples?: ComponentExample[];
  sourcePath: string;
  previous?: { name: string; href: string };
  next?: { name: string; href: string };
}

export async function ComponentPage({
  name,
  description,
  reactAriaDocsHref,
  preview,
  previewHint,
  previewSourcePath,
  examples = [],
  sourcePath,
  previous,
  next,
}: ComponentPageProps) {
  const componentSlug = path.basename(sourcePath, ".tsx");
  const item = await readRegistryItem(componentSlug);
  const primaryFile = item.files.find((file) => file.path === sourcePath);
  if (!primaryFile)
    throw new Error(`Missing registry source for ${componentSlug}`);
  const previewSource = (
    await readFile(
      path.join(
        process.cwd(),
        "src/components/docs",
        path.basename(previewSourcePath),
      ),
      "utf8",
    )
  ).replaceAll("@/components/ui/", "@/components/vip-ui/");
  const exampleSources = await Promise.all(
    examples.map(async (example) =>
      (
        await readFile(
          path.join(
            process.cwd(),
            "src/components/docs",
            path.basename(example.sourcePath),
          ),
          "utf8",
        )
      ).replaceAll("@/components/ui/", "@/components/vip-ui/"),
    ),
  );
  const packages = item.dependencies;
  const cliUrl = registryUrl(componentSlug);
  const customApi = customComponentApi[componentSlug];
  return (
    <article>
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 text-xs text-muted-foreground"
      >
        <Link href="/components" className="rounded-sm hover:text-foreground">
          Components
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">{name}</span>
      </nav>
      <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] [text-wrap:balance]">
        {name}
      </h1>
      <section
        id="preview"
        aria-label={`${name} preview`}
        className="mt-8 scroll-mt-24"
      >
        <PreviewPanel code={previewSource} filename={previewSourcePath}>
          {preview}
        </PreviewPanel>
        <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
          {previewHint}
        </p>
      </section>

      <section id="installation" className="mt-14 scroll-mt-24">
        <SectionHeading title="Install" />
        <InstallTabs
          cliAvailable={Boolean(cliUrl)}
          cli={
            <div className="space-y-4">
              <p className="text-[13px] leading-6 text-muted-foreground">
                Requires TypeScript, Tailwind v4, and shadcn CSS-variable
                theming. Complete the{" "}
                <Link
                  href="/components/installation#setup"
                  className="text-primary underline underline-offset-4"
                >
                  one-time setup
                </Link>{" "}
                before running this command.
              </p>
              {cliUrl ? (
                <PackageManagerCommand
                  action="run"
                  args={`shadcn@latest add ${cliUrl}`}
                />
              ) : (
                <p className="text-[13px] leading-6 text-muted-foreground">
                  The CLI command will be available when the registry has a
                  public URL. Use Custom until then.
                </p>
              )}
            </div>
          }
          custom={
            <div className="space-y-5">
              <p className="text-[13px] leading-6 text-muted-foreground">
                Complete the{" "}
                <Link
                  href="/components/installation#setup"
                  className="text-primary underline underline-offset-4"
                >
                  one-time setup
                </Link>{" "}
                first. Install the dependencies below, then copy every file
                under your components directory as shown by the{" "}
                <code className="font-mono text-foreground">@components/</code>{" "}
                placeholder. Check existing files before replacing them and
                adjust imports if your aliases differ.
              </p>
              {packages.length > 0 && (
                <PackageManagerCommand action="add" args={packages.join(" ")} />
              )}
              {item.files.map((file) => (
                <div key={file.target}>
                  <CodeBlock code={file.content} filename={file.target} />
                </div>
              ))}
            </div>
          }
        />
      </section>

      <section id="usage" className="mt-14 scroll-mt-24">
        <SectionHeading title="Usage" />
        <div className="mb-5 max-w-[670px] space-y-3 text-sm leading-7 text-muted-foreground">
          <p>{description}</p>
          {customGuidance[componentSlug] && (
            <p>{customGuidance[componentSlug]}</p>
          )}
        </div>
        <CodeBlock
          code={anatomy[componentSlug]}
          filename={`${componentSlug}-usage.tsx`}
        />
      </section>

      {examples.length > 0 && (
        <section id="examples" className="mt-14 scroll-mt-24">
          <SectionHeading title="Examples" />
          <div className="space-y-10">
            {examples.map((example, index) => (
              <div key={`${example.sourcePath}:${example.title}`}>
                <ExampleHeading title={example.title} />
                <PreviewPanel
                  code={exampleSources[index]}
                  filename={example.sourcePath}
                >
                  {example.preview}
                </PreviewPanel>
                <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="api" className="mt-14 scroll-mt-24">
        <SectionHeading title="API reference" />
        {customApi && (
          <>
            <p className="mb-3 text-xs text-muted-foreground sm:hidden">
              Scroll the table to see all columns.
            </p>
            <div className="overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
              <table className="w-full min-w-[650px] border-collapse text-left text-[12px]">
                <thead className="bg-muted/60 text-muted-foreground">
                  <tr>
                    {(
                      [
                        "Component",
                        "Prop",
                        "Type",
                        "Default",
                        "Description",
                      ] as const
                    ).map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="px-4 py-3 font-semibold"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customApi.map((item) => (
                    <tr
                      key={`${item.component}-${item.prop}`}
                      className="border-t border-border/70 align-top"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-mono font-medium text-foreground"
                      >
                        {item.component}
                      </th>
                      <td className="px-4 py-3 font-mono text-foreground">
                        {item.prop}
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {item.type}
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {item.defaultValue}
                      </td>
                      <td className="px-4 py-3 leading-5 text-muted-foreground">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {reactAriaDocsHref && (
          <p className="mt-4 max-w-[670px] text-sm leading-7 text-muted-foreground">
            See the{" "}
            <a
              href={reactAriaDocsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              React Aria API
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>{" "}
            for inherited props and behavior. The Custom tab above contains
            vip/ui's source and local props.
          </p>
        )}
      </section>

      <nav
        aria-label="Component pagination"
        className="mt-16 grid gap-3 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={previous.href}
            className="group flex min-h-20 flex-col justify-center rounded-xl bg-card px-5 py-3 shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-muted"
          >
            <span className="text-[11px] text-muted-foreground">
              Previous component
            </span>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
              <ArrowLeft size={16} aria-hidden="true" />
              {previous.name}
            </span>
          </Link>
        ) : (
          <Link
            href="/components"
            className="group flex min-h-20 flex-col justify-center rounded-xl bg-card px-5 py-3 shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-muted"
          >
            <span className="text-[11px] text-muted-foreground">Back to</span>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
              <ArrowLeft size={16} aria-hidden="true" />
              All components
            </span>
          </Link>
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex min-h-20 flex-col items-end justify-center rounded-xl bg-card px-5 py-3 text-right shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-muted"
          >
            <span className="text-[11px] text-muted-foreground">
              Next component
            </span>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
              {next.name}
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ) : (
          <Link
            href="/components"
            className="group flex min-h-20 flex-col items-end justify-center rounded-xl bg-accent px-5 py-3 text-right text-accent-foreground shadow-[var(--shadow-card)] hover:bg-accent/70"
          >
            <span className="text-[11px]">Explore more</span>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
              All components
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}

function ExampleHeading({ title }: { title: string }) {
  return (
    <h3 className="mb-4 text-base font-semibold tracking-[-0.02em]">{title}</h3>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mb-5 text-[23px] font-semibold tracking-[-0.045em]">
      {title}
    </h2>
  );
}
