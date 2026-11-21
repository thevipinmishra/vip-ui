"use client";

import {
  CaretRightIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TextArea } from "@/components/ui/text-area";
import { type Article, articles, formatDay, topics } from "./data";

type Feedback = "idle" | "yes" | "no" | "sent";

function ArticleFeedback() {
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [missing, setMissing] = useState("");

  if (feedback === "yes" || feedback === "sent") {
    return (
      <p role="status" className="text-sm text-muted-foreground">
        {feedback === "yes"
          ? "Thanks. We are glad it helped."
          : "Thanks. We use your feedback to make this article better."}
      </p>
    );
  }

  if (feedback === "no") {
    return (
      <Form
        className="grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setFeedback("sent");
        }}
      >
        <TextArea
          label="What was missing?"
          rows={3}
          autoFocus
          value={missing}
          onChange={setMissing}
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onPress={() => setFeedback("idle")}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isDisabled={!missing.trim()}>
            Send feedback
          </Button>
        </div>
      </Form>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-medium">Did this article help?</p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onPress={() => setFeedback("yes")}>
          <ThumbsUpIcon data-icon="inline-start" size={16} aria-hidden="true" />
          Yes
        </Button>
        <Button variant="outline" size="sm" onPress={() => setFeedback("no")}>
          <ThumbsDownIcon
            data-icon="inline-start"
            size={16}
            aria-hidden="true"
          />
          No
        </Button>
      </div>
    </div>
  );
}

export function ArticleSheet({
  article,
  onOpenChange,
  onOpenArticle,
}: {
  article: Article | null;
  onOpenChange: (open: boolean) => void;
  onOpenArticle: (article: Article) => void;
}) {
  const last = useRef<Article | null>(null);
  if (article) last.current = article;
  const shown = article ?? last.current;
  const topic = topics.find((item) => item.id === shown?.topic);

  return (
    <Sheet
      position="right"
      size="md"
      isOpen={article !== null}
      onOpenChange={onOpenChange}
    >
      {shown && (
        <>
          <SheetHeader>
            <SheetTitle>{shown.title}</SheetTitle>
            <SheetDescription>
              {topic?.name} · Updated {formatDay(shown.updated)}
            </SheetDescription>
            <SheetClose />
          </SheetHeader>
          <SheetBody className="grid content-start gap-8 pb-6">
            <div key={shown.id} className="typography text-sm">
              <p className="text-muted-foreground">{shown.summary}</p>
              {shown.steps?.length ? (
                <ol>
                  {shown.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              ) : null}
              {shown.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="border-y border-border/70 py-4">
              <ArticleFeedback key={shown.id} />
            </div>
            <RelatedArticles article={shown} onOpenArticle={onOpenArticle} />
          </SheetBody>
        </>
      )}
    </Sheet>
  );
}

function RelatedArticles({
  article,
  onOpenArticle,
}: {
  article: Article;
  onOpenArticle: (article: Article) => void;
}) {
  const related = articles
    .filter((item) => item.topic === article.topic && item.id !== article.id)
    .slice(0, 3);
  if (!related.length) return null;
  return (
    <section aria-labelledby="related-articles" className="grid gap-2">
      <h3 id="related-articles" className="text-sm font-semibold">
        Related articles
      </h3>
      <ul className="-mx-2 grid">
        {related.map((item) => (
          <li key={item.id}>
            <AriaButton
              onPress={() => onOpenArticle(item)}
              className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 text-start text-sm outline-offset-2 outline-transparent transition-colors duration-150 ease-out-quint hover:bg-muted focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
            >
              <span className="min-w-0">{item.title}</span>
              <CaretRightIcon
                size={14}
                aria-hidden="true"
                className="shrink-0 text-muted-foreground rtl:rotate-180"
              />
            </AriaButton>
          </li>
        ))}
      </ul>
    </section>
  );
}
