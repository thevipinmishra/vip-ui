"use client";

import { NativeSelect } from "@/components/ui/native-select";

export function NativeSelectGroupsDemo() {
  return (
    <div className="w-full max-w-sm">
      <NativeSelect label="Team" name="team" placeholder="Choose a team">
        <optgroup label="Design">
          <option value="interface">Interface design</option>
          <option value="research">Research</option>
        </optgroup>
        <optgroup label="Engineering">
          <option value="platform">Platform</option>
          <option value="mobile" disabled>
            Mobile (full)
          </option>
        </optgroup>
      </NativeSelect>
    </div>
  );
}
