"use client";

import { StarIcon } from "@phosphor-icons/react";
import { Tree, TreeHeader, TreeItem, TreeSection } from "@/components/ui/tree";

export function TreeSectionsDemo() {
  return (
    <div className="w-full max-w-sm">
      <Tree
        aria-label="Workspace"
        selectionMode="single"
        defaultSelectedKeys={["roadmap"]}
        defaultExpandedKeys={["marketing"]}
      >
        <TreeSection>
          <TreeHeader>Favorites</TreeHeader>
          <TreeItem
            id="roadmap"
            title="Roadmap"
            icon={<StarIcon size={16} weight="fill" />}
          />
          <TreeItem
            id="metrics"
            title="Weekly metrics"
            icon={<StarIcon size={16} weight="fill" />}
          />
        </TreeSection>
        <TreeSection>
          <TreeHeader>Projects</TreeHeader>
          <TreeItem id="marketing" title="Marketing site">
            <TreeItem id="home" title="Home page.md" />
            <TreeItem id="pricing" title="Pricing.md" />
          </TreeItem>
          <TreeItem id="mobile" title="Mobile app">
            <TreeItem id="onboarding" title="Onboarding.md" />
          </TreeItem>
        </TreeSection>
      </Tree>
    </div>
  );
}
