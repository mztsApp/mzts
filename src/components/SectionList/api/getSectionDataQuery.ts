import { defaultError } from '@/api/appNavigationQuery';
import {
  generateAssetsQuery,
  generateEntryQuery,
} from '@/utilities/generateQuery';
import { getResolvePageBGImageFromApi } from '@/utilities/getResolvedPageDataFromApi';

import type {
  SectionBGImageSectionList,
  SectionListData,
} from '../SectionList.types';
import { getResolvedSectionListItemsFromApi } from '../SectionList.utilities';
import { SECTION_COMPONENT_IDENTIFIER } from '../SectionList.constants';

export const getSectionDataQuery = async (apiIds: string[]) => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: SectionListData | null = null;
  let returnedError: string | null = null;

  try {
    const sectionsResponse = await fetch(generateEntryQuery(apiIds, 10), {
      cache: 'force-cache',
    });

    if (!sectionsResponse.ok) {
      returnedError = defaultError;
      isError = true;

      throw new Error(defaultError);
    }

    const sectionsData = await sectionsResponse.json();
    const items = getResolvedSectionListItemsFromApi(sectionsData.items);

    const assetIds = items
      .map((item) => {
        const resolvedItem = item ?? {};

        return 'bgImageId' in resolvedItem ? resolvedItem.bgImageId : undefined;
      })
      .filter(Boolean) as string[];

    const bgImagesFetch = await fetch(generateAssetsQuery(assetIds), {
      cache: 'force-cache',
    });

    if (!bgImagesFetch.ok) {
      returnedError = defaultError;
      isError = true;

      throw new Error(defaultError);
    }

    const bgImagesData: SectionBGImageSectionList = await bgImagesFetch.json();
    const resolvedBGImages = bgImagesData.items.map((item) =>
      getResolvePageBGImageFromApi(item.fields),
    );

    let filteredSectionIndex: number = 0;

    const resolvedData: SectionListData = items
      .map((item) => {
        if (item.identifier !== SECTION_COMPONENT_IDENTIFIER.SECTION) {
          return item;
        }

        const resolvedIndex = filteredSectionIndex;
        filteredSectionIndex++;

        return { ...item, image: resolvedBGImages[resolvedIndex] };
      })
      .sort((previous, next) => {
        const previousIndex = apiIds.indexOf(previous.sectionId);
        const nextIndex = apiIds.indexOf(next.sectionId);

        return previousIndex - nextIndex;
      });

    data = resolvedData;
  } catch (error) {
    if (error instanceof Error) {
      isError = true;
      returnedError = error.message;

      throw new Error(error.name);
    }
  } finally {
    isPending = false;
  }

  return { isError, isPending, data, returnedError };
};
