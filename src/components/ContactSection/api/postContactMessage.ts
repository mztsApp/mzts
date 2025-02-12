import type { FormEvent } from 'react';

export const postContactMessage = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  let isPending: boolean = true;
  let isError: boolean = false;
  let messageError: Error | null = null;
  let returnedError: string | Error | null = null;

  const firstName = event.currentTarget.firstName.value;
  const email = event.currentTarget.email.value;
  const message = event.currentTarget.message.value;
  const consented = event.currentTarget.consent.value;
  try {
    console.log({ firstName, email, message, consented });
  } catch (error) {
    if (error instanceof Error) {
      isError = true;
      returnedError = error;
      messageError = error;
    }
  } finally {
    isPending = false;
  }

  return {
    messageError,
    isError,
    error: returnedError,
    isPending,
  };
};
