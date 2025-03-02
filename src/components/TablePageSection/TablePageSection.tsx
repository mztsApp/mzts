import { twMerge } from 'tailwind-merge';

import type { FinalTableData } from '@/components/SectionList/SectionList.types';

import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import {
  TABLE_COLOR_FROM_API,
  TYPOGRAPHY_ALIGNMENT_FROM_TABLE,
} from './TablePageSection.constants';
import { getTablePageSectionData } from './api/getTablePageSectionData';
import styles from './TablePageSection.module.scss';
import { Table } from '../Table/Table';

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
    <section className={twMerge(styles.tablePageSection)}>
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
        tableHeadCells={data.tableHeadCells}
        tableCells={data.tableCells}
      />
    </section>
  );
};
