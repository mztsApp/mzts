import { notFound } from 'next/navigation';

import { appNavigationQuery } from '@/api/appNavigationQuery';
import { getPageDataQuery } from '@/api/getPageDataQuery';
import type { PageTemplateProps } from '@/types/pageApiTypes';
import {
  getSectionAlignmentFromApi,
  getTypographyColorFromApi,
} from '@/utilities/utilitiesForApi';
import { Layout } from '@/components/Layouts/Layout/Layout.server';
import { LAYOUT_COMPONENT } from '@/components/Layouts/Layout.constants';

import { ContactSection } from '../../ContactSection/ContactSection.server';
import { FAQ } from '../../FAQ/FAQ.server';
import { Newsletter } from '../../Newsletter/Newsletter.server';
import { Section } from '../../Section/Section';
import {
  SECTION_COMPONENT,
  SECTION_HEADING_COMPONENT,
} from '../../Section/Section.constants';
import { SectionList } from '../../SectionList/SectionList.server';

export const PageTemplate = async ({ slug }: PageTemplateProps) => {
  const { data: navigationData } = await appNavigationQuery();

  if (!navigationData) return null;

  const resolvedEntryId = await navigationData.find(
    (page) => page.slug === slug,
  )?.id;

  if (!resolvedEntryId) {
    notFound();
  }

  const { data } = await getPageDataQuery({
    pageId: resolvedEntryId,
  });

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
};
