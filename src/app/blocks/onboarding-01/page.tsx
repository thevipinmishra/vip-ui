import { blockMetadata } from "@/lib/block-seo";
import { SetupFlow } from "./setup-flow";

export const metadata = blockMetadata("onboarding-01");

export default function OnboardingPage() {
  return <SetupFlow />;
}
