import Image from 'next/image';

import { Typography } from '@/components/Typography/Typography.server';
import {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import AddressIcon from '@/assets/icons/address.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';

import styles from './EventPageTemplateHero.module.scss';

type EventPageTemplateHeroProps = {
  title: string;
  description?: string;
  location: string;
  date: string;
  image: {
    width: number;
    height: number;
    src: string;
    alt: string;
  };
  badgeText: string;
};

export const EventPageTemplateHero = ({
  title,
  description,
  image: { src, alt, ...restImageProps },
  badgeText,
  location,
  date,
}: EventPageTemplateHeroProps) => {
  return (
    <header className={styles.eventHero}>
      <Image
        className={styles.eventHero_image}
        src={`https:${src}?fm=webp`}
        alt={alt}
        {...restImageProps}
        priority
      />

      <div className={styles.eventHero_additionalWrapper}>
        <div className={styles.eventHero_additional}>
          <Typography
            className={styles.eventHero_additionalInfo}
            variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
            align={TYPOGRAPHY_ALIGNMENT.CENTER}
            noWrap
          >
            <AddressIcon className={styles.eventHero_additionalIcon} />{' '}
            {location}
          </Typography>

          <Typography
            className={styles.eventHero_additionalInfo}
            variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
            align={TYPOGRAPHY_ALIGNMENT.CENTER}
            noWrap
          >
            <CalendarIcon className={styles.eventHero_additionalIcon} /> {date}
          </Typography>
        </div>

        <span className={styles.eventHero_badge}>{badgeText}</span>
      </div>

      <Typography
        as={TYPOGRAPHY_COMPONENTS.H1}
        align={TYPOGRAPHY_ALIGNMENT.CENTER}
        variant={TYPOGRAPHY_VARIANTS.H2}
      >
        {title}
      </Typography>
      {Boolean(description) && (
        <Typography align={TYPOGRAPHY_ALIGNMENT.CENTER}>
          {description}
        </Typography>
      )}
    </header>
  );
};
