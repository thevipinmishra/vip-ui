import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { type ReactNode, Suspense } from "react";
import {
  ArrowRight,
  BranchUp,
  ChartBar,
  FolderOpen,
  Image,
  MessageCircle,
} from "reicon-react";
import { CodeSnippet } from "@/components/docs/code-snippet";
import { CopyButton } from "@/components/docs/copy-button";
import { ExampleFileAssetRecipe } from "@/components/docs/example-file-asset-recipe";
import { ExampleProjectStatusRecipe } from "@/components/docs/example-project-status-recipe";
import { PreviewCode } from "@/components/docs/preview-code";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { AgentStatus } from "@/components/ui/agent-status";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { registryUrl } from "@/lib/registry-docs";
import { customerById, invoices, money, monthlyRevenue } from "./business/data";
import { initialConversations } from "./chat/data";
import { repository } from "./repository/config";
import { getPulls } from "./repository/data";

export const metadata: Metadata = {
  title: "Examples | vip/ui",
  description:
    "Explore composed vip/ui workspaces and copyable patterns for repository operations, billing, chat, agents, and asset management.",
};

async function readRecipeSource(filename: string) {
  return (
    await readFile(
      path.join(process.cwd(), "src/components/docs", filename),
      "utf8",
    )
  )
    .replaceAll("@/components/ui/", "@/components/vip-ui/")
    .trim();
}

