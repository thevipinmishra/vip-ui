"use client";

import {
  ArrowSquareOutIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";
import { type ReactNode, useState } from "react";
import { Link as AriaLink } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { InlineCode } from "@/components/ui/kbd-code";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Popover,
  PopoverDescription,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import type { Primitive } from "@/lib/catalog";
import type { AxeFinding, DoctorFinding } from "@/lib/component-checks";
import { cn } from "@/lib/utils";
import {
  AxeMark,
  ClaudeMark,
  GeminiMark,
  GrokMark,
  MarkdownMark,
  OpenAIMark,
  ReactAriaMark,
  ReactDoctorMark,
  ZagMark,
} from "./brand-marks";
import { CopyCodeButton } from "./copy-code-button";
import { DocsEyebrow } from "./docs-eyebrow";
import { GitHubMark } from "./github-mark";
import { pageTitleClass, pageTitleSize } from "./page-header";

const repository = "https://github.com/thevipinmishra/vip-ui";
const doctorCommand = "npx -y react-doctor@latest .";

const assistants = [
  {
    label: "ChatGPT",
    icon: <OpenAIMark />,
    url: (prompt: string) => `https://chatgpt.com/?hints=search&q=${prompt}`,
  },
  {
    label: "Claude",
    icon: <ClaudeMark />,
    url: (prompt: string) => `https://claude.ai/new?q=${prompt}`,
  },
  {
    label: "Gemini",
    icon: <GeminiMark />,
    url: (prompt: string) => `https://gemini.google.com/app?q=${prompt}`,
  },
  {
    label: "Grok",
    icon: <GrokMark />,
    url: (prompt: string) => `https://grok.com/?q=${prompt}`,
  },
];

const chipClass =
  "inline-flex h-7 min-w-0 max-w-full items-center gap-1.5 rounded-full bg-card/70 px-2.5 text-xs font-medium text-foreground ring-1 ring-docs-line backdrop-blur-sm outline-offset-2 outline-transparent transition-[background-color,outline-color] duration-150 ease-out-quint hover:bg-muted pressed:bg-muted focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring [&_svg]:shrink-0";

const toneClass = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
};

function issueCount(count: number) {
  return count === 1 ? "1 issue" : `${count} issues`;
}

export interface ComponentHeaderProps {
  slug: string;
  name: string;
  category?: string;
  description: ReactNode;
  primitives: Primitive[];
  markdownUrl: string;
  prompt: string;
  axe?: AxeFinding[];
  doctor?: DoctorFinding[];
}

export function ComponentHeader({
  slug,
  name,
  category,
  description,
  primitives,
  markdownUrl,
  prompt,
  axe,
  doctor,
}: ComponentHeaderProps) {
  const hasChips = primitives.length > 0 || axe || doctor;
  return (
    <header>
      <DocsEyebrow
        trail={category ? ["Components", category] : ["Components"]}
      />
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <h1 className={cn(pageTitleClass, "min-w-0")}>{name}</h1>
        <div
          className={`flex h-lh shrink-0 items-center gap-2 ${pageTitleSize}`}
        >
          <CopyCodeButton
            code={prompt}
            label="Copy prompt"
            text="Copy prompt"
          />
          <PageActions slug={slug} name={name} markdownUrl={markdownUrl} />
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-base leading-7 text-pretty text-muted-foreground">
        {description}
      </p>
      {hasChips && (
        <ul aria-label="Details" className="mt-5 flex flex-wrap gap-2">
          {primitives.map((primitive) => (
            <li key={primitive.href} className="flex min-w-0">
              <TooltipTrigger>
                <AriaLink
                  href={primitive.href}
                  target="_blank"
                  rel="noreferrer"
                  className={chipClass}
                >
                  {primitive.library === "Zag.js" ? (
                    <ZagMark size={14} />
                  ) : (
                    <ReactAriaMark size={14} />
                  )}
                  <span className="sr-only">{primitive.library} </span>
                  <span className="truncate">{primitive.name}</span>
                  <ArrowUpRightIcon
                    size={12}
                    aria-hidden="true"
                    className="text-muted-foreground"
                  />
                </AriaLink>
                <Tooltip>Built with {primitive.library}</Tooltip>
              </TooltipTrigger>
            </li>
          ))}
          {axe && (
            <li className="flex min-w-0">
              <AxeChip findings={axe} />
            </li>
          )}
          {doctor && (
            <li className="flex min-w-0">
              <DoctorChip findings={doctor} file={`${slug}.tsx`} />
            </li>
          )}
        </ul>
      )}
    </header>
  );
}

