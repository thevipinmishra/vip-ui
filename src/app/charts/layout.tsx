import { OnThisPage } from "@/components/docs/on-this-page";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";

export default function ChartsLayout({ children }: LayoutProps<"/charts">) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_160px] xl:gap-8">
          <div className="min-w-0">{children}</div>
          <div className="hidden pt-14 xl:block">
            <div className="sticky top-6 max-h-[calc(100dvh-1.5rem)] overflow-y-auto pb-10">
              <OnThisPage />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
