import { Data } from '../api/navigationContactListQuery';
import { END_CONTACT_ICONS, START_CONTACT_ICONS } from './NavContact.constants';

export type IconObjectType = Record<'startIcon' | 'endIcon', React.ReactNode>;

export const getListedData = (
  data: Data,
): {
  text: string;
  href: string;
  shouldOpenInNewWindow: boolean;
  variant: string;
}[] => {
  if (!data) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address, ...restData } = data;

  return Object.values(restData);
};

export const getIcons = (data: Data): IconObjectType[] => {
  if (!data) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address, ...restData } = data;

  return Object.keys(restData).map((key) => {
    const resolvedKey = key as keyof typeof START_CONTACT_ICONS;
    const endKey = key as keyof typeof END_CONTACT_ICONS;

    return {
      startIcon:
        resolvedKey in START_CONTACT_ICONS
          ? START_CONTACT_ICONS[resolvedKey]
          : null,
      endIcon: endKey in END_CONTACT_ICONS ? END_CONTACT_ICONS[endKey] : null,
    };
  });
};