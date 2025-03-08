import { appNavigationQuery } from '@/api/appNavigationQuery';
import { NAVIGATION_EVENTS_PAGE } from '@/components/Navigation/Navigation.constants';

import type { SideNavigationDialogProps } from '../SideNavigationDialog/SideNavigationDialog';
import { getEventsPageData } from './getEventsPageData';

export const getCombinedFullEventsPages = async (slug?: string) => {
  const { data } = await appNavigationQuery();
  const eventsPages = data?.filter(
    (subpage) => subpage.subpage === NAVIGATION_EVENTS_PAGE,
  );

  if (
    !eventsPages ||
    !eventsPages.length ||
    !data?.some((link) => link.slug === slug || !slug)
  ) {
    return {
      combinedEventPagesData: [],
      currentPage: null,
    };
  }

  const { data: pagesData } = await getEventsPageData(
    eventsPages.map((eventsPage) => eventsPage.id),
  );

  if (!pagesData.length) {
    return {
      combinedEventPagesData: [],
      currentPage: null,
    };
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
