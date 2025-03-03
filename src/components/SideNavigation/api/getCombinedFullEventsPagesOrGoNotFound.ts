import { notFound } from 'next/navigation';

import { appNavigationQuery } from '@/api/appNavigationQuery';
import { NAVIGATION_EVENTS_PAGE } from '@/components/Navigation/Navigation.constants';

import { getEventsPageData } from './getEventsPageData';
import type { SideNavigationTabsProps } from '../SideNavigationContent/SideNavigationTabs';

export const getCombinedFullEventsPagesOrGoNotFound = async (slug?: string) => {
  const { data } = await appNavigationQuery();
  const eventsPages = data?.filter(
    (subpage) => subpage.subpage === NAVIGATION_EVENTS_PAGE,
  );

  if (
    !eventsPages ||
    !eventsPages.length ||
    !data?.some((link) => link.slug === slug || !slug)
  ) {
    return notFound();
  }

  const { data: pagesData } = await getEventsPageData(
    eventsPages.map((eventsPage) => eventsPage.id),
  );

  if (!pagesData.length) {
    return notFound();
  }

  const joinedPageDataWithRelatedSlug = pagesData.map((page) => {
    const { slug, ...restPageProps } = page;

    const replacedSlug = eventsPages.find(
      (slugItem) => (slugItem.id = slug.sys.id),
    );

    return { slug: replacedSlug, ...restPageProps };
  }) as SideNavigationTabsProps['pages'];

  return { combinedEventPagesData: joinedPageDataWithRelatedSlug };
};
