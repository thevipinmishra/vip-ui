import { blockMetadata } from "@/lib/block-seo";
import { CustomerProfile } from "./customer-profile";

export const metadata = blockMetadata("customers-01");

export default function CustomersBlockPage() {
  return <CustomerProfile />;
}
