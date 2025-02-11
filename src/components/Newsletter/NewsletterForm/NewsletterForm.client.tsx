'use client';

import { Form, FormSubmit } from '@radix-ui/react-form';

import { Button } from '@/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_COMPONENTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from '@/components/Button/Button.constants';
import Field from '@/components/Field/Field';
import type { FileType } from '@/components/Footer/api/getDocumentsQuery';
import { TYPOGRAPHY_VARIANTS } from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

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
      <div>
        <Field
          variant="input"
          type="email"
          label="Wpisz swój email"
          name="email"
          required
        >
          <Field.Message match="valueMissing" withBackground>
            Pole email jest wymagane
          </Field.Message>

          <Field.Message match="typeMismatch" withBackground>
            Upewnij się, że e-mail zawiera znak @ oraz domenę (np. .pl, .com)
          </Field.Message>
        </Field>

        <FormSubmit asChild type="submit">
          <Button size={BUTTON_SIZES.LARGE} color={BUTTON_COLORS.TEXT_COLOR}>
            Wyślij
          </Button>
        </FormSubmit>
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
        </Button>
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
      </Typography>
    </Form>
  );
};
