import { navigationLinksQuery } from './api/navigationLinksQuery';
import { NavContact } from './NavContact/NavContact';
import { NavigationClient } from './Navigation.client';

export const Navigation = async () => {
  const {} = await navigationLinksQuery();

  return (
    <NavigationClient>
      <NavContact />
    </NavigationClient>
  );
};
