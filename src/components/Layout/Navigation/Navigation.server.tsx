import { NavContact } from './NavContact/NavContact';
import { NavigationClient } from './Navigation.client';

export const Navigation = () => {
  return (
    <NavigationClient>
      <NavContact />
    </NavigationClient>
  );
};
