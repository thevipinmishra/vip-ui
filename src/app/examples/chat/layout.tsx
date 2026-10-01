import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat workspace | vip/ui",
  description:
    "A local chat workspace built with vip/ui components. No AI service or account required.",
};

export default function ChatLayout({
  children,
}: LayoutProps<"/examples/chat">) {
  return children;
}
