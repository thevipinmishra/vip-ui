import { BrandPanel } from "./brand-panel";
import { EmailLinkForm } from "./email-link-form";

export function LoginPage() {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <a
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-md text-sm font-semibold tracking-[-0.03em] outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
        >
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground"
          >
            N
          </span>
          Northwind
        </a>
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <EmailLinkForm />
          </div>
        </main>
      </div>
      <BrandPanel />
    </div>
  );
}
