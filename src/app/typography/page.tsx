import { TypographyInstall } from "@/components/docs/typography-install";
import { pageMetadata } from "@/lib/seo";
import { ArticleSample, ChatSample, DocsSample } from "./samples";
import { TypographyStudio } from "./typography-studio";

export const metadata = pageMetadata({
  title: "Typography",
  description:
    "Style HTML and rendered markdown with one CSS file. Set the fonts, size, line height, and spacing, then copy the preset.",
  path: "/typography",
  og: { label: "Typography", art: "type" },
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
    />
  );
}
