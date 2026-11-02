# Publish the vip/ui registry

vip/ui publishes shadcn-compatible JSON items at `/r/vip-<name>.json` and a catalog at `/r/registry.json`. The same generated sources support a public GitHub registry. Component items contain React and TypeScript files. Block items, such as `vip-dashboard-01`, also contain Next.js App Router routes.

The confirmed public origin is `https://vip-ui.dev`.

## Generate the registry

```bash
pnpm registry:build
```

`scripts/generate-registry.mjs` reads `src/components/ui/`, `src/lib/utils.ts`, `src/lib/motion.ts`, and the blocks in `src/app/blocks/`. It reads item descriptions from `src/lib/catalog.json` and, for files without a docs page, from `src/lib/internal-descriptions.json`. Each block folder must have an entry in `src/lib/blocks.json`, and each item must have a description, or the build throws. It writes:

| Path                     | Purpose                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `public/r/vip-*.json`    | Hosted item payloads, including file contents and package dependencies                  |
| `public/r/registry.json` | Hosted catalog for `shadcn list` and `search`; file entries contain paths, not contents |
| `public/r/setup.css`     | Theme CSS that the installation guide shows for a manual install                        |
| `registry.json`          | Root source catalog for GitHub installs                                                 |
| `registry/generated/`    | Portable source files referenced by the root catalog                                    |

Commit these generated files alongside changes to their source. Never edit the generated copies.

### Item graph

Each item ships only its own file, with an explicit `@components/vip-ui/` target. An item gets the files that it imports from other items through `registryDependencies`. `src/lib/utils.ts` and `src/lib/motion.ts` become the `registry:lib` items `vip-utils` and `vip-motion`. Each file in `src/components/ui/` becomes a `registry:ui` item, `vip-<file>`. This includes shared files without a docs page, such as `vip-size`, `vip-button-styles`, `vip-field-styles`, `vip-item-highlight`, `vip-collapsible-panel`, and `vip-date-segment`. A component that imports another component, such as Select and `popover.tsx`, links that component's item. The shadcn CLI resolves the graph and writes each file one time. A second install skips identical files and does not replace a shared file under older components.

Each `registryDependencies` entry is a full URL, such as `https://vip-ui.dev/r/vip-utils.json`. The generator builds the URL from `NEXT_PUBLIC_REGISTRY_URL`. It throws if an entry is a bare name, if a URL does not resolve to a generated item, or if the graph has a cycle. Bare names resolve to upstream shadcn components, and namespaced names need configuration in the consumer's `components.json`. A full URL works for every consumer. One item ships each file, and `catalogItem()` throws if two items write the same file.

Each item declares only what its own file needs: the npm `dependencies`, and the theme variables that the file uses. Components that use `cn` link `vip-utils`, which wraps `cn` from `tailwind-variants` and declares that package. Components that use the shared easing and springs link `vip-motion`, which declares `motion`. Components with `tv()` recipes also declare `tailwind-variants` directly. Items whose file imports `react-aria-components` declare `tailwindcss-react-aria-components` as a dev dependency and add `@plugin tailwindcss-react-aria-components` to the consumer's CSS. The plugin supplies React Aria state variants such as `selected:` and `pressed:`, which the generated sources keep. The CLI merges the packages, plugin, and variables of all items in the graph.

### Manual install

`readRegistryItem()` in `src/lib/registry-docs.ts` follows `registryDependencies` through `public/r/` and returns all files and packages of the graph. The Manual tab covers the same files and runtime packages as the CLI, without relying on the consumer's shadcn `lib/utils.ts`. It shows the component's own file in full and lists every other file it needs as a copyable row. For a manual install, the plugin and the theme CSS come from the installation guide. `manualInstallPlan()` sorts each file into a component, which has a docs page, or a shared file, which `sharedFiles` lists and the installation guide's Shared files section shows one time. The descriptions of shared files come from `src/lib/internal-descriptions.json`. Add a new shared file to `sharedFileSlugs`, or the page build throws.

