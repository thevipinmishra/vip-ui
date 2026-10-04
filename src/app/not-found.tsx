import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Page not found | vip/ui",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-24 sm:px-8">
        <h1 className="text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
          This address does not match a page on vip/ui. Browse the component
          catalog, or search with ⌘K from the header.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink as={Link} href="/components">
            Browse components <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink as={Link} href="/" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
