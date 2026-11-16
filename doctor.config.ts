import { defineConfig } from "react-doctor/api";

export default defineConfig({
  rules: {
    // Registry components are copied into consumer apps as standalone files
    // with no app-level provider. Several use layout animations, which the
    // LazyMotion feature sets cannot serve, so the full `motion` component is
    // intentional.
    "react-doctor/use-lazy-motion": "off",
    // A registry item is distributed as one file: its component, variants,
    // style maps, and helpers must stay together so an install stays a single
    // copy. Fast Refresh reloads the file instead of preserving its state.
    "react-doctor/only-export-components": "off",
  },
});
