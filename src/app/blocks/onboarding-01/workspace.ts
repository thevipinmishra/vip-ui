export interface WorkspaceSetup {
  name: string;
  slug: string;
  color: string;
  colorName: string;
  invites: string[];
  topics: string[];
}

export const WORKSPACE_KEY = "fieldnote.setup.v1";

export const accentColors = [
  { name: "Blue", value: "#4567d4" },
  { name: "Rose", value: "#af4d65" },
  { name: "Teal", value: "#1f7a66" },
  { name: "Amber", value: "#9a5f1c" },
  { name: "Violet", value: "#6b5bd2" },
] as const;

export const topicOptions = [
  { value: "discovery", label: "Product discovery" },
  { value: "design", label: "Design research" },
  { value: "support", label: "Customer support" },
  { value: "marketing", label: "Marketing" },
] as const;

export const setupSteps = [
  { label: "Workspace", description: "Name and address" },
  { label: "Invite", description: "Add your team" },
  { label: "Topics", description: "Pick your work" },
] as const;

const reservedSlugs = [
  "admin",
  "api",
  "app",
  "fieldnote",
  "help",
  "support",
  "www",
];

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

export function slugProblem(value: string) {
  if (!value.trim()) return "Enter a workspace address.";
  if (value.length < 3) return "Use 3 or more characters.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
    return "Use lowercase letters, numbers, and single hyphens.";
  if (reservedSlugs.includes(value)) return "This address is not available.";
  return "";
}

export function topicLabels(values: readonly string[]) {
  return values.flatMap((value) => {
    const label = topicOptions.find((topic) => topic.value === value)?.label;
    return label ? [label] : [];
  });
}
