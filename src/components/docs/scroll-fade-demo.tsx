import { ScrollFade } from "@/components/ui/scroll-fade";

const activity = [
  { name: "Maya Chen", action: "approved the homepage copy", time: "2m" },
  { name: "Leo Park", action: "commented on Pricing", time: "14m" },
  { name: "Ana Ruiz", action: "uploaded 6 product shots", time: "1h" },
  { name: "Sam Ito", action: "moved Launch email to Review", time: "2h" },
  { name: "Maya Chen", action: "invited Jo to the project", time: "3h" },
  { name: "Leo Park", action: "renamed the Q4 board", time: "5h" },
  { name: "Ana Ruiz", action: "archived 12 old drafts", time: "1d" },
  { name: "Sam Ito", action: "set the launch date", time: "2d" },
];

export function ScrollFadeDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <p className="border-b border-border px-4 py-3 text-sm font-medium">
        Activity
      </p>
      <ScrollFade className="h-52" tabIndex={0} aria-label="Activity">
        <ul className="grid gap-4 p-4 text-sm">
          {activity.map((item) => (
            <li
              key={`${item.name}-${item.time}`}
              className="flex items-baseline justify-between gap-3"
            >
              <span className="min-w-0">
                <span className="font-medium">{item.name}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {item.time}
              </span>
            </li>
          ))}
        </ul>
      </ScrollFade>
    </div>
  );
}
