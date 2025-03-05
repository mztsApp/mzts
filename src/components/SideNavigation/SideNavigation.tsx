import { getCombinedFullEventsPagesOrGoNotFound } from './api/getCombinedFullEventsPagesOrGoNotFound';
import { SideNavigationDialog } from './SideNavigationContent/SideNavigationDialog';

type SideNavigationProps = {
  slug?: string;
};

export const SideNavigation = async ({ slug }: SideNavigationProps) => {
  const { combinedEventPagesData } =
    await getCombinedFullEventsPagesOrGoNotFound(slug);

  return (
    <SideNavigationDialog pages={combinedEventPagesData} currentSlug={slug} />
  );
};
