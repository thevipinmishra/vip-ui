import { SiteHeader } from "@/components/docs/site-header";

export default function ThemesLayout({ children }: LayoutProps<"/themes">) {
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
        className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16"
      >
        {children}
      </main>
    </div>
  );
}
