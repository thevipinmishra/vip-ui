import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

export function GuideHeader({ title }: { title: string }) {
  return (
    <header>
      <Breadcrumbs className="mb-4">
        <Breadcrumb href="/components">Components</Breadcrumb>
        <Breadcrumb>{title}</Breadcrumb>
      </Breadcrumbs>
      <h1 className="max-w-[700px] text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] [text-wrap:balance]">
        {title}
      </h1>
    </header>
  );
}
