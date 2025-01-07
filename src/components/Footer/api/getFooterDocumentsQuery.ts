import { defaultError } from '@/app/api/appNavigationQuery';
import {
  generateAssetsQuery,
  generateEntryQuery,
} from '@/utilities/generateQuery';

type DocumentsListItemType = {
  sys: {
    id: string;
  };
};

type FileType = {
  url: string;
  fileName: string;
};

type DocumentAssetsItemsType = {
  fields: {
    title: string;
    description: string;
    file: FileType;
  };
};

type DocsDataType = {
  title: string;
  file: FileType;
};

export const getFooterDocumentsQuery = async () => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: DocsDataType[] = [];
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
      data = [];
      returnedError = defaultError;
    }

    const documentData = await documentResponse.json();
    const documentsList: DocumentsListItemType[] = documentData.fields.docs;
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
      data = [];
      returnedError = defaultError;
    }

    const documentAssetsData = await documentAssetsResponse.json();
    const documentAssetsItems: DocumentAssetsItemsType[] =
      documentAssetsData.items;

    const documentAssets = documentAssetsItems.map((item) => ({
      title: item.fields.title,
      file: item.fields.file,
    }));

    data = documentAssets;
  } catch (error) {
    if (error instanceof Error) {
      isError = true;
      data = [];
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
