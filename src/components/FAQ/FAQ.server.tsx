import { getTypographyColorFromApi } from '@/utilities/utilitiesForApi';

import { FAQAccordion } from './FAQAccordion/FAQAccordion.client';
import styles from './FAQ.module.scss';
import { Typography } from '../Typography/Typography.server';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Button } from '../Button/Button';
import { BUTTON_COMPONENTS } from '../Button/Button.constants';
import { getFAQDataQuery } from './api/getFAQDataQuery';

type FAQProps = {
  withLinkToContactForm: boolean;
};

export const FAQ = async ({ withLinkToContactForm }: FAQProps) => {
  const { data } = await getFAQDataQuery();

  if (!data) return null;

  return (
    <section className={styles.faq}>
      <header className={styles.faq_content}>
        <Typography
          as={TYPOGRAPHY_COMPONENTS.H2}
          variant={TYPOGRAPHY_VARIANTS.H2}
          color={getTypographyColorFromApi(data.colorVariant)}
        >
          {data.title}
        </Typography>

        {data?.description && <Typography>{data.description}</Typography>}
      </header>

      <FAQAccordion items={data.faqItems} />

      {withLinkToContactForm && (
        <div className={styles.faq_content}>
          <Typography
            as={TYPOGRAPHY_COMPONENTS.H3}
            variant={TYPOGRAPHY_VARIANTS.H3}
            color={TYPOGRAPHY_COLORS.TEXT}
          >
            Masz pytania?
          </Typography>
          <Typography>
            Skontaktuj się z nami, aby uzyskać więcej informacji.
          </Typography>

          <Button as={BUTTON_COMPONENTS.ANCHOR} href="#skontaktuj-sie-z-nami">
            skontaktuj się z nami
          </Button>
        </div>
      )}
    </section>
  );
};
