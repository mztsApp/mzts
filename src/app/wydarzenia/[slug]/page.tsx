import type { Metadata } from 'next';

import { EventsLayout } from '@/components/Layouts/EventsLayout/EventsLayout';
import { LAYOUT_COMPONENT } from '@/components/Layouts/Layout.constants';
import { getCombinedFullEventsPages } from '@/components/SideNavigation/api/getCombinedFullEventsPages';
import type { PageParams } from '@/types/pageApiTypes';
import { EventPageTemplate } from '@/components/PageTemplates/EventPageTemplate/EventPageTemplate';

export async function generateStaticParams() {
  const { combinedEventPagesData } = await getCombinedFullEventsPages();

  if (!combinedEventPagesData) return [];

  const eventPages = combinedEventPagesData.map((page) => ({
    slug: page.slug.slug,
  }));

  return eventPages ?? [];
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { currentPage } = await getCombinedFullEventsPages(params.slug);

  return {
    title: currentPage?.metaTitle ?? '',
    description: currentPage?.metaDescription ?? '',
  };
}

export default function EventsPage({ params }: PageParams) {
  return (
    <EventsLayout as={LAYOUT_COMPONENT.MAIN} slug={params.slug}>
      <EventPageTemplate slug={params.slug} />
    </EventsLayout>
  );
}
