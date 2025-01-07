import React from 'react';

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (!window) return;

    const updateScrollYPosition = () => setScrollY(window.scrollY);

    updateScrollYPosition();

    window.addEventListener('scroll', updateScrollYPosition);

    return () => {
      window.removeEventListener('scroll', updateScrollYPosition);
    };
  }, []);

  const scrollTo = (
    target: 'top' | 'bottom' | React.RefObject<HTMLElement>,
    offsetY: number = 0,
  ) => {
    if (!window || !document) return;

    let scrollTarget: number;

    if (target === 'top') {
      scrollTarget = 0;
    } else if (target === 'bottom') {
      scrollTarget = document.documentElement.scrollHeight - window.innerHeight;
    } else if (target && target.current) {
      scrollTarget = target.current.offsetTop + offsetY;
    } else {
      return;
    }

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

  const toggleScrolling = (shouldTurnOnScrolling: boolean = false) => {
    if (!document || !window) return;

    if (shouldTurnOnScrolling) {
      setTimeout(() => {
        document.body.classList.add('scroll-disabled');
      }, 300);
    } else {
      document.body.classList.remove('scroll-disabled');
    }
  };

  return { isTopPosition: scrollY === 0, scrollY, scrollTo, toggleScrolling };
};
