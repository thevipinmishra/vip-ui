import { SiteHeader } from "@/components/docs/site-header";

export default function ChartsLayout({ children }: LayoutProps<"/charts">) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
    </div>
  );
}
