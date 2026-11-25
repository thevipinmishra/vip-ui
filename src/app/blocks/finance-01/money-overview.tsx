"use client";

import {
  ArrowDownLeftIcon,
  ArrowRightIcon,
  ArrowsLeftRightIcon,
  ArrowUpRightIcon,
  BellIcon,
  BookOpenIcon,
  CalendarBlankIcon,
  CaretRightIcon,
  ChartLineUpIcon,
  CheckIcon,
  CoffeeIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DownloadSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  GearIcon,
  HeartbeatIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  PiggyBankIcon,
  PlayIcon,
  PlusIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  SnowflakeIcon,
  TrainIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { type FormEvent, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import {
  Popover,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  SearchField,
  SearchFieldClear,
  SearchFieldControl,
  SearchFieldInput,
} from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { cn } from "@/lib/utils";
import {
  type Account,
  balanceHistory,
  budgetTotal,
  categoryOptions,
  formatSigned,
  accounts as initialAccounts,
  transactions as initialTransactions,
  money,
  savingsGoal,
  spending,
  spendingTotal,
  type Transaction,
  upcomingBills,
} from "./data";

const accountIcons = {
  checking: WalletIcon,
  savings: PiggyBankIcon,
  investment: ChartLineUpIcon,
  credit: CreditCardIcon,
} as const;

const transactionIcons = {
  salary: CurrencyDollarIcon,
  home: HouseIcon,
  cart: ShoppingCartIcon,
  train: TrainIcon,
  coffee: CoffeeIcon,
  play: PlayIcon,
  heart: HeartbeatIcon,
  refund: ArrowDownLeftIcon,
  book: BookOpenIcon,
  transfer: ArrowsLeftRightIcon,
} as const;

const spendingIcons = {
  home: HouseIcon,
  cart: ShoppingCartIcon,
  train: TrainIcon,
  coffee: CoffeeIcon,
  play: PlayIcon,
  heart: HeartbeatIcon,
} as const;

const categoryTone: Record<string, string> = {
  Income: "var(--chart-2)",
  Housing: "var(--chart-1)",
  Groceries: "var(--chart-2)",
  Transport: "var(--chart-3)",
  Dining: "var(--chart-4)",
  Shopping: "var(--chart-5)",
  Subscriptions: "var(--chart-6)",
  Health: "var(--chart-3)",
  Transfer: "var(--chart-2)",
};

const navItems = [
  { label: "Overview", id: "overview" },
  { label: "Accounts", id: "accounts" },
  { label: "Transactions", id: "transactions" },
  { label: "Budgets", id: "budgets" },
];

const newAccountTypes = [
  { id: "checking", name: "Checking" },
  { id: "savings", name: "Savings" },
] as const;

type FinanceDialog =
  | { kind: "transfer" | "statement" | "account" | "card" }
  | { kind: "transaction"; transaction: Transaction };

function toneStyle(tone: string) {
  return {
    color: tone,
    backgroundColor: `color-mix(in oklab, ${tone} 14%, transparent)`,
  };
}

const initialFilters = { query: "", category: "all", account: "all" };

const balanceChangePercent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
});

type TransferDraft = { from: string; to: string; amount: string };

