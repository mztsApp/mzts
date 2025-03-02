import { notFound } from 'next/navigation';

import { appNavigationQuery } from '@/api/appNavigationQuery';
import { NAVIGATION_EVENTS_PAGE } from '@/components/Navigation/Navigation.constants';

export async function generateMetadata() {
  return {
    title: 'Wydarzenia',
    description: 'Zobacz nadchodzące wydarzenia',
  };
}

export default async function EventsPage() {
  const { data: navigationData } = await appNavigationQuery();

  if (!navigationData) return null;

  const resolvedEntryId = await navigationData.some(
    (page) => page.subpage === NAVIGATION_EVENTS_PAGE,
  );

  if (!resolvedEntryId) {
    notFound();
  }

  return <></>;
}