async function OpenPullRequests() {
  await connection();
  const pulls = await getPulls("open", 1).catch(() => null);

  return pulls?.data.length ? (
    <ul className="divide-y divide-border/70">
      {pulls.data.slice(0, 2).map((pull) => (
        <li key={pull.id} className="py-3 first:pt-0 last:pb-0">
          <p className="line-clamp-2 text-sm font-medium leading-5">
            {pull.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            #{pull.number} · {pull.user?.login ?? "Unknown"}
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="border-t border-border/70 pt-4 text-sm text-muted-foreground">
      {pulls
        ? "No open pull requests."
        : "GitHub activity is unavailable right now."}
    </p>
  );
}

function WorkspaceCard({
  title,
  description,
  href,
  installUrl,
  preview,
  background = "bg-muted/50",
}: {
  title: string;
  description: string;
  href: string;
  installUrl: string | null;
  preview: ReactNode;
  background?: string;
}) {
  const command = installUrl ? `npx shadcn@latest add ${installUrl}` : null;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
      <div
        className={`flex min-h-72 min-w-0 items-center justify-center overflow-hidden p-4 sm:p-7 ${background}`}
      >
        {preview}
      </div>
      <div className="flex flex-1 flex-col border-t border-border/70 px-5 py-5 sm:px-6">
        <h3 className="text-xl font-semibold tracking-[-0.04em]">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <div className="mt-5">
          <ButtonLink as={Link} href={href} variant="outline" size="sm">
            Open workspace <ArrowRight size={16} aria-hidden="true" />
            <span className="sr-only">: {title}</span>
          </ButtonLink>
        </div>
      </div>
      {command && (
        <div className="flex min-w-0 items-center gap-3 border-t border-border/70 bg-muted/20 px-5 py-3 sm:px-6">
          <code
            className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground"
            title={command}
          >
            {command}
          </code>
          <CopyButton
            code={command}
            label={`Copy ${title} install command`}
            text="Copy command"
          />
        </div>
      )}
    </article>
  );
}

function RepositoryPreview() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl bg-card shadow-[var(--shadow-float)] ring-1 ring-border/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
        <span className="min-w-0 truncate text-sm font-semibold">
          {repository.owner} / {repository.name}
        </span>
        <Badge variant="success" dot>
          Public
        </Badge>
      </div>
      <div className="p-5 sm:p-6">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <BranchUp size={17} className="text-primary" aria-hidden="true" />
          Pull requests awaiting review
        </p>
        <div className="mt-4">
          <Suspense
            fallback={
              <p className="border-t border-border/70 pt-4 text-sm text-muted-foreground">
                Loading GitHub activity…
              </p>
            }
          >
            <OpenPullRequests />
          </Suspense>
        </div>
        <p className="mt-4 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          Issues · Commits · Releases · Contributors
        </p>
      </div>
    </div>
  );
}

function BillingPreview() {
  const overdue = invoices.filter((invoice) => invoice.status === "overdue");

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl bg-card shadow-[var(--shadow-float)] ring-1 ring-border/70">
      <div className="flex items-center gap-2 border-b border-border/70 px-5 py-4 text-sm font-semibold">
        <ChartBar size={17} className="text-primary" aria-hidden="true" />
        Acme Cloud / Billing
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-xs text-muted-foreground">
          Monthly recurring revenue
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] tabular-nums">
          {money(monthlyRevenue)}
        </p>
        <div className="mt-5 border-t border-border/70 pt-4">
          <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold">
            <span>Needs attention</span>
            <Badge variant="warning">{overdue.length} overdue</Badge>
          </div>
          <ul className="divide-y divide-border/70">
            {overdue.slice(0, 2).map((invoice) => (
              <li
                key={invoice.id}
                className="flex items-center justify-between gap-3 py-2.5 text-xs"
              >
                <span className="min-w-0 truncate">
                  {customerById(invoice.customerId)?.name}
                </span>
                <span className="shrink-0 font-medium tabular-nums">
                  {money(invoice.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ChatPreview() {
  const conversation = initialConversations[1];

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl bg-card shadow-[var(--shadow-float)] ring-1 ring-border/70">
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3 text-sm font-semibold">
        <MessageCircle size={17} className="text-primary" aria-hidden="true" />
        {conversation.title}
      </div>
      <div className="grid gap-3 p-4 text-xs leading-5">
        <p className="ml-8 line-clamp-2 rounded-xl bg-primary px-3 py-2.5 text-primary-foreground">
          {conversation.messages[0].text}
        </p>
        <p className="mr-8 line-clamp-3 rounded-xl bg-muted px-3 py-2.5">
          {conversation.messages[1].text}
        </p>
        <div className="rounded-lg border border-border/70 px-3 py-2 text-muted-foreground">
          Write a reply…
        </div>
      </div>
    </div>
  );
}

function AgentPreview() {
  return (
    <div className="w-full max-w-sm rounded-xl bg-card p-4 shadow-[var(--shadow-float)] ring-1 ring-border/70 sm:p-5">
      <p className="mb-4 text-sm font-semibold">Assistant response</p>
      <AgentStatus
        state="complete"
        label="Answer ready"
        detail="Tool details and sources available"
      />
      <div className="mt-3 grid gap-2 text-xs">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border/70 px-3 py-2.5">
          <code>search_docs</code>
          <span className="text-success">Done</span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border/70 px-3 py-2.5">
          <code>read_guide</code>
          <span className="text-success">Done</span>
        </div>
      </div>
    </div>
  );
}

function StudioPreview() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl bg-card shadow-[var(--shadow-float)] ring-1 ring-border/70">
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3 text-sm font-semibold">
        <FolderOpen size={17} className="text-primary" aria-hidden="true" />
        Campaign assets
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] text-xs">
        <div className="min-w-0 border-r border-border/70 bg-muted/30 px-3 py-4">
          <p className="font-medium">Campaign</p>
          <p className="mt-3 flex items-center gap-1.5 truncate rounded-md bg-accent px-2 py-2 font-medium text-accent-foreground">
            <Image size={14} aria-hidden="true" /> Cover.png
          </p>
          <p className="mt-2 truncate px-2 text-muted-foreground">Brief.pdf</p>
        </div>
        <div className="min-w-0 px-4 py-4">
          <p className="font-medium">Cover.png</p>
          <div className="mt-3 aspect-[4/3] rounded-md bg-primary/15 ring-1 ring-primary/15" />
          <p className="mt-3 text-muted-foreground">Campaign · Launch</p>
        </div>
      </div>
    </div>
  );
}

export default async function ExamplesPage() {
  const [projectStatusSource, fileAssetSource] = await Promise.all([
    readRecipeSource("example-project-status-recipe.tsx"),
    readRecipeSource("example-file-asset-recipe.tsx"),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main
        id="main"
        className="mx-auto w-full max-w-7xl flex-1 px-5 pb-24 pt-14 sm:px-8 sm:pt-20"
      >
        <h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.065em]">
          Examples
        </h1>

        <section aria-labelledby="workspaces-title" className="mt-14">
          <h2
            id="workspaces-title"
            className="text-2xl font-semibold tracking-[-0.04em]"
          >
            Workspaces
          </h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <WorkspaceCard
              title="Repository desk"
              description="Review live public GitHub activity across pull requests, issues, commits, releases, and contributors. Request errors are shown instead of sample data."
              href="/examples/repository"
              installUrl={registryUrl("example-repository")}
              preview={<RepositoryPreview />}
            />
            <WorkspaceCard
              title="Billing operations"
              description="Explore subscriptions, invoices, customers, and reports against a single fictional ledger. Payment actions do not charge anyone."
              href="/examples/business"
              installUrl={registryUrl("example-business")}
              preview={<BillingPreview />}
              background="bg-accent/40"
            />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <WorkspaceCard
              title="Chat workspace"
              description="Browse and search conversations, then compose replies. Messages use local storage and scripted responses, not an AI service."
              href="/examples/chat"
              installUrl={registryUrl("example-chat")}
              preview={<ChatPreview />}
              background="bg-primary/5"
            />
            <WorkspaceCard
              title="Agent response"
              description="Replay a scripted agent run, inspect tool calls, and follow sources beside the answer. No AI service is involved."
              href="/examples/agent"
              installUrl={registryUrl("example-agent")}
              preview={<AgentPreview />}
              background="bg-muted/60"
            />
            <WorkspaceCard
              title="Asset studio"
              description="Browse a campaign tree, add local files, edit tags and color, or find an action with the command palette. Nothing is uploaded."
              href="/examples/studio"
              installUrl={registryUrl("example-studio")}
              preview={<StudioPreview />}
              background="bg-accent/30"
            />
          </div>
          <p className="mt-7 text-sm leading-6 text-muted-foreground">
            Before installing a workspace, complete the{" "}
            <Link
              href="/components/installation"
              className="font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              one-time theme setup
            </Link>{" "}
            in a shadcn-initialized Next.js app. Install commands add routes and
            their components; check destination paths before running them.
          </p>
        </section>

        <section
          aria-labelledby="compositions-title"
          className="mt-20 border-t border-border/70 pt-12"
        >
          <h2
            id="compositions-title"
            className="text-2xl font-semibold tracking-[-0.04em]"
          >
            Compositions
          </h2>
          <div className="mt-7 grid gap-10 lg:grid-cols-2">
            <article className="min-w-0">
              <h3 className="mb-5 text-xl font-semibold tracking-[-0.035em]">
                Retry a failed payment
              </h3>
              <PreviewCode
                code={projectStatusSource}
                filename="example-project-status-recipe.tsx"
                preview={<ExampleProjectStatusRecipe />}
                source={<CodeSnippet code={projectStatusSource} />}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Fictional ledger. The retry changes this card only.
                </p>
                <ButtonLink
                  as={Link}
                  href="/examples/business"
                  variant="ghost"
                  size="sm"
                >
                  Open billing <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
              </div>
            </article>
            <article className="min-w-0">
              <h3 className="mb-5 text-xl font-semibold tracking-[-0.035em]">
                Classify a local asset
              </h3>
              <PreviewCode
                code={fileAssetSource}
                filename="example-file-asset-recipe.tsx"
                preview={<ExampleFileAssetRecipe />}
                source={<CodeSnippet code={fileAssetSource} />}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Files stay in this browser tab. Nothing is uploaded.
                </p>
                <ButtonLink
                  as={Link}
                  href="/examples/studio"
                  variant="ghost"
                  size="sm"
                >
                  Open studio <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
              </div>
            </article>
          </div>
          <p className="mt-8 text-sm leading-6 text-muted-foreground">
            Copying a composition requires its imported vip/ui components. The
            payment source also imports the fictional ledger from Billing
            operations, which the billing workspace install includes.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
