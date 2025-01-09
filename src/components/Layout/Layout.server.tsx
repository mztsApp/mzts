import React from 'react';
import { headers } from 'next/headers';

import { ValueOf } from '@/types';
import { MobileDeviceProvider } from '@/providers/MobileDeviceProvider/MobileDeviceProvider';

import { LAYOUT_COMPONENT } from './Layout.constants';
import styles from './Layout.module.scss';
import { Navigation } from './Navigation/Navigation.server';

interface LayoutRootProps extends React.PropsWithChildren {
  as: ValueOf<typeof LAYOUT_COMPONENT>;
}

export const Layout = ({ children, as: LayoutHTMLTag }: LayoutRootProps) => {
  const userAgent = headers().get('user-agent') || '';
  const isMobileDevice = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  return (
    <MobileDeviceProvider isMobileDevice={isMobileDevice}>
      <LayoutHTMLTag className={styles.layout}>
        <div className={styles.layout_topBarSpace}>
          <Navigation />
        </div>

        <div className={styles.layout_content}>{children}</div>
      </LayoutHTMLTag>
    </MobileDeviceProvider>
  );
};
