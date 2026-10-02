import { Checkbox } from "@/components/ui/checkbox";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@/components/ui/fieldset";

export function FieldsetDemo() {
  return (
    <Fieldset aria-describedby="digest-help" className="w-full max-w-sm">
      <FieldsetLegend>Weekly digest</FieldsetLegend>
      <FieldsetDescription id="digest-help" className="mb-4">
        Choose the updates you want in your Monday email.
      </FieldsetDescription>
      <div className="grid gap-2">
        <Checkbox defaultSelected>Project activity</Checkbox>
        <Checkbox>Upcoming deadlines</Checkbox>
      </div>
    </Fieldset>
  );
}
