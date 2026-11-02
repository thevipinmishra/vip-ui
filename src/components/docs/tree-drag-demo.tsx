"use client";

import { Collection, useDragAndDrop, useTreeData } from "react-aria-components";
import { Tree, TreeDropIndicator, TreeItem } from "@/components/ui/tree";

interface FileNode {
  id: string;
  name: string;
  children?: FileNode[];
}

const initialItems: FileNode[] = [
  {
    id: "drafts",
    name: "Drafts",
    children: [
      { id: "intro", name: "Introduction.md" },
      { id: "setup", name: "Setup.md" },
    ],
  },
  {
    id: "published",
    name: "Published",
    children: [{ id: "faq", name: "FAQ.md" }],
  },
  { id: "changelog", name: "Changelog.md" },
];

export function TreeDragDemo() {
  const tree = useTreeData({
    initialItems,
    getKey: (item) => item.id,
    getChildren: (item) => item.children ?? [],
  });

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": tree.getItem(key)?.value.name ?? "",
      })),
    shouldAcceptItemDrop: (target) =>
      Boolean(tree.getItem(target.key)?.value.children),
    onMove(event) {
      const { target, keys } = event;
      if (target.dropPosition === "before") {
        tree.moveBefore(target.key, keys);
      } else if (target.dropPosition === "after") {
        tree.moveAfter(target.key, keys);
      } else {
        const index = tree.getItem(target.key)?.children?.length ?? 0;
        [...keys].forEach((key, offset) => {
          tree.move(key, target.key, index + offset);
        });
      }
    },
    renderDropIndicator: (target) => <TreeDropIndicator target={target} />,
  });

  return (
    <div className="w-full max-w-sm">
      <Tree
        aria-label="Documentation pages"
        items={tree.items}
        defaultExpandedKeys={["drafts", "published"]}
        selectionMode="single"
        dragAndDropHooks={dragAndDropHooks}
      >
        {function renderNode(node) {
          return (
            <TreeItem
              id={node.key}
              title={node.value.name}
              hasChildItems={Boolean(node.value.children)}
            >
              <Collection items={node.children ?? []}>{renderNode}</Collection>
            </TreeItem>
          );
        }}
      </Tree>
    </div>
  );
}
