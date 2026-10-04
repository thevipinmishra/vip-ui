"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Refresh } from "reicon-react";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-24 sm:px-8">
        <h1 className="text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
          This page failed to render. Try again, or return to the component
          catalog.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onPress={() => retry()}>
            <Refresh size={16} aria-hidden="true" /> Try again
          </Button>
          <ButtonLink as={Link} href="/components" variant="outline">
            Browse components
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
