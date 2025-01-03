// AnimatedCounter types and interfaces

import { ValueAnimationTransition } from "framer-motion";
import { ComponentPropsWithoutRef, ElementType } from "react";

// Component Props
export type AnimatedCounterProps<T extends ElementType> =
  ComponentPropsWithoutRef<T> & {
    className?: string;
    from?: number;
    to: number;
    animationOptions?: ValueAnimationTransition<number>;
    formatOptions?: FormatOptions;
    as?: T;
  };

export interface FormatOptions {
  decimals?: number;
  style?: "decimal" | "percent" | "currency";
  notation?: "standard" | "compact";
  signDisplay?: "auto" | "never" | "always" | "exceptZero";
}
