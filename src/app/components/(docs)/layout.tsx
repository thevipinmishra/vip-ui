import { DocsNav } from "@/components/docs/docs-nav";
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
      <SiteHeader />
      <div className="site-container flex-1 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
        <aside className="hidden border-e border-border/60 lg:block">
          <SidebarScrollArea>
            <DocsNav />
          </SidebarScrollArea>
        </aside>
        <main
          id="main"
          className="min-w-0 pt-10 pb-28 sm:pt-14 lg:ps-12 xl:pe-12"
        >
          {children}
        </main>
        <div className="hidden border-s border-border/60 xl:block">
          <div className="sticky top-0 -ms-px max-h-dvh overflow-y-auto pt-14 pb-10">
            <OnThisPage />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
