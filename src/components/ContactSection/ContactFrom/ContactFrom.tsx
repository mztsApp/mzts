'use client';

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormSubmit,
} from '@radix-ui/react-form';
import TextareaAutosize from 'react-textarea-autosize';

import { Button } from '@/components/Button/Button';
import { Typography } from '@/components/Typography/Typography.server';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';

import { postContactMessage } from '../api/postContactMessage';
import styles from './ContactForm.module.scss';

export const ContactFrom = () => {
  return (
    <Form onSubmit={postContactMessage} className={styles.contactForm}>
      <FormField name="firstName">
        <FormControl type="text" required />
        <FormMessage match="valueMissing">
          <Typography color={TYPOGRAPHY_COLORS.ERROR}>
            Pole Imię jest wymagane
          </Typography>
        </FormMessage>
      </FormField>
      <FormField name="email">
        <FormControl type="email" required />

        <FormMessage match="valueMissing">
          <Typography color={TYPOGRAPHY_COLORS.ERROR}>
            Pole Email jest wymagane
          </Typography>
        </FormMessage>
      </FormField>

      <FormField name="message">
        <FormControl type="text" required asChild>
          <TextareaAutosize minRows={4} maxLength={600} />
        </FormControl>

        <FormMessage match="valueMissing">
          <Typography color={TYPOGRAPHY_COLORS.ERROR}>
            Pole Wiadomość jest wymagane
          </Typography>
        </FormMessage>
      </FormField>

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
