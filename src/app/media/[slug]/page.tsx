import { Metadata } from 'next';

import { PageParams } from '@/types/pageApiTypes';
import { getGroupedPagesBySubPage } from '@/utilities/getGroupedPagesBySubPage';
import { appNavigationQuery } from '@/api/appNavigationQuery';
import { getPageParamsQuery } from '@/api/getPageParamsQuery';
import { PageTemplate } from '@/components/PageTemplate/PageTemplate';

export async function generateStaticParams() {
  const { data } = await appNavigationQuery();

  if (!data) return [];

  const gropedPages = getGroupedPagesBySubPage(data);

  return (
    gropedPages.nestedPages
      ?.find(({ subPage }) => subPage === 'media')
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

export default function MediaPage({ params }: PageParams) {
  return <PageTemplate slug={params.slug} />;
}
