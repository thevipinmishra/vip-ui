import { QuotesIcon } from "@phosphor-icons/react/ssr";
import { Avatar } from "../../vip-ui/avatar";

const facts = [
  { value: "4,200", label: "Teams" },
  { value: "99.98%", label: "Uptime" },
  { value: "38", label: "Countries" },
];

export function BrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-end">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 size-96 rounded-full bg-primary-foreground/15 blur-3xl"
      />
      <figure className="relative grid gap-6 p-10 xl:p-14">
        <QuotesIcon size={32} weight="fill" aria-hidden="true" />
        <blockquote className="max-w-md text-2xl font-medium leading-snug tracking-[-0.03em]">
          We moved our whole support desk to Northwind in one week. Our team now
          answers in half the time.
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar
            name="Priya Raman"
            className="bg-primary-foreground/15 text-primary-foreground ring-primary-foreground/25"
          />
          <span className="grid text-sm">
            <span className="font-medium">Priya Raman</span>
            <span className="opacity-75">Head of Support, Lumen</span>
          </span>
        </figcaption>
        <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-primary-foreground/20 pt-6">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse gap-1">
              <dt className="text-xs opacity-75">{fact.label}</dt>
              <dd className="text-xl font-semibold tabular-nums tracking-[-0.03em]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </figure>
    </aside>
  );
}
