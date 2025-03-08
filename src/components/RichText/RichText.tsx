import type { Options } from '@contentful/rich-text-react-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';
import React from 'react';

import { Button } from '../Button/Button';
import {
  BUTTON_COMPONENTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from '../Button/Button.constants';
import { Typography } from '../Typography/Typography.server';
import styles from './RichText.module.scss';
import { TYPOGRAPHY_COMPONENTS } from '../Typography/Typography.constants';

type RichTextProps = {
  richText: Document;
};

const config: Options = {
  preserveWhitespace: true,
  renderNode: {
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className={styles.richText_list}>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className={styles.richText_list}>{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => (
      <li className={styles.richText_listItem}>{children}</li>
    ),
    [INLINES.HYPERLINK]: (node, children) => {
      const href = node.data?.uri ?? '';

      return (
        <Button
          href={href}
          as={BUTTON_COMPONENTS.ANCHOR}
          variant={BUTTON_VARIANTS.TEXT}
          size={BUTTON_SIZES.MEDIUM}
        >
          {children}
        </Button>
      );
    },
  },
  renderText: (text) => {
    const arrayOfLines = text.split('\n');

    return arrayOfLines.reduce<(string | JSX.Element)[]>(
      (accumulator, textSegment, index) => {
        return [
          ...accumulator,
          index > 0 ? (
            <React.Fragment key={textSegment}>
              <br /> <br />
            </React.Fragment>
          ) : (
            ''
          ),
          textSegment,
        ];
      },
      [],
    );
  },
};

export const RichText = ({ richText }: RichTextProps) => {
  return (
    <Typography className={styles.richText} as={TYPOGRAPHY_COMPONENTS.DIV}>
      {documentToReactComponents(richText, config)}
    </Typography>
  );
};
