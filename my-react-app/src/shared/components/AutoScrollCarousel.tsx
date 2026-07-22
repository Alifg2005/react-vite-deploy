import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface AutoScrollCarouselProps<T> {
  items: T[];
  keyFn: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  secondsPerItem?: number;
  gapClassName?: string;
  itemClassName?: string;
  mode?: "loop" | "pingpong";
}

// Auto-scrolling row.
// - loop (default, e.g. "suggested for you"): the item list is rendered
//   twice back to back and the track animates exactly one copy's width to
//   the left, so the loop point is invisible — a continuous one-way scroll
//   through every item.
// - pingpong (e.g. filter pills): items are rendered once (no repeats) and
//   the track slides left to its end, then back to the start, measured from
//   the actual overflow so nothing is cut off or duplicated.
// Hovering always pauses it.
export default function AutoScrollCarousel<T>({
  items,
  keyFn,
  renderItem,
  secondsPerItem = 4,
  gapClassName = "gap-4",
  itemClassName = "w-64 shrink-0",
  mode = "loop",
}: AutoScrollCarouselProps<T>) {
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pingpongDistance, setPingpongDistance] = useState(0);

  const isPingpong = mode === "pingpong";

  useEffect(() => {
    if (!isPingpong) return undefined;

    function measure() {
      if (!containerRef.current || !trackRef.current) return;
      const overflow = trackRef.current.scrollWidth - containerRef.current.clientWidth;
      setPingpongDistance(Math.max(overflow, 0));
    }

    measure();
    if (!containerRef.current || !trackRef.current) return undefined;

    const observer = new ResizeObserver(measure);
    observer.observe(containerRef.current);
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [isPingpong, items]);

  if (items.length === 0) return null;

  const duration = items.length * secondsPerItem;
  const renderItems = isPingpong ? items : [...items, ...items];

  const trackStyle: CSSProperties = isPingpong
    ? {
        animation: `auto-scroll-pingpong ${duration}s ease-in-out infinite`,
        animationPlayState: paused ? "paused" : "running",
        ["--auto-scroll-distance" as string]: `${pingpongDistance}px`,
      }
    : {
        animation: `auto-scroll-track ${duration}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className={`flex w-max ${gapClassName}`} style={trackStyle}>
        {renderItems.map((item, index) => (
          <div key={isPingpong ? keyFn(item) : `${keyFn(item)}-${index}`} className={itemClassName}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
