import { twMerge } from 'tailwind-merge';

import {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from './Typography.constants';
import styles from './Typography.module.scss';
import type { LabelProps, TypographyProps } from './Typography.types';

export const Typography = ({
  as: TypographyHTMLTag = TYPOGRAPHY_COMPONENTS.PARAGRAPH,
  variant = TYPOGRAPHY_VARIANTS.BODY,
  color = TYPOGRAPHY_COLORS.DEFAULT,
  uppercase = false,
  noWrap = false,
  align = TYPOGRAPHY_ALIGNMENT.INITIAL,
  underline = false,
  className = '',
  children,
  fitContent = true,
  ...restLabelProps
}: TypographyProps) => {
  const labelConditionalProps =
    TypographyHTMLTag === TYPOGRAPHY_COMPONENTS.LABEL
      ? (restLabelProps as LabelProps)
      : ({} as object);

  return (
    <TypographyHTMLTag
      {...labelConditionalProps}
      className={twMerge(
        styles.typography,
        styles[variant],
        styles[color],
        styles[align],
        uppercase && styles.typography__uppercase,
        noWrap && styles.typography__noWrap,
        underline && styles.typography__underline,
        fitContent && styles.typography__fitContent,
        className,
      )}
    >
      {children}
    </TypographyHTMLTag>
  );
};
