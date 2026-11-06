import { Highlighter } from "@/components/ui/highlighter";

export function HighlighterSequenceDemo() {
  return (
    <h3 className="max-w-md text-2xl font-semibold leading-snug tracking-tight">
      Write it <Highlighter variant="underline">once</Highlighter>, publish it{" "}
      <Highlighter
        variant="circle"
        delay={0.5}
        className="[--highlighter-color:var(--chart-2)]"
      >
        everywhere
      </Highlighter>
      .
    </h3>
  );
}
