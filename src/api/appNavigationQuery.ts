import { generateEntryQuery } from '@/utilities/generateQuery';

type PageItemType = {
  sys: {
    id: string;
  };
};

type NestedRelatedPageFields = {
  isHomePage: boolean;
  subpage?: string | null;
  slug: string;
};

type NestedRelatedPagesItem = {
  fields: NestedRelatedPageFields;
  sys: {
    id: string;
  };
};

export type SinglePageType = {
  id: string;
} & NestedRelatedPageFields;

export const defaultError = 'Coś poszło nie tak, spróbuj przeładować stronę';

export async function appNavigationQuery() {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: SinglePageType[] | null = null;
  let returnedError: string | Error | null = null;

  try {
    const appNavigationResponse = await fetch(
      generateEntryQuery(`2HBQWicP4SZowD62bNuYE`),
      {
        cache: 'force-cache',
      },
    );

    if (!appNavigationResponse.ok) {
      data = null;
      isError = true;
      returnedError = defaultError;

      throw new Error(defaultError);
    }

    const appNavigation = await appNavigationResponse.json();

    const navigationFlattedPagesItems: PageItemType[] =
      appNavigation.fields.links;

    const resolvedPageItemIds = navigationFlattedPagesItems.map(
      (linkItem) => linkItem.sys.id,
    );

    const nestedRelatedPagesEntryResponse = await fetch(
      generateEntryQuery(resolvedPageItemIds, 10),
      { cache: 'force-cache' },
    );

    if (!nestedRelatedPagesEntryResponse.ok) {
      data = null;
      isError = true;
      returnedError = defaultError;

      throw new Error(defaultError);
    }

    const nestedRelatedPagesEntryData =
      await nestedRelatedPagesEntryResponse.json();

    const nestedRelatedPagesEntryItems: NestedRelatedPagesItem[] =
      nestedRelatedPagesEntryData.items;

    const resolvedData: SinglePageType[] = nestedRelatedPagesEntryItems.map(
      (singleLink) => ({ ...singleLink.fields, id: singleLink.sys.id }),
    );

    data = resolvedData;
  } catch (error) {
    returnedError = error instanceof Error ? error : null;
    isError = true;
  } finally {
    isPending = false;
  }

  return {
    data,
    isError: isError,
    isPending: isPending,
    error: returnedError,
  };
}
