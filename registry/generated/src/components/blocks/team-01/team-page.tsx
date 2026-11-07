import { TeamMembers } from "./team-members";

export function TeamPage() {
  return (
    <main className="flex min-h-svh items-start justify-center bg-muted/40 p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <TeamMembers />
      </div>
    </main>
  );
}
