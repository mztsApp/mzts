import { defaultError } from '@/app/api/appNavigationQuery';
import { generateEntryQuery } from '@/utilities/generateQuery';

type FAQFieldsType = {
  title: string;
  colorVariant: string;
  faqItems: { sys: { id: string } }[];
  description?: string;
};

type FAQItemApiType = {
  fields: {
    question: string;
    response: string;
  };
};

export type FAQItemType = {
  question: string;
  response: string;
};

type FAQDataType = Omit<FAQFieldsType, 'faqItems'> & {
  faqItems: FAQItemType[];
};

export const getFAQDataQuery = async () => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: FAQDataType | null = null;
  let returnedError: string | Error | null = null;

  try {
    const faqResponse = await fetch(
      generateEntryQuery('5UFdCFuKY8m74KNk7uWELd'),
      { cache: 'force-cache' },
    );

    if (!faqResponse.ok) {
      isError = true;
      returnedError = defaultError;
      data = null;
    }

    const faqData = await faqResponse.json();
    const faqFields: FAQFieldsType = faqData.fields;
    const { faqItems, ...restData } = faqFields;
    const resolvedFaqItemsIds = faqItems.map((item) => item.sys.id);

    const faqItemsResponse = await fetch(
      generateEntryQuery(resolvedFaqItemsIds),
      {
        cache: 'force-cache',
      },
    );

    if (!faqItemsResponse.ok) {
      isError = true;
      returnedError = defaultError;
      data = null;
    }

    const faqItemsData = await faqItemsResponse.json();

    const faqItemsItems: FAQItemApiType[] = faqItemsData.items;
    const resolvedFaqItems = faqItemsItems.map((faqItem) => faqItem.fields);

    data = { ...restData, faqItems: resolvedFaqItems };
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
