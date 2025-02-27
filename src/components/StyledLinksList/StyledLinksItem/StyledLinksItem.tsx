import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import type { ItemLinkProps } from '../StyledLinksListComponent.types';
import styles from '../StyledLinksList.module.scss';

export const ItemLink = ({
  title,
  description,
  href,
  shouldOpenInNewWindow,
}: ItemLinkProps) => {
  const targetProps = shouldOpenInNewWindow
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a className={styles.itemLink} href={href} {...targetProps}>
      <Typography
        as={TYPOGRAPHY_COMPONENTS.SPAN}
        variant={TYPOGRAPHY_VARIANTS.H4}
        className={styles.itemLink_title}
      >
        {title}
      </Typography>
      <Typography
        as={TYPOGRAPHY_COMPONENTS.SPAN}
        variant={TYPOGRAPHY_VARIANTS.BODY3}
        className={styles.itemLink_description}
      >
        {description}
      </Typography>
    </a>
  );
};
