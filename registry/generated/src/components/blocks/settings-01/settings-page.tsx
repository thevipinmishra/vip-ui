import { ProfileForm } from "./profile-form";
import { SettingsShell } from "./settings-shell";

export function SettingsPage() {
  return (
    <SettingsShell
      current="profile"
      title="Profile"
      description="Manage how you appear in Kestrel and how we contact you."
    >
      <ProfileForm />
    </SettingsShell>
  );
}
