import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

export function BreadcrumbsDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/components">Components</Breadcrumb>
      <Breadcrumb>Breadcrumbs</Breadcrumb>
    </Breadcrumbs>
  );
}
