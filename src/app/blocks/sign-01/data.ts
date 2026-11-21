export type FieldId = "rules" | "cancellation" | "signature";

export const fields: {
  id: FieldId;
  label: string;
  kind: "initials" | "signature";
}[] = [
  { id: "rules", label: "Initials, section 3", kind: "initials" },
  { id: "cancellation", label: "Initials, section 5", kind: "initials" },
  { id: "signature", label: "Member signature", kind: "signature" },
];

export const agreement = {
  title: "Membership agreement",
  company: "Ridgeway Coworking",
  sender: "Alana Brooks",
  senderRole: "Community manager",
  sent: "Oct 27, 2026",
  expires: "Nov 10, 2026",
  signedOn: "Oct 28, 2026",
  member: "Jordan Ellis",
  memberCompany: "Ellis Studio",
  memberEmail: "jordan@ellis.studio",
  desk: 45000,
  parking: 9000,
  deposit: 45000,
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatMoney(cents: number) {
  return money.format(cents / 100);
}
