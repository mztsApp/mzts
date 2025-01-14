import { defaultError } from '@/api/appNavigationQuery';
import {
  PageAssetFieldsApiResponse,
  PageDataApiResponseFieldsType,
  PageDataType,
} from '@/types/pageApiTypes';
import {
  generateAssetQuery,
  generateEntryRelatedWithEntryIdQuery,
} from '@/utilities/generateQuery';
import {
  getResolvedPageData,
  getResolvedPageDataWithoutImageFromApi,
  getResolvePageBGImageFromApi,
} from '@/utilities/getResolvedPageDataFromApi';

type PageDataQueryType = {
  pageId: string;
};

type ItemsFromRelatedEntryType = {
  sys: {
    id: string;
  };
  fields: PageDataApiResponseFieldsType;
};

export const getPageDataQuery = async ({ pageId }: PageDataQueryType) => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let returnedError: string | Error | null = null;
  let data: PageDataType | null = null;

  try {
    const pageResponse = await fetch(
      generateEntryRelatedWithEntryIdQuery(pageId),
      {
        cache: 'force-cache',
      },
    );

    if (!pageResponse.ok) {
      returnedError = defaultError;
      isError = true;
      data = null;
    }

    const pageData = await pageResponse.json();
    const pageItems: ItemsFromRelatedEntryType[] = pageData.items;
    const resolvedPageItem = pageItems.find(
      (item) => item.sys.id !== '2HBQWicP4SZowD62bNuYE',
    );
    const pageFields = resolvedPageItem?.fields;

    if (!pageFields) {
      returnedError = defaultError;
      isError = true;
      data = null;

      return {
        isPending,
        isError,
        data,
        error: returnedError,
      };
    }

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
      data = null;
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
