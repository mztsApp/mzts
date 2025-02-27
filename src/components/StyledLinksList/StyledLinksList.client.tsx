'use client';

import React from 'react';

import styles from './StyledLinksList.module.scss';
import { ItemLink } from './StyledLinksItem/StyledLinksItem';

const StyledLinksListComponent = ({ children }: React.PropsWithChildren) => {
  const [lastActiveItem, setLastActiveItem] = React.useState<number | null>(0);

  return (
    <ul className={styles.styledLinksList}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === ItemLink) {
          const key = child.props.title as React.ComponentProps<
            typeof ItemLink
          >['title'];

          return (
            <li
              key={key}
              data-is-active={index === lastActiveItem}
              className={styles.styledLinksList_item}
              onFocus={() => setLastActiveItem(index)}
            >
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

export { StyledLinksList };
