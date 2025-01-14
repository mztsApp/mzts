import { appNavigationQuery } from '@/api/appNavigationQuery';
import { getPageDataQuery } from '@/api/getPageDataQuery';
import {
  getSectionAlignmentFromApi,
  getTypographyColorFromApi,
} from '@/utilities/utilitiesForApi';
import { PageTemplateProps } from '@/types/pageApiTypes';

import { Section } from '../Section/Section';
import { SectionList } from '../SectionList/SectionList.server';
import {
  SECTION_COMPONENT,
  SECTION_HEADING_COMPONENT,
} from '../Section/Section.constants';
import { Newsletter } from '../Newsletter/Newsletter.server';
import { FAQ } from '../FAQ/FAQ.server';
import { ContactSection } from '../ContactSection/ContactSection.server';

export const PageTemplate = async ({ slug }: PageTemplateProps) => {
  const { data: navigationData } = await appNavigationQuery();

  if (!navigationData) return null;

  const resolvedEntryId = await navigationData.find(
    (page) => page.slug === slug,
  )?.id;

  if (!resolvedEntryId) return null;

  const { data } = await getPageDataQuery({
    pageId: resolvedEntryId,
  });

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

      {data.showFAQ && <FAQ withLinkToContactForm={data.showContactForm} />}

      {data.showNewsletter && <Newsletter />}

      {data.showContactForm && <ContactSection />}
    </>
  );
};
