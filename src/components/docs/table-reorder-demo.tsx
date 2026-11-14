"use client";

import { useDragAndDrop, useListData } from "react-aria-components";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableDropIndicator,
  TableHeader,
} from "@/components/ui/table";

export function TableReorderDemo() {
  const list = useListData({
    initialItems: [
      { id: "1", name: "Write the release notes", owner: "Maya Chen" },
      { id: "2", name: "Update the pricing page", owner: "Sam Rivera" },
      { id: "3", name: "Record the demo video", owner: "Jo Park" },
      { id: "4", name: "Send the newsletter", owner: "Alex Kim" },
    ],
  });

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": list.getItem(key)?.name ?? "",
      })),
    onReorder(event) {
      if (event.target.dropPosition === "before") {
        list.moveBefore(event.target.key, event.keys);
      } else if (event.target.dropPosition === "after") {
        list.moveAfter(event.target.key, event.keys);
      }
    },
    renderDropIndicator: (target) => <TableDropIndicator target={target} />,
  });

  return (
    <TableContainer className="max-w-2xl">
      <Table
        aria-label="Launch checklist"
        selectionMode="multiple"
        dragAndDropHooks={dragAndDropHooks}
        className="min-w-md"
      >
        <TableHeader>
          <Column id="name" isRowHeader>
            Task
          </Column>
          <Column id="owner">Owner</Column>
        </TableHeader>
        <TableBody items={list.items}>
          {(item) => (
            <Row id={item.id}>
              <Cell>{item.name}</Cell>
              <Cell>{item.owner}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
