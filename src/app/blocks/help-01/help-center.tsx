"use client";

import {
  AirplaneTiltIcon,
  ArrowLeftIcon,
  CaretRightIcon,
  ChatsCircleIcon,
  CreditCardIcon,
  HeartbeatIcon,
  LeafIcon,
  MagnifyingGlassIcon,
  MoneyIcon,
  PhoneIcon,
  ReceiptIcon,
  RocketLaunchIcon,
} from "@phosphor-icons/react";
import { type ReactNode, useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/search-field";
import { ArticleSheet } from "./article-sheet";
import { ContactDialog } from "./contact-dialog";
import { type Article, articles, faqs, type TopicId, topics } from "./data";

const topicIcons: Record<TopicId, typeof MoneyIcon> = {
  start: RocketLaunchIcon,
  payroll: MoneyIcon,
  "time-off": AirplaneTiltIcon,
  taxes: ReceiptIcon,
  benefits: HeartbeatIcon,
  account: CreditCardIcon,
};

const popularSearches = ["Run payroll", "W-2", "Time off"];

const rowStyles =
  "group/row flex w-full items-center gap-4 px-4 py-3.5 text-start outline-offset-[-2px] outline-transparent transition-colors duration-150 ease-out-quint hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring sm:px-5";

function escapePattern(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, query }: { text: string; query: string }) {
  const words = query.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return text;
  const pattern = new RegExp(`(${words.map(escapePattern).join("|")})`, "gi");
  return text.split(pattern).map((part, index) =>
    index % 2 ? (
      <mark
        // biome-ignore lint/suspicious/noArrayIndexKey: parts of one string keep their order.
        key={index}
        className="rounded-xs bg-warning-subtle px-0.5 text-foreground"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function matches(article: Article, query: string) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const text = [
    article.title,
    article.summary,
    ...(article.steps ?? []),
    ...article.body,
  ]
    .join(" ")
    .toLowerCase();
  return words.every((word) => text.includes(word));
}

function ArticleList({
  items,
  query = "",
  showTopic = false,
  onOpen,
}: {
  items: Article[];
  query?: string;
  showTopic?: boolean;
  onOpen: (article: Article) => void;
}) {
  return (
    <ul className="divide-y divide-border/70 overflow-hidden rounded-xl bg-card shadow-(--shadow-card) ring-1 ring-border/70">
      {items.map((article) => (
        <li key={article.id}>
          <AriaButton onPress={() => onOpen(article)} className={rowStyles}>
            <span className="grid min-w-0 flex-1 gap-0.5">
              <span className="text-sm font-medium">
                <Highlight text={article.title} query={query} />
              </span>
              <span className="text-sm text-muted-foreground">
                <Highlight text={article.summary} query={query} />
              </span>
              {showTopic ? (
                <span className="mt-1 text-xs text-muted-foreground">
                  {topics.find((topic) => topic.id === article.topic)?.name}
                </span>
              ) : null}
            </span>
            <CaretRightIcon
              size={16}
              aria-hidden="true"
              className="shrink-0 text-muted-foreground transition-transform duration-150 ease-out-quint group-hover/row:translate-x-0.5 rtl:rotate-180"
            />
          </AriaButton>
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="grid content-start gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-[-0.02em]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function HelpCenter() {
  const [query, setQuery] = useState("");
  const [topicId, setTopicId] = useState<TopicId | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const searching = query.trim().length > 0;
  const results = searching
    ? articles.filter((item) => matches(item, query))
    : [];
  const topic = topics.find((item) => item.id === topicId) ?? null;

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-md bg-foreground text-background"
            >
              <LeafIcon size={16} weight="fill" />
            </span>
            Fernway
            <span className="font-normal text-muted-foreground">Help</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onPress={() => setContactOpen(true)}
          >
            Contact support
          </Button>
        </div>
      </header>

      <div className="border-b border-border/70 bg-muted/40">
        <div className="mx-auto grid w-full max-w-2xl gap-5 px-4 py-12 text-center sm:px-6 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl">
            How can we help?
          </h1>
          <SearchField
            aria-label="Search help articles"
            placeholder="Search for articles"
            size="lg"
            value={query}
            onChange={(value) => {
              setQuery(value);
              setTopicId(null);
            }}
            className="text-start"
          />
          <p aria-live="polite" className="sr-only">
            {searching
              ? `${results.length} ${results.length === 1 ? "article" : "articles"} found`
              : ""}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm text-muted-foreground">
            Popular:
            {popularSearches.map((term) => (
              <Button
                key={term}
                variant="minimal"
                size="sm"
                onPress={() => setQuery(term)}
              >
                {term}
              </Button>
            ))}
          </p>
        </div>
      </div>

      <main className="mx-auto grid w-full max-w-5xl gap-12 px-4 py-12 sm:px-6">
        {searching ? (
          <Section
            title={`${results.length} ${results.length === 1 ? "result" : "results"}`}
          >
            {results.length ? (
              <ArticleList
                items={results}
                query={query}
                showTopic
                onOpen={setArticle}
              />
            ) : (
              <EmptyState>
                <EmptyStateIcon>
                  <MagnifyingGlassIcon />
                </EmptyStateIcon>
                <EmptyStateTitle>
                  No articles match “{query.trim()}”
                </EmptyStateTitle>
                <EmptyStateDescription>
                  Try a different word, or ask our team.
                </EmptyStateDescription>
                <EmptyStateActions>
                  <Button variant="outline" onPress={() => setQuery("")}>
                    Browse topics
                  </Button>
                  <Button onPress={() => setContactOpen(true)}>
                    Contact support
                  </Button>
                </EmptyStateActions>
              </EmptyState>
            )}
          </Section>
        ) : topic ? (
          <Section
            title={topic.name}
            action={
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setTopicId(null)}
              >
                <ArrowLeftIcon
                  data-icon="inline-start"
                  size={16}
                  aria-hidden="true"
                  className="rtl:rotate-180"
                />
                All topics
              </Button>
            }
          >
            <ArticleList
              items={articles.filter((item) => item.topic === topic.id)}
              onOpen={setArticle}
            />
          </Section>
        ) : (
          <>
            <Section title="Browse by topic">
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((item) => {
                  const Icon = topicIcons[item.id];
                  const count = articles.filter(
                    (entry) => entry.topic === item.id,
                  ).length;
                  return (
                    <li key={item.id} className="grid">
                      <AriaButton
                        onPress={() => setTopicId(item.id)}
                        className="flex items-start gap-4 rounded-xl bg-card p-4 text-start sm:grid sm:content-start sm:gap-3 sm:p-5 shadow-(--shadow-card) ring-1 ring-border/70 outline-offset-2 outline-transparent transition-[background-color,box-shadow] duration-150 ease-out-quint hover:bg-muted/50 hover:ring-border focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
                      >
                        <span
                          aria-hidden="true"
                          className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground/80 ring-1 ring-border/70"
                        >
                          <Icon size={18} />
                        </span>
                        <span className="grid gap-1">
                          <span className="text-sm font-semibold">
                            {item.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {item.description}
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground max-sm:hidden">
                          {count} articles
                        </span>
                      </AriaButton>
                    </li>
                  );
                })}
              </ul>
            </Section>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              <Section title="Popular articles">
                <ArticleList
                  items={articles.filter((item) => item.popular)}
                  onOpen={setArticle}
                />
              </Section>
              <Section title="Common questions">
                <Accordion variant="card" className="min-w-0">
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      id={faq.id}
                      title={faq.question}
                    >
                      {faq.answer}
                    </AccordionItem>
                  ))}
                </Accordion>
              </Section>
            </div>
          </>
        )}

        <section
          aria-labelledby="contact-title"
          className="grid gap-6 rounded-2xl bg-muted/50 p-6 ring-1 ring-border/70 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
        >
          <div className="grid gap-1.5">
            <h2
              id="contact-title"
              className="text-lg font-semibold tracking-[-0.02em]"
            >
              Still need help?
            </h2>
            <p className="text-sm text-muted-foreground">
              Our team answers every day from 8:00 AM to 8:00 PM ET.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ButtonLink variant="outline" href="tel:+18005550199">
              <PhoneIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              (800) 555-0199
            </ButtonLink>
            <Button onPress={() => setContactOpen(true)}>
              <ChatsCircleIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              Send a message
            </Button>
          </div>
        </section>
      </main>

      <ArticleSheet
        article={article}
        onOpenChange={(open) => {
          if (!open) setArticle(null);
        }}
        onOpenArticle={setArticle}
      />
      <ContactDialog
        isOpen={contactOpen}
        onOpenChange={setContactOpen}
        topic={article?.topic ?? topicId}
      />
    </div>
  );
}
