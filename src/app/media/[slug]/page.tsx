import { Metadata } from 'next';

import { PageParams } from '@/types/pageApiTypes';
import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import { getPageParamsQuery } from '@/app/api/getPageParamsQuery';
import { getGroupedPagesBySubPage } from '@/utilities/getGroupedPagesBySubPage';
import { appNavigationQuery } from '@/app/api/appNavigationQuery';

export async function generateStaticParams() {
  const { data } = await appNavigationQuery();

  if (!data) return null;

  const gropedPages = getGroupedPagesBySubPage(data);

  return gropedPages.nestedPages
    .find(({ subPage }) => subPage === 'media')
    ?.pages.map((slug) => ({ slug }));
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
