import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ValueOf } from '@/types';

import {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from './Typography.constants';
import styles from './Typography.module.scss';

type TypographyProps = React.PropsWithChildren<{
  as?: ValueOf<typeof TYPOGRAPHY_COMPONENTS>;
  variant?: ValueOf<typeof TYPOGRAPHY_VARIANTS>;
  color?: ValueOf<typeof TYPOGRAPHY_COLORS>;
  align?: ValueOf<typeof TYPOGRAPHY_ALIGNMENT>;
  uppercase?: boolean;
  noWrap?: boolean;
}>;

export const Typography = ({
  as: TypographyHTMLTag = TYPOGRAPHY_COMPONENTS.PARAGRAPH,
  variant = TYPOGRAPHY_VARIANTS.BODY,
  color = TYPOGRAPHY_COLORS.DEFAULT,
  uppercase = false,
  noWrap = false,
  align = TYPOGRAPHY_ALIGNMENT.INITIAL,
  children,
}: TypographyProps) => {
  return (
    <TypographyHTMLTag
      className={twMerge(
        styles.typography,
        styles[variant],
        styles[color],
        styles[align],
        uppercase && styles.typography__uppercase,
        noWrap && styles.typography__noWrap,
      )}
    >
      {children}
    </TypographyHTMLTag>
  );
};
