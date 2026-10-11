import { Kbd, KbdGroup } from "@/components/ui/kbd-code";

export function KbdCodeGroupDemo() {
  return (
    <div className="max-w-md space-y-4 text-sm leading-7">
      <p>
        Press{" "}
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>{" "}
        to open search.
      </p>
      <p>
        Press{" "}
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>{" "}
        to show all commands.
      </p>
    </div>
  );
}
