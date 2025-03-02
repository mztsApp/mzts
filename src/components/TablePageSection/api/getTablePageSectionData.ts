import { defaultError } from '@/api/appNavigationQuery';
import { generateAssetQuery } from '@/utilities/generateQuery';

import type { ParsedTableData } from './getParsedTableData';
import { getParsedTableData } from './getParsedTableData';

type TableAssetDataTypeFromApi = {
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
      };
      fileName: string;
      contentType: string;
    };
  };
};

type TableData = {
  title: string;
  description?: string;
} & Required<ParsedTableData>;

export const getTablePageSectionData = async (tableAssetId: string) => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: TableData | null = null;
  let returnedError: string | Error | null = null;

  try {
    const tableAssetFetch = await fetch(generateAssetQuery(tableAssetId), {
      cache: 'force-cache',
    });

    if (!tableAssetFetch.ok) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    const tableAssetData: TableAssetDataTypeFromApi =
      await tableAssetFetch.json();

    const { data: parsedTable } = await getParsedTableData(
      tableAssetData.fields.file.url,
    );

    if (!parsedTable) {
      isError = true;
      data = null;
      returnedError = defaultError;
    }

    data = {
      title: tableAssetData.fields.title,
      description: tableAssetData.fields.description,
      tableHeadCells: parsedTable?.tableHeadCells ?? [],
      tableCells: parsedTable?.tableCells ?? [],
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
