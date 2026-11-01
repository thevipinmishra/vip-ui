# vip/ui

vip/ui is a collection of React components distributed as source files through a shadcn-compatible registry. React Aria handles keyboard and focus behavior. Tailwind CSS v4 and Tailwind Variants handle styles. Motion handles animated state changes. The site also has color scales, themes made from them, a chart gallery, and blocks. vip/ui is not an npm component package.

[Component catalog](https://vip-ui.vercel.app/components) · [Installation guide](https://vip-ui.vercel.app/components/installation) · [Blocks](https://vip-ui.vercel.app/blocks)

## Install a component

Use a React 19 and TypeScript app with Tailwind CSS v4 and a shadcn theme that uses CSS variables. Components do not import from `next/`, so you can use them in a React app without Next.js, such as a Vite app. Blocks install as Next.js App Router routes, so they need Next.js.

1. Follow the [project setup](https://vip-ui.vercel.app/components/installation#setup). In `components.json`, set `tsx` and `tailwind.cssVariables` to `true`.
2. Install a component. For example:

   ```bash
   pnpm dlx shadcn@latest add https://vip-ui.vercel.app/r/vip-button.json
   ```

3. Import it from your components directory. With the default alias:

   ```tsx
   import { Button } from "@/components/vip-ui/button";

   export function SaveButton() {
     return <Button>Save</Button>;
   }
   ```

The CLI installs the required packages and files under `aliases.components/vip-ui/`. It also adds the Tailwind plugin and the theme variables that the component uses to your global CSS file. It does not replace your shadcn components. To install without the CLI, use the Manual tab on a [component page](https://vip-ui.vercel.app/components); it lists the files and packages to copy. Manual installation does not require `components.json`. See [styling and variants](docs/styling.md) for ways to change installed styles.

## Explore

- [Components](https://vip-ui.vercel.app/components) have live previews, source files, install steps, and API references.
- [Charts](https://vip-ui.vercel.app/charts) include a TanStack Charts gallery and a reusable chart frame.
- [Blocks](https://vip-ui.vercel.app/blocks) are complete pages and page sections: a dashboard, stat cards, sign-in and sign-up forms, settings, billing, pricing, a team list, and a file upload. Install commands are on the Blocks pages.

## Run locally

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000/components>. `pnpm dev` also generates the registry files. Before a production build, set `NEXT_PUBLIC_REGISTRY_URL` to the public HTTPS registry origin. Set `NEXT_PUBLIC_SITE_URL` only if the site uses a different origin. See [registry publishing](docs/registry.md) for the build and deploy steps.

Use `pnpm lint` and `pnpm build` to check changes. `pnpm registry:build` regenerates the hosted JSON items and the GitHub registry sources.

## Project layout

| Path                                                | Purpose                                                     |
| --------------------------------------------------- | ----------------------------------------------------------- |
| `src/components/ui/`                                | Component source files                                      |
| `src/components/docs/`, `src/app/components/`       | Component demos and documentation pages                     |
| `src/app/blocks/`, `src/lib/blocks.json`            | Installable Next.js blocks and their catalog                |
| `src/lib/catalog.json`                              | Component names, groups, navigation order, and descriptions |
| `scripts/generate-registry.mjs`                     | Registry generator                                          |
| `public/r/`, `registry.json`, `registry/generated/` | Generated registry files                                    |
| `src/app/globals.css`                               | Site theme and Tailwind settings                            |

## Contributing

See [styling](docs/styling.md) for Tailwind Variants recipes, and [registry publishing](docs/registry.md) for release steps.

## License

MIT. See [LICENSE](LICENSE).
