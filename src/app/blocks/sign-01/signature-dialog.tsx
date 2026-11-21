"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignaturePad } from "@/components/ui/signature-pad";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { cn } from "@/lib/utils";

export type Signature =
  | { kind: "draw"; paths: string[] }
  | { kind: "type"; name: string };

export function SignatureMark({
  signature,
  className,
}: {
  signature: Signature;
  className?: string;
}) {
  const group = useRef<SVGGElement>(null);
  const [viewBox, setViewBox] = useState<string>();

  useLayoutEffect(() => {
    if (signature.kind !== "draw" || !group.current) return;
    const box = group.current.getBBox();
    const pad = 4;
    setViewBox(
      `${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`,
    );
  }, [signature]);

  if (signature.kind === "type") {
    return (
      <span
        className={cn(
          "block truncate font-serif text-2xl italic leading-none",
          className,
        )}
      >
        {signature.name}
      </span>
    );
  }

  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      className={cn("block h-10 w-auto max-w-full", className)}
    >
      <g ref={group} fill="currentColor">
        {signature.paths.map((path, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: strokes keep their drawing order.
          <path key={index} d={path} />
        ))}
      </g>
    </svg>
  );
}

export function SignatureDialog({
  isOpen,
  onOpenChange,
  defaultName,
  initial,
  onAdopt,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultName: string;
  initial: { signature: Signature | null; initials: string };
  onAdopt: (signature: Signature, initials: string) => void;
}) {
  const [mode, setMode] = useState<Signature["kind"]>(
    initial.signature?.kind ?? "type",
  );
  const [paths, setPaths] = useState<string[]>(
    initial.signature?.kind === "draw" ? initial.signature.paths : [],
  );
  const [name, setName] = useState(
    initial.signature?.kind === "type" ? initial.signature.name : defaultName,
  );
  const [initials, setInitials] = useState(initial.initials);
  const [consent, setConsent] = useState(initial.signature !== null);
  const [submitted, setSubmitted] = useState(false);

  const signatureMissing =
    mode === "draw" ? paths.length === 0 : name.trim().length === 0;
  const initialsMissing = initials.trim().length === 0;

  function adopt() {
    setSubmitted(true);
    if (signatureMissing || initialsMissing || !consent) return;
    onAdopt(
      mode === "draw"
        ? { kind: "draw", paths }
        : { kind: "type", name: name.trim() },
      initials.trim().toUpperCase(),
    );
  }

  return (
    <DialogContent size="md" overlayProps={{ isOpen, onOpenChange }}>
      <DialogHeader>
        <DialogTitle level={2}>Add your signature</DialogTitle>
        <DialogDescription>
          We use it for each signature and initials field in this document.
        </DialogDescription>
        <DialogClose />
      </DialogHeader>
      <DialogBody className="grid grid-cols-1 gap-5">
        <Tabs
          selectedKey={mode}
          onSelectionChange={(key) => setMode(key as Signature["kind"])}
          className="grid gap-4"
        >
          <TabList aria-label="Signature type">
            <Tab id="type">Type</Tab>
            <Tab id="draw">Draw</Tab>
          </TabList>
          <TabPanel id="type" className="grid gap-3">
            <TextField
              value={name}
              onChange={setName}
              autoComplete="name"
              isInvalid={submitted && mode === "type" && signatureMissing}
            >
              <TextFieldLabel>Full name</TextFieldLabel>
              <TextFieldInput />
              <TextFieldError>Enter your full name.</TextFieldError>
            </TextField>
            <div
              aria-hidden="true"
              className="grid h-20 place-items-center rounded-xl border border-dashed border-border bg-muted/40 px-4"
            >
              {name.trim() ? (
                <SignatureMark
                  signature={{ kind: "type", name }}
                  className="text-3xl"
                />
              ) : (
                <span className="text-sm text-muted-foreground">
                  Your signature shows here
                </span>
              )}
            </div>
          </TabPanel>
          <TabPanel id="draw">
            <SignaturePad
              label="Signature"
              description="Use your mouse, finger, or pen."
              paths={paths}
              onDraw={(details) => setPaths(details.paths)}
              invalid={submitted && mode === "draw" && signatureMissing}
              error="Draw your signature."
            />
          </TabPanel>
        </Tabs>
        <TextField
          value={initials}
          onChange={setInitials}
          maxLength={3}
          isInvalid={submitted && initialsMissing}
          className="w-40"
        >
          <TextFieldLabel>Initials</TextFieldLabel>
          <TextFieldInput />
          <TextFieldError>Enter your initials.</TextFieldError>
        </TextField>
        <Checkbox
          isSelected={consent}
          onChange={setConsent}
          isInvalid={submitted && !consent}
          errorMessage="Agree to sign electronically to continue."
        >
          I agree that my electronic signature has the same effect as a
          handwritten signature.
        </Checkbox>
      </DialogBody>
      <DialogFooter>
        <DialogClose variant="outline">Cancel</DialogClose>
        <Button onPress={adopt}>Adopt and sign</Button>
      </DialogFooter>
    </DialogContent>
  );
}
