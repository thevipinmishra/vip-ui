import { Attachment, AttachmentList } from "@/components/ui/attachment";

export function AttachmentBasicDemo() {
  return (
    <AttachmentList className="w-full max-w-md">
      <Attachment
        key="project-brief"
        name="Project brief.pdf"
        fileSize={284672}
      />
      <Attachment key="photos" name="Homepage-preview.png" fileSize={1064960} />
      <Attachment key="assets" name="Assets.zip" fileSize={3145728} />
    </AttachmentList>
  );
}
