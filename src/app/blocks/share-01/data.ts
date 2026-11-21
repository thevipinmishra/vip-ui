export type Role = "edit" | "comment" | "view";
export type GeneralAccess = "restricted" | "organization" | "public";

export interface Person {
  email: string;
  name?: string;
  role: Role | "owner";
  invited?: boolean;
}

export const documentTitle = "Q4 launch plan";
export const documentLink = "https://lumendocs.app/d/7hk2q4-launch-plan";
export const organization = "Lumen";
export const organizationDomain = "lumendocs.app";

export const roles: { id: Role; name: string; description: string }[] = [
  { id: "edit", name: "Can edit", description: "Make any change" },
  { id: "comment", name: "Can comment", description: "Suggest and comment" },
  { id: "view", name: "Can view", description: "Read only" },
];

export const generalAccessOptions: {
  id: GeneralAccess;
  name: string;
  description: string;
}[] = [
  {
    id: "restricted",
    name: "Only people with access",
    description: "Only the people in the list can open the link.",
  },
  {
    id: "organization",
    name: `Anyone at ${organization}`,
    description: `People with a @${organizationDomain} email can open the link.`,
  },
  {
    id: "public",
    name: "Anyone with the link",
    description: "No sign-in is necessary to open the link.",
  },
];

export const initialPeople: Person[] = [
  { name: "Daniel Kim", email: "daniel@lumendocs.app", role: "owner" },
  { name: "Amara Osei", email: "amara@lumendocs.app", role: "edit" },
  { name: "Felix Wagner", email: "felix@lumendocs.app", role: "comment" },
  { name: "Sofia Marín", email: "sofia@brightpath.io", role: "view" },
  { email: "lucas@lumendocs.app", role: "edit", invited: true },
];

export const currentUser = "daniel@lumendocs.app";

export function roleName(role: Person["role"]) {
  if (role === "owner") return "Owner";
  return roles.find((item) => item.id === role)?.name ?? "";
}
