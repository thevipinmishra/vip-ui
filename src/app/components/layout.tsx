import { DocsNav } from "@/components/docs/docs-nav";
import { MobileDocsNav } from "@/components/docs/mobile-docs-nav";
import { OnThisPage } from "@/components/docs/on-this-page";
import { SidebarScrollArea } from "@/components/docs/sidebar-scroll-area";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";

export default function ComponentsLayout({
  children,
}: LayoutProps<"/components">) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader wide />
      <div className="mx-auto w-full max-w-[90rem] flex-1 px-5 pt-10 sm:px-8 sm:pt-14 lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-14 lg:pt-10 xl:grid-cols-[224px_minmax(0,1fr)_160px] xl:gap-8">
        <aside className="hidden border-r border-border/70 lg:block">
          <SidebarScrollArea>
            <DocsNav />
          </SidebarScrollArea>
        </aside>
        <main id="main" className="min-w-0 pb-28">
          <div className="mb-8 lg:hidden">
            <MobileDocsNav />
          </div>
          {children}
        </main>
        <div className="hidden xl:block">
          <div className="sticky top-6 max-h-[calc(100dvh-1.5rem)] overflow-y-auto pb-10">
            <OnThisPage />
          </div>
        </div>
      </div>
      <SiteFooter wide />
    </div>
  );
}
