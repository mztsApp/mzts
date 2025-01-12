import React from 'react';
import Link from 'next/link';

import { ValueOf } from '@/types';

import {
  BUTTON_COMPONENTS,
  BUTTON_SIZES,
  BUTTON_TEXT_VARIANT_TYPOGRAPHY_SIZES,
  BUTTON_VARIANTS,
} from './Button.constants';

export type AsNextLinkProps = {
  as?: typeof BUTTON_COMPONENTS.NEXT_LINK;
} & Omit<React.ComponentProps<typeof Link>, 'className'>;

export type AsAnchorProps = {
  as?: typeof BUTTON_COMPONENTS.ANCHOR;
} & Omit<React.ComponentProps<'a'>, 'className'>;

export type AsButtonProps = {
  as?: typeof BUTTON_COMPONENTS.BUTTON;
} & Omit<React.ComponentProps<'button'>, 'className'>;

type ComponentIndividualConditionalProps =
  | AsNextLinkProps
  | AsAnchorProps
  | AsButtonProps;

type VariantBaseProps =
  | {
      variant?: typeof BUTTON_VARIANTS.TEXT;
      typographySize?: ValueOf<typeof BUTTON_TEXT_VARIANT_TYPOGRAPHY_SIZES>;
      underline?: boolean;
    }
  | {
      variant?: ValueOf<typeof BUTTON_VARIANTS>;
      typographySize: never;
      underline: never;
    };

type ButtonInternalProps = {
  size?: ValueOf<typeof BUTTON_SIZES>;
  StartIcon?: React.ReactNode;
  EndIcon?: React.ReactNode;
  disableUppercase?: boolean;
  mobileFullWidth?: boolean;
  desktopFullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonCombinedProps = ButtonInternalProps &
  ComponentIndividualConditionalProps & {
    as?: ValueOf<typeof BUTTON_COMPONENTS>;
  } & VariantBaseProps;

export type ButtonProps = React.PropsWithChildren<ButtonCombinedProps>;
