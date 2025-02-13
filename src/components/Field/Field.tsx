'use client';

import {
  FormControl as RadixFormControl,
  FormField as RadixFormField,
  FormMessage as RadixFormMessage,
  FormLabel as RadixFromLabel,
} from '@radix-ui/react-form';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';

import { FIELD_VARIANTS } from './Field.constants';
import styles from './Field.module.scss';
import type {
  FieldMessageProps,
  FieldProps,
  InputTagConditionalProps,
  TextAreaTagConditionalProps,
} from './Field.types';

export const FieldMessage = ({
  className: ExternalClassName,
  withBackground = false,
  ...rest
}: FieldMessageProps) => (
  <RadixFormMessage
    className={twMerge(
      styles.fieldError,
      withBackground && styles.fieldError__darkBg,
      ExternalClassName,
    )}
    {...rest}
  />
);

const oneSpaceChart = ' ';

const FieldRoot = ({
  className: ExternalClassName,
  id = `field-${uuid()}`,
  name,
  label,
  type,
  required,
  placeholder = oneSpaceChart,
  children,
  ...restConditionalProps
}: FieldProps) => {
  const fieldConditionalProps:
    | InputTagConditionalProps
    | TextAreaTagConditionalProps = restConditionalProps;

  return (
    <RadixFormField
      id={id}
      className={twMerge(
        styles.field,
        fieldConditionalProps.variant === FIELD_VARIANTS.TEXT_AREA &&
          styles.field__textArea,
        ExternalClassName,
      )}
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
            <input
              placeholder={placeholder}
              {...fieldConditionalProps.inputProps}
            />
          ) : (
            <TextareaAutosize
              placeholder={placeholder}
              {...fieldConditionalProps.textAreaProps}
            />
          )}
        </RadixFormControl>
      </div>

      <div className={styles.field_errorWrapper}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === FieldMessage) {
            return React.cloneElement(child, child.props);
          }

          return null;
        })}
      </div>
    </RadixFormField>
  );
};

type FieldItems = {
  Message: typeof FieldMessage;
};

type FieldType = typeof FieldRoot & FieldItems;

const Field = FieldRoot as FieldType;

Field.Message = FieldMessage;

export default Field;
