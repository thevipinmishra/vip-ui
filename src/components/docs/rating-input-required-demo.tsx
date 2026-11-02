"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RatingInput } from "@/components/ui/rating-input";

export function RatingInputRequiredDemo() {
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <RatingInput
        label="Rate your order"
        name="rating"
        isRequired
        errorMessage="Select a rating."
      />
      <Button type="submit">Send review</Button>
    </Form>
  );
}
