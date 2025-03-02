import React from 'react';
import { headers } from 'next/headers';

import type { ValueOf } from '@/types';
import { MobileDeviceProvider } from '@/providers/MobileDeviceProvider/MobileDeviceProvider';
import { SideNavigation } from '@/components/SideNavigation/SideNavigation';

import type { LAYOUT_COMPONENT } from '../Layout.constants';
import styles from './EventsLayout.module.scss';
import { GoToTopButton } from '../../GoToTopButton/GoToTopButton.client';
import { Footer } from '../../Footer/Footer.server';
import { Navigation } from '../../Navigation/Navigation.server';

interface LayoutRootProps extends React.PropsWithChildren {
  as: ValueOf<typeof LAYOUT_COMPONENT>;
  slug?: string;
}

export const EventsLayout = async ({
  children,
  slug,
  as: LayoutHTMLTag,
}: LayoutRootProps) => {
  const userAgent = headers().get('user-agent') || '';
  const isMobileDevice = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  return (
    <MobileDeviceProvider isMobileDevice={isMobileDevice}>
      <LayoutHTMLTag className={styles.eventsLayout}>
        <div className={styles.eventsLayout_topBarSpace}>
          <Navigation />
        </div>

        <div className={styles.eventsLayout_contentContainer}>
          <div className={styles.eventsLayout_sideNavigation}>
            <SideNavigation slug={slug} />
          </div>
          <div className={styles.eventsLayout_content}>{children}</div>
        </div>

        <GoToTopButton />

        <Footer />
      </LayoutHTMLTag>
    </MobileDeviceProvider>
  );
};
