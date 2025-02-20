import { defaultError } from '@/api/appNavigationQuery';
import { generateEntryQuery } from '@/utilities/generateQuery';

import type {
  LinkAdditionalContentData,
  linksResponseDataType,
} from '../AdditionalContent.types';

export async function getLinksAdditionalContent(hashes: string[]) {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: LinkAdditionalContentData | null = null;
  let returnedError: string | Error | null = null;

  try {
    const response = await fetch(generateEntryQuery(hashes), {
      cache: 'force-cache',
    });

    if (!response.ok) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    const linksData: linksResponseDataType = await response.json();
    const resolvedData: LinkAdditionalContentData = {
      items: linksData.items.map((item) => item.fields),
    };

    data = resolvedData;
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
}
