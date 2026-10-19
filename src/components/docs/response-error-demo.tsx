import { Button } from "@/components/ui/button";
import {
  Response,
  ResponseActions,
  ResponseContent,
  ResponseNotice,
} from "@/components/ui/response";

export function ResponseErrorDemo() {
  return (
    <Response status="error" className="w-full max-w-md">
      <ResponseContent>
        The connection closed before the answer finished.
      </ResponseContent>
      <ResponseNotice />
      <ResponseActions>
        <Button type="button" variant="ghost" size="sm">
          Retry
        </Button>
      </ResponseActions>
    </Response>
  );
}
