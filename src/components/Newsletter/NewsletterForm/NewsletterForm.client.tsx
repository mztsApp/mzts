'use client';

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormSubmit,
} from '@radix-ui/react-form';
import React from 'react';

import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import styles from './NewsletterForm.module.scss';
import {
  newsletterConsent,
  postSubscribeNewsletter,
} from './api/postSubscribeNewsletter';
import { Button } from '@/components/Button/Button.client';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from '@/components/Button/Button.constants';

export const NewsletterForm = () => {
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
      </FormField>

      <FormField
        className={styles.newsletterForm_checkboxField}
        name="consentNewsletter"
      >
        <div className={styles.newsletterForm_checkboxInputWrapper}>
          <FormControl
            className={styles.newsletterForm_checkboxInput}
            type="checkbox"
            id="consents-of-newsletter"
            required
          />

          <Typography
            as={TYPOGRAPHY_COMPONENTS.LABEL}
            variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
            className={styles.newsletterForm_checkboxLabel}
            htmlFor="consents-of-newsletter"
          >
            {newsletterConsent}
          </Typography>
        </div>
      </FormField>
    </Form>
  );
};
