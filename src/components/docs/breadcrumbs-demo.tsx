import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

export function BreadcrumbsDemo() {
  return (
    <nav aria-label="Breadcrumbs">
      <Breadcrumbs>
        <Breadcrumb href="/">Home</Breadcrumb>
        <Breadcrumb href="/components">Components</Breadcrumb>
        <Breadcrumb>Breadcrumbs</Breadcrumb>
      </Breadcrumbs>
    </nav>
  );
}
