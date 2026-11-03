import { TeamMembers } from "./team-members";

export const metadata = {
  title: "Team members",
  description: "A team list with invites, roles, and member actions.",
};

export default function TeamPage() {
  return (
    <main className="flex min-h-svh items-start justify-center bg-muted/40 p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <TeamMembers />
      </div>
    </main>
  );
}
