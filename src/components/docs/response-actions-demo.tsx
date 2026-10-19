import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import {
  Response,
  ResponseActions,
  ResponseContent,
} from "@/components/ui/response";

const TEXT =
  "The migration is safe to run behind the current feature flag. Roll the reader out first, then the writer.";

export function ResponseActionsDemo() {
  return (
    <Response status="complete" className="w-full max-w-md">
      <ResponseContent>{TEXT}</ResponseContent>
      <ResponseActions>
        <CopyButton value={TEXT} variant="ghost" size="sm" />
        <Button type="button" variant="ghost" size="sm">
          Regenerate
        </Button>
      </ResponseActions>
    </Response>
  );
}
