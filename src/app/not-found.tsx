import MZTSLogoIcon from '@/assets/icons/mztsDesktop.svg';
import { Button } from '@/components/Button/Button';
import { BUTTON_COMPONENTS } from '@/components/Button/Button.constants';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';
import { Navigation } from '@/components/Navigation/Navigation.server';
import { Footer } from '@/components/Footer/Footer.server';

import styles from './not-found.module.scss';

export default async function NotFound() {
  return (
    <main className={styles.notFound}>
      <Navigation />
      <section className={styles.notFound_section}>
        <Typography
          as={TYPOGRAPHY_COMPONENTS.H1}
          variant={TYPOGRAPHY_VARIANTS.H1}
          color={TYPOGRAPHY_COLORS.GRADIENT_LEFT}
        >
          404
        </Typography>

        <Typography>Taka strona nie istnieje</Typography>

        <Button as={BUTTON_COMPONENTS.NEXT_LINK} href={'/'}>
          Przejdź na stronę główną
        </Button>

        <MZTSLogoIcon
          className={styles.notFound_logo}
          aria-label="logo MZTS | Mzowiecki związek tańca sportowego"
        />
      </section>
      <Footer />
    </main>
  );
}
