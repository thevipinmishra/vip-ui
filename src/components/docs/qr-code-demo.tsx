import { QrCode } from "@/components/ui/qr-code";

export function QrCodeDemo() {
  return (
    <QrCode value="https://vip-ui.dev" label="QR code for vip-ui.dev">
      <p className="text-xs text-muted-foreground">
        Scan to open the component library.
      </p>
    </QrCode>
  );
}
