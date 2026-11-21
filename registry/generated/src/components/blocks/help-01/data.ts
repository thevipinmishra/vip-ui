export type TopicId =
  | "start"
  | "payroll"
  | "time-off"
  | "taxes"
  | "benefits"
  | "account";

export interface Topic {
  id: TopicId;
  name: string;
  description: string;
}

export interface Article {
  id: string;
  topic: TopicId;
  title: string;
  summary: string;
  updated: string;
  popular?: boolean;
  steps?: string[];
  body: string[];
}

export const topics: Topic[] = [
  {
    id: "start",
    name: "Getting started",
    description: "Set up your company and add your team.",
  },
  {
    id: "payroll",
    name: "Payroll",
    description: "Run payroll, correct pay, and pay contractors.",
  },
  {
    id: "time-off",
    name: "Time off",
    description: "Make policies and approve requests.",
  },
  {
    id: "taxes",
    name: "Taxes and forms",
    description: "Tax filings, W-2 forms, and 1099 forms.",
  },
  {
    id: "benefits",
    name: "Benefits",
    description: "Health plans, 401(k) plans, and deductions.",
  },
  {
    id: "account",
    name: "Account and billing",
    description: "Your plan, invoices, and user roles.",
  },
];

export const articles: Article[] = [
  {
    id: "add-employee",
    topic: "start",
    title: "Add an employee",
    summary:
      "Send an invite so a new employee can add their tax and bank details.",
    updated: "2026-10-12",
    popular: true,
    steps: [
      "Go to People and select Add person.",
      "Enter the legal name, work email, and start date.",
      "Select the pay rate and the pay schedule.",
      "Select Send invite. The employee gets an email to finish setup.",
    ],
    body: [
      "The employee must finish setup before their first payday. Fernway shows a reminder on the People page until they do.",
      "If the employee does not have a work email, use a personal email. You can change it later.",
    ],
  },
  {
    id: "first-payroll",
    topic: "start",
    title: "Run your first payroll",
    summary:
      "Check hours, review taxes, and submit payroll before the deadline.",
    updated: "2026-10-03",
    popular: true,
    steps: [
      "Go to Payroll and select Run payroll.",
      "Check hours and extra pay for each person.",
      "Review the taxes and the total cost.",
      "Select Submit payroll before 5:00 PM ET, 4 business days before payday.",
    ],
    body: [
      "Fernway moves the money from your bank 2 business days before payday. Make sure your account has enough money.",
    ],
  },
  {
    id: "connect-bank",
    topic: "start",
    title: "Connect your company bank account",
    summary: "Link the account that pays wages and taxes.",
    updated: "2026-09-18",
    body: [
      "Go to Settings, then Company, then Bank account. Sign in to your bank, or enter the routing and account numbers.",
      "If you enter the numbers, we send 2 small deposits. Enter the amounts to confirm the account. This takes 1 to 2 business days.",
    ],
  },
  {
    id: "fix-payroll",
    topic: "payroll",
    title: "Correct a payroll after you submit it",
    summary:
      "Cancel a payroll before the deadline, or run an off-cycle payroll to fix pay.",
    updated: "2026-10-20",
    popular: true,
    body: [
      "Before the deadline, go to Payroll, open the payroll, and select Cancel payroll. Then run it again with the correct numbers.",
      "After the deadline, run an off-cycle payroll to pay the missing amount. To get money back from an employee, contact support.",
    ],
  },
  {
    id: "off-cycle",
    topic: "payroll",
    title: "Run an off-cycle payroll",
    summary: "Pay bonuses, corrections, or final pay outside your schedule.",
    updated: "2026-08-29",
    steps: [
      "Go to Payroll and select Run off-cycle payroll.",
      "Select the reason, such as Bonus or Correction.",
      "Select the people and enter the amounts.",
      "Review and submit. Direct deposit takes 4 business days.",
    ],
    body: [],
  },
  {
    id: "pay-contractors",
    topic: "payroll",
    title: "Pay contractors",
    summary: "Pay contractors in the US and 40 other countries.",
    updated: "2026-09-07",
    body: [
      "Go to Payroll, then Contractors, and select Pay contractors. Enter the amount for each contractor, or import hours from their invoices.",
      "Fernway collects a W-9 or W-8BEN form from each contractor before their first payment.",
    ],
  },
  {
    id: "pto-policy",
    topic: "time-off",
    title: "Make a time off policy",
    summary: "Set accrual rates, carryover limits, and waiting periods.",
    updated: "2026-07-14",
    body: [
      "Go to Time off and select New policy. Select the type, such as Vacation or Sick leave, and set how many hours people get.",
      "Policies apply to the people you add to them. A person can be in more than one policy.",
    ],
  },
  {
    id: "approve-time-off",
    topic: "time-off",
    title: "Approve or decline time off",
    summary: "Managers get an email and a task for each request.",
    updated: "2026-09-30",
    body: [
      "Open the request from the email or from Tasks. Select Approve or Decline. Fernway updates the balance and the team calendar.",
    ],
  },
  {
    id: "w2",
    topic: "taxes",
    title: "Find W-2 forms",
    summary:
      "Employees can download their W-2 from their profile in late January.",
    updated: "2026-10-01",
    popular: true,
    body: [
      "Fernway files W-2 forms with the IRS and sends a copy to each employee by January 31.",
      "Admins can download all forms from Taxes, then Documents. Employees find their own form under Profile, then Documents.",
    ],
  },
  {
    id: "1099",
    topic: "taxes",
    title: "File 1099 forms for contractors",
    summary:
      "We file 1099-NEC forms for each contractor you paid $600 or more.",
    updated: "2026-09-12",
    body: [
      "Make sure each contractor has a correct address and tax ID before January 15. Fernway files the forms on January 31.",
    ],
  },
  {
    id: "state-tax",
    topic: "taxes",
    title: "Register for state payroll taxes",
    summary: "Get a state tax ID before you pay employees in a new state.",
    updated: "2026-06-22",
    body: [
      "Go to Taxes, then State setup. Fernway shows the IDs that each state requires and links to the state website.",
    ],
  },
  {
    id: "401k",
    topic: "benefits",
    title: "Change a 401(k) contribution",
    summary: "Employees can change their contribution at any time.",
    updated: "2026-08-04",
    body: [
      "Go to Benefits, then Retirement, and select Change contribution. The change starts on the next payroll that is not yet submitted.",
    ],
  },
  {
    id: "health-enroll",
    topic: "benefits",
    title: "Enroll in a health plan",
    summary: "New employees have 30 days to pick a plan.",
    updated: "2026-10-08",
    body: [
      "Go to Benefits and select Enroll. Compare the plans, add dependents, and select a plan. Coverage starts on the first day of next month.",
    ],
  },
  {
    id: "change-plan",
    topic: "account",
    title: "Change your Fernway plan",
    summary: "Upgrade or downgrade. We prorate the price on your next invoice.",
    updated: "2026-10-16",
    body: [
      "Go to Settings, then Billing, and select Change plan. A downgrade starts at the end of the current month.",
    ],
  },
  {
    id: "roles",
    topic: "account",
    title: "Give a person admin access",
    summary: "Admins can run payroll and see pay for all people.",
    updated: "2026-07-30",
    body: [
      "Go to Settings, then Roles. Select the person and select Admin or Payroll admin. Payroll admins cannot change billing.",
    ],
  },
];

export const faqs = [
  {
    id: "deadline",
    question: "What is the payroll deadline?",
    answer:
      "Submit payroll by 5:00 PM ET, 4 business days before payday. On the Plus plan, the deadline is 2 business days before payday.",
  },
  {
    id: "late",
    question: "What happens if I miss the deadline?",
    answer:
      "Fernway moves payday to the next possible day. We send an email to each employee with the new date.",
  },
  {
    id: "states",
    question: "Can I pay employees in more than one state?",
    answer:
      "Yes. Register for payroll taxes in each state first. Fernway files the state taxes for you.",
  },
  {
    id: "switch",
    question: "Can I move to Fernway in the middle of the year?",
    answer:
      "Yes. Upload your past payroll reports and we add the totals to your W-2 forms. Setup takes about 1 week.",
  },
];

const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDay(value: string) {
  return day.format(new Date(`${value}T00:00:00Z`));
}
