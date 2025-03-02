import type { FinalEventPreviewData } from '../SectionList/SectionList.types';
import {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import { EVENTS_PREVIEW_TYPOGRAPHY_COLOR_FROM_API } from './EventsPreview.constants';
import styles from './EventsPreview.module.scss';

export const EventsPreview = async ({
  title,
  subTitle,
  description,
  colorVariant,
}: FinalEventPreviewData) => {
  return (
    <section className={styles.eventsPreview}>
      {Boolean(subTitle) && (
        <Typography
          align={TYPOGRAPHY_ALIGNMENT.CENTER}
          variant={TYPOGRAPHY_VARIANTS.SUBTITLE}
        >
          {subTitle}
        </Typography>
      )}

      <Typography
        as={TYPOGRAPHY_COMPONENTS.H2}
        variant={TYPOGRAPHY_VARIANTS.H2}
        color={EVENTS_PREVIEW_TYPOGRAPHY_COLOR_FROM_API[colorVariant]}
        align={TYPOGRAPHY_ALIGNMENT.CENTER}
      >
        {title}
      </Typography>

      {Boolean(description) && (
        <Typography align={TYPOGRAPHY_ALIGNMENT.CENTER}>
          {description}
        </Typography>
      )}
    </section>
  );
};
