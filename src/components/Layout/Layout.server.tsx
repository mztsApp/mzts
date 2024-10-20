import React from "react";
import { LAYOUT_COMPONENTS } from "./Layout.constants";
import styles from "./Layout.module.scss";
import { ValueOf } from "@/types";

interface LayoutRootProps extends React.PropsWithChildren {
  as: ValueOf<typeof LAYOUT_COMPONENTS>;
}

export const Layout = ({
  children,
  as: HTMLTag = LAYOUT_COMPONENTS.MAIN,
}: LayoutRootProps) => {
  return <HTMLTag className={styles.layout}>{children}</HTMLTag>;
};
