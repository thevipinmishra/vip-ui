"use client";

import { CheckIcon, LockIcon, ShoppingBagIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Alert } from "../../vip-ui/alert";
import { Breadcrumb, Breadcrumbs } from "../../vip-ui/breadcrumbs";
import { Button } from "../../vip-ui/button";
import { ButtonLink } from "../../vip-ui/button-link";
import { Checkbox } from "../../vip-ui/checkbox";
import { ComboBox } from "../../vip-ui/combo-box";
import { CopyButton } from "../../vip-ui/copy-button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "../../vip-ui/fieldset";
import { Form } from "../../vip-ui/form";
import {
  RadioButton,
  RadioField,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
} from "../../vip-ui/radio-group";
import { Select } from "../../vip-ui/select";
import { Spinner } from "../../vip-ui/spinner";
import { Stepper } from "../../vip-ui/stepper";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
  type TextFieldProps,
} from "../../vip-ui/text-field";
import { showToast } from "../../vip-ui/toast";
import {
  caProvinces,
  countries,
  countryName,
  formatArrival,
  formatFullDate,
  formatMoney,
  isSupportedCountry,
  orderNumber,
  orderTotals,
  postalLabel,
  promoCode,
  promoDiscount,
  regionLabel,
  regionsFor,
  shippingOptions,
  summaryLines,
  taxLabel,
} from "./data";
import { OrderSummary } from "./order-summary";

const steps = [
  { label: "Bag" },
  { label: "Contact" },
  { label: "Shipping" },
  { label: "Payment" },
];

const initialContact = { email: "iris@fernpost.co", marketing: false };

const initialAddress = {
  firstName: "Iris",
  lastName: "Marlow",
  country: "US",
  address1: "1826 Alder Street",
  address2: "",
  city: "Seattle",
  region: "WA",
  postalCode: "98104",
};

const initialBilling = {
  country: "US",
  address1: "1826 Alder Street",
  city: "Seattle",
  region: "WA",
  postalCode: "98104",
};

interface CardDetails {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCardNumber(value: string) {
  return digits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const next = digits(value).slice(0, 4);
  return next.length > 2 ? `${next.slice(0, 2)}/${next.slice(2)}` : next;
}

function luhn(value: string) {
  let sum = 0;
  let double = false;
  for (let index = value.length - 1; index >= 0; index--) {
    let number = Number(value[index]);
    if (double) {
      number *= 2;
      if (number > 9) number -= 9;
    }
    sum += number;
    double = !double;
  }
  return sum % 10 === 0;
}

function expiryError(value: string) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return "Use MM/YY.";
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return "Use a month from 01 to 12.";
  if (year < 2026 || (year === 2026 && month < 10)) {
    return "This card has expired.";
  }
  return null;
}

function securityCodeError(value: string) {
  return /^\d{3,4}$/.test(value) ? null : "Use the 3 or 4 digits on the card.";
}

function postalMessage(country: string, value: string) {
  if (!value.trim()) {
    return country === "CA" ? "Enter a postal code." : "Enter a ZIP code.";
  }
  if (country === "CA") {
    return /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(value)
      ? ""
      : "Use the format A1A 1A1.";
  }
  return /^\d{5}(-\d{4})?$/.test(value) ? "" : "Enter a 5-digit ZIP code.";
}

function focusFirstInvalid(form: HTMLFormElement) {
  window.setTimeout(() => {
    const target = form.querySelector<HTMLElement>(
      '[data-slot="text-field"][data-invalid] input, [data-slot="combo-box"][data-invalid] input, [data-slot="select"][data-invalid] button',
    );
    target?.focus();
  }, 0);
}

function CheckoutField({
  label,
  description,
  error,
  placeholder,
  className,
  size = "md",
  ...props
}: Omit<TextFieldProps, "label" | "description" | "children"> & {
  label: string;
  description?: string;
  error?: string;
}) {
  return (
    <TextField
      {...props}
      size={size}
      isInvalid={Boolean(error)}
      className={className}
    >
      <TextFieldLabel>{label}</TextFieldLabel>
      <TextFieldInput placeholder={placeholder} />
      {description && (
        <TextFieldDescription>{description}</TextFieldDescription>
      )}
      <TextFieldError>{error}</TextFieldError>
    </TextField>
  );
}

