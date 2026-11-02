"use client";

import { useAsyncList } from "react-aria-components";
import {
  ComboBox,
  ComboBoxContent,
  ComboBoxControl,
  ComboBoxInput,
  ComboBoxItem,
  ComboBoxLabel,
  ComboBoxTrigger,
} from "@/components/ui/combo-box";
import { Spinner } from "@/components/ui/spinner";

interface Person {
  id: string;
  name: string;
  role: string;
}

const people: Person[] = [
  { id: "ada", name: "Ada Lovelace", role: "Research" },
  { id: "alan", name: "Alan Turing", role: "Engineering" },
  { id: "grace", name: "Grace Hopper", role: "Engineering" },
  { id: "hedy", name: "Hedy Lamarr", role: "Design" },
  { id: "katherine", name: "Katherine Johnson", role: "Research" },
  { id: "linus", name: "Linus Torvalds", role: "Engineering" },
  { id: "margaret", name: "Margaret Hamilton", role: "Engineering" },
  { id: "radia", name: "Radia Perlman", role: "Support" },
  { id: "tim", name: "Tim Berners-Lee", role: "Design" },
];

function search(text: string, signal: AbortSignal) {
  return new Promise<Person[]>((resolve, reject) => {
    const timer = setTimeout(() => {
      const query = text.trim().toLowerCase();
      resolve(
        people.filter((person) => person.name.toLowerCase().includes(query)),
      );
    }, 600);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(signal.reason);
    });
  });
}

export function ComboBoxAsyncDemo() {
  const list = useAsyncList<Person>({
    async load({ signal, filterText }) {
      return { items: await search(filterText ?? "", signal) };
    },
  });

  return (
    <ComboBox
      items={list.items}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      className="w-full max-w-[340px]"
    >
      <ComboBoxLabel>Assignee</ComboBoxLabel>
      <ComboBoxControl>
        <ComboBoxInput placeholder="Search people" />
        <ComboBoxTrigger>
          {list.isLoading ? <Spinner size="sm" decorative /> : undefined}
        </ComboBoxTrigger>
      </ComboBoxControl>
      <ComboBoxContent<Person>>
        {(person) => (
          <ComboBoxItem id={person.id} textValue={person.name}>
            <span className="min-w-0">
              <span className="block font-medium">{person.name}</span>
              <span className="block text-xs text-muted-foreground group-selected/item:text-accent-foreground">
                {person.role}
              </span>
            </span>
          </ComboBoxItem>
        )}
      </ComboBoxContent>
    </ComboBox>
  );
}
