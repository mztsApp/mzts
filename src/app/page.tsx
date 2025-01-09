import { Metadata } from 'next';

import { Section } from '@/components/Section/Section';
import {
  SECTION_COMPONENT,
  SECTION_HEADING_COMPONENT,
} from '@/components/Section/Section.constants';
import { SectionList } from '@/components/SectionList/SectionList.server';
import {
  getSectionAlignmentFromApi,
  getTypographyColorFromApi,
} from '@/utilities/utilitiesForApi';
import { Newsletter } from '@/components/Newsletter/Newsletter';

import { getHomePageDataQuery } from './api/getHomePageDataQuery';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getHomePageDataQuery();

  return {
    title: data?.metaTitle,
    description: data?.metaDescription,
  };
}

export default async function Home() {
  const { data } = await getHomePageDataQuery();

  if (!data) return null;

  return (
    <>
      {!data.isHeroHide && (
        <Section
          as={SECTION_COMPONENT.HEADER}
          headingColor={getTypographyColorFromApi(data?.colorVariant)}
          sectionAlignment={getSectionAlignmentFromApi(data?.alignmentVariant)}
          headingLevel={SECTION_HEADING_COMPONENT.H1}
          headingText={data?.title ?? ''}
          description={data?.heroDescription}
          image={data?.bgImage}
        />
      )}

      {data.sectionEntriesIds.length > 0 && (
        <SectionList entriesIds={data.sectionEntriesIds} />
      )}

      {data.showNewsletter && <Newsletter />}
    </>
  );
}
