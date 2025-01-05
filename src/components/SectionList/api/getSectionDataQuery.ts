import { defaultError } from '@/app/api/appNavigationQuery';
import {
  generateAssetsQuery,
  generateEntryQuery,
} from '@/utilities/generateQuery';
import { getResolvePageBGImageFromApi } from '@/utilities/getResolvedPageDataFromApi';

import {
  SectionBGImageSectionList,
  SectionListData,
} from '../SectionList.types';
import { getResolvedSectionListItemsFromApi } from '../SectionList.utilities';

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

    const bgImagesFetch = await fetch(
      generateAssetsQuery(items.map((item) => item.bgImageId)),
      {
        cache: 'force-cache',
      },
    );

    if (!bgImagesFetch.ok) {
      returnedError = defaultError;
      isError = true;

      throw new Error(defaultError);
    }

    const bgImagesData: SectionBGImageSectionList = await bgImagesFetch.json();
    const resolvedBGImages = bgImagesData.items.map((item) =>
      getResolvePageBGImageFromApi(item.fields),
    );

    const resolvedData: SectionListData = items.map((item, index) => {
      return { ...item, image: resolvedBGImages[index] };
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
