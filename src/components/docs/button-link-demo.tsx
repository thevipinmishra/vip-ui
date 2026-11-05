import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";

export function ButtonLinkDemo() {
  return (
    <ButtonLink as={Link} href="/components/installation" variant="outline">
      Read the setup guide
    </ButtonLink>
  );
}
