import Image from 'next/image';

import { Button } from '@/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_COMPONENTS,
  BUTTON_VARIANTS,
} from '@/components/Button/Button.constants';
import { NAVIGATION_EVENTS_PAGE } from '@/components/Navigation/Navigation.constants';
import type { SideNavigationDialogProps } from '@/components/SideNavigation/SideNavigationDialog/SideNavigationDialog';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import ChevronRightIcon from '/src/assets/icons/chevronRight.svg';

import AddressIcon from '@/assets/icons/address.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';

type EventPreviewCardProps = SideNavigationDialogProps['pages'][number];

import styles from './EventPreviewCard.module.scss';

export const EventPreviewCard = ({
  title,
  description,
  date,
  location,
  eventType,
  bgImage,
  slug,
}: EventPreviewCardProps) => {
  return (
    <section className={styles.eventPreviewCard}>
      <div>
        <div className={styles.eventPreviewCard_imageWrapper}>
          <span className={styles.eventPreviewCard_imageWrapperBadge}>
            {eventType}
          </span>

          <Image
            className={styles.eventPreviewCard_imageWrapperImage}
            src={`https:${bgImage.url}?fm=webp`}
            alt={bgImage.fileName}
            width={bgImage.details.image.width}
            height={bgImage.details.image.height}
          />
        </div>

        <div className={styles.eventPreviewCard_content}>
          <div className={styles.eventPreviewCard_info}>
            <Typography className={styles.eventPreviewCard_infoText}>
              <AddressIcon className={styles.eventPreviewCard_infoIcon} />{' '}
              {location}
            </Typography>

            <Typography className={styles.eventPreviewCard_infoText}>
              <CalendarIcon className={styles.eventPreviewCard_infoIcon} />{' '}
              {date}
            </Typography>
          </div>

          <Typography
            as={TYPOGRAPHY_COMPONENTS.H3}
            variant={TYPOGRAPHY_VARIANTS.H3}
            color={TYPOGRAPHY_COLORS.TEXT}
          >
            {title}
          </Typography>

          {Boolean(description) && (
            <Typography className={styles.eventPreviewCard_contentDescription}>
              {description}
            </Typography>
          )}
        </div>
      </div>

      <Button
        className={styles.eventPreviewCard_button}
        as={BUTTON_COMPONENTS.NEXT_LINK}
        href={`/${NAVIGATION_EVENTS_PAGE}/${slug.slug}`}
        color={BUTTON_COLORS.ACCENT}
        EndIcon={<ChevronRightIcon />}
        variant={BUTTON_VARIANTS.OUTLINED}
      >
        Dowiec się więcej
      </Button>
    </section>
  );
};
