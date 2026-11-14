"use client";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  CompassIcon,
  CreditCardIcon,
  DatabaseIcon,
  FileTextIcon,
  HouseIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  SignInIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/search-field";
import { TextScramble } from "@/components/ui/text-scramble";
import { showToast } from "@/components/ui/toast";
import { formatArticleDate, type HelpArticle, helpArticles } from "./articles";

const popularSearches = ["SSO", "Import data", "API tokens", "Billing"];

const popularArticles = [
  helpArticles.find((article) => article.id === "saml-single-sign-on"),
  helpArticles.find((article) => article.id === "import-feedback"),
  helpArticles.find((article) => article.id === "api-tokens"),
].filter((article): article is HelpArticle => article !== undefined);

const destinations = [
  { href: "/", title: "Vela home", icon: HouseIcon },
  {
    href: "/blocks/contact-01",
    title: "Contact sales",
    icon: EnvelopeIcon,
  },
  {
    href: "/blocks/login-01",
    title: "Sign in",
    icon: SignInIcon,
  },
];

function EnvelopeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      width={size}
      height={size}
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CategoryIcon({
  category,
  size = 18,
}: {
  category: string;
  size?: number;
}) {
  if (category === "Security") {
    return <ShieldCheckIcon size={size} aria-hidden="true" />;
  }
  if (category === "Getting started") {
    return <CompassIcon size={size} aria-hidden="true" />;
  }
  if (category === "Developers") {
    return <KeyIcon size={size} aria-hidden="true" />;
  }
  if (category === "Billing") {
    return <CreditCardIcon size={size} aria-hidden="true" />;
  }
  if (category === "Workspace") {
    return <UsersThreeIcon size={size} aria-hidden="true" />;
  }
  if (category === "Data") {
    return <DatabaseIcon size={size} aria-hidden="true" />;
  }
  return <FileTextIcon size={size} aria-hidden="true" />;
}

function matchesQuery(article: HelpArticle, query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return false;
  const words =
    `${article.title} ${article.category} ${article.summary} ${article.keywords}`
      .toLowerCase()
      .split(/[^a-z0-9]+/);
  return terms.every((term) => words.some((word) => word.startsWith(term)));
}

function VelaLogo() {
  return (
    <a
      href="/"
      aria-label="Vela home"
      className="inline-flex w-fit items-center gap-2 rounded-md outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-(--shadow-card)"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="size-4.5"
        >
          <path
            d="M5.5 5.5 12 19l6.5-13.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-base font-semibold tracking-[-0.04em]">Vela</span>
    </a>
  );
}

