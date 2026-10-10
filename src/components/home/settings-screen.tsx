"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Meter } from "@/components/ui/meter";
import { NumberField } from "@/components/ui/number-field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showToast } from "@/components/ui/toast";
import { AppearanceBlock } from "./appearance-block";
import { Block, BlockBody, BlockFooter } from "./block";
import { NotificationsBlock, TeamBlock } from "./form-blocks";
import { Part } from "./part";
import { Screen, ScreenHeader } from "./screen";

const seatPrice = 20;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function PlanBlock() {
  const [seats, setSeats] = useState(15);

  return (
    <Block
      title="Plan and usage"
      description="Renews on November 1."
      action={<Badge variant="accent">Pro</Badge>}
    >
      <BlockBody className="gap-0 pt-2">
        <Part slug="tabs">
          <Tabs defaultValue="usage">
            <TabsList aria-label="Plan details" className="w-full">
              <TabsTrigger value="usage" className="flex-1">
                Usage
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex-1">
                Billing
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="usage"
              className="mt-4 grid gap-4 rounded-none bg-transparent p-0 shadow-none ring-0"
            >
              <Part slug="meter">
                <Meter
                  label="Build minutes"
                  value={1640}
                  maxValue={2000}
                  valueLabel="1,640 of 2,000"
                />
              </Part>
              <Meter label="Bandwidth" value={48} valueLabel="48 of 100 GB" />
              <Part slug="alert">
                <Alert variant="warning" title="82% of build minutes used">
                  New builds stop at the limit.
                </Alert>
              </Part>
            </TabsContent>
            <TabsContent
              value="billing"
              className="mt-4 rounded-none bg-transparent p-0 shadow-none ring-0"
            >
              <Part slug="description-list">
                <DescriptionList className="sm:grid-cols-[minmax(0,7rem)_minmax(0,1fr)] sm:gap-y-3">
                  <DescriptionTerm>Plan</DescriptionTerm>
                  <DescriptionDetail>Pro, billed monthly</DescriptionDetail>
                  <DescriptionTerm>Seats</DescriptionTerm>
                  <DescriptionDetail>12 of 15 in use</DescriptionDetail>
                  <DescriptionTerm>Price</DescriptionTerm>
                  <DescriptionDetail>
                    ${seatPrice} for each seat
                  </DescriptionDetail>
                  <DescriptionTerm>Card</DescriptionTerm>
                  <DescriptionDetail>Visa ending in 4242</DescriptionDetail>
                </DescriptionList>
              </Part>
            </TabsContent>
          </Tabs>
        </Part>
      </BlockBody>
      <BlockFooter className="pt-4">
        <Part slug="dialog" className="w-full">
          <Dialog>
            <DialogTrigger variant="outline" className="w-full">
              Change seats
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change seats</DialogTitle>
                <DialogClose aria-label="Close" />
              </DialogHeader>
              <DialogDescription>
                Each seat costs ${seatPrice} each month. We charge the
                difference on your next invoice.
              </DialogDescription>
              <NumberField
                label="Seats"
                minValue={12}
                maxValue={100}
                value={seats}
                onChange={(value) => setSeats(Number.isNaN(value) ? 12 : value)}
                description="You use 12 seats now."
                className="mt-5"
              />
              <p className="mt-4 text-sm">
                New total:{" "}
                <span className="font-semibold tabular-nums">
                  {money.format(seats * seatPrice)}
                </span>{" "}
                <span className="text-muted-foreground">each month</span>
              </p>
              <DialogFooter>
                <DialogClose variant="outline">Cancel</DialogClose>
                <DialogClose
                  variant="default"
                  onPress={() =>
                    showToast({
                      title: "Seats updated",
                      description: `Your plan now has ${seats} seats.`,
                      variant: "success",
                    })
                  }
                >
                  Save
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Part>
      </BlockFooter>
    </Block>
  );
}

export function SettingsScreen() {
  return (
    <Screen>
      <ScreenHeader title="Settings" detail="Acme Inc" />
      <div className="grid min-w-0 items-start gap-4 md:grid-cols-2">
        <div className="grid min-w-0 gap-4">
          <AppearanceBlock />
          <TeamBlock />
        </div>
        <div className="grid min-w-0 gap-4">
          <NotificationsBlock />
          <PlanBlock />
        </div>
      </div>
    </Screen>
  );
}
