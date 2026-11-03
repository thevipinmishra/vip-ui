"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

export interface PaymentCard {
  brand: string;
  last4: string;
  expiry: string;
}

const brands = [
  { pattern: /^4/, name: "Visa" },
  { pattern: /^(5[1-5]|2[2-7])/, name: "Mastercard" },
  { pattern: /^3[47]/, name: "American Express" },
];

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function validateNumber(value: string) {
  const number = digits(value);
  if (number.length < 13 || number.length > 19)
    return "Enter the 13 to 19 digits on the front of the card.";
  let sum = 0;
  for (let index = 0; index < number.length; index++) {
    let digit = Number(number[number.length - 1 - index]);
    if (index % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0 ? null : "This card number is not correct.";
}

function validateExpiry(value: string) {
  const match = value.trim().match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) return "Use the format MM/YY.";
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return "Enter a month from 01 to 12.";
  if (year < 2026 || (year === 2026 && month < 10))
    return "This card has expired.";
  return null;
}

export function PaymentMethodDialog({
  onSave,
}: {
  onSave: (card: PaymentCard) => void;
}) {
  return (
    <Dialog>
      <Button variant="outline" size="sm">
        Update
      </Button>
      <DialogContent size="sm">
        {({ close }) => (
          <>
            <DialogHeader>
              <DialogTitle>Update card</DialogTitle>
              <DialogDescription>
                We charge this card for your plan from the next invoice.
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
            <Form
              className="contents"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const number = digits(String(data.get("number")));
                onSave({
                  brand:
                    brands.find((brand) => brand.pattern.test(number))?.name ??
                    "Card",
                  last4: number.slice(-4),
                  expiry: String(data.get("expiry")).replace(/\s/g, ""),
                });
                close();
              }}
            >
              <DialogBody className="grid content-start gap-4">
                <TextField
                  name="name"
                  label="Name on card"
                  autoComplete="cc-name"
                  defaultValue="Maya Chen"
                  isRequired
                />
                <TextField
                  name="number"
                  label="Card number"
                  autoComplete="cc-number"
                  inputMode="numeric"
                  placeholder="1234 1234 1234 1234"
                  validate={validateNumber}
                  isRequired
                  autoFocus
                />
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    name="expiry"
                    label="Expiry date"
                    autoComplete="cc-exp"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    validate={validateExpiry}
                    isRequired
                  />
                  <TextField
                    name="cvc"
                    label="Security code"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    placeholder="CVC"
                    validate={(value) =>
                      /^\d{3,4}$/.test(value) ? null : "Enter 3 or 4 digits."
                    }
                    isRequired
                  />
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogClose variant="outline">Cancel</DialogClose>
                <Button type="submit">Save card</Button>
              </DialogFooter>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
