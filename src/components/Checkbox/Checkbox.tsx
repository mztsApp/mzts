import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FormControl, FormField, FormLabel } from '@radix-ui/react-form';
import { v4 as uuid } from 'uuid';

import styles from './Checkbox.module.scss';
import { FieldMessage } from '../Field/Field';
import type { CheckboxComponentProps } from './Checkbox.types';
import { Typography } from '../Typography/Typography.server';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';

export const CheckboxComponent = ({
  className,
  name,
  label,
  children,
  required,
  id = `checkbox-${uuid()}`,
  ...rest
}: CheckboxComponentProps) => {
  return (
    <FormField className={twMerge(styles.checkbox, className)} name={name}>
      <div className={styles.checkbox_inputWrapper}>
        <FormControl
          {...rest}
          id={id}
          type="checkbox"
          required={required}
          className={styles.checkbox_input}
        />

        <FormLabel htmlFor={id} className={styles.checkbox_label} asChild>
          <Typography
            as={TYPOGRAPHY_COMPONENTS.LABEL}
            variant={TYPOGRAPHY_VARIANTS.HELPER_TEXT}
          >
            {label}
          </Typography>
        </FormLabel>
      </div>

      <div className={styles.checkbox_error}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === FieldMessage) {
            return React.cloneElement(child, child.props);
          }

          return null;
        })}
      </div>
    </FormField>
  );
};

type CheckboxChildren = {
  Message: typeof FieldMessage;
};

type CheckboxType = typeof CheckboxComponent & CheckboxChildren;

const Checkbox = CheckboxComponent as CheckboxType;

Checkbox.Message = FieldMessage;

export default Checkbox;
