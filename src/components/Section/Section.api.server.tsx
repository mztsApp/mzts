import { sectionDataQuery } from './api/sectionDataQuery';
import {
  SECTION_COMPONENT,
  SECTION_HEADING_COMPONENT,
} from './Section.constants';
import { Section } from './Section';

type SectionApiWrapperProps = {
  apiId: string;
};

export const SectionApiWrapper = async ({ apiId }: SectionApiWrapperProps) => {
  const {} = await sectionDataQuery(apiId);

  return (
    <Section
      as={SECTION_COMPONENT.SECTION}
      headingLevel={SECTION_HEADING_COMPONENT.H2}
      headingText="section"
    />
  );
};
