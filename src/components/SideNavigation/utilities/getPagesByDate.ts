import type { SideNavigationDialogProps } from '../SideNavigationDialog/SideNavigationDialog';

type Pages = SideNavigationDialogProps['pages'];

export type PagesByDateType = Record<'past' | 'upcoming', Pages>;

const today = new Date();

export const getPagesByDate = (pages: Pages) => {
  const sortedPagesByDate = pages.sort((previous, next) => {
    const previousPageTime = new Date(previous.date).getTime();
    const nextPageTime = new Date(next.date).getTime();
    return previousPageTime - nextPageTime;
  });

  const sortedUpcomingPages = (quantity: number) => {
    const upcomingPages = sortedPagesByDate.filter(
      (page) => new Date(page.date).getTime() >= today.getTime(),
    );
    return upcomingPages.slice(0, quantity);
  };

  const { past, upcoming } = sortedPagesByDate.reduce<PagesByDateType>(
    (accumulator, page) => {
      const eventDate = new Date(page.date);
      if (eventDate.getTime() >= today.getTime()) {
        accumulator.upcoming.push(page);
      } else {
        accumulator.past.push(page);
      }
      return accumulator;
    },
    { past: [], upcoming: [] },
  );

  return {
    past,
    upcoming,
    sortedUpcomingPage: sortedUpcomingPages,
    sortedPagesByDate,
  };
};
