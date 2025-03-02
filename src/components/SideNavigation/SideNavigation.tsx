import { notFound } from 'next/navigation';

import { appNavigationQuery } from '@/api/appNavigationQuery';

import { NAVIGATION_EVENTS_PAGE } from '../Navigation/Navigation.constants';
import { getEventsPageData } from './api/getEventsPageData';

type SideNavigationProps = {
  slug?: string;
};

export const SideNavigation = async ({ slug }: SideNavigationProps) => {
  const { data } = await appNavigationQuery();
  const eventsPages = data?.filter(
    (subpage) => subpage.subpage === NAVIGATION_EVENTS_PAGE,
  );

  if (!eventsPages || !eventsPages.length) {
    return notFound();
  }

  const { data: pagesData } = await getEventsPageData(
    eventsPages.map((eventsPage) => eventsPage.id),
  );

  if (!pagesData.length) {
    return notFound();
  }

  return null;
};
