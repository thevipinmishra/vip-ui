const newForDays = 30;
const dayMs = 86_400_000;

export const buildDate = process.env.BUILD_DATE ?? "1970-01-01";

export function isNew(added: string | undefined) {
  if (!added) return false;
  const age = Date.parse(buildDate) - Date.parse(added);
  return age < newForDays * dayMs;
}

export function isBefore(date: string | undefined) {
  return !date || Date.parse(buildDate) < Date.parse(date);
}
