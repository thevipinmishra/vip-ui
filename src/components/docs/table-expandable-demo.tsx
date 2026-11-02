"use client";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "@/components/ui/table";

interface Task {
  id: string;
  name: string;
  owner: string;
  hours: number;
  children?: Task[];
}

const tasks: Task[] = [
  {
    id: "launch",
    name: "Website launch",
    owner: "Maya Chen",
    hours: 46,
    children: [
      {
        id: "design",
        name: "Design",
        owner: "Jo Park",
        hours: 18,
        children: [
          { id: "wire", name: "Wireframes", owner: "Jo Park", hours: 6 },
          { id: "visual", name: "Visual design", owner: "Jo Park", hours: 12 },
        ],
      },
      { id: "build", name: "Build", owner: "Sam Rivera", hours: 22 },
      { id: "qa", name: "Quality check", owner: "Alex Kim", hours: 6 },
    ],
  },
  {
    id: "docs",
    name: "Help center",
    owner: "Alex Kim",
    hours: 12,
    children: [
      { id: "outline", name: "Outline", owner: "Alex Kim", hours: 4 },
      { id: "write", name: "Write articles", owner: "Maya Chen", hours: 8 },
    ],
  },
];

function TaskRow({ task }: { task: Task }) {
  return (
    <Row id={task.id}>
      <Cell>
        <span className="font-medium">{task.name}</span>
      </Cell>
      <Cell>{task.owner}</Cell>
      <Cell className="text-end tabular-nums">{task.hours} h</Cell>
      {task.children?.map((child) => (
        <TaskRow key={child.id} task={child} />
      ))}
    </Row>
  );
}

export function TableExpandableDemo() {
  return (
    <TableContainer className="max-w-2xl">
      <Table
        aria-label="Project tasks"
        treeColumn="name"
        defaultExpandedKeys={["launch"]}
        className="min-w-[30rem]"
      >
        <TableHeader>
          <Column id="name" isRowHeader>
            Task
          </Column>
          <Column id="owner">Owner</Column>
          <Column id="hours" className="text-end">
            Estimate
          </Column>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
