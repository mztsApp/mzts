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
  withBackground = false,
  ...rest
}: React.ComponentProps<typeof FormMessage> & {
  withBackground?: boolean;
}) => (
  <RadixFormMessage
    className={twMerge(
      styles.fieldError,
      withBackground && styles.fieldError__darkBg,
      ExternalClassName,
    )}
    {...rest}
  />
);

type InputTagConditionalProps = {
  inputProps?: Partial<Omit<React.ComponentProps<'input'>, 'placeholder'>>;
  variant: typeof FIELD_VARIANTS.INPUT;
};
type TextAreaTagConditionalProps = {
  textAreaProps?: Partial<
    Omit<React.ComponentProps<typeof TextareaAutosize>, 'placeholder'>
  >;
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
  placeholder?: string;
};

type FieldProps = React.PropsWithChildren<
  React.ComponentProps<typeof RadixFormField> &
    Pick<React.ComponentProps<typeof RadixFormControl>, 'type'> &
    InputCustomProps &
    FieldConditionalProps
>;

const oneSpaceChart = ' ';

const FieldRoot = ({
  className: ExternalClassName,
  id,
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
  Message: typeof FieldMessage;
};

type FieldType = typeof FieldRoot & FieldItems;

const Field = FieldRoot as FieldType;

Field.Message = FieldMessage;

export default Field;
