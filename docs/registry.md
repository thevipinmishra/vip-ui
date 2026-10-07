# Publish the vip/ui registry

vip/ui publishes shadcn-compatible JSON items at `/r/vip-<name>.json` and a catalog at `/r/registry.json`. The same generated sources support a public GitHub registry. Components are React and TypeScript files; the `vip-example-*` blocks contain Next.js App Router routes.

## Generate the registry

```bash
pnpm registry:build
```

`scripts/generate-registry.mjs` reads `src/components/ui/` and the installable examples in `src/app/examples/`. It writes:

| Path | Purpose |
| --- | --- |
| `public/r/vip-*.json` | Hosted item payloads, including file contents and package dependencies |
| `public/r/registry.json` | Hosted catalog for `shadcn list` and `search`; file entries contain paths, not contents |
| `registry.json` | Root source catalog for GitHub installs |
| `registry/generated/` | Portable source files referenced by the root catalog |

Commit these generated files alongside changes to their source. Never edit the generated copies. Each component item includes its dependency files, with explicit `@components/vip-ui/` targets. Components that use `cn` include a local `utils.ts` that wraps it from `tailwind-variants`; the generator includes that package in their dependencies. Components with `tv()` recipes also declare `tailwind-variants` directly. The Manual tab shows the same files and packages as the CLI, without relying on the consumer's shadcn `lib/utils.ts`. The generator converts React Aria state shorthands into data-attribute selectors, so consumers do not need this site's Tailwind plugin. Example items also include the components they use. There are no bare-name `registryDependencies` that could mistakenly resolve to upstream shadcn components.

## Host the static catalog

Set `NEXT_PUBLIC_REGISTRY_URL` to the site's public HTTPS origin before running the production build. This sets `homepage` in both generated catalogs and enables install commands on component pages. Without it, the catalogs use `http://localhost:3000` for local development and the published component pages do not show CLI commands.

Serve `public/r/` without changing filenames. The catalog and items must be accessible as JSON at the same directory level:

```text
https://YOUR_DOMAIN/r/registry.json
https://YOUR_DOMAIN/r/vip-button.json
```

Check from outside the deployment, then use the CLI from a project with `components.json`:

```bash
pnpm dlx shadcn@latest list https://YOUR_DOMAIN/r/registry.json
pnpm dlx shadcn@latest search https://YOUR_DOMAIN/r/registry.json --query button
pnpm dlx shadcn@latest view https://YOUR_DOMAIN/r/vip-button.json
pnpm dlx shadcn@latest add https://YOUR_DOMAIN/r/vip-button.json --dry-run
```

`list` and `search` read the catalog. `view` and `add` read an item. For a real install, remove `--dry-run`. Consumers must complete the [one-time CSS setup](../README.md#install-a-component) first; the registry does not overwrite a project's shadcn theme. Check existing files with `--diff` or `--view` before applying an update. See shadcn's [registry getting started](https://ui.shadcn.com/docs/registry/getting-started) guide for the HTTP contract.

### Configure a namespace

Users can add a namespace to their `components.json` with the CLI:

```bash
pnpm dlx shadcn@latest registry add '@vip-ui=https://YOUR_DOMAIN/r/{name}.json'
pnpm dlx shadcn@latest add @vip-ui/vip-button
```

The URL template resolves `@vip-ui/vip-button` to `/r/vip-button.json`. The catalog stays at `/r/registry.json`. Alternatively, add the same mapping under `registries` in `components.json`:

```json
{
  "registries": {
    "@vip-ui": "https://YOUR_DOMAIN/r/{name}.json"
  }
}
```

Keep the rest of the consumer's existing `components.json`; do not replace their style, CSS path, or aliases. The `@components/` targets in item payloads resolve against their `aliases.components` setting. See shadcn's [components.json reference](https://ui.shadcn.com/docs/components-json).

## Publish from GitHub

For installs without a registry server, commit the generated root `registry.json` **and** `registry/generated/` to a public GitHub repository. Rebuild with a real public `NEXT_PUBLIC_REGISTRY_URL` before committing so the root catalog does not advertise the local development homepage. The GitHub CLI reads the root catalog and source files, not `public/r/vip-*.json`.

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
