import { appNavigationQuery } from '@/api/appNavigationQuery';

type SideNavigationProps = {
  slug?: string;
};

export const SideNavigation = async (props: SideNavigationProps) => {
  const { data } = await appNavigationQuery();

  return null;
};
