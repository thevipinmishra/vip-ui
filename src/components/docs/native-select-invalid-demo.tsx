"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NativeSelect } from "@/components/ui/native-select";

export function NativeSelectInvalidDemo() {
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
        label="Team"
        name="team"
        required
        value={team}
        placeholder="Choose a team"
        isInvalid={missing}
        error={missing ? "Choose a team to continue." : undefined}
        onChange={(event) => setTeam(event.target.value)}
      >
        <option value="design">Design</option>
        <option value="engineering">Engineering</option>
        <option value="research">Research</option>
      </NativeSelect>
      <Button type="submit">Continue</Button>
    </Form>
  );
}
