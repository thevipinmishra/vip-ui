"use client";

import { DatabaseIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Alert } from "../../vip-ui/alert";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { ButtonLink } from "../../vip-ui/button-link";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../../vip-ui/code-block";
import { CopyButton } from "../../vip-ui/copy-button";
import { Form } from "../../vip-ui/form";
import { TextField } from "../../vip-ui/text-field";
import { cn } from "../../vip-ui/utils";
import { LatencyChart } from "./latency-chart";

const sections = [
  { id: "problem", title: "The problem" },
  { id: "where-the-time-went", title: "Where the time went" },
  { id: "snapshot-the-catalog", title: "Snapshot the catalog" },
  { id: "results", title: "Results" },
  { id: "next", title: "What comes next" },
];

const clientCode = `export const db = quarry({
  url: process.env.DATABASE_URL,
  warmStart: {
    snapshot: "catalog",
    keepAlive: "5m",
  },
});`;

const articleUrl = "https://quarry.dev/blog/faster-cold-starts";

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((heading): heading is HTMLElement => heading !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, []);
  return active;
}

function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? root.scrollTop / max : 0;
      bar.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-20 h-0.5 origin-left scale-x-0 bg-primary rtl:origin-right"
    />
  );
}

function Subscribe() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState("");

  if (done) {
    return (
      <p role="status" className="text-sm text-muted-foreground">
        Thanks. We sent a link to {done}. Open it to confirm.
      </p>
    );
  }

  return (
    <Form
      className="flex flex-col gap-2 sm:flex-row sm:items-start"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(email.trim());
      }}
    >
      <TextField
        aria-label="Email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        value={email}
        onChange={setEmail}
        isRequired
        validate={(value) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
            ? null
            : "Enter an email like name@company.com."
        }
        className="sm:max-w-72"
      />
      <Button type="submit">Subscribe</Button>
    </Form>
  );
}

