'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import React from 'react';

import ChevronDownIcon from '@/assets/icons/chevronDown.svg';
import { Typography } from '@/components/Typography/Typography.server';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { ALLOWED_BREAKPOINTS, useMedia } from '@/hooks/useMedia';
import { MobileDeviceContext } from '@/providers/MobileDeviceProvider/MobileDeviceProvider';

import { FAQItemType } from '../api/getFAQDataQuery';
import styles from './FAQAccordion.module.scss';

type FAQAccordionProps = {
  items: FAQItemType[];
};

export const FAQAccordion = ({ items }: FAQAccordionProps) => {
  const { isMobileDevice } = React.useContext(MobileDeviceContext);
  const isDesktop = useMedia(ALLOWED_BREAKPOINTS.MIN_LG, isMobileDevice);

  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion className={styles.faqAccordion} type="single" collapsible>
      {items.map(({ question, response }) => (
        <AccordionItem
          key={question}
          value={question}
          className={styles.faqAccordion_item}
        >
          <AccordionTrigger className={styles.faqAccordion_trigger}>
            <Typography
              variant={
                isDesktop ? TYPOGRAPHY_VARIANTS.H4 : TYPOGRAPHY_VARIANTS.BODY
              }
              color={TYPOGRAPHY_COLORS.TEXT}
              className={styles.faqAccordion_triggerText}
            >
              {question}
            </Typography>
            <ChevronDownIcon className={styles.faqAccordion_triggerIcon} />
          </AccordionTrigger>

          <AccordionContent className={styles.faqAccordion_itemContent}>
            <Typography>{response}</Typography>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
