import { ScrollFade } from "@/components/ui/scroll-fade";

export function ScrollFadeSizeDemo() {
  return (
    <ScrollFade
      tabIndex={0}
      aria-label="Release notes"
      className="h-48 w-full max-w-sm text-sm leading-6 text-muted-foreground [--scroll-fade-size:4rem]"
    >
      <div className="grid gap-3">
        <p className="font-medium text-foreground">Release 4.2</p>
        <p>
          Projects now open where you left them. The editor keeps your scroll
          position, the selected layer, and the zoom level for each file.
        </p>
        <p>
          Comments support threads. Reply to a comment to keep the discussion in
          one place, and resolve the thread when the work is done.
        </p>
        <p>
          Exports are faster. Large boards export in the background, and you get
          a notification when the file is ready to download.
        </p>
        <p>
          Shortcuts are now listed in the command menu. Press the question mark
          key to see them in any view.
        </p>
      </div>
    </ScrollFade>
  );
}
