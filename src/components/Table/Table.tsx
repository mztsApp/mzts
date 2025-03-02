import { ScrollArea } from '@radix-ui/react-scroll-area';

import { Typography } from '../Typography/Typography.server';
import styles from './Table.module.scss';

type TableProps = {
  tableHeadCells: string[];
  tableCells: string[][];
};

export const Table = ({ tableHeadCells, tableCells }: TableProps) => {
  return (
    <ScrollArea>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableHeadCells.map((headCell) => (
              <th key={headCell}>
                <Typography>{headCell}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableCells.map((row) => {
            return (
              <tr key={`row-${row[0]}`}>
                {row.map((cell) => (
                  <td key={cell}>
                    <Typography>{cell}</Typography>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </ScrollArea>
  );
};
