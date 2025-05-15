import { useCallback, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { SearchResultItem } from "../types/SearchResultsList";

interface UseKeypadControlProps {
  results: SearchResultItem[];
}

export default function useKeypadControls({ results }: UseKeypadControlProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const scrollElementIntoView = useCallback(({ elementIndex }: {elementIndex: number | null}) => {
    if(ref.current && elementIndex !== null) {
      const activeElement = ref.current.children[elementIndex];
      if(activeElement) {
        activeElement.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [activeIndex]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if(e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = (activeIndex ?? 0) <= 0 ? activeIndex : activeIndex! - 1;
      setActiveIndex(newIndex);
      scrollElementIntoView({ elementIndex: newIndex });
    }
    if(e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = (activeIndex ?? 0) >= results.length - 1 ? activeIndex : (activeIndex ?? -1) + 1;
      setActiveIndex(newIndex);
      scrollElementIntoView({ elementIndex: newIndex });
    }
    if(e.key === "Enter") {
      e.preventDefault();
      if(activeIndex !== null) {
        const selectedResult = results[activeIndex];
        window.open(selectedResult.url, "_blank");
      }
    }
  }, [activeIndex, results]);

  useEventListener("keydown", onKeyDown);

  return [ref, activeIndex] as const;
}
