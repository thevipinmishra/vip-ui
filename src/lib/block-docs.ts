const promptEnd =
  "Keep my theme and edits. Make sure that the build passes, then list the changes.";

export function blockDocUrl(site: string, name: string) {
  return `${site}/blocks/${name}.md`;
}

export function blockPrompt(site: string, name: string, title: string) {
  return `Add the vip/ui ${title} block to this project. Follow ${blockDocUrl(site, name)}. ${promptEnd}`;
}
