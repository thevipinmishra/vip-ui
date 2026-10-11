import { Attachment, AttachmentList } from "@/components/ui/attachment";

export function AttachmentBasicDemo() {
  return (
    <AttachmentList className="w-full max-w-md">
      <Attachment key="project-brief" name="Project brief.pdf" size={284672} />
      <Attachment key="photos" name="Homepage-preview.png" size={1064960} />
      <Attachment key="assets" name="Assets.zip" size={3145728} />
    </AttachmentList>
  );
}
