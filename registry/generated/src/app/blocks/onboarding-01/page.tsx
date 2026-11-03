import { SetupFlow } from "./setup-flow";

export const metadata = {
  title: "Workspace setup",
  description: "Three-step workspace setup with a live preview.",
};

export default function OnboardingPage() {
  return <SetupFlow />;
}
