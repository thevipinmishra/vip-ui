import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { ArrowRight, BranchUp, ChartBar } from "reicon-react";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { SiteHeader } from "@/components/docs/site-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registryUrl } from "@/lib/registry-docs";
import { customerById, invoices, money, monthlyRevenue } from "./business/data";
import { repository } from "./repository/config";
import { getPulls } from "./repository/data";

export const metadata: Metadata = {
  title: "Examples | vip/ui",
  description:
    "Explore repository operations and subscription billing built with vip/ui.",
};

async function OpenPullRequests() {
  await connection();
  const pulls = await getPulls("open", 1).catch(() => null);

  return pulls?.data.length ? (
    <ul className="divide-y divide-border/70">
      {pulls.data.slice(0, 3).map((pull) => (
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

export default function ExamplesPage() {
  const overdue = invoices.filter((invoice) => invoice.status === "overdue");
  const installRepository = registryUrl("example-repository");
  const installBusiness = registryUrl("example-business");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main
        id="main"
        className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20"
      >
        <h1 className="max-w-3xl text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.065em]">
          Examples
        </h1>

        <section aria-labelledby="repository-title" className="mt-12">
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col justify-center py-4 sm:py-8">
                <CardHeader>
                  <CardTitle
                    as="h2"
                    id="repository-title"
                    className="text-3xl tracking-[-0.05em]"
                  >
                    Repository desk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="max-w-md text-sm leading-7 text-muted-foreground">
                    Review open work, follow commits and releases, and see who
                    is contributing to {repository.owner}/{repository.name}.
                    Items open on GitHub when it is time to act.
                  </p>
                  <div className="mt-7">
                    <ButtonLink as={Link} href="/examples/repository">
                      Open repository desk{" "}
                      <ArrowRight size={16} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </CardContent>
              </div>
              <div className="min-w-0 bg-muted/60 p-4 sm:p-8 lg:p-10">
                <div className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-float)] ring-1 ring-border/70">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
                    <span className="min-w-0 truncate text-sm font-semibold">
                      {repository.owner} / {repository.name}
                    </span>
                    <Badge variant="success" dot>
                      Public
                    </Badge>
                  </div>
                  <div className="grid gap-5 p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <BranchUp
                        size={17}
                        className="text-primary"
                        aria-hidden="true"
                      />
                      Pull requests awaiting review
                    </div>
                    <Suspense
                      fallback={
                        <p className="border-t border-border/70 pt-4 text-sm text-muted-foreground">
                          Loading GitHub activity…
                        </p>
                      }
                    >
                      <OpenPullRequests />
                    </Suspense>
                    <div className="flex flex-wrap gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                      <span>Issues</span>
                      <span aria-hidden="true">·</span>
                      <span>Commits</span>
                      <span aria-hidden="true">·</span>
                      <span>Releases</span>
                      <span aria-hidden="true">·</span>
                      <span>Contributors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section aria-labelledby="business-title" className="mt-8">
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="min-w-0 bg-accent/50 p-4 sm:p-8 lg:p-10">
                <div className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-float)] ring-1 ring-border/70">
                  <div className="flex items-center gap-2 border-b border-border/70 px-5 py-4 text-sm font-semibold">
                    <ChartBar
                      size={17}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    Acme Cloud / Billing
                  </div>
                  <div className="grid gap-5 p-5 sm:p-6">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Monthly recurring revenue
                      </p>
                      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] tabular-nums">
                        {money(monthlyRevenue)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Active subscriptions · Sep 1, 2026
                      </p>
                    </div>
                    <div className="border-t border-border/70 pt-4">
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold">
                        <span>Needs attention</span>
                        <Badge variant="warning">
                          {overdue.length} overdue
                        </Badge>
                      </div>
                      <ul className="divide-y divide-border/70">
                        {overdue.map((invoice) => (
                          <li
                            key={invoice.id}
                            className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs first:pt-0 last:pb-0"
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
              </div>
              <div className="flex flex-col justify-center py-4 sm:py-8">
                <CardHeader>
                  <CardTitle
                    as="h2"
                    id="business-title"
                    className="text-3xl tracking-[-0.05em]"
                  >
                    Billing operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="max-w-md text-sm leading-7 text-muted-foreground">
                    Find an account, inspect its subscription, and follow
                    invoices through payment attempts. Reports and account
                    records use the same billing ledger.
                  </p>
                  <div className="mt-7">
                    <ButtonLink as={Link} href="/examples/business">
                      Open billing workspace{" "}
                      <ArrowRight size={16} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </section>

        <section
          aria-labelledby="install-title"
          className="mt-20 border-t border-border/70 pt-12"
        >
          <h2
            id="install-title"
            className="text-2xl font-semibold tracking-[-0.04em]"
          >
            Bring a workspace into your project
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
            Complete the{" "}
            <Link
              href="/components/installation"
              className="font-medium text-primary underline underline-offset-4"
            >
              one-time theme setup
            </Link>{" "}
            in a shadcn-initialized Next.js app with TypeScript and Tailwind v4.
            Check the destination paths before installing.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="min-w-0">
              <h3 className="text-base font-semibold">Repository desk</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Installs six routes under{" "}
                <code className="font-mono text-foreground">
                  src/app/examples/repository/
                </code>
                . Public GitHub data works without credentials. Set a
                server-only{" "}
                <code className="font-mono text-foreground">GITHUB_TOKEN</code>{" "}
                for a higher rate limit, or change{" "}
                <code className="font-mono text-foreground">config.ts</code> to
                follow another repository.
              </p>
              {installRepository && (
                <div className="mt-5">
                  <PackageManagerCommand
                    action="run"
                    args={`shadcn@latest add ${installRepository}`}
                  />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold">Billing operations</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Installs the billing routes under{" "}
                <code className="font-mono text-foreground">
                  src/app/examples/business/
                </code>
                . The included records live in{" "}
                <code className="font-mono text-foreground">data.ts</code> and
                do not represent real customers or payments. Connect your own
                billing source before using it for operations.
              </p>
              {installBusiness && (
                <div className="mt-5">
                  <PackageManagerCommand
                    action="run"
                    args={`shadcn@latest add ${installBusiness}`}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
