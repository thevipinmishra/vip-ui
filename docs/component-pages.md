# Component page authoring

Use the teaching sequence on shadcn's Base UI pages for [Accordion](https://ui.shadcn.com/docs/components/base/accordion), [Alert](https://ui.shadcn.com/docs/components/base/alert), [Button](https://ui.shadcn.com/docs/components/base/button), [Button Group](https://ui.shadcn.com/docs/components/base/button-group), [Select](https://ui.shadcn.com/docs/components/base/select), [Dialog](https://ui.shadcn.com/docs/components/base/dialog), and [Dropdown Menu](https://ui.shadcn.com/docs/components/base/dropdown-menu). Do not copy their Base UI props, example counts, or installation commands. vip/ui uses React Aria and its own registry.

Every component page follows this order:

1. A plain heading, then a small working preview of the control or its trigger. Keep interaction hints beside the preview.
2. **Installation** with one-time setup, a CLI command when a public registry URL exists, and complete manual files and dependencies.
3. **Usage** with a complete source file. `ComponentPage` reads the primary `src/components/docs/*-demo.tsx` file for both Usage and the preview's Code tab, rewriting component imports to the consumer's `@/components/vip-ui/` path. Keep this demo small and self-contained.
4. **Composition** only when several exported parts need explanation. Maintain the part descriptions in `src/components/docs/component-compositions.ts`; don't publish JSX with undefined handlers as runnable code.
5. Separately named use-case sections. Put a short instruction before each preview, then show the source for that same demo in the Code tab. Add examples for distinct states, variants, and compositions. A simple component may need only the main preview; don't invent variants just to fill the page. If the first demo needs a large collection or extra controls to show a use case, put it in a named section and give Usage a smaller `<slug>-basic-demo.tsx`. Do not add a generic Examples heading or one giant demo that mixes unrelated behaviors.
6. **API reference** for vip/ui props, plus a link to the React Aria API for inherited behavior.

Our Preview/Code switch stays a tab control to match site conventions, even though shadcn uses an inline View Code control. Preserve the selected background, keyboard focus, full-source Copy, file icon and filename, and the Show all control for long source. Code colors follow the site theme. Check light and dark themes, narrow screens, and source overflow.

For a new page, edit the route in `src/app/components/<slug>/page.tsx` or the entry in `src/app/components/[slug]/page.tsx`. Add distinct demos in `src/components/docs/` and list them in the page's `examples` prop. The registry generator includes vip/ui components imported by a page's demo files in that component's install payload. Check the generated item when an example adds a new import; if the file is not included, explain how to install it. Use shared `Button` and `ButtonLink` in demos, and follow the exports in `src/components/ui/` rather than shadcn's similarly named components.
