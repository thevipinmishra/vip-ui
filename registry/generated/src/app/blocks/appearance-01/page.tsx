import { AppearanceSettings } from "./appearance-settings";

export const metadata = {
  title: "Appearance settings",
  description: "Theme, accent color, font, and motion settings.",
};

export default function AppearancePage() {
  return <AppearanceSettings />;
}
