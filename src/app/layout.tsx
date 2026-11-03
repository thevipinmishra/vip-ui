import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { JsonLd } from "@/components/seo/json-ld";
import { defaultMetadata, site, themeColor } from "@/lib/seo";
import { AppToastViewport } from "./toast-viewport";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: themeColor.dark },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.author.name,
      url: site.author.url,
      sameAs: [site.repository],
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${site.url}/#software`,
      name: site.name,
      description: site.description,
      codeRepository: site.repository,
      programmingLanguage: ["TypeScript", "CSS"],
      license: "https://opensource.org/licenses/MIT",
      author: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={structuredData} />
        <div className="flex min-h-full flex-1 flex-col bg-background">
          {children}
        </div>
        <AppToastViewport />
        <Analytics />
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var theme=localStorage.getItem("vip-ui-theme");if(theme==="dark"||(!theme&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark");}catch{}`}
        </Script>
      </body>
    </html>
  );
}
