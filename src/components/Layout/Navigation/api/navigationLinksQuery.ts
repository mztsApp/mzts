import { generateEntryQuery } from '@/utilities/generateQuery';

const defaultError = 'Coś poszło nie tak, spróbuj przeładować stronę';

export async function navigationLinksQuery() {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: unknown | null = null;
  let returnedError: unknown | null = null;

  try {
    const navigationLinksResponse = await fetch(
      generateEntryQuery(`2HBQWicP4SZowD62bNuYE`),
      {
        cache: 'force-cache',
      },
    );

    if (!navigationLinksResponse.ok) {
      data = null;
      isError = true;
      returnedError = defaultError;

      throw new Error(defaultError);
    }

    const navigationLinksData = await navigationLinksResponse.json();
    console.log(
      'test ================= > > > :',
      navigationLinksData.fields.links,
    );
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
