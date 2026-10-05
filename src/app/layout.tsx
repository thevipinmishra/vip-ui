import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Script from "next/script";
import { siteUrl } from "@/lib/site-url";
import { AppToastViewport } from "./toast-viewport";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "vip/ui | Copyable React components",
  description:
    "Live examples and copyable React components built with React Aria, Tailwind CSS, and Motion.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
