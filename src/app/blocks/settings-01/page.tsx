import type { Metadata } from "next";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "Profile settings",
};

const sections = ["Profile", "Account", "Notifications", "Billing"];

export default function SettingsPage() {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-4xl px-5 pt-10 sm:px-8">
        <h1 className="text-2xl font-semibold tracking-[-0.04em]">Settings</h1>
        <nav aria-label="Settings" className="mt-5 border-b border-border/70">
          <ul className="-mb-px flex gap-6 overflow-x-auto text-sm font-medium">
            {sections.map((section, index) => (
              <li key={section}>
                <a
                  href={`#${section.toLowerCase()}`}
                  aria-current={index === 0 ? "page" : undefined}
                  className="inline-flex min-h-11 items-center border-b-2 border-transparent text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:border-primary aria-[current=page]:text-foreground"
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <ProfileForm />
      </main>
    </div>
  );
}
