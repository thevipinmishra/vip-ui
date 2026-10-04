import { ExampleContextStrip } from "@/components/docs/example-context-strip";

export default function ExamplesLayout({ children }: LayoutProps<"/examples">) {
  return (
    <>
      <ExampleContextStrip />
      {children}
    </>
  );
}
