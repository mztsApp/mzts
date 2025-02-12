import React from 'react';

import type { ValueOf } from '@/types';

import { ALLOWED_BREAKPOINTS } from './useMedia.constants';

const useMedia = (
  query: ValueOf<typeof ALLOWED_BREAKPOINTS>,
  initialLGMatchValue?: boolean,
): boolean => {
  const [isMatch, setIsMatch] = React.useState<boolean>(
    query === ALLOWED_BREAKPOINTS.MIN_LG
      ? !Boolean(initialLGMatchValue)
      : false,
  );

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const matchQuery = window.matchMedia(query);
    const updateMatch = () => setIsMatch(matchQuery.matches);

    updateMatch();
    matchQuery.addEventListener('change', updateMatch);

    return () => {
      matchQuery.removeEventListener('change', updateMatch);
    };
  }, [query]);

  return isMatch;
};

export { useMedia };