export function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState(initialContact);
  const [address, setAddress] = useState(initialAddress);
  const [billingSame, setBillingSame] = useState(true);
  const [billing, setBilling] = useState(initialBilling);
  const [shippingId, setShippingId] = useState("standard");
  const [promoDraft, setPromoDraft] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [card, setCard] = useState<CardDetails>({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [pending, setPending] = useState(false);
  const [payError, setPayError] = useState("");
  const [done, setDone] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>(
    {},
  );
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);

  useEffect(() => {
    if (previousStep.current !== step) {
      headingRef.current?.focus();
      previousStep.current = step;
    }
  }, [step]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const supported = isSupportedCountry(address.country);
  const options = shippingOptions(address.country);
  const option = options.find((item) => item.id === shippingId) ?? options[0];
  const subtotal = summaryLines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const discount = promoApplied ? promoDiscount(subtotal) : 0;
  const totals = orderTotals(
    summaryLines,
    option.price,
    discount,
    address.country,
  );
  const last4 = digits(card.number).slice(-4);

  function updateAddress(patch: Partial<typeof initialAddress>) {
    setAddress((current) => ({ ...current, ...patch }));
    setAddressErrors({});
  }

  function updateBilling(patch: Partial<typeof initialBilling>) {
    setBilling((current) => ({ ...current, ...patch }));
    setCardErrors({});
  }

  function updateCard(patch: Partial<CardDetails>) {
    setCard((current) => ({ ...current, ...patch }));
    setCardErrors({});
  }

  function changeCountry(next: string) {
    setAddress((current) => ({
      ...current,
      country: next,
      region: isSupportedCountry(next) ? (regionsFor(next)[0]?.id ?? "") : "",
    }));
    setAddressErrors({});
    const nextOptions = shippingOptions(next);
    setShippingId(nextOptions[0]?.id ?? "standard");
  }

  function validateAddress() {
    const errors: Record<string, string> = {};
    if (!address.firstName.trim()) errors.firstName = "Enter a first name.";
    if (!address.lastName.trim()) errors.lastName = "Enter a last name.";
    if (!address.address1.trim()) {
      errors.address1 = "Enter a street address.";
    }
    if (!address.city.trim()) errors.city = "Enter a city.";
    if (!address.region) {
      errors.region = `Choose a ${regionLabel(address.country).toLowerCase()}.`;
    }
    if (!isSupportedCountry(address.country)) {
      errors.country = "Choose the United States or Canada.";
    }
    const postal = postalMessage(address.country, address.postalCode);
    if (postal) errors.postalCode = postal;
    return errors;
  }

  function validateCard() {
    const errors: Record<string, string> = {};
    if (!card.name.trim()) {
      errors.name = "Enter the name on the card.";
    }
    const number = digits(card.number);
    if (number.length < 15) {
      errors.number = "Enter the number on the card.";
    } else if (!luhn(number)) {
      errors.number = "Check the card number.";
    }
    const expiry = expiryError(card.expiry);
    if (expiry) errors.expiry = expiry;
    const cvc = securityCodeError(card.cvc);
    if (cvc) errors.cvc = cvc;
    if (!billingSame) {
      if (!billing.address1.trim()) {
        errors.billingAddress1 = "Enter a billing address.";
      }
      if (!billing.city.trim()) {
        errors.billingCity = "Enter a city.";
      }
      if (!billing.region) {
        errors.billingRegion = "Choose a region.";
      }
      const postal = postalMessage(billing.country, billing.postalCode);
      if (postal) errors.billingPostal = postal;
    }
    return errors;
  }

  function applyPromo() {
    const code = promoDraft.trim().toUpperCase();
    if (!code) {
      setPromoError("Enter a promo code.");
      return;
    }
    if (code !== promoCode) {
      setPromoError("That code is not valid. Check the spelling.");
      return;
    }
    setPromoError("");
    setPromoApplied(true);
    setPromoDraft("");
    showToast({
      title: "Promo code applied",
      description: "15% comes off your order.",
      variant: "success",
    });
  }

  function removePromo() {
    setPromoApplied(false);
    setPromoError("");
    showToast({ title: "Promo code removed" });
  }

  async function pay() {
    if (pending) return;
    setPayError("");
    setPending(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1500));
    if (digits(card.number).endsWith("0002")) {
      setPending(false);
      setPayError(
        "Your bank declined the payment. Use a different card or contact your bank.",
      );
      return;
    }
    setPending(false);
    setDone(true);
    window.scrollTo({ top: 0 });
    showToast({
      title: "Payment received",
      description: `Order ${orderNumber} is confirmed.`,
      variant: "success",
    });
  }

  const summary = (
    <OrderSummary
      lines={summaryLines}
      totals={totals}
      shippingPrice={option.price}
      shippingName={option.name}
      arrival={`Arrives ${formatArrival(option.arrivalStart, option.arrivalEnd)}`}
      taxNote={taxLabel(address.country, address.region)}
      discount={discount}
      applied={promoApplied}
      draft={promoDraft}
      error={promoError}
      onDraftChange={(value) => {
        setPromoDraft(value);
        setPromoError("");
      }}
      onApply={applyPromo}
      onRemove={removePromo}
    />
  );

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <div className="bg-foreground px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-background">
        Fall field event · 15% off with code {promoCode}
      </div>

      <header className="border-b border-border/70 bg-background/90">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="/blocks/product-01"
            className="flex min-h-11 items-center gap-2.5 rounded-md outline-offset-4 outline-transparent focus-visible:outline-2 focus-visible:outline-ring"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6 text-foreground"
              aria-hidden="true"
            >
              <path
                d="M2.5 19.5 9 6.5l4.2 8.2L15.6 10l5.9 9.5H2.5Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm font-semibold tracking-[0.18em]">
              BRACKEN
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:inline">
              Supply
            </span>
          </a>

          <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            <LockIcon size={14} aria-hidden="true" />
            Secure checkout
          </span>

          <a
            href="/blocks/product-01"
            className="ms-auto inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm text-muted-foreground outline-offset-2 outline-transparent transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ShoppingBagIcon size={17} aria-hidden="true" />
            {done ? "Back to shop" : "Back to bag"}
          </a>
        </div>
      </header>

      {done ? (
        <main className="mx-auto w-full max-w-[720px] flex-1 px-4 py-8 sm:px-6 sm:py-12">
          <div className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
            <div className="grid place-items-center gap-3 bg-success-subtle px-6 py-10 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-card text-success shadow-[var(--shadow-card)] ring-1 ring-success/25">
                <CheckIcon size={28} weight="bold" aria-hidden="true" />
              </span>
              <h1
                ref={doneRef}
                tabIndex={-1}
                className="text-2xl font-semibold tracking-[-0.04em] outline-none"
              >
                Order placed
              </h1>
              <p className="text-sm text-muted-foreground">
                Order {orderNumber} · Arrives{" "}
                {formatFullDate(option.arrivalEnd)}
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:p-6">
              <Alert variant="success" title="Payment received.">
                We charged {formatMoney(totals.total)} to the card ending in{" "}
                {last4}. A receipt goes to {contact.email}.
              </Alert>

              <DescriptionList className="gap-y-3">
                <DescriptionTerm>Order</DescriptionTerm>
                <DescriptionDetail>
                  <span className="inline-flex items-center gap-1">
                    {orderNumber}
                    <CopyButton
                      value={orderNumber}
                      iconOnly
                      variant="ghost"
                      size="xs"
                      aria-label="Copy order number"
                    />
                  </span>
                </DescriptionDetail>
                <DescriptionTerm>Delivery</DescriptionTerm>
                <DescriptionDetail>
                  {option.name},{" "}
                  {formatArrival(option.arrivalStart, option.arrivalEnd)}
                </DescriptionDetail>
                <DescriptionTerm>Ship to</DescriptionTerm>
                <DescriptionDetail>
                  {address.firstName} {address.lastName}
                  <br />
                  {address.address1}
                  {address.address2 ? `, ${address.address2}` : ""}
                  <br />
                  {address.city}, {address.region} {address.postalCode}
                  <br />
                  {countryName(address.country)}
                </DescriptionDetail>
                <DescriptionTerm>Total</DescriptionTerm>
                <DescriptionDetail className="tabular-nums">
                  {formatMoney(totals.total)}
                </DescriptionDetail>
              </DescriptionList>

              <div className="flex flex-wrap gap-2 border-t border-border/70 pt-4">
                <Button
                  onPress={() =>
                    showToast({
                      title: "Receipt sent",
                      description: `Check ${contact.email} in a minute.`,
                      variant: "success",
                    })
                  }
                >
                  Email the receipt
                </Button>
                <ButtonLink href="/blocks/product-01" variant="outline">
                  Back to shop
                </ButtonLink>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <h1 className="sr-only">Checkout</h1>
          <nav aria-label="Breadcrumbs">
            <Breadcrumbs>
              <Breadcrumb href="/blocks/product-01">Bag</Breadcrumb>
              <Breadcrumb>Checkout</Breadcrumb>
            </Breadcrumbs>
          </nav>

          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:items-start">
            <div className="min-w-0 overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
              <div className="border-b border-border/70 bg-muted/40 px-3 py-3 sm:px-5">
                <Stepper
                  steps={steps}
                  currentStep={step}
                  className="[&_[data-slot=stepper-step]]:min-w-0 [&_[data-slot=stepper-step]>div:last-child]:pe-0"
                />
              </div>

              <div className="p-5 sm:p-7">
                {step === 1 && (
                  <Form
                    validationBehavior="aria"
                    className="grid gap-5"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())
                      ) {
                        setEmailError("Enter a valid email address.");
                        focusFirstInvalid(event.currentTarget);
                        return;
                      }
                      setEmailError("");
                      setStep(2);
                    }}
                  >
                    <div className="grid gap-1">
                      <h2
                        ref={headingRef}
                        tabIndex={-1}
                        className="scroll-mt-24 text-xl font-semibold tracking-[-0.03em] outline-none"
                      >
                        Contact
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        We send the receipt and tracking to this email.
                      </p>
                    </div>

                    <CheckoutField
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      isRequired
                      value={contact.email}
                      onChange={(value) => {
                        setEmailError("");
                        setContact((current) => ({ ...current, email: value }));
                      }}
                      error={emailError}
                    />

                    <Checkbox
                      isSelected={contact.marketing}
                      onCheckedChange={(selected) =>
                        setContact((current) => ({
                          ...current,
                          marketing: selected,
                        }))
                      }
                      description="About two emails each month. You can stop at any time."
                    >
                      Email me about new releases and field notes.
                    </Checkbox>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
                      <ButtonLink href="/blocks/product-01" variant="ghost">
                        Back to bag
                      </ButtonLink>
                      <Button type="submit">Continue to shipping</Button>
                    </div>
                  </Form>
                )}

                {step === 2 && (
                  <Form
                    validationBehavior="aria"
                    className="grid gap-6"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const errors = validateAddress();
                      if (Object.keys(errors).length > 0) {
                        setAddressErrors(errors);
                        focusFirstInvalid(event.currentTarget);
                        return;
                      }
                      setAddressErrors({});
                      setStep(3);
                    }}
                  >
                    <div className="grid gap-1">
                      <h2
                        ref={headingRef}
                        tabIndex={-1}
                        className="scroll-mt-24 text-xl font-semibold tracking-[-0.03em] outline-none"
                      >
                        Shipping
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        We ship from Portland, Oregon. You can change the
                        address until you pay.
                      </p>
                    </div>

                    {!supported && (
                      <Alert
                        variant="warning"
                        title={`We do not ship to ${countryName(address.country)}.`}
                      >
                        Choose the United States or Canada to continue.
                      </Alert>
                    )}

                    <Fieldset className="grid gap-4">
                      <FieldsetLegend>Shipping address</FieldsetLegend>
                      <FieldsetDescription>
                        Use an address where someone can receive the order.
                      </FieldsetDescription>

                      <div className="grid gap-4 sm:grid-cols-6">
                        <ComboBox
                          label="Country"
                          options={countries}
                          value={address.country}
                          onValueChange={changeCountry}
                          isRequired
                          size="md"
                          className="sm:col-span-3"
                        />
                        {supported ? (
                          <Select
                            label={regionLabel(address.country)}
                            options={regionsFor(address.country)}
                            value={address.region}
                            onValueChange={(value) =>
                              updateAddress({ region: value })
                            }
                            isRequired
                            size="md"
                            className="sm:col-span-3"
                          />
                        ) : (
                          <CheckoutField
                            label={regionLabel(address.country)}
                            value={address.region}
                            onChange={(value) =>
                              updateAddress({ region: value })
                            }
                            isRequired
                            className="sm:col-span-3"
                          />
                        )}
                        <CheckoutField
                          label="First name"
                          autoComplete="given-name"
                          isRequired
                          value={address.firstName}
                          onChange={(value) =>
                            updateAddress({ firstName: value })
                          }
                          error={addressErrors.firstName}
                          className="sm:col-span-3"
                        />
                        <CheckoutField
                          label="Last name"
                          autoComplete="family-name"
                          isRequired
                          value={address.lastName}
                          onChange={(value) =>
                            updateAddress({ lastName: value })
                          }
                          error={addressErrors.lastName}
                          className="sm:col-span-3"
                        />
                        <CheckoutField
                          label="Address"
                          autoComplete="address-line1"
                          isRequired
                          value={address.address1}
                          onChange={(value) =>
                            updateAddress({ address1: value })
                          }
                          error={addressErrors.address1}
                          className="sm:col-span-6"
                        />
                        <CheckoutField
                          label="Apartment or suite"
                          description="Optional."
                          autoComplete="address-line2"
                          value={address.address2}
                          onChange={(value) =>
                            updateAddress({ address2: value })
                          }
                          className="sm:col-span-6"
                        />
                        <CheckoutField
                          label="City"
                          autoComplete="address-level2"
                          isRequired
                          value={address.city}
                          onChange={(value) => updateAddress({ city: value })}
                          error={addressErrors.city}
                          className="sm:col-span-4"
                        />
                        <CheckoutField
                          label={postalLabel(address.country)}
                          autoComplete="postal-code"
                          isRequired
                          value={address.postalCode}
                          onChange={(value) =>
                            updateAddress({ postalCode: value })
                          }
                          error={addressErrors.postalCode}
                          className="sm:col-span-2"
                        />
                      </div>
                    </Fieldset>

                    <section
                      aria-labelledby="delivery-title"
                      className="grid gap-3"
                    >
                      <div className="grid gap-1">
                        <h3
                          id="delivery-title"
                          className="text-sm font-semibold"
                        >
                          Delivery
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Orders leave in 1–2 business days.
                        </p>
                      </div>

                      {supported ? (
                        <RadioGroup
                          aria-label="Delivery method"
                          value={shippingId}
                          onValueChange={setShippingId}
                          className="gap-2"
                        >
                          {options.map((item) => (
                            <RadioField
                              key={item.id}
                              value={item.id}
                              variant="card"
                            >
                              <RadioButton className="items-center">
                                <RadioIndicator />
                                <span className="min-w-0 flex-1">
                                  <RadioLabel>{item.name}</RadioLabel>
                                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                                    {item.note} · Arrives{" "}
                                    {formatArrival(
                                      item.arrivalStart,
                                      item.arrivalEnd,
                                    )}
                                  </span>
                                </span>
                                <span className="shrink-0 text-sm font-semibold tabular-nums">
                                  {item.price === 0
                                    ? "Free"
                                    : formatMoney(item.price)}
                                </span>
                              </RadioButton>
                            </RadioField>
                          ))}
                        </RadioGroup>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Delivery options appear when you choose a country we
                          ship to.
                        </p>
                      )}
                    </section>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
                      <Button
                        type="button"
                        variant="ghost"
                        onPress={() => setStep(1)}
                      >
                        Back to contact
                      </Button>
                      <Button type="submit" isDisabled={!supported}>
                        Continue to payment
                      </Button>
                    </div>
                  </Form>
                )}

                {step === 3 && (
                  <Form
                    validationBehavior="aria"
                    className="grid gap-6"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const errors = validateCard();
                      if (Object.keys(errors).length > 0) {
                        setCardErrors(errors);
                        focusFirstInvalid(event.currentTarget);
                        return;
                      }
                      setCardErrors({});
                      void pay();
                    }}
                  >
                    <div className="grid gap-1">
                      <h2
                        ref={headingRef}
                        tabIndex={-1}
                        className="scroll-mt-24 text-xl font-semibold tracking-[-0.03em] outline-none"
                      >
                        Payment
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your card is charged when you place the order.
                      </p>
                    </div>

                    {payError && (
                      <Alert variant="error" title="Payment declined">
                        {payError}
                      </Alert>
                    )}

                    <Fieldset className="grid gap-4">
                      <FieldsetLegend>Card details</FieldsetLegend>
                      <FieldsetDescription>
                        Use a Visa, Mastercard, or American Express card.
                      </FieldsetDescription>
                      <div className="grid gap-4 sm:grid-cols-6">
                        <CheckoutField
                          label="Name on card"
                          autoComplete="cc-name"
                          isRequired
                          value={card.name}
                          onChange={(value) => updateCard({ name: value })}
                          error={cardErrors.name}
                          className="sm:col-span-6"
                        />
                        <CheckoutField
                          label="Card number"
                          autoComplete="cc-number"
                          inputMode="numeric"
                          isRequired
                          value={card.number}
                          onChange={(value) =>
                            updateCard({ number: formatCardNumber(value) })
                          }
                          error={cardErrors.number}
                          className="sm:col-span-6"
                        />
                        <CheckoutField
                          label="Expiry"
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          inputMode="numeric"
                          isRequired
                          value={card.expiry}
                          onChange={(value) =>
                            updateCard({ expiry: formatExpiry(value) })
                          }
                          error={cardErrors.expiry}
                          className="sm:col-span-3"
                        />
                        <CheckoutField
                          label="Security code"
                          autoComplete="cc-csc"
                          inputMode="numeric"
                          isRequired
                          value={card.cvc}
                          onChange={(value) =>
                            updateCard({ cvc: digits(value).slice(0, 4) })
                          }
                          error={cardErrors.cvc}
                          className="sm:col-span-3"
                        />
                      </div>
                    </Fieldset>

                    <Checkbox
                      isSelected={billingSame}
                      onCheckedChange={(selected) => {
                        setBillingSame(selected);
                        setCardErrors({});
                      }}
                    >
                      Billing address is the same as the shipping address.
                    </Checkbox>

                    {!billingSame && (
                      <Fieldset className="grid gap-4">
                        <FieldsetLegend>Billing address</FieldsetLegend>
                        <div className="grid gap-4 sm:grid-cols-6">
                          <ComboBox
                            label="Country"
                            options={countries.filter((country) =>
                              isSupportedCountry(country.id),
                            )}
                            value={billing.country}
                            onValueChange={(value) =>
                              updateBilling({
                                country: value,
                                region: regionsFor(value)[0]?.id ?? "",
                              })
                            }
                            isRequired
                            size="md"
                            className="sm:col-span-6"
                          />
                          <CheckoutField
                            label="Address"
                            autoComplete="billing address-line1"
                            isRequired
                            value={billing.address1}
                            onChange={(value) =>
                              updateBilling({ address1: value })
                            }
                            error={cardErrors.billingAddress1}
                            className="sm:col-span-6"
                          />
                          <CheckoutField
                            label="City"
                            autoComplete="billing address-level2"
                            isRequired
                            value={billing.city}
                            onChange={(value) => updateBilling({ city: value })}
                            error={cardErrors.billingCity}
                            className="sm:col-span-6"
                          />
                          <Select
                            label={regionLabel(billing.country)}
                            options={
                              billing.country === "CA"
                                ? caProvinces
                                : regionsFor("US")
                            }
                            value={billing.region}
                            onValueChange={(value) =>
                              updateBilling({ region: value })
                            }
                            isRequired
                            size="md"
                            className="sm:col-span-3"
                          />
                          <CheckoutField
                            label={postalLabel(billing.country)}
                            autoComplete="billing postal-code"
                            isRequired
                            value={billing.postalCode}
                            onChange={(value) =>
                              updateBilling({ postalCode: value })
                            }
                            error={cardErrors.billingPostal}
                            className="sm:col-span-3"
                          />
                        </div>
                      </Fieldset>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
                      <Button
                        type="button"
                        variant="ghost"
                        isDisabled={pending}
                        onPress={() => setStep(2)}
                      >
                        Back to shipping
                      </Button>
                      <Button type="submit" isDisabled={pending}>
                        {pending ? (
                          <>
                            <Spinner size="sm" decorative />
                            Processing payment…
                          </>
                        ) : (
                          <>
                            <LockIcon size={16} aria-hidden="true" />
                            Pay {formatMoney(totals.total)}
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </div>
            </div>

            <aside className="lg:sticky lg:top-6">{summary}</aside>
          </div>
        </main>
      )}

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>Bracken Supply · Portland, Oregon</p>
          <a
            href="mailto:help@brackensupply.com"
            className="rounded-sm underline-offset-4 outline-offset-4 outline-transparent transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring"
          >
            help@brackensupply.com
          </a>
        </div>
      </footer>
    </div>
  );
}
