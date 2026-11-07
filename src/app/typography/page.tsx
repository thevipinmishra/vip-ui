import { TextLink } from "@/components/docs/guide";
import { TypographyInstall } from "@/components/docs/typography-install";
import { pageMetadata } from "@/lib/seo";
import { ArticleSample, ChatSample, DocsSample } from "./samples";
import { TypographyStudio } from "./typography-studio";

export const metadata = pageMetadata({
  title: "Typography",
  description:
    "Style HTML and rendered markdown with one CSS file. Set the fonts, size, line height, and spacing, then copy the preset.",
  path: "/typography",
});

export default function TypographyPage() {
  return (
    <TypographyStudio
      samples={{
        docs: <DocsSample />,
        chat: <ChatSample />,
        article: <ArticleSample />,
      }}
      install={<TypographyInstall />}
      guide={
        <p className="text-sm leading-6 text-muted-foreground">
          Read the{" "}
          <TextLink href="/components/typography">typography guide</TextLink>{" "}
          for presets, wide tables, and streaming.
        </p>
      }
    />
  );
}
