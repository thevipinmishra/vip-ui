import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";

export default function ThemesLayout({ children }: LayoutProps<"/themes">) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only fixed start-4 inset-bs-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 pbe-24 pbs-10 sm:pbs-14">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
