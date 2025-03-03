import { getCombinedFullEventsPagesOrGoNotFound } from './api/getCombinedFullEventsPagesOrGoNotFound';
import { SideNavigationTabs } from './SideNavigationContent/SideNavigationTabs';

type SideNavigationProps = {
  slug?: string;
};

export const SideNavigation = async ({ slug }: SideNavigationProps) => {
  const { combinedEventPagesData } =
    await getCombinedFullEventsPagesOrGoNotFound(slug);

  return (
    <SideNavigationTabs pages={combinedEventPagesData} currentSlug={slug} />
  );
};
