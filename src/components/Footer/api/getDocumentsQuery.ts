import { defaultError } from '@/api/appNavigationQuery';
import {
  generateAssetsQuery,
  generateEntryQuery,
} from '@/utilities/generateQuery';

type DocumentsListItemType = {
  sys: {
    id: string;
  };
};

type DocumentFields = Record<
  'privacyPolicy' | 'cookies' | 'rules',
  DocumentsListItemType
> & {
  title: string;
  docs: DocumentsListItemType[];
};

export type FileType = {
  url: string;
  fileName: string;
};

type DocumentAssetsItemsType = {
  fields: {
    title: string;
    file: FileType;
  };
};

type DocsFilesType = {
  title: string;
  file: FileType;
};

type DocumentDataType = Record<
  'privacyPolicy' | 'cookies' | 'rules',
  {
    title: string;
    description: string;
    file: FileType;
  } | null
> & {
  documents: DocsFilesType[];
};

export const getDocumentsQuery = async () => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: DocumentDataType | null = null;
  let returnedError: string | Error | null = null;

  try {
    const documentResponse = await fetch(
      generateEntryQuery('3QnfHnA8xh5Rqlc4oJlBb2'),
      {
        cache: 'force-cache',
      },
    );

    if (!documentResponse.ok) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    const documentData = await documentResponse.json();

    const documentDataFields: DocumentFields = documentData.fields;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { docs, title, ...basicDocuments } = documentDataFields;

    const basicDocumentsIds = Object.values(basicDocuments).map(
      (documentItem) => documentItem.sys.id,
    );

    const basicDocumentsResponse = await fetch(
      generateAssetsQuery(basicDocumentsIds),
      { cache: 'force-cache' },
    );

    if (!basicDocumentsResponse.ok) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    const basicDocumentsData = await basicDocumentsResponse.json();

    const basicDocumentsItems: DocumentAssetsItemsType[] =
      basicDocumentsData.items;

    const basicDocumentsKeys = ['privacyPolicy', 'cookies', 'rules'];
    const basicDocumentsAssets = basicDocumentsItems.map((assetItem, index) => [
      basicDocumentsKeys[index],
      assetItem.fields,
    ]);

    const documentsList = docs;
    const documentsIds = documentsList.map(
      (documentItem) => documentItem.sys.id,
    );

    const documentAssetsResponse = await fetch(
      generateAssetsQuery(documentsIds),
      {
        cache: 'force-cache',
      },
    );

    if (!documentAssetsResponse.ok) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    const documentAssetsData = await documentAssetsResponse.json();
    const documentAssetsItems: DocumentAssetsItemsType[] =
      documentAssetsData.items;

    const documentAssets = documentAssetsItems.map((item) => ({
      title: item.fields.title,
      file: item.fields.file,
    }));

    data = {
      ...Object.fromEntries(basicDocumentsAssets),
      documents: documentAssets,
    };
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
