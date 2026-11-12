# vip/ui

Accessible React components that you copy into your project through a shadcn-compatible registry.

[![CI](https://github.com/thevipinmishra/vip-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/thevipinmishra/vip-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Documentation](https://vip-ui.dev/components) · [Installation](https://vip-ui.dev/components/installation) · [Blocks](https://vip-ui.dev/blocks) · [Changelog](CHANGELOG.md)

## Features

- **You own the source.** The shadcn CLI copies each component into your project. vip/ui is not an npm package.
- **Accessible.** React Aria Components supply the keyboard, focus, and screen reader behavior.
- **Tailwind CSS v4.** Tailwind Variants recipes define the variants and sizes. Colors come from your shadcn theme.
- **Motion.** Motion animates state changes. Each animation obeys the reduced motion setting of the operating system.
- **One size scale.** Buttons, fields, toggles, and tabs share five heights, from 28px to 56px.
- **No Next.js lock-in.** Components and blocks do not import from `next/`. You can use them in Vite and other React apps.
- **More than components.** The site also has color scales, themes, a chart gallery, and full-page blocks.

## Requirements

- React 19 and TypeScript
- Tailwind CSS v4.1 or later
- A shadcn theme that uses CSS variables
- shadcn CLI 4.7.0 or later
- Icons from `@phosphor-icons/react`. The CLI installs it as a dependency.

## Installation

### Use the shadcn CLI

1. Follow the [project setup](https://vip-ui.dev/components/installation#setup).
2. In `components.json`, set `tsx` and `tailwind.cssVariables` to `true`.
3. Add a component:

   ```bash
   pnpm dlx shadcn@latest add https://vip-ui.dev/r/button.json
   ```

The CLI writes the files to a `vip-ui/` folder in your components alias. It does not change the files in your shadcn `components/ui/` folder.

### Use the registry namespace

Add vip/ui to `registries` in your `components.json`:

```json
{
  "registries": {
    "@vip-ui": "https://vip-ui.dev/r/{name}.json"
  }
}
```

Then add items by name:

```bash
pnpm dlx shadcn@latest add @vip-ui/button
```

### Install manually

1. Open a [component page](https://vip-ui.dev/components).
2. Select the **Manual** tab.
3. Copy the files and install the packages that the tab lists.
4. Add the theme CSS from the [installation guide](https://vip-ui.dev/components/installation#manual).

A manual install does not need `components.json`.

## Usage

Import the component from your components folder:

```tsx
import { Button } from "@/components/vip-ui/button";

export function SaveButton() {
  return <Button>Save</Button>;
}
```

To change the styles of an installed component, read [Styling](https://vip-ui.dev/components/styling).

## Documentation

| Page                                        | Contents                                                                      |
| ------------------------------------------- | ----------------------------------------------------------------------------- |
| [Components](https://vip-ui.dev/components) | Live previews, source files, install commands, and API references             |
| [Blocks](https://vip-ui.dev/blocks)         | Dashboard, authentication, settings, AI, marketing, commerce, and other pages |
| [Charts](https://vip-ui.dev/charts)         | A TanStack Charts gallery and a chart frame that you can use again            |
| [Colors](https://vip-ui.dev/colors)         | Color scales with contrast checks                                             |
| [Themes](https://vip-ui.dev/themes)         | Themes made from the color scales                                             |
| [llms.txt](https://vip-ui.dev/llms.txt)     | A list of all docs pages for AI tools                                         |

## Development

You need Node.js 22.13 or later and pnpm through Corepack.

```bash
corepack enable
pnpm install
pnpm dev
```

Open <http://localhost:3000/components>.

| Script                | Action                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `pnpm dev`            | Generates the registry, then starts the development server.                                 |
| `pnpm build`          | Generates the registry, then makes a production build.                                      |
| `pnpm lint`           | Checks the code with Biome.                                                                 |
| `pnpm format`         | Formats the code with Biome.                                                                |
| `pnpm registry:build` | Writes the registry files to `public/r/`, `registry.json`, and `registry/generated/`.       |
| `pnpm seo:audit`      | Checks titles, descriptions, canonicals, robots, sitemaps, and OG images on a running site. |
| `pnpm palette:build`  | Generates the color scales.                                                                 |

Canonical URLs, Open Graph URLs, `robots.txt`, the sitemap, and the manifest all resolve to `https://vip-ui.dev` from the `SITE_DOMAIN` constant in `src/lib/site-url.ts`. Set `NEXT_PUBLIC_SITE_URL` only when serving the site from a different HTTPS origin, for example a self-hosted copy; a `*.vercel.app` deployment host is ignored. Set `NEXT_PUBLIC_REGISTRY_URL` if the registry is served from a different origin.

## Contributing

Read the [contributing guide](CONTRIBUTING.md) before you open a pull request. It gives the project layout, the steps to add a component, and the checks to run. Before a large change, open an issue.

## Security

Do not open a public issue for a security problem. Read the [security policy](SECURITY.md) for the private report steps.

## Acknowledgments

vip/ui uses these projects:

- [React Aria](https://react-aria.adobe.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://www.tailwind-variants.org)
- [Motion](https://motion.dev)
- [TanStack Charts](https://tanstack.com)

## License

vip/ui uses the [MIT License](LICENSE).
