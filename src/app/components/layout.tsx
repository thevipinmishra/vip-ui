import { DocsNav } from "@/components/docs/docs-nav";
import { MobileDocsNav } from "@/components/docs/mobile-docs-nav";
import { SidebarScrollArea } from "@/components/docs/sidebar-scroll-area";
import { SiteHeader } from "@/components/docs/site-header";

export default function ComponentsLayout({
  children,
}: LayoutProps<"/components">) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden border-r border-border/70 lg:block">
          <SidebarScrollArea>
            <DocsNav />
          </SidebarScrollArea>
        </aside>
        <main
          id="main"
          className="min-w-0 max-w-[930px] pb-28 pt-10 sm:pt-14 lg:pt-10"
        >
          <div className="mb-8 lg:hidden">
            <MobileDocsNav />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
