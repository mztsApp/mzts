import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area';
import { twMerge } from 'tailwind-merge';

import type { ValueOf } from '@/types';

import { TYPOGRAPHY_VARIANTS } from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import styles from './Table.module.scss';
import {
  TABLE_Component_ALIGNMENT_FROM_API,
  type TABLE_ALIGNMENT,
} from '../TablePageSection/TablePageSection.constants';

type TableProps = {
  tableHeadCells: string[];
  tableCells: string[][];
  tableAlignment: ValueOf<typeof TABLE_ALIGNMENT>;
};

export const Table = ({
  tableHeadCells,
  tableCells,
  tableAlignment,
}: TableProps) => {
  return (
    <ScrollArea
      className={twMerge(
        styles.scrollArea,
        styles[TABLE_Component_ALIGNMENT_FROM_API[tableAlignment]],
      )}
      type="auto"
    >
      <ScrollAreaViewport className={styles.scrollArea_viewport}>
        <table className={styles.table}>
          <thead className={styles.table_headRow}>
            <tr>
              {tableHeadCells.map((headCell) => (
                <th className={styles.table_headCell} key={headCell}>
                  <Typography variant={TYPOGRAPHY_VARIANTS.BODY2}>
                    {headCell}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableCells.map((row) => {
              return (
                <tr key={`row-${row[0]}`}>
                  {row.map((cell) => (
                    <td className={styles.table_cell} key={cell}>
                      <Typography variant={TYPOGRAPHY_VARIANTS.BODY2}>
                        {cell}
                      </Typography>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </ScrollAreaViewport>

      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
};
