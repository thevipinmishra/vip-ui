# Security policy

## Supported versions

vip/ui has no versioned releases. We support:

- The latest code on the `main` branch.
- The hosted registry at <https://vip-ui.dev/r/registry.json>.

Installed components are copies in your project. To get a fix, install the component again from the registry.

## Report a vulnerability

Do not open a public issue for a security problem.

Report it privately through GitHub:

1. Go to the [Security tab](https://github.com/thevipinmishra/vip-ui/security) of this repository.
2. Select **Report a vulnerability**.
3. Fill in the form and submit it.

Include:

- The component, registry item, or page that has the problem.
- The steps to reproduce it.
- The effect of the problem.
- A fix, if you have one.

## What happens next

We reply in the private advisory. When we fix the problem, we publish the advisory. We credit you if you agree.

## Scope

In scope:

- Component source in `src/components/ui/`.
- Registry files that the CLI installs.
- The docs site at <https://vip-ui.dev>.

If the problem is in a dependency, such as React Aria, Motion, or Next.js, report it to that project.
