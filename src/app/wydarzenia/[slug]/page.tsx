import type { Metadata } from 'next';

import type { PageParams } from '@/types/pageApiTypes';
import { appNavigationQuery } from '@/api/appNavigationQuery';
import { getGroupedPagesBySubPage } from '@/utilities/getGroupedPagesBySubPage';
import { getPageParamsQuery } from '@/api/getPageParamsQuery';
import { NAVIGATION_EVENTS_PAGE } from '@/components/Navigation/Navigation.constants';
import { EventsLayout } from '@/components/Layouts/EventsLayout/EventsLayout';
import { LAYOUT_COMPONENT } from '@/components/Layouts/Layout.constants';

export async function generateStaticParams() {
  const { data } = await appNavigationQuery();

  if (!data) return [];

  const gropedPages = getGroupedPagesBySubPage(data);
  const eventPages = gropedPages.nestedPages.find(
    (nestedPage) => nestedPage.subPage === NAVIGATION_EVENTS_PAGE,
  );

  return eventPages?.pages.map((slug) => ({ slug })) ?? [];
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const pageParams = await getPageParamsQuery(params.slug);

  return {
    title: pageParams?.data?.metaTitle ?? '',
    description: pageParams?.data?.metaDescription ?? '',
  };
}

export default function EventsPage({ params }: PageParams) {
  return <EventsLayout as={LAYOUT_COMPONENT.MAIN} slug={params.slug} />;
}