### Component install payloads

`createItem()` reads the imports of the component source. It does not add files or packages that only documentation demos import. `vip-button` installs `button.tsx` and declares `motion` and `react-aria-components`. It links `vip-button-styles`, `vip-motion`, and `vip-size`, so the CLI also writes `button-styles.tsx`, `motion.ts`, `size.tsx`, and `utils.ts`, and installs `tailwind-variants`. Other components in a demo need their own install command if someone copies that demo. Block items ship their route files and link the items that their routes import.

## Configure the public origin

Two `NEXT_PUBLIC_` variables control absolute links. Next.js inlines them at build time, so they must be present when the site is built, not only at request time.

| Variable                   | Purpose                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_REGISTRY_URL` | Public HTTPS origin used for the `homepage` in both generated catalogs and for the CLI install commands on component pages, block pages, and the installation guide. Without it, the catalogs use `https://vip-ui.dev`. The commands use `http://localhost:3000` in development, and a production build shows no CLI command. |
| `NEXT_PUBLIC_SITE_URL`     | Optional canonical origin for `metadataBase`, the sitemap, robots, `llms.txt`, and Markdown exports. When it is unset, `src/lib/site-url.ts` falls back to `NEXT_PUBLIC_REGISTRY_URL`.                                                                                                                                        |

Set `NEXT_PUBLIC_REGISTRY_URL=https://vip-ui.dev` in the Vercel project's build environment (Production, and Preview too if previews should show install commands) before redeploying. Do not end the value with a slash; the generator writes it to `homepage` as it is. `src/lib/site-url.ts` throws during a production build when neither variable is set, so a deployment cannot silently publish localhost links.

`scripts/generate-registry.mjs` runs outside the Next.js runtime and does not load `.env*` files. To use a different origin, set the variable in the shell before you regenerate locally:

```powershell
$env:NEXT_PUBLIC_REGISTRY_URL="https://vip-ui.dev"; pnpm registry:build
```

Set `NEXT_PUBLIC_SITE_URL` only when the site is served from a different origin than the registry; otherwise the registry origin is used for both.

### Confirm the published output

After setting the environment variable and redeploying, check the deployment from outside:

```bash
curl -s https://vip-ui.dev/r/registry.json
curl -s https://vip-ui.dev/r/vip-button.json
curl -s https://vip-ui.dev/components/button
curl -s https://vip-ui.dev/components/button.md
curl -s https://vip-ui.dev/llms.txt
curl -s https://vip-ui.dev/sitemap.xml
```

Acceptance checks:

- `/r/registry.json` contains `"homepage": "https://vip-ui.dev"`, and `/r/vip-button.json` returns valid JSON.
- `/components/button` shows `pnpm dlx shadcn@latest add https://vip-ui.dev/r/vip-button.json`.
- `/components/button.md`, `/llms.txt`, `/sitemap.xml`, and page metadata use `https://vip-ui.dev` for absolute links.
- No published file under `registry.json`, `registry/generated/`, or `public/r/` contains `localhost`.
- Every `registryDependencies` URL in `/r/vip-select.json` starts with `https://vip-ui.dev/r/` and returns valid JSON.
- A clean consumer installs and renders Button using the deploy command below.

## Host the static catalog

Serve `public/r/` without changing filenames. The catalog and items must be accessible as JSON at the same directory level:

```text
https://vip-ui.dev/r/registry.json
https://vip-ui.dev/r/vip-button.json
```

Check from outside the deployment, then use the CLI from a project with `components.json`:

```bash
pnpm dlx shadcn@latest list https://vip-ui.dev/r/registry.json
pnpm dlx shadcn@latest search https://vip-ui.dev/r/registry.json --query button
pnpm dlx shadcn@latest view https://vip-ui.dev/r/vip-button.json
pnpm dlx shadcn@latest add https://vip-ui.dev/r/vip-button.json --dry-run
```

