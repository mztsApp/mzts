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
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';
import Field from '@/components/Field/Field';

import { postContactMessage } from '../api/postContactMessage';
import styles from './ContactForm.module.scss';

export const ContactFrom = () => {
  return (
    <Form onSubmit={postContactMessage} className={styles.contactForm}>
      <Field variant="input" type="text" name="firstName" label="Imię" required>
        <Field.Message match="valueMissing">
          Pole Imię jest wymagana
        </Field.Message>
      </Field>

      <Field variant="input" type="email" name="message" label="Email" required>
        <Field.Message match="valueMissing">
          Pole email musi być poprawne
        </Field.Message>
        <Field.Message match="typeMismatch">
          Pole Email jest wymagane
        </Field.Message>
      </Field>

      <Field
        variant="textArea"
        type="text"
        name="message"
        label="Wiadomość"
        required
      >
        <Field.Message match="valueMissing">
          Pole Wiadomość jest wymagane
        </Field.Message>
      </Field>

      <FormField name="consent">
        <div>
          <FormControl type="checkbox" required />
          <Typography
            as={TYPOGRAPHY_COMPONENTS.LABEL}
            variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
          />
        </div>

        <FormMessage match="valueMissing">
          <Typography color={TYPOGRAPHY_COLORS.ERROR}>
            zgoda jest wymagana
          </Typography>
        </FormMessage>
      </FormField>

      <FormSubmit asChild>
        <Button>Wyślij</Button>
      </FormSubmit>
    </Form>
  );
};
