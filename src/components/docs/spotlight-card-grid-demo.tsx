import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const features = [
  { title: "Drafts", text: "Write with the team in one document." },
  { title: "Reviews", text: "Ask for approval without leaving the page." },
  { title: "Versions", text: "Go back to any saved state." },
  { title: "Exports", text: "Send a PDF, a link, or plain text." },
  { title: "Guests", text: "Invite clients to comment for free." },
  { title: "Search", text: "Find words inside every file." },
];

export function SpotlightCardGridDemo() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {features.map((feature) => (
        <SpotlightCard key={feature.title}>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.text}</CardDescription>
          </CardHeader>
        </SpotlightCard>
      ))}
    </div>
  );
}
