'use client';

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormSubmit,
} from '@radix-ui/react-form';

import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import styles from './NewsletterForm.module.scss';

export const NewsletterForm = () => {
  return (
    <Form className={styles.newsletterForm}>
      <FormField name="email" className={styles.newsletterForm_fieldContainer}>
        <div className={styles.newsletterForm_innerFieldContainer}>
          <FormControl
            className={styles.newsletterForm_field}
            type="email"
            placeholder="Wpisz swój email"
            required
          />

          <FormSubmit asChild type="submit">
            <button className={styles.newsletterForm_cta}>
              <Typography
                as={TYPOGRAPHY_COMPONENTS.SPAN}
                variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                color={TYPOGRAPHY_COLORS.ACCENT}
                noWrap
                uppercase
              >
                Wyślij
              </Typography>
            </button>
          </FormSubmit>
        </div>
        <div className={styles.newsletterForm_errorContainer}>
          <FormMessage match="valueMissing" asChild>
            <Typography
              className={styles.newsletterForm_error}
              color={TYPOGRAPHY_COLORS.ERROR}
              as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
              variant={TYPOGRAPHY_VARIANTS.BODY3}
            >
              Pole email jest wymagane
            </Typography>
          </FormMessage>

          <FormMessage match="typeMismatch" asChild>
            <Typography
              className={styles.newsletterForm_error}
              color={TYPOGRAPHY_COLORS.ERROR}
              as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
              variant={TYPOGRAPHY_VARIANTS.BODY3}
            >
              Upewnij się, że e-mail zawiera znak @ oraz domenę (np. .pl, .com)
            </Typography>
          </FormMessage>
        </div>
      </FormField>
    </Form>
  );
};
