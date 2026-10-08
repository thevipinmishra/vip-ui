import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "reicon-react";
import { GuideHeader } from "@/components/docs/guide-header";

export const metadata: Metadata = {
  title: "React Aria | vip/ui",
  description:
    "How vip/ui uses React Aria contexts, forms, and internationalization, with links to the React Aria documentation for each topic.",
};

export default function ReactAriaPage() {
  return (
    <article>
      <GuideHeader title="React Aria" />
      <div className="mt-8 max-w-[670px] text-sm leading-7 text-muted-foreground">
        <p>
          Interactive vip/ui components are styled wrappers around React Aria
          Components, so behavior, state, and accessibility come from React
          Aria. The patterns below matter once you build beyond the component
          pages; each summary links to the React Aria documentation for the full
          detail.
        </p>
      </div>

      <section id="contexts" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Contexts
        </h2>
        <p className="mt-4 max-w-[670px] text-sm leading-7 text-muted-foreground">
          React Aria passes props and behavior to its children through React
          contexts. That is how a button inside a number field receives its
          increment and decrement actions, and how one provider configures an
          entire group: nested children receive the value, and a local prop on a
          component takes precedence over the value from context. Slots
          distinguish repeated parts, such as a stepper&apos;s increment and
          decrement buttons.
        </p>
        <p className="mt-4">
          <ReactAriaLink href="https://react-aria.adobe.com/customization#contexts">
            Read the React Aria contexts guide
          </ReactAriaLink>
        </p>
      </section>

      <section id="consuming-contexts" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Consuming contexts
        </h2>
        <p className="mt-4 max-w-[670px] text-sm leading-7 text-muted-foreground">
          To replace part of a pattern with your own component, consume the
          parent&apos;s context instead of re-implementing its behavior.{" "}
          <code className="font-mono text-foreground">useContextProps</code>{" "}
          merges local props with the context value and respects the slot prop;{" "}
          <code className="font-mono text-foreground">useSlottedContext</code>{" "}
          reads a value without merging. Contexts that carry state, such as{" "}
          <code className="font-mono text-foreground">
            DisclosureStateContext
          </code>
          , expose the parent&apos;s current state so a custom child can react
          to it, which is how vip/ui animates disclosure panels.
        </p>
        <p className="mt-4">
          <ReactAriaLink href="https://react-aria.adobe.com/customization#consuming-contexts">
            Read the React Aria consuming contexts guide
          </ReactAriaLink>
        </p>
      </section>

      <section id="forms" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">Forms</h2>
        <p className="mt-4 max-w-[670px] text-sm leading-7 text-muted-foreground">
          vip/ui&apos;s{" "}
          <Link
            href="/components/form"
            className="text-primary underline underline-offset-4"
          >
            Form
          </Link>{" "}
          wraps the React Aria form, so submission works through the HTML form
          element: use <code className="font-mono text-foreground">action</code>{" "}
          with React server functions or{" "}
          <code className="font-mono text-foreground">onSubmit</code>, and read
          values from{" "}
          <code className="font-mono text-foreground">FormData</code> or
          controlled value and onChange props. Validation supports the
          browser&apos;s constraint rules, a{" "}
          <code className="font-mono text-foreground">validate</code> function,
          real-time invalid state, and server errors passed through{" "}
          <code className="font-mono text-foreground">validationErrors</code>{" "}
          keyed by field name, with each field rendering its message beside the
          control.
        </p>
        <p className="mt-4">
          <ReactAriaLink href="https://react-aria.adobe.com/forms">
            Read the React Aria forms guide
          </ReactAriaLink>
        </p>
      </section>

      <section id="internationalization" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Internationalization
        </h2>
        <p className="mt-4 max-w-[670px] text-sm leading-7 text-muted-foreground">
          Wrap the application in{" "}
          <code className="font-mono text-foreground">I18nProvider</code> to set
          the locale for every child that reads it with{" "}
          <code className="font-mono text-foreground">useLocale</code>, in place
          of the browser default. Date, time, number, and calendar components
          format values with it and use its reading direction. vip/ui does not
          mount the provider; add it once near the app root. Validation error
          messages are the exception: the browser localizes those, and{" "}
          <code className="font-mono text-foreground">I18nProvider</code> does
          not change them.
        </p>
        <p className="mt-4">
          <ReactAriaLink href="https://react-aria.adobe.com/I18nProvider">
            Read the React Aria I18nProvider guide
          </ReactAriaLink>
        </p>
      </section>
    </article>
  );
}

function ReactAriaLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
