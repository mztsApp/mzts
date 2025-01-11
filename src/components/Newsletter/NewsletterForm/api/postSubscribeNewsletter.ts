import { FormEvent } from 'react';

export const newsletterConsent =
  'Wyrażam zgodę na przetwarzanie mojego adresu e-mail w celu otrzymywania newslettera zgodnie z polityką prywatności. Zgoda może być wycofana w każdej chwili.';

export const postSubscribeNewsletter = async (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  let isPending: boolean = true;
  let isSuccess: boolean = false;
  let messages: Error | null = null;

  const email = event.currentTarget.email.value;
  const isConsented = event.currentTarget.consentNewsletter.value === 'on';

  console.log({ email, isConsented, consent: newsletterConsent });

  try {
  } catch (error) {
    if (error instanceof Error) {
      messages = error;
      isSuccess = false;

      console.error({ messages, isConsented, consent: newsletterConsent });
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
