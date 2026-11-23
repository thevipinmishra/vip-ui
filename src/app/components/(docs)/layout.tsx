import { DocsNav } from "@/components/docs/docs-nav";
import { Crosshair } from "@/components/docs/frame-marks";
import { OnThisPage } from "@/components/docs/on-this-page";
import { SidebarScrollArea } from "@/components/docs/sidebar-scroll-area";
import { SiteHeader } from "@/components/docs/site-header";
import { TocBar } from "@/components/docs/toc-bar";

export default function ComponentsLayout({
  children,
}: LayoutProps<"/components">) {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-background">
      <div
        aria-hidden="true"
        className="docs-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] opacity-80"
      />
      <SiteHeader />
      <div className="site-container flex-1 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
        <aside className="relative hidden border-e border-docs-line lg:block">
          <Crosshair className="top-0 inset-s-full" />
          <SidebarScrollArea contentClassName="pe-5">
            <DocsNav />
          </SidebarScrollArea>
        </aside>
        <main id="main" className="min-w-0 pb-28 lg:ps-12 xl:pe-12">
          <TocBar />
          <div className="pt-8 sm:pt-12">{children}</div>
        </main>
        <div className="relative hidden border-s border-docs-line xl:block">
          <Crosshair className="top-0 inset-s-0" />
          <SidebarScrollArea className="-ms-px">
            <OnThisPage />
          </SidebarScrollArea>
        </div>
      </div>
    </div>
  );
}
