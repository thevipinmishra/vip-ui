const promptEnd =
  "Keep my theme and edits. Make sure that the build passes, then list the changes.";

export function setupDocUrl(site: string) {
  return `${site}/components/installation.md`;
}

export function componentDocUrl(site: string, slug: string) {
  return `${site}/components/${slug}.md`;
}

function agentPrompt(task: string, docUrl: string) {
  return `${task}. Follow ${docUrl}. ${promptEnd}`;
}

export function setupPrompt(site: string) {
  return agentPrompt("Set up vip/ui in this project", setupDocUrl(site));
}

export function componentPrompt(site: string, slug: string, name: string) {
  return agentPrompt(
    `Add the vip/ui ${name} to this project`,
    componentDocUrl(site, slug),
  );
}

export function itemPrompt(site: string, itemUrl: string, name: string) {
  return agentPrompt(
    `Add the vip/ui ${name} to this project from ${itemUrl}`,
    setupDocUrl(site),
  );
}

export function installSteps(itemUrl: string) {
  const command = `npx shadcn@latest add ${itemUrl}`;
  const install = `node -e "process.exit(child_process.spawnSync('${command} --yes',{shell:true,input:'n '.repeat(9e6),stdio:['pipe',1,2]}).status??1)"`;
  return [
    `1. Preview: \`${command} --dry-run\`. Copy the global CSS and each file that shows \`overwrite\` to a temporary folder.`,
    `2. Install: \`${install}\`. It answers No to each overwrite, but the CLI can still change those files. Do not use \`--overwrite\`.`,
    "3. Make sure that each `create` file now exists. The CLI can exit with code 0 and not write the files. Restore each `overwrite` file that differs from its copy.",
    "4. For each item that is a theme, a color scale, a font, or `base`, keep all of its new declarations: those items change the theme on purpose. For every other file, if the project CSS set a variable before the install, delete each new declaration of that variable. This includes self-references, such as `--highlight: var(--highlight)`, and values in a new `.dark` block. Delete rules that become empty. If a `dark` variant existed, delete any new one. Keep all other additions.",
    "5. Follow any notes at the end of the `--yes` output.",
    '6. Run the build script of the project, then its type check. If `tsconfig.json` has `"files": []`, use `tsc -b`, because `tsc --noEmit` checks nothing. Both must pass. Do not change the `overwrite` files. Report them as not updated, with any errors.',
  ];
}
