import data from "./component-checks.json";

export interface AxeFinding {
  id: string;
  impact: string;
  help: string;
  modes: string[];
}

export interface DoctorFinding {
  rule: string;
  severity: "error" | "warning";
  title: string;
  line: number;
}

interface CheckSection<T> {
  version: string;
  components: Record<string, T[]>;
}

const checks = data as {
  axe?: CheckSection<AxeFinding>;
  reactDoctor?: CheckSection<DoctorFinding>;
};

export function componentChecks(slug: string) {
  return {
    axe: checks.axe?.components[slug],
    doctor: checks.reactDoctor?.components[slug],
  };
}
