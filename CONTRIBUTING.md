# Contributing to vip/ui

Thank you for your help. This guide tells you how to set up the project, add a component, and prepare a pull request.

Before you start a large change, open an issue. Tell us what you want to change and why. This prevents duplicate work.

## Prerequisites

- Node.js 22.13 or later.
- pnpm 12.14.0, through Corepack. The version is set in the `packageManager` field of `package.json`.

Enable Corepack once:

```bash
corepack enable
```

If your Node.js version does not include Corepack, install it first with `npm install -g corepack`.

## Run the site

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000/components>. `pnpm dev` runs `pnpm registry:build` first, then starts Next.js.

## Where things live

| Path | Contents |
| --- | --- |
| `src/components/ui/` | Component source files. Each file becomes a registry item. |
| `src/components/docs/` | Demos and the parts of the docs site. |
| `src/app/components/` | Component docs routes. Most components use `[slug]/page.tsx`. |
| `src/app/blocks/` | Full-page blocks. `src/lib/blocks.json` lists them. |
| `src/lib/catalog.json` | Component names, groups, navigation order, and the one description of each component. |
| `src/lib/catalog.ts` | Catalog helpers and React Aria links. |
| `src/lib/internal-descriptions.json` | Descriptions of shared files that have no docs page. |
| `src/lib/component-examples.ts` | Usage demo and examples for each component page. |
| `src/components/docs/catalog-preview-registry.ts` | The preview on each card of the component index. |
| `src/lib/component-api.ts` | API reference tables. |
| `src/components/docs/component-compositions.ts` | Part trees for components that have more than one part. |
| `src/lib/registry-docs.ts` | Manual install plan, registry namespace, and the list of shared files. |
| `src/lib/motion.ts` | Motion easing, durations, and springs. |
| `src/lib/utils.ts` | The `cn` helper. |
| `src/app/globals.css` | Site theme and Tailwind settings. |
| `scripts/generate-registry.mjs` | Registry generator. |
| `public/r/`, `registry.json`, `registry/generated/` | Generated registry files. |

## Generated files

`pnpm registry:build` writes these files:

- `public/r/` (the item JSON files, `registry.json`, and `setup.css`)
- `registry.json` at the root
- `registry/generated/`

Do not edit these files by hand. Change the source, then run `pnpm registry:build`. Commit the generated files in the same pull request as the source change.

On Windows, `pnpm registry:build` can fail to write to `public/r` while `pnpm dev` runs. If this occurs, stop the dev server, run the build, then start the server again.

## Add a component

Use a kebab-case slug, for example `date-field`. The registry item name is `vip-<slug>`.

1. Write the component in `src/components/ui/<slug>.tsx`. Import other components with relative paths, such as `./field-styles`. From `src/lib`, import only `@/lib/utils` and `@/lib/motion`. The generator stops on other `@/` imports.
2. Add an item to the correct group in `src/lib/catalog.json`, with `slug`, `name`, and `description`. Write the description as one sentence that starts with a third-person verb, for example "Selects one option from a list in a popover." The catalog, the component page, the Markdown export, `llms.txt`, and the registry all show this text. If the component wraps a React Aria component, add its docs link to `reactAriaDocs` in `src/lib/catalog.ts`.
3. If the file has no docs page of its own and other components import it, add its description to `src/lib/internal-descriptions.json` and its slug to `sharedFileSlugs` in `src/lib/registry-docs.ts`. Otherwise the registry build or the page build fails.
4. Add a preview for the component index to `catalogPreviews` in `src/components/docs/catalog-preview-registry.ts`. Overlays must not open from a preview; use a drawing, as in `catalog-preview-overlays.tsx`.
5. Add demos to `src/components/docs/`. Name the usage demo `<slug>-demo.tsx` or `<slug>-basic-demo.tsx`. Name each example `<slug>-<example>-demo.tsx`.
6. Add the page data to `pageSources` in `src/lib/component-examples.ts`: `usage` and `examples`. Each example has a `title`, an optional `description`, and a `sourcePath`.
7. Add the page to `src/app/components/[slug]/page.tsx`. Add an item to `entries`. Add the usage demo to `basicPreviews` if it is not `<slug>-demo.tsx`. Add the example demos to `examplePreviews` in the same order as `examples`.
8. Add the API table to `componentApi` in `src/lib/component-api.ts`. Use `apiPart<typeof YourComponent>()`, so TypeScript checks each prop name against the component props.
9. If the component has more than one part, add its part tree to `src/components/docs/component-compositions.ts`.
10. Run `pnpm registry:build` and commit the generated files.

To change an existing component, edit its source file and its docs data. Then run `pnpm registry:build`.

## Code conventions

- Use React Aria Components for interactive behavior: focus, keyboard, press, selection, and overlays. Do not write your own keyboard or focus logic when React Aria has it.
- Pass `className` through `composeRenderProps` on React Aria components, then merge it with `cn` from `@/lib/utils`.
- Add a `data-slot` attribute to each rendered part, for example `data-slot="switch-button"`.
- Use Tailwind CSS v4 and Tailwind Variants. Use a `tv()` recipe when a component has a variant or size axis. Keep each variant value a complete class string. See [styling and variants](https://vip-ui.vercel.app/components/styling).
- Use theme colors such as `bg-primary` and `text-foreground`. Do not use fixed color values.
- Use the shared size scale. `src/components/ui/size.tsx` has the `Size` type, `SizeProvider`, and `useSize`. The control heights are xs 28px, sm 36px, md 44px, lg 48px, and xl 56px. Groups pass their size to their items through `SizeProvider`.
- Every animated component must respect reduced motion. Use `motion-safe:` and `motion-reduce:` classes for CSS motion. For Motion, use `useReducedMotion` with `transitionFor` from `@/lib/motion`.
- Use the easing, duration, and spring tokens in `src/lib/motion.ts`. Do not add new timing values in a component.
- Do not add code comments unless the code is not clear without them. Keep `biome-ignore` comments.
- Use LF line endings. `.gitattributes` sets this. Biome fails on CRLF.
- Biome formats and lints the code. Run `pnpm format` to fix formatting.

## UI copy

Write labels, descriptions, examples, and docs in ASD-STE100 Simplified Technical English:

- Use short sentences and the active voice.
- Write one instruction in each sentence.
- Use simple words. Use one word for one meaning.
- Keep titles short. Do not add a description that only repeats the title.

## Before you open a pull request

Run these checks from the repository root:

1. `pnpm lint`
2. `pnpm exec tsc --noEmit`
3. `pnpm registry:build`, then `git status`

Next.js generates route types during `pnpm dev`. If the dev server did not run since your last route change, run `pnpm exec next typegen` before `tsc`.

After `pnpm registry:build`, the only changes in `public/r`, `registry.json`, and `registry/generated` must come from your source change. Commit them.

Then:

- Open the component page on the local site. Make sure the demos and the API table are correct.
- Test with the keyboard only.
- Turn on reduced motion in your operating system. Make sure the component still works and does not animate.
- Keep each pull request to one change.
- Fill in the pull request template.

## License

When you contribute, you agree that your contribution is licensed under the [MIT License](LICENSE).
