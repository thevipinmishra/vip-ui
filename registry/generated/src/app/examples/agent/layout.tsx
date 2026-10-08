import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent response | vip/ui",
  description:
    "A local, scripted agent response with tool calls and linked sources.",
};

export default function AgentLayout({
  children,
}: LayoutProps<"/examples/agent">) {
  return children;
}
