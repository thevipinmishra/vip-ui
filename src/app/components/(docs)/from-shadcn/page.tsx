import { CodeBlock } from "@/components/docs/code-block";
import {
  Code,
  ExternalLink,
  GuidePage,
  GuideSection,
  guideMetadata,
  List,
  TextLink,
} from "@/components/docs/guide";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { Alert } from "@/components/ui/alert";

export const metadata = guideMetadata("/components/from-shadcn");

const before = `import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => rename()}>Rename</DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => remove()}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;

const after = `import { Button } from "@/components/vip-ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/vip-ui/menu";

export function RowActions() {
  return (
    <MenuTrigger>
      <Button variant="outline">Actions</Button>
      <MenuPopover>
        <MenuContent aria-label="Row actions">
          <MenuItem onAction={rename}>Rename</MenuItem>
          <MenuItem variant="destructive" onAction={remove}>
            Delete
          </MenuItem>
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}`;

interface MapRow {
  shadcn: string;
  vip: string;
}

function MapTable({ rows }: { rows: MapRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/50">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border/70">
            <th className="px-4 py-2.5 text-start font-medium text-foreground sm:px-5">
              shadcn/ui
            </th>
            <th className="px-4 py-2.5 text-start font-medium text-foreground sm:px-5">
              vip/ui
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {rows.map((row) => (
            <tr key={row.shadcn}>
              <td className="px-4 py-2 align-top font-mono text-[13px] whitespace-nowrap text-foreground sm:px-5">
                {row.shadcn}
              </td>
              <td className="px-4 py-2 align-top font-mono text-[13px] whitespace-nowrap text-muted-foreground sm:px-5">
                {row.vip}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NameList({ names }: { names: readonly string[] }) {
  return (
    <p className="flex flex-wrap gap-x-3 gap-y-1">
      {names.map((name) => (
        <Code key={name}>{name}</Code>
      ))}
    </p>
  );
}

const sameName = [
  "accordion",
  "alert",
  "attachment",
  "avatar",
  "badge",
  "button",
  "button-group",
  "calendar",
  "card",
  "chart",
  "checkbox",
  "context-menu",
  "data-table",
  "date-picker",
  "dialog",
  "input-group",
  "message",
  "native-select",
  "pagination",
  "popover",
  "radio-group",
  "select",
  "separator",
  "sheet",
  "skeleton",
  "slider",
  "spinner",
  "switch",
  "table",
  "tabs",
  "toast",
  "tooltip",
];

const renamed: MapRow[] = [
  { shadcn: "alert-dialog", vip: "dialog" },
  { shadcn: "breadcrumb", vip: "breadcrumbs" },
  { shadcn: "collapsible", vip: "disclosure" },
  { shadcn: "combobox", vip: "combo-box" },
  { shadcn: "command", vip: "command-palette" },
  { shadcn: "drawer", vip: "sheet" },
  { shadcn: "dropdown-menu", vip: "menu" },
  { shadcn: "empty", vip: "empty-state" },
  { shadcn: "field", vip: "fieldset" },
  { shadcn: "input", vip: "text-field" },
  { shadcn: "kbd", vip: "kbd-code" },
  { shadcn: "progress", vip: "progress-bar" },
  { shadcn: "sonner", vip: "toast" },
  { shadcn: "textarea", vip: "text-area" },
  { shadcn: "toggle", vip: "toggle-button" },
  { shadcn: "toggle-group", vip: "toggle-button-group" },
];

const notAvailable = [
  "aspect-ratio",
  "bubble",
  "carousel",
  "code-block",
  "direction",
  "hover-card",
  "input-otp",
  "item",
  "label",
  "marker",
  "menubar",
  "message-scroller",
  "navigation-menu",
  "questionnaire",
  "resizable",
  "scroll-area",
  "sidebar",
  "trace",
];

export default function FromShadcnPage() {
  return (
    <GuidePage href="/components/from-shadcn">
      <GuideSection id="beside-shadcn" title="Install beside shadcn/ui">
        <p>
          vip/ui installs beside shadcn/ui in one project. Components go to a{" "}
          <Code>vip-ui/</Code> folder inside your components folder, and blocks
          go to <Code>components/blocks/&lt;name&gt;/</Code>. Your{" "}
          <Code>components/ui/</Code> folder and your shadcn{" "}
          <Code>utils.ts</Code> do not change.
        </p>
        <p>
          To add components by name, add the <Code>@vip-ui</Code> namespace. See{" "}
          <TextLink href="/components/installation">Installation</TextLink>.
        </p>
        <PackageManagerCommand
          action="run"
          args="shadcn@latest add @vip-ui/button"
        />
      </GuideSection>

      <GuideSection id="example" title="A quick example">
        <p>A dropdown menu that opens actions. The shadcn/ui version:</p>
        <CodeBlock code={before} filename="row-actions.tsx" />
        <p>The vip/ui version:</p>
        <CodeBlock code={after} filename="row-actions.tsx" />
        <List>
          <li>
            The trigger part wraps the button and the popover. Put the button
            directly inside, with no <Code>asChild</Code> or <Code>render</Code>{" "}
            step.
          </li>
          <li>
            Items call <Code>onAction</Code> instead of <Code>onClick</Code>.
          </li>
          <li>
            Give the content an <Code>aria-label</Code> when it has no visible
            title.
          </li>
        </List>
      </GuideSection>

      <GuideSection id="name-map" title="Component name map">
        <p>These components keep their shadcn name:</p>
        <NameList names={sameName} />
        <p>These components change name:</p>
        <MapTable rows={renamed} />
        <Alert variant="neutral" title="One alert dialog">
          vip/ui has one <Code>dialog</Code>. For a confirmation dialog, set{" "}
          <Code>role=&quot;alertdialog&quot;</Code> on{" "}
          <Code>DialogContent</Code>.
        </Alert>
        <p>These shadcn components have no vip/ui counterpart:</p>
        <NameList names={notAvailable} />
        <p>
          For labels, use the label part that ships with each field, such as{" "}
          <Code>TextFieldLabel</Code>, or <Code>Label</Code> from{" "}
          <Code>react-aria-components</Code>. The shadcn <Code>Typography</Code>{" "}
          system has a counterpart with the same idea and its own name: the CSS
          presets in the{" "}
          <TextLink href="/components/typography">Typography guide</TextLink>.
        </p>
      </GuideSection>

      <GuideSection id="api" title="API differences">
        <p>
          vip/ui wraps React Aria Components. The event names and the
          composition patterns differ from shadcn.
        </p>
        <List>
          <li>
            Press handlers are <Code>onPress</Code>, not <Code>onClick</Code>.{" "}
            <Code>onPress</Code> covers mouse, touch, keyboard, and screen
            reader activation.
          </li>
          <li>
            The disabled prop is <Code>isDisabled</Code>, not{" "}
            <Code>disabled</Code>.
          </li>
          <li>
            Items in <Code>Select</Code>, <Code>ComboBox</Code>,{" "}
            <Code>Menu</Code>, <Code>ListBox</Code>, <Code>Table</Code>, and{" "}
            <Code>Tree</Code> take an <Code>id</Code>. The id is the value.
          </li>
          <li>
            <Code>Select</Code> accepts <Code>value</Code>,{" "}
            <Code>defaultValue</Code>, and <Code>onValueChange</Code> next to
            the React Aria <Code>selectedKey</Code> props.
          </li>
          <li>
            Tabs parts are <Code>TabList</Code>, <Code>Tab</Code>, and{" "}
            <Code>TabPanel</Code>.
          </li>
          <li>
            Table parts are <Code>Column</Code>, <Code>Row</Code>, and{" "}
            <Code>Cell</Code> instead of <Code>TableHead</Code>,{" "}
            <Code>TableRow</Code>, and <Code>TableCell</Code>.
          </li>
          <li>
            <Code>{"showToast({ title })"}</Code> shows a toast. Render{" "}
            <Code>&lt;ToastViewport /&gt;</Code> one time, near the root of your
            app.
          </li>
        </List>
        <p>
          <Code>Dialog</Code> keeps the shadcn part names. <Code>Dialog</Code>{" "}
          wraps <Code>DialogTrigger</Code> and <Code>DialogContent</Code>, and
          the content holds <Code>DialogHeader</Code>, <Code>DialogTitle</Code>,{" "}
          <Code>DialogDescription</Code>, <Code>DialogBody</Code>,{" "}
          <Code>DialogFooter</Code>, and <Code>DialogClose</Code>.
        </p>
        <p>
          Fields compose. A text field holds its own label, input, description,
          and error parts, such as <Code>TextFieldLabel</Code>,{" "}
          <Code>TextFieldInput</Code>, and <Code>TextFieldError</Code>. For
          validation, see{" "}
          <TextLink href="/components/react-aria#forms">Forms</TextLink>.
        </p>
      </GuideSection>

      <GuideSection id="icons" title="Icons">
        <p>
          Components that show icons import them from{" "}
          <Code>@phosphor-icons/react</Code>, and the CLI installs the package
          with the component. An installed file keeps these imports even when
          your project uses Lucide. Your own code can use any icon package.
        </p>
      </GuideSection>

      <GuideSection id="charts" title="Charts">
        <p>
          The chart item does not wrap Recharts. It installs{" "}
          <Code>ChartFrame</Code> and <Code>Chart</Code>, which frame{" "}
          <ExternalLink href="https://tanstack.com/charts">
            TanStack Charts
          </ExternalLink>
          . A shadcn <Code>ChartContainer</Code> and its series config do not
          exist here. Copy an example from{" "}
          <TextLink href="/charts">Charts</TextLink> instead.
        </p>
      </GuideSection>

      <GuideSection id="tokens" title="Theme tokens">
        <p>
          Components use the shadcn color tokens, such as <Code>--primary</Code>{" "}
          and <Code>--border</Code>. Your current theme works with no changes.
          vip/ui adds a small set of tokens, such as <Code>--success</Code> and{" "}
          <Code>--shadow-card</Code>. See{" "}
          <TextLink href="/components/styling#theme">Theme</TextLink>.
        </p>
      </GuideSection>
    </GuidePage>
  );
}
