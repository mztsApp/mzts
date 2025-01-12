import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import CircleLoadingIcon from '@/assets/icons/circleLoading.svg';

import {
  BUTTON_COLORS,
  BUTTON_COMPONENTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from './Button.constants';
import {
  AsAnchorProps,
  AsButtonProps,
  AsNextLinkProps,
  ButtonProps,
} from './Button.types';
import styles from './Button.module.scss';
import { Typography } from '../Typography/Typography.server';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';

export const Button = ({
  as: HTMLButtonTag = BUTTON_COMPONENTS.BUTTON,
  variant = BUTTON_VARIANTS.FILLED,
  size = BUTTON_SIZES.MEDIUM,
  StartIcon,
  EndIcon,
  className: externalClassName,
  children,
  color = BUTTON_COLORS.ACCENT,
  mobileFullWidth = false,
  desktopFullWidth = false,
  disableUppercase = false,
  loading = false,
  disabled = false,
  typographySize,
  darkHover,
  underline,
  ...restPropsRelatedWithComponent
}: ButtonProps) => {
  const withUnderline =
    variant === BUTTON_VARIANTS.TEXT
      ? typeof underline === 'undefined'
        ? true
        : underline
      : false;

  const variantBaseTypography =
    variant === BUTTON_VARIANTS.TEXT
      ? Boolean(typographySize)
        ? typographySize
        : TYPOGRAPHY_VARIANTS.BUTTON_TEXT
      : TYPOGRAPHY_VARIANTS.BUTTON_TEXT;

  const withDarkHover = variant === BUTTON_VARIANTS.TEXT ? darkHover : false;

  const commonButtonClassName = twMerge(
    styles.button,
    styles[variant],
    styles[size],
    styles[color],
    (loading || disabled) && styles.button__disabled,
    mobileFullWidth && styles.button__mobileFullWidth,
    desktopFullWidth && styles.button__desktopFullWidth,
    withDarkHover && styles.button__withDarkHover,
    externalClassName,
  );

  if (disabled || loading) {
    return (
      <div className={commonButtonClassName}>
        <div className={styles.button_iconWrapper}>
          {loading ? (
            <CircleLoadingIcon className={styles.button_loadingIcon} />
          ) : (
            StartIcon
          )}
        </div>
        <Typography
          noWrap
          as={TYPOGRAPHY_COMPONENTS.SPAN}
          variant={variantBaseTypography}
          color={
            color === BUTTON_COLORS.TEXT_COLOR
              ? TYPOGRAPHY_COLORS.ACCENT
              : TYPOGRAPHY_COLORS.TEXT
          }
          uppercase={!disableUppercase}
          underline={withUnderline}
          className={styles.button_typography}
        >
          {children}
        </Typography>
        <div className={styles.button_iconWrapper}>{EndIcon}</div>
      </div>
    );
  }

  switch (HTMLButtonTag) {
    case BUTTON_COMPONENTS.NEXT_LINK:
      return (
        <Link
          className={commonButtonClassName}
          {...(restPropsRelatedWithComponent as AsNextLinkProps)}
        >
          <div className={styles.button_iconWrapper}>
            {loading ? (
              <CircleLoadingIcon className={styles.button_loadingIcon} />
            ) : (
              StartIcon
            )}
          </div>
          <Typography
            noWrap
            as={TYPOGRAPHY_COMPONENTS.SPAN}
            variant={variantBaseTypography}
            color={
              color === BUTTON_COLORS.TEXT_COLOR
                ? TYPOGRAPHY_COLORS.ACCENT
                : TYPOGRAPHY_COLORS.TEXT
            }
            uppercase={!disableUppercase}
            underline={withUnderline}
            className={styles.button_typography}
          >
            {children}
          </Typography>
          <div className={styles.button_iconWrapper}>{EndIcon}</div>
        </Link>
      );

    case BUTTON_COMPONENTS.ANCHOR:
      return (
        <HTMLButtonTag
          className={commonButtonClassName}
          {...(restPropsRelatedWithComponent as AsAnchorProps)}
        >
          <div className={styles.button_iconWrapper}>
            {loading ? (
              <CircleLoadingIcon className={styles.button_loadingIcon} />
            ) : (
              StartIcon
            )}
          </div>
          <Typography
            noWrap
            as={TYPOGRAPHY_COMPONENTS.SPAN}
            variant={variantBaseTypography}
            color={
              color === BUTTON_COLORS.TEXT_COLOR
                ? TYPOGRAPHY_COLORS.ACCENT
                : TYPOGRAPHY_COLORS.TEXT
            }
            uppercase={!disableUppercase}
            underline={withUnderline}
            className={styles.button_typography}
          >
            {children}
          </Typography>
          <div className={styles.button_iconWrapper}>{EndIcon}</div>
        </HTMLButtonTag>
      );

    case BUTTON_COMPONENTS.BUTTON:
      return (
        <HTMLButtonTag
          className={commonButtonClassName}
          {...(restPropsRelatedWithComponent as AsButtonProps)}
        >
          <div className={styles.button_iconWrapper}>
            {loading ? (
              <CircleLoadingIcon className={styles.button_loadingIcon} />
            ) : (
              StartIcon
            )}
          </div>
          <Typography
            noWrap
            as={TYPOGRAPHY_COMPONENTS.SPAN}
            variant={variantBaseTypography}
            color={
              color === BUTTON_COLORS.TEXT_COLOR
                ? TYPOGRAPHY_COLORS.ACCENT
                : TYPOGRAPHY_COLORS.TEXT
            }
            uppercase={!disableUppercase}
            underline={withUnderline}
            className={styles.button_typography}
          >
            {children}
          </Typography>
          <div className={styles.button_iconWrapper}>{EndIcon}</div>
        </HTMLButtonTag>
      );

    default:
      return null;
  }
};