`list` and `search` read the catalog. `view` and `add` read an item. For a real install, remove `--dry-run`. The consumer's `components.json` must set `tsx` and `tailwind.cssVariables` to `true`; see the [project setup](https://vip-ui.dev/components/installation#setup). Items add only the vip/ui theme variables and do not replace the project's shadcn theme. Check existing files with `--diff` or `--view` before applying an update. See shadcn's [registry getting started](https://ui.shadcn.com/docs/registry/getting-started) guide for the HTTP contract.

### Configure a namespace

Users can add a namespace to their `components.json` with the CLI:

```bash
pnpm dlx shadcn@latest registry add '@vip-ui=https://vip-ui.dev/r/{name}.json'
pnpm dlx shadcn@latest add @vip-ui/vip-button
```

The URL template resolves `@vip-ui/vip-button` to `/r/vip-button.json`. The catalog stays at `/r/registry.json`, which `shadcn search @vip-ui` reads. Item names keep the `vip-` prefix: a template such as `/r/vip-{name}.json` would also change the catalog URL to `/r/vip-registry.json`, and the catalog names would not resolve. `@vip` is a shorter option, but `@vip-ui` matches the catalog name and the domain. The shadcn registry directory had neither name on 2026-11-01. The namespace is optional, because the `registryDependencies` of each item are full URLs. Alternatively, add the same mapping under `registries` in `components.json`:

```json
{
  "registries": {
    "@vip-ui": "https://vip-ui.dev/r/{name}.json"
  }
}
```

Keep the rest of the consumer's existing `components.json`; do not replace their style, CSS path, or aliases. The `@components/` targets in item payloads resolve against their `aliases.components` setting. See shadcn's [components.json reference](https://ui.shadcn.com/docs/components-json).

## Publish from GitHub

For installs without a registry server, commit the generated root `registry.json` **and** `registry/generated/` to a public GitHub repository. The root catalog uses `NEXT_PUBLIC_REGISTRY_URL`, or `https://vip-ui.dev` when it is not set, as its `homepage`. For a different origin, set the variable before you regenerate and commit. The GitHub CLI reads the root catalog and source files, not `public/r/vip-*.json`. The `registryDependencies` in the root catalog are full URLs to the hosted origin, so a GitHub install gets the linked items, such as `vip-utils`, from that origin.

After pushing, validate and inspect using the repository's actual owner and name:

```bash
pnpm dlx shadcn@latest registry validate OWNER/REPO
pnpm dlx shadcn@latest list OWNER/REPO
pnpm dlx shadcn@latest view OWNER/REPO/vip-button
pnpm dlx shadcn@latest add OWNER/REPO/vip-button --dry-run
```

A consumer can then run `pnpm dlx shadcn@latest add OWNER/REPO/vip-button`. No namespace or hosted JSON endpoint is needed for that address. For reproducible installs, use a tag or full commit SHA after the item name. Do not present a GitHub command until the catalog, generated source files, and public repository are actually published. See shadcn's [GitHub registry guide](https://ui.shadcn.com/docs/registry/github).

## Directory listing and health

Submit `@vip-ui` to the [shadcn registry directory](https://ui.shadcn.com/docs/registry/registry-index) only after the public source, HTTPS catalog, and item endpoints are live. The published catalog is flat, with unique names and no `files[].content`. Its items are served beside it at `/r/vip-<name>.json`. The shadcn directory submission happens in `apps/v4/registry/directory.json` in the upstream repository and requires its `pnpm validate:registries` check.

[Registry Health](https://ui.shadcn.com/docs/registry/health) applies only after that directory entry is published. It checks catalog availability and schema hourly, samples item payloads daily, and samples a CLI dry run weekly. GitHub addresses and self-configured namespaces are not monitored. Keep the HTTPS endpoint returning valid JSON, ensure every item remains downloadable, and verify installability from a clean consumer app. Health scores reflect compatibility and availability, not component quality; there is no health badge to claim before directory publication.
