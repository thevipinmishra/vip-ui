import { Attachment, AttachmentList } from "@/components/ui/attachment";

export function AttachmentBasicDemo() {
  return (
    <AttachmentList className="w-full max-w-md">
      <Attachment name="Project brief.pdf" size={284672} />
      <Attachment
        name="Homepage-review-notes-and-references.pdf"
        size={1064960}
      />
    </AttachmentList>
  );
}
