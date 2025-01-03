import { useEffect, useRef } from "react";

interface KeyPressEventOptions {
  // The event type to listen to
  eventType?: "keydown" | "keyup";
  // The element that will listen to the event
  root?: HTMLElement | Document;
  // Stop event propagation
  stopEventPropagation?: boolean;
  // Allow browser to handle the event
  preventDefault?: boolean;
  // If it should listen to key presses
  enabled?: boolean;
  // Time it waits between key presses before it reset the pressed keys
  timeout?: number;
}

interface KeyCombination {
  // The key combination for non-Apple systems
  standard: string;
  // The key combination for Apple systems
  mac: string;
}

const useKeyPress = (
  keyCombination: string | KeyCombination,
  onKeyPress: () => void,
  options?: KeyPressEventOptions
) => {
  const pressedKeys = useRef<string[]>([]);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const eventType = options?.eventType ?? "keydown";

    function handleKeyEvent(event: KeyboardEvent) {
      if (options?.stopEventPropagation) {
        event.stopPropagation();
      }

      const key = event.key.toLowerCase();
      const prevKeys = pressedKeys.current;
      if (eventType === "keydown" && !prevKeys.includes(key)) {
        pressedKeys.current = [...prevKeys, key];
      } else if (eventType === "keyup" && prevKeys.includes(key)) {
        pressedKeys.current = prevKeys.filter(k => k !== key);
      }

      clearTimeout(timeoutIdRef.current);

      timeoutIdRef.current = setTimeout(
        () => (pressedKeys.current = []),
        options?.timeout || 1000
      );

      checkKeyCombination(event);
    }

    function checkKeyCombination(event: KeyboardEvent) {
      const normalizedKeyCombination =
        typeof keyCombination === "string"
          ? { standard: keyCombination, mac: keyCombination }
          : keyCombination;

      const { standard, mac } = normalizedKeyCombination;

      const isAppleSystemWithKeyboard = /Mac|iPhone|iPod|iPad/.test(
        navigator.platform
      );

      const combinationKeys = (isAppleSystemWithKeyboard ? mac : standard)
        .toLowerCase()
        .split("+");

      if (!combinationKeys.includes(event.key.toLowerCase())) {
        pressedKeys.current = [];
        return;
      }

      if (combinationKeys.every(key => pressedKeys.current.includes(key))) {
        if (options?.preventDefault) event.preventDefault();
        onKeyPress();
        pressedKeys.current = [];
      }
    }

    const rootElement = options?.root || document;
    const enabled = options?.enabled ?? true;

    if (enabled) {
      rootElement.addEventListener(eventType, handleKeyEvent as any);
    }

    return () => {
      rootElement.removeEventListener(eventType, handleKeyEvent as any);
      clearTimeout(timeoutIdRef.current);
    };
  }, [
    keyCombination,
    onKeyPress,
    options?.eventType,
    options?.root,
    options?.stopEventPropagation,
    options?.preventDefault,
    options?.enabled,
    options?.timeout
  ]);

  return pressedKeys.current;
};

export default useKeyPress;
