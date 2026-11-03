import { SecuritySettings } from "./security-settings";

export const metadata = {
  title: "Security settings",
  description: "Password, two-step sign-in, and session settings.",
};

export default function SecurityPage() {
  return <SecuritySettings />;
}
