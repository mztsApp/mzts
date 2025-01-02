import {
  getSectionAlignmentFromApi,
  getTypographyColorFromApi,
} from '@/utilities/utilitiesForApi';

import { Section } from '../Section/Section';
import {
  SECTION_COMPONENT,
  SECTION_HEADING_COMPONENT,
} from '../Section/Section.constants';
import { getSectionDataQuery } from './api/getSectionDataQuery';
import styles from './SectionList.module.scss';

type SectionApiWrapperProps = {
  entriesIds: string[];
};

export const SectionList = async ({ entriesIds }: SectionApiWrapperProps) => {
  const { data } = await getSectionDataQuery(entriesIds);

  if (!data) {
    return null;
  }

  return (
    <ul className={styles.sectionList}>
      {data.map((section) => (
        <li key={section.sectionId}>
          <Section
            as={SECTION_COMPONENT.SECTION}
            headingColor={getTypographyColorFromApi(section?.colorVariant)}
            sectionAlignment={getSectionAlignmentFromApi(section?.alignment)}
            headingLevel={SECTION_HEADING_COMPONENT.H2}
            headingText={section.title}
            description={section.description}
            image={section.image}
          />
        </li>
      ))}
    </ul>
  );
};
