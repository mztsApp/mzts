import { AdditionalSectionContent } from '@/components/AdditionalSectionContent/AdditionalContent.server';
import { Gallery } from '@/components/Gallery/Gallery.server';
import { Section } from '@/components/Section/Section';
import {
  SECTION_COMPONENT,
  SECTION_HEADING_COMPONENT,
} from '@/components/Section/Section.constants';
import { TablePageSection } from '@/components/TablePageSection/TablePageSection';
import {
  getSectionAlignmentFromApi,
  getTypographyColorFromApi,
} from '@/utilities/utilitiesForApi';
import { EventsPreview } from '@/components/EventsPreview/EventsPreview';

import { SECTION_COMPONENT_IDENTIFIER } from '../SectionList.constants';
import type {
  FinalEventPreviewData,
  FinalGalleryData,
  FinalSectionData,
  FinalSectionListData,
  FinalTableData,
} from '../SectionList.types';

export const SectionConditionalItem = (
  props: FinalSectionListData & { isPriority: boolean },
) => {
  const { identifier, isPriority, ...rest } = props;

  switch (identifier) {
    case SECTION_COMPONENT_IDENTIFIER.SECTION:
      const sectionProps = rest as FinalSectionData;

      return (
        <Section
          as={SECTION_COMPONENT.SECTION}
          headingColor={getTypographyColorFromApi(sectionProps?.colorVariant)}
          sectionAlignment={getSectionAlignmentFromApi(sectionProps?.alignment)}
          headingLevel={SECTION_HEADING_COMPONENT.H2}
          headingText={sectionProps.title}
          description={sectionProps.description}
          image={sectionProps.image}
          isPriority={isPriority}
        >
          {Boolean(sectionProps.additionalContentId) && (
            <AdditionalSectionContent
              hash={sectionProps?.additionalContentId ?? ''}
            />
          )}
        </Section>
      );
    case SECTION_COMPONENT_IDENTIFIER.GALLERY:
      const galleryProps = rest as FinalGalleryData;

      return <Gallery {...galleryProps} />;
    case SECTION_COMPONENT_IDENTIFIER.TABLE:
      const tableProps = rest as FinalTableData;

      return <TablePageSection {...tableProps} />;
    case SECTION_COMPONENT_IDENTIFIER.EVENTS_PREVIEW:
      const eventPreviewProps = rest as FinalEventPreviewData;

      return <EventsPreview {...eventPreviewProps} />;
    default:
      return null;
  }
};
