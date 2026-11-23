"use client";

import { useState } from "react";
import { QrCode } from "@/components/ui/qr-code";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";

function checkoutLinkError(link: string) {
  if (!link) return;
  if (new TextEncoder().encode(link).length > 512) {
    return "Use a checkout link of 512 bytes or fewer.";
  }
  const invalidLink = "Enter a full HTTP or HTTPS link.";
  try {
    const { protocol } = new URL(link);
    if (protocol !== "https:" && protocol !== "http:") return invalidLink;
  } catch {
    return invalidLink;
  }
}

export function QrCodeDynamicDemo() {
  const [link, setLink] = useState("https://vip-ui.dev/components/qr-code");
  const value = link.trim();
  const error = checkoutLinkError(value);

  return (
    <div className="grid w-full max-w-md gap-5">
      <TextField
        type="url"
        value={link}
        onChange={setLink}
        isInvalid={Boolean(error)}
      >
        <TextFieldLabel>Checkout link</TextFieldLabel>
        <TextFieldInput placeholder="https://example.com/checkout" />
        <TextFieldError>{error}</TextFieldError>
      </TextField>
      {value && !error ? (
        <QrCode
          value={value}
          label="QR code for the checkout link"
          download={{ fileName: "checkout-qr.png" }}
        />
      ) : null}
    </div>
  );
}
