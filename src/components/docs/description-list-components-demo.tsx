import { Badge } from "@/components/ui/badge";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import { Link } from "@/components/ui/link";

export function DescriptionListComponentsDemo() {
  return (
    <DescriptionList className="w-full max-w-md">
      <DescriptionTerm>Status</DescriptionTerm>
      <DescriptionDetail>
        <Badge variant="success" dot>
          Deployed
        </Badge>
      </DescriptionDetail>
      <DescriptionTerm>Domain</DescriptionTerm>
      <DescriptionDetail>
        <Link href="https://studio-north.example.com">
          studio-north.example.com
        </Link>
      </DescriptionDetail>
      <DescriptionTerm>Deployment ID</DescriptionTerm>
      <DescriptionDetail className="font-mono text-xs font-normal">
        dpl_9f2c4e1a7b3d5f60c8e2a4b6d9f1e3c5
      </DescriptionDetail>
    </DescriptionList>
  );
}
