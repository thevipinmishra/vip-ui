"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import { Button, type ButtonProps } from "react-aria-components";

export function PressButton({ isDisabled, ...props }: ButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Button
      data-slot="press-button"
      {...props}
      isDisabled={isDisabled}
      render={
        props.render ??
        ((domProps) => (
          <motion.button
            {...(domProps as HTMLMotionProps<"button">)}
            whileTap={reduceMotion || isDisabled ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 36 }}
          />
        ))
      }
    />
  );
}
