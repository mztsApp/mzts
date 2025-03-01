import { TYPOGRAPHY_ALIGNMENT } from '../Typography/Typography.constants';

export const GALLERY_COLOR_VARIANT = {
  TEXT: 'biały',
  ACCENT: 'akcent (fioletowy)',
  GRADIENT_LEFT: 'gradient (z lewej do prawej)',
  GRADIENT_RIGHT: 'gradient (z prawej do lewej)',
} as const;

export const GALLERY_ALIGNMENT = {
  START: 'po lewej',
  CENTER: 'środek',
  END: 'po prawej',
} as const;

export const TYPOGRAPHY_ALIGNMENT_FROM_GALLERY = {
  [GALLERY_ALIGNMENT.START]: TYPOGRAPHY_ALIGNMENT.START,
  [GALLERY_ALIGNMENT.CENTER]: TYPOGRAPHY_ALIGNMENT.CENTER,
  [GALLERY_ALIGNMENT.END]: TYPOGRAPHY_ALIGNMENT.END,
} as const;

export const GALLERY_ALIGNMENT_FROM_API = {
  [GALLERY_ALIGNMENT.START]: '',
  [GALLERY_ALIGNMENT.CENTER]: 'gallery_centerAlignment',
  [GALLERY_ALIGNMENT.END]: 'gallery_endAlignment',
} as const;
