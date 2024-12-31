'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import CloseIcon from '/src/assets/icons/close.svg';
import MenuIcon from '/src/assets/icons/menu.svg';
import DesktopLogo from '/src/assets/icons/mztsDesktop.svg';
import MobileLogo from '/src/assets/icons/mztsMoblie.svg';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { SinglePageType } from '@/api/appNavigationQuery';
import { Typography } from '@/components/Typography/Typography.server';
import { ALLOWED_BREAKPOINTS, useMedia } from '@/hooks/useMedia';
import { useScrollPosition } from '@/hooks/useScrollPosition/useScrollPosition';
import { getResolvedTextFromSlug } from '@/utilities/getResolvedTextFromSlug';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';

import styles from './Navigation.module.scss';
import { getGroupedNavigationLinksBySubPage } from './utilities/getGroupedNavigationLinksBySubPage';
import { NavigationItemWithDropdown } from './NavigationItemWithDropdown';
import { NavigationItemAccordion } from './NavigationItemAccordion.client';

type MenuState = {
  isMenuOpen: boolean;
  isMobileMenuListAlreadyExist: boolean;
};

type NavigationClientProps = React.PropsWithChildren<{
  links: SinglePageType[];
}>;

const defaultMenuState: MenuState = {
  isMenuOpen: false,
  isMobileMenuListAlreadyExist: false,
};

export const NavigationClient = ({
  children,
  links,
}: NavigationClientProps) => {
  const [menuState, setMenuState] = React.useState<MenuState>(defaultMenuState);

  const isDesktop = useMedia(ALLOWED_BREAKPOINTS.MIN_LG);
  const { scrollTo, isTopPosition, toggleScrolling } = useScrollPosition();
  const path = usePathname();

  const params = path.split('/');

  const handleMenuButtonClick = () => {
    scrollTo('top');

    setMenuState((prev) => {
      if (prev.isMenuOpen) {
        return { isMobileMenuListAlreadyExist: false, isMenuOpen: false };
      }

      return { isMobileMenuListAlreadyExist: false, isMenuOpen: true };
    });
  };

  React.useEffect(() => {
    if (!isDesktop && menuState.isMenuOpen && isTopPosition) {
      setMenuState({ isMenuOpen: true, isMobileMenuListAlreadyExist: true });

      toggleScrolling(true);
    } else {
      setMenuState({ isMenuOpen: false, isMobileMenuListAlreadyExist: false });

      toggleScrolling(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState.isMenuOpen, isTopPosition, isDesktop]);

  const groupedLinksBySubPages = getGroupedNavigationLinksBySubPage(links);

  return (
    <div className={styles.navBar}>
      <div className={styles.navBar_contact}>{children}</div>

      <div className={styles.navBar_navigationContainer}>
        <nav className={styles.navigation}>
          <a className={styles.navigation_logoLink} href="/">
            {isDesktop ? (
              <DesktopLogo className={styles.navigation_desktopLogo} />
            ) : (
              <MobileLogo className={styles.navigation_logo} />
            )}
            <span className={styles.navigation_logoTitle}>
              Mazowiecki związek tańca sportowego
            </span>
          </a>

          {!isDesktop && (
            <button
              type="button"
              aria-label="Otwórz / Zamknij menu"
              aria-describedby={
                menuState.isMenuOpen
                  ? 'Naciśnij aby zamknąć menu'
                  : 'Naciśnij aby otworzyć menu'
              }
              className={styles.navigation_toggleMenuButton}
              onClick={() => handleMenuButtonClick()}
            >
              {menuState.isMenuOpen ? (
                <CloseIcon className={styles.navigation_toggleMenuIcon} />
              ) : (
                <MenuIcon className={styles.navigation_toggleMenuIcon} />
              )}
            </button>
          )}

          {((!isDesktop && menuState.isMenuOpen) || isDesktop) && (
            <ul
              className={twMerge(
                styles.navigation_list,
                isDesktop && styles.navigation_list__desktop,
                menuState.isMobileMenuListAlreadyExist &&
                  styles.navigation_list__fullHeight,
              )}
            >
              {groupedLinksBySubPages.nestedPages.map((nestedPage) => (
                <li key={nestedPage.subPage}>
                  {isDesktop ? (
                    <NavigationItemWithDropdown nestedPage={nestedPage} />
                  ) : (
                    <NavigationItemAccordion
                      nestedPage={nestedPage}
                      handleLinkClick={() => setMenuState(defaultMenuState)}
                    />
                  )}
                </li>
              ))}

              {groupedLinksBySubPages.restPages.map((page) => (
                <li key={page}>
                  <Link
                    href={`/${page}`}
                    onClick={() => setMenuState(defaultMenuState)}
                    className={twMerge(
                      styles.navigation_link,
                      params.includes(page) && styles.navigation_link__active,
                    )}
                  >
                    <Typography
                      as={TYPOGRAPHY_COMPONENTS.SPAN}
                      variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                    >
                      {getResolvedTextFromSlug(page)}
                    </Typography>
                  </Link>
                </li>
              ))}

              <li className={styles.navigation_listItem}>
                <Link
                  href="/przyklad-komponentow"
                  onClick={() => setMenuState(defaultMenuState)}
                  className={twMerge(
                    styles.navigation_link,
                    params.includes('przyklad-komponentow') &&
                      styles.navigation_link__active,
                  )}
                >
                  <Typography
                    as={TYPOGRAPHY_COMPONENTS.SPAN}
                    variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                  >
                    {getResolvedTextFromSlug('przyklad komponentów')}
                  </Typography>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};
