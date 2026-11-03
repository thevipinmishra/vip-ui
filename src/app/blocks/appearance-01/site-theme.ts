let restoreFrame: number | undefined;

export function updateSiteTheme(update: (root: HTMLElement) => void) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  update(root);
  void root.offsetHeight;
  if (restoreFrame !== undefined) cancelAnimationFrame(restoreFrame);
  restoreFrame = requestAnimationFrame(() => {
    root.classList.remove("theme-switching");
    restoreFrame = undefined;
  });
}
