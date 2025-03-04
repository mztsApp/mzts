'use client';

import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area';
import Link from 'next/link';

import AddressIcon from '@/assets/icons/address.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import type { SinglePageType } from '@/api/appNavigationQuery';
import { Typography } from '@/components/Typography/Typography.server';
import {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';

import type { EventsPageData } from '../SideNavigationApi.types';
import styles from './SideNavigationTabs.module.scss';
import { getPagesByDate } from './utilities/getPagesByDate';

type Page = Omit<EventsPageData, 'slug'> & { slug: SinglePageType };

export type SideNavigationTabsProps = {
  pages: Page[];
  currentSlug?: string;
};

export const SideNavigationTabs = ({
  pages,
  currentSlug,
}: SideNavigationTabsProps) => {
  const { past, upcoming } = getPagesByDate(pages);

  return (
    <nav className={styles.sideNavigation} aria-label="wydarzenia - navigacja">
      <ScrollArea className={styles.sideNavigation_scrollArea}>
        <ScrollAreaViewport
          className={styles.sideNavigation_scrollAreaViewport}
        >
          <ul className={styles.sideNavigation_scrollAreaList}>
            {upcoming.map((page) => (
              <li
                key={page.metaTitle}
                data-isActive={currentSlug === page.slug.slug}
              >
                <Link
                  href={`/${page.slug.subpage}/${page.slug.slug}`}
                  className={styles.sideNavigation_link}
                  data-is-active={currentSlug === page.slug.slug}
                >
                  <div className={styles.sideNavigation_card}>
                    <div className={styles.sideNavigation_cardBadgeContainer}>
                      {currentSlug === page.slug.slug && (
                        <span className={styles.sideNavigation_cardBadge}>
                          Podgląd
                        </span>
                      )}
                      <span className={styles.sideNavigation_cardBadge}>
                        {page.eventType}
                      </span>
                    </div>

                    <Typography
                      className={styles.sideNavigation_cardTitle}
                      variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                      align={TYPOGRAPHY_ALIGNMENT.CENTER}
                    >
                      {page.title}
                    </Typography>

                    <Typography
                      className={styles.sideNavigation_cardDescription}
                      variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
                      align={TYPOGRAPHY_ALIGNMENT.CENTER}
                    >
                      {page.description}
                    </Typography>

                    <div className={styles.sideNavigation_cardIconsWrapper}>
                      <Typography
                        className={styles.sideNavigation_cardAdditionalInfo}
                        variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
                        align={TYPOGRAPHY_ALIGNMENT.CENTER}
                        noWrap
                      >
                        <CalendarIcon
                          className={styles.sideNavigation_cardIcon}
                        />{' '}
                        {page.date}
                      </Typography>
                      <Typography
                        className={styles.sideNavigation_cardAdditionalInfo}
                        variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
                        align={TYPOGRAPHY_ALIGNMENT.CENTER}
                        noWrap
                      >
                        <AddressIcon
                          className={styles.sideNavigation_cardIcon}
                        />{' '}
                        {page.location}
                      </Typography>
                    </div>
                  </div>
                </Link>
              </li>
            ))}

            {past.map((page) => (
              <li key={page.metaTitle}>
                <Link
                  href={`/${page.slug.subpage}/${page.slug.slug}`}
                  className={styles.sideNavigation_link}
                  data-is-active={currentSlug === page.slug.slug}
                >
                  <div className={styles.sideNavigation_card}>
                    <div className={styles.sideNavigation_cardBadgeContainer}>
                      {currentSlug === page.slug.slug && (
                        <span className={styles.sideNavigation_cardBadge}>
                          Podgląd
                        </span>
                      )}

                      <span className={styles.sideNavigation_cardBadge}>
                        {page.eventType}
                      </span>
                    </div>

                    <Typography
                      className={styles.sideNavigation_cardTitle}
                      variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                      align={TYPOGRAPHY_ALIGNMENT.CENTER}
                    >
                      {page.title}
                    </Typography>

                    <Typography
                      className={styles.sideNavigation_cardDescription}
                      variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
                      align={TYPOGRAPHY_ALIGNMENT.CENTER}
                    >
                      {page.description}
                    </Typography>

                    <div className={styles.sideNavigation_cardIconsWrapper}>
                      <Typography
                        className={styles.sideNavigation_cardAdditionalInfo}
                        variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
                        align={TYPOGRAPHY_ALIGNMENT.CENTER}
                        noWrap
                      >
                        <CalendarIcon
                          className={styles.sideNavigation_cardIcon}
                        />{' '}
                        {page.date}
                      </Typography>
                      <Typography
                        className={styles.sideNavigation_cardAdditionalInfo}
                        variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
                        align={TYPOGRAPHY_ALIGNMENT.CENTER}
                        noWrap
                      >
                        <AddressIcon
                          className={styles.sideNavigation_cardIcon}
                        />{' '}
                        {page.location}
                      </Typography>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollAreaViewport>

        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </nav>
  );
};
