"use client";

import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "../../vip-ui/table";
import { type ComparisonValue, comparison } from "./data";

function ValueCell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center">
        <span className="grid size-5 place-items-center rounded-full bg-accent text-accent-foreground">
          <CheckIcon size={12} weight="bold" aria-hidden="true" />
        </span>
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center">
        <MinusIcon
          size={15}
          aria-hidden="true"
          className="text-muted-foreground/50"
        />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="text-[13px] text-foreground">{value}</span>;
}

export function ComparisonTable() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const update = () => {
      setAtEnd(
        element.scrollHeight - element.scrollTop - element.clientHeight < 8,
      );
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <TableContainer ref={containerRef} className="max-h-[34rem]">
        <Table aria-label="Plan comparison" className="min-w-[680px]">
          <TableHeader>
            <Column isRowHeader className="py-2">
              Feature
            </Column>
            <Column className="py-2 text-center">Starter</Column>
            <Column className="py-2 text-center">Team</Column>
            <Column className="py-2 text-center">Scale</Column>
          </TableHeader>
          <TableBody>
            {comparison.map((row, index) => {
              const previous = comparison[index - 1];
              const showGroup = !previous || previous.group !== row.group;
              return (
                <Row key={row.feature} id={row.feature}>
                  <Cell className="py-2">
                    {showGroup && (
                      <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {row.group}
                      </span>
                    )}
                    <span className="text-[13px] font-medium">
                      {row.feature}
                    </span>
                  </Cell>
                  <Cell className="py-2 text-center">
                    <ValueCell value={row.starter} />
                  </Cell>
                  <Cell className="py-2 text-center">
                    <ValueCell value={row.team} />
                  </Cell>
                  <Cell className="py-2 text-center">
                    <ValueCell value={row.scale} />
                  </Cell>
                </Row>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!atEnd && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-px bottom-px flex h-16 items-end justify-center rounded-b-lg bg-gradient-to-t from-card via-card/85 to-transparent pb-2"
        >
          <span className="rounded-full bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
            Scroll for more
          </span>
        </div>
      )}
    </div>
  );
}
