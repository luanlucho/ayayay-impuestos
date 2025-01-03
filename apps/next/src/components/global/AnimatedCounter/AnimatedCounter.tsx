"use client";
import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import invariant from "invariant";
import React, { ComponentPropsWithoutRef, createRef } from "react";
import { ElementType, useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { AnimatedCounterProps as Props } from "./AnimatedCounter.types";
import { formatNumber } from "utils/common.utils";

const AnimatedCounter = <T extends ElementType>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const { className, animationOptions, formatOptions, ...rest1 } = props;
  const { from: rawFrom, to, as, ...rest } = rest1;
  const from = rawFrom ?? (0 as number);
  const { decimals, style, notation, signDisplay } = formatOptions ?? {};
  const code = "USD";
  const round = typeof decimals === "number";
  const formatter = useMemo(() => {
    return { style, currency: code, notation, signDisplay };
  }, [style, code, notation, signDisplay]);
  const finalParts = useMemo(() => {
    const value = round ? to.toFixed(decimals) : to;
    return formatNumber(+value, formatter, decimals).toParts();
  }, [to, formatter, decimals, round]);
  const initialParts = useMemo(() => {
    const value = round ? from.toFixed(decimals) : from;
    return formatNumber(+value, formatter, decimals).toParts();
  }, [from, formatter, decimals, round]);
  // Create refs for each part of the final number 1.00,00%, $10.43
  const refs = useRef(finalParts.map(() => createRef<HTMLSpanElement>()));
  const firstRef = refs.current[0];
  invariant(firstRef, "No number parts found");
  const inView = useInView(firstRef, { once: true });
  const Component: ElementType = as ?? "span";

  useIsomorphicLayoutEffect(() => {
    const elements = refs.current;
    if (!elements.length) return;
    if (!inView) return;
    // Skip animation if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finalParts.forEach((part, index) => {
        const element = elements[index]?.current;
        invariant(element, "No element found 1");
        element.textContent = part.value;
      });
      return;
    }

    // Set initial values
    finalParts.forEach((finalPart, index) => {
      const element = elements[index]?.current;
      if (!element) return;
      const value = initialParts[index]?.value ?? "";
      if (!value) element.style.opacity = "0";
      element.textContent = value || finalPart.value;
    });

    const controls = animate(from, to, {
      duration: 0.5,
      ease: "easeOut",
      ...animationOptions,
      onUpdate(rawValue) {
        const value = round ? rawValue.toFixed(decimals) : rawValue;
        const res = formatNumber(+value, formatter, decimals);
        const parts = res.toParts();
        // Update elements
        parts.forEach((part, index) => {
          const element = elements[index]?.current;
          if (!element) return;
          // TODO: ver si no estoy haciendo algo mal
          invariant(element, "No element found 3");
          element.textContent = part.value;
          element.style.opacity = "1";
        });
      }
    });

    // Cleanup
    return () => controls.stop();
  }, [refs, finalParts, inView, from, to, formatter, animationOptions]);

  return (
    <Component
      {...rest}
      className={twMerge(
        "AnimatedCounter flex items-center tabular-nums",
        className
      )}
    >
      {finalParts.map((finalPart, index) => {
        const ref = refs.current[index];
        const length = finalPart.value.length ?? 0;
        const numberTypes = ["fraction", "integer"];
        const isNumberPart = numberTypes.includes(finalPart.type);
        // Add a span for each part and respect final width
        return (
          <Component
            key={index}
            ref={ref}
            // Avoid non-number parts to use too much space
            style={isNumberPart ? { width: length + "ch" } : {}}
            className="overflow-hidden"
          >
            <Component className="opacity-0">{finalPart.value}</Component>
          </Component>
        );
      })}
    </Component>
  );
};

export default AnimatedCounter;
