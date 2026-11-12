import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/docs/code-block";
import {
  Code,
  GuidePage,
  GuideSection,
  guideMetadata,
  List,
  TextLink,
} from "@/components/docs/guide";
import { MotionHighlightDemo } from "@/components/docs/motion-highlight-demo";
import { MotionReducedDemo } from "@/components/docs/motion-reduced-demo";
import { MotionScaleDemo } from "@/components/docs/motion-scale-demo";
import { PreviewPanel } from "@/components/docs/preview-panel";

export const metadata = guideMetadata("/components/motion");

const durations = [
  {
    name: "duration.fast",
    value: "150 ms",
    css: "duration-150",
    use: "Hover, press, focus, and color changes. Exits from small overlays.",
  },
  {
    name: "duration.base",
    value: "200 ms",
    css: "duration-200",
    use: "Checks, indicators, and popover entrances. Most enter and exit animations.",
  },
  {
    name: "duration.slow",
    value: "250 ms",
    css: "duration-250",
    use: "Disclosure panels, chevrons, and height changes.",
  },
  {
    name: "duration.reveal",
    value: "450 ms",
    use: "Content that enters the view one time: TextReveal, StaggerGroup, and AnimatedNumber.",
  },
];

const curves = [
  {
    name: "easeOut",
    value: "cubic-bezier(0.23, 1, 0.32, 1)",
    css: "ease-out-quint",
    use: "The default curve for all tweens.",
  },
  {
    name: "easeInOut",
    value: "cubic-bezier(0.77, 0, 0.175, 1)",
    use: "Loops that go and come back, such as pulsing dots.",
  },
  {
    name: "easeSheet",
    value: "cubic-bezier(0.32, 0.72, 0, 1)",
    css: "ease-[cubic-bezier(0.32,0.72,0,1)]",
    use: "Long travel: Sheet, and Dialog on phones.",
  },
];

const springs = [
  {
    name: "springSnappy",
    value: "duration 0.24, bounce 0",
    use: "Small, fast follow motion: the item highlight size and sliding digits.",
  },
  {
    name: "springLayout",
    value: "duration 0.3, bounce 0",
    use: "Layout motion: tab and toggle indicators, Stepper, PresenceList, and Button layout.",
  },
  {
    name: "springPop",
    value: "visualDuration 0.28, bounce 0.12",
    css: "duration-350 ease-spring",
    use: "Parts that pop with a small overshoot: switch thumb, radio dot, slider thumb, and rating stars.",
  },
];

const loops = [
  {
    name: "loop.spin",
    value: "0.8 s, linear",
    use: "Spinner ring.",
  },
  {
    name: "loop.pulse",
    value: "1.1 s, easeInOut",
    css: "animate-caret",
    use: "Spinner dots and segments, ToolCall, AgentStatus, and the prompt caret.",
  },
  {
    name: "loop.sweep",
    value: "1.6 s, linear",
    use: "Skeleton shimmer and the indeterminate ProgressBar.",
  },
];

const tuned = [
  {
    name: "Tooltip",
    value: "180 ms in, 120 ms out",
    use: "Tooltips open many times. A shorter animation does not slow the user.",
  },
  {
    name: "CommandPalette",
    value: "180 ms in, 120 ms out",
    use: "The keyboard opens it many times each day. It does not rise. It scales from 0.98.",
  },
  {
    name: "Popover",
    value: "base in, fast out",
    use: "Menu, Select, ComboBox, date pickers, and ColorPicker use the Popover.",
  },
  {
    name: "Dialog",
    value: "260 ms in, 180 ms out",
    use: "The backdrop fades in 240 ms and out in 160 ms.",
  },
  {
    name: "Dialog on phones",
    value: "320 ms in, 240 ms out",
    use: "The panel slides up from the bottom edge on easeSheet.",
  },
  {
    name: "Sheet",
    value: "320 ms in, 240 ms out, 300 ms settle",
    use: "easeSheet. Settle is the snap back after a swipe.",
  },
  {
    name: "Toast",
    value: "350 ms in, 200 ms out",
    use: "The stack moves on ease-spring. A swipe moves the toast with the pointer.",
  },
  {
    name: "Chart",
    value: "stiffness 380, damping 39",
    use: "A TanStack Charts spring with no bounce. It comes to rest in about 0.5 s. The plot fades in with slow.",
  },
  {
    name: "Presence",
    value: "exit = 0.7 × duration",
    use: "Exits are shorter than entrances.",
  },
  {
    name: "Stagger",
    value: "maxStagger 0.6 s",
    use: "The total delay of a TextReveal or StaggerGroup is not more than 0.6 s.",
  },
  {
    name: "Marquee and TextScramble",
    value: "speed 50 px/s, duration 0.7 s",
    use: "Prop defaults. Linear.",
  },
];

