import { defaultError } from '@/api/appNavigationQuery';
import { generateAssetsQuery } from '@/utilities/generateQuery';

import type { AssetDataType, GalleryAssetsDataType } from '../Gallery.types';

export const getGalleryAssetsApi = async ({
  assetIds,
}: {
  assetIds: string[];
}) => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: GalleryAssetsDataType[] | null = null;
  let returnedError: string | Error | null = null;

  try {
    const assetsResponse = await fetch(generateAssetsQuery(assetIds), {
      cache: 'force-cache',
    });

    if (!assetsResponse.ok) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    const assetsData: AssetDataType = await assetsResponse.json();

    const assets = assetsData.items.map(({ fields }) => fields);

    data = assets;
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
