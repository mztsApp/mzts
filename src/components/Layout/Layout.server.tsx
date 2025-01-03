import React from 'react';

import { ValueOf } from '@/types';

import { LAYOUT_COMPONENT } from './Layout.constants';
import styles from './Layout.module.scss';
import { Navigation } from './Navigation/Navigation.server';

interface LayoutRootProps extends React.PropsWithChildren {
  as: ValueOf<typeof LAYOUT_COMPONENT>;
}

export const Layout = ({ children, as: LayoutHTMLTag }: LayoutRootProps) => {
  return (
    <LayoutHTMLTag className={styles.layout}>
      <div className={styles.layout_topBarSpace}>
        <Navigation />
      </div>

      <div className={styles.layout_content}>{children}</div>
    </LayoutHTMLTag>
  );
};
