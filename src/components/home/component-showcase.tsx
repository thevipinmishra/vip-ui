"use client";

import { parseDate } from "@internationalized/date";
import type { ReactNode } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Message } from "@/components/ui/message";
import { Slider } from "@/components/ui/slider";
import { Stepper } from "@/components/ui/stepper";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "@/components/ui/table";
import { Tag, TagGroup, TagListView } from "@/components/ui/tag-group";
import { Tree, TreeItem } from "@/components/ui/tree";
import { cn } from "@/lib/utils";

const currency = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
} as const;

const projects = [
  {
    id: "search",
    name: "Search redesign",
    status: "In progress",
    owner: "Maya Chen",
    budget: "$12,400",
  },
  {
    id: "mobile",
    name: "Mobile app",
    status: "Review",
    owner: "Sam Rivera",
    budget: "$8,200",
  },
  {
    id: "brand",
    name: "Brand refresh",
    status: "Live",
    owner: "Jo Park",
    budget: "$5,600",
  },
  {
    id: "docs",
    name: "Docs portal",
    status: "Draft",
    owner: "Amina Shah",
    budget: "$2,900",
  },
] as const;

const statusVariant = {
  "In progress": "accent",
  Review: "warning",
  Live: "success",
  Draft: "neutral",
} as const;

const topics = [
  { id: "design", name: "Design" },
  { id: "engineering", name: "Engineering" },
  { id: "product", name: "Product" },
  { id: "research", name: "Research" },
  { id: "marketing", name: "Marketing" },
];

function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col justify-center rounded-2xl bg-muted/60 p-4 sm:p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ComponentShowcase() {
  return (
    <div className="rounded-[1.75rem] bg-card p-2 shadow-(--shadow-card) ring-1 ring-border/70 sm:p-3">
      <div className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-6">
        <Panel className="md:col-span-2 lg:col-span-4 lg:row-span-2">
          <Calendar
            aria-label="Project schedule"
            visibleDuration={{ months: 2 }}
            defaultValue={parseDate("2026-11-12")}
            className="mx-auto [&_[data-slot=calendar-months]>div:nth-child(2)]:max-md:hidden"
          />
        </Panel>

        <Panel className="lg:col-span-2">
          <Tree
            aria-label="Project files"
            selectionMode="single"
            defaultExpandedKeys={["src"]}
            defaultSelectedKeys={["button"]}
            className="w-full border-0 bg-transparent p-0 shadow-none"
          >
            <TreeItem id="src" title="src">
              <TreeItem id="app" title="app" />
              <TreeItem id="button" title="button.tsx" />
              <TreeItem id="registry" title="registry.json" />
            </TreeItem>
            <TreeItem id="package" title="package.json" />
          </Tree>
        </Panel>

        <Panel className="lg:col-span-2">
          <Stepper
            steps={[
              { label: "Details" },
              { label: "Review" },
              { label: "Complete" },
            ]}
            currentStep={1}
            aria-label="Project setup progress"
            className="w-full"
          />
        </Panel>

        <Panel className="@container md:col-span-2 lg:col-span-4 lg:row-span-2">
          <TableContainer className="rounded-none border-0 bg-transparent shadow-none">
            <Table
              aria-label="Projects"
              selectionMode="multiple"
              selectionBehavior="toggle"
              defaultSelectedKeys={["search", "brand"]}
              className="min-w-full"
            >
              <TableHeader>
                <Column isRowHeader>Project</Column>
                <Column className="@max-[30rem]:hidden">Status</Column>
                <Column className="@max-xl:hidden">Owner</Column>
                <Column className="@max-sm:hidden text-end">Budget</Column>
              </TableHeader>
              <TableBody items={projects}>
                {(project) => (
                  <Row id={project.id}>
                    <Cell>
                      <span className="block truncate font-medium">
                        {project.name}
                      </span>
                    </Cell>
                    <Cell className="@max-[30rem]:hidden">
                      <Badge variant={statusVariant[project.status]} dot>
                        {project.status}
                      </Badge>
                    </Cell>
                    <Cell className="@max-xl:hidden">
                      <span className="flex items-center gap-2">
                        <Avatar name={project.owner} size="xs" />
                        <span className="truncate">{project.owner}</span>
                      </span>
                    </Cell>
                    <Cell className="@max-sm:hidden text-end tabular-nums">
                      {project.budget}
                    </Cell>
                  </Row>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Panel>

        <Panel className="lg:col-span-2">
          <Slider
            label="Budget"
            defaultValue={[1200, 3200]}
            thumbLabels={["Minimum budget", "Maximum budget"]}
            minValue={0}
            maxValue={4000}
            step={100}
            formatOptions={currency}
            marks={[0, 2000, 4000]}
          />
        </Panel>

        <Panel className="lg:col-span-2">
          <TagGroup
            aria-label="Topics"
            selectionMode="multiple"
            defaultSelectedKeys={["design", "product"]}
            size="sm"
          >
            <TagListView items={topics}>
              {(item) => <Tag id={item.id}>{item.name}</Tag>}
            </TagListView>
          </TagGroup>
        </Panel>

        <Panel className="lg:col-span-3">
          <Accordion
            variant="divided"
            defaultExpandedKeys={["shipping"]}
            className="w-full"
          >
            <AccordionItem id="shipping" title="Shipping">
              Orders leave the warehouse in 1–2 days.
            </AccordionItem>
            <AccordionItem id="returns" title="Returns">
              Send anything back within 30 days.
            </AccordionItem>
            <AccordionItem id="support" title="Support">
              We answer within one business day.
            </AccordionItem>
          </Accordion>
        </Panel>

        <Panel className="lg:col-span-3">
          <div className="grid gap-3">
            <Message sender="Workspace" side="system">
              Maya Chen joined the conversation.
            </Message>
            <Message
              sender="Maya Chen"
              avatar={<Avatar name="Maya Chen" size="sm" />}
            >
              The new navigation is ready for review.
            </Message>
            <Message sender="You" side="outgoing">
              Looks good. I will check the mobile layout today.
            </Message>
          </div>
        </Panel>
      </div>
    </div>
  );
}
