import { Metadata } from 'next';

import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import { PageParams } from '@/types/pageApiTypes';
import { getGroupedPagesBySubPage } from '@/utilities/getGroupedPagesBySubPage';

import { getPageParamsQuery } from '../api/getPageParamsQuery';
import { appNavigationQuery } from '../api/appNavigationQuery';

export async function generateStaticParams() {
  const { data } = await appNavigationQuery();

  if (!data) return null;

  const gropedPages = getGroupedPagesBySubPage(data);

  return gropedPages.restPages.map((slug) => ({ slug }));
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

export default function PageComponent({ params }: PageParams) {
  return <PageTemplate slug={params.slug} />;
}
