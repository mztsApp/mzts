import { defaultError } from '@/app/api/appNavigationQuery';
import type {
  PageAssetFieldsApiResponse,
  PageDataApiResponseFieldsType,
  PageDataType,
} from '@/types/pageApiTypes';
import {
  generateAssetQuery,
  generateEntryQuery,
} from '@/utilities/generateQuery';
import {
  getResolvedPageData,
  getResolvedPageDataWithoutImageFromApi,
  getResolvePageBGImageFromApi,
} from '@/utilities/getResolvedPageDataFromApi';

const homePageId = '3t7Iub6Arm23Cn7wWkIJTd';

export const getHomePageDataQuery = async () => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: PageDataType | null = null;
  let returnedError: string | Error | null = null;

  try {
    const pageResponse = await fetch(generateEntryQuery(homePageId, 10), {
      cache: 'force-cache',
    });

    if (!pageResponse.ok) {
      returnedError = defaultError;
      isError = true;

      throw new Error(defaultError);
    }

    const pageData = await pageResponse.json();
    const pageFields: PageDataApiResponseFieldsType = pageData.fields;
    const dataWithoutImage = getResolvedPageDataWithoutImageFromApi(pageFields);

    const bgImageFetch = await fetch(
      generateAssetQuery(dataWithoutImage.bgImageAssetId),
      {
        cache: 'force-cache',
      },
    );

    if (!bgImageFetch.ok) {
      returnedError = defaultError;
      isError = true;

      throw new Error(defaultError);
    }

    const bgImageData = await bgImageFetch.json();
    const fields: PageAssetFieldsApiResponse = bgImageData.fields;

    data = getResolvedPageData(
      dataWithoutImage,
      getResolvePageBGImageFromApi(fields),
    );
  } catch (error) {
    if (error instanceof Error) {
      isError = true;
      returnedError = error.message;

      throw new Error(error.name);
    }
  } finally {
    isPending = false;
  }

  return {
    isPending,
    isError,
    data,
    error: returnedError,
  };
};
