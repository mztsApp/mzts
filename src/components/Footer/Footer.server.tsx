import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import styles from './Footer.module.scss';
import { FooterDocuments } from './FooterDocuments/FooterDocuments';

export const Footer = async () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <nav className={styles.footer_navigation}>
          <section>
            <Typography
              as={TYPOGRAPHY_COMPONENTS.H2}
              variant={TYPOGRAPHY_VARIANTS.SUBTITLE}
            >
              Dane kontaktowe
            </Typography>

            <ul>--3 linki kontaktowe</ul>
          </section>

          <ul>--list linków do podstron--</ul>
        </nav>

        <div className={styles.footer_divider} />

        <FooterDocuments />
      </div>
    </footer>
  );
};
