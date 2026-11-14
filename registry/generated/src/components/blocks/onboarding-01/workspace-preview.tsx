import {
  FolderOpenIcon,
  HouseIcon,
  NoteBlankIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

interface WorkspacePreviewProps {
  name: string;
  slug: string;
  color: string;
  invites: readonly string[];
}

export function WorkspacePreview({
  name,
  slug,
  color,
  invites,
}: WorkspacePreviewProps) {
  const initial = name.trim().charAt(0).toLocaleUpperCase() || "F";
  const shown = invites.slice(0, 3);

  return (
    <div className="grid gap-3">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Preview
      </p>
      <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-float) ring-1 ring-border/70">
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/60 px-3 py-2">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
          </span>
          <span className="mx-auto min-w-0 truncate rounded-md bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground ring-1 ring-border/60">
            fieldnote.app/{slug || "your-workspace"}
          </span>
        </div>
        <div className="grid gap-3 p-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-lg text-sm font-semibold text-white shadow-(--shadow-card)"
              style={{ backgroundColor: color }}
            >
              {initial}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                {name.trim() || "Your workspace"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                1 member
                {invites.length > 0 ? ` · ${invites.length} invited` : ""}
              </p>
            </div>
          </div>
          <nav aria-label="Preview navigation" className="grid gap-0.5">
            <span
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-white"
              style={{ backgroundColor: color }}
            >
              <HouseIcon size={14} aria-hidden="true" />
              Home
            </span>
            <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground">
              <FolderOpenIcon size={14} aria-hidden="true" />
              Projects
            </span>
            <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground">
              <NoteBlankIcon size={14} aria-hidden="true" />
              Notes
            </span>
          </nav>
          <div className="grid gap-2 border-t border-border/70 pt-2.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Suggested projects
            </p>
            <div className="grid gap-1.5">
              <PreviewProject name="Customer interviews" meta="Template" />
              <PreviewProject name="Onboarding study" meta="Template" />
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-border/70 pt-2.5">
            <UsersThreeIcon
              size={14}
              className="shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            {shown.length === 0 ? (
              <p className="text-xs text-muted-foreground">No invites yet</p>
            ) : (
              <div className="flex min-w-0 items-center gap-1.5">
                {shown.map((email) => (
                  <span
                    key={email}
                    title={email}
                    className="grid size-6 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground ring-1 ring-background"
                  >
                    {email.charAt(0).toLocaleUpperCase()}
                  </span>
                ))}
                {invites.length > shown.length && (
                  <span className="text-xs text-muted-foreground">
                    +{invites.length - shown.length}
                  </span>
                )}
                <span className="ms-1 truncate text-xs text-muted-foreground">
                  invited
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewProject({ name, meta }: { name: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-border/60 px-2 py-1.5">
      <span className="truncate text-xs font-medium">{name}</span>
      <span className="shrink-0 text-[10px] text-muted-foreground">{meta}</span>
    </div>
  );
}
