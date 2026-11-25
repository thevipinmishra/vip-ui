"use client";

import {
  CheckCircleIcon,
  DotsThreeIcon,
  DownloadSimpleIcon,
  PenNibIcon,
  ProhibitIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import { Checkbox } from "../../vip-ui/checkbox";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "../../vip-ui/menu";
import { ProgressBar } from "../../vip-ui/progress-bar";
import { TextArea } from "../../vip-ui/text-area";
import { showToast } from "../../vip-ui/toast";
import { cn } from "../../vip-ui/utils";
import { agreement, type FieldId, fields, formatMoney } from "./data";
import {
  type Signature,
  SignatureDialog,
  SignatureMark,
} from "./signature-dialog";

type Status = "signing" | "signed" | "declined";

function SignField({
  id,
  kind,
  label,
  filled,
  signature,
  initials,
  onFill,
  onClear,
  fieldRef,
}: {
  id: FieldId;
  kind: "initials" | "signature";
  label: string;
  filled: boolean;
  signature: Signature | null;
  initials: string;
  onFill: (id: FieldId) => void;
  onClear: (id: FieldId) => void;
  fieldRef: (element: HTMLButtonElement | null) => void;
}) {
  const size = kind === "signature" ? "h-16 w-full max-w-72" : "h-12 w-28";
  if (filled && signature) {
    return (
      <span className="flex min-w-0 items-center gap-1">
        <span
          className={cn(
            "inline-flex min-w-0 items-end border-b-2 border-foreground/70 px-2 pb-1",
            size,
          )}
        >
          {kind === "signature" ? (
            <SignatureMark signature={signature} />
          ) : (
            <span className="font-serif text-xl italic">{initials}</span>
          )}
          <span className="sr-only">
            {label}: {kind === "signature" ? "signed" : `initialed ${initials}`}
          </span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label={`Clear ${label.toLowerCase()}`}
          onPress={() => onClear(id)}
          className="shrink-0"
        >
          <XIcon size={14} aria-hidden="true" />
        </Button>
      </span>
    );
  }
  return (
    <button
      ref={fieldRef}
      type="button"
      onClick={() => onFill(id)}
      aria-label={label}
      className={cn(
        "inline-flex scroll-my-24 items-center justify-center gap-1.5 rounded-md border border-dashed border-primary/70 bg-primary/10 font-sans text-sm font-medium text-foreground outline-offset-2 outline-transparent transition-colors duration-150 ease-out-quint hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring",
        size,
      )}
    >
      <PenNibIcon size={16} className="text-primary" aria-hidden="true" />
      {kind === "signature" ? "Sign" : "Initial"}
    </button>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-2">
      <h2 className="text-base font-semibold">
        {number}. {title}
      </h2>
      {children}
    </section>
  );
}

export function SignDocument() {
  const [status, setStatus] = useState<Status>("signing");
  const [filled, setFilled] = useState<Record<FieldId, boolean>>({
    rules: false,
    cancellation: false,
    signature: false,
  });
  const [signature, setSignature] = useState<Signature | null>(null);
  const [initials, setInitials] = useState("JE");
  const [parking, setParking] = useState(false);
  const [adoptFor, setAdoptFor] = useState<FieldId | "change" | null>(null);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const refs = useRef<Partial<Record<FieldId, HTMLButtonElement | null>>>({});

  const done = fields.filter((field) => filled[field.id]).length;
  const complete = done === fields.length;
  const nextField = fields.find((field) => !filled[field.id]);
  const monthly = agreement.desk + (parking ? agreement.parking : 0);

  function fill(id: FieldId) {
    if (!signature) {
      setAdoptFor(id);
      return;
    }
    setFilled((current) => ({ ...current, [id]: true }));
  }

  function clear(id: FieldId) {
    setFilled((current) => ({ ...current, [id]: false }));
    requestAnimationFrame(() => refs.current[id]?.focus());
  }

  function goToNext() {
    if (!nextField) return;
    const element = refs.current[nextField.id];
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    element?.focus({ preventScroll: true });
  }

  function finish() {
    setFinishing(true);
    window.setTimeout(() => {
      setFinishing(false);
      setStatus("signed");
      window.scrollTo({ top: 0 });
    }, 900);
  }

  const fieldProps = (id: FieldId) => {
    const field = fields.find((item) => item.id === id) ?? fields[0];
    return {
      id,
      kind: field.kind,
      label: field.label,
      filled: filled[id],
      signature,
      initials,
      onFill: fill,
      onClear: clear,
      fieldRef: (element: HTMLButtonElement | null) => {
        refs.current[id] = element;
      },
    };
  };

  const header = (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground"
          >
            R
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{agreement.title}</p>
            <p className="truncate text-xs text-muted-foreground max-sm:hidden">
              From {agreement.sender}, {agreement.company}
            </p>
            {status === "signing" && (
              <p className="truncate text-xs text-muted-foreground tabular-nums sm:hidden">
                {done} of {fields.length} fields done
              </p>
            )}
          </div>
        </div>
        {status === "signing" ? (
          <>
            <MenuTrigger>
              <Button variant="ghost" iconOnly aria-label="More actions">
                <DotsThreeIcon size={18} weight="bold" aria-hidden="true" />
              </Button>
              <MenuPopover placement="bottom end">
                <MenuContent aria-label="Document actions">
                  <MenuItem
                    onAction={() =>
                      showToast({
                        title: "Download started",
                        description: "The PDF has no signatures yet.",
                      })
                    }
                  >
                    <DownloadSimpleIcon size={16} aria-hidden="true" />
                    Download PDF
                  </MenuItem>
                  <MenuItem
                    variant="destructive"
                    onAction={() => setDeclineOpen(true)}
                  >
                    <ProhibitIcon size={16} aria-hidden="true" />
                    Decline to sign
                  </MenuItem>
                </MenuContent>
              </MenuPopover>
            </MenuTrigger>
            {complete ? (
              <Button onPress={finish} isPending={finishing}>
                Finish
              </Button>
            ) : (
              <Button onPress={goToNext}>Next field</Button>
            )}
          </>
        ) : null}
      </div>
    </header>
  );

  if (status !== "signing") {
    const signed = status === "signed";
    return (
      <div className="min-h-svh bg-background">
        {header}
        <main className="mx-auto grid w-full max-w-lg gap-6 px-4 py-16 text-center sm:px-6">
          <span
            aria-hidden="true"
            className={cn(
              "mx-auto grid size-14 place-items-center rounded-full ring-1",
              signed
                ? "bg-success-subtle text-success ring-success/20"
                : "bg-muted text-muted-foreground ring-border",
            )}
          >
            {signed ? (
              <CheckCircleIcon size={28} weight="fill" />
            ) : (
              <XCircleIcon size={28} weight="fill" />
            )}
          </span>
          <div className="grid gap-2">
            <h1 className="text-2xl font-semibold tracking-[-0.04em]">
              {signed ? "You signed the agreement" : "You declined to sign"}
            </h1>
            <p className="text-sm text-muted-foreground text-pretty">
              {signed
                ? `All parties signed. We sent a copy to ${agreement.memberEmail}.`
                : `We told ${agreement.sender} at ${agreement.company}. They can send a new version.`}
            </p>
          </div>
          {signed ? (
            <Card className="text-start">
              <CardContent className="pt-5">
                <DescriptionList>
                  <DescriptionTerm>Document</DescriptionTerm>
                  <DescriptionDetail>{agreement.title}</DescriptionDetail>
                  <DescriptionTerm>Monthly fee</DescriptionTerm>
                  <DescriptionDetail className="tabular-nums">
                    {formatMoney(monthly)}
                  </DescriptionDetail>
                  <DescriptionTerm>Signed</DescriptionTerm>
                  <DescriptionDetail>{agreement.signedOn}</DescriptionDetail>
                </DescriptionList>
              </CardContent>
            </Card>
          ) : null}
          <div className="flex flex-wrap justify-center gap-2">
            {signed ? (
              <Button
                onPress={() =>
                  showToast({
                    title: "Download started",
                    description: `${agreement.title}.pdf`,
                  })
                }
              >
                <DownloadSimpleIcon
                  data-icon="inline-start"
                  size={16}
                  aria-hidden="true"
                />
                Download PDF
              </Button>
            ) : null}
            {signed ? null : (
              <Button variant="outline" onPress={() => setStatus("signing")}>
                Review again
              </Button>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background">
      {header}
      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <article
          aria-label={agreement.title}
          className="min-w-0 rounded-xl border border-border bg-card px-5 py-8 sm:px-10 sm:py-12"
        >
          <div className="mx-auto grid max-w-prose gap-7 font-serif text-base leading-7">
            <div className="grid gap-1 border-b border-border/70 pb-6">
              <p className="font-sans text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {agreement.company}
              </p>
              <h1 className="text-3xl leading-tight font-semibold tracking-tight">
                {agreement.title}
              </h1>
              <p className="text-muted-foreground">
                Between Ridgeway Coworking LLC, 410 Alder Street, Portland, OR
                97204 (“Ridgeway”), and {agreement.member},{" "}
                {agreement.memberCompany} (“Member”).
              </p>
            </div>

            <Section number={1} title="Membership">
              <p>
                Ridgeway gives Member a dedicated desk, D-14, on the second
                floor. The membership starts on November 1, 2026, and continues
                for 12 months.
              </p>
            </Section>

            <Section number={2} title="Fees">
              <p>Member pays the fees below on the first day of each month.</p>
              <div className="overflow-hidden rounded-lg ring-1 ring-border/70">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border/70">
                    <tr>
                      <th
                        scope="row"
                        className="px-3 py-2 text-start font-normal"
                      >
                        Dedicated desk
                      </th>
                      <td className="px-3 py-2 text-end tabular-nums">
                        {formatMoney(agreement.desk)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="px-3 py-2 text-start font-normal"
                      >
                        <Checkbox
                          isSelected={parking}
                          onChange={setParking}
                          className="font-sans"
                        >
                          Parking space (optional)
                        </Checkbox>
                      </th>
                      <td
                        className={cn(
                          "px-3 py-2 text-end tabular-nums",
                          !parking && "text-muted-foreground line-through",
                        )}
                      >
                        {formatMoney(agreement.parking)}
                      </td>
                    </tr>
                    <tr className="bg-muted/50 font-medium">
                      <th scope="row" className="px-3 py-2 text-start">
                        Monthly total
                      </th>
                      <td className="px-3 py-2 text-end tabular-nums">
                        {formatMoney(monthly)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Member also pays a deposit of {formatMoney(agreement.deposit)}{" "}
                when this agreement is signed.
              </p>
            </Section>

            <Section number={3} title="House rules">
              <p>
                Member follows the house rules. Quiet hours are from 9:00 AM to
                12:00 PM in the second-floor desk area. Calls go in the phone
                rooms. Member keeps the desk clear of food at night.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <SignField {...fieldProps("rules")} />
                <span className="text-xs text-muted-foreground">
                  Member initials
                </span>
              </div>
            </Section>

            <Section number={4} title="Access and guests">
              <p>
                Member gets a key card that opens the building at all hours.
                Guests sign in at the front desk. Member can bring 2 guests at
                one time.
              </p>
            </Section>

            <Section number={5} title="Cancellation">
              <p>
                Either party can end this agreement with 60 days written notice.
                Ridgeway returns the deposit within 30 days after the membership
                ends, less any unpaid fees.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <SignField {...fieldProps("cancellation")} />
                <span className="text-xs text-muted-foreground">
                  Member initials
                </span>
              </div>
            </Section>

            <div className="grid gap-8 border-t border-border/70 pt-7 sm:grid-cols-2">
              <div className="grid content-start gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Ridgeway Coworking
                </p>
                <span className="inline-flex h-16 items-end border-b-2 border-foreground/70 px-2 pb-1">
                  <SignatureMark
                    signature={{ kind: "type", name: agreement.sender }}
                  />
                </span>
                <p>
                  {agreement.sender}, {agreement.senderRole}
                  <span className="block text-xs text-muted-foreground">
                    Signed {agreement.sent}
                  </span>
                </p>
              </div>
              <div className="grid content-start gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Member
                </p>
                <SignField {...fieldProps("signature")} />
                <p>
                  {agreement.member}
                  <span className="block text-xs text-muted-foreground">
                    {filled.signature
                      ? `Signed ${agreement.signedOn}`
                      : "Not signed"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </article>

        <aside className="grid gap-4 lg:sticky lg:top-20">
          <Card>
            <CardHeader>
              <CardTitle as="h2">Fields to complete</CardTitle>
              <CardDescription>
                {complete
                  ? "All fields are complete. Select Finish to sign."
                  : `${fields.length - done} required ${fields.length - done === 1 ? "field" : "fields"} left.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ProgressBar
                aria-label="Completed fields"
                value={done}
                maxValue={fields.length}
                valueLabel={`${done} of ${fields.length}`}
              />
              <ul className="grid gap-1">
                {fields.map((field) => (
                  <li
                    key={field.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <CheckCircleIcon
                        size={16}
                        weight={filled[field.id] ? "fill" : "regular"}
                        aria-hidden="true"
                        className={cn(
                          "shrink-0",
                          filled[field.id]
                            ? "text-success"
                            : "text-muted-foreground/60",
                        )}
                      />
                      <span className="truncate">{field.label}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {filled[field.id] ? "Done" : "To do"}
                    </span>
                  </li>
                ))}
              </ul>
              {signature ? (
                <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                  <SignatureMark
                    signature={signature}
                    className="h-8 min-w-0 text-xl"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => setAdoptFor("change")}
                  >
                    Change
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <DescriptionList>
                <DescriptionTerm>Sent by</DescriptionTerm>
                <DescriptionDetail>{agreement.sender}</DescriptionDetail>
                <DescriptionTerm>Sent</DescriptionTerm>
                <DescriptionDetail>{agreement.sent}</DescriptionDetail>
                <DescriptionTerm>Expires</DescriptionTerm>
                <DescriptionDetail>
                  <Badge variant="warning">{agreement.expires}</Badge>
                </DescriptionDetail>
              </DescriptionList>
            </CardContent>
          </Card>
        </aside>
      </main>

      <SignatureDialog
        key={adoptFor ?? "closed"}
        isOpen={adoptFor !== null}
        onOpenChange={(open) => {
          if (!open) setAdoptFor(null);
        }}
        defaultName={agreement.member}
        initial={{ signature, initials }}
        onAdopt={(next, nextInitials) => {
          setSignature(next);
          setInitials(nextInitials);
          if (adoptFor && adoptFor !== "change") {
            setFilled((current) => ({ ...current, [adoptFor]: true }));
          }
          setAdoptFor(null);
        }}
      />

      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{ isOpen: declineOpen, onOpenChange: setDeclineOpen }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Decline to sign?</DialogTitle>
          <DialogDescription>
            We tell {agreement.sender}. You cannot sign this version after you
            decline.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="grid grid-cols-1">
          <TextArea label="Reason (optional)" rows={3} />
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button
            variant="destructive"
            onPress={() => {
              setDeclineOpen(false);
              setStatus("declined");
            }}
          >
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
