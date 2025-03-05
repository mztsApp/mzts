import type React from 'react';
import type Image from 'next/image';

import type { ValueOf } from '@/types';

import type {
  SECTION_ALIGNMENT,
  SECTION_COMPONENT,
  SECTION_HEADING_COLOR,
  SECTION_HEADING_COMPONENT,
} from './Section.constants';

type ComponentPropWithRequiredHeading = {
  headingText: string;
  headingLevel: ValueOf<
    Pick<
      typeof SECTION_HEADING_COMPONENT,
      'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6'
    >
  >;
  as: ValueOf<
    Pick<typeof SECTION_COMPONENT, 'HEADER' | 'SECTION' | 'ASIDE' | 'ARTICLE'>
  >;
};

type ComponentPropWithOptionalHeading = {
  headingText?: string;
  headingLevel?: ValueOf<typeof SECTION_HEADING_COMPONENT>;
  as: ValueOf<
    Omit<typeof SECTION_COMPONENT, 'HEADER' | 'SECTION' | 'ASIDE' | 'ARTICLE'>
  >;
};

type HeadingAndComponentConditionalProps =
  | ComponentPropWithOptionalHeading
  | ComponentPropWithRequiredHeading;

type ImageType = React.ComponentProps<typeof Image>;

export type SectionProps = React.PropsWithChildren<{
  image?: ImageType;
  description?: string;
  sectionAlignment?: ValueOf<typeof SECTION_ALIGNMENT>;
  headingColor?: ValueOf<typeof SECTION_HEADING_COLOR>;
  isStatic?: boolean;
  isPriority?: boolean;
}> &
  HeadingAndComponentConditionalProps;
