import Papa from 'papaparse';

export type ParsedTableData = {
  tableHeadCells: string[];
  tableCells: string[][];
};

export const getParsedTableData = async (url: string) => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: ParsedTableData | null = null;
  let returnedError: string | Error | null = null;

  try {
    const tableFetch = await fetch(`https:${url}`, {
      cache: 'force-cache',
    });

    if (!tableFetch.ok) {
      isError = true;
      data = null;
      returnedError = 'Nie udało się pobrać pliku csv';
    }

    const tableData = await tableFetch.text();
    const parsedTable = Papa.parse<string[]>(tableData, {
      header: false,
    });

    data = {
      tableHeadCells: parsedTable.data[0],
      tableCells: parsedTable.data.filter((_, index) => index !== 0),
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
