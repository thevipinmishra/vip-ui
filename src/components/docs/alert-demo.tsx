import { Alert } from "@/components/ui/alert";

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert title="Preview mode">
        Changes stay in this workspace until you publish.
      </Alert>
      <Alert variant="success" title="Ready to publish">
        Your changes are saved and can go live.
      </Alert>
      <Alert variant="warning" title="Check your billing details">
        Update the card on file before the next renewal.
      </Alert>
      <Alert variant="error" title="Could not save changes">
        Check your connection and try again.
      </Alert>
      <Alert variant="neutral" title="Scheduled maintenance">
        The workspace will be read-only on Sunday morning.
      </Alert>
    </div>
  );
}
