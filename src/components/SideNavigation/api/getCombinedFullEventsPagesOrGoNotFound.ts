import { notFound } from 'next/navigation';

import { appNavigationQuery } from '@/api/appNavigationQuery';
import { NAVIGATION_EVENTS_PAGE } from '@/components/Navigation/Navigation.constants';

import { getEventsPageData } from './getEventsPageData';
import type { SideNavigationDialogProps } from '../SideNavigationContent/SideNavigationDialog';

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
    // return notFound();
  }

  const joinedPageDataWithRelatedSlug = pagesData.map((page) => {
    const { slug, ...restPageProps } = page;

    const replacedSlug = data.find((slugItem) => {
      return slugItem.id === slug.sys.id;
    });

    return { slug: replacedSlug, ...restPageProps };
  }) as SideNavigationDialogProps['pages'];

  const currentPageData = joinedPageDataWithRelatedSlug.find(
    (page) => page.slug.slug === slug,
  );

  return {
    combinedEventPagesData: joinedPageDataWithRelatedSlug,
    currentPage: currentPageData ?? null,
  };
};
