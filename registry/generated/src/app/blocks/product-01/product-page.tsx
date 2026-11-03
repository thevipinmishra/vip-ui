"use client";

import {
  ArrowCounterClockwiseIcon,
  HeartIcon,
  LeafIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  StarHalfIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { type Color, parseColor } from "react-aria-components";
import { Accordion, AccordionItem } from "../../../components/vip-ui/accordion";
import { Avatar } from "../../../components/vip-ui/avatar";
import { Badge } from "../../../components/vip-ui/badge";
import { Breadcrumb, Breadcrumbs } from "../../../components/vip-ui/breadcrumbs";
import { Button } from "../../../components/vip-ui/button";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "../../../components/vip-ui/color-swatch-picker";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../../components/vip-ui/description-list";
import { NumberField } from "../../../components/vip-ui/number-field";
import { RatingInput } from "../../../components/vip-ui/rating-input";
import { Tab, TabList, TabPanel, Tabs } from "../../../components/vip-ui/tabs";
import { showToast } from "../../../components/vip-ui/toast";
import { ToggleButton } from "../../../components/vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../../components/vip-ui/toggle-button-group";
import { cn } from "../../../components/vip-ui/utils";
import { CartSheet } from "./cart-sheet";
import {
  type CartLine,
  cartCount,
  colors,
  formatMoney,
  formatReviewDate,
  initialCart,
  product,
  ratingBreakdown,
  reviews,
  sizeGuide,
  sizes,
  specifications,
} from "./data";
import { type ArtView, ProductArt } from "./product-art";

const views: { id: ArtView; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "detail", label: "Fabric" },
];

function Stars({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const full = Math.floor(value);
  const half = value - full >= 0.25;
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const position = index + 1;
        if (position <= full) {
          return <StarIcon key={position} size={size} weight="fill" />;
        }
        if (position === full + 1 && half) {
          return <StarHalfIcon key={position} size={size} weight="fill" />;
        }
        return (
          <StarIcon
            key={position}
            size={size}
            weight="regular"
            className="opacity-25"
          />
        );
      })}
    </span>
  );
}

