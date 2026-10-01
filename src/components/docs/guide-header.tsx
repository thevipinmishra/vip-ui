import Link from "next/link";

export function GuideHeader({ title }: { title: string }) {
  return (
    <header>
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 text-xs text-muted-foreground"
      >
        <Link href="/components" className="rounded-sm hover:text-foreground">
          Components
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">{title}</span>
      </nav>
      <h1 className="max-w-[700px] text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] [text-wrap:balance]">
        {title}
      </h1>
    </header>
  );
}
