import { twMerge } from 'tailwind-merge';

import type { FinalTableData } from '@/components/SectionList/SectionList.types';

import { Table } from '../Table/Table';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import { getTablePageSectionData } from './api/getTablePageSectionData';
import {
  TABLE_ALIGNMENT_FROM_API,
  TABLE_COLOR_FROM_API,
  TYPOGRAPHY_ALIGNMENT_FROM_TABLE,
} from './TablePageSection.constants';
import styles from './TablePageSection.module.scss';

export const TablePageSection = async ({
  title,
  description,
  alignmentVariant,
  colorVariant,
  tableAssetId,
}: FinalTableData) => {
  const { data } = await getTablePageSectionData(tableAssetId);

  if (!data) return null;

  return (
    <section
      className={twMerge(
        styles.tablePageSection,
        styles[TABLE_ALIGNMENT_FROM_API[alignmentVariant]],
      )}
    >
      <Typography
        as={TYPOGRAPHY_COMPONENTS.H2}
        variant={TYPOGRAPHY_VARIANTS.H2}
        align={TYPOGRAPHY_ALIGNMENT_FROM_TABLE[alignmentVariant]}
        color={TABLE_COLOR_FROM_API[colorVariant]}
      >
        {title}
      </Typography>

      {Boolean(description) && (
        <Typography align={TYPOGRAPHY_ALIGNMENT_FROM_TABLE[alignmentVariant]}>
          {description}
        </Typography>
      )}

      <Table
        tableAlignment={alignmentVariant}
        tableHeadCells={data.tableHeadCells}
        tableCells={data.tableCells}
      />
    </section>
  );
};
