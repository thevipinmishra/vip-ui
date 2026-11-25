import { TeamMembers } from "./team-members";

export function TeamPage() {
  return (
    <main className="flex min-h-svh items-start justify-center bg-background px-4 py-6 sm:px-6 sm:py-8">
      <div className="w-full max-w-4xl">
        <TeamMembers />
      </div>
    </main>
  );
}
