"use client";

import { FolderIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

interface Folder {
  id: string;
  name: string;
  children?: Folder[];
}

const root: Folder = {
  id: "drive",
  name: "My drive",
  children: [
    {
      id: "work",
      name: "Work",
      children: [
        {
          id: "clients",
          name: "Clients",
          children: [
            { id: "acme", name: "Acme" },
            { id: "globex", name: "Globex" },
          ],
        },
        { id: "invoices", name: "Invoices" },
      ],
    },
    {
      id: "personal",
      name: "Personal",
      children: [{ id: "travel", name: "Travel" }],
    },
  ],
};

export function BreadcrumbsFoldersDemo() {
  const [path, setPath] = useState<Folder[]>([root]);
  const current = path[path.length - 1];

  return (
    <div className="grid w-full max-w-md gap-3">
      <Breadcrumbs
        items={path}
        onAction={(key) =>
          setPath((items) =>
            items.slice(0, items.findIndex((item) => item.id === key) + 1),
          )
        }
      >
        {(folder) => <Breadcrumb id={folder.id}>{folder.name}</Breadcrumb>}
      </Breadcrumbs>
      <div className="flex min-h-11 flex-wrap gap-2">
        {current.children?.map((folder) => (
          <Button
            key={folder.id}
            variant="outline"
            size="sm"
            onPress={() => setPath((items) => [...items, folder])}
          >
            <FolderIcon aria-hidden="true" />
            {folder.name}
          </Button>
        )) ?? (
          <p className="self-center text-sm text-muted-foreground">
            This folder is empty.
          </p>
        )}
      </div>
    </div>
  );
}
