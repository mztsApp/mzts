import { Metadata } from 'next';

import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import { appNavigationQuery } from '@/api/appNavigationQuery';
import { getGroupedPagesBySubPage } from '@/utilities/getGroupedPagesBySubPage';
import { getPageParamsQuery } from '@/api/getPageParamsQuery';
import { PageParams } from '@/types/pageApiTypes';

export async function generateStaticParams() {
  const { data } = await appNavigationQuery();

  if (!data) return [];

  const gropedPages = getGroupedPagesBySubPage(data);

  return (
    gropedPages.nestedPages
      ?.find(({ subPage }) => subPage === 'kontakt')
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

export default function ContactPage({ params }: PageParams) {
  return <PageTemplate slug={params.slug} />;
}
