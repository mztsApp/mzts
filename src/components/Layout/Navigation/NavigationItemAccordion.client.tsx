'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';
import { getResolvedTextFromSlug } from '@/utilities/getResolvedTextFromSlug';
import ChevronUpIcon from '@/assets/icons/chevronUp.svg';

import styles from './Navigation.module.scss';
import type { NestedPages } from './utilities/getGroupedNavigationLinksBySubPage';

type NavigationItemAccordionProps = {
  nestedPage: NestedPages;
  handleLinkClick: () => void;
};

export const NavigationItemAccordion = ({
  nestedPage,
  handleLinkClick,
}: NavigationItemAccordionProps) => {
  const path = usePathname();
  const params = path.split('/');

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={
        params.includes(nestedPage.subPage) ? nestedPage.subPage : undefined
      }
    >
      <AccordionItem value={nestedPage.subPage}>
        <AccordionTrigger className={styles.navigationItemAccordion_trigger}>
          <Typography
            as={TYPOGRAPHY_COMPONENTS.SPAN}
            variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
          >
            {getResolvedTextFromSlug(nestedPage.subPage)}
          </Typography>

          <ChevronUpIcon className={styles.navigationItemAccordion_chevronUp} />
        </AccordionTrigger>

        <AccordionContent className={styles.navigationItemAccordion_content}>
          <ul className={styles.navigationItemAccordion_list}>
            {nestedPage.pages.map((page) => (
              <li
                key={page}
                className={styles.navigationItemAccordion_listItem}
              >
                <Link
                  href={`/${nestedPage.subPage}/${page}`}
                  onClick={() => handleLinkClick()}
                  className={twMerge(
                    styles.navigationItemAccordion_link,
                    params.includes(page) &&
                      styles.navigationItemAccordion_link__active,
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
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
