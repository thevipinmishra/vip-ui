import {
  Code,
  ExternalLink,
  GuidePage,
  GuideSection,
  guideMetadata,
  List,
  TextLink,
} from "@/components/docs/guide";

export const metadata = guideMetadata("/components/react-aria");

export default function ReactAriaPage() {
  return (
    <GuidePage href="/components/react-aria">
      <GuideSection id="props" title="Props">
        <p>
          A component accepts the props of the React Aria component that it
          wraps. The API reference on a component page lists the props that
          vip/ui adds. It links to the React Aria props for the rest.
        </p>
      </GuideSection>

      <GuideSection id="forms" title="Forms">
        <p>
          The vip/ui <TextLink href="/components/form">Form</TextLink> wraps the
          React Aria <Code>Form</Code>. It renders a native{" "}
          <Code>{"<form>"}</Code> element.
        </p>
        <List>
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
        </List>
        <p>Each field shows its error message below the input.</p>
        <p>
          <ExternalLink href="https://react-aria.adobe.com/forms">
            React Aria forms guide
          </ExternalLink>
        </p>
      </GuideSection>

      <GuideSection id="internationalization" title="Internationalization">
        <p>
          React Aria uses the browser locale by default. To set a different
          locale, wrap your app in <Code>I18nProvider</Code>. vip/ui does not
          add the provider.
        </p>
        <List>
          <li>
            Date, time, number, and calendar components use the locale to format
            values.
          </li>
          <li>Components get the reading direction from the locale.</li>
          <li>
            <Code>I18nProvider</Code> does not change validation messages. They
            use the browser language.
          </li>
        </List>
        <p>
          <ExternalLink href="https://react-aria.adobe.com/I18nProvider">
            React Aria I18nProvider guide
          </ExternalLink>
        </p>
      </GuideSection>

      <GuideSection id="contexts" title="Contexts and slots">
        <p>
          React Aria components send props to their parts through React context.
          A <Code>NumberField</Code> gives its increment and decrement buttons
          their <Code>onPress</Code> handlers. Slots identify repeated parts,
          such as <Code>slot=&quot;increment&quot;</Code> and{" "}
          <Code>slot=&quot;decrement&quot;</Code>. Props that you set on a part
          override the context props.
        </p>
        <p>
          To replace a part with your own, use the parent context. Do not write
          the behavior again.
        </p>
        <List>
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
        </List>
        <p>
          <ExternalLink href="https://react-aria.adobe.com/customization#contexts">
            React Aria contexts guide
          </ExternalLink>
        </p>
      </GuideSection>
    </GuidePage>
  );
}
