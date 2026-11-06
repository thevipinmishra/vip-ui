import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const notes = [
  { version: "2.4", text: "Comments now sync across devices in real time." },
  { version: "2.3", text: "Search finds text inside attached PDFs." },
  { version: "2.2", text: "Boards load twice as fast on large projects." },
  { version: "2.1", text: "You can pin a view to the sidebar." },
  { version: "2.0", text: "A new editor with tables and code blocks." },
  { version: "1.9", text: "Exports keep their layout in every format." },
  { version: "1.8", text: "Guests can comment without an account." },
];

export function ProgressiveBlurDemo() {
  return (
    <div className="relative w-full max-w-sm overflow-clip rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <section
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users must be able to scroll the list.
        tabIndex={0}
        className="h-64 overflow-y-auto"
        aria-label="Release notes"
      >
        <ul className="grid gap-4 p-4 pb-16 text-sm">
          {notes.map((note) => (
            <li key={note.version} className="grid gap-0.5">
              <span className="font-medium">Version {note.version}</span>
              <span className="text-muted-foreground">{note.text}</span>
            </li>
          ))}
        </ul>
      </section>
      <ProgressiveBlur />
    </div>
  );
}
