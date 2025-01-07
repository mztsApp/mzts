'use client';

import { twMerge } from 'tailwind-merge';
import React from 'react';

import ChevronUpIcon from '@/assets/icons/chevronUp.svg';
import { useScrollPosition } from '@/hooks/useScrollPosition/useScrollPosition';

import styles from './GoToTopButton.module.scss';

export const GoToTopButton = () => {
  const { scrollTo, isTopPosition } = useScrollPosition();

  return (
    <div
      className={twMerge(
        styles.goToTopButton,
        !isTopPosition && styles.goToTopButton__displayed,
      )}
    >
      <div className={styles.goToTopButton_wrapperContainer}>
        <button
          className={twMerge(styles.goToTopButton_button)}
          onClick={() => scrollTo('top')}
        >
          <ChevronUpIcon className={styles.goToTopButton_chevron} />

          <span className={styles.goToTopButton_srOnly}>
            Przejdź na górę strony
          </span>
        </button>
      </div>
    </div>
  );
};
