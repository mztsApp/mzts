import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

import ChevronRight from '@/assets/icons/chevronRight.svg';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import styles from './componentsPreview.module.scss';

export const metadata: Metadata = {
  title: 'MZTS - Przykład komponentów',
  description: 'Przykład komponentów',
};

export default function componentsPreview() {
  return (
    <div className={styles.componentPreview}>
      <Typography
        as={TYPOGRAPHY_COMPONENTS.H1}
        variant={TYPOGRAPHY_VARIANTS.H1}
        color={TYPOGRAPHY_COLORS.GRADIENT_RIGHT}
      >
        Przykłąd kompoonentów text - test
      </Typography>
      <span className={styles.componentPreview_separator} />
      <Typography variant={TYPOGRAPHY_VARIANTS.H3}>
        test test test test text test test test test text test test test test
        text test test test test text
      </Typography>
      <Typography color={TYPOGRAPHY_COLORS.GRADIENT_LEFT}>
        test test test test text test test test test text test test test test
        text test test test test text
      </Typography>
      <Typography
        variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
        color={TYPOGRAPHY_COLORS.ACCENT}
      >
        test test test test text test test test test text test test test test
        text test test test test text
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}>
        test test test test text test test test test text test test test test
        text test test test test text
      </Typography>
      <div className={styles.componentPreview_box} />
      <div className={styles.componentPreview_iconContainer}>
        <ChevronRight className={styles.componentPreview_icon} />
        <ChevronRight
          className={twMerge(
            styles.componentPreview_icon__default,
            styles.componentPreview_icon,
          )}
        />
        <ChevronRight className={styles.componentPreview_icon} />
        <ChevronRight
          className={twMerge(
            styles.componentPreview_icon,
            styles.componentPreview_icon__default,
          )}
        />
      </div>
      <div className={styles.componentPreview_textContainer}>
        <Typography uppercase variant="typography__buttonText">
          In addition to the main focus, its important to consider the subtle
          details that contribute to the overall experience. These secondary
          elements might not be in the spotlight, but they play a crucial role
          in supporting the primary content. Whether its design, functionality,
          or messaging, the balance between the main and the auxiliary aspects
          ensures a cohesive and seamless experience for the user
        </Typography>
      </div>
    </div>
  );
}
