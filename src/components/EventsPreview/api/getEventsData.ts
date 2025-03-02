export const getEventsData = async () => {
  let isPending: boolean = true;
  let isError: boolean = false;
  let data: unknown | null = null;
  let returnedError: string | Error | null = null;

  try {
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
