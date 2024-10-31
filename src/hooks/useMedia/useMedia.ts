import React from 'react';

import { ValueOf } from '@/types';

import { ALLOWED_BREAKPOINTS } from './useMedia.constants';

// use only in client component !
const useMedia = (query: ValueOf<typeof ALLOWED_BREAKPOINTS>): boolean => {
  const [isMatch, setIsMatch] = React.useState<boolean>(
    window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    const matchQuery = window.matchMedia(query);

    return () =>
      matchQuery.addEventListener('change', () =>
        setIsMatch(matchQuery.matches),
      );
  }, [query]);

  return isMatch;
};

export { useMedia };
