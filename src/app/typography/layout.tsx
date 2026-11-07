import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { fontVariables } from "./font-loaders";

export default function TypographyLayout({
  children,
}: LayoutProps<"/typography">) {
  return (
    <div
      className={`flex min-h-screen flex-col bg-background text-foreground ${fontVariables}`}
    >
      <SiteHeader />
      <main id="main" className="flex-1 pb-24">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
