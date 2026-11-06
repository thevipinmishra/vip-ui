"use client";

import {
  AppWindowIcon,
  CalendarBlankIcon,
  DesktopIcon,
  DotsThreeIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
  TableIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { RouterProvider } from "react-aria-components";
import { Block, BlockBody, BlockFooter } from "@/components/home/block";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-swatch-picker";
import { CopyButton } from "@/components/ui/copy-button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd-code";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  RadioButton,
  RadioField,
  RadioGroup,
  RadioGroupItems,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio-group";
import { SearchField } from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { Timeline, TimelineItem, TimelineTime } from "@/components/ui/timeline";
import { showToast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const tasks = [
  { id: "copy", label: "Review the page copy" },
  { id: "images", label: "Export the new images" },
  { id: "pricing", label: "Update the pricing page" },
  { id: "publish", label: "Publish the site" },
];

const owners = ["Maya Chen", "Sam Rivera", "Jo Park"];

export function ProjectCard() {
  const [done, setDone] = useState(["copy", "images"]);
  const [archiving, setArchiving] = useState(false);
  const complete = done.length === tasks.length;

  return (
    <Block
      title="Website refresh"
      description="Due November 14"
      action={
        <MenuTrigger>
          <TooltipTrigger>
            <Button
              variant="ghost"
              iconOnly
              size="sm"
              aria-label="Project actions"
              className="-me-2 -mt-1"
            >
              <DotsThreeIcon size={18} weight="bold" aria-hidden="true" />
            </Button>
            <Tooltip>Project actions</Tooltip>
          </TooltipTrigger>
          <MenuPopover placement="bottom end">
            <MenuContent
              aria-label="Project actions"
              onAction={(key) => {
                if (key === "archive") setArchiving(true);
                if (key === "duplicate")
                  showToast({
                    title: "Project duplicated",
                    variant: "success",
                  });
                if (key === "link")
                  showToast({ title: "Link copied", variant: "success" });
              }}
            >
              <MenuItem id="link">Copy link</MenuItem>
              <MenuItem id="duplicate">Duplicate</MenuItem>
              <MenuSeparator />
              <MenuItem id="archive" variant="destructive">
                Archive
              </MenuItem>
            </MenuContent>
          </MenuPopover>
        </MenuTrigger>
      }
    >
      <BlockBody className="gap-4">
        <ProgressBar
          label="Tasks"
          value={done.length}
          maxValue={tasks.length}
          valueLabel={`${done.length} of ${tasks.length}`}
        />
        <CheckboxGroup aria-label="Tasks" value={done} onChange={setDone}>
          {tasks.map((task) => (
            <Checkbox key={task.id} value={task.id}>
              {task.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </BlockBody>
      <BlockFooter className="justify-between border-t border-border/70 pt-4">
        <AvatarGroup
          aria-label="Owners"
          className="-space-x-1 [&_[data-slot=avatar]]:ring-card"
        >
          {owners.map((name) => (
            <Avatar key={name} name={name} className="size-7 text-[0.625rem]" />
          ))}
        </AvatarGroup>
        <Badge variant={complete ? "success" : "accent"} dot>
          {complete ? "Done" : "In progress"}
        </Badge>
      </BlockFooter>
      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{ isOpen: archiving, onOpenChange: setArchiving }}
      >
        <DialogHeader>
          <DialogTitle>Archive Website refresh?</DialogTitle>
          <DialogDescription>
            The team can no longer change it. You can restore it later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button
            variant="destructive"
            onPress={() => {
              setArchiving(false);
              showToast({ title: "Project archived", variant: "success" });
            }}
          >
            Archive
          </Button>
        </DialogFooter>
      </DialogContent>
    </Block>
  );
}

type Access = "owner" | "edit" | "view";

const accessOptions = [
  { id: "edit", name: "Can edit" },
  { id: "view", name: "Can view" },
];

const initialPeople: {
  id: string;
  name: string;
  detail: string;
  access: Access;
}[] = [
  { id: "maya", name: "Maya Chen", detail: "maya@acme.co", access: "owner" },
  { id: "sam", name: "Sam Rivera", detail: "sam@acme.co", access: "edit" },
  { id: "jo", name: "Jo Park", detail: "jo@acme.co", access: "view" },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ShareCard() {
  const [people, setPeople] = useState(initialPeople);
  const [email, setEmail] = useState("");
  const valid = emailPattern.test(email.trim());

  return (
    <Block title="Share project">
      <BlockBody className="gap-3">
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            if (!valid) return;
            const address = email.trim();
            setPeople((current) => [
              ...current,
              {
                id: crypto.randomUUID(),
                name: address,
                detail: "Invite sent",
                access: "view",
              },
            ]);
            setEmail("");
            showToast({ title: "Invite sent", variant: "success" });
          }}
        >
          <InputGroup>
            <InputGroupInput
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputGroupButton type="submit" isDisabled={!valid}>
              Invite
            </InputGroupButton>
          </InputGroup>
        </Form>
        <ul aria-label="People with access" className="grid gap-1">
          {people.map((person) => (
            <li
              key={person.id}
              className="flex min-h-11 min-w-0 items-center gap-3"
            >
              <Avatar name={person.name} className="size-8 text-xs" />
              <span className="grid min-w-0 flex-1">
                <span className="truncate text-sm font-medium">
                  {person.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {person.detail}
                </span>
              </span>
              {person.access === "owner" ? (
                <span className="shrink-0 pe-1 text-sm text-muted-foreground">
                  Owner
                </span>
              ) : (
                <Select
                  aria-label={`Access for ${person.name}`}
                  size="sm"
                  options={accessOptions}
                  value={person.access}
                  onValueChange={(value) =>
                    setPeople((current) =>
                      current.map((item) =>
                        item.id === person.id
                          ? { ...item, access: value as Access }
                          : item,
                      ),
                    )
                  }
                  className="w-28 shrink-0 max-sm:w-32"
                />
              )}
            </li>
          ))}
        </ul>
      </BlockBody>
      <BlockFooter className="flex-nowrap justify-between border-t border-border/70 pt-4">
        <span className="min-w-0 truncate text-xs text-muted-foreground">
          Anyone at Acme can view
        </span>
        <CopyButton
          className="shrink-0"
          value="https://acme.app/p/website-refresh"
          size="sm"
          aria-label="Copy the project link"
        >
          {(status) => (status === "copied" ? "Copied" : "Copy link")}
        </CopyButton>
      </BlockFooter>
    </Block>
  );
}

const shortcuts = [
  {
    slug: "dialog",
    name: "Dialog",
    group: "Overlays",
    icon: AppWindowIcon,
  },
  {
    slug: "data-table",
    name: "Data table",
    group: "Collections",
    icon: TableIcon,
  },
  {
    slug: "date-picker",
    name: "Date picker",
    group: "Date & color",
    icon: CalendarBlankIcon,
  },
  {
    slug: "color-picker",
    name: "Color picker",
    group: "Date & color",
    icon: PaletteIcon,
  },
  {
    slug: "command-palette",
    name: "Command palette",
    group: "Actions",
    icon: TerminalWindowIcon,
  },
];

export function CommandCard() {
  const router = useRouter();

  return (
    <Card className="grid min-w-0 gap-3 p-3">
      <RouterProvider navigate={(path) => router.push(path)}>
        <Autocomplete>
          <SearchField
            aria-label="Search components"
            placeholder="Search components"
          />
          <ListBox
            aria-label="Components"
            items={shortcuts}
            className="max-h-none border-0 bg-transparent p-0 shadow-none"
            renderEmptyState={() => (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No components match.
              </p>
            )}
          >
            {(item) => (
              <ListBoxItem
                id={item.slug}
                href={`/components/${item.slug}`}
                textValue={item.name}
                className="justify-start px-2 [&>[data-slot=selection-mark]]:hidden"
              >
                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground"
                >
                  <item.icon size={16} />
                </span>
                <span className="min-w-0 flex-1 truncate font-medium">
                  {item.name}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.group}
                </span>
              </ListBoxItem>
            )}
          </ListBox>
        </Autocomplete>
      </RouterProvider>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 px-2 pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          Move
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd>Enter</Kbd>
          Open
        </span>
      </div>
    </Card>
  );
}

const templates = [
  { id: "blank", name: "Blank", description: "Start from an empty page" },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Stats, charts, and tables",
  },
  {
    id: "marketing",
    name: "Marketing site",
    description: "Landing and pricing pages",
  },
];

const visibilities = [
  { id: "private", label: "Private", note: "Only people you invite" },
  { id: "workspace", label: "Workspace", note: "Everyone at Acme" },
];

export function CreateProjectCard() {
  return (
    <Block title="New project">
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({
            title: "Project created",
            description: "Your new project is ready to edit.",
            variant: "success",
          });
        }}
      >
        <BlockBody>
          <TextField
            label="Name"
            name="project-name"
            placeholder="Acme website"
            autoComplete="off"
            isRequired
          />
          <Select
            label="Template"
            name="template"
            options={templates}
            defaultValue="dashboard"
          />
          <RadioGroup
            label="Visibility"
            name="visibility"
            defaultValue="workspace"
          >
            <RadioGroupItems className="grid gap-2">
              {visibilities.map((option) => (
                <RadioField key={option.id} value={option.id} variant="card">
                  <RadioButton>
                    <RadioIndicator />
                    <span className="min-w-0 flex-1">
                      <RadioLabel className="block text-sm">
                        {option.label}
                      </RadioLabel>
                      <span className="block text-xs leading-5 text-muted-foreground">
                        {option.note}
                      </span>
                    </span>
                  </RadioButton>
                </RadioField>
              ))}
            </RadioGroupItems>
          </RadioGroup>
        </BlockBody>
        <BlockFooter className="justify-end border-t border-border/70 pt-4">
          <Button type="reset" variant="ghost">
            Reset
          </Button>
          <Button type="submit">Create</Button>
        </BlockFooter>
      </Form>
    </Block>
  );
}

const accents = [
  { color: "#3b4a42", label: "Sage" },
  { color: "#0d9488", label: "Teal" },
  { color: "#4f46e5", label: "Indigo" },
  { color: "#e11d48", label: "Rose" },
  { color: "#d97706", label: "Amber" },
];

export function AppearanceCard() {
  const themeLabel = useId();
  const accentLabel = useId();

  return (
    <Block title="Appearance">
      <BlockBody className="gap-5">
        <div className="grid gap-2">
          <p id={themeLabel} className="text-sm font-medium">
            Theme
          </p>
          <ToggleButtonGroup
            aria-labelledby={themeLabel}
            selectionMode="single"
            disallowEmptySelection
            defaultSelectedKeys={["light"]}
            className="w-full flex-nowrap"
          >
            <ToggleButton
              id="light"
              variant="segmented"
              className="min-w-0 flex-1 gap-1.5 px-2"
            >
              <SunIcon aria-hidden="true" />
              Light
            </ToggleButton>
            <ToggleButton
              id="dark"
              variant="segmented"
              className="min-w-0 flex-1 gap-1.5 px-2"
            >
              <MoonIcon aria-hidden="true" />
              Dark
            </ToggleButton>
            <ToggleButton
              id="system"
              variant="segmented"
              className="min-w-0 flex-1 gap-1.5 px-2"
            >
              <DesktopIcon aria-hidden="true" />
              Auto
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="grid gap-2">
          <p id={accentLabel} className="text-sm font-medium">
            Accent
          </p>
          <ColorSwatchPicker
            aria-labelledby={accentLabel}
            defaultValue={accents[0].color}
            className="-mx-1.5 gap-0"
          >
            {accents.map((accent) => (
              <ColorSwatchPickerItem
                key={accent.color}
                color={accent.color}
                aria-label={accent.label}
              />
            ))}
          </ColorSwatchPicker>
        </div>
        <Slider
          label="Text size"
          defaultValue={1}
          minValue={0.8}
          maxValue={1.4}
          step={0.05}
          formatOptions={{ style: "percent" }}
        />
        <Switch className="w-full">Reduce motion</Switch>
      </BlockBody>
    </Block>
  );
}

const journey = [
  { id: "placed", label: "Order placed", time: "Nov 3, 10:12" },
  { id: "shipped", label: "Shipped from Austin", time: "Nov 4, 16:40" },
  { id: "transit", label: "In transit to Denver", time: "Today, 08:25" },
  { id: "delivered", label: "Delivered", time: "Monday, Nov 9" },
];

export function OrderCard() {
  return (
    <Block
      title="Order 2048"
      description="Arrives Monday"
      action={
        <Badge variant="accent" dot>
          Shipped
        </Badge>
      }
    >
      <BlockBody>
        <Timeline aria-label="Delivery progress">
          {journey.map((step, index) => (
            <TimelineItem
              key={step.id}
              status={
                index < 2 ? "complete" : index === 2 ? "latest" : "upcoming"
              }
              className="pb-4"
            >
              <p className="text-sm leading-6 font-medium">{step.label}</p>
              <TimelineTime className="mt-0">{step.time}</TimelineTime>
            </TimelineItem>
          ))}
        </Timeline>
      </BlockBody>
      <BlockFooter className="justify-between border-t border-border/70 pt-4">
        <span className="text-xs text-muted-foreground">
          2 items · <span className="tabular-nums">$22.00</span>
        </span>
        <SheetTrigger>
          <Button variant="outline" size="sm">
            View order
          </Button>
          <Sheet position="right" size="sm">
            <SheetHeader>
              <SheetTitle>Order 2048</SheetTitle>
              <SheetDescription>Placed on November 3.</SheetDescription>
              <SheetClose />
            </SheetHeader>
            <SheetBody className="grid content-start gap-6">
              <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 text-sm">
                <dt>Canvas notebook</dt>
                <dd className="text-end tabular-nums">$18.00</dd>
                <dt>Gel pen</dt>
                <dd className="text-end tabular-nums">$4.00</dd>
                <dt className="border-t border-border pt-3 font-semibold">
                  Total
                </dt>
                <dd className="border-t border-border pt-3 text-end font-semibold tabular-nums">
                  $22.00
                </dd>
              </dl>
              <DescriptionList>
                <DescriptionTerm>Ship to</DescriptionTerm>
                <DescriptionDetail>14 Oak Street, Denver</DescriptionDetail>
                <DescriptionTerm>Delivery</DescriptionTerm>
                <DescriptionDetail>Standard</DescriptionDetail>
                <DescriptionTerm>Payment</DescriptionTerm>
                <DescriptionDetail>Visa ending in 4242</DescriptionDetail>
              </DescriptionList>
            </SheetBody>
            <SheetFooter>
              <SheetClose variant="outline">Close</SheetClose>
            </SheetFooter>
          </Sheet>
        </SheetTrigger>
      </BlockFooter>
    </Block>
  );
}