export function ProductPage() {
  const [colorId, setColorId] = useState("moss");
  const [size, setSize] = useState("m");
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState<ArtView>("front");
  const [tab, setTab] = useState("overview");
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
    new Set(["shipping"]),
  );
  const [rating, setRating] = useState(0);
  const [shownReviews, setShownReviews] = useState(3);
  const [saved, setSaved] = useState(false);
  const [cart, setCart] = useState<CartLine[]>(initialCart);
  const [cartOpen, setCartOpen] = useState(false);

  const color = colors.find((item) => item.id === colorId) ?? colors[0];
  const count = cartCount(cart);
  const visibleReviews = reviews.slice(0, shownReviews);

  function addToCart() {
    const key = `jacket-${color.id}-${size}`;
    setCart((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key
            ? { ...line, quantity: Math.min(9, line.quantity + quantity) }
            : line,
        );
      }
      return [
        ...current,
        {
          key,
          name: "Field Jacket",
          subtitle: `${color.name} · ${size.toUpperCase()}`,
          price: product.price,
          quantity,
          colorId: color.id,
          kind: "jacket",
        },
      ];
    });
    showToast({
      title: `${quantity} ${quantity === 1 ? "jacket" : "jackets"} added to your bag`,
      description: `${color.name} · Size ${size.toUpperCase()}`,
      variant: "success",
    });
  }

  function changeQuantity(key: string, next: number) {
    if (!Number.isFinite(next)) return;
    setCart((current) =>
      current.map((line) =>
        line.key === key
          ? { ...line, quantity: Math.min(9, Math.max(1, next)) }
          : line,
      ),
    );
  }

  function removeLine(key: string) {
    const index = cart.findIndex((line) => line.key === key);
    const line = cart[index];
    if (!line) return;
    setCart((current) => current.filter((item) => item.key !== key));
    showToast({
      title: `${line.name} removed`,
      description: line.subtitle,
      action: {
        label: "Undo",
        onAction: () =>
          setCart((current) => {
            const next = [...current];
            next.splice(Math.min(index, next.length), 0, line);
            return next;
          }),
      },
    });
  }

  function goToReviews() {
    setTab("reviews");
    document
      .getElementById("product-info")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openSizeGuide() {
    setExpandedKeys(new Set<Key>(["size"]));
    document
      .getElementById("good-to-know")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div id="top" className="min-h-svh bg-background pb-24 md:pb-0">
      <div className="bg-foreground px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-background">
        Free shipping over $150 · 60-day returns
      </div>

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
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

          <p className="hidden text-xs text-muted-foreground md:block">
            Field series / Autumn 2026
          </p>

          <div className="ms-auto flex items-center gap-2">
            <a
              href="mailto:help@brackensupply.com"
              className="hidden min-h-11 items-center rounded-md px-2 text-sm text-muted-foreground outline-offset-2 outline-transparent transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring sm:inline-flex"
            >
              Help
            </a>
            <Button
              variant="outline"
              onPress={() => setCartOpen(true)}
              aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <ShoppingBagIcon size={18} aria-hidden="true" />
              <span className="hidden sm:inline">Bag</span>
              <span className="grid min-w-5 place-items-center rounded-full bg-foreground px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-background">
                {count}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 pt-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumbs">
          <Breadcrumbs>
            <Breadcrumb>Shop</Breadcrumb>
            <Breadcrumb>Outerwear</Breadcrumb>
            <Breadcrumb>Field Jacket</Breadcrumb>
          </Breadcrumbs>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-2xl bg-muted/50 ring-1 ring-border/60">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,var(--card),transparent_70%)]"
              />
              <div className="relative grid h-full place-items-center px-6 py-8 sm:px-10">
                <ProductArt
                  hex={color.hex}
                  colorName={color.name}
                  view={view}
                  className="max-h-full"
                />
              </div>
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {color.id === "moss" && (
                  <Badge variant="accent">New color</Badge>
                )}
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-xs">
                <div>
                  <p className="font-medium text-foreground">{color.name}</p>
                  <p className="text-muted-foreground">
                    {views.find((item) => item.id === view)?.label} view
                  </p>
                </div>
                <p className="tabular-nums text-muted-foreground">
                  {views.findIndex((item) => item.id === view) + 1} / 3
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {views.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.label.toLowerCase()} of the jacket`}
                  aria-pressed={view === item.id}
                  onClick={() => setView(item.id)}
                  className={cn(
                    "group grid gap-1.5 rounded-lg bg-muted/50 p-1.5 ring-1 outline-offset-2 outline-transparent transition-[ring-color,background-color] duration-150 ease-out-quint hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
                    view === item.id ? "ring-2 ring-primary" : "ring-border/70",
                  )}
                >
                  <span className="aspect-[5/4] overflow-hidden rounded-md bg-card/60">
                    <ProductArt
                      hex={color.hex}
                      colorName={color.name}
                      view={item.id}
                    />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground group-aria-pressed:text-foreground">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-5 lg:pt-1">
            <div className="grid gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {product.line} · Unisex
              </p>
              <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Stars value={product.rating} />
                <span className="font-medium tabular-nums">
                  {product.rating}
                </span>
                <span className="text-muted-foreground">·</span>
                <button
                  type="button"
                  onClick={goToReviews}
                  className="rounded-sm text-muted-foreground underline-offset-4 outline-offset-4 outline-transparent transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {product.reviewCount} reviews
                </button>
              </div>
            </div>

            <div className="grid gap-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="text-xl font-semibold tracking-[-0.03em] tabular-nums">
                  {formatMoney(product.price)}
                </p>
                <Badge variant="success" dot>
                  In stock
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                or 4 payments of {formatMoney(product.price / 4)} with Afterpay
              </p>
            </div>

            <p className="max-w-[52ch] text-sm leading-6 text-muted-foreground">
              A hard-wearing jacket for cold, wet days. Cotton blocks wind and
              rain. Fleece keeps you warm.
            </p>

            <div className="grid gap-2.5 border-t border-border/70 pt-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm text-muted-foreground">
                  {color.name}
                </span>
              </div>
              <ColorSwatchPicker
                aria-label="Color"
                value={parseColor(color.hex)}
                onChange={(next: Color) => {
                  const hex = next.toString("hex").toLowerCase();
                  const match = colors.find(
                    (item) => item.hex.toLowerCase() === hex,
                  );
                  if (match) setColorId(match.id);
                }}
              >
                {colors.map((item) => (
                  <ColorSwatchPickerItem
                    key={item.id}
                    color={item.hex}
                    aria-label={item.name}
                    className="size-9"
                  />
                ))}
              </ColorSwatchPicker>
            </div>

            <div className="grid gap-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Size</span>
                <Button variant="minimal" size="sm" onPress={openSizeGuide}>
                  Size guide
                </Button>
              </div>
              <ToggleButtonGroup
                aria-label="Size"
                size="sm"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={new Set([size])}
                onSelectionChange={(keys) => {
                  const next = [...keys][0];
                  if (next != null) setSize(String(next));
                }}
                className="w-full sm:w-fit"
              >
                {sizes.map((item) => (
                  <ToggleButton
                    key={item.id}
                    id={item.id}
                    variant="segmented"
                    isDisabled={item.soldOut}
                    className={cn(
                      "min-w-11 flex-1 px-2 sm:flex-none sm:px-3",
                      item.soldOut && "line-through",
                    )}
                  >
                    {item.label}
                    {item.soldOut && (
                      <span className="sr-only"> (sold out)</span>
                    )}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <p className="text-xs text-muted-foreground">
                XS is sold out. We restock in November.
              </p>
            </div>

            <div className="grid grid-cols-[7rem_minmax(0,1fr)_auto] items-center gap-2">
              <NumberField
                aria-label="Quantity"
                size="md"
                minValue={1}
                maxValue={9}
                value={quantity}
                onChange={setQuantity}
              />
              <Button
                size="md"
                onPress={addToCart}
                className="w-full justify-center"
              >
                Add to bag
              </Button>
              <ToggleButton
                variant="default"
                size="md"
                iconOnly
                aria-label={
                  saved ? "Remove from saved items" : "Save for later"
                }
                isSelected={saved}
                onChange={(next) => {
                  setSaved(next);
                  showToast({
                    title: next
                      ? "Saved for later"
                      : "Removed from saved items",
                    description: `${color.name} · Size ${size.toUpperCase()}`,
                  });
                }}
              >
                <HeartIcon
                  weight={saved ? "fill" : "regular"}
                  aria-hidden="true"
                />
              </ToggleButton>
            </div>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 shrink-0 rounded-full bg-success" />
              Ships today if you order before 2 PM PT.
            </p>
          </div>
        </div>

        <section
          id="product-info"
          aria-labelledby="details-title"
          className="mt-14 border-t border-border/70 pt-8"
        >
          <h2
            id="details-title"
            className="text-xl font-semibold tracking-[-0.03em]"
          >
            The details
          </h2>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12">
            <Tabs value={tab} onValueChange={setTab}>
              <TabList
                aria-label="Product information"
                className="w-fit max-w-full"
              >
                <Tab id="overview">Overview</Tab>
                <Tab id="specifications">Specifications</Tab>
                <Tab id="reviews">
                  Reviews
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {product.reviewCount}
                  </span>
                </Tab>
              </TabList>

              <TabPanel id="overview" className="mt-4 p-5 sm:p-6">
                <div className="grid gap-5">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="grid gap-1.5">
                      <LeafIcon
                        size={20}
                        className="text-muted-foreground"
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold">Organic shell</h3>
                      <p className="text-xs leading-5 text-muted-foreground">
                        Grown without synthetic pesticides.
                      </p>
                    </div>
                    <div className="grid gap-1.5">
                      <ShieldCheckIcon
                        size={20}
                        className="text-muted-foreground"
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold">Weather ready</h3>
                      <p className="text-xs leading-5 text-muted-foreground">
                        A PFC-free finish sheds light rain.
                      </p>
                    </div>
                    <div className="grid gap-1.5">
                      <ArrowCounterClockwiseIcon
                        size={20}
                        className="text-muted-foreground"
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold">Repairable</h3>
                      <p className="text-xs leading-5 text-muted-foreground">
                        We fix zips, snaps, and seams for two years.
                      </p>
                    </div>
                  </div>
                  <figure className="rounded-lg bg-muted/50 p-4 ring-1 ring-border/60 sm:p-5">
                    <blockquote className="text-sm leading-6 text-foreground">
                      “We wanted one jacket for the trail and the train. It had
                      to look right in both places.”
                    </blockquote>
                    <figcaption className="mt-2 text-xs text-muted-foreground">
                      Nils Andersen, design lead
                    </figcaption>
                  </figure>
                </div>
              </TabPanel>

              <TabPanel id="specifications" className="mt-4 p-5 sm:p-6">
                <DescriptionList className="gap-y-2.5 rounded-lg bg-muted/40 p-4 ring-1 ring-border/60 sm:grid-cols-[9rem_minmax(0,1fr)]">
                  {specifications.map((item) => (
                    <div key={item.term} className="contents">
                      <DescriptionTerm>{item.term}</DescriptionTerm>
                      <DescriptionDetail>{item.detail}</DescriptionDetail>
                    </div>
                  ))}
                </DescriptionList>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  Measurements are taken flat. Allow 1–2 cm for tolerance.
                </p>
              </TabPanel>

              <TabPanel id="reviews" className="mt-4 p-5 sm:p-6">
                <div className="grid gap-6">
                  <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
                    <div className="grid gap-1">
                      <p className="text-xl font-semibold tracking-[-0.04em] tabular-nums">
                        {product.rating}
                      </p>
                      <Stars value={product.rating} size={16} />
                      <p className="text-xs text-muted-foreground">
                        {product.reviewCount} reviews
                      </p>
                    </div>
                    <div className="grid gap-1.5">
                      {ratingBreakdown.map((row) => (
                        <div
                          key={row.stars}
                          className="flex items-center gap-3 text-xs"
                        >
                          <span className="w-14 shrink-0 text-muted-foreground">
                            {row.stars} {row.stars === 1 ? "star" : "stars"}
                          </span>
                          <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                            <span
                              className="block h-full rounded-full bg-foreground"
                              style={{
                                width: `${(row.count / product.reviewCount) * 100}%`,
                              }}
                            />
                          </span>
                          <span className="w-8 shrink-0 text-end tabular-nums text-muted-foreground">
                            {row.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/40 p-4 ring-1 ring-border/60">
                    <RatingInput
                      label="Your rating"
                      value={rating}
                      onValueChange={setRating}
                      className="w-fit"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {rating > 0
                        ? `Thanks. You rated this jacket ${rating} of 5.`
                        : "Select a star to rate this jacket."}
                    </p>
                  </div>

                  <ul className="grid divide-y divide-border/70">
                    {visibleReviews.map((review) => (
                      <li
                        key={review.id}
                        className="grid gap-2.5 py-4 first:pt-0"
                      >
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Avatar name={review.name} size="sm" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium">{review.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {review.location} ·{" "}
                              {formatReviewDate(review.date)}
                            </p>
                          </div>
                          <div className="ms-auto flex items-center gap-1.5">
                            <Stars value={review.rating} />
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {review.rating}.0
                            </span>
                          </div>
                        </div>
                        <div className="grid gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold">
                              {review.title}
                            </h3>
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                <SealCheckIcon size={13} aria-hidden="true" />
                                Verified buyer
                              </span>
                            )}
                          </div>
                          <p className="max-w-[70ch] text-sm leading-6 text-muted-foreground">
                            {review.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-3">
                    {shownReviews < reviews.length ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onPress={() =>
                          setShownReviews((current) =>
                            Math.min(reviews.length, current + 3),
                          )
                        }
                      >
                        Show {Math.min(3, reviews.length - shownReviews)} more
                        reviews
                      </Button>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Showing {shownReviews} of {product.reviewCount} reviews.
                      </p>
                    )}
                  </div>
                </div>
              </TabPanel>
            </Tabs>

            <aside
              id="good-to-know"
              aria-labelledby="good-to-know-title"
              className="grid content-start gap-3 scroll-mt-24"
            >
              <h3
                id="good-to-know-title"
                className="text-base font-semibold tracking-[-0.02em]"
              >
                Good to know
              </h3>
              <Accordion
                variant="divided"
                expandedKeys={expandedKeys}
                onExpandedChange={(keys) => setExpandedKeys(new Set(keys))}
              >
                <AccordionItem id="shipping" title="Shipping and returns">
                  <p>
                    Orders leave Portland in 1–2 business days. Standard
                    delivery takes 5–7 business days. Returns are free within 60
                    days.
                  </p>
                </AccordionItem>
                <AccordionItem id="size" title="Size guide">
                  <p className="mb-3">
                    The jacket has a regular fit. If you wear a heavy sweater,
                    choose one size larger.
                  </p>
                  <dl className="grid gap-1.5">
                    {sizeGuide.map((row) => (
                      <div
                        key={row.size}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <dt className="font-medium text-foreground">
                          {row.size}
                        </dt>
                        <dd className="tabular-nums">{row.chest}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionItem>
                <AccordionItem id="care" title="Care">
                  <p>
                    Wash cold with like colors. Close the snaps. Do not use
                    bleach. Tumble dry low. Do not iron the snaps.
                  </p>
                </AccordionItem>
                <AccordionItem id="warranty" title="Repair and warranty">
                  <p>
                    We repair defects in materials and work for two years. Send
                    a photo to repairs@brackensupply.com.
                  </p>
                </AccordionItem>
              </Accordion>
            </aside>
          </div>
        </section>
      </main>

      <footer className="mt-14 border-t border-border/70">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>Bracken Supply · Portland, Oregon</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[1240px] items-center gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold tabular-nums">
              {formatMoney(product.price)}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {color.name} · {size.toUpperCase()}
            </p>
          </div>
          <Button
            size="md"
            onPress={addToCart}
            className="ms-auto flex-1 justify-center"
          >
            Add to bag
          </Button>
        </div>
      </div>

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        lines={cart}
        onQuantityChange={changeQuantity}
        onRemove={removeLine}
      />
    </div>
  );
}
