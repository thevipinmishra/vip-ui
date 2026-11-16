import { ScrollArea } from "@/components/ui/scroll-area";

const days = ["Mon 18", "Tue 19", "Wed 20", "Thu 21", "Fri 22", "Sat 23"];

const people = [
  {
    name: "Maya Chen",
    shifts: ["Design", "Review", "Design", "Off", "Review", "Off"],
  },
  {
    name: "Leo Park",
    shifts: ["Review", "Design", "Off", "Design", "Design", "Off"],
  },
  {
    name: "Ana Ruiz",
    shifts: ["Off", "Design", "Review", "Design", "Off", "Design"],
  },
  {
    name: "Sam Ito",
    shifts: ["Review", "Off", "Design", "Review", "Design", "Review"],
  },
  {
    name: "Jo Kim",
    shifts: ["Design", "Review", "Off", "Review", "Design", "Off"],
  },
  {
    name: "Nia Okafor",
    shifts: ["Review", "Design", "Design", "Off", "Review", "Design"],
  },
];

export function ScrollAreaBothDemo() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <div className="border-b border-border px-4 py-3">
        <p className="text-sm font-medium">Team coverage</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Week of Nov 18</p>
      </div>
      <ScrollArea
        className="h-56"
        orientation="both"
        aria-label="Team coverage"
      >
        <table className="w-max border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="sticky start-0 z-10 bg-card py-2 ps-4 pe-6 font-medium">
                Person
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="py-2 pe-6 text-xs font-medium text-muted-foreground tabular-nums"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr
                key={person.name}
                className="border-b border-border/60 last:border-0"
              >
                <th
                  scope="row"
                  className="sticky start-0 z-10 bg-card py-2 ps-4 pe-6 text-left font-medium whitespace-nowrap"
                >
                  {person.name}
                </th>
                {person.shifts.map((shift, index) => (
                  <td
                    key={`${person.name}-${days[index]}`}
                    className="py-2 pe-6 text-muted-foreground whitespace-nowrap"
                  >
                    {shift}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
