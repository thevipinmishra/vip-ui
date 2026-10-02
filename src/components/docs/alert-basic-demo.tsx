import { Alert } from "@/components/ui/alert";

export function AlertBasicDemo() {
  return (
    <Alert title="Preview mode" className="w-full max-w-lg">
      Changes stay in this workspace until you publish.
    </Alert>
  );
}
