import React from "react";
import { LAYOUT_COMPONENT } from "./Layout.constants";
import styles from "./Layout.module.scss";
import { ValueOf } from "@/types";

interface LayoutRootProps extends React.PropsWithChildren {
  as: ValueOf<typeof LAYOUT_COMPONENT>;
}

export const Layout = ({ children, as: LayoutHTMLTag }: LayoutRootProps) => {
  return (
    <LayoutHTMLTag className={styles.layout}>
      {children}

      <h1 className={styles.layout_title}>Dupa - test</h1>

      <span className={styles.layout_separator} />

      <p className={styles.layout_description}>
        test dupa test dupa text test dupa test dupa text test dupa test dupa
        text test dupa test dupa text
      </p>

      <div className={styles.layout_box} />
    </LayoutHTMLTag>
  );
};
