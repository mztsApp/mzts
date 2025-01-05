import { appNavigationQuery } from '@/app/api/appNavigationQuery';

import { NavContact } from './NavContact/NavContact';
import { NavigationClient } from './Navigation.client';

export const Navigation = async () => {
  const { data } = await appNavigationQuery();

  return (
    <NavigationClient links={data ?? []}>
      <NavContact />
    </NavigationClient>
  );
};
