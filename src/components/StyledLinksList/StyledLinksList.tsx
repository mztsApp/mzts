import React from 'react';

import styles from './StyledLinksList.module.scss';
import type { ItemLinkProps } from './StyledLinksListComponent.types';
import { Typography } from '../Typography/Typography.server';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';

const ItemLink = ({
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

const StyledLinksListComponent = ({ children }: React.PropsWithChildren) => {
  return (
    <ul className={styles.styledLinksList}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ItemLink) {
          const key = child.props.title as React.ComponentProps<
            typeof ItemLink
          >['title'];

          return (
            <li key={key} className={styles.styledLinksList_item}>
              {React.cloneElement(child, child.props)}
            </li>
          );
        }

        console.error('Only valid children is LinkItem (StyledLinksList.Item)');

        return null;
      })}
    </ul>
  );
};

type StyledLinksListType = typeof StyledLinksListComponent & {
  Item: typeof ItemLink;
};

const StyledLinksList = StyledLinksListComponent as StyledLinksListType;
StyledLinksList.Item = ItemLink;

export default StyledLinksList;
