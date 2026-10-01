import { money, plans } from "../data";
import { Heading, Panel } from "../ui";

export default function SettingsPage() {
  return (
    <>
      <Heading
        title="Settings"
        description="Business details and plan pricing used across this billing workspace."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Business profile"
          description="Currency and invoice terms"
        >
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Business</dt>
              <dd className="mt-1 font-medium">Acme Cloud</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Billing currency</dt>
              <dd className="mt-1 font-medium">USD</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Invoice terms</dt>
              <dd className="mt-1 font-medium">Net 14 days</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Records through</dt>
              <dd className="mt-1 font-medium">September 1, 2026</dd>
            </div>
          </dl>
        </Panel>
        <Panel title="Plan catalog" description="Monthly price per account">
          <dl className="space-y-4 text-sm">
            {(Object.keys(plans) as (keyof typeof plans)[]).map((plan) => (
              <div
                key={plan}
                className="flex items-center justify-between gap-3"
              >
                <dt className="font-medium">{plan}</dt>
                <dd className="tabular-nums">{money(plans[plan])}/month</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
    </>
  );
}
