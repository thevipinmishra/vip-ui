# Styling and variants

vip/ui uses [Tailwind Variants v3](https://www.tailwind-variants.org/llms.txt) for reusable styles and class merging. The canonical recipes live in `src/components/ui/`. An installed component owns its copy of the recipe; edit that copy to change its appearance. Theme colors such as `bg-primary` and `text-foreground` come from your shadcn CSS variables, including the extra roles in the [installation guide](/components/installation#theme).

## Change a reusable variant

`button-styles.tsx` defines one `tv()` recipe for `Button` and extends it for `ButtonLink`. Both use the same `variant` and `size` keys. Add a new value to the recipe instead of overriding a button's color or padding at every call site:

```tsx
import { tv, type VariantProps } from "tailwind-variants";

const actionStyles = tv({
  base: "inline-flex items-center rounded-md font-medium",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      quiet: "bg-secondary text-secondary-foreground",
    },
    size: { default: "h-11 px-5", sm: "h-9 px-3" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

type ActionVariant = VariantProps<typeof actionStyles>["variant"];
actionStyles({ variant: "quiet", size: "sm" });
```

Call the installed button recipe as `buttonStyles({ variant: "secondary", size: "sm", className: "w-full" })`, or pass `variant`, `size`, and `className` to `<Button>`. `ButtonLink` inherits the same keys through `extend` and adds a pointer cursor. Keep variant values as complete class strings so Tailwind v4 can scan them. The installed component's `data-variant` and `data-size` attributes remain useful for styling hooks. In components with no visual variant axis, regular Tailwind strings stay in the markup; there is no need to create a recipe for every element.

For multiple parts that always share a variant, use [slots](https://www.tailwind-variants.org/docs/slots). For styles that apply only to a combination of values, use [compound variants](https://www.tailwind-variants.org/docs/compound-variants). Keep reusable recipe definitions near the component rather than changing `defaultConfig` globally in a library.

## Merge classes

Install only `tailwind-variants`; do not add `clsx`, `cn`, or `tailwind-merge` for vip/ui. Use the default `tailwind-variants` entry point, not `/lite`. The default build merges Tailwind utility conflicts in both `tv()` and `cn()`:

```ts
import { cn } from "tailwind-variants";

cn("px-2 py-1", "px-4"); // "py-1 px-4"
cn("text-sm", { "font-semibold": true }); // "text-sm font-semibold"
```

`src/lib/utils.ts` wraps that `cn`, returning `""` for empty input because its TypeScript return type also allows `undefined`. React Aria className callbacks require a string. The registry copies the helper to `vip-ui/utils.ts` when a component needs it. This leaves your existing shadcn `lib/utils.ts` untouched. The Custom tab includes the same helper and dependency as a CLI install. `cx()` concatenates without conflict resolution; `cnMerge()` accepts a per-call merge config and returns a function. We do not use either for the default component styles. See [class resolution](https://www.tailwind-variants.org/docs/class-resolution) for their exact behavior.

For a one-off layout change, pass `className` to the component. Recipes pass it to `tv({ variant, size, className })` after base and variant classes. The last *recognized conflicting* utility wins at the same modifier and specificity. For example, `px-6` replaces `px-5`, while `hover:bg-muted` does not erase a base `bg-primary`. A `className` on a React Aria component can also be a function; vip/ui evaluates it through `composeRenderProps` before merging. Prefer a shared variant for repeated color, radius, or size changes in buttons and demos.

Tailwind's class merger does not understand every custom utility. An arbitrary `shadow-[var(--shadow-card)]` and `shadow-none`, for example, can both remain in the output; the generated CSS order decides which applies. Do not assume the merger resolves selectors, unknown plugin utilities, or every arbitrary value. Keep state-specific classes in the recipe or use [createTV with `twMergeConfig`](https://www.tailwind-variants.org/docs/configuration) for a custom utility group. Changing recipe config does not change the standalone default `cn()` configuration. Check the resulting class string and compiled CSS when adding custom classes.

## Upgrade an existing install

Install `tailwind-variants` and replace your existing vip/ui files with the updated registry versions. If you copied files manually, include `vip-ui/utils.ts` and keep `./utils` imports; do not switch those imports to shadcn's `lib/utils.ts`. Remove the old `cn` package only when nothing else in your app imports it. If you called `buttonClassName(variant, size)` directly, use `buttonStyles({ variant, size })` instead. The public `<Button>` and `<ButtonLink>` props have not changed. Review local changes before replacing any installed component.

Tailwind v4 must scan the file containing a recipe. The site's `src/components/ui/` is scanned with its other app sources. If you install files outside your app's scanned source tree, add that location with Tailwind's `@source` directive in your stylesheet. Registry output converts React Aria state shorthands such as `selected:` into portable `data-[selected]:` selectors; manual copies use the same portable source.