export function MoneyOverview() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [hidden, setHidden] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [dialog, setDialog] = useState<FinanceDialog | null>(null);
  const [saved, setSaved] = useState(savingsGoal.saved);
  const [frozen, setFrozen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  const total =
    accounts.reduce((sum, item) => sum + Math.round(item.balance * 100), 0) /
    100;
  function recordTransfer({
    source,
    destination,
    cents,
  }: {
    source: Account;
    destination: Account;
    cents: number;
  }) {
    const value = cents / 100;
    setAccounts((current) =>
      current.map((item) => {
        if (item.id === source.id)
          return {
            ...item,
            balance: (Math.round(item.balance * 100) - cents) / 100,
          };
        if (item.id === destination.id)
          return {
            ...item,
            balance: (Math.round(item.balance * 100) + cents) / 100,
          };
        return item;
      }),
    );
    const id = crypto.randomUUID();
    setTransactions((current) => [
      {
        id: `${id}-out`,
        merchant: `Transfer to ${destination.name}`,
        detail: `${source.name} to ${destination.name}`,
        category: "Transfer",
        date: "Nov 24",
        amount: -value,
        account: source.name,
        icon: "transfer",
      },
      {
        id: `${id}-in`,
        merchant: `Transfer from ${source.name}`,
        detail: `${source.name} to ${destination.name}`,
        category: "Transfer",
        date: "Nov 24",
        amount: value,
        account: destination.name,
        icon: "transfer",
      },
      ...current,
    ]);
  }

  function submitTransfer({ from, to, amount }: TransferDraft) {
    const cents = parseCents(amount);
    if (!cents) return "Enter a positive amount with up to two decimal places.";
    const source = accounts.find(
      (item) => item.id === from && item.icon !== "credit",
    );
    const destination = accounts.find((item) => item.id === to);
    if (!source || !destination || source.id === destination.id) {
      return "Choose two different accounts.";
    }
    if (cents > Math.round(source.balance * 100)) {
      return "This amount exceeds the available balance.";
    }
    recordTransfer({ source, destination, cents });
    showToast({
      title: "Money moved",
      description: `${source.name} to ${destination.name}`,
      variant: "success",
    });
    setDialog(null);
  }

  function addToSavings() {
    const source = accounts.find((item) => item.id === "everyday");
    const destination = accounts.find((item) => item.id === "reserve");
    const contribution = Math.min(250, savingsGoal.target - saved);
    if (!source || !destination || contribution <= 0) return;
    if (source.balance < contribution) {
      showToast({
        title: "Insufficient balance in Everyday",
        variant: "error",
      });
      return;
    }
    recordTransfer({ source, destination, cents: contribution * 100 });
    const next = saved + contribution;
    setSaved(next);
    showToast({
      title: next === savingsGoal.target ? "Goal reached" : "Savings added",
      description:
        next === savingsGoal.target
          ? "The emergency fund is fully funded."
          : `${money.format(savingsGoal.target - next)} left to reach the goal.`,
      variant: "success",
    });
  }

  function addAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name")).trim();
    const type = newAccountTypes.find((item) => item.id === fields.get("type"));
    const mask = String(fields.get("mask"));
    if (!name || !type || !/^\d{4}$/.test(mask)) return;
    if (
      name.toLowerCase() === "all" ||
      accounts.some((item) => item.name.toLowerCase() === name.toLowerCase())
    ) {
      showToast({ title: "Choose a different account name", variant: "error" });
      return;
    }
    const newAccount: Account = {
      id: crypto.randomUUID(),
      name,
      kind: type.name,
      mask,
      balance: 0,
      trend: 0,
      icon: type.id,
    };
    setAccounts((current) => [...current, newAccount]);
    setDialog(null);
    showToast({ title: `${name} added`, variant: "success" });
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <FinanceHeader onSearch={() => searchInput.current?.focus()} />

      <main
        id="overview"
        className="mx-auto grid max-w-[1280px] gap-6 px-4 py-6 sm:px-6 lg:py-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Tuesday, November 24
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Good morning, Ana
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onPress={() => setDialog({ kind: "statement" })}
            >
              <ReceiptIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              Statements
            </Button>
            <Button size="sm" onPress={() => setDialog({ kind: "transfer" })}>
              <ArrowsLeftRightIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              Move money
            </Button>
          </div>
        </div>

        <BalanceOverview
          total={total}
          accountCount={accounts.length}
          hidden={hidden}
          onToggleVisibility={() => setHidden((value) => !value)}
        />

        <section
          id="accounts"
          aria-labelledby="accounts-title"
          className="grid gap-3 scroll-mt-4"
        >
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 id="accounts-title" className="text-lg font-semibold">
                Accounts
              </h2>
              <p className="text-sm text-muted-foreground">
                {accounts.length} accounts
              </p>
            </div>
            <Button
              variant="minimal"
              size="xs"
              onPress={() => setDialog({ kind: "account" })}
            >
              <PlusIcon data-icon="inline-start" size={14} aria-hidden="true" />
              Add account
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {accounts.map((item) => (
              <AccountCard
                key={item.id}
                account={item}
                hidden={hidden}
                onView={() =>
                  setFilters({ ...initialFilters, account: item.name })
                }
              />
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.44fr)]">
          <div className="grid content-start gap-5">
            <SpendingOverview />

            <TransactionOverview
              accounts={accounts}
              transactions={transactions}
              filters={filters}
              onFiltersChange={setFilters}
              searchInput={searchInput}
              onSelect={(transaction) =>
                setDialog({ kind: "transaction", transaction })
              }
            />
          </div>

          <FinanceSidebar
            saved={saved}
            frozen={frozen}
            onSave={addToSavings}
            onFreezeChange={setFrozen}
            onCardSettings={() => setDialog({ kind: "card" })}
          />
        </div>
      </main>

      <FinanceDialogs
        dialog={dialog}
        accounts={accounts}
        transactions={transactions}
        hidden={hidden}
        onClose={() => setDialog(null)}
        onAddAccount={addAccount}
        onTransfer={submitTransfer}
      />
    </div>
  );
}