type Token = { name: string; value: string; css?: string; use: string };

function TokenList({ tokens }: { tokens: Token[] }) {
  return (
    <dl className="divide-y divide-border/70 rounded-xl border border-border/70 bg-card/50">
      {tokens.map((token) => (
        <div key={token.name} className="px-4 py-3 sm:px-5">
          <dt className="font-mono text-[13px] leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            <span className="font-medium text-foreground">{token.name}</span>
            {": "}
            {token.value}
          </dt>
          <dd className="mt-0.5 text-[13px] leading-5 text-muted-foreground">
            {token.use}
            {token.css && (
              <span className="mt-1 block font-mono text-foreground [overflow-wrap:anywhere]">
                {token.css}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

async function demoSource(file: string) {
  return (
    await readFile(
      path.join(process.cwd(), "src/components/docs", file),
      "utf8",
    )
  )
    .replaceAll("@/components/ui/", "@/components/vip-ui/")
    .replaceAll("@/lib/motion", "@/components/vip-ui/motion");
}

async function Demo({ file, children }: { file: string; children: ReactNode }) {
  return (
    <PreviewPanel code={await demoSource(file)} filename={file}>
      {children}
    </PreviewPanel>
  );
}

const cssUsage = `<span className="transition-[opacity,scale] duration-200 ease-out-quint entering:opacity-0 motion-safe:entering:scale-96" />`;

const jsUsage = `import { motion, useReducedMotion } from "motion/react";
import { duration, easeOut, transitionFor } from "@/components/vip-ui/motion";

export function Notice() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionFor(reduceMotion, {
        duration: duration.base,
        ease: easeOut,
      })}
    >
      Saved
    </motion.p>
  );
}`;

const loopUsage = `<span
  aria-hidden="true"
  className="size-full animate-spin [animation-duration:0.75s] motion-reduce:animate-none"
/>`;

export default function MotionPage() {
  return (
    <GuidePage href="/components/motion">
      <GuideSection id="principles" title="Principles">
        <List>
          <li>
            Motion shows a change of state. It tells the user what changed and
            where it went. Do not add motion for decoration.
          </li>
          <li>
            Motion is interruptible. A new state starts from the current
            position. It does not wait for the last animation to finish.
          </li>
          <li>
            Move and scale with transforms. Fade with opacity. These run on the
            compositor. Color can change with a short transition. Only
            disclosure panels and LayoutMorph animate height.
          </li>
          <li>
            Motion obeys the reduced motion setting. The state change stays. The
            travel stops.
          </li>
        </List>
      </GuideSection>

      <GuideSection id="tokens" title="Tokens">
        <p>
          The tokens are in <Code>motion.ts</Code>. The CLI adds this file with
          the first component that uses it. CSS uses Tailwind classes with the
          same values. The <Code>--ease-out-quint</Code> and{" "}
          <Code>--ease-spring</Code> theme tokens give the curves.
        </p>
        <h3 className="mt-2 text-sm font-semibold text-foreground">
          Durations
        </h3>
        <TokenList tokens={durations} />
        <h3 className="mt-2 text-sm font-semibold text-foreground">Curves</h3>
        <TokenList tokens={curves} />
        <h3 className="mt-2 text-sm font-semibold text-foreground">Springs</h3>
        <TokenList tokens={springs} />
        <p>
          Push <strong className="text-foreground">Move</strong> to compare the
          durations and springs.
        </p>
        <Demo file="motion-scale-demo.tsx">
          <MotionScaleDemo />
        </Demo>
      </GuideSection>

      <GuideSection id="springs-and-tweens" title="Springs and tweens">
        <p>
          A tween has a fixed duration and a curve. Use a tween for a fade, a
          color change, and an entrance or exit. CSS transitions are tweens.
        </p>
        <p>
          A spring has no fixed curve. It keeps its velocity when the target
          changes during the animation. Use a spring for motion that follows the
          user or the layout, such as an indicator that moves to a new tab.
        </p>
        <List>
          <li>
            The kit springs have no bounce, except <Code>springPop</Code>.
          </li>
          <li>
            <Code>ease-spring</Code> is <Code>springPop</Code> as a CSS{" "}
            <Code>linear()</Code> curve. Use it with <Code>duration-350</Code>,
            because the curve includes the time to settle.
          </li>
        </List>
      </GuideSection>

      <GuideSection id="css-and-motion" title="CSS and Motion">
        <p>
          Most state motion is CSS. React Aria sets a data attribute for each
          state, such as <Code>data-pressed</Code>, <Code>data-selected</Code>,{" "}
          <Code>data-entering</Code>, and <Code>data-exiting</Code>. Tailwind
          variants read these attributes. See{" "}
          <TextLink href="/components/styling#states">Style states</TextLink>. A
          nested part reads the state of its parent with a group variant, such
          as <Code>group-selected/switch:</Code>. Components do not copy state
          into React to animate it.
        </p>
        <CodeBlock code={cssUsage} filename="popover.tsx" />
        <p>
          Popovers, menus, tooltips, and dialogs open and close with CSS on{" "}
          <Code>entering:</Code> and <Code>exiting:</Code>. CSS transitions keep
          running when the main thread is busy.
        </p>
        <p>Use Motion only when CSS cannot do the work:</p>
        <List>
          <li>
            Layout: an element moves to a new position in the layout, such as
            the tab indicator with <Code>layoutId</Code>.
          </li>
          <li>
            Presence: an element animates out before React removes it, such as
            Presence, PresenceList, and TextSwap.
          </li>
          <li>Values: a number counts to a new value.</li>
          <li>Gestures: a sheet follows a swipe.</li>
        </List>
        <CodeBlock code={jsUsage} filename="notice.tsx" />
      </GuideSection>

      <GuideSection id="item-highlight" title="Item highlight">
        <p>
          Lists do not fill each row on hover. One highlight layer moves between
          the items. ListBox, Menu, Select, ComboBox, GridList, Tree, Table,
          Calendar, RangeCalendar, Tabs, Toolbar, ToggleButtonGroup, and
          Pagination use it. It is in <Code>item-highlight.tsx</Code>.
        </p>
        <List>
          <li>
            The layer follows the pointer and the focus-visible item. It moves
            with a transform on the <Code>springSnappy</Code> curve, so it runs
            on the compositor.
          </li>
          <li>
            If the target changes during a move, the layer starts again from its
            current position.
          </li>
          <li>
            The layer fades in and out with <Code>fast</Code>. With reduced
            motion, it jumps to the item and still fades.
          </li>
        </List>
        <p>
          To add the layer to a React Aria collection, wrap its{" "}
          <Code>render</Code> with <Code>withItemHighlight</Code>. Do not add{" "}
          <Code>hover:bg-*</Code> to the items.
        </p>
        <Demo file="motion-highlight-demo.tsx">
          <MotionHighlightDemo />
        </Demo>
      </GuideSection>

      <GuideSection id="loops" title="Loops">
        <TokenList tokens={loops} />
        <p>
          A loader is visible when the main thread is busy, so a loop must not
          need the main thread. Kit loops are CSS keyframes that animate one{" "}
          <Code>transform</Code>, and they run on the compositor.
        </p>
        <CodeBlock code={loopUsage} filename="spinner.tsx" />
        <p>A loop that needs Motion follows these rules:</p>
        <List>
          <li>
            Animate one <Code>transform</Code> string, not <Code>x</Code>,{" "}
            <Code>y</Code>, <Code>rotate</Code>, or <Code>scale</Code>.
          </li>
          <li>
            Give the first keyframe, such as <Code>rotate(0deg)</Code>. Without
            it, the animation starts from a matrix and the spin does not turn.
          </li>
          <li>
            Animate an HTML element or the root <Code>{"<svg>"}</Code>, not an
            SVG child.
          </li>
        </List>
      </GuideSection>

      <GuideSection id="reduced-motion" title="Reduced motion">
        <p>
          Each component reads the <Code>prefers-reduced-motion</Code> setting.
          With reduced motion:
        </p>
        <List>
          <li>
            CSS travel stops. Components put <Code>motion-safe:</Code> on
            translate, scale, and rotate, or <Code>motion-reduce:</Code> on the
            transition. Short fades and color changes stay.
          </li>
          <li>
            Motion animations jump to the end.{" "}
            <Code>transitionFor(reduceMotion, transition)</Code> gives a
            duration of 0 when <Code>useReducedMotion()</Code> is true.
          </li>
          <li>
            Loops stop on a still frame. Skeleton shows no shimmer. Marquee does
            not scroll.
          </li>
          <li>Entrance reveals show the content immediately.</li>
        </List>
        <p>
          The right column below shows the reduced result. The dot jumps,
          because <Code>transitionFor</Code> gets <Code>true</Code>. The panel
          fades, but it does not move.
        </p>
        <Demo file="motion-reduced-demo.tsx">
          <MotionReducedDemo />
        </Demo>
      </GuideSection>

      <GuideSection id="tuned-timings" title="Tuned timings">
        <p>
          Overlays and some components use their own timings. Each timing is
          tuned for one component. Keep these timings when you change the scale.
        </p>
        <TokenList tokens={tuned} />
        <p>
          To change the speed of all components, change the values in{" "}
          <Code>motion.ts</Code> and the duration classes in the component
          files.
        </p>
      </GuideSection>
    </GuidePage>
  );
}
