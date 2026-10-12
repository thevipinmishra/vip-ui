import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button-link";

export function AlertActionDemo() {
  return (
    <Alert className="w-full max-w-lg">
      <AlertIcon />
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-3">
        <div className="min-w-0 flex-[1_1_12rem]">
          <AlertTitle>Set up your project</AlertTitle>
          <AlertDescription>
            Complete the one-time setup before you add a component.
          </AlertDescription>
        </div>
        <ButtonLink href="/components/installation" variant="outline" size="sm">
          View setup
        </ButtonLink>
      </div>
    </Alert>
  );
}
