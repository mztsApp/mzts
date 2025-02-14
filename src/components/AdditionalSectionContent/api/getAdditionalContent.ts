import { defaultError } from '@/api/appNavigationQuery';
import type { EntrySysType } from '@/types/pageApiTypes';
import { generateEntryQuery } from '@/utilities/generateQuery';

import { ADDITIONAL_CONTENT_VARIANT_BY_API_TITLE } from '../AdditionalContent.constants';
import { getLinksAdditionalContent } from './getLinksAdditionalContent';

type StyledListConditionalFields = {
  title: typeof ADDITIONAL_CONTENT_VARIANT_BY_API_TITLE.STYLED_LIST;
  items: EntrySysType[];
};

type LinksConditionalFields = {
  title: typeof ADDITIONAL_CONTENT_VARIANT_BY_API_TITLE.LINKS;
  firstLink: EntrySysType;
  secondLink?: EntrySysType;
};

type ConditionalFields = StyledListConditionalFields | LinksConditionalFields;

type AdditionalContentDataResponseType = {
  fields: ConditionalFields;
};

export async function getAdditionalContent(hash: string) {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: unknown | null = null;
  let returnedError: string | Error | null = null;

  try {
    const response = await fetch(generateEntryQuery(hash), {
      cache: 'force-cache',
    });

    if (!response.ok) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    const additionalContentData: AdditionalContentDataResponseType =
      await response.json();

    const fields = additionalContentData.fields;

    if (fields.title === ADDITIONAL_CONTENT_VARIANT_BY_API_TITLE.LINKS) {
      const firstLink: string = fields.firstLink.sys.id;
      const linksHashes = [firstLink];

      const secondLink: string | undefined = fields.secondLink?.sys?.id;

      if (secondLink) {
        linksHashes.push(secondLink);
      }

      // const { data } = await getLinksAdditionalContent(linksHashes);
    } else {
      const styledLinksHashes = fields.items.map((item) => item.sys.id);

      const { data } = await getLinksAdditionalContent(styledLinksHashes);
      console.log({ data: data?.items });
    }
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
