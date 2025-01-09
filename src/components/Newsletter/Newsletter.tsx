import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import { NewsletterForm } from './NewsletterForm/NewsletterForm.client';
import styles from './Newsletter.module.scss';

export const Newsletter = () => {
  return (
    <section className={styles.newsletter}>
      <div className={styles.newsletter_content}>
        <div className={styles.newsletter_textContent}>
          <Typography
            as={TYPOGRAPHY_COMPONENTS.H2}
            variant={TYPOGRAPHY_VARIANTS.H2}
            color={TYPOGRAPHY_COLORS.TEXT}
          >
            Zapisz sie na newsletter
          </Typography>

          <Typography
            as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
            variant={TYPOGRAPHY_VARIANTS.BODY}
          >
            Chcesz otrzymać powiadomienie o nadchodzących wydarzeniach, aby móc
            wziąć udział w turniejach i warsztatach? Zapisz się na newsletter!
          </Typography>
        </div>

        <NewsletterForm />
      </div>
    </section>
  );
};
