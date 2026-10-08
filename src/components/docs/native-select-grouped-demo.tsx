"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NativeSelect } from "@/components/ui/native-select";

export function NativeSelectGroupedDemo() {
  const [team, setTeam] = useState("");
  const [attempted, setAttempted] = useState(false);
  const missing = attempted && !team;

  return (
    <Form
      className="w-full max-w-sm gap-4"
      validationBehavior="aria"
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
      }}
    >
      <NativeSelect
        label="Invite to a team"
        name="team"
        required
        value={team}
        placeholder="Choose a team"
        isInvalid={missing}
        error={missing ? "Choose a team before continuing." : undefined}
        onChange={(event) => {
          setTeam(event.target.value);
        }}
      >
        <optgroup label="Design">
          <option value="Interface design">Interface design</option>
          <option value="Research">Research</option>
        </optgroup>
        <optgroup label="Engineering">
          <option value="Platform">Platform</option>
          <option value="Mobile" disabled>
            Mobile (full)
          </option>
        </optgroup>
      </NativeSelect>
      <Button type="submit">Continue</Button>
    </Form>
  );
}
