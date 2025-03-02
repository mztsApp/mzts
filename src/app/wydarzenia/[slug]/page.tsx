import type { Metadata } from 'next';

import { PageTemplate } from '@/components/PageTemplates/PageTemplate/PageTemplate';
import type { PageParams } from '@/types/pageApiTypes';
import { appNavigationQuery } from '@/api/appNavigationQuery';
import { getGroupedPagesBySubPage } from '@/utilities/getGroupedPagesBySubPage';
import { getPageParamsQuery } from '@/api/getPageParamsQuery';

export async function generateStaticParams() {
  const { data } = await appNavigationQuery();

  if (!data) return [];

  const gropedPages = getGroupedPagesBySubPage(data);

  return (
    gropedPages.nestedPages
      ?.find(({ subPage }) => subPage === 'wydarzenia')
      ?.pages.map((slug) => ({ slug })) ?? []
  );
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
  return <PageTemplate slug={params.slug} />;
}
