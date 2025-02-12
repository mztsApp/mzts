import { SECTION_ALIGNMENT } from '@/components/Section/Section.constants';
import { TYPOGRAPHY_COLORS } from '@/components/Typography/Typography.constants';
import type { ValueOf } from '@/types';

export const getTypographyColorFromApi = (
  colorVariantFromApi?: string | null,
): ValueOf<typeof TYPOGRAPHY_COLORS> => {
  switch (colorVariantFromApi) {
    case 'gradient (gradient z lewej do prawej)':
      return TYPOGRAPHY_COLORS.GRADIENT_LEFT;
    case 'biały':
      return TYPOGRAPHY_COLORS.TEXT;
    case 'akcent (fioletowy)':
      return TYPOGRAPHY_COLORS.ACCENT;
    default:
      return TYPOGRAPHY_COLORS.GRADIENT_RIGHT;
  }
};

export const getSectionAlignmentFromApi = (
  alignmentFromApi?: string | null,
): ValueOf<typeof SECTION_ALIGNMENT> => {
  switch (alignmentFromApi) {
    case 'po prawej':
      return SECTION_ALIGNMENT.RIGHT;
    default:
      return SECTION_ALIGNMENT.LEFT;
  }
};
