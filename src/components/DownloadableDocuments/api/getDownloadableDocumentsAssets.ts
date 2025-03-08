import { defaultError } from '@/api/appNavigationQuery';
import type { FileType } from '@/components/Footer/api/getDocumentsQuery';
import { generateAssetsQuery } from '@/utilities/generateQuery';

type AssetsItemType = {
  items: {
    sys: {
      id: string;
    };
    fields: {
      title: string;
      description?: string;
      file: FileType;
    };
  }[];
};

export type DownloadableDocumentsDataType =
  AssetsItemType['items'][number]['fields'];

export const getDownloadableDocumentsAssets = async (assetsIds: string[]) => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: DownloadableDocumentsDataType[] | null = null;
  let returnedError: string | Error | null = null;

  try {
    const response = await fetch(generateAssetsQuery(assetsIds), {
      cache: 'force-cache',
    });

    if (!response.ok) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    const assetsData: AssetsItemType = await response.json();

    data = assetsData.items.map((item) => item.fields);
  } catch (error) {
    if (error instanceof Error) {
      isError = true;
      data = null;
      returnedError = error;
    }
  } finally {
    isPending = false;
  }

  return {
    data,
    isError,
    error: returnedError,
    isPending,
  };
};
