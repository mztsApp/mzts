'use client';

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormSubmit,
} from '@radix-ui/react-form';

import { Button } from '@/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_COMPONENTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from '@/components/Button/Button.constants';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';
import { FileType } from '@/components/Footer/api/getDocumentsQuery';

import styles from './NewsletterForm.module.scss';
import { postSubscribeNewsletter } from './api/postSubscribeNewsletter';

type NewsletterFormProps = Record<
  'rules' | 'privacyPolicy',
  FileType | undefined
>;

export const NewsletterForm = ({
  rules,
  privacyPolicy,
}: NewsletterFormProps) => {
  return (
    <Form className={styles.newsletterForm} onSubmit={postSubscribeNewsletter}>
      <FormField name="email" className={styles.newsletterForm_fieldContainer}>
        <div className={styles.newsletterForm_innerFieldContainer}>
          <FormControl
            className={styles.newsletterForm_field}
            type="email"
            placeholder="Wpisz swój email"
            required
          />

          <FormSubmit asChild type="submit">
            <Button size={BUTTON_SIZES.LARGE} color={BUTTON_COLORS.TEXT_COLOR}>
              Wyślij
            </Button>
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

        <Typography variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}>
          Klikając Wyślij, potwierdzasz, że zgadzasz się z naszym{' '}
          <Button
            darkHover
            disableUppercase
            href={`https:${rules?.url}`}
            as={BUTTON_COMPONENTS.ANCHOR}
            color={BUTTON_COLORS.TEXT_COLOR}
            variant={BUTTON_VARIANTS.TEXT}
            typographySize={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
            target="_blank"
            rel="noreferrer noopener"
          >
            Regulaminem
          </Button>{' '}
          i{' '}
          <Button
            darkHover
            disableUppercase
            href={`https:${privacyPolicy?.url}`}
            as={BUTTON_COMPONENTS.ANCHOR}
            color={BUTTON_COLORS.TEXT_COLOR}
            variant={BUTTON_VARIANTS.TEXT}
            typographySize={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
            target="_blank"
            rel="noreferrer noopener"
          >
            Polityką prywatności
          </Button>
          .
        </Typography>
      </FormField>
    </Form>
  );
};
