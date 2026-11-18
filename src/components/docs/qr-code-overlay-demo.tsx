import { QrCode } from "@/components/ui/qr-code";

const mark =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='%231a211e'%3E%3Cpath d='M7.71 32H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7h13.51z'/%3E%3Cpath d='M24.29 0H25a7 7 0 0 1 7 7v18a7 7 0 0 1-7 7H11.49z' fill-opacity='.5'/%3E%3C/svg%3E";

export function QrCodeOverlayDemo() {
  return (
    <QrCode
      value="https://vip-ui.dev/components/installation"
      label="QR code for the installation guide"
      overlay={{ src: mark }}
      size="lg"
    >
      <p className="text-xs text-muted-foreground">
        Scan to open the installation guide.
      </p>
    </QrCode>
  );
}
