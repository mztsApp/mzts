import type { SectionListItemFromApiResponse } from './SectionList.types';

export const getResolvedSectionListItemsFromApi = (
  items: SectionListItemFromApiResponse,
) =>
  items.map((item) => {
    const { sys, fields } = item;
    const { image, content, ...rest } = fields;

    return {
      ...rest,
      sectionId: sys.id,
      bgImageId: image.sys.id,
      additionalContentId: content?.sys?.id,
    };
  });

export type ResolvedSectionListDataFromApiType = ReturnType<
  typeof getResolvedSectionListItemsFromApi
>;
