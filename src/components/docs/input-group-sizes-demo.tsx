"use client";

import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TextField } from "@/components/ui/text-field";

export function InputGroupSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <TextField size="sm" type="email" aria-label="Email address">
        <InputGroup>
          <InputGroupAddon>
            <EnvelopeSimpleIcon aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput placeholder="maya@example.com" />
        </InputGroup>
      </TextField>
      <TextField size="md" type="email" aria-label="Email address">
        <InputGroup>
          <InputGroupAddon>
            <EnvelopeSimpleIcon aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput placeholder="maya@example.com" />
        </InputGroup>
      </TextField>
      <TextField type="email" aria-label="Email address">
        <InputGroup>
          <InputGroupAddon>
            <EnvelopeSimpleIcon aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput placeholder="maya@example.com" />
        </InputGroup>
      </TextField>
      <TextField size="xl" type="email" aria-label="Email address">
        <InputGroup>
          <InputGroupAddon>
            <EnvelopeSimpleIcon aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput placeholder="maya@example.com" />
        </InputGroup>
      </TextField>
    </div>
  );
}
