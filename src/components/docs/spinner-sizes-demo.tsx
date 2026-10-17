import { Spinner } from "@/components/ui/spinner";

export function SpinnerSizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-5">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}
