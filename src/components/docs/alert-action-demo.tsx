import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button-link";

export function AlertActionDemo() {
  return (
    <Alert className="w-full max-w-lg flex-wrap sm:flex-nowrap">
      <AlertIcon />
      <div className="min-w-0 flex-1">
        <AlertTitle>Set up your project</AlertTitle>
        <AlertDescription>
          Complete the one-time setup before adding a component.
        </AlertDescription>
      </div>
      <ButtonLink href="/components/installation" variant="outline" size="sm">
        View setup
      </ButtonLink>
    </Alert>
  );
}
