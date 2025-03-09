import { useState, useEffect } from 'react';

const COOKIE_NAME = 'cookieConsent';
const EXPIRATION_DAYS = 30;
const DAY = 24 * 60 * 60 * 1000;

export const useHandleClientConsentWithCookies = () => {
  const [isConsented, setIsConsented] = useState<boolean>(true);

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();

    expires.setTime(expires.getTime() + days * DAY);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/;`;
  };

  const getCookie = (name: string): string | null => {
    return (
      document.cookie
        .split('; ')
        .map((cookie) => cookie.split('='))
        .find(([cookieName]) => cookieName === name)?.[1] ?? null
    );
  };

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME) === 'true';

    setIsConsented(consent);
  }, [isConsented]);

  const saveConsent = () => {
    setCookie(COOKIE_NAME, 'true', EXPIRATION_DAYS);
    setIsConsented(true);
  };

  return {
    saveConsent,
    isConsented,
  };
};
