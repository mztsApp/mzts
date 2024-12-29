import { generateEntryQuery } from '../../../../utilities/generateQuery';

type LinkValueType = {
  text: string;
  href: string;
  shouldOpenInNewWindow: boolean;
  variant: string;
};

export type Data =
  | ({
      address?: string;
    } & Partial<Record<'email' | 'phoneNumber' | 'facebook', LinkValueType>>)
  | null;

type ContactReturnType = {
  data: Data;
  isError: boolean;
  isPending: boolean;
  error: Error | null;
};

type ContactElementType = Record<'id' | 'type' | 'linkType', string>;
type RestItemsType = Record<string, Record<'sys', ContactElementType>>;

type FieldType = Record<'text' | 'href' | 'variant', string>;
type FieldsContainerArrayType = {
  fields: FieldType;
  sys: {
    id: string;
  };
}[];

export const navigationContactListQuery =
  async (): Promise<ContactReturnType> => {
    let isPending: boolean = true;
    let isError: boolean = false;
    let data: Data = null;
    let returnedError: Error | null = null;

    try {
      const response = await fetch(
        generateEntryQuery('7pw8llgEy4f2lB5JZJInz4'),
        {
          cache: 'force-cache',
        },
      );

      if (response.ok) {
        isError = true;
        data = null;
      }

      const { fields } = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { title, address, ...restItems } = fields;

      const resolvedRestItems: RestItemsType = restItems;
      const itemsSysIds = Object.values(resolvedRestItems).map(
        ({ sys }) => sys.id,
      );

      const itemsFetch = await fetch(generateEntryQuery(itemsSysIds, 10), {
        cache: 'force-cache',
      });

      if (itemsFetch.ok) {
        isError = true;
        data = null;
      }

      const itemsData = await itemsFetch.json();
      const { items } = itemsData;

      const resolvedItemsFieldsContainer: FieldsContainerArrayType = items;
      const resolvedItemsFields = resolvedItemsFieldsContainer.map((field) => ({
        sysId: field.sys.id,
        fields: field.fields,
      }));

      const objectWithIds = Object.entries(resolvedRestItems).map(
        ([key, currentValue]) => [
          key,
          resolvedItemsFields.find(
            (field) => field.sysId === currentValue.sys.id,
          )?.fields,
        ],
      );

      const finalResolvedData = Object.fromEntries(objectWithIds);

      data = { ...finalResolvedData, address };
    } catch (error) {
      returnedError = error instanceof Error ? error : null;

      isError = true;
    } finally {
      isPending = false;
    }

    return { isError, isPending, data, error: returnedError };
  };
