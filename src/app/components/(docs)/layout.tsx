import { DocsNav } from "@/components/docs/docs-nav";
import { OnThisPage } from "@/components/docs/on-this-page";
import { SidebarScrollArea } from "@/components/docs/sidebar-scroll-area";
import { SiteHeader } from "@/components/docs/site-header";
import { TocBar } from "@/components/docs/toc-bar";

export default function ComponentsLayout({
  children,
}: LayoutProps<"/components">) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <div className="site-container flex-1 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
        <aside className="hidden border-e border-border/60 lg:block">
          <SidebarScrollArea contentClassName="pe-5">
            <DocsNav />
          </SidebarScrollArea>
        </aside>
        <main id="main" className="min-w-0 pb-28 lg:ps-12 xl:pe-12">
          <TocBar />
          <div className="pt-8 sm:pt-12">{children}</div>
        </main>
        <div className="hidden border-s border-border/60 xl:block">
          <SidebarScrollArea className="-ms-px">
            <OnThisPage />
          </SidebarScrollArea>
        </div>
      </div>
    </div>
  );
}
