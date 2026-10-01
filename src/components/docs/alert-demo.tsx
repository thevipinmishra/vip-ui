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
        <div>
          <AlertTitle>Ready to publish</AlertTitle>
          <AlertDescription>
            Your changes are saved and can go live.
          </AlertDescription>
        </div>
      </Alert>
      <Alert variant="warning">
        <AlertIcon />
        <div>
          <AlertTitle>Check your billing details</AlertTitle>
          <AlertDescription>
            Update the card on file before the next renewal.
          </AlertDescription>
        </div>
      </Alert>
      <Alert>
        <AlertIcon />
        <div>
          <AlertTitle>Preview mode</AlertTitle>
          <AlertDescription>
            Changes here stay in this workspace until you publish.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
