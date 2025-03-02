import { notFound } from 'next/navigation';

import { appNavigationQuery } from '@/api/appNavigationQuery';
import type { PageTemplateProps } from '@/types/pageApiTypes';

export const EventPageTemplate = async ({ slug }: PageTemplateProps) => {
  const { data: navigationData } = await appNavigationQuery();

  if (!navigationData) return null;

  const resolvedEntryId = await navigationData.find(
    (page) => page.slug === slug,
  )?.id;

  if (!resolvedEntryId) {
    notFound();
  }

  return <></>;
};
