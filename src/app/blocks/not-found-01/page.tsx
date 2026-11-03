import { blockMetadata } from "@/lib/block-seo";
import { NotFoundPage } from "./not-found-page";

export const metadata = blockMetadata("not-found-01");

export default function NotFound() {
  return <NotFoundPage />;
}
