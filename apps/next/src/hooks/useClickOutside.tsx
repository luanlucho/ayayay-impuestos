import { useRef, useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(
  enabled: boolean,
  onClickOutside: () => void
): React.RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      onClickOutside();
    };

    if (enabled) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [enabled, onClickOutside]);

  return ref;
};

export default useClickOutside;
