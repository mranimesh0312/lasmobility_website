"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver visibility. `once` keeps it true after first entry,
 * which is how heavy children (WebGL, maps) are lazily mounted.
 */
export function useInView<T extends Element>(options: { rootMargin?: string; once?: boolean } = {}) {
  const { rootMargin = "200px", once = false } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);

  return { ref, inView };
}
