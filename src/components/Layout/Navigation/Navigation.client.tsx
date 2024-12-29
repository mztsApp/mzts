'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components/Typography/Typography.server';
import { ALLOWED_BREAKPOINTS, useMedia } from '@/hooks/useMedia';
import { useScrollPosition } from '@/hooks/useScrollPosition/useScrollPosition';

import styles from './Navigation.module.scss';

type MenuState = {
  isMenuOpen: boolean;
  isMobileMenuListAlreadyExist: boolean;
};

const defaultMenuState: MenuState = {
  isMenuOpen: false,
  isMobileMenuListAlreadyExist: false,
};

export const NavigationClient = ({ children }: React.PropsWithChildren) => {
  const [menuState, setMenuState] = React.useState<MenuState>(defaultMenuState);

  const isDesktop = useMedia(ALLOWED_BREAKPOINTS.MIN_LG);
  const { scrollTo, isTopPosition, toggleScrolling } = useScrollPosition();

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
  }, [menuState.isMenuOpen, isTopPosition, isDesktop]);

  return (
    <div className={styles.navBar}>
      <div className={styles.navBar_contact}>{children}</div>

      <div className={styles.navBar_navigationContainer}>
        <nav className={styles.navigation}>
          <a className={styles.navigation_logo} href="/">
            <Typography>MZTS</Typography>
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
              menu
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
            ></ul>
          )}
        </nav>
      </div>
    </div>
  );
};
