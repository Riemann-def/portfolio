'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Triggers `active = true` when the element scrolls into view.
 *
 * Falls back to `active = true` after `fallbackMs` if the IntersectionObserver
 * never fires any callback. Covers broken in-app browsers (e.g. LinkedIn's
 * mobile WebView) where IntersectionObserver is silent and `whileInView`
 * animations would otherwise stay in their initial state forever.
 */
export default function useRevealInView<T extends HTMLElement>(options?: {
  margin?: string;
  fallbackMs?: number;
}) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);
  const margin = options?.margin ?? '-50px';
  const fallbackMs = options?.fallbackMs ?? 600;

  useEffect(() => {
    if (active || !ref.current) return;

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    let observerFiredAny = false;
    let done = false;

    const obs = new IntersectionObserver(
      (entries) => {
        observerFiredAny = true;
        if (entries[0]?.isIntersecting && !done) {
          done = true;
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: margin }
    );
    obs.observe(ref.current);

    const timer = setTimeout(() => {
      if (!observerFiredAny && !done) {
        done = true;
        setActive(true);
        obs.disconnect();
      }
    }, fallbackMs);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, [active, margin, fallbackMs]);

  return [ref, active] as const;
}
