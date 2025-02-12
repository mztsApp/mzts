import type React from 'react';

import type { ValueOf } from '@/types';

import type {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from './Typography.constants';

export type LabelProps = Omit<
  React.ComponentProps<'label'>,
  'className' | 'style'
>;

type AsLabelProps = {
  as: typeof TYPOGRAPHY_COMPONENTS.LABEL;
} & LabelProps;

type VariantBaseConditionalProps =
  | AsLabelProps
  | {
      as?: ValueOf<typeof TYPOGRAPHY_COMPONENTS>;
    };

export type TypographyProps = React.PropsWithChildren<
  {
    variant?: ValueOf<typeof TYPOGRAPHY_VARIANTS>;
    color?: ValueOf<typeof TYPOGRAPHY_COLORS>;
    align?: ValueOf<typeof TYPOGRAPHY_ALIGNMENT>;
    uppercase?: boolean;
    noWrap?: boolean;
    className?: string;
    underline?: boolean;
    fitContent?: boolean;
  } & VariantBaseConditionalProps
>;