export function NotFoundPage() {
  const [query, setQuery] = useState("");
  const [article, setArticle] = useState<HelpArticle | null>(null);
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);
  const searchRef = useRef<HTMLFormElement>(null);

  const trimmedQuery = query.trim();
  const matches = trimmedQuery
    ? helpArticles.filter((item) => matchesQuery(item, trimmedQuery))
    : [];
  const status = trimmedQuery
    ? matches.length === 1
      ? "1 MATCH"
      : `${matches.length} MATCHES`
    : "PAGE NOT FOUND";

  function focusSearch() {
    searchRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }

  function openArticle(next: HelpArticle) {
    setFeedback(null);
    setArticle(next);
  }

  function sendFeedback(value: "yes" | "no") {
    setFeedback(value);
    showToast({
      title: "Thanks for the feedback",
      description:
        value === "yes"
          ? "We are glad the article helped."
          : "We will review this article.",
      variant: value === "yes" ? "success" : "info",
    });
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <VelaLogo />
          <nav aria-label="Site" className="flex items-center gap-3 sm:gap-5">
            <a
              href="/blocks/login-01"
              className="rounded-sm text-sm font-medium text-muted-foreground underline-offset-4 outline-offset-4 outline-transparent transition-colors duration-150 ease-out-quint hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
            >
              Sign in
            </a>
            <ButtonLink href="/blocks/contact-01" variant="outline" size="sm">
              Contact sales
            </ButtonLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pt-10 pb-16 md:px-8 md:pt-14 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div className="min-w-0">
            <div className="flex items-end gap-5">
              <span className="font-mono text-[clamp(5rem,10vw,7.5rem)] leading-[0.72] font-medium tracking-[-0.09em]">
                404
              </span>
              <div className="min-w-0 pb-1">
                <TextScramble
                  value={status}
                  duration={0.45}
                  className="block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-sm"
                />
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase">
                  Vela help center
                </p>
              </div>
            </div>

            <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tighter sm:text-4xl">
              We cannot find that page.
            </h1>
            <p className="mt-3 max-w-lg text-base leading-7 text-muted-foreground">
              The address may be wrong, or the page moved. Search the help
              center, or use a link below.
            </p>

            <search
              aria-label="Search the help center"
              className="mt-7 block max-w-xl"
            >
              <form
                ref={searchRef}
                onSubmit={(event) => {
                  event.preventDefault();
                  if (matches[0]) openArticle(matches[0]);
                }}
              >
                <SearchField
                  size="lg"
                  label="Search the help center"
                  placeholder="Try “SSO” or “import”"
                  value={query}
                  onChange={setQuery}
                  description="Search 8 articles about Vela."
                />
              </form>
            </search>

            {!trimmedQuery && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Popular searches
                </span>
                {popularSearches.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="xs"
                    className="rounded-full"
                    onPress={() => {
                      setQuery(term);
                      focusSearch();
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            )}

            <p aria-live="polite" className="sr-only">
              {trimmedQuery
                ? matches.length === 1
                  ? "1 article found."
                  : `${matches.length} articles found.`
                : ""}
            </p>

            {trimmedQuery && (
              <div className="mt-6 max-w-xl overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-4 py-3">
                  <p className="text-sm font-medium">
                    {matches.length === 1
                      ? `1 result for “${trimmedQuery}”`
                      : `${matches.length} results for “${trimmedQuery}”`}
                  </p>
                  {matches.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Enter opens the first result
                    </p>
                  )}
                </div>
                {matches.length > 0 ? (
                  <ul className="divide-y divide-border/70">
                    {matches.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`/help/${item.id}`}
                          aria-haspopup="dialog"
                          className="flex min-h-14 items-start gap-3 px-4 py-3 text-foreground outline-offset-0 transition-colors duration-150 ease-out-quint hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-2 focus-visible:outline-ring"
                          onClick={(event) => {
                            event.preventDefault();
                            openArticle(item);
                          }}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground"
                          >
                            <CategoryIcon category={item.category} size={16} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {item.category} · {item.minutes} min read
                            </span>
                          </span>
                          <ArrowUpRightIcon
                            size={15}
                            aria-hidden="true"
                            className="mt-1 shrink-0 text-muted-foreground"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3">
                    <EmptyState className="border-0 py-6">
                      <EmptyStateIcon>
                        <MagnifyingGlassIcon />
                      </EmptyStateIcon>
                      <EmptyStateTitle>
                        No articles match “{trimmedQuery}”.
                      </EmptyStateTitle>
                      <EmptyStateDescription>
                        Try a shorter term. Or send the address to our support
                        team.
                      </EmptyStateDescription>
                      <EmptyStateActions>
                        <Button
                          variant="outline"
                          size="sm"
                          onPress={() => {
                            setQuery("");
                            focusSearch();
                          }}
                        >
                          Clear search
                        </Button>
                        <ButtonLink
                          href="mailto:support@vela.app"
                          variant="ghost"
                          size="sm"
                        >
                          Email support
                        </ButtonLink>
                      </EmptyStateActions>
                    </EmptyState>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <Card className="overflow-hidden">
              <div className="border-b border-border/70 px-4 py-3">
                <h2 className="text-sm font-semibold">Where to go next</h2>
              </div>
              <ul className="divide-y divide-border/70">
                {destinations.map((destination) => {
                  const Icon = destination.icon;
                  return (
                    <li key={destination.href}>
                      <a
                        href={destination.href}
                        className="group flex items-center gap-3 px-4 py-2.5 outline-offset-0 transition-colors duration-150 ease-out-quint outline-transparent hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-2 focus-visible:outline-ring motion-reduce:outline-offset-0"
                      >
                        <span
                          aria-hidden="true"
                          className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground"
                        >
                          <Icon size={16} />
                        </span>
                        <span className="min-w-0 flex-1 text-sm font-medium">
                          {destination.title}
                        </span>
                        <ArrowRightIcon
                          size={15}
                          aria-hidden="true"
                          className="shrink-0 text-muted-foreground transition-transform duration-150 ease-out-quint group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
              <ShieldCheckIcon
                size={15}
                aria-hidden="true"
                className="mt-0.5 shrink-0"
              />
              Vela will never ask for your password in an email.
            </p>
          </div>
        </div>

        <section className="mt-12" aria-labelledby="popular-articles-title">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              id="popular-articles-title"
              className="text-xl font-semibold tracking-[-0.035em]"
            >
              Popular articles
            </h2>
            <Button variant="minimal" size="sm" onPress={focusSearch}>
              Search all articles
              <ArrowRightIcon size={14} aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {popularArticles.map((item) => (
              <Card
                key={item.id}
                className="flex min-w-0 flex-col p-4 transition-[translate] duration-200 ease-out-quint motion-safe:hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-lg bg-secondary text-secondary-foreground"
                  >
                    <CategoryIcon category={item.category} size={16} />
                  </span>
                  <ArrowUpRightIcon
                    size={15}
                    aria-hidden="true"
                    className="text-muted-foreground"
                  />
                </div>
                <h3 className="mt-3 text-balance text-sm font-semibold">
                  {item.title}
                </h3>
                <p className="mt-1 flex-1 text-xs leading-5 text-muted-foreground">
                  {item.summary}
                </p>
                <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {item.category} · {item.minutes} min
                </p>
                <a
                  href={`/help/${item.id}`}
                  aria-haspopup="dialog"
                  className="absolute inset-0 rounded-xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  onClick={(event) => {
                    event.preventDefault();
                    openArticle(item);
                  }}
                >
                  <span className="sr-only">Open article: {item.title}</span>
                </a>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© 2026 Vela Labs, Inc. San Francisco</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-success"
              />
              All systems operational
            </span>
            <a
              href="mailto:support@vela.app"
              className="rounded-sm underline-offset-4 outline-offset-4 outline-transparent transition-colors duration-150 ease-out-quint hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
            >
              support@vela.app
            </a>
          </div>
        </div>
      </footer>

      <DialogContent
        size="lg"
        overlayProps={{
          isOpen: article !== null,
          onOpenChange: (open) => {
            if (!open) setArticle(null);
          },
        }}
      >
        {article && (
          <>
            <DialogHeader>
              <DialogTitle>{article.title}</DialogTitle>
              <DialogDescription>
                {article.category} · Updated{" "}
                {formatArticleDate(article.updated)} · {article.minutes} min
                read
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
            <DialogBody>
              <p className="text-sm leading-6 text-foreground">
                {article.summary}
              </p>
              {article.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-6 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              <h3 className="mt-5 text-sm font-semibold">Steps</h3>
              <ol className="mt-3 grid gap-3">
                {article.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-secondary font-mono text-[10px] font-semibold text-secondary-foreground"
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0">{step}</span>
                  </li>
                ))}
              </ol>
            </DialogBody>
            <DialogFooter className="flex-row flex-wrap items-center justify-between">
              {feedback ? (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircleIcon aria-hidden="true" size={16} />
                  Thanks. We read all feedback.
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Was this helpful?
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    iconOnly
                    aria-label="Yes, this article helped"
                    onPress={() => sendFeedback("yes")}
                  >
                    <ThumbsUpIcon size={16} aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconOnly
                    aria-label="No, this article did not help"
                    onPress={() => sendFeedback("no")}
                  >
                    <ThumbsDownIcon size={16} aria-hidden="true" />
                  </Button>
                </div>
              )}
              <DialogClose variant="outline">Close</DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </div>
  );
}
