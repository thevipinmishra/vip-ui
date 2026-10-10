import { ColorSwatch } from "@/components/ui/color-swatch";

const colors = [
  { name: "Ocean 100%", value: "rgb(37, 99, 235)" },
  { name: "Ocean 60%", value: "rgba(37, 99, 235, 0.6)" },
  { name: "Ocean 20%", value: "rgba(37, 99, 235, 0.2)" },
];

export function ColorSwatchTransparencyDemo() {
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
