import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const messages = [
  { from: "Maya", text: "The new hero image is in the shared folder." },
  { from: "Leo", text: "Looks good. Can we try a darker background?" },
  { from: "Maya", text: "Sure, I will post two options in an hour." },
  { from: "Ana", text: "Please keep the logo at the same size." },
  { from: "Leo", text: "Agreed. The copy also needs a final check." },
  { from: "Sam", text: "I can review the copy after lunch." },
  { from: "Maya", text: "Options are up. The second one is my pick." },
  { from: "Ana", text: "Second one for me too. Ship it." },
];

export function ProgressiveBlurHeaderDemo() {
  return (
    <section
      // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users must be able to scroll the list.
      tabIndex={0}
      className="h-72 w-full max-w-sm overflow-y-auto rounded-xl border border-border bg-card shadow-(--shadow-card)"
      aria-label="Launch thread"
    >
      <header className="sticky top-0 z-10 px-4 py-3">
        <ProgressiveBlur
          side="top"
          className="h-[calc(100%+1.5rem)] bg-linear-to-b from-card/90 from-40% to-transparent"
        />
        <p className="relative text-sm font-medium">Launch thread</p>
      </header>
      <ul className="grid gap-3 px-4 pb-4 text-sm">
        {messages.map((message, index) => (
          <li
            key={`${message.from}-${message.text}`}
            className={
              index % 2
                ? "max-w-[85%] justify-self-end rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                : "max-w-[85%] rounded-lg bg-muted px-3 py-2"
            }
          >
            <span className="block text-xs opacity-70">{message.from}</span>
            {message.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