function PageActions({
  slug,
  name,
  markdownUrl,
}: {
  slug: string;
  name: string;
  markdownUrl: string;
}) {
  const [copied, setCopied] = useState(false);
  const markdownPath = `/components/${slug}.md`;
  const prompt = encodeURIComponent(
    `Read ${markdownUrl}. It documents the ${name} component from vip/ui. I want to ask questions about it.`,
  );

  async function copyPage() {
    try {
      const text = fetch(markdownPath).then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.text();
      });
      if (typeof ClipboardItem === "undefined") {
        await navigator.clipboard.writeText(await text);
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": text.then(
              (value) => new Blob([value], { type: "text/plain" }),
            ),
          }),
        ]);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <MenuTrigger>
      <TooltipTrigger>
        <Button variant="minimal" size="sm" iconOnly aria-label="More actions">
          <DotsThreeIcon weight="bold" aria-hidden="true" />
        </Button>
        <Tooltip>More actions</Tooltip>
      </TooltipTrigger>
      <MenuPopover placement="bottom end" className="min-w-56">
        <MenuContent aria-label="More actions">
          <MenuItem
            shouldCloseOnSelect={false}
            onAction={copyPage}
            textValue="Copy page as Markdown"
          >
            <span className="text-muted-foreground [&_svg]:size-4">
              {copied ? (
                <CheckIcon aria-hidden="true" />
              ) : (
                <CopyIcon aria-hidden="true" />
              )}
            </span>
            {copied ? "Copied" : "Copy page as Markdown"}
          </MenuItem>
          <MenuItem
            href={markdownPath}
            target="_blank"
            rel="noreferrer"
            textValue="View as Markdown"
          >
            <span className="text-muted-foreground [&_svg]:size-4">
              <MarkdownMark />
            </span>
            View as Markdown
            <ArrowUpRightIcon
              size={14}
              aria-hidden="true"
              className="ms-auto text-muted-foreground"
            />
          </MenuItem>
          <MenuItem
            href={`${repository}/blob/main/src/components/ui/${slug}.tsx`}
            target="_blank"
            rel="noreferrer"
            textValue="View source"
          >
            <span className="text-muted-foreground">
              <GitHubMark />
            </span>
            View source
            <ArrowUpRightIcon
              size={14}
              aria-hidden="true"
              className="ms-auto text-muted-foreground"
            />
          </MenuItem>
          <MenuSeparator />
          {assistants.map((assistant) => (
            <MenuItem
              key={assistant.label}
              href={assistant.url(prompt)}
              target="_blank"
              rel="noreferrer"
              textValue={`Open in ${assistant.label}`}
            >
              <span className="text-muted-foreground [&_svg]:size-4">
                {assistant.icon}
              </span>
              Open in {assistant.label}
              <ArrowUpRightIcon
                size={14}
                aria-hidden="true"
                className="ms-auto text-muted-foreground"
              />
            </MenuItem>
          ))}
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}

