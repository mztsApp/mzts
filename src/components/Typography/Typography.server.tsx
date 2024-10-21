import { ValueOf } from "@/types";
import React from "react";
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from "./Typography.constants";
import { twMerge } from "tailwind-merge";
import styles from "./Typography.module.scss";

type TypographyProps = React.PropsWithChildren<{
  as?: ValueOf<typeof TYPOGRAPHY_COMPONENTS>;
  variant?: ValueOf<typeof TYPOGRAPHY_VARIANTS>;
  color?: ValueOf<typeof TYPOGRAPHY_COLORS>;
  uppercase?: boolean;
}>;

export const Typography = ({
  as: TypographyHTMLTag = TYPOGRAPHY_COMPONENTS.PARAGRAPH,
  variant = TYPOGRAPHY_VARIANTS.BODY,
  color = TYPOGRAPHY_COLORS.TEXT,
  uppercase = false,
  children,
}: TypographyProps) => {
  return (
    <TypographyHTMLTag
      className={twMerge(
        styles.typography,
        styles[variant],
        styles[color],
        uppercase && styles.typography__uppercase
      )}
    >
      {children}
    </TypographyHTMLTag>
  );
};
