"use client";

import {
  CoffeeBeanIcon,
  CopyIcon,
  DotsThreeIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  IdentificationCardIcon,
  PackageIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import { ComboBox } from "../../vip-ui/combo-box";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../vip-ui/empty-state";
import { InlineEdit } from "../../vip-ui/inline-edit";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../vip-ui/menu";
import { Meter } from "../../vip-ui/meter";
import {
  Stat,
  StatDetail,
  StatGroup,
  StatLabel,
  StatValue,
} from "../../vip-ui/stat";
import { Switch } from "../../vip-ui/switch";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "../../vip-ui/table";
import { Tag, TagGroup, TagListView } from "../../vip-ui/tag-group";
import { showToast } from "../../vip-ui/toast";
import { cn } from "../../vip-ui/utils";
import { ActivityFeed } from "./activity-feed";
import {
  type Activity,
  addDays,
  type Customer,
  formatDay,
  formatMoney,
  formatShortDay,
  customers as initialCustomers,
  nowStamp,
  type OrderStatus,
  store,
  tagSuggestions,
  today,
} from "./data";
import { EmailDialog } from "./email-dialog";

const orderStatus: Record<
  OrderStatus,
  { label: string; variant: "success" | "neutral" | "warning" | "accent" }
> = {
  delivered: { label: "Delivered", variant: "success" },
  shipped: { label: "Shipped", variant: "accent" },
  partial: { label: "Partly refunded", variant: "warning" },
  refunded: { label: "Refunded", variant: "neutral" },
};

let nextId = 0;

function entry(kind: Activity["kind"], text: string): Activity {
  nextId += 1;
  return {
    id: `new-${nextId}`,
    kind,
    text,
    author: store.agent,
    at: nowStamp(),
  };
}

export function CustomerProfile() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [currentId, setCurrentId] = useState(initialCustomers[0].id);
  const [emailOpen, setEmailOpen] = useState(false);
  const [tagDraft, setTagDraft] = useState("");
  const customer =
    customers.find((item) => item.id === currentId) ?? customers[0];

  function replace(next: Customer) {
    setCustomers((current) =>
      current.map((item) => (item.id === next.id ? next : item)),
    );
  }

  function update(patch: Partial<Customer>) {
    replace({ ...customer, ...patch });
  }

  function withUndo(next: Customer, title: string, description?: string) {
    const before = customer;
    replace(next);
    showToast({
      title,
      description,
      action: { label: "Undo", onAction: () => replace(before) },
    });
  }

  function select(key: Key | null) {
    if (key == null) return;
    setCurrentId(String(key));
    setTagDraft("");
  }

  function addTag(raw: string) {
    const value = raw.trim();
    setTagDraft("");
    if (!value) return;
    if (customer.tags.some((tag) => tag.toLowerCase() === value.toLowerCase()))
      return;
    update({ tags: [...customer.tags, value] });
  }

  function skipDelivery() {
    const subscription = customer.subscription;
    if (!subscription) return;
    const next = addDays(subscription.next, subscription.everyDays);
    withUndo(
      {
        ...customer,
        subscription: { ...subscription, next },
        activity: [
          entry(
            "subscription",
            `Skipped the delivery on ${formatDay(subscription.next)}.`,
          ),
          ...customer.activity,
        ],
      },
      "Delivery skipped",
      `The next delivery is ${formatDay(next)}.`,
    );
  }

  function setPaused(paused: boolean) {
    const subscription = customer.subscription;
    if (!subscription) return;
    const next = paused
      ? addDays(subscription.next, subscription.everyDays * 2)
      : addDays(today, 1);
    withUndo(
      {
        ...customer,
        subscription: {
          ...subscription,
          status: paused ? "paused" : "active",
          next,
        },
        activity: [
          entry(
            "subscription",
            paused
              ? `Paused the subscription until ${formatDay(next)}.`
              : "Resumed the subscription.",
          ),
          ...customer.activity,
        ],
      },
      paused ? "Subscription paused" : "Subscription resumed",
      paused
        ? `It starts again on ${formatDay(next)}.`
        : `The next delivery is ${formatDay(next)}.`,
    );
  }

  const subscription = customer.subscription;
  const active = subscription?.status === "active";
  const lastOrder = customer.orders[0];
  const average = customer.ordersCount
    ? Math.round(customer.spent / customer.ordersCount)
    : 0;
  const isNew = customer.since >= addDays(today, -30);
  const firstName = customer.name.split(" ")[0];

  return (
    <div className="min-h-svh bg-muted/40">
      <header className="border-b border-border/70 bg-background">
        <div className="mx-auto flex h-14 w-full max-w-280 items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold">
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground"
            >
              <CoffeeBeanIcon size={16} weight="fill" />
            </span>
            <span className="max-sm:sr-only">{store.name}</span>
          </div>
          <ComboBox
            aria-label="Find a customer"
            placeholder="Find a customer"
            size="sm"
            options={customers.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.email,
            }))}
            selectedKey={currentId}
            onSelectionChange={select}
            className="ms-auto w-full max-w-72"
          />
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-280 gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar name={customer.name} size="lg" />
            <div className="grid min-w-0 gap-1">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <h1 className="truncate text-2xl font-semibold tracking-[-0.04em]">
                  {customer.name}
                </h1>
                {subscription ? (
                  <Badge variant={active ? "success" : "warning"} dot>
                    {active ? "Subscriber" : "Paused"}
                  </Badge>
                ) : isNew ? (
                  <Badge variant="accent">New</Badge>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                {[
                  customer.company,
                  customer.location,
                  `Customer since ${formatDay(customer.since)}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onPress={() => setEmailOpen(true)}>
              <EnvelopeSimpleIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              Send email
            </Button>
            <MenuTrigger>
              <Button
                variant="outline"
                iconOnly
                aria-label="More customer actions"
              >
                <DotsThreeIcon size={16} weight="bold" aria-hidden="true" />
              </Button>
              <MenuPopover placement="bottom end">
                <MenuContent aria-label="Customer actions">
                  <MenuItem
                    onAction={() => {
                      void navigator.clipboard?.writeText(customer.email);
                      showToast({ title: "Email copied" });
                    }}
                  >
                    <CopyIcon size={16} aria-hidden="true" />
                    Copy email
                  </MenuItem>
                  <MenuItem
                    onAction={() => {
                      void navigator.clipboard?.writeText(customer.id);
                      showToast({
                        title: "Customer ID copied",
                        description: customer.id,
                      });
                    }}
                  >
                    <IdentificationCardIcon size={16} aria-hidden="true" />
                    Copy customer ID
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem
                    onAction={() =>
                      showToast({
                        title: "Export started",
                        description: `We email the file to ${store.agent} in a few minutes.`,
                      })
                    }
                  >
                    <DownloadSimpleIcon size={16} aria-hidden="true" />
                    Export customer data
                  </MenuItem>
                </MenuContent>
              </MenuPopover>
            </MenuTrigger>
          </div>
        </div>

        <StatGroup aria-label="Customer totals">
          <Stat>
            <StatLabel>Total spent</StatLabel>
            <StatValue className="tabular-nums">
              {formatMoney(customer.spent)}
            </StatValue>
          </Stat>
          <Stat>
            <StatLabel>Orders</StatLabel>
            <StatValue className="tabular-nums">
              {customer.ordersCount}
            </StatValue>
          </Stat>
          <Stat>
            <StatLabel>Average order</StatLabel>
            <StatValue
              className={cn(
                "tabular-nums",
                !customer.ordersCount && "text-muted-foreground",
              )}
            >
              {customer.ordersCount ? formatMoney(average) : "None"}
            </StatValue>
          </Stat>
          <Stat>
            <StatLabel>Last order</StatLabel>
            <StatValue className={cn(!lastOrder && "text-muted-foreground")}>
              {lastOrder ? formatShortDay(lastOrder.date) : "None"}
            </StatValue>
            {lastOrder ? <StatDetail>{lastOrder.id}</StatDetail> : null}
          </Stat>
        </StatGroup>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid min-w-0 content-start gap-6">
            {subscription ? (
              <Card>
                <CardHeader>
                  <CardTitle as="h2">Subscription</CardTitle>
                  <CardDescription>
                    {subscription.plan} · {formatMoney(subscription.price)} for
                    each delivery
                  </CardDescription>
                  <CardAction>
                    <Badge variant={active ? "success" : "warning"}>
                      {active ? "Active" : "Paused"}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border/70"
                    >
                      <CoffeeBeanIcon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {subscription.product}
                      </p>
                      <p className="text-xs leading-5 text-muted-foreground">
                        {active
                          ? `Next delivery ${formatDay(subscription.next)}`
                          : `Starts again ${formatDay(subscription.next)}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {active ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onPress={skipDelivery}
                        >
                          Skip next
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onPress={() => setPaused(true)}
                        >
                          Pause
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onPress={() => setPaused(false)}>
                        Resume now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle as="h2">Recent orders</CardTitle>
                {customer.ordersCount ? (
                  <CardDescription>
                    The last {customer.orders.length} of {customer.ordersCount}{" "}
                    orders
                  </CardDescription>
                ) : null}
              </CardHeader>
              {customer.orders.length ? (
                <div className="mt-4 overflow-x-auto border-t border-border/70">
                  <Table aria-label="Recent orders" className="min-w-[32rem]">
                    <TableHeader>
                      <Column isRowHeader className="ps-5">
                        Order
                      </Column>
                      <Column>Date</Column>
                      <Column>Status</Column>
                      <Column className="text-end">Items</Column>
                      <Column className="pe-5 text-end">Total</Column>
                    </TableHeader>
                    <TableBody items={customer.orders}>
                      {(order) => (
                        <Row id={order.id}>
                          <Cell className="ps-5 font-medium">{order.id}</Cell>
                          <Cell className="text-muted-foreground">
                            {formatDay(order.date)}
                          </Cell>
                          <Cell>
                            <Badge variant={orderStatus[order.status].variant}>
                              {orderStatus[order.status].label}
                            </Badge>
                          </Cell>
                          <Cell className="text-end tabular-nums">
                            {order.items}
                          </Cell>
                          <Cell className="pe-5 text-end tabular-nums">
                            {formatMoney(order.total)}
                          </Cell>
                        </Row>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <CardContent>
                  <EmptyState>
                    <EmptyStateIcon>
                      <PackageIcon />
                    </EmptyStateIcon>
                    <EmptyStateTitle>No orders yet</EmptyStateTitle>
                    <EmptyStateDescription>
                      Orders from {firstName} show here.
                    </EmptyStateDescription>
                  </EmptyState>
                </CardContent>
              )}
            </Card>

            <ActivityFeed
              key={customer.id}
              activity={customer.activity}
              onAddNote={(text) =>
                update({
                  activity: [entry("note", text), ...customer.activity],
                })
              }
              onDeleteNote={(id) =>
                withUndo(
                  {
                    ...customer,
                    activity: customer.activity.filter(
                      (item) => item.id !== id,
                    ),
                  },
                  "Note deleted",
                )
              }
            />
          </div>

          <aside className="grid min-w-0 content-start gap-6">
            <Card>
              <CardHeader>
                <CardTitle as="h2">Contact</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <InlineEdit
                  key={`email-${customer.id}`}
                  label="Email"
                  value={customer.email}
                  onSave={(next) => {
                    const value = next.trim();
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      throw new Error("Enter an email like name@example.com.");
                    }
                    update({ email: value });
                  }}
                />
                <InlineEdit
                  key={`phone-${customer.id}`}
                  label="Phone"
                  value={customer.phone}
                  placeholder={{
                    edit: "+1 (555) 555-0100",
                    preview: "Add a phone number",
                  }}
                  onSave={(next) => {
                    const value = next.trim();
                    if (value && value.replace(/\D/g, "").length < 10) {
                      throw new Error(
                        "Enter a phone number with 10 or more digits.",
                      );
                    }
                    update({
                      phone: value,
                      smsOptIn: value ? customer.smsOptIn : false,
                    });
                  }}
                />
                <DescriptionList className="border-t border-border/70 pt-4">
                  <DescriptionTerm>Location</DescriptionTerm>
                  <DescriptionDetail>{customer.location}</DescriptionDetail>
                  <DescriptionTerm>Customer ID</DescriptionTerm>
                  <DescriptionDetail className="font-mono text-xs">
                    {customer.id}
                  </DescriptionDetail>
                </DescriptionList>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Tags</CardTitle>
                <CardDescription>Use tags to group customers.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <TagGroup
                  aria-label="Customer tags"
                  onRemove={(keys) =>
                    update({
                      tags: customer.tags.filter((tag) => !keys.has(tag)),
                    })
                  }
                >
                  <TagListView
                    items={customer.tags.map((tag) => ({ id: tag }))}
                    renderEmptyState={() => "No tags"}
                  >
                    {(tag) => <Tag id={tag.id}>{tag.id}</Tag>}
                  </TagListView>
                </TagGroup>
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    addTag(tagDraft);
                  }}
                >
                  <ComboBox
                    key={`tags-${customer.id}-${customer.tags.length}`}
                    aria-label="Add a tag"
                    placeholder="Add a tag"
                    size="sm"
                    allowsCustomValue
                    options={tagSuggestions
                      .filter((tag) => !customer.tags.includes(tag))
                      .map((tag) => ({ id: tag, name: tag }))}
                    inputValue={tagDraft}
                    onInputChange={setTagDraft}
                    onSelectionChange={(key) => {
                      if (key != null) addTag(String(key));
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && tagDraft.trim()) {
                        addTag(tagDraft);
                      }
                    }}
                    className="min-w-0 flex-1"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    isDisabled={!tagDraft.trim()}
                  >
                    Add
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Marketing</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Switch
                  isSelected={customer.emailOptIn}
                  onChange={(value) => update({ emailOptIn: value })}
                  description="New coffees and roast dates."
                  className="w-full"
                >
                  Email
                </Switch>
                <div className="border-t border-border/70 pt-4">
                  <Switch
                    isSelected={customer.smsOptIn}
                    isDisabled={!customer.phone}
                    onChange={(value) => update({ smsOptIn: value })}
                    description={
                      customer.phone
                        ? "Shipping updates by text message."
                        : "Add a phone number first."
                    }
                    className="w-full"
                  >
                    Text messages
                  </Switch>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Most ordered</CardTitle>
                <CardDescription>
                  {customer.favorites.length > 0
                    ? `${customer.favorites.reduce((sum, item) => sum + item.bags, 0)} bags in ${customer.ordersCount} orders`
                    : "No orders yet."}
                </CardDescription>
              </CardHeader>
              {customer.favorites.length > 0 && (
                <CardContent className="grid gap-4">
                  {customer.favorites.map((item) => (
                    <Meter
                      key={item.name}
                      label={item.name}
                      value={item.bags}
                      maxValue={customer.favorites[0].bags}
                      valueLabel={`${item.bags} bags`}
                    />
                  ))}
                </CardContent>
              )}
            </Card>
          </aside>
        </div>
      </main>

      <EmailDialog
        key={customer.id}
        customer={customer}
        isOpen={emailOpen}
        onOpenChange={setEmailOpen}
        onSend={(subject) => {
          setEmailOpen(false);
          update({
            activity: [
              entry("email", `Sent an email: ${subject}`),
              ...customer.activity,
            ],
          });
          showToast({
            title: "Email sent",
            description: `${customer.name} gets it in a minute.`,
            variant: "success",
          });
        }}
      />
    </div>
  );
}
