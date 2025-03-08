import { getCombinedFullEventsPages } from './api/getCombinedFullEventsPages';
import { SideNavigationDialog } from './SideNavigationDialog/SideNavigationDialog';

type SideNavigationProps = {
  slug?: string;
};

export const SideNavigation = async ({ slug }: SideNavigationProps) => {
  const { combinedEventPagesData } = await getCombinedFullEventsPages(slug);

  return (
    <SideNavigationDialog pages={combinedEventPagesData} currentSlug={slug} />
  );
};
