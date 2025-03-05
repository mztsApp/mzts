'use client';

import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import ChevronUpIcon from '@/assets/icons/chevronUp.svg';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';
import type { NestedPages } from '@/utilities/getGroupedPagesBySubPage';
import { getResolvedTextFromSlug } from '@/utilities/getResolvedTextFromSlug';

import { NAVIGATION_ALL_EVENTS_PAGE } from './Navigation.constants';
import styles from './Navigation.module.scss';

type NavigationItemWithDropdownProps = {
  nestedPage: NestedPages;
};

export const NavigationItemWithDropdown = ({
  nestedPage,
}: NavigationItemWithDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const path = usePathname();
  const params = path.split('/');

  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <PopoverTrigger className={styles.navigationItemWithDropdown_trigger}>
        <Typography
          as={TYPOGRAPHY_COMPONENTS.SPAN}
          variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
        >
          {getResolvedTextFromSlug(nestedPage.subPage)}
        </Typography>

        <ChevronUpIcon
          className={styles.navigationItemWithDropdown_chevronUp}
        />
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          className={styles.navigationItemWithDropdown_content}
          align="end"
          side="bottom"
          sideOffset={12}
        >
          <ul className={styles.navigationItemWithDropdown_list}>
            {nestedPage.pages.map((page) => {
              if (page === NAVIGATION_ALL_EVENTS_PAGE) {
                return (
                  <React.Fragment key={page}>
                    <li
                      className={
                        styles.navigationItemWithDropdown_listSeparator
                      }
                    />

                    <li className={styles.navigationItemWithDropdown_listItem}>
                      <Link
                        href={`/${nestedPage.subPage}`}
                        onClick={() => setIsOpen(false)}
                        className={twMerge(
                          styles.navigationItemWithDropdown_link,
                          params.includes(page) &&
                            styles.navigationItemWithDropdown_link__active,
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
                  </React.Fragment>
                );
              }

              return (
                <li
                  key={page}
                  className={styles.navigationItemWithDropdown_listItem}
                >
                  <Link
                    href={`/${nestedPage.subPage}/${page}`}
                    onClick={() => setIsOpen(false)}
                    className={twMerge(
                      styles.navigationItemWithDropdown_link,
                      params.includes(page) &&
                        styles.navigationItemWithDropdown_link__active,
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
              );
            })}
          </ul>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