export function BlogArticle() {
  const active = useActiveSection();

  return (
    <div className="min-h-svh bg-background">
      <ReadingProgress />
      <header className="border-b border-border/70">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground"
            >
              <DatabaseIcon size={16} weight="fill" />
            </span>
            Quarry
            <span className="font-normal text-muted-foreground">Blog</span>
          </div>
          <ButtonLink href="#subscribe" variant="outline" size="sm">
            Subscribe
          </ButtonLink>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <article className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
          <div className="mx-auto grid w-full min-w-0 max-w-2xl grid-cols-1 gap-10">
            <header className="grid gap-5">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="accent">Engineering</Badge>
                <time dateTime="2026-10-22">Oct 22, 2026</time>
                <span aria-hidden="true">·</span>
                <span>8 min read</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl">
                How we cut cold starts by 78%
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                A new database used to take 1.9 seconds to answer its first
                query. Now it takes 410 milliseconds. This is how we found the
                slow parts and removed them.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border/70 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name="Priyanka Raman" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      Priyanka Raman
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      Staff engineer, Compute
                    </p>
                  </div>
                </div>
                <CopyButton value={articleUrl} variant="outline" size="sm">
                  Copy link
                </CopyButton>
              </div>
            </header>

            <div className="typography">
              <h2 id="problem" className="scroll-mt-8">
                The problem
              </h2>
              <p>
                Quarry stops a database when nobody uses it. This keeps the
                price low for projects with little traffic. But the first query
                after a stop must wait for the database to start again. We call
                this wait a <em>cold start</em>.
              </p>
              <p>
                In September, the median cold start was 1.9 seconds. For a
                preview deploy or a cron job, that is acceptable. For a page
                that a person waits for, it is too slow. It was the most common
                complaint in our support queue.
              </p>

              <h2 id="where-the-time-went" className="scroll-mt-8">
                Where the time went
              </h2>
              <p>
                We added a trace to each step of a start and collected 40,000
                starts over 7 days. The median start had 4 parts:
              </p>
              <ul>
                <li>
                  <strong>Pull the image:</strong> 820 ms
                </li>
                <li>
                  <strong>Start the process:</strong> 310 ms
                </li>
                <li>
                  <strong>Load the catalog:</strong> 540 ms
                </li>
                <li>
                  <strong>Plan the first query:</strong> 230 ms
                </li>
              </ul>
              <p>
                The image pull was easy to fix. We now keep the image on each
                host, so a start does not download it. That removed 820 ms. The
                catalog load was more difficult.
              </p>

              <h2 id="snapshot-the-catalog" className="scroll-mt-8">
                Snapshot the catalog
              </h2>
              <p>
                Postgres reads its catalog from disk when it starts. The catalog
                holds the tables, types, and indexes. Large schemas have
                thousands of rows in it. We now save a snapshot of the catalog
                in memory when the database stops, and load the snapshot when it
                starts again.
              </p>
              <p>
                The snapshot also keeps the plan cache. The first query can use
                a plan that is already made. You do not need to change your
                code, but you can control the behavior in the client:
              </p>
              <div data-not-typography>
                <CodeBlock code={clientCode} language="ts">
                  <CodeBlockHeader>
                    <CodeBlockTitle>db.ts</CodeBlockTitle>
                    <CodeBlockActions />
                  </CodeBlockHeader>
                  <CodeBlockBody />
                </CodeBlock>
              </div>
              <p>
                A migration makes the snapshot old. When the schema changes, we
                remove the snapshot and make a new one on the next stop.
              </p>

              <h2 id="results" className="scroll-mt-8">
                Results
              </h2>
              <p>
                We released the change to all regions on October 6. The median
                cold start fell from 1.9 seconds to 410 milliseconds. The
                slowest 1% of starts fell from 3.4 seconds to 980 milliseconds.
              </p>
              <div data-not-typography>
                <LatencyChart />
              </div>
              <div data-not-typography>
                <Alert title="Warm start is on by default">
                  New projects use it now. For older projects, go to Settings,
                  then Compute, and turn on Warm start.
                </Alert>
              </div>

              <h2 id="next" className="scroll-mt-8">
                What comes next
              </h2>
              <p>
                The process start is now the largest part of a cold start. We
                are testing a way to keep a small pool of started processes in
                each region. Our goal is a median cold start below 200 ms before
                the end of the year.
              </p>
            </div>

            <footer className="grid gap-8">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Performance</Badge>
                <Badge variant="outline">Postgres</Badge>
                <Badge variant="outline">Infrastructure</Badge>
              </div>
              <div className="flex gap-4 rounded-xl bg-muted/50 p-5 ring-1 ring-border/70">
                <Avatar name="Priyanka Raman" size="lg" />
                <div className="grid min-w-0 gap-1">
                  <p className="text-sm font-semibold">Priyanka Raman</p>
                  <p className="text-sm text-muted-foreground">
                    Priyanka leads the Compute team at Quarry. Before Quarry,
                    she worked on storage engines at two cloud companies.
                  </p>
                </div>
              </div>
              <section
                id="subscribe"
                aria-labelledby="subscribe-title"
                className="grid scroll-mt-6 gap-4 border-t border-border/70 pt-8"
              >
                <div className="grid gap-1">
                  <h2
                    id="subscribe-title"
                    className="text-lg font-semibold tracking-[-0.02em]"
                  >
                    Get new posts by email
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    One email each month. No ads.
                  </p>
                </div>
                <Subscribe />
              </section>
            </footer>
          </div>

          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-8 grid gap-3">
              <p className="text-xs font-medium text-muted-foreground">
                On this page
              </p>
              <ul className="grid gap-1 border-s border-border/70">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={
                        active === section.id ? "location" : undefined
                      }
                      className={cn(
                        "-ms-px block border-s py-1 ps-3 text-sm outline-offset-2 outline-transparent transition-colors duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring",
                        active === section.id
                          ? "border-foreground font-medium text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </article>
      </main>
    </div>
  );
}
