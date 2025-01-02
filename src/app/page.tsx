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
import { getPageDataQuery } from './api/getPageDataQuery';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getPageDataQuery();

  return {
    title: data?.metaTitle,
    description: data?.metaDescription,
  };
}

export default async function Home() {
  const { data } = await getPageDataQuery();

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
    </>
  );
}
