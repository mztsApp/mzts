import { TYPOGRAPHY_VARIANTS } from '../Typography/Typography.constants';

export const BUTTON_COMPONENTS = {
  NEXT_LINK: 'nextLink',
  BUTTON: 'button',
  ANCHOR: 'a',
} as const;

export const BUTTON_VARIANTS = {
  FILLED: '',
  OUTLINED: 'button__outlined',
  TEXT: 'button__textVariant',
} as const;

export const BUTTON_SIZES = {
  MEDIUM: '',
  LARGE: 'button__large',
} as const;

export const BUTTON_COLORS = {
  ACCENT: '',
  SECONDARY_ACCENT: 'button__secondaryAccentColor',
  TEXT_COLOR: 'button__textColor',
} as const;

export const BUTTON_TEXT_VARIANT_TYPOGRAPHY_SIZES = TYPOGRAPHY_VARIANTS;
