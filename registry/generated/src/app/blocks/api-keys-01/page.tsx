import { ApiKeysSettings } from "./api-keys-settings";

export const metadata = {
  title: "API keys",
  description: "API key list with scopes, expiry dates, and revoke actions.",
};

export default function ApiKeysPage() {
  return <ApiKeysSettings />;
}
