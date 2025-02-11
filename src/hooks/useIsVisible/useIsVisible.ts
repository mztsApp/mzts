import type React from 'react';
import { useEffect, useState } from 'react';

type UseIsVisibleOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

export const useIsVisible = (
  ref: React.RefObject<HTMLElement>,
  options: UseIsVisibleOptions = {},
) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return; // Obsługa przypadku, gdy ref jest `null`

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options,
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};
