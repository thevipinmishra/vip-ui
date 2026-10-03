export function GuideHeader({ title }: { title: string }) {
  return (
    <header>
      <h1 className="max-w-[700px] text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] [text-wrap:balance]">
        {title}
      </h1>
    </header>
  );
}