function CheckChip({
  label,
  icon,
  count,
  tone,
  title,
  description,
  children,
}: {
  label: string;
  icon: ReactNode;
  count: number;
  tone: keyof typeof toneClass;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <PopoverTrigger>
      <TooltipTrigger>
        <Button variant="ghost" static className={chipClass}>
          {icon}
          <span>{label}</span>
          <span
            aria-hidden="true"
            className={cn("size-1.5 rounded-full", toneClass[tone])}
          />
          <span className="tabular-nums">{issueCount(count)}</span>
        </Button>
        <Tooltip>Checked with {label}</Tooltip>
      </TooltipTrigger>
      <Popover placement="bottom start" className="w-88">
        <PopoverDialog>
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
          {children}
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}

const visibleFindings = 5;

function FindingList({
  items,
}: {
  items: {
    key: string;
    title: string;
    meta: string;
    tone: keyof typeof toneClass;
  }[];
}) {
  if (!items.length) return null;
  const hidden = items.length - visibleFindings;
  return (
    <ul className="mt-3 grid gap-2 border-t border-border/70 pt-3 text-sm">
      {items.slice(0, visibleFindings).map((item) => (
        <li key={item.key} className="flex min-w-0 items-baseline gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 shrink-0 -translate-y-0.5 rounded-full",
              toneClass[item.tone],
            )}
          />
          <span className="min-w-0 flex-1 leading-5">{item.title}</span>
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {item.meta}
          </span>
        </li>
      ))}
      {hidden > 0 && (
        <li className="ps-3.5 text-xs text-muted-foreground">
          And {hidden} more.
        </li>
      )}
    </ul>
  );
}

function AxeChip({ findings }: { findings: AxeFinding[] }) {
  return (
    <CheckChip
      label="Axe"
      icon={<AxeMark size={14} />}
      count={findings.length}
      tone={findings.length ? "error" : "success"}
      title="Accessibility"
      description={
        findings.length
          ? `Axe finds ${issueCount(findings.length)} of serious or critical impact on this page.`
          : "Axe finds no serious or critical issues on this page in light and dark mode."
      }
    >
      <FindingList
        items={findings.map((finding) => ({
          key: finding.id,
          title: finding.help,
          meta:
            finding.modes.length > 1
              ? "Light and dark"
              : finding.modes[0] === "dark"
                ? "Dark"
                : "Light",
          tone: "error",
        }))}
      />
      <div className="mt-4 border-t border-border/70 pt-4">
        <ButtonLink
          href={`${repository}/blob/main/scripts/axe-a11y.mjs`}
          target="_blank"
          rel="noreferrer"
          variant="outline"
          size="xs"
        >
          View the check
          <ArrowSquareOutIcon data-icon="inline-end" aria-hidden="true" />
        </ButtonLink>
      </div>
    </CheckChip>
  );
}

function DoctorChip({
  findings,
  file,
}: {
  findings: DoctorFinding[];
  file: string;
}) {
  const [copied, setCopied] = useState(false);
  const hasErrors = findings.some((finding) => finding.severity === "error");
  return (
    <CheckChip
      label="React Doctor"
      icon={<ReactDoctorMark size={14} />}
      count={findings.length}
      tone={hasErrors ? "error" : findings.length ? "warning" : "success"}
      title="React Doctor"
      description={
        findings.length
          ? `React Doctor finds ${issueCount(findings.length)} in ${file}.`
          : `React Doctor finds no issues in ${file}.`
      }
    >
      <FindingList
        items={findings.map((finding) => ({
          key: `${finding.rule}-${finding.line}`,
          title: finding.title,
          meta: `Line ${finding.line}`,
          tone: finding.severity === "error" ? "error" : "warning",
        }))}
      />
      <div className="mt-4 border-t border-border/70 pt-4">
        <p className="text-sm text-muted-foreground">Check your copy:</p>
        <div className="mt-2 flex items-center gap-1">
          <InlineCode className="min-w-0 truncate">{doctorCommand}</InlineCode>
          <Button
            variant="minimal"
            size="xs"
            iconOnly
            aria-label={copied ? "Copied" : "Copy command"}
            onPress={async () => {
              try {
                await navigator.clipboard.writeText(doctorCommand);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              } catch {}
            }}
          >
            {copied ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
    </CheckChip>
  );
}
