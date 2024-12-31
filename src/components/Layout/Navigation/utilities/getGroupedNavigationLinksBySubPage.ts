import { SinglePageType } from '@/api/appNavigationQuery';

export type NestedPages = {
  subPage: string;
  pages: string[];
};

export type ResolvedLinksType = {
  nestedPages: NestedPages[];
  restPages: string[];
};

export const getGroupedNavigationLinksBySubPage = (links: SinglePageType[]) => {
  const groupedPagesBySubPage = links.reduce<ResolvedLinksType>(
    (accumulator, singlePage) => {
      const currentSubPage = singlePage.subpage;

      if (!currentSubPage) {
        return {
          nestedPages: [...accumulator.nestedPages],
          restPages: [...accumulator.restPages, singlePage.slug],
        };
      }

      const accumulatorsCurrentSubPage = accumulator.nestedPages.find(
        (currentNestedPages) => currentNestedPages.subPage === currentSubPage,
      );

      if (Boolean(accumulatorsCurrentSubPage)) {
        const accumulatorNestedPagesWithoutCurrentSubPage =
          accumulator.nestedPages.filter(
            (currentNestedPages) =>
              currentNestedPages.subPage !== currentSubPage,
          );

        return {
          nestedPages: [
            ...accumulatorNestedPagesWithoutCurrentSubPage,
            {
              subPage: currentSubPage,
              pages: [
                ...(accumulatorsCurrentSubPage?.pages ?? []),
                singlePage.slug,
              ],
            },
          ],
          restPages: [...accumulator.restPages],
        };
      }

      return {
        nestedPages: [
          ...accumulator.nestedPages,
          {
            subPage: currentSubPage,
            pages: [singlePage.slug],
          },
        ],
        restPages: [...accumulator.restPages],
      };
    },
    {
      nestedPages: [],
      restPages: [],
    },
  );

  return groupedPagesBySubPage;
};
