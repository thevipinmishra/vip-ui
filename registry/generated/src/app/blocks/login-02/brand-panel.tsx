import { QuotesIcon } from "@phosphor-icons/react/ssr";

const facts = [
  { value: "4,200", label: "teams" },
  { value: "99.98%", label: "uptime" },
  { value: "38", label: "countries" },
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
        <figcaption className="text-sm opacity-80">
          Priya Raman, Head of Support at Lumen
        </figcaption>
        <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-primary-foreground/20 pt-6">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs opacity-75">{fact.label}</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums tracking-[-0.03em]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </figure>
    </aside>
  );
}
