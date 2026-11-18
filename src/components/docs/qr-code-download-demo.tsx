import {
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodePattern,
  QrCodeRoot,
} from "@/components/ui/qr-code";

export function QrCodeDownloadDemo() {
  return (
    <QrCodeRoot
      value="https://vip-ui.dev/components/qr-code"
      className="inline-grid justify-items-center gap-3"
    >
      <QrCodeFrame
        label="QR code for the QR code documentation"
        className="size-40"
      >
        <QrCodePattern />
      </QrCodeFrame>
      <div className="flex flex-wrap justify-center gap-2">
        <QrCodeDownloadTrigger fileName="vip-ui-qr.png">
          Download PNG
        </QrCodeDownloadTrigger>
        <QrCodeDownloadTrigger
          fileName="vip-ui-qr.svg"
          mimeType="image/svg+xml"
        >
          Download SVG
        </QrCodeDownloadTrigger>
      </div>
    </QrCodeRoot>
  );
}