function FinanceHeader({ onSearch }: { onSearch: () => void }) {
  const [notificationsSeen, setNotificationsSeen] = useState(false);
  return (
    <header className="border-b border-border/70 bg-card">
      <div className="mx-auto flex min-h-16 max-w-[1280px] flex-wrap items-center gap-x-3 px-4 sm:px-6">
        <span className="grid size-9 place-items-center rounded-xl bg-[#1d4e3c] text-white dark:bg-[#a8e2c0] dark:text-[#133629]">
          <WalletIcon size={19} weight="fill" aria-hidden="true" />
        </span>
        <span className="text-base font-semibold tracking-tight">Ledger</span>
        <nav
          aria-label="Primary"
          className="order-last flex w-full gap-1 overflow-x-auto pb-2 md:order-none md:ms-5 md:w-auto md:pb-0"
        >
          {navItems.map((item) => (
            <ButtonLink
              key={item.id}
              href={`#${item.id}`}
              variant="ghost"
              size="sm"
              className="shrink-0 max-sm:px-2 max-sm:text-xs"
            >
              {item.label}
            </ButtonLink>
          ))}
        </nav>
        <div className="ms-auto flex h-14 items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Find transactions"
            onPress={onSearch}
          >
            <MagnifyingGlassIcon size={18} aria-hidden="true" />
          </Button>
          <PopoverTrigger
            onOpenChange={(open) => {
              if (open) setNotificationsSeen(true);
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label={
                notificationsSeen ? "Notifications" : "Notifications, unread"
              }
              className="relative"
            >
              <BellIcon size={18} aria-hidden="true" />
              {!notificationsSeen && (
                <span
                  aria-hidden="true"
                  className="absolute end-1.5 top-1.5 size-2 rounded-full bg-emerald-600 ring-2 ring-card"
                />
              )}
            </Button>
            <Popover placement="bottom end" className="w-72">
              <PopoverDialog>
                <PopoverTitle>Notifications</PopoverTitle>
                <ul className="mt-2 divide-y divide-border">
                  {upcomingBills.slice(0, 2).map((bill) => (
                    <li key={bill.id} className="py-2 text-sm">
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {money.format(bill.amount)} scheduled for {bill.due}
                      </p>
                    </li>
                  ))}
                </ul>
              </PopoverDialog>
            </Popover>
          </PopoverTrigger>
          <Avatar name="Ana Souza" size="sm" className="ms-1" />
        </div>
      </div>
    </header>
  );
}

function SpendingOverview() {
  return (
    <Card id="budgets" className="scroll-mt-4">
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <CardTitle as="h2">Spending</CardTitle>
          <CardDescription>November 1 – 24</CardDescription>
        </div>
        <Badge variant="neutral">
          {Math.round((spendingTotal / budgetTotal) * 100)}% of budget
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-3xl font-semibold tracking-[-0.04em] tabular-nums">
              {money.format(spendingTotal)}
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">
              of {money.format(budgetTotal)} budget
            </p>
          </div>
          <div
            aria-hidden="true"
            className="mt-2 h-2 overflow-hidden rounded-full bg-secondary"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${Math.min(100, (spendingTotal / budgetTotal) * 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="grid gap-3">
          {spending.map((item) => {
            const Icon = spendingIcons[item.icon];
            const percentage = Math.min(100, (item.amount / item.budget) * 100);
            return (
              <div
                key={item.name}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3"
              >
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-lg"
                  style={toneStyle(item.tone)}
                >
                  <Icon size={15} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                      {money.format(item.amount)}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary"
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.tone,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionOverview({
  accounts,
  transactions,
  filters,
  onFiltersChange,
  searchInput,
  onSelect,
}: {
  accounts: Account[];
  transactions: Transaction[];
  filters: typeof initialFilters;
  onFiltersChange: (filters: typeof initialFilters) => void;
  searchInput: React.Ref<HTMLInputElement>;
  onSelect: (transaction: Transaction) => void;
}) {
  const { query, category, account } = filters;
  const [showAll, setShowAll] = useState(false);
  const search = query.trim().toLocaleLowerCase();
  const filtersActive =
    Boolean(search) || category !== "all" || account !== "all";
  const matchingTransactions = transactions.filter((transaction) => {
    const matchesQuery =
      !search ||
      `${transaction.merchant} ${transaction.detail} ${transaction.category}`
        .toLocaleLowerCase()
        .includes(search);
    const matchesCategory =
      category === "all" || transaction.category === category;
    const matchesAccount = account === "all" || transaction.account === account;
    return matchesQuery && matchesCategory && matchesAccount;
  });
  const visibleTransactions =
    showAll || filtersActive
      ? matchingTransactions
      : matchingTransactions.slice(0, 5);
  const accountOptions = [
    { id: "all", name: "All accounts" },
    ...accounts.map((item) => ({ id: item.name, name: item.name })),
  ];

  return (
    <Card id="transactions" className="scroll-mt-4">
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <CardTitle as="h2">Transactions</CardTitle>
          <CardDescription>
            {visibleTransactions.length} of {matchingTransactions.length}{" "}
            matching transactions
          </CardDescription>
        </div>
        {filtersActive ? (
          <Button
            variant="minimal"
            size="sm"
            onPress={() => onFiltersChange(initialFilters)}
          >
            Clear filters
          </Button>
        ) : (
          matchingTransactions.length > 5 && (
            <Button
              variant="minimal"
              size="sm"
              onPress={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
            >
              {showAll ? "Show recent" : "View all"}
              <ArrowRightIcon
                data-icon="inline-end"
                size={13}
                aria-hidden="true"
              />
            </Button>
          )
        )}
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3">
        <div className="grid gap-2 grid-cols-2 xl:grid-cols-[minmax(0,1fr)_9rem_9rem]">
          <SearchField
            size="sm"
            aria-label="Search transactions"
            value={query}
            onChange={(query) => onFiltersChange({ ...filters, query })}
            className="col-span-2 xl:col-span-1"
          >
            <SearchFieldControl>
              <SearchFieldInput
                ref={searchInput}
                placeholder="Search transactions"
              />
              {query && <SearchFieldClear />}
            </SearchFieldControl>
          </SearchField>
          <Select
            size="sm"
            aria-label="Category"
            options={categoryOptions}
            value={category}
            onChange={(value) =>
              onFiltersChange({ ...filters, category: String(value) })
            }
          />
          <Select
            size="sm"
            aria-label="Account"
            options={accountOptions}
            value={account}
            onChange={(value) =>
              onFiltersChange({ ...filters, account: String(value) })
            }
          />
        </div>
        {visibleTransactions.length === 0 ? (
          <EmptyState className="py-8">
            <EmptyStateIcon>
              <MagnifyingGlassIcon aria-hidden="true" />
            </EmptyStateIcon>
            <EmptyStateTitle as="h3">No transactions match</EmptyStateTitle>
            <EmptyStateDescription>
              Change the search or filters to see more activity.
            </EmptyStateDescription>
          </EmptyState>
        ) : (
          <ul className="-my-1 divide-y divide-border/60">
            {visibleTransactions.map((transaction) => {
              const Icon = transactionIcons[transaction.icon];
              return (
                <li key={transaction.id}>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-1.5 py-3 text-start transition-colors hover:bg-muted/55 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                    onClick={() => onSelect(transaction)}
                  >
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-lg"
                      style={toneStyle(
                        categoryTone[transaction.category] ?? "var(--chart-1)",
                      )}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {transaction.merchant}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {transaction.category} · {transaction.date} ·{" "}
                        {transaction.account}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "shrink-0 text-sm font-medium tabular-nums",
                        transaction.amount > 0
                          ? "text-success-foreground"
                          : "text-foreground",
                      )}
                    >
                      {formatSigned(transaction.amount)}
                    </p>
                    <CaretRightIcon
                      size={14}
                      className="shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function FinanceSidebar({
  saved,
  frozen,
  onSave,
  onFreezeChange,
  onCardSettings,
}: {
  saved: number;
  frozen: boolean;
  onSave: () => void;
  onFreezeChange: (value: boolean) => void;
  onCardSettings: () => void;
}) {
  return (
    <aside className="grid content-start gap-5">
      <Card className="bg-[#edf4ee] dark:bg-[#1d2b23]">
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Savings goal</CardTitle>
            <CardDescription>{savingsGoal.name}</CardDescription>
          </div>
          <PiggyBankIcon
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-semibold tracking-[-0.04em] tabular-nums">
              {money.format(saved)}
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">
              of {money.format(savingsGoal.target)}
            </p>
          </div>
          <ProgressBar
            aria-label="Emergency fund progress"
            value={saved}
            maxValue={savingsGoal.target}
          />
          <p className="text-xs text-muted-foreground">
            {money.format(savingsGoal.target - saved)} left · Funds come from
            Everyday
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-1 w-full"
            onPress={onSave}
            isDisabled={saved >= savingsGoal.target}
          >
            <PlusIcon data-icon="inline-start" size={15} aria-hidden="true" />
            {saved >= savingsGoal.target
              ? "Goal reached"
              : `Add ${money.format(Math.min(250, savingsGoal.target - saved))}`}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Upcoming</CardTitle>
            <CardDescription>Next 14 days</CardDescription>
          </div>
          <CalendarBlankIcon
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="grid gap-1">
          {upcomingBills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between gap-3 border-b border-border/60 py-2.5 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{bill.name}</p>
                <p className="text-xs text-muted-foreground">{bill.due}</p>
              </div>
              <p className="shrink-0 text-sm font-medium tabular-nums">
                {money.format(bill.amount)}
              </p>
            </div>
          ))}
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckIcon size={13} aria-hidden="true" />
            All bills are on autopay
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            <CardTitle as="h2">Travel card</CardTitle>
            <CardDescription>Physical · Apple Pay</CardDescription>
          </div>
          <Button
            variant="minimal"
            size="xs"
            iconOnly
            aria-label="Card settings"
            onPress={onCardSettings}
          >
            <GearIcon size={16} aria-hidden="true" />
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative isolate overflow-hidden rounded-xl bg-[#203f36] p-4 text-white shadow-(--shadow-card)">
            <div
              aria-hidden="true"
              className="absolute -end-8 -top-10 -z-10 size-32 rounded-full border border-white/20"
            />
            <div
              aria-hidden="true"
              className="absolute -end-4 -top-6 -z-10 size-24 rounded-full border border-white/15"
            />
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/75">
              <span>Ledger</span>
              {frozen ? (
                <SnowflakeIcon size={15} aria-hidden="true" />
              ) : (
                <CreditCardIcon size={17} aria-hidden="true" />
              )}
            </div>
            <p className="mt-8 font-mono text-sm tracking-[0.16em]">
              •••• 1182
            </p>
            <div className="mt-4 flex items-end justify-between text-[10px] uppercase tracking-[0.12em] text-white/75">
              <span>Ana Souza</span>
              <span>09 / 29</span>
            </div>
          </div>
          <Switch
            isSelected={frozen}
            onChange={(next) => {
              onFreezeChange(next);
              showToast({
                title: next ? "Card frozen" : "Card unfrozen",
                description: next
                  ? "New payments are declined until you unfreeze it."
                  : "The card can accept payments again.",
                variant: "success",
              });
            }}
            description={
              frozen
                ? "New payments are declined."
                : "Pause new payments on this card."
            }
            className="w-full"
          >
            Freeze card
          </Switch>
        </CardContent>
      </Card>
    </aside>
  );
}

function FinanceDialogs({
  dialog,
  accounts,
  transactions,
  hidden,
  onClose,
  onAddAccount,
  onTransfer,
}: {
  dialog: FinanceDialog | null;
  accounts: Account[];
  transactions: Transaction[];
  hidden: boolean;
  onClose: () => void;
  onAddAccount: (event: FormEvent<HTMLFormElement>) => void;
  onTransfer: (draft: TransferDraft) => string | undefined;
}) {
  const [onlinePayments, setOnlinePayments] = useState(true);
  const [internationalPayments, setInternationalPayments] = useState(true);
  return (
    <DialogContent
      size="sm"
      overlayProps={{
        isOpen: dialog !== null,
        onOpenChange: (open) => {
          if (!open) onClose();
        },
      }}
    >
      {dialog?.kind === "transfer" && (
        <TransferForm
          accounts={accounts}
          hidden={hidden}
          onClose={onClose}
          onTransfer={onTransfer}
        />
      )}
      {dialog?.kind === "statement" && (
        <>
          <DialogHeader>
            <DialogTitle level={2}>Statements</DialogTitle>
            <DialogDescription>
              Export your November activity as a CSV.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
              <ReceiptIcon
                size={22}
                className="text-muted-foreground"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium">November 2026</p>
                <p className="text-xs text-muted-foreground">
                  {transactions.length} transactions across {accounts.length}{" "}
                  accounts
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onPress={() => downloadStatement(transactions)}>
              <DownloadSimpleIcon data-icon="inline-start" aria-hidden="true" />{" "}
              Download CSV
            </Button>
          </DialogFooter>
        </>
      )}
      {dialog?.kind === "account" && (
        <form onSubmit={onAddAccount}>
          <DialogHeader>
            <DialogTitle level={2}>Add account</DialogTitle>
            <DialogDescription>
              Create a demo account with a zero opening balance.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4 grid gap-4">
            <TextField
              label="Account name"
              name="name"
              pattern=".*\S.*"
              maxLength={32}
              isRequired
            />
            <Select
              label="Account type"
              name="type"
              defaultValue="checking"
              options={[...newAccountTypes]}
            />
            <TextField
              label="Last four digits"
              name="mask"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              isRequired
            />
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onPress={() => onClose()}>
              Cancel
            </Button>
            <Button type="submit">Add account</Button>
          </DialogFooter>
        </form>
      )}
      {dialog?.kind === "card" && (
        <>
          <DialogHeader>
            <DialogTitle level={2}>Travel card settings</DialogTitle>
            <DialogDescription>Card ending in 1182</DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4 grid gap-4">
            <Switch isSelected={onlinePayments} onChange={setOnlinePayments}>
              Online payments
            </Switch>
            <Switch
              isSelected={internationalPayments}
              onChange={setInternationalPayments}
            >
              International payments
            </Switch>
          </DialogBody>
          <DialogFooter>
            <Button onPress={() => onClose()}>Done</Button>
          </DialogFooter>
        </>
      )}
      {dialog?.kind === "transaction" && (
        <>
          <DialogHeader>
            <DialogTitle level={2}>{dialog.transaction.merchant}</DialogTitle>
            <DialogDescription>{dialog.transaction.detail}</DialogDescription>
          </DialogHeader>
          <DialogBody className="mt-4 grid gap-3">
            <p className="text-3xl font-semibold tracking-tight tabular-nums">
              {formatSigned(dialog.transaction.amount)}
            </p>
            <dl className="grid grid-cols-[1fr_auto] gap-2 border-t border-border pt-3 text-sm">
              <dt className="text-muted-foreground">Date</dt>
              <dd>{dialog.transaction.date}</dd>
              <dt className="text-muted-foreground">Account</dt>
              <dd>{dialog.transaction.account}</dd>
              <dt className="text-muted-foreground">Category</dt>
              <dd>{dialog.transaction.category}</dd>
            </dl>
          </DialogBody>
        </>
      )}
    </DialogContent>
  );
}

function TransferForm({
  accounts,
  hidden,
  onClose,
  onTransfer,
}: {
  accounts: Account[];
  hidden: boolean;
  onClose: () => void;
  onTransfer: (draft: TransferDraft) => string | undefined;
}) {
  const [from, setFrom] = useState("everyday");
  const [to, setTo] = useState("reserve");
  const [amount, setAmount] = useState("");
  const [transferError, setTransferError] = useState("");

  const fromOptions = accounts
    .filter((item) => item.icon !== "credit")
    .map((item) => ({
      id: item.id,
      name: item.name,
      description: hidden
        ? item.kind
        : `${money.format(item.balance)} available`,
    }));
  const toOptions = accounts.map((item) => ({
    id: item.id,
    name: item.name,
    description: `${item.kind} · ${item.mask}`,
  }));

  function submitTransfer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTransferError(onTransfer({ from, to, amount }) ?? "");
  }

  return (
    <form onSubmit={submitTransfer}>
      <DialogHeader>
        <DialogTitle level={2}>Move money</DialogTitle>
        <DialogDescription>
          Transfer between your Ledger accounts.
        </DialogDescription>
      </DialogHeader>
      <DialogBody className="mt-4 grid gap-4">
        <Select
          label="From"
          options={fromOptions}
          value={from}
          onChange={(value) => {
            setFrom(String(value));
            setTransferError("");
          }}
        />
        <Select
          label="To"
          options={toOptions}
          value={to}
          onChange={(value) => {
            setTo(String(value));
            setTransferError("");
          }}
        />
        <TextField
          label="Amount (USD)"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(value) => {
            setAmount(value);
            setTransferError("");
          }}
          isInvalid={Boolean(transferError)}
          aria-describedby={transferError ? "transfer-error" : undefined}
        />
        {transferError && (
          <p
            id="transfer-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {transferError}
          </p>
        )}
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onPress={() => onClose()}>
          Cancel
        </Button>
        <Button type="submit">Move money</Button>
      </DialogFooter>
    </form>
  );
}

function parseCents(value: string) {
  const text = value.trim();
  if (!/^(?:\d{1,9}(?:\.\d{0,2})?|\.\d{1,2})$/.test(text)) return 0;
  return Math.round(Number(text) * 100);
}

function downloadStatement(transactions: Transaction[]) {
  function csvText(value: string) {
    const safe = /^[=+\-@\t\r\n]/.test(value) ? `'${value}` : value;
    return `"${safe.replaceAll('"', '""')}"`;
  }

  const rows = transactions.map((item) =>
    [
      csvText(item.date),
      csvText(item.merchant),
      csvText(item.category),
      csvText(item.account),
      item.amount.toFixed(2),
    ].join(","),
  );
  const url = URL.createObjectURL(
    new Blob(
      [
        `Date,Description,Category,Account,Amount (USD)\r\n${rows.join("\r\n")}`,
      ],
      { type: "text/csv;charset=utf-8" },
    ),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "ledger-november-2026.csv";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function AccountCard({
  account,
  hidden,
  onView,
}: {
  account: Account;
  hidden: boolean;
  onView: () => void;
}) {
  const Icon = accountIcons[account.icon];
  const negative = account.balance < 0;
  return (
    <Card className="grid min-w-0 grid-cols-1 content-start gap-3 p-3.5 sm:p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground">
          <Icon size={17} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{account.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {account.kind} ···· {account.mask}
          </p>
        </div>
        <ButtonLink
          href="#transactions"
          variant="ghost"
          iconOnly
          size="sm"
          aria-label={`View ${account.name} transactions`}
          className="shrink-0"
          onClick={onView}
        >
          <CaretRightIcon size={15} aria-hidden="true" />
        </ButtonLink>
      </div>
      <p
        className={cn(
          "text-2xl font-semibold tracking-[-0.04em] tabular-nums",
          negative && "text-muted-foreground",
        )}
      >
        {hidden ? "••••" : money.format(account.balance)}
      </p>
      <p className="text-xs text-muted-foreground">
        {account.trend === 0
          ? "Current balance"
          : `${(account.trend > 0 ? "+" : "") + account.trend}% this month`}
      </p>
    </Card>
  );
}

function BalanceOverview({
  total,
  accountCount,
  hidden,
  onToggleVisibility,
}: {
  total: number;
  accountCount: number;
  hidden: boolean;
  onToggleVisibility: () => void;
}) {
  const [period, setPeriod] = useState<"month" | "quarter">("month");
  const history =
    period === "month"
      ? balanceHistory.filter((entry) => entry.daysAgo <= 31)
      : balanceHistory;
  const start = history[0];
  const series = [...history, { date: "Nov 24", daysAgo: 0, balance: total }];
  const values = series.map((entry) => entry.balance);
  const min = Math.min(...values) - 450;
  const max = Math.max(...values) + 450;
  const points = series
    .map((entry) => {
      const x = 6 + (1 - entry.daysAgo / start.daysAgo) * 468;
      const y = 100 - ((entry.balance - min) / (max - min)) * 94;
      return [x, y].join(",");
    })
    .join(" ");
  const change = total - start.balance;
  const changePercent = balanceChangePercent.format(change / start.balance);

  return (
    <section
      aria-label="Total balance"
      className="relative isolate grid min-w-0 gap-4 overflow-hidden rounded-2xl bg-[#183c31] px-5 py-5 text-white shadow-(--shadow-card) sm:px-7 sm:py-6 md:grid-cols-[minmax(17rem,0.9fr)_minmax(0,1.1fr)] md:items-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#37735d,transparent_70%)]"
      />
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-100">
          Total balance
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={hidden ? "Show balances" : "Hide balances"}
            className="text-emerald-100 hover:bg-white/10 hover:text-white"
            onPress={onToggleVisibility}
          >
            {hidden ? (
              <EyeIcon size={16} aria-hidden="true" />
            ) : (
              <EyeSlashIcon size={16} aria-hidden="true" />
            )}
          </Button>
        </div>
        <p className="mt-2 text-[clamp(2rem,6vw,3.4rem)] leading-none font-semibold tracking-[-0.055em] tabular-nums wrap-anywhere">
          {hidden ? "••••••" : money.format(total)}
        </p>
        <p className="mt-3 text-xs text-emerald-100/90">
          {accountCount} accounts · As of Nov 24, 2026
        </p>
        {!hidden && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-emerald-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-200/15 px-2 py-1 text-xs font-semibold text-emerald-100">
              <ArrowUpRightIcon size={13} aria-hidden="true" /> {changePercent}
            </span>
            <span>
              {formatSigned(change)} since {start.date}
            </span>
          </div>
        )}
      </div>

      {!hidden && (
        <div className="min-w-0">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-emerald-100">
              Balance history
            </p>
            <ToggleButtonGroup
              aria-label="Balance history range"
              size="xs"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[period]}
              onSelectionChange={(keys) =>
                setPeriod(keys.has("quarter") ? "quarter" : "month")
              }
              className="rounded-full bg-[#14372d] inset-ring-white/20 *:data-[slot=item-highlight]:bg-white/10"
            >
              <ToggleButton
                id="month"
                variant="ghost"
                aria-label="1M, one month"
                className="rounded-full text-emerald-100 hover:bg-white/10 hover:text-white selected:bg-[#bbf7d0] selected:text-[#14372d]"
              >
                1M
              </ToggleButton>
              <ToggleButton
                id="quarter"
                variant="ghost"
                aria-label="3M, three months"
                className="rounded-full text-emerald-100 hover:bg-white/10 hover:text-white selected:bg-[#bbf7d0] selected:text-[#14372d]"
              >
                3M
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 480 105"
            preserveAspectRatio="none"
            className="h-25 w-full text-[#baf2cf]"
          >
            <path
              d="M0 35 H480 M0 68 H480 M0 101 H480"
              fill="none"
              stroke="currentColor"
              opacity="0.18"
              vectorEffect="non-scaling-stroke"
            />
            <polygon
              points={`6,104 ${points} 474,104`}
              fill="currentColor"
              opacity="0.16"
            />
            <polyline
              points={points}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="mt-1 flex justify-between gap-2 text-xs text-emerald-100/90">
            <span>{start.date}</span>
            <span>Nov 24</span>
          </div>
        </div>
      )}
    </section>
  );
}
