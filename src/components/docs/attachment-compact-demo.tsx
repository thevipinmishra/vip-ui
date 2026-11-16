"use client";

import { useState } from "react";
import { Attachment, AttachmentList } from "@/components/ui/attachment";

const files = [
  { id: "brief", name: "Q3-brief.pdf", size: 284672 },
  { id: "chart", name: "activation-week.png", size: 184320 },
  { id: "export", name: "revenue-by-region.csv", size: 41984 },
];

export function AttachmentCompactDemo() {
  const [items, setItems] = useState(files);

  return (
    <AttachmentList className="flex max-w-md flex-wrap">
      {items.map((item) => (
        <Attachment
          key={item.id}
          size="sm"
          name={item.name}
          fileSize={item.size}
          status="complete"
          onRemove={() =>
            setItems((current) =>
              current.filter((entry) => entry.id !== item.id),
            )
          }
        />
      ))}
    </AttachmentList>
  );
}
