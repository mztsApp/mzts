import { SinglePageType } from '@/app/api/appNavigationQuery';

import { getGroupedPagesBySubPage } from './getGroupedPagesBySubPage';

export const getFlattenedLinks = (data: SinglePageType[]) => {
  const groupedLinks = getGroupedPagesBySubPage(data);
  const nestedPagesList = groupedLinks.nestedPages.flatMap((nestedPage) =>
    nestedPage.pages.map((page) => ({
      page: page,
      subPage: nestedPage.subPage,
    })),
  );

  return { pages: groupedLinks.restPages, subPages: nestedPagesList };
};
