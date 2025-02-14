'use client';

import { Form, FormSubmit } from '@radix-ui/react-form';

import { Button } from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
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

      <Field variant="input" type="email" name="email" label="Email" required>
        <Field.Message match="valueMissing">
          Upewnij się, że e-mail zawiera znak @ oraz domenę (np. .pl, .com)
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
        textAreaProps={{
          maxLength: 400,
        }}
        required
      >
        <Field.Message match="valueMissing">
          Pole Wiadomość jest wymagane
        </Field.Message>
      </Field>

      <Checkbox
        required
        name="consent"
        label="Wysyłając powyższy formularz wyrażasz zgodę na przetwarzanie Twoich danych osobowych w celu obsługi Twojego zapytania. Przeczytaj Politykę prywatności, aby poznać szczegóły."
      >
        <Checkbox.Message match="valueMissing">
          Musisz wyrazić zgodę aby wysłać formularz
        </Checkbox.Message>
      </Checkbox>

      <FormSubmit asChild>
        <Button>Wyślij</Button>
      </FormSubmit>
    </Form>
  );
};
