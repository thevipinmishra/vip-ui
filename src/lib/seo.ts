import type { Metadata } from "next";
import { siteUrl } from "./site-url";

export const site = {
  name: "vip/ui",
  domain: "vip-ui.dev",
  title: "vip/ui — Accessible React components with motion",
  tagline: "Accessible React components with motion",
  description:
    "Accessible React components with motion in every state. Built on React Aria, Tailwind CSS v4, and Motion. Add them with the shadcn CLI.",
  url: siteUrl(),
  repository: "https://github.com/thevipinmishra/vip-ui",
  author: {
    name: "Vipin Mishra",
    url: "https://github.com/thevipinmishra",
  },
  locale: "en_US",
  keywords: [
    "React components",
    "React Aria",
    "Tailwind CSS",
    "shadcn",
    "accessible components",
    "React UI library",
    "Motion",
  ],
} as const;

export const themeColor = {
  light: "#f7f9f8",
  dark: "#101211",
} as const;

export const socialImage = {
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

const robots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
} as const;

const noIndexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [site.author],
  creator: site.author.name,
  publisher: site.author.name,
  category: "Developer tools",
  keywords: [...site.keywords],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export interface PageMetadataOptions {
  /** The page title without the site suffix. */
  title: string;
  /** A unique summary, ideally 120–160 characters. */
  description: string;
  /** The canonical path, without a query string or hash. */
  path: string;
  /** Set for the home page, whose title already contains the site name. */
  absoluteTitle?: boolean;
  /** Use on demos, 404 pages, and other pages that should stay out of search. */
  noIndex?: boolean;
  /** Set false on a 404 page, which has no canonical URL. */
  canonical?: boolean;
  /**
   * "file" keeps a route-local opengraph-image.tsx in charge of the card.
   * "endpoint" uses the shared /og card, for pages that have no local image.
   */
  image?: "file" | "endpoint";
  og?: {
    eyebrow?: string;
    meta?: string;
    snippet?: string;
    accent?: "teal" | "amber";
  };
  type?: "website" | "article";
}

function ogImageUrl({
  title,
  description,
  og,
}: {
  title: string;
  description: string;
  og?: PageMetadataOptions["og"];
}) {
  const url = new URL("/og", site.url);
  url.searchParams.set("title", title);
  url.searchParams.set("description", description);
  if (og?.eyebrow) url.searchParams.set("eyebrow", og.eyebrow);
  if (og?.meta) url.searchParams.set("meta", og.meta);
  if (og?.snippet) url.searchParams.set("snippet", og.snippet);
  if (og?.accent) url.searchParams.set("accent", og.accent);
  return url.toString();
}

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
  canonical = true,
  image = "endpoint",
  og,
  type = "website",
}: PageMetadataOptions): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type,
    locale: site.locale,
    url: path,
    siteName: site.name,
    title: socialTitle,
    description,
  };

  if (image === "endpoint") {
    openGraph.images = [
      {
        url: ogImageUrl({ title, description, og }),
        width: socialImage.width,
        height: socialImage.height,
        type: socialImage.type,
        alt: socialTitle,
      },
    ];
  }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(canonical
      ? {
          alternates: {
            canonical: path,
          },
        }
      : {}),
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    robots: noIndex ? noIndexRobots : robots,
  };
}

export const noIndexMetadata: Metadata = {
  robots: noIndexRobots,
};

/**
 * Metadata for a 404 page. Next.js adds the noindex tag automatically for a
 * 404 response, so we only set the copy and social text here.
 */
export function notFoundMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
