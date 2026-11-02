import { Alert } from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button-link";

export function AlertActionDemo() {
  return (
    <Alert
      title="Set up your project"
      action={
        <ButtonLink href="/components/installation" variant="outline" size="sm">
          View setup
        </ButtonLink>
      }
      className="w-full max-w-lg"
    >
      Complete the one-time setup before you add a component.
    </Alert>
  );
}
