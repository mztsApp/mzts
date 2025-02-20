import { defaultError } from '@/api/appNavigationQuery';
import type { ValueOf } from '@/types';
import type { ContentIdentificationType } from '@/types/apiTypes';
import type { EntrySysType } from '@/types/pageApiTypes';
import { generateEntryQuery } from '@/utilities/generateQuery';

import { ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION } from '../AdditionalContent.constants';
import type { LinkAdditionalContentData } from '../AdditionalContent.types';
import { getLinksAdditionalContent } from './getLinksAdditionalContent';

type StyledListConditionalFields = {
  items: EntrySysType[];
};

type LinksConditionalFields = {
  firstLink: EntrySysType;
  secondLink?: EntrySysType;
};

type ConditionalFields = StyledListConditionalFields & LinksConditionalFields;

type AdditionalContentDataResponseType = {
  fields: Partial<ConditionalFields>;
  sys: ContentIdentificationType;
};

type LinkContentConditionalType = {
  variant: ValueOf<typeof ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION>;
  items: LinkAdditionalContentData['items'];
};

type AdditionalContentDataType = LinkContentConditionalType;

export async function getAdditionalContent(hash: string) {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: AdditionalContentDataType | null = null;
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
    const entryIdentification = additionalContentData.sys.contentType.sys.id;

    switch (entryIdentification) {
      case ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.LINKS:
        const ids = [fields?.firstLink, fields?.secondLink]
          .map((link) => link?.sys?.id)
          .filter((id) => Boolean(id));

        const { data: linksData } = await getLinksAdditionalContent(
          ids as string[],
        );

        data = {
          variant: ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.LINKS,
          items: linksData?.items ?? [],
        };

        break;
      case ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.STYLED_LIST:
        const styledLinksIds = fields.items
          ?.map((item) => item.sys.id)
          .filter((id) => Boolean(id));

        const { data: styledLinksData } = await getLinksAdditionalContent(
          styledLinksIds as string[],
        );

        data = {
          variant: ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.STYLED_LIST,
          items: styledLinksData?.items ?? [],
        };

        break;
      default:
        data = null;
        returnedError = defaultError;

        break;
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
