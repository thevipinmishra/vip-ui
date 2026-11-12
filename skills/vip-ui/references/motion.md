# Motion rules

vip/ui components share the tokens in the installed `motion.ts` (import path `@/components/vip-ui/motion`). Never add new timing values in a component; use these tokens and change `motion.ts` to retune everything.

## Durations

| Token             | Value | CSS class      | Use                                                                     |
| ----------------- | ----- | -------------- | ----------------------------------------------------------------------- |
| `duration.fast`   | 150ms | `duration-150` | Hover, press, focus, color changes. Exits from small overlays.          |
| `duration.base`   | 200ms | `duration-200` | Checks, indicators, popover entrances. Most enter and exit animations.  |
| `duration.slow`   | 250ms | `duration-250` | Disclosure panels, chevrons, height changes.                            |
| `duration.reveal` | 450ms | —              | Content that enters one time: TextReveal, StaggerGroup, AnimatedNumber. |

Entrance travel offsets: `offset.sm` 4px, `offset.md` 8px, `offset.lg` 12px.

## Curves

| Token       | Value                             | CSS                                  | Use                                                |
| ----------- | --------------------------------- | ------------------------------------ | -------------------------------------------------- |
| `easeOut`   | `cubic-bezier(0.23, 1, 0.32, 1)`  | `ease-out-quint`                     | The default curve for all tweens.                  |
| `easeInOut` | `cubic-bezier(0.77, 0, 0.175, 1)` | —                                    | Loops that go and come back, such as pulsing dots. |
| `easeSheet` | `cubic-bezier(0.32, 0.72, 0, 1)`  | `ease-[cubic-bezier(0.32,0.72,0,1)]` | Long travel: Sheet, and Dialog on phones.          |

## Springs

| Token          | Value                            | Use                                                                                         |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------------- |
| `springSnappy` | duration 0.24, bounce 0          | Small fast follow motion: the item highlight, sliding digits.                               |
| `springLayout` | duration 0.3, bounce 0           | Layout motion: tab and toggle indicators, Stepper, PresenceList, button layout.             |
| `springPop`    | visualDuration 0.28, bounce 0.12 | Parts that pop with a small overshoot: switch thumb, radio dot, slider thumb, rating stars. |

Kit springs have no bounce, except `springPop`. Its CSS equivalent is the `--ease-spring` token; use it with `duration-350`, because the curve includes the settle time.

## Loops

| Token        | Value          | Use                                                                                   |
| ------------ | -------------- | ------------------------------------------------------------------------------------- |
| `loop.spin`  | 0.8s linear    | Spinner ring.                                                                         |
| `loop.pulse` | 1.1s easeInOut | Spinner dots and segments, ToolCall, AgentStatus, the prompt caret (`animate-caret`). |
| `loop.sweep` | 1.6s linear    | Skeleton shimmer, indeterminate ProgressBar.                                          |

`maxStagger` is 0.6s: the total delay of a TextReveal or StaggerGroup never exceeds 0.6s. Exits run at about 0.7× their entrance.

## Tuned timings

Each timing is tuned for one component. Keep them when you change the scale.

| Component                                                   | Timing                                                              |
| ----------------------------------------------------------- | ------------------------------------------------------------------- |
| Tooltip                                                     | 180ms in, 120ms out                                                 |
| CommandPalette                                              | 180ms in, 120ms out, scale from 0.98, no rise                       |
| Popover (Menu, Select, ComboBox, date pickers, ColorPicker) | base in, fast out                                                   |
| Dialog                                                      | 260ms in, 180ms out; backdrop 240ms in, 160ms out                   |
| Dialog on phones                                            | 320ms in, 240ms out, slides on easeSheet                            |
| Sheet                                                       | 320ms in, 240ms out, 300ms settle after a swipe                     |
| Toast                                                       | 350ms in, 200ms out; the stack moves on `--ease-spring`             |
| Chart                                                       | TanStack spring, stiffness 380, damping 39; plot fades in with slow |

## Engine rules

- State motion is CSS. React Aria sets data attributes (`data-pressed`, `data-selected`, `data-entering`, `data-exiting`), and the Tailwind plugin turns them into variants (`pressed:`, `selected:`). Nested parts read the parent state with group variants, such as `group-selected/switch:`.
- Overlays open and close with CSS transitions on React Aria `entering:`/`exiting:`. CSS keeps running when the main thread is busy. Do not drive open/close from JS.
- Use Motion only when CSS cannot do the work: layout (`layoutId`), presence exit before unmount, counted values, and gestures such as a sheet following a swipe.
- Start JS tweens inside `requestAnimationFrame`, never in the commit, so the first frame is not skipped.

```css
/* CSS: a popover panel entering */
entering:opacity-0 motion-safe:entering:scale-96 duration-200 ease-out-quint
```

```tsx
// Motion: a value or a layout change, gated for reduced motion
import { motion, useReducedMotion } from "motion/react";
import { duration, easeOut, transitionFor } from "@/components/vip-ui/motion";

const reduceMotion = useReducedMotion();
transition={transitionFor(reduceMotion, {
  duration: duration.base,
  ease: easeOut,
})}
```

## Reduced motion

Every animated component reads `prefers-reduced-motion`:

- CSS travel gets `motion-safe:` on translate/scale/rotate, or `motion-reduce:` on the transition. Short fades and color changes stay.
- Motion animations jump to the end: `transitionFor(useReducedMotion(), transition)` returns `{ duration: 0 }` when reduced motion is on.
- Loops stop on a still frame (Skeleton does not shimmer, Marquee does not scroll), and one-time entrance reveals show the content immediately.

## Compositor rules for loops

A loader is visible exactly when the main thread is busy, so an infinite loop must not need the main thread:

- Animate one whole `transform` string, such as `["rotate(0deg)", "rotate(360deg)"]` — never `x`, `y`, `rotate`, or `scale` as separate values, and never `layout`/`layoutId` for a loop. Motion then hands the animation to the browser (WAAPI) and it keeps drawing while the main thread blocks.
- Always give the explicit first keyframe. Motion reads the start from computed style otherwise, and a matrix-to-`rotate(360deg)` interpolation does not turn.
- Animate an HTML element or the root `<svg>`, never an SVG child.
- Keep `opacity`, `clipPath`, `filter`, whole `transform` strings, and `backgroundColor` as the only compositor-friendly animated values.

## Lists

Lists do not fill each row on hover. One gliding highlight layer moves between the items (ListBox, Menu, Select, ComboBox, GridList, Tree, Table, Calendar, Tabs, Toolbar, ToggleButtonGroup, Pagination). It follows the pointer and the focus-visible item, moves on `springSnappy`, and fades with `fast`. Do not add `hover:bg-*` to items of a kit list; with reduced motion the layer jumps and still fades.
