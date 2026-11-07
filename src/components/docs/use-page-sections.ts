"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface PageSection {
  id: string;
  label: string;
}

const compactQuery = "(width < 80rem)";

function chromeOffset(sectionCount: number) {
  const root = getComputedStyle(document.documentElement);
  const rem = Number.parseFloat(root.fontSize);
  const token = (name: string) =>
    (Number.parseFloat(root.getPropertyValue(name)) || 0) * rem;
  const hasBar = sectionCount >= 2 && window.matchMedia(compactQuery).matches;
  return token("--header-height") + (hasBar ? token("--toc-bar-height") : 0);
}

export function usePageSections() {
  const pathname = usePathname();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-discover sections after client-side navigation
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    let observer: IntersectionObserver | undefined;

    const scan = () => {
      observer?.disconnect();
      const nodes = Array.from(
        main.querySelectorAll<HTMLElement>("section[id]"),
      ).filter(
        (node) =>
          !node.hasAttribute("data-toc-skip") &&
          !node.closest("[inert]") &&
          !node.closest('[data-slot="code-frame"]'),
      );
      const found = nodes
        .map((node) => ({
          id: node.id,
          label:
            node.dataset.tocLabel ??
            node.querySelector("h2, h3")?.textContent?.trim() ??
            node.getAttribute("aria-label") ??
            node.id,
        }))
        .filter((section) => section.id && section.label);

      setSections(found);
      setVisibleIds([]);
      if (found.length === 0) return;

      setCurrentId(found[0].id);

      const visible = new Set<string>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          const nextVisible = found
            .filter((section) => visible.has(section.id))
            .map((section) => section.id);
          setVisibleIds(nextVisible);
          if (nextVisible[0]) setCurrentId(nextVisible[0]);
        },
        {
          rootMargin: `-${Math.round(chromeOffset(found.length) + 24)}px 0px -12% 0px`,
          threshold: 0,
        },
      );

      for (const node of nodes) observer.observe(node);
    };

    const hasSection = (node: Node) =>
      node instanceof HTMLElement &&
      (node.matches("section[id]") || node.querySelector("section[id]"));
    const mutations = new MutationObserver((records) => {
      if (
        records.some(
          (record) =>
            Array.from(record.addedNodes).some(hasSection) ||
            Array.from(record.removedNodes).some(hasSection),
        )
      )
        scan();
    });

    const compact = window.matchMedia(compactQuery);
    scan();
    mutations.observe(main, { childList: true, subtree: true });
    compact.addEventListener("change", scan);
    return () => {
      compact.removeEventListener("change", scan);
      mutations.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  return { sections, currentId, setCurrentId, visibleIds };
}
