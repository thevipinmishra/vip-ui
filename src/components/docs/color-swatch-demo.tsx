import { ColorSwatch } from "@/components/ui/color-swatch";

const colors = [
  { name: "Ocean", value: "#2563eb" },
  { name: "Pine", value: "#15803d" },
  { name: "Coral", value: "#ea580c" },
  { name: "Plum", value: "#9333ea" },
];

export function ColorSwatchDemo() {
  return (
    <div className="flex flex-wrap gap-5">
      {colors.map(({ name, value }) => (
        <div
          key={name}
          className="grid justify-items-center gap-2 text-xs text-muted-foreground"
        >
          <ColorSwatch color={value} colorName={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}
