"use client";

import {
  Autocomplete as AriaAutocomplete,
  type AutocompleteProps,
  useFilter,
} from "react-aria-components";

export function Autocomplete({ filter, ...props }: AutocompleteProps) {
  const { contains } = useFilter({ sensitivity: "base" });
  return <AriaAutocomplete filter={filter ?? contains} {...props} />;
}
