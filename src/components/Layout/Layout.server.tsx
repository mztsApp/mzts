import React from "react";
import { LAYOUT_COMPONENT } from "./Layout.constants";
import styles from "./Layout.module.scss";
import { ValueOf } from "@/types";
import ChevronRight from "/src/assets/icons/chevronRight.svg";
import { Typography } from "../Typography/Typography.server";
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from "../Typography/Typography.constants";
import { twMerge } from "tailwind-merge";

interface LayoutRootProps extends React.PropsWithChildren {
  as: ValueOf<typeof LAYOUT_COMPONENT>;
}

export const Layout = ({ children, as: LayoutHTMLTag }: LayoutRootProps) => {
  return (
    <LayoutHTMLTag className={styles.layout}>
      {children}

      <Typography
        as={TYPOGRAPHY_COMPONENTS.H1}
        variant={TYPOGRAPHY_VARIANTS.H1}
        color={TYPOGRAPHY_COLORS.GRADIENT_RIGHT}
      >
        Dupa - test
      </Typography>

      <span className={styles.layout_separator} />

      <Typography variant={TYPOGRAPHY_VARIANTS.H3}>
        test dupa test dupa text test dupa test dupa text test dupa test dupa
        text test dupa test dupa text
      </Typography>

      <Typography color={TYPOGRAPHY_COLORS.GRADIENT_LEFT}>
        test dupa test dupa text test dupa test dupa text test dupa test dupa
        text test dupa test dupa text
      </Typography>

      <Typography
        variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
        color={TYPOGRAPHY_COLORS.ACCENT}
      >
        test dupa test dupa text test dupa test dupa text test dupa test dupa
        text test dupa test dupa text
      </Typography>

      <Typography variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}>
        test dupa test dupa text test dupa test dupa text test dupa test dupa
        text test dupa test dupa text
      </Typography>

      <div className={styles.layout_box} />

      <div className={styles.layout_iconContainer}>
        <ChevronRight className={styles.layout_icon} />
        <ChevronRight
          className={twMerge(styles.layout_icon, styles.layout_icon__default)}
        />
        <ChevronRight className={styles.layout_icon} />
        <ChevronRight
          className={twMerge(styles.layout_icon, styles.layout_icon__default)}
        />
      </div>

      <div className={styles.layout_textContainer}>
        <Typography uppercase variant="typography__buttonText">
          In addition to the main focus, its important to consider the subtle
          details that contribute to the overall experience. These secondary
          elements might not be in the spotlight, but they play a crucial role
          in supporting the primary content. Whether its design, functionality,
          or messaging, the balance between the main and the auxiliary aspects
          ensures a cohesive and seamless experience for the user
        </Typography>
      </div>
    </LayoutHTMLTag>
  );
};
