import { Metadata } from 'next';

import { getPageParamsQuery } from '@/app/api/getPageParamsQuery';
import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import { PageParams } from '@/types/pageApiTypes';
import { appNavigationQuery } from '@/app/api/appNavigationQuery';
import { getGroupedPagesBySubPage } from '@/utilities/getGroupedPagesBySubPage';

export async function generateStaticParams() {
  const { data } = await appNavigationQuery();

  if (!data) return null;

  const gropedPages = getGroupedPagesBySubPage(data);

  return gropedPages.nestedPages
    .find(({ subPage }) => subPage === 'wspolpraca')
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

export default function CooperationPage({ params }: PageParams) {
  return <PageTemplate slug={params.slug} />;
}
