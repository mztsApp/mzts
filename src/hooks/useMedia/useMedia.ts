import React from 'react';

import { ValueOf } from '@/types';

import { ALLOWED_BREAKPOINTS } from './useMedia.constants';

const useMedia = (query: ValueOf<typeof ALLOWED_BREAKPOINTS>): boolean => {
  const [isMatch, setIsMatch] = React.useState<boolean>(false);

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
