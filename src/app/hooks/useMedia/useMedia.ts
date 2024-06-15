import { ValueOf } from "@/types";
import { AVILABLE_BREAKPOINTS } from "./useMedia.constants";
import React from "react";

// use only in client component !
const useMedia = (query: ValueOf<typeof AVILABLE_BREAKPOINTS>): boolean => {
  const [isMatch, setIsMatch] = React.useState<boolean>(
    window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const matchQuery = window.matchMedia(query);

    return () =>
      matchQuery.addEventListener("change", () =>
        setIsMatch(matchQuery.matches)
      );
  }, [query]);

  return isMatch;
};

export { useMedia };
