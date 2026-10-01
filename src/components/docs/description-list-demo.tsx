import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";

export function DescriptionListDemo() {
  return (
    <DescriptionList className="w-full max-w-md">
      <DescriptionTerm>Workspace</DescriptionTerm>
      <DescriptionDetail>Studio North</DescriptionDetail>
      <DescriptionTerm>Owner</DescriptionTerm>
      <DescriptionDetail>Amina Shah</DescriptionDetail>
      <DescriptionTerm>Created</DescriptionTerm>
      <DescriptionDetail>June 12, 2025</DescriptionDetail>
    </DescriptionList>
  );
}
