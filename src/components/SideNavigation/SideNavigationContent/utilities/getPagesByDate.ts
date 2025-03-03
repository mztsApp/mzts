import type { SideNavigationTabsProps } from '../SideNavigationTabs';

type Pages = SideNavigationTabsProps['pages'];

export type PagesByDateType = Record<'past' | 'upcoming', Pages>;

const today = new Date();

export const getPagesByDate = (pages: Pages) => {
  const sortedPagesByDate = pages.sort((previous, next) => {
    const previousPageTime = new Date(previous.date).getTime();
    const nextPageTime = new Date(next.date).getTime();

    return previousPageTime - nextPageTime;
  });

  return sortedPagesByDate.reduce<PagesByDateType>(
    (accumulator, page) => {
      const eventDate = new Date(page.date);

      if (eventDate.getTime() >= today.getTime()) {
        return {
          past: accumulator.past,
          upcoming: [...accumulator.upcoming, page],
        };
      }

      return {
        past: [...accumulator.past, page],
        upcoming: accumulator.upcoming,
      };
    },
    { past: [], upcoming: [] },
  );
};
