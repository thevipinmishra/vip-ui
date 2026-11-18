"use client";

import { useState } from "react";
import { QrCode } from "@/components/ui/qr-code";
import { TextField } from "@/components/ui/text-field";

export function QrCodeDynamicDemo() {
  const [link, setLink] = useState("https://vip-ui.dev/components/qr-code");

  return (
    <div className="grid w-full max-w-md gap-5">
      <TextField label="Checkout link" value={link} onChange={setLink} />
      <QrCode
        value={link}
        label="QR code for the checkout link"
        download={{ fileName: "checkout-qr.png" }}
      >
        <p className="max-w-56 text-center text-xs text-muted-foreground wrap-anywhere">
          {link}
        </p>
      </QrCode>
    </div>
  );
}
