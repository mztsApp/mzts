'use client';

import {
  FormControl as RadixFormControl,
  FormField as RadixFormField,
  FormLabel as RadixFromLabel,
  FormMessage as RadixFormMessage,
  FormMessage,
} from '@radix-ui/react-form';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { ValueOf } from '@/types';

import styles from './Field.module.scss';
import { FIELD_VARIANTS } from './Field.constants';

const FieldMessage = ({
  className: ExternalClassName,
  isDarkBackground = false,
  ...rest
}: React.ComponentProps<typeof FormMessage> & {
  isDarkBackground?: boolean;
}) => (
  <RadixFormMessage
    className={twMerge(
      styles.field_error,
      isDarkBackground && styles.field_error__darkBg,
      ExternalClassName,
    )}
    {...rest}
  />
);

type InputTagConditionalProps = {
  inputProps?: Partial<React.ComponentProps<'input'>>;
  variant: typeof FIELD_VARIANTS.INPUT;
};
type TextAreaTagConditionalProps = {
  textAreaProps?: Partial<React.ComponentProps<typeof TextareaAutosize>>;
  variant: typeof FIELD_VARIANTS.TEXT_AREA;
};

type FieldConditionalProps =
  | InputTagConditionalProps
  | TextAreaTagConditionalProps;

type InputCustomProps = {
  label: string;
  required?: boolean;
  variant?: ValueOf<typeof FIELD_VARIANTS>;
  isDarkBackground?: boolean;
};

type FieldProps = React.PropsWithChildren<
  React.ComponentProps<typeof RadixFormField> &
    Pick<React.ComponentProps<typeof RadixFormControl>, 'type'> &
    InputCustomProps &
    FieldConditionalProps
>;

const FieldRoot = ({
  className: ExternalClassName,
  id,
  name,
  label,
  type,
  required,
  children,
  ...restConditionalProps
}: FieldProps) => {
  const fieldConditionalProps:
    | InputTagConditionalProps
    | TextAreaTagConditionalProps = restConditionalProps;

  return (
    <RadixFormField
      id={id}
      className={twMerge(styles.field, ExternalClassName)}
      name={name}
    >
      <div className={styles.field_formControlWrapper}>
        <RadixFromLabel className={styles.field_label} htmlFor={id}>
          {label}
        </RadixFromLabel>

        <RadixFormControl
          className={twMerge(styles.field_input)}
          type={type}
          required={required}
          asChild
        >
          {fieldConditionalProps.variant === FIELD_VARIANTS.INPUT ? (
            <input {...fieldConditionalProps.inputProps} />
          ) : (
            <TextareaAutosize {...fieldConditionalProps.textAreaProps} />
          )}
        </RadixFormControl>
      </div>

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === FieldMessage) {
          return React.cloneElement(child, child.props);
        }

        return null;
      })}
    </RadixFormField>
  );
};

type FieldItems = {
  message: typeof FieldMessage;
};

type FieldType = typeof FieldRoot & FieldItems;

const Field = FieldRoot as FieldType;

Field.message = FieldMessage;

export default Field;
