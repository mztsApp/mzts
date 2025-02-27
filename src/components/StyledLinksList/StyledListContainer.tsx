'use client';

import { StyledLinksList } from './StyledLinksList.client';

type StyledListContainer = {
  shouldOpenInNewWindow: boolean;
  title: string;
  description?: string;
  href: string;
};

export const StyledList = (props: Record<'items', StyledListContainer[]>) => {
  return (
    <>
      <StyledLinksList>
        {props.items.map((LinkProps) => (
          <StyledLinksList.Item {...LinkProps} key={LinkProps.title} />
        ))}
      </StyledLinksList>
    </>
  );
};
