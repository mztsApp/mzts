import { appNavigationQuery } from '@/api/appNavigationQuery';

import { getPageDataQuery } from './getPageDataQuery';

export const getPageParamsQuery = async (slug: string) => {
  let data: Record<'metaTitle' | 'metaDescription', string | null | undefined> =
    {
      metaDescription: null,
      metaTitle: null,
    };
  let isPending: boolean = true;
  let isError: boolean = false;
  let returnedError: string | Error | null = null;

  try {
    const { data: navigationData } = await appNavigationQuery();

    if (!navigationData) return null;

    const resolvedEntryId = navigationData.find(
      (page) => page.slug === slug,
    )?.id;

    if (!resolvedEntryId) return null;

    const { data: pageData } = await getPageDataQuery({
      pageId: resolvedEntryId,
    });

    if (!pageData) return null;

    data = {
      metaTitle: pageData.metaTitle,
      metaDescription: pageData.metaDescription,
    };
  } catch (error) {
    if (error instanceof Error) {
      isError = true;
      returnedError = error.message;
    }
  } finally {
    isPending = false;
  }

  return {
    data,
    isPending,
    isError,
    returnedError,
  };
};
