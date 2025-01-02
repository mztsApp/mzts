import { defaultError } from '@/api/appNavigationQuery';
import { generateEntryQuery } from '@/utilities/generateQuery';

export const sectionDataQuery = async (apiId: string) => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: unknown | null = null;
  let returnedError: string | null = null;

  try {
    const sectionEntryResponse = await fetch(generateEntryQuery(apiId));

    if (!sectionEntryResponse.ok) {
      returnedError = defaultError;
      isError = true;

      throw new Error(defaultError);
    }

    const sectionEntryData = await sectionEntryResponse.json();
    data = sectionEntryData;
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
