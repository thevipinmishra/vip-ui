import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideHeader, GuidePager } from "@/components/docs/guide-header";

export const metadata: Metadata = {
  title: "React Aria | vip/ui",
  description:
    "How vip/ui uses React Aria contexts, forms, and internationalization. Each topic links to the React Aria guide.",
};

export default function ReactAriaPage() {
  return (
    <article className="max-w-[670px]">
      <GuideHeader
        title="React Aria"
        description="Interactive vip/ui components wrap React Aria Components. React Aria supplies their behavior, state, and accessibility."
      />

      <Section
        id="contexts"
        title="Contexts"
        href="https://react-aria.adobe.com/customization#contexts"
        linkLabel="React Aria contexts guide"
      >
        <p>
          React Aria components send props to their children through React
          context.
        </p>
        <ul className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground">
          <li>
            A <Code>NumberField</Code> gives its increment and decrement buttons
            their <Code>onPress</Code> handlers.
          </li>
          <li>
            Slots identify repeated parts, such as{" "}
            <Code>slot=&quot;increment&quot;</Code> and{" "}
            <Code>slot=&quot;decrement&quot;</Code>.
          </li>
          <li>Props that you set on a component override the context props.</li>
        </ul>
      </Section>

      <Section
        id="consuming-contexts"
        title="Consuming contexts"
        href="https://react-aria.adobe.com/customization#consuming-contexts"
        linkLabel="React Aria consuming contexts guide"
      >
        <p>
          To replace part of a component with your own, use the parent context.
          Do not write the behavior again.
        </p>
        <ul className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground">
          <li>
            <Code>useContextProps</Code> merges your props with the context
            props. It supports the <Code>slot</Code> prop.
          </li>
          <li>
            <Code>useSlottedContext</Code> reads the context value without a
            merge.
          </li>
          <li>
            State contexts give the parent state. vip/ui uses{" "}
            <Code>DisclosureStateContext</Code> to animate disclosure panels.
          </li>
        </ul>
      </Section>

      <Section
        id="forms"
        title="Forms"
        href="https://react-aria.adobe.com/forms"
        linkLabel="React Aria forms guide"
      >
        <p>
          The vip/ui{" "}
          <Link
            href="/components/form"
            className="text-primary underline underline-offset-4"
          >
            Form
          </Link>{" "}
          wraps the React Aria <Code>Form</Code>. It renders a native{" "}
          <Code>{"<form>"}</Code> element.
        </p>
        <ul className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground">
          <li>
            To submit, use <Code>action</Code> or <Code>onSubmit</Code>.
          </li>
          <li>
            To read values, use <Code>FormData</Code> or controlled{" "}
            <Code>value</Code> and <Code>onChange</Code> props.
          </li>
          <li>
            To validate, use native constraints, such as <Code>isRequired</Code>
            , or a <Code>validate</Code> function.
          </li>
          <li>
            To show server errors, pass <Code>validationErrors</Code> to the
            form. Use the field names as keys.
          </li>
        </ul>
        <p>Each field shows its error message below the input.</p>
      </Section>

      <Section
        id="internationalization"
        title="Internationalization"
        href="https://react-aria.adobe.com/I18nProvider"
        linkLabel="React Aria I18nProvider guide"
      >
        <p>
          React Aria uses the browser locale by default. To set a different
          locale, wrap your app in <Code>I18nProvider</Code>. vip/ui does not
          add the provider.
        </p>
        <ul className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground">
          <li>
            Date, time, number, and calendar components use the locale to format
            values.
          </li>
          <li>Components get the reading direction from the locale.</li>
          <li>
            <Code>I18nProvider</Code> does not change validation messages. They
            use the browser language.
          </li>
        </ul>
      </Section>

      <GuidePager
        previous={{ href: "/components/installation", label: "Installation" }}
        next={{ href: "/components", label: "All components" }}
      />
    </article>
  );
}

function Section({
  id,
  title,
  href,
  linkLabel,
  children,
}: {
  id: string;
  title: string;
  href: string;
  linkLabel: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mbs-14 scroll-mbs-28">
      <h2 className="text-[23px] font-semibold tracking-[-0.045em]">{title}</h2>
      <div className="mbs-4 grid gap-4 text-sm leading-7 text-muted-foreground">
        {children}
        <p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary active:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {linkLabel}
            <ArrowUpRightIcon size={16} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-foreground">{children}</code>;
}
