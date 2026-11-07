import { blockMetadata } from "@/lib/block-seo";
import { LoginPage } from "./login-page";

export const metadata = blockMetadata("login-02");

export default function Page() {
  return <LoginPage />;
}
