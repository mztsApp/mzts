import { defaultError } from '@/api/appNavigationQuery';
import {
  generateAssetsQuery,
  generateEntryRelatedWithEntryIdQuery,
} from '@/utilities/generateQuery';

import type {
  EventsPageData,
  EventsPageDataTypeFromApi,
  EventsPageDataWithoutImage,
  ImagesType,
} from '../SideNavigationApi.types';

export const getEventsPageData = async (eventEntryIdentifiers: string[]) => {
  let isDataFetchingPending: boolean = true;
  let hasDataFetchingErrorOccurred: boolean = false;
  let collectedEventsPageData: EventsPageData[] = [];
  let dataFetchingErrorMessage: string | Error | null = null;

  try {
    const eventPageFetchResults = await Promise.allSettled(
      eventEntryIdentifiers.map(async (eventEntryIdentifier) => {
        try {
          const eventPageFetchResponse = await fetch(
            generateEntryRelatedWithEntryIdQuery(eventEntryIdentifier),
            {
              cache: 'force-cache',
            },
          );

          if (!eventPageFetchResponse.ok) {
            throw new Error(
              `HTTP Error ${eventPageFetchResponse.status} occurred while fetching data for event entry identifier: ${eventEntryIdentifier}`,
            );
          }

          const eventPageData: EventsPageDataTypeFromApi =
            await eventPageFetchResponse.json();

          const eventPage = eventPageData.items.find(
            (item) => item.sys.contentType.sys.id === 'eventPage',
          );

          const eventPageFields = eventPage?.fields;

          return eventPageFields;
        } catch (fetchError) {
          throw new Error(
            `An error occurred while fetching data for event entry identifier: ${eventEntryIdentifier}. Error details: ${fetchError}`,
          );
        }
      }),
    );

    const failedEventPageFetches = eventPageFetchResults
      .filter((fetchResult) => fetchResult.status === 'rejected')
      .map((fetchResult) => (fetchResult as PromiseRejectedResult).reason);

    const successfullyFetchedEventPages = eventPageFetchResults
      .filter((fetchResult) => fetchResult.status === 'fulfilled')
      .map((fetchResult) => fetchResult.value);

    const eventPages = successfullyFetchedEventPages.filter(
      Boolean,
    ) as EventsPageDataWithoutImage[];

    const eventPagesImageFetch = await fetch(
      generateAssetsQuery(eventPages.map((field) => field.bgImage.sys.id)),
      { cache: 'force-cache' },
    );

    if (!eventPagesImageFetch.ok) {
      hasDataFetchingErrorOccurred = true;
      dataFetchingErrorMessage = defaultError;
    }

    const eventPagesImageData: ImagesType = await eventPagesImageFetch.json();

    const images = eventPagesImageData.items.map((image) => ({
      ...image.fields,
      imageId: image.sys.id,
    }));

    const resolvedData = eventPages.map((item) => {
      const image = images.find(
        (image) => image.imageId === item.bgImage.sys.id,
      );

      return { ...item, bgImage: image?.file ?? null };
    }) as EventsPageData[];

    if (successfullyFetchedEventPages.length > 0) {
      collectedEventsPageData = resolvedData;
    }

    if (failedEventPageFetches.length > 0) {
      hasDataFetchingErrorOccurred = true;
      dataFetchingErrorMessage = failedEventPageFetches.join('\n');
    }
  } catch (unexpectedError) {
    hasDataFetchingErrorOccurred = true;
    dataFetchingErrorMessage =
      unexpectedError instanceof Error ? unexpectedError.message : defaultError;
  } finally {
    isDataFetchingPending = false;
  }

  return {
    data: collectedEventsPageData,
    isError: hasDataFetchingErrorOccurred,
    error: dataFetchingErrorMessage,
    isPending: isDataFetchingPending,
  };
};
