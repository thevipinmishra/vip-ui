import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert variant="success">
        <AlertIcon />
        <div className="min-w-0">
          <AlertTitle>Ready to publish</AlertTitle>
          <AlertDescription>
            Your changes are saved and can go live.
          </AlertDescription>
        </div>
      </Alert>
      <Alert variant="warning">
        <AlertIcon />
        <div className="min-w-0">
          <AlertTitle>Check your billing details</AlertTitle>
          <AlertDescription>
            Update the card on file before the next renewal.
          </AlertDescription>
        </div>
      </Alert>
      <Alert variant="error">
        <AlertIcon />
        <div className="min-w-0">
          <AlertTitle>Could not save changes</AlertTitle>
          <AlertDescription>
            Check your connection and try again.
          </AlertDescription>
        </div>
      </Alert>
      <Alert>
        <AlertIcon />
        <div className="min-w-0">
          <AlertTitle>Preview mode</AlertTitle>
          <AlertDescription>
            Changes here stay in this workspace until you publish.
          </AlertDescription>
        </div>
      </Alert>
      <Alert variant="neutral">
        <AlertIcon />
        <div className="min-w-0">
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertDescription>
            The workspace will be read-only on Sunday morning.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
