import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
} from '../Typography/Typography.constants';

export const SECTION_COMPONENT = {
  MAIN: 'main',
  ARTICLE: 'article',
  DIV: 'div',
  HEADER: 'header',
  SECTION: 'section',
  ASIDE: 'aside',
} as const;

export const SECTION_HEADING_COMPONENT = TYPOGRAPHY_COMPONENTS;

export const SECTION_ALIGNMENT = {
  LEFT: 'section_contentWithImage__alignStart',
  RIGHT: '',
} as const;

export const SECTION_CONTENT_ALIGNMENT = {
  [SECTION_ALIGNMENT.LEFT]: 'section_content__alignStart',
  [SECTION_ALIGNMENT.RIGHT]: '',
};

export const SECTION_HEADING_COLOR = TYPOGRAPHY_COLORS;
