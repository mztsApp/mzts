import type { Metadata } from 'next';

import { ContactSection } from '@/components/ContactSection/ContactSection.server';
import { FAQ } from '@/components/FAQ/FAQ.server';
import { LAYOUT_COMPONENT } from '@/components/Layouts/Layout.constants';
import { Layout } from '@/components/Layouts/Layout/Layout.server';
import { Newsletter } from '@/components/Newsletter/Newsletter.server';
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

import { getHomePageDataQuery } from '../api/getHomePageDataQuery';

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
    <Layout as={LAYOUT_COMPONENT.MAIN}>
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

      {data.showFAQ && <FAQ withLinkToContactForm={data.showContactForm} />}

      {data.showNewsletter && <Newsletter />}

      {data.showContactForm && <ContactSection />}
    </Layout>
  );
}
