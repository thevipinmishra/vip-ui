"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldLabel,
} from "@/components/ui/text-field";

export function InputGroupDemo() {
  const [query, setQuery] = useState("");

  return (
    <Form
      className="w-full max-w-md gap-3"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TextField name="project" value={query} onChange={setQuery}>
        <TextFieldLabel>Find a project</TextFieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <MagnifyingGlassIcon size={17} aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Project name" />
          <InputGroupAddon>
            <Button type="submit" variant="ghost" isDisabled={!query.trim()}>
              Find
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <TextFieldDescription>Search by project name.</TextFieldDescription>
        <TextFieldError />
      </TextField>
    </Form>
  );
}
