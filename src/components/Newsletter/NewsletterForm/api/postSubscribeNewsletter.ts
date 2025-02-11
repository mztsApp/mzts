import type { FormEvent } from 'react';

export const postSubscribeNewsletter = async (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  let isPending: boolean = true;
  let isSuccess: boolean = false;
  let messages: Error | null = null;

  const email = event.currentTarget.email.value;

  console.log({ email });

  try {
  } catch (error) {
    if (error instanceof Error) {
      messages = error;
      isSuccess = false;

      console.error({ messages });
    }
  } finally {
    isPending = false;
  }

  return {
    isPending,
    isSuccess,
    messages,
  };
};
